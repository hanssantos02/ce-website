import "katex/dist/katex.min.css";
import { LessonProgress } from "../progress/lesson-progress";
import { PracticeSection } from "../practice/practice-section";
import { getPracticeQuestions } from "../../lib/practice/questions";
import { PageContainer } from "../layout/page-container";
import { Breadcrumbs } from "../curriculum/breadcrumbs";
import { LessonNavigation } from "./lesson-navigation";
import { LessonIndex } from "./lesson-index";
import { getLessonDocument } from "../../content/lesson-documents";
import { getModuleHref, getOrderedLessons, type Subject, type Module, type Lesson } from "../../content/curriculum";
export function LessonReader({ subject, module, lesson }: { subject: Subject; module: Module; lesson: Lesson }) {
  const document = getLessonDocument(lesson.id);
  if (!document) throw new Error(`Published lesson ${lesson.id} has no registered MDX document.`);
  if (document.lessonId !== lesson.id) throw new Error("Lesson content does not match curriculum metadata.");
  const Content = document.default;
  const number = getOrderedLessons(module).findIndex(item => item.id === lesson.id) + 1;
  const questions = getPracticeQuestions(lesson.id);
  const sections = [{ id: "learning-objectives", title: "Learning objectives" }, ...document.sections,
    ...(questions.length ? [{ id: "interactive-practice", title: "Interactive practice" }] : [])];
  return <div className="lesson-reader">
    <header className="chapter-header">
      <PageContainer className="lesson-workspace-container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Curriculum", href: "/curriculum" }, { label: subject.abbreviation, href: `/curriculum/${subject.slug}` }, { label: module.title, href: getModuleHref(subject, module) }, { label: lesson.title }]} />
        <div className="chapter-introduction">
          <h1 className="chapter-title">{lesson.title}</h1>
          <p className="chapter-description">{lesson.shortDescription}</p>
          <div className="chapter-metadata">
            <p className="chapter-context">{subject.abbreviation} · {module.title} <span>Lesson {number} of {module.lessons.length}</span></p>
            <p className="chapter-editorial">{document.editorialStatus}</p>
          </div>
        </div>
      </PageContainer>
    </header>
    <div className="chapter-content">
      <PageContainer className="lesson-workspace-container"><div className="lesson-workspace">
        <div className="lesson-progress-placement"><LessonProgress lessonId={lesson.id} /></div>
        <LessonIndex sections={sections} />
        <div className="lesson-reading-column">
        <section id="learning-objectives" tabIndex={-1} className="lesson-objectives lesson-prose" aria-labelledby="objectives-title">
          <h2 id="objectives-title">Learning objectives</h2>
          <p>After this lesson, you should be able to:</p>
          <ol>{document.learningObjectives.map(objective => <li key={objective}>{objective}</li>)}</ol>
        </section>
        <article className="lesson-prose" aria-label={`${lesson.title} lesson content`}><Content /></article>
        <PracticeSection questions={questions} source={lesson.source} />
        <LessonNavigation subject={subject} module={module} lesson={lesson} />
        </div>
      </div></PageContainer>
    </div>
  </div>;
}
