import type { Metadata } from "next";
import { LessonReader } from "../../../../../components/lesson/lesson-reader";
import { LessonNavigation } from "../../../../../components/lesson/lesson-navigation";
import { notFound } from "next/navigation";
import { PageContainer } from "../../../../../components/layout/page-container";
import { Breadcrumbs } from "../../../../../components/curriculum/breadcrumbs";
import { getSubjects, getSubjectBySlug, getModuleBySlug, getLessonBySlug, getModuleHref, getLessonHref } from "../../../../../content/curriculum";

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
  return { title: `${lesson.title}${lesson.availability === "published" ? "" : " — Lesson overview"} — CEPath`, description: lesson.shortDescription };
}

export default async function LessonOverviewPage({ params }: Props) {
  const { subject, module, lesson } = await resolveLesson(params);
  if (lesson.availability === "published") return <LessonReader subject={subject} module={module} lesson={lesson} />;
  const moduleHref = getModuleHref(subject, module)!;
  return (
    <>
      <header className="catalog-introduction">
        <PageContainer>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Curriculum", href: "/curriculum" }, { label: subject.abbreviation, href: `/curriculum/${subject.slug}` }, { label: module.title, href: moduleHref }, { label: lesson.title }]} />
          <h1 className="catalog-title subject-page-title">{lesson.title}</h1>
          <p className="catalog-lead">{lesson.shortDescription}</p>
          <p className="availability-note">Lesson overview only. Full explanations and worked examples are not published for this lesson yet.</p>
        </PageContainer>
      </header>
      <section className="content-section subject-content">
        <PageContainer>
          <div className="curriculum-reading lesson-overview">
            <LessonNavigation subject={subject} module={module} lesson={lesson} />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
