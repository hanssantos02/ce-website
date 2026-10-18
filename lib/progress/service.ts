import { getPublishedLesson } from "../../content/published-lessons.ts";
import { isStoredProgress, type Identity, type StoredProgress, type ProgressRow, type ProgressLoad, type ProgressResult } from "./policy.ts";

export type ProgressGateway = {
  verifyIdentity(): Promise<Identity>;
  read(userId: string, lessonIds: readonly string[]): Promise<ProgressRow[]>;
  upsert(userId: string, lessonId: string, status: StoredProgress): Promise<ProgressRow>;
  remove(userId: string, lessonId: string): Promise<void>;
};
// Injectable eligibility keeps independent-order tests small; production uses the real registry.
type Eligible = (id: string) => unknown;

export async function loadProgress(lessonIds: readonly string[], gateway: ProgressGateway): Promise<ProgressLoad> {
  try {
    const identity = await gateway.verifyIdentity();
    if (identity.kind !== "authenticated") return identity;
    const ids = [...new Set(lessonIds.filter(id => !!getPublishedLesson(id)))];
    const rows = ids.length ? await gateway.read(identity.userId, ids) : [];
    const statuses: Record<string, StoredProgress> = {};
    for (const row of rows) {
      if (!ids.includes(row.lesson_id) || !isStoredProgress(row.status)) return { kind: "unavailable" };
      statuses[row.lesson_id] = row.status;
    }
    return { kind: "ready", userId: identity.userId, statuses, rows };
  } catch { return { kind: "unavailable" }; }
}

export async function performProgress(fields: Record<string, unknown>, gateway: ProgressGateway, eligible: Eligible = getPublishedLesson): Promise<ProgressResult> {
  const lessonId = fields.lessonId;
  const intent = fields.intent;
  if (typeof lessonId !== "string" || !eligible(lessonId) || (intent !== "reset" && intent !== "reload" && !isStoredProgress(intent))) {
    return { kind: "error", message: "Choose an available published lesson and a supported progress action." };
  }
  try {
    const identity = await gateway.verifyIdentity();
    if (identity.kind === "unauthenticated") return { kind: "unauthenticated", message: "Your session has ended. Sign in again to save progress. You can keep reading." };
    if (identity.kind === "unavailable") return { kind: "error", message: "We couldn’t verify your account right now. Try again; you can keep reading." };
    if (intent === "reset" || intent === "reload") {
      if (intent === "reset") await gateway.remove(identity.userId, lessonId);
      const rows = await gateway.read(identity.userId, [lessonId]);
      if (rows.length > 1 || rows.some(row => row.lesson_id !== lessonId || !isStoredProgress(row.status))) throw new Error("Unexpected progress result");
      if (intent === "reset" && rows.length) throw new Error("Reset not confirmed");
      return { kind: intent === "reset" ? "saved" : "loaded", status: rows[0]?.status ?? "not_started", message: intent === "reset" ? "Progress reset to Not Started." : "Saved progress loaded." };
    }
    const row = await gateway.upsert(identity.userId, lessonId, intent);
    if (row.lesson_id !== lessonId || row.status !== intent) throw new Error("Save not confirmed");
    return { kind: "saved", status: row.status, message: intent === "completed" ? "Lesson marked Completed." : "Lesson marked In Progress." };
  } catch (error) {
    if (error && typeof error === "object" && "status" in error && error.status === 401) return { kind: "unauthenticated", message: "Your session has ended. Sign in again to save progress. You can keep reading." };
    return { kind: "error", message: "We couldn’t confirm that change. Your last confirmed status is shown. Try again or reload progress." };
  }
}
