import { getProgressForLessons } from "../../../../lib/progress/store";
import { ProgressStatus } from "../../../../components/progress/progress-status";
import { getPublishedLesson } from "../../../../content/published-lessons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "../../../../components/layout/page-container";
import { Breadcrumbs } from "../../../../components/curriculum/breadcrumbs";
import { PrerequisiteRecommendations } from "../../../../components/curriculum/prerequisite-recommendations";
import { getSubjects, getSubjectBySlug, getOrderedModules, getModuleBySlug, getModuleHref, getOrderedLessons, getLessonHref } from "../../../../content/curriculum";

type Props = { params: Promise<{ slug: string; moduleSlug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getSubjects().flatMap(subject => getOrderedModules(subject)
    .filter(module => getModuleHref(subject, module))
    .map(module => ({ slug: subject.slug, moduleSlug: module.slug })));
}

async function resolveModule(params: Props["params"]) {
  const { slug, moduleSlug } = await params;
  const subject = getSubjectBySlug(slug);
  const module = subject && getModuleBySlug(subject, moduleSlug);
  if (!subject || !module || !getModuleHref(subject, module)) notFound();
  return { subject, module };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module, subject } = await resolveModule(params);
  return { title: `${module.title} — ${subject.abbreviation} — CEPath`, description: module.description };
}

export default async function ModulePage({ params }: Props) {
  const { subject, module } = await resolveModule(params);
  const lessons = getOrderedLessons(module);
  const publishedIds = lessons.filter(lesson => getPublishedLesson(lesson.id)).map(lesson => lesson.id);
  const progress = publishedIds.length ? await getProgressForLessons(publishedIds) : undefined;
  const overviewCount = lessons.filter(lesson => lesson.availability === "overview").length;
  const publishedCount = lessons.filter(lesson => lesson.availability === "published").length;
  return (
    <>
      <header className="catalog-introduction">
        <PageContainer>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Curriculum", href: "/curriculum" }, { label: subject.abbreviation, href: `/curriculum/${subject.slug}` }, { label: module.title }]} />
          <h1 className="catalog-title subject-page-title">{module.title}</h1>
          <p className="catalog-lead">{module.description}</p>
          <p className="availability-note">Module overview · {lessons.length} lessons defined · {publishedCount} {publishedCount === 1 ? "lesson" : "lessons"} published · {overviewCount} {overviewCount === 1 ? "overview" : "overviews"} available.</p>
        </PageContainer>
      </header>
      <section className="content-section subject-content" aria-labelledby="lesson-sequence-title">
        <PageContainer>
          <div className="curriculum-reading">
            <h2 id="lesson-sequence-title" className="section-title">Recommended lesson sequence</h2>
            <p className="topic-order-note project-note">This order is a guide. Open any available lesson or overview directly; prerequisites are optional recommendations.</p>
            {progress?.kind === "unavailable" && <p className="progress-list-note" role="status">Saved progress is unavailable right now. Lesson availability is shown below; you can still open any published lesson.</p>}
            {lessons.length ? (
              <ol className="approach-list lesson-sequence" role="list">
                {lessons.map(lesson => {
                  const href = getLessonHref(subject, module, lesson);
                  return <li key={lesson.id}>
                    <span className="step-number" aria-hidden="true">{String(lesson.displayOrder).padStart(2, "0")}</span>
                    <div>
                      <h3>{href ? <Link href={href} className="curriculum-entry-link">{lesson.title}<span className="entry-action">{lesson.availability === "published" ? "Open lesson" : "Open overview"}</span></Link> : lesson.title}</h3>
                      <p>{lesson.shortDescription}</p>
                      <p className="entry-availability">{lesson.availability === "published" ? "Lesson available" : href ? "Overview available · full lesson coming later" : "Planned lesson · no overview available yet"}</p>
                      {progress?.kind === "ready" && getPublishedLesson(lesson.id) && <p className="progress-list-status"><ProgressStatus status={progress.statuses[lesson.id] ?? "not_started"} /></p>}
                      {!!lesson.prerequisiteIds?.length && <PrerequisiteRecommendations ids={lesson.prerequisiteIds} />}
                    </div>
                  </li>;
                })}
              </ol>
            ) : (
              <div className="curriculum-empty">
                <h3>Lesson sequence not defined yet</h3>
                <p>This representative module has an overview. Its lesson sequence has not been defined yet. Explore the subject’s learning areas while its lesson sequence is being developed.</p>
              </div>
            )}
            {!!lessons.length && <p className="recommendation-note project-note">Prerequisites are illustrative curriculum recommendations and will be reviewed as the lessons develop. They never restrict browsing.</p>}
            <Link href={`/curriculum/${subject.slug}`} className="text-link subject-back-link">Back to {subject.abbreviation}</Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
