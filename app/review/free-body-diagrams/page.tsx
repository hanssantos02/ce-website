import { redirect } from "next/navigation";
import { getPublishedLesson } from "../../../content/published-lessons";
import { registeredLessonIds } from "../../../content/lesson-ids";

export default function FreeBodyDiagramsReview() {
  // Preserve the review bookmark while serving content only at its canonical URL.
  redirect(getPublishedLesson(registeredLessonIds.freeBodyDiagrams)!.href);
}
