import { progressLabels, type LessonProgressStatus } from "../../lib/progress/policy";

export function ProgressStatus({ status }: { status: LessonProgressStatus }) {
  return <span className="progress-status">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" />
      {status === "completed" && <path d="m8 12 3 3 5-6" />}
      {status === "in_progress" && <path d="M12 7v5l3 2" />}
    </svg>{progressLabels[status]}
  </span>;
}
