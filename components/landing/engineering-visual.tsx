export function EngineeringVisual() {
  return (
    <figure className="engineering-figure">
      <svg viewBox="0 0 480 240" aria-hidden="true" className="structure-drawing">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M40 164h400M40 164l100-100h200l100 100M140 64v100l100-100v100L340 64v100M40 164l100-100 100 100 100-100 100 100" />
          <path d="m40 164-12 20h24Zm400 0-12 20h24Z" />
          <path d="M140 22v30m-5-7 5 7 5-7M240 22v30m-5-7 5 7 5-7M340 22v30m-5-7 5 7 5-7" />
          <path d="M22 193h36m364 0h36M40 208h400M40 201v14m400-14v14" className="drawing-secondary" />
          <path d="M40 39v110M440 39v110M23 64h99m236 0h99" strokeDasharray="3 5" className="drawing-secondary" />
        </g>
        <g fill="var(--surface-reading)" stroke="currentColor" strokeWidth="1.5">
          <circle cx="40" cy="164" r="3" /><circle cx="140" cy="64" r="3" />
          <circle cx="140" cy="164" r="3" /><circle cx="240" cy="64" r="3" />
          <circle cx="240" cy="164" r="3" /><circle cx="340" cy="64" r="3" />
          <circle cx="340" cy="164" r="3" /><circle cx="440" cy="164" r="3" />
        </g>
      </svg>
      <figcaption>
        <span>See the idea behind the structure.</span>
        <span className="drawing-caption-note">Illustrative geometry, not a worked design.</span>
      </figcaption>
    </figure>
  );
}

export function SubjectSymbol({ subject }: { subject: "psad" | "mste" | "hge" }) {
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
