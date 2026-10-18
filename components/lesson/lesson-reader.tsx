import "katex/dist/katex.min.css";
import { LessonProgress } from "../progress/lesson-progress";
import { PracticeSection } from "../practice/practice-section";
import { getPracticeQuestions } from "../../lib/practice/questions";
import { PageContainer } from "../layout/page-container";
import { Breadcrumbs } from "../curriculum/breadcrumbs";
import { LessonNavigation } from "./lesson-navigation";
import { getLessonDocument } from "../../content/lesson-documents";
import { getModuleHref, getOrderedLessons, type Subject, type Module, type Lesson } from "../../content/curriculum";

export function LessonReader({ subject, module, lesson }: { subject: Subject; module: Module; lesson: Lesson }) {
  const document = getLessonDocument(lesson.id);
  if (!document) throw new Error(`Published lesson ${lesson.id} has no registered MDX document.`);
  const Content = document.default;
  const number = getOrderedLessons(module).findIndex(item => item.id === lesson.id) + 1;
  const questions = getPracticeQuestions(lesson.id);
  return <>
    <header className="catalog-introduction">
      <PageContainer><div className="lesson-reading-column">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Curriculum", href: "/curriculum" }, { label: subject.abbreviation, href: `/curriculum/${subject.slug}` }, { label: module.title, href: getModuleHref(subject, module) }, { label: lesson.title }]} />
        <h1 className="catalog-title subject-page-title">{lesson.title}</h1>
        <p className="catalog-lead">{lesson.shortDescription}</p>
        <p className="lesson-context">{subject.abbreviation} · {module.title} · Lesson {number} of {module.lessons.length}</p>
        <p className="availability-note">{document.editorialStatus}</p>
      </div></PageContainer>
    </header>
    <div className="content-section subject-content">
      <PageContainer><div className="lesson-reading-column">
        <LessonProgress lessonId={lesson.id} />
        <details className="topic-index lesson-index">
          <summary>On this page</summary>
          <nav aria-label="Lesson sections"><ol role="list">
            <li><a href="#learning-objectives">Learning objectives</a></li>
            {document.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}
            {!!questions.length && <li><a href="#interactive-practice">Interactive practice</a></li>}
          </ol></nav>
        </details>
        <section id="learning-objectives" tabIndex={-1} className="lesson-objectives lesson-prose" aria-labelledby="objectives-title">
          <h2 id="objectives-title">Learning objectives</h2>
          <p>After this lesson, you should be able to:</p>
          <ol>{document.learningObjectives.map(objective => <li key={objective}>{objective}</li>)}</ol>
        </section>
        <article className="lesson-prose" aria-label={`${lesson.title} lesson content`}><Content /></article>
        <PracticeSection questions={questions} />
        <LessonNavigation subject={subject} module={module} lesson={lesson} />
      </div></PageContainer>
    </div>
  </>;
}
