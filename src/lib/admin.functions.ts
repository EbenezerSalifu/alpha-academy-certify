import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { CATEGORIES } from "./assessment.functions";
import type { Category } from "./assessment.functions";

const categorySchema = z.enum(CATEGORIES);
const letterSchema = z.enum(["A", "B", "C", "D"]);

async function assertAdmin(context: { supabase: SupabaseLike; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: administrator access required.");
}

type SupabaseLike = {
  rpc: (
    fn: "has_role",
    args: { _user_id: string; _role: "admin" },
  ) => Promise<{ data: boolean | null; error: { message: string } | null }>;
};

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data), email: context.claims?.email ?? null };
  });

export type AdminAttemptRow = {
  id: string;
  full_name: string;
  email: string;
  category: Category;
  score: number;
  total_questions: number;
  percentage: number;
  passed: boolean;
  certificate_generated: boolean;
  certificate_generated_at: string | null;
  created_at: string;
};

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("assessment_attempts")
      .select("email, category, percentage, passed");
    if (error) throw new Error(error.message);
    const rows = data ?? [];
    const totals = {
      attempts: rows.length,
      candidates: new Set(rows.map((r) => r.email)).size,
      passed: rows.filter((r) => r.passed).length,
      failed: rows.filter((r) => !r.passed).length,
      passRate: rows.length ? (rows.filter((r) => r.passed).length / rows.length) * 100 : 0,
      averageScore: rows.length
        ? rows.reduce((sum, r) => sum + Number(r.percentage), 0) / rows.length
        : 0,
    };
    const byCategory = CATEGORIES.map((category) => {
      const subset = rows.filter((r) => r.category === category);
      return {
        category,
        attempts: subset.length,
        passed: subset.filter((r) => r.passed).length,
        failed: subset.filter((r) => !r.passed).length,
      };
    });
    return { totals, byCategory };
  });

export const listAttempts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminAttemptRow[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("assessment_attempts")
      .select(
        "id, full_name, email, category, score, total_questions, percentage, passed, certificate_generated, certificate_generated_at, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(5000);
    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({ ...row, percentage: Number(row.percentage) })) as AdminAttemptRow[];
  });

export type AnswerDetail = {
  number: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  selected_answer: "A" | "B" | "C" | "D" | null;
  correct_answer: "A" | "B" | "C" | "D";
  is_correct: boolean;
};

export const getAttemptDetail = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("assessment_attempts")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error) throw new Error(error.message);
    return {
      ...row,
      percentage: Number(row.percentage),
      answers: (row.answers ?? []) as unknown as AnswerDetail[],
    };
  });

export type QuestionRow = {
  id: string;
  category: Category;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "A" | "B" | "C" | "D";
  is_active: boolean;
  created_at: string;
};

export const listQuestions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<QuestionRow[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("questions")
      .select("*")
      .order("category", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as QuestionRow[];
  });

const questionInput = z.object({
  id: z.string().uuid().optional(),
  category: categorySchema,
  question: z.string().trim().min(3).max(2000),
  option_a: z.string().trim().min(1).max(500),
  option_b: z.string().trim().min(1).max(500),
  option_c: z.string().trim().min(1).max(500),
  option_d: z.string().trim().min(1).max(500),
  correct_answer: letterSchema,
  is_active: z.boolean().default(true),
});

export const saveQuestion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => questionInput.parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...values } = data;
    if (id) {
      const { error } = await supabaseAdmin.from("questions").update(values).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("questions").insert(values);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteQuestion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("questions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const importQuestions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ csv: z.string().min(1).max(500000) }).parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { parseQuestionCsv } = await import("./csv.server");
    const { valid, errors } = parseQuestionCsv(data.csv);
    if (valid.length > 0) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("questions").insert(valid);
      if (error) throw new Error(error.message);
    }
    return { imported: valid.length, errors };
  });

export const listTemplates = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("certificate_templates")
      .select("*")
      .order("category");
    if (error) throw new Error(error.message);
    const withPreviews = await Promise.all(
      (data ?? []).map(async (row) => {
        const { data: signed } = await supabaseAdmin.storage
          .from("certificates")
          .createSignedUrl(row.image_url, 60 * 60);
        return { ...row, previewUrl: signed?.signedUrl ?? null };
      }),
    );
    return withPreviews;
  });

export const replaceTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        category: categorySchema,
        fileName: z.string().min(1).max(200),
        base64: z.string().min(10),
      })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const binary = atob(data.base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

    const path = `${data.category.replace(/\s+/g, "_")}-${Date.now()}.png`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from("certificates")
      .upload(path, bytes, { contentType: "image/png", upsert: true });
    if (uploadError) throw new Error(uploadError.message);

    const { error } = await supabaseAdmin
      .from("certificate_templates")
      .update({ file_name: data.fileName, image_url: path })
      .eq("category", data.category);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
