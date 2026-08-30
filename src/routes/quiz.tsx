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

  // (The rest of your quiz.tsx file remains exactly the same!)