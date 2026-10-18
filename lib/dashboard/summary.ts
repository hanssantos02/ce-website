import { getSubjects } from "../../content/curriculum.ts";
import { getPublishedLessons } from "../../content/published-lessons.ts";
import { isStoredProgress, type ProgressLoad, type ProgressRow } from "../progress/policy.ts";

export type PublishedLesson = ReturnType<typeof getPublishedLessons>[number];

function activityTime(row: ProgressRow) {
  const time = row.updated_at ? Date.parse(row.updated_at) : NaN;
  return Number.isFinite(time) ? time : -Infinity;
}

// The optional catalog is an isolated-test seam; production always uses the registry.
export function deriveDashboard(rows: readonly ProgressRow[], catalog = getPublishedLessons()) {
  const lessons = [...catalog].filter(entry => entry.lesson.availability === "published" && entry.href).sort((a, b) =>
    a.subject.displayOrder - b.subject.displayOrder || a.module.displayOrder - b.module.displayOrder ||
    a.lesson.displayOrder - b.lesson.displayOrder || a.lesson.id.localeCompare(b.lesson.id, "en"));
  const positions = new Map(lessons.map((entry, index) => [entry.lesson.id, index]));
  const progress = new Map<string, ProgressRow>();
  let ignoredRecords = 0;
  for (const row of rows) {
    if (!positions.has(row.lesson_id) || !isStoredProgress(row.status)) { ignoredRecords++; continue; }
    const previous = progress.get(row.lesson_id);
    // PK prevents duplicates in storage. Defensively deduplicate imported/test inputs too.
    if (!previous || activityTime(row) > activityTime(previous) ||
      (activityTime(row) === activityTime(previous) && row.status < previous.status)) progress.set(row.lesson_id, row);
  }
  const recent = [...progress.values()].sort((a, b) =>
    activityTime(b) - activityTime(a) || positions.get(a.lesson_id)! - positions.get(b.lesson_id)!);
  const byId = new Map(lessons.map(entry => [entry.lesson.id, entry]));
  const inProgressLessons = recent.filter(row => row.status === "in_progress").map(row => byId.get(row.lesson_id)!);
  const completedLessons = recent.filter(row => row.status === "completed").map(row => byId.get(row.lesson_id)!);
  const incomplete = lessons.filter(entry => progress.get(entry.lesson.id)?.status !== "completed");
  const continueLesson = inProgressLessons[0];
  // Continue the latest explicitly unfinished work; otherwise use the latest recorded activity.
  const context = continueLesson ?? (recent[0] ? byId.get(recent[0].lesson_id) : undefined);
  const recommendedLesson = (context && (
    incomplete.find(entry => entry.module.id === context.module.id) ??
    incomplete.find(entry => entry.subject.id === context.subject.id)
  )) || incomplete[0];
  const subjects = getSubjects().map(subject => {
    const available = lessons.filter(entry => entry.subject.id === subject.id).length;
    const completed = completedLessons.filter(entry => entry.subject.id === subject.id).length;
    return { subject, available, completed, percentage: available ? Math.round(completed / available * 100) : null };
  });
  return {
    available: lessons.length, completed: completedLessons.length, inProgress: inProgressLessons.length,
    hasProgress: progress.size > 0, allCompleted: lessons.length > 0 && incomplete.length === 0,
    subjects, continueLesson, recommendedLesson, inProgressLessons, completedLessons, ignoredRecords,
  };
}

export type DashboardSummary = ReturnType<typeof deriveDashboard>;

export function dashboardFromProgress(progress: ProgressLoad) {
  return progress.kind === "ready"
    ? { kind: "ready" as const, dashboard: deriveDashboard(progress.rows) }
    : { kind: progress.kind };
}
