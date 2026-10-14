import Link from "next/link";
import { PrerequisiteRecommendations } from "../curriculum/prerequisite-recommendations";
import { getModuleHref, getLessonHref, getRecommendedNeighbors, type Subject, type Module, type Lesson } from "../../content/curriculum";

export function LessonNavigation({ subject, module, lesson }: { subject: Subject; module: Module; lesson: Lesson }) {
  const neighbors = getRecommendedNeighbors(module, lesson.id);
  return <footer className="lesson-navigation">
    <h2 className="section-title">Suggested prerequisites</h2>
    <PrerequisiteRecommendations ids={lesson.prerequisiteIds ?? []} />
    <p className="project-note">Recommendations offer guidance, never permission. Available lessons can be opened directly without an account or completion history.</p>
    <section className="lesson-neighbors" aria-labelledby="sequence-title">
      <h2 id="sequence-title" className="section-title">Within this module</h2>
      <p className="project-note">Suggested order. You’re free to return to the module and explore any available entry.</p>
      <dl>{(["previous", "next"] as const).map(direction => {
        const neighbor = neighbors?.[direction];
        const href = neighbor && getLessonHref(subject, module, neighbor);
        return <div key={direction}><dt>{direction === "previous" ? "Previous" : "Next"} in the recommended sequence</dt>
          <dd>{neighbor ? href ? <Link href={href}>{neighbor.title}</Link> : <>{neighbor.title}<span className="project-note neighbor-availability">Planned · content not available yet</span></> : <span className="project-note">{direction === "previous" ? "This is the first lesson in this module." : "This is the last lesson in this module."}</span>}</dd>
        </div>;
      })}</dl>
    </section>
    <Link href={getModuleHref(subject, module)!} className="text-link subject-back-link">Back to {module.title}</Link>
  </footer>;
}
