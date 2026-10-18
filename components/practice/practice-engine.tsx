"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { initialAttempt, updateAttempt, type PracticeAction, type PracticeAttempt } from "../../lib/practice/state";

export type PracticeQuestionView = {
  id: string;
  prompt: string;
  given: string;
  options: readonly { id: string; text: string }[];
  correctOptionId: string;
  solution: ReactNode;
};

function AnswerMark({ correct }: { correct: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />{correct ? <path d="m8 12 3 3 5-6" /> : <path d="m9 9 6 6m0-6-6 6" />}
  </svg>;
}

export function PracticeEngine({ questions }: { questions: readonly PracticeQuestionView[] }) {
  const [index, setIndex] = useState(0);
  const [attempts, setAttempts] = useState<Record<string, PracticeAttempt>>({});
  const id = useId();
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const feedback = useRef<HTMLParagraphElement>(null);
  const pendingFocus = useRef<"question" | "feedback" | null>(null);
  const question = questions[index];
  const attempt = question ? attempts[question.id] ?? initialAttempt() : initialAttempt();

  useEffect(() => {
    if (!pendingFocus.current) return;
    (pendingFocus.current === "feedback" ? feedback : questionHeading).current?.focus();
    pendingFocus.current = null;
  }, [index, attempt]);

  if (!question) return null;
  const submitted = attempt.status === "submitted";
  const correctIndex = question.options.findIndex(option => option.id === question.correctOptionId);
  const selectedIndex = question.options.findIndex(option => option.id === attempt.selectedOptionId);
  const letter = (position: number) => String.fromCharCode(65 + position);
  const dispatch = (action: PracticeAction) => setAttempts(previous => ({
    ...previous, [question.id]: updateAttempt(question, previous[question.id] ?? initialAttempt(), action),
  }));
  const navigate = (next: number, focusHeading = true) => {
    if (next < 0 || next >= questions.length || next === index) return;
    pendingFocus.current = focusHeading ? "question" : null;
    setIndex(next);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (attempt.status !== "selected") return;
    pendingFocus.current = "feedback";
    dispatch({ type: "submit" });
  };

  return <div className="practice-engine">
    <p className="practice-position">Question {index + 1} of {questions.length}</p>
    <h3 ref={questionHeading} tabIndex={-1} id={`${id}-question`} className="practice-question-title">{question.prompt}</h3>
    <p className="practice-given" id={`${id}-given`}>{question.given}</p>
    <form onSubmit={submit} aria-labelledby={`${id}-question`}>
      <fieldset className="practice-options" disabled={submitted} aria-describedby={`${id}-given`}>
        <legend>Choose one answer</legend>
        {question.options.map((option, optionIndex) => {
          const selected = attempt.selectedOptionId === option.id;
          const correct = submitted && option.id === question.correctOptionId;
          const incorrect = submitted && selected && !correct;
          return <label key={option.id} className={`practice-option${selected ? " is-selected" : ""}${correct ? " is-correct" : ""}${incorrect ? " is-incorrect" : ""}`}>
            <input type="radio" name={`${id}-${question.id}`} value={option.id} checked={selected}
              onChange={() => dispatch({ type: "select", optionId: option.id })} />
            <span><span className="practice-option-answer">{letter(optionIndex)}. {option.text}</span>
              {(correct || incorrect) && <span className="practice-option-state"><AnswerMark correct={correct} />{correct ? "Correct answer" : "Your answer — incorrect"}{correct && selected ? " · your answer" : ""}</span>}
              {!submitted && selected && <span className="practice-option-state">Selected</span>}
            </span>
          </label>;
        })}
      </fieldset>
      <button className="practice-button practice-submit" type="submit" disabled={attempt.status !== "selected"}>{submitted ? "Answer submitted" : "Submit answer"}</button>
    </form>
    {submitted && <div className="practice-result">
      <p ref={feedback} tabIndex={-1} className="practice-feedback" role="status" aria-atomic="true">
        <AnswerMark correct={attempt.correct} />
        <span>{attempt.correct ? "Correct." : "Incorrect."} Your answer: {letter(selectedIndex)}. {question.options[selectedIndex]?.text}
          {!attempt.correct && <><br />Correct answer: {letter(correctIndex)}. {question.options[correctIndex]?.text}</>}</span>
      </p>
      <section aria-labelledby={`${id}-solution-title`}>
        <h4 id={`${id}-solution-title`}>Detailed solution</h4>
        {question.solution}
      </section>
      <button type="button" className="practice-button" onClick={() => { pendingFocus.current = "question"; dispatch({ type: "retry" }); }}>Retry this question</button>
    </div>}
    <nav className="practice-navigation" aria-label="Practice question navigation">
      <div className="practice-picker"><label htmlFor={`${id}-picker`}>Go to question</label>
        <select id={`${id}-picker`} value={index} onChange={event => navigate(Number(event.target.value), false)}>
          {questions.map((entry, position) => <option value={position} key={entry.id}>Question {position + 1} of {questions.length}</option>)}
        </select>
      </div>
      <div className="practice-navigation-buttons">
        <button className="practice-button" type="button" disabled={index === 0} onClick={() => navigate(index - 1)}>Previous question</button>
        <button className="practice-button" type="button" disabled={index === questions.length - 1} onClick={() => navigate(index + 1)}>Next question</button>
      </div>
    </nav>
  </div>;
}
