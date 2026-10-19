"use client";

import { useEffect, useRef, useState } from "react";

type Section = { id: string; title: string };

/** One native disclosure serves the mobile index and the desktop chapter rail. */
export function LessonIndex({ sections }: { sections: readonly Section[] }) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 72rem)");
    const adapt = () => { if (disclosure.current) disclosure.current.open = wide.matches; };
    adapt();
    wide.addEventListener("change", adapt);

    let frame = 0;
    const update = () => {
      frame = 0;
      let active: string | null = null;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= 160) active = section.id;
      }
      setCurrent(active);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      wide.removeEventListener("change", adapt);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  return <details ref={disclosure} className="lesson-index">
    <summary>On this page</summary>
    <nav aria-label="Lesson sections"><ol role="list">
      {sections.map((section, index) => <li key={section.id}>
        <a href={`#${section.id}`} aria-current={current === section.id ? "location" : undefined}>
          <span className="lesson-index-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span>{section.title}</span>
        </a>
      </li>)}
    </ol></nav>
  </details>;
}
