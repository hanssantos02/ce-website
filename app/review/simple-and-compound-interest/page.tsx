import { redirect } from "next/navigation";
import { getPublishedLesson } from "../../../content/published-lessons";
import { registeredLessonIds } from "../../../content/lesson-ids";

export default function InterestReview() {
  // Keep the review bookmark while serving only the approved canonical lesson.
  redirect(getPublishedLesson(registeredLessonIds.simpleAndCompoundInterest)!.href);
}
