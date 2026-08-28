import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const CATEGORIES = [
  "AI FOR STUDENTS",
  "AI FOR ENTREPRENEURS",
  "AI FOR PROFESSIONALS",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const TOTAL_QUESTIONS = 30;

const categorySchema = z.enum(CATEGORIES);
const letterSchema = z.enum(["A", "B", "C", "D"]);

export type PublicQuestion = {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
};

/** Questions for a category WITHOUT correct answers (safe for the browser). */
export const getAssessmentQuestions = createServerFn({ method: "GET" })
  .inputValidator((data: { category: Category }) =>
    z.object({ category: categorySchema }).parse(data),
  )
  .handler(async ({ data }): Promise<PublicQuestion[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("questions")
      .select("id, question, option_a, option_b, option_c, option_d")
      .eq("category", data.category)
      .eq("is_active", true)
      .order("created_at", { ascending: true })
      .limit(TOTAL_QUESTIONS);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

const submitSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  category: categorySchema,
  answers: z.record(z.string().uuid(), letterSchema.nullable()),
});

export type AttemptResult = {
  attemptId: string;
  fullName: string;
  category: Category;
  score: number;
  incorrect: number;
  total: number;
  percentage: number;
  passed: boolean;
};

/** Scores the assessment server-side and permanently records the attempt. */
export const submitAssessment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data }): Promise<AttemptResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("questions")
      .select("id, question, option_a, option_b, option_c, option_d, correct_answer")
      .eq("category", data.category)
      .eq("is_active", true)
      .order("created_at", { ascending: true })
      .limit(TOTAL_QUESTIONS);
    if (error) throw new Error(error.message);
    const questions = rows ?? [];
    if (questions.length === 0) throw new Error("No questions available for this assessment.");

    let score = 0;
    const detail = questions.map((q, index) => {
      const selected = data.answers[q.id] ?? null;
      const isCorrect = selected === q.correct_answer;
      if (isCorrect) score += 1;
      return {
        number: index + 1,
        question_id: q.id,
        question: q.question,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        selected_answer: selected,
        correct_answer: q.correct_answer,
        is_correct: isCorrect,
      };
    });

    const total = TOTAL_QUESTIONS;
    const percentage = Math.round((score / total) * 10000) / 100;
    const passed = percentage > 50;

    const { data: attempt, error: insertError } = await supabaseAdmin
      .from("assessment_attempts")
      .insert({
        full_name: data.fullName,
        email: data.email.toLowerCase(),
        category: data.category,
        score,
        total_questions: total,
        percentage,
        passed,
        answers: detail,
      })
      .select("id")
      .single();
    if (insertError) throw new Error(insertError.message);

    return {
      attemptId: attempt.id,
      fullName: data.fullName,
      category: data.category,
      score,
      incorrect: total - score,
      total,
      percentage,
      passed,
    };
  });

const idSchema = z.object({ attemptId: z.string().uuid() });

export const getAttemptResult = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data }): Promise<AttemptResult & { certificateGenerated: boolean }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("assessment_attempts")
      .select(
        "id, full_name, category, score, total_questions, percentage, passed, certificate_generated",
      )
      .eq("id", data.attemptId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Assessment record not found.");
    return {
      attemptId: row.id,
      fullName: row.full_name,
      category: row.category as Category,
      score: row.score,
      incorrect: row.total_questions - row.score,
      total: row.total_questions,
      percentage: Number(row.percentage),
      passed: row.passed,
      certificateGenerated: row.certificate_generated,
    };
  });

/** Returns the official template (as a data URL) + the candidate name to print on it. */
export const generateCertificate = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(
    async ({
      data,
    }): Promise<{ fullName: string; category: Category; templateDataUrl: string }> => {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: attempt, error } = await supabaseAdmin
        .from("assessment_attempts")
        .select("id, full_name, category, passed")
        .eq("id", data.attemptId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!attempt) throw new Error("Assessment record not found.");
      if (!attempt.passed) throw new Error("Certificates are only available to candidates who passed.");

      const { data: template, error: templateError } = await supabaseAdmin
        .from("certificate_templates")
        .select("image_url")
        .eq("category", attempt.category)
        .single();
      if (templateError) throw new Error(templateError.message);

      const { data: file, error: downloadError } = await supabaseAdmin.storage
        .from("certificates")
        .download(template.image_url);
      if (downloadError || !file) throw new Error("Certificate template could not be loaded.");

      const bytes = new Uint8Array(await file.arrayBuffer());
      let binary = "";
      const chunk = 0x8000;
      for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
      }

      await supabaseAdmin
        .from("assessment_attempts")
        .update({ certificate_generated: true, certificate_generated_at: new Date().toISOString() })
        .eq("id", attempt.id);

      return {
        fullName: attempt.full_name,
        category: attempt.category as Category,
        templateDataUrl: `data:image/png;base64,${btoa(binary)}`,
      };
    },
  );
