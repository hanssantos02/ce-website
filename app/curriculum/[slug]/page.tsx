import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "../../../components/layout/page-container";
import { Breadcrumbs } from "../../../components/curriculum/breadcrumbs";
import { SubjectSymbol } from "../../../components/curriculum/subject-symbol";
import { getSubjects, getSubjectBySlug, getOrderedTopics, curriculumSource } from "../../../content/curriculum";

type SubjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getSubjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: SubjectPageProps): Promise<Metadata> {
  const subject = getSubjectBySlug((await params).slug);
  if (!subject) return { title: "Subject not found — CEPath" };
  return { title: `${subject.abbreviation}: ${subject.title} — CEPath`, description: `${subject.description} Explore representative learning areas and suggested study order. Lessons are coming soon.` };
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const subject = getSubjectBySlug((await params).slug);
  if (!subject) notFound();
  const topics = getOrderedTopics(subject);

  return (
    <>
      <header className="catalog-introduction">
        <PageContainer>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Curriculum", href: "/curriculum" }, { label: subject.abbreviation }]} />
          <h1 className="catalog-title subject-page-title">{subject.title}</h1>
          <p className="catalog-lead">{subject.description}</p>
          {subject.note && <p className="project-note subject-name-note">{subject.note}</p>}
          <p className="availability-note">Subject overview · Lessons coming soon. The entries below are informational, not lesson pages.</p>
        </PageContainer>
      </header>
      <section className="content-section subject-content" aria-labelledby="learning-areas-title">
        <PageContainer className="subject-reading-grid">
          <aside className="subject-navigation">
            <div className="subject-identity subject-context">
              <SubjectSymbol subject={subject.id} />
              <p>{subject.abbreviation}</p>
            </div>
            <details className="topic-index">
              <summary>On this page</summary>
              <nav aria-label={`${subject.abbreviation} topic index`}>
                <ol role="list">
                  {topics.map(topic => <li key={topic.id}><a href={`#${topic.slug}`}>{topic.title}</a></li>)}
                </ol>
                <a href="#curriculum-structure">Future curriculum structure</a>
              </nav>
            </details>
            <p className="project-note">Choose any topic description. This order is a guide, never a requirement.</p>
          </aside>
          <div className="subject-reading-content">
            <h2 id="learning-areas-title" className="section-title">Learning areas</h2>
            <p className="subject-learning-overview">{subject.learningOverview}</p>
            <p className="project-note topic-order-note">Suggested study order. Start anywhere; these representative groupings are not a complete syllabus.</p>
            <ol className="approach-list topic-list" role="list">
              {topics.map(topic => (
                <li key={topic.id} id={topic.slug} tabIndex={-1} aria-labelledby={`${topic.slug}-title`}>
                  <span className="step-number" aria-hidden="true">{String(topic.displayOrder).padStart(2, "0")}</span>
                  <div><h3 id={`${topic.slug}-title`}>{topic.title}</h3><p>{topic.shortDescription}</p></div>
                </li>
              ))}
            </ol>
            <section id="curriculum-structure" className="future-structure" tabIndex={-1} aria-labelledby="structure-title">
              <h2 id="structure-title" className="section-title">How the curriculum will fit together</h2>
              <p>These learning areas will eventually be organized into modules and lessons. The planned structure is:</p>
              <dl>
                <div><dt>Subject</dt><dd>The broad learning track you’re exploring now.</dd></div>
                <div><dt>Module</dt><dd>A planned group of related lessons within a subject.</dd></div>
                <div><dt>Lesson</dt><dd>Future concepts, engineering examples, and practice. Lessons are not available yet.</dd></div>
              </dl>
              <p>Suggested prerequisites will offer advice. Students will be free to skip, switch subjects, and revisit every published free lesson without an account.</p>
            </section>
            <p className="curriculum-source">Subject terminology follows the <a href={curriculumSource.url}>{curriculumSource.label}</a>. Groupings and suggested study order are CEPath’s introductory organization.</p>
            <Link href="/curriculum" className="text-link subject-back-link">Back to the curriculum catalog</Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
