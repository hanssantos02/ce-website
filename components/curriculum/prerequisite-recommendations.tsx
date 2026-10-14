import Link from "next/link";
import { getLessonById, getLessonHref } from "../../content/curriculum";

export function PrerequisiteRecommendations({ ids }: { ids: readonly string[] }) {
  if (!ids.length) return <p className="project-note">No suggested prerequisite lessons.</p>;
  return (
    <div className="prerequisite-recommendations">
      <p>Recommended before this lesson:</p>
      <ul>
        {ids.map(id => {
          const reference = getLessonById(id);
          if (!reference) return <li key={id}>Recommendation unavailable.</li>;
          const href = getLessonHref(reference.subject, reference.module, reference.lesson);
          return <li key={id}>{href ? <Link href={href}>{reference.lesson.title}</Link> : <span>{reference.lesson.title} <span className="project-note">(planned)</span></span>}</li>;
        })}
      </ul>
    </div>
  );
}
