import "server-only";
import { getPublishedLessons } from "../../content/published-lessons";
import { getProgressForLessons } from "../progress/store";
import { dashboardFromProgress } from "./summary";

export async function getDashboard() {
  // One scoped query, fresh server identity and request-local caching, shared with M08.
  return dashboardFromProgress(await getProgressForLessons(getPublishedLessons().map(entry => entry.lesson.id)));
}
