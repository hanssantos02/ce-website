import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "../../components/layout/page-container";
import { Breadcrumbs } from "../../components/curriculum/breadcrumbs";
import { SubjectSymbol } from "../../components/curriculum/subject-symbol";
import { getSubjects, curriculumSource } from "../../content/curriculum";

export const metadata: Metadata = {
  title: "Curriculum — CEPath",
  description: "Explore PSAD, MSTE, and HGE subject overviews and representative learning areas. Choose any subject without an account; lessons are coming soon.",
};

export default function CurriculumPage() {
  return (
    <>
      <header className="catalog-introduction">
        <PageContainer>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Curriculum" }]} />
          <h1 className="catalog-title">Your civil engineering learning path.</h1>
          <p className="catalog-lead">Explore the three CELE subject groups. Follow the suggested study order, or start with the topics you need most.</p>
          <p className="availability-note">Subject overviews are ready to explore. Lessons are coming soon.</p>
        </PageContainer>
      </header>
      <section className="content-section catalog-subjects" aria-label="Choose a subject">
        <PageContainer>
          <ul className="subject-cards" role="list">
            {getSubjects().map((subject) => (
              <li key={subject.id}>
                <Link href={`/curriculum/${subject.slug}`} className="subject-card" aria-labelledby={`${subject.id}-title ${subject.id}-action`}>
                  <div className="subject-identity">
                    <SubjectSymbol subject={subject.id} />
                    <p>{subject.abbreviation}</p>
                  </div>
                  <div className="subject-card-heading">
                    <h2 id={`${subject.id}-title`}>{subject.title}</h2>
                    <p>{subject.description}</p>
                    {subject.note && <p className="project-note">{subject.note}</p>}
                  </div>
                  <div className="subject-card-topics">
                    <p className="topic-label">Representative topics</p>
                    <ul>{subject.previewTopics.map(topic => <li key={topic}>{topic}</li>)}</ul>
                    <span className="subject-explore" id={`${subject.id}-action`}>Explore {subject.abbreviation}
                      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M3 10h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="curriculum-source">Subject terminology follows the <a href={curriculumSource.url}>{curriculumSource.label}</a>. Topic groupings are representative CEPath learning areas, not a complete official syllabus.</p>
        </PageContainer>
      </section>
      <section className="content-section how-section" aria-labelledby="flexible-title">
        <PageContainer className="section-grid">
          <h2 id="flexible-title" className="section-title">A recommended sequence.<br />Your own route.</h2>
          <div className="reading-copy">
            <p>Every subject overview is open. Study subjects in any order, jump to a topic description, or return to a previous concept whenever you need.</p>
            <p>The future curriculum will offer recommended sequences and suggested prerequisites. These will guide your study without locks. Every published free lesson will remain available anonymously, regardless of what you’ve completed.</p>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
