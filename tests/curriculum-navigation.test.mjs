import assert from "node:assert/strict";
import test from "node:test";
import {
  getSubjects, getSubjectBySlug, getOrderedModules, getModuleBySlug,
  getOrderedLessons, getLessonBySlug, getLessonById, getModuleHref,
  getLessonHref, getRecommendedNeighbors, validatePrerequisites,
} from "../content/curriculum.ts";

const psad = () => getSubjectBySlug("psad");
const statics = () => getModuleBySlug(psad(), "engineering-mechanics-statics");

test("all subjects use ordered modules; only PSAD defines sample lessons", () => {
  const modules = getSubjects().flatMap(subject => {
    const ordered = getOrderedModules(subject);
    assert.equal(ordered.length, 1);
    for (const module of ordered) {
      assert.equal(module.subjectId, subject.id);
      assert.equal(module.displayOrder, 1);
      assert.equal(getModuleBySlug(subject, module.slug), module);
      assert.equal(getModuleHref(subject, module), `/curriculum/${subject.slug}/${module.slug}`);
      if (subject.id !== "psad") {
        assert.deepEqual(getOrderedLessons(module), []);
        assert.equal(getRecommendedNeighbors(module, "missing"), undefined);
      }
      assert.equal(new Set(module.lessons.map(l => l.slug)).size, module.lessons.length);
      for (const lesson of module.lessons) assert.equal(lesson.moduleId, module.id);
    }
    return ordered;
  });
  assert.equal(new Set(modules.map(m => m.id)).size, modules.length);
});

test("two published lessons are navigable; planned lessons and mismatched parents have no destinations", () => {
  const subject = psad(), module = statics(), lessons = getOrderedLessons(module);
  assert.deepEqual(lessons.map(l => l.title), ["Forces and Vectors", "Free Body Diagrams", "Equilibrium of Particles", "Equilibrium of Rigid Bodies"]);
  assert.deepEqual(lessons.map(l => l.displayOrder), [1, 2, 3, 4]);
  assert.equal(getLessonHref(subject, module, lessons[0]), "/curriculum/psad/engineering-mechanics-statics/forces-and-vectors");
  assert.equal(getLessonHref(subject, module, lessons[1]), "/curriculum/psad/engineering-mechanics-statics/free-body-diagrams");
  for (const lesson of lessons.slice(2)) assert.equal(getLessonHref(subject, module, lesson), undefined);
  assert.equal(getModuleHref(getSubjectBySlug("hge"), module), undefined);
  assert.equal(getLessonHref(subject, module, { ...lessons[0], moduleId: "wrong-parent" }), undefined);
  assert.equal(getLessonHref(subject, { ...module, availability: "planned" }, lessons[0]), undefined);
});

test("lookup is exact and scoped; stable prerequisite IDs resolve independent of titles", () => {
  const module = statics();
  for (const slug of ["missing", "PSAD", "constructor", "__proto__"])
    assert.equal(getModuleBySlug(psad(), slug), undefined);
  assert.equal(getModuleBySlug(getSubjectBySlug("hge"), module.slug), undefined);
  for (const slug of ["missing", "constructor", "FORCES-AND-VECTORS"])
    assert.equal(getLessonBySlug(module, slug), undefined);
  const lessons = getOrderedLessons(module);
  assert.equal(getLessonBySlug(module, lessons[0].slug), lessons[0]);
  for (const id of lessons[2].prerequisiteIds) {
    const result = getLessonById(id);
    assert.equal(result.subject, psad());
    assert.equal(result.module, module);
    assert(lessons.includes(result.lesson));
  }
  assert.equal(getLessonById("missing"), undefined);
});

test("ordering and immediate neighbors preserve boundaries, planned entries and stable IDs", () => {
  const module = statics(), original = module.lessons;
  const reversed = { ...module, lessons: [...original].reverse() };
  assert.deepEqual(getOrderedLessons(reversed), getOrderedLessons(module));
  assert.equal(reversed.lessons[0].displayOrder, 4);
  const ordered = getOrderedLessons(module);
  assert.deepEqual(getRecommendedNeighbors(reversed, ordered[0].id), { previous: undefined, next: ordered[1] });
  assert.deepEqual(getRecommendedNeighbors(module, ordered[3].id), { previous: ordered[2], next: undefined });
  assert.equal(getRecommendedNeighbors(module, "missing"), undefined);
  const renamed = { ...module, lessons: original.map(l => ({ ...l, title: "Changed label", slug: `renamed-${l.slug}` })) };
  assert.equal(getRecommendedNeighbors(renamed, ordered[2].id).previous.id, ordered[1].id);
});

test("prerequisite validation rejects missing, self, duplicate and circular references", () => {
  const lessons = getSubjects().flatMap(s => s.modules.flatMap(m => m.lessons));
  assert.deepEqual(validatePrerequisites(lessons), []);
  const [a, b] = lessons;
  assert(validatePrerequisites([{ ...a, prerequisiteIds: ["missing"] }]).some(e => e.includes("missing")));
  assert(validatePrerequisites([{ ...a, prerequisiteIds: [a.id] }]).some(e => e.includes("itself")));
  assert(validatePrerequisites([a, a]).some(e => e.includes("Duplicate")));
  assert(validatePrerequisites([{ ...a, prerequisiteIds: [b.id] }, { ...b, prerequisiteIds: [a.id] }]).some(e => e.includes("Circular")));
});
