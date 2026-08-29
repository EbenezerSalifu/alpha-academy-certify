import { CATEGORIES, type Category } from "./assessment.functions";

export type CandidateSession = {
  fullName: string;
  email: string;
  category: Category;
};

const SESSION_KEY = "alpha-academy:candidate";
const answersKey = (category: Category) => `alpha-academy:answers:${category}`;

export function saveCandidate(session: CandidateSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function loadCandidate(): CandidateSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CandidateSession>;
    if (
      typeof parsed.fullName !== "string" ||
      typeof parsed.email !== "string" ||
      !CATEGORIES.includes(parsed.category as Category)
    ) {
      return null;
    }
    return {
      fullName: parsed.fullName,
      email: parsed.email,
      category: parsed.category as Category,
    };
  } catch {
    return null;
  }
}

export type AnswerMap = Record<string, "A" | "B" | "C" | "D" | null>;

export function loadAnswers(category: Category): AnswerMap {
  try {
    const raw = sessionStorage.getItem(answersKey(category));
    return raw ? (JSON.parse(raw) as AnswerMap) : {};
  } catch {
    return {};
  }
}

export function saveAnswers(category: Category, answers: AnswerMap) {
  sessionStorage.setItem(answersKey(category), JSON.stringify(answers));
}

export function clearAssessment(category: Category) {
  sessionStorage.removeItem(answersKey(category));
  sessionStorage.removeItem(SESSION_KEY);
}
