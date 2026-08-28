import { CATEGORIES } from "./assessment.functions";
import type { Category } from "./assessment.functions";

export type ParsedQuestion = {
  category: Category;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "A" | "B" | "C" | "D";
  is_active: boolean;
};

function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }
  row.push(field);
  rows.push(row);
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

export function parseQuestionCsv(csv: string): { valid: ParsedQuestion[]; errors: string[] } {
  const rows = parseCsvRows(csv);
  const errors: string[] = [];
  const valid: ParsedQuestion[] = [];
  if (rows.length === 0) return { valid, errors: ["The file is empty."] };

  const header = rows[0].map((c) => c.trim().toLowerCase());
  const hasHeader = header[0] === "category";
  const dataRows = hasHeader ? rows.slice(1) : rows;

  dataRows.forEach((cells, index) => {
    const lineNumber = index + (hasHeader ? 2 : 1);
    const [category, question, a, b, c, d, correct] = cells.map((cell) => (cell ?? "").trim());
    const normalisedCategory = category.toUpperCase();
    const answer = correct.toUpperCase();

    if (!CATEGORIES.includes(normalisedCategory as Category)) {
      errors.push(`Row ${lineNumber}: invalid or missing category "${category}".`);
      return;
    }
    if (!question) return void errors.push(`Row ${lineNumber}: question is missing.`);
    if (!a || !b || !c || !d) return void errors.push(`Row ${lineNumber}: all four options are required.`);
    if (!["A", "B", "C", "D"].includes(answer)) {
      return void errors.push(`Row ${lineNumber}: correct answer must be A, B, C or D.`);
    }

    valid.push({
      category: normalisedCategory as Category,
      question,
      option_a: a,
      option_b: b,
      option_c: c,
      option_d: d,
      correct_answer: answer as "A" | "B" | "C" | "D",
      is_active: true,
    });
  });

  return { valid, errors };
}
