import type { PracticeQuestion } from "../../content/practice-questions.ts";

type AnswerKey = Pick<PracticeQuestion, "options" | "correctOptionId">;
export type PracticeAttempt =
  | { status: "unanswered"; selectedOptionId: null }
  | { status: "selected"; selectedOptionId: string }
  | { status: "submitted"; selectedOptionId: string; correct: boolean };
export type PracticeAction = { type: "select"; optionId: string } | { type: "submit" } | { type: "retry" };

export function initialAttempt(): PracticeAttempt { return { status: "unanswered", selectedOptionId: null }; }

export function gradeAnswer(question: AnswerKey, optionId: string): boolean | undefined {
  if (!question.options.some(option => option.id === optionId) || !question.options.some(option => option.id === question.correctOptionId)) return undefined;
  return optionId === question.correctOptionId;
}

export function updateAttempt(question: AnswerKey, attempt: PracticeAttempt, action: PracticeAction): PracticeAttempt {
  if (action.type === "retry") return initialAttempt();
  if (attempt.status === "submitted") return attempt;
  if (action.type === "select") return question.options.some(option => option.id === action.optionId)
    ? { status: "selected", selectedOptionId: action.optionId } : attempt;
  if (attempt.status !== "selected") return attempt;
  const correct = gradeAnswer(question, attempt.selectedOptionId);
  return correct === undefined ? attempt : { status: "submitted", selectedOptionId: attempt.selectedOptionId, correct };
}
