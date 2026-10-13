import type { Metadata } from "next";
import { PageContainer } from "../components/layout/page-container";
import { EngineeringVisual, SubjectSymbol } from "../components/landing/engineering-visual";
import { curriculumPreviews, learningJourney, learningValues } from "../content/landing";

export const metadata: Metadata = {
  title: "CEPath — Concept-first civil engineering learning",
  description: "Meet CEPath, a learning platform in development for Filipino civil engineering students preparing for the CELE. Explore its planned subjects and flexible learning approach.",
};

export default function HomePage() {
  return (
    <>
      <section className="introduction" aria-labelledby="page-title">
        <PageContainer className="landing-hero">
          <div>
            <h1 id="page-title" className="page-title">Your path to becoming a civil engineer.</h1>
            <p className="introduction-copy">
              Understand the concepts. Connect the engineering. Prepare for the
              board exams, one idea at a time.
            </p>
            <p className="hero-audience">A learning platform being built for Filipino civil engineering students.</p>
            <div className="hero-actions">
              <a className="primary-link" href="#curriculum">Explore the curriculum <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M10 3v14m-5-5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              <a className="text-link" href="#how-it-works">How it works</a>
            </div>
            <p className="availability-note">In development. Lessons, practice, accounts, and progress tracking are not yet available.</p>
          </div>
          <div className="hero-support">
            <EngineeringVisual />
            <aside className="page-index">
              <nav aria-label="On this page">
                <h2 className="index-title">On this page</h2>
                <a href="#curriculum">Curriculum preview</a>
                <a href="#how-it-works">How CEPath works</a>
                <a href="#about">Why CEPath?</a>
              </nav>
            </aside>
          </div>
        </PageContainer>
      </section>

      <section id="curriculum" className="content-section curriculum-section" tabIndex={-1} aria-labelledby="curriculum-title">
        <PageContainer>
          <div className="section-grid curriculum-introduction">
            <h2 id="curriculum-title" className="section-title">Three subjects.<br />One solid foundation.</h2>
            <div className="reading-copy">
              <p>From the forces in a structure to the water and soil around it, explore the subject groups that shape civil engineering study.</p>
              <p className="project-note">A preview of the planned curriculum. Subject pages and lessons are still to come.</p>
            </div>
          </div>
          <ul className="subject-previews">
            {curriculumPreviews.map((subject) => (
              <li key={subject.id} className="subject-preview">
                <div className="subject-identity">
                  <SubjectSymbol subject={subject.id} />
                  <p>{subject.shorthand}</p>
                </div>
                <div className="subject-heading">
                  <h3>{subject.name}</h3>
                  {"note" in subject && <p className="project-note">{subject.note}</p>}
                </div>
                <div className="subject-details">
                  <p>{subject.description}</p>
                  <p className="topic-label">Representative topics</p>
                  <ul>{subject.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                </div>
              </li>
            ))}
          </ul>
          <p className="curriculum-source">Subject names and topic examples follow the <a href="https://www.prc.gov.ph/sites/default/files/exam%20program%20Sept%202026%20%28CE%29.pdf">PRC September 2026 examination program</a>. This preview is not a complete syllabus.</p>
        </PageContainer>
      </section>

      <section id="how-it-works" className="content-section how-section" tabIndex={-1} aria-labelledby="approach">
        <PageContainer className="section-grid">
          <div className="section-introduction">
            <h2 id="approach" className="section-title anchor-target" tabIndex={-1}>How CEPath will work.</h2>
            <p>A guided path, with room to make it your own.</p>
            <p className="project-note">The learning experience below is planned. For now, you can explore the subject preview.</p>
          </div>
          <div>
            <ol className="approach-list">
              {learningJourney.map((step, index) => (
                <li key={step.title}>
                  <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
            <p className="journey-note">A sequence is a recommendation, not a requirement. You’ll be free to study subjects in any order and revisit every published free lesson.</p>
          </div>
        </PageContainer>
      </section>

      <section id="about" className="content-section about-section" tabIndex={-1} aria-labelledby="about-title">
        <PageContainer className="section-grid">
          <div className="section-introduction">
            <h2 id="about-title" className="section-title">Build understanding,<br />not just a formula sheet.</h2>
            <p>Why we’re building CEPath.</p>
          </div>
          <ul className="value-list">
            {learningValues.map((value) => (
              <li key={value.title}><h3>{value.title}</h3><p>{value.description}</p></li>
            ))}
          </ul>
        </PageContainer>
      </section>

      <section className="content-section closing-section" aria-labelledby="closing-title">
        <PageContainer className="closing-inner">
          <div>
            <h2 id="closing-title" className="section-title">A clearer way to study<br />starts with the foundations.</h2>
            <p>Get to know the subjects and the approach we’re building.</p>
          </div>
          <a className="primary-link" href="#curriculum">Explore the curriculum <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M10 17V3m-5 5 5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
        </PageContainer>
      </section>
    </>
  );
}
