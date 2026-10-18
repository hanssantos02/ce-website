import { practiceQuestions, type PracticeQuestion } from "../../content/practice-questions.ts";
import { getLessonById } from "../../content/curriculum.ts";
import { getPublishedLesson } from "../../content/published-lessons.ts";

const nonempty = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;

export function validateQuestion(question: PracticeQuestion): string[] {
  const errors: string[] = [];
  if (!nonempty(question.id)) errors.push("Question ID is required.");
  if (!getLessonById(question.lessonId)) errors.push("Question must reference a real lesson.");
  if (question.type !== "single-answer") errors.push("Unsupported question type.");
  if (!["draft", "published"].includes(question.status)) errors.push("Invalid publication status.");
  if (!["unchecked", "source-calculation-checked"].includes(question.reviewStatus)) errors.push("Invalid review status.");
  if (!Number.isInteger(question.displayOrder) || question.displayOrder < 1) errors.push("Display order must be a positive integer.");
  if (!nonempty(question.prompt) || !nonempty(question.given)) errors.push("Prompt and given context are required.");
  const options = Array.isArray(question.options) ? question.options : [];
  if (options.length < 2 || options.some(option => !nonempty(option.id) || !nonempty(option.text))) errors.push("At least two complete options are required.");
  if (new Set(options.map(option => option.id)).size !== options.length) errors.push("Options must have unique IDs.");
  if (new Set(options.map(option => option.text?.trim().toLowerCase())).size !== options.length) errors.push("Options must have distinct answers.");
  if (options.filter(option => option.id === question.correctOptionId).length !== 1) errors.push("Exactly one option must match the answer key.");
  if (question.status === "published") {
    if (question.reviewStatus !== "source-calculation-checked") errors.push("Published questions need source/calculation checks.");
    const solution = question.solution;
    if (!nonempty(question.explanation) || !solution || !nonempty(solution.required) ||
      !nonempty(solution.answer) || !nonempty(solution.interpretation) || !solution.steps?.length ||
      solution.steps.some(step => !nonempty(step.explanation))) errors.push("Published questions need a complete explanation and solution.");
  }
  return errors;
}

export function validatePracticeBank(bank: readonly PracticeQuestion[]): string[] {
  const ids = new Set<string>();
  return bank.flatMap(question => {
    const errors = validateQuestion(question).map(error => `${question.id}: ${error}`);
    if (ids.has(question.id)) errors.push(`${question.id}: duplicate question ID.`);
    ids.add(question.id);
    return errors;
  });
}

export function getPracticeQuestions(lessonId: string, bank: readonly PracticeQuestion[] = practiceQuestions): PracticeQuestion[] {
  if (!getPublishedLesson(lessonId)) return [];
  const counts = new Map<string, number>();
  bank.forEach(question => counts.set(question.id, (counts.get(question.id) ?? 0) + 1));
  return bank.filter(question => question.lessonId === lessonId && question.status === "published" &&
    counts.get(question.id) === 1 && validateQuestion(question).length === 0)
    .sort((a, b) => a.displayOrder - b.displayOrder || a.id.localeCompare(b.id, "en"));
}
