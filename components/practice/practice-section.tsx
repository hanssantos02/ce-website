import "server-only";
import { PracticeEngine } from "./practice-engine";
import { practiceEditorialStatus, practiceSource, type PracticeQuestion } from "../../content/practice-questions";
import { renderPracticeMath } from "../../lib/practice/math";

function Solution({ question }: { question: PracticeQuestion }) {
  return <div className="practice-solution-copy">
    <p>{question.explanation}</p>
    <dl className="practice-givens">
      <div><dt>Given</dt><dd>{question.given}</dd></div>
      <div><dt>Required</dt><dd>{question.solution.required}</dd></div>
    </dl>
    <ol className="practice-steps">{question.solution.steps.map((step, index) => <li key={index}>
      <p>{step.explanation}</p>
      {step.equation && <div className="practice-math" role="region" aria-label={`Solution equation ${index + 1}`} tabIndex={0}
        dangerouslySetInnerHTML={{ __html: renderPracticeMath(step.equation) }} />}
    </li>)}</ol>
    <p className="practice-final-answer"><strong>Final answer:</strong> {question.solution.answer}</p>
    <p>{question.solution.interpretation}</p>
  </div>;
}

export function PracticeSection({ questions }: { questions: readonly PracticeQuestion[] }) {
  if (!questions.length) return null;
  return <section id="interactive-practice" tabIndex={-1} className="lesson-practice" aria-labelledby="interactive-practice-title">
    <h2 id="interactive-practice-title">Practice what you’ve learned</h2>
    <p>Try {questions.length} original self-study questions. Choose any question, check your reasoning, and retry whenever you need.</p>
    <p className="practice-note">Answers stay on this page until refresh. Practice does not save attempts or change your lesson progress.</p>
    <p className="practice-note">{practiceEditorialStatus} These are CEPath questions, not official PRC examination items.</p>
    <PracticeEngine questions={questions.map(question => ({
      id: question.id, prompt: question.prompt, given: question.given, options: question.options,
      correctOptionId: question.correctOptionId, solution: <Solution question={question} />,
    }))} />
    <p className="practice-source">Vector conventions: <a href={practiceSource.url}>{practiceSource.label}</a>.</p>
    <a className="practice-return" href="#learning-objectives">Return to the lesson content</a>
    <noscript><p>Interactive practice needs JavaScript. The lesson and its worked examples remain available to read.</p></noscript>
  </section>;
}
