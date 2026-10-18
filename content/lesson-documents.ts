import * as forcesAndVectors from "./lessons/forces-and-vectors.mdx";
import { registeredLessonIds } from "./lesson-ids";

// Explicit local imports keep authored MDX trusted and independent of URL input.
const documents = { [registeredLessonIds.forcesAndVectors]: forcesAndVectors };

export function getLessonDocument(lessonId: string) {
  return Object.entries(documents).find(([id, document]) => id === lessonId && document.lessonId === id)?.[1];
}
