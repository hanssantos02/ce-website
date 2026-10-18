import Link from "next/link";
import { getProgressForLessons } from "../../lib/progress/store";
import { saveProgressAction } from "../../lib/progress/actions";
import { getPublishedLesson } from "../../content/published-lessons";
import { ProgressControls } from "./progress-controls";

export async function LessonProgress({ lessonId }: { lessonId: string }) {
  const lesson = getPublishedLesson(lessonId);
  if (!lesson) return null;
  const result = await getProgressForLessons([lessonId]);
  const loginHref = `/login?next=${encodeURIComponent(lesson.href)}`;
  if (result.kind === "unauthenticated") return <aside className="lesson-progress progress-prompt"><p><Link href={loginHref}>Sign in to save your learning progress.</Link> This lesson is free to read without an account.</p></aside>;
  return <ProgressControls key={result.kind === "ready" ? result.userId : "unavailable"} lessonId={lessonId} loginHref={loginHref} action={saveProgressAction} initialState={result.kind === "ready"
    ? { kind: "ready", status: result.statuses[lessonId] ?? "not_started" }
    : { kind: "error", status: null, message: "Saved progress is unavailable right now. Reload progress to try again; you can keep reading." }} />;
}
