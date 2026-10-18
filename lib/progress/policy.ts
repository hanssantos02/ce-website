export type StoredProgress = "in_progress" | "completed";
export type LessonProgressStatus = "not_started" | StoredProgress;
export type ProgressRow = { lesson_id: string; status: StoredProgress; updated_at?: string };
export type Identity = { kind: "authenticated"; userId: string } | { kind: "unauthenticated" } | { kind: "unavailable" };
export type ProgressLoad = { kind: "ready"; userId: string; statuses: Record<string, StoredProgress>; rows: readonly ProgressRow[] } | { kind: "unauthenticated" } | { kind: "unavailable" };
export type ProgressResult = { kind: "saved" | "loaded"; status: LessonProgressStatus; message: string } | { kind: "error" | "unauthenticated"; message: string };
export type ProgressState = { status: LessonProgressStatus | null; kind: "ready" | ProgressResult["kind"]; message?: string };

export function isStoredProgress(value: unknown): value is StoredProgress {
  return value === "in_progress" || value === "completed";
}

export function classifyIdentityError(error: { name?: string; code?: string; status?: number }): Identity {
  const expired = ["session_not_found", "session_expired", "refresh_token_not_found", "refresh_token_already_used", "bad_jwt", "jwt_expired"];
  return error.name === "AuthSessionMissingError" || expired.includes(error.code ?? "") || error.status === 401 || error.status === 403
    ? { kind: "unauthenticated" } : { kind: "unavailable" };
}

export const progressLabels: Record<LessonProgressStatus, string> = {
  not_started: "Not Started", in_progress: "In Progress", completed: "Completed",
};
