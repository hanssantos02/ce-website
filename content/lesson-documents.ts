import * as forcesAndVectors from "./lessons/forces-and-vectors.mdx";

// Explicit local imports keep authored MDX trusted and independent of URL input.
const documents = [forcesAndVectors];

export function getLessonDocument(lessonId: string) {
  return documents.find(document => document.lessonId === lessonId);
}
