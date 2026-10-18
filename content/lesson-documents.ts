import * as forcesAndVectors from "./lessons/forces-and-vectors.mdx";
import * as freeBodyDiagrams from "./lessons/free-body-diagrams.mdx";
import { registeredLessonIds } from "./lesson-ids";

// Explicit local imports keep authored MDX trusted and independent of URL input.
const documents = { [registeredLessonIds.forcesAndVectors]: forcesAndVectors, [registeredLessonIds.freeBodyDiagrams]: freeBodyDiagrams };

export function getLessonDocument(lessonId: string) {
  return Object.entries(documents).find(([id, document]) => id === lessonId && document.lessonId === id)?.[1];
}
