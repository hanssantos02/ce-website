import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "../../../../../components/layout/page-container";
import { Breadcrumbs } from "../../../../../components/curriculum/breadcrumbs";
import { PrerequisiteRecommendations } from "../../../../../components/curriculum/prerequisite-recommendations";
import { getSubjects, getSubjectBySlug, getModuleBySlug, getLessonBySlug, getModuleHref, getLessonHref, getRecommendedNeighbors } from "../../../../../content/curriculum";

type Props = { params: Promise<{ slug: string; moduleSlug: string; lessonSlug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getSubjects().flatMap(subject => subject.modules.flatMap(module => module.lessons
    .filter(lesson => getLessonHref(subject, module, lesson))
    .map(lesson => ({ slug: subject.slug, moduleSlug: module.slug, lessonSlug: lesson.slug }))));
}

async function resolveLesson(params: Props["params"]) {
  const { slug, moduleSlug, lessonSlug } = await params;
  const subject = getSubjectBySlug(slug);
  const module = subject && getModuleBySlug(subject, moduleSlug);
  const lesson = module && getLessonBySlug(module, lessonSlug);
  if (!subject || !module || !lesson || !getLessonHref(subject, module, lesson)) notFound();
  return { subject, module, lesson };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lesson } = await resolveLesson(params);
  return { title: `${lesson.title} — Lesson overview — CEPath`, description: `${lesson.shortDescription} Metadata overview only; complete lesson content is not available yet.` };
}

export default async function LessonOverviewPage({ params }: Props) {
  const { subject, module, lesson } = await resolveLesson(params);
  const neighbors = getRecommendedNeighbors(module, lesson.id);
  const moduleHref = getModuleHref(subject, module)!;
  return (
    <>
      <header className="catalog-introduction">
        <PageContainer>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Curriculum", href: "/curriculum" }, { label: subject.abbreviation, href: `/curriculum/${subject.slug}` }, { label: module.title, href: moduleHref }, { label: lesson.title }]} />
          <h1 className="catalog-title subject-page-title">{lesson.title}</h1>
          <p className="catalog-lead">{lesson.shortDescription}</p>
          <p className="availability-note">Lesson overview only. The complete lesson reader is planned for Milestone 06; explanations, worked examples and practice are not available here yet.</p>
        </PageContainer>
      </header>
      <section className="content-section subject-content" aria-labelledby="prerequisites-title">
        <PageContainer>
          <div className="curriculum-reading lesson-overview">
            <h2 id="prerequisites-title" className="section-title">Suggested prerequisites</h2>
            <PrerequisiteRecommendations ids={lesson.prerequisiteIds ?? []} />
            <p className="project-note">Recommendations offer guidance, never permission. Available overviews can be opened directly without an account or completion history.</p>
            <section className="lesson-neighbors" aria-labelledby="sequence-title">
              <h2 id="sequence-title" className="section-title">Within this module</h2>
              <p className="project-note">Suggested order. You’re free to return to the module and explore any available entry.</p>
              <dl>
                {(["previous", "next"] as const).map(direction => {
                  const neighbor = neighbors?.[direction];
                  const href = neighbor && getLessonHref(subject, module, neighbor);
                  return <div key={direction}>
                    <dt>{direction === "previous" ? "Previous" : "Next"} in the recommended sequence</dt>
                    <dd>{neighbor ? href ? <Link href={href}>{neighbor.title}</Link> : <><span>{neighbor.title}</span><span className="project-note neighbor-availability">Planned · overview not available yet</span></> : <span className="project-note">{direction === "previous" ? "This is the first lesson in this module." : "This is the last lesson in this module."}</span>}</dd>
                  </div>;
                })}
              </dl>
            </section>
            {lesson.source && <p className="curriculum-source">Topic description checked against <a href={lesson.source.url}>{lesson.source.label}</a>. This overview is not a published lesson.</p>}
            <Link href={moduleHref} className="text-link subject-back-link">Back to {module.title}</Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
