import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BrandHeader } from "@/components/BrandHeader";
import { Button } from "@/components/ui/button";
import { loadCandidate, loadAnswers, saveAnswers, type AnswerMap } from "@/lib/assessment-session";
import { downloadCertificate } from "@/lib/generate-certificate";
import { studentQuestions } from "@/lib/students";
import { entrepreneurQuestions } from "@/lib/entrepreneurs";
import type { Category } from "@/lib/assessment.functions";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
});

const PASS_MARK = 16;

function QuizPage() {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<{
    fullName: string;
    email: string;
    category: Category;
  } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [score, setScore] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const questions = useMemo(() => {
    if (!candidate) return [];
    if (candidate.category === "AI FOR STUDENTS") return studentQuestions;
    if (candidate.category === "AI FOR ENTREPRENEURS") return entrepreneurQuestions;
    return [];
  }, [candidate]);

  useEffect(() => {
    const user = loadCandidate();
    if (!user) {
      navigate({ to: "/assessment" });
      return;
    }
    setCandidate(user);

    const saved = loadAnswers(user.category);
    setAnswers(saved);
  }, [navigate]);

  if (!candidate) return null;

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <BrandHeader subtitle={`${candidate.category} Assessment`} />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center space-y-4">
          <h1 className="text-3xl font-bold">Questions coming soon</h1>
          <p className="text-muted-foreground">
            Real questions for <strong>{candidate.category}</strong> are not uploaded yet.
            Please choose <strong>AI FOR STUDENTS</strong> or <strong>AI FOR ENTREPRENEURS</strong> for now.
          </p>
          <Button onClick={() => navigate({ to: "/assessment" })}>Back to registration</Button>
        </main>
      </div>
    );
  }

  const question = questions[currentIndex];
  const selected = answers[String(question.id)] ?? null;
  const answeredCount = Object.values(answers).filter(Boolean).length;

  const selectAnswer = (option: "A" | "B" | "C" | "D") => {
    const next = { ...answers, [String(question.id)]: option };
    setAnswers(next);
    saveAnswers(candidate.category, next);
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const submitQuiz = () => {
    let correct = 0;
    for (const q of questions) {
      if (answers[String(q.id)] === q.correct) correct += 1;
    }
    setScore(correct);
  };

  const handleDownload = async () => {
    if (!candidate || score === null || score < PASS_MARK) return;
    setIsGenerating(true);
    try {
      // Updated to pass email address as well!
      await downloadCertificate(candidate.fullName, candidate.category, candidate.email);
    } catch (error) {
      console.error(error);
      alert("Failed to generate certificate. Please try again.");
    }
    setIsGenerating(false);
  };

  if (score !== null) {
    const passed = score >= PASS_MARK;

    return (
      <div className="min-h-screen bg-background">
        <BrandHeader subtitle={`${candidate.category} Results`} />
        <main className="mx-auto max-w-2xl px-6 py-12 text-center">
          <div className="space-y-6 rounded-2xl border bg-card p-8 shadow-sm">
            <h1 className="font-display text-4xl font-bold text-primary">
              {passed ? "Congratulations!" : "Keep Going"}
            </h1>
            <h2 className="text-2xl font-semibold">
              You scored {score} / {questions.length}
            </h2>
            <p className="text-muted-foreground">
              {passed
                ? `You passed the ${candidate.category} assessment. Your certificate is ready.`
                : `You need at least ${PASS_MARK}/30 to pass. Review the material and try again.`}
            </p>

            {passed ? (
              <Button
                onClick={handleDownload}
                size="lg"
                className="mt-4 text-lg px-8 py-6"
                disabled={isGenerating}
              >
                {isGenerating ? "Generating PDF..." : "Download My Certificate"}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setScore(null);
                  setCurrentIndex(0);
                }}
                size="lg"
                className="mt-4"
              >
                Retry Assessment
              </Button>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader subtitle={`${candidate.category} Assessment`} />

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span>
              Answered {answeredCount}/{questions.length}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
              {question.module}
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-bold leading-snug">
              {question.question}
            </h1>
          </div>

          <div className="space-y-3">
            {(["A", "B", "C", "D"] as const).map((key) => {
              const active = selected === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectAnswer(key)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                      : "border-border hover:border-primary/40 hover:bg-muted/40"
                  }`}
                >
                  <span className="font-semibold mr-2">{key}.</span>
                  {question.options[key]}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0}>
              Previous
            </Button>

            {currentIndex < questions.length - 1 ? (
              <Button onClick={goNext} disabled={!selected} className="sm:ml-auto">
                Next Question
              </Button>
            ) : (
              <Button
                onClick={submitQuiz}
                disabled={answeredCount < questions.length}
                className="sm:ml-auto"
              >
                Submit Assessment
              </Button>
            )}
          </div>

          {answeredCount < questions.length && currentIndex === questions.length - 1 && (
            <p className="text-sm text-muted-foreground">
              Please answer all {questions.length} questions before submitting.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}