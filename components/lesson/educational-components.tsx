import type { ReactNode } from "react";

export function LessonSection({ section, children }: { section: { id: string; title: string }; children: ReactNode }) {
  return <section id={section.id} tabIndex={-1} className="lesson-section" aria-labelledby={`${section.id}-title`}>
    <h2 id={`${section.id}-title`}>{section.title}</h2>
    {children}
  </section>;
}

export function WorkedExample({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className="worked-example" aria-labelledby={id}>
    <h3 id={id}>{title}</h3>
    {children}
  </section>;
}

export function LessonNote({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="lesson-note" aria-label={title}><h3>{title}</h3>{children}</aside>;
}

export function PracticeSolution({ children }: { children: ReactNode }) {
  return <details className="practice-solution"><summary>Read the solution</summary><div>{children}</div></details>;
}

export function LessonTable({ children }: { children: ReactNode }) {
  return <div className="lesson-table-scroll" role="region" aria-label="Lesson table" tabIndex={0}><table>{children}</table></div>;
}
