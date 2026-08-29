import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { BrandHeader } from "@/components/BrandHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getAssessmentQuestions,
  submitAssessment,
  type PublicQuestion,
} from "@/lib/assessment.functions";
import {
  clearAssessment,
  loadAnswers,
  loadCandidate,
  saveAnswers,
  type AnswerMap,
  type CandidateSession,
} from "@/lib/assessment-session";

export const Route = createFileRoute("/quiz")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Assessment in progress | Alpha Academy" },
      {
        name: "description",
        content: "Answer 30 multiple-choice questions in your Alpha Academy AI assessment.",
      },
      { property: "og:title", content: "Assessment in progress | Alpha Academy" },
      {
        property: "og:description",
        content: "Your Alpha Academy AI assessment examination interface.",
      },
    ],
  }),
  component: QuizPage,
});

const LETTERS = ["A", "B", "C", "D"] as const;

function optionText(question: PublicQuestion, letter: (typeof LETTERS)[number]) {
  return {
    A: question.option_a,
    B: question.option_b,
    C: question.option_c,
    D: question.option_d,
  }[letter];
}

function QuizPage() {
  const navigate = useNavigate();
  const fetchQuestions = useServerFn(getAssessmentQuestions);
  const submit = useServerFn(submitAssessment);

  const [candidate, setCandidate] = useState<CandidateSession | null>(null);
  const [ready, setReady] = useState(false);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [index, setIndex] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const session = loadCandidate();
    if (!session) {
      navigate({ to: "/assessment" });
      return;
    }
    setCandidate(session);
    setAnswers(loadAnswers(session.category));
    setReady(true);
  }, [navigate]);

  const questionsQuery = useQuery({
    queryKey: ["questions", candidate?.category],
    enabled: Boolean(candidate),
    staleTime: Infinity,
    queryFn: () => fetchQuestions({ data: { category: candidate!.category } }),
  });

  const questions = useMemo(() => questionsQuery.data ?? [], [questionsQuery.data]);
  const current = questions[index];
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const progress = questions.length ? (answeredCount / questions.length) * 100 : 0;

  const selectAnswer = (questionId: string, letter: (typeof LETTERS)[number]) => {
    if (!candidate) return;
    const next = { ...answers, [questionId]: letter };
    setAnswers(next);
    saveAnswers(candidate.category, next);
  };

  const submission = useMutation({
    mutationFn: async () => {
      if (!candidate) throw new Error("Missing candidate details.");
      return submit({
        data: {
          fullName: candidate.fullName,
          email: candidate.email,
          category: candidate.category,
          answers: Object.fromEntries(questions.map((q) => [q.id, answers[q.id] ?? null])),
        },
      });
    },
    onSuccess: (result) => {
      if (candidate) clearAssessment(candidate.category);
      navigate({ to: "/result/$attemptId", params: { attemptId: result.attemptId } });
    },
    onError: (error: Error) => {
      toast.error(error.message || "We couldn't submit your assessment. Please try again.");
    },
  });

  if (!ready || questionsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <BrandHeader subtitle="Assessment" />
        <div className="grid place-items-center py-32 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="mt-3 text-sm">Preparing your assessment…</p>
        </div>
      </div>
    );
  }

  if (questionsQuery.isError || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <BrandHeader subtitle="Assessment" />
        <main className="mx-auto max-w-xl px-6 py-24 text-center">
          <AlertTriangle className="mx-auto h-8 w-8 text-destructive" />
          <h1 className="mt-4 font-display text-2xl font-bold">Assessment unavailable</h1>
          <p className="mt-2 text-muted-foreground">
            No questions are currently published for this track. Please try again later or choose a
            different track.
          </p>
          <Button className="mt-6" onClick={() => navigate({ to: "/assessment" })}>
            Back to registration
          </Button>
        </main>
      </div>
    );
  }

  const unanswered = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader subtitle={candidate?.category} />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="font-display text-lg font-bold tracking-tight">
            Question {index + 1} of {questions.length}
          </h1>
          <span className="text-sm text-muted-foreground">{answeredCount} answered</span>
        </div>
        <Progress value={progress} className="mt-3" />

        {current ? (
          <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <p className="font-display text-xl font-semibold leading-snug">{current.question}</p>
            <div className="mt-6 space-y-3">
              {LETTERS.map((letter) => {
                const selected = answers[current.id] === letter;
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => selectAnswer(current.id, letter)}
                    aria-pressed={selected}
                    className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-primary bg-primary/5 ring-2 ring-primary/40"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-sm leading-relaxed">{optionText(current, letter)}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          {index < questions.length - 1 ? (
            <Button onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => setConfirmOpen(true)} disabled={submission.isPending}>
              Submit assessment
            </Button>
          )}
        </div>

        <nav aria-label="Question navigator" className="mt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Navigator</p>
          <div className="mt-3 grid grid-cols-8 gap-2 sm:grid-cols-10">
            {questions.map((q, i) => {
              const isCurrent = i === index;
              const isAnswered = Boolean(answers[q.id]);
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={isCurrent}
                  aria-label={`Go to question ${i + 1}${isAnswered ? " (answered)" : ""}`}
                  className={`h-9 rounded-lg text-xs font-semibold transition ${
                    isCurrent
                      ? "bg-navy text-navy-foreground"
                      : isAnswered
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </nav>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Your answers are saved automatically as you go.
        </p>
      </main>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit your assessment?</AlertDialogTitle>
            <AlertDialogDescription>
              {unanswered > 0
                ? `You still have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. Unanswered questions are marked incorrect.`
                : "All 30 questions are answered."}{" "}
              Once submitted, your answers are final and your result is recorded.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submission.isPending}>Keep reviewing</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                submission.mutate();
              }}
              disabled={submission.isPending}
            >
              {submission.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit now"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
