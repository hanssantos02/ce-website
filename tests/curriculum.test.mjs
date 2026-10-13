import assert from "node:assert/strict";
import test from "node:test";
import { getSubjects, getSubjectBySlug, getOrderedTopics } from "../content/curriculum.ts";

test("the three independently accessible subjects have stable ordered routes", () => {
  const subjects = getSubjects();
  assert.deepEqual(subjects.map(({ id, slug, abbreviation, displayOrder }) => [id, slug, abbreviation, displayOrder]), [
    ["psad", "psad", "PSAD", 1], ["mste", "mste", "MSTE", 2], ["hge", "hge", "HGE", 3],
  ]);
  for (const subject of subjects) assert.equal(getSubjectBySlug(subject.slug), subject);
});

test("unknown, malformed, and inherited-property slugs never resolve a subject", () => {
  for (const slug of ["", "unknown", "PSAD", "psad/lesson", "constructor", "__proto__"])
    assert.equal(getSubjectBySlug(slug), undefined, slug);
});

test("all supplied topic groups have unique stable IDs and usable overview anchors", () => {
  const allIds = new Set();
  for (const subject of getSubjects()) {
    const topics = getOrderedTopics(subject);
    assert.equal(topics.length, { psad: 9, mste: 10, hge: 13 }[subject.id]);
    assert.deepEqual(topics.map(t => t.displayOrder), topics.map((_, i) => i + 1));
    assert.equal(new Set(topics.map(t => t.slug)).size, topics.length);
    for (const topic of topics) {
      assert(topic.id.startsWith(`${subject.id}-`));
      assert.match(topic.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert(!allIds.has(topic.id));
      allIds.add(topic.id);
      assert(topic.title.trim() && topic.shortDescription.trim());
    }
  }
});

test("explicit topic order wins over storage order without mutating the source", () => {
  const subject = getSubjectBySlug("psad");
  const reversed = [...subject.topics].reverse();
  const overview = { ...subject, topics: reversed };
  assert.deepEqual(getOrderedTopics(overview).map(t => t.id), getOrderedTopics(subject).map(t => t.id));
  assert.deepEqual(overview.topics, reversed);
  assert.equal(overview.topics[0].displayOrder, 9);
});
