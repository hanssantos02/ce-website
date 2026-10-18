import { getLessonById, getLessonHref, getSubjects, getOrderedModules, getOrderedLessons } from "./curriculum.ts";
import { registeredLessonIds } from "./lesson-ids.ts";

export function getPublishedLesson(id: string) {
  const entry = getLessonById(id);
  if (!entry || entry.lesson.availability !== "published" || !Object.values<string>(registeredLessonIds).includes(id)) return undefined;
  const href = getLessonHref(entry.subject, entry.module, entry.lesson);
  return href ? { ...entry, href } : undefined;
}

export function getPublishedLessons() {
  return getSubjects().flatMap(subject => getOrderedModules(subject).flatMap(module => getOrderedLessons(module)
    .flatMap(lesson => { const entry = getPublishedLesson(lesson.id); return entry ? [entry] : []; })));
}

export function getPublishedLessonHrefs() {
  return getPublishedLessons().map(entry => entry.href);
}
