import * as forcesAndVectors from "./lessons/forces-and-vectors.mdx";
import * as freeBodyDiagrams from "./lessons/free-body-diagrams.mdx";
import * as simpleAndCompoundInterest from "./lessons/simple-and-compound-interest.mdx";
import { registeredLessonIds } from "./lesson-ids";

// Explicit local imports keep authored MDX trusted and independent of URL input.
const documents = { [registeredLessonIds.forcesAndVectors]: forcesAndVectors, [registeredLessonIds.freeBodyDiagrams]: freeBodyDiagrams, [registeredLessonIds.simpleAndCompoundInterest]: simpleAndCompoundInterest };

export function getLessonDocument(lessonId: string) {
  return Object.entries(documents).find(([id, document]) => id === lessonId && document.lessonId === id)?.[1];
}
