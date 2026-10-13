import type { SubjectId } from "../../content/curriculum";

export function SubjectSymbol({ subject }: { subject: SubjectId }) {
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" className="subject-symbol">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        {subject === "psad" && <path d="M7 39V11h34v28M7 11l34 28M7 39l34-28M2 40h10m24 0h10" />}
        {subject === "mste" && <><path d="m6 37 18-26 18 26H6Zm18-26v26M16 43h16M24 37v6" /><circle cx="24" cy="11" r="4" /></>}
        {subject === "hge" && <><path d="M4 19c5-5 8 5 13 0s8 5 13 0 8 5 14 0M4 28h40M4 34h40M4 40h40M19 8v10m10-10v10" /><path d="m8 34 6 6m8-6 6 6m8-6 6 6" /></>}
      </g>
    </svg>
  );
}
