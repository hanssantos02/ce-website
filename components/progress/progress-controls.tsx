"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef } from "react";
import { ProgressStatus } from "./progress-status";
import type { ProgressResult, ProgressState } from "../../lib/progress/policy";

export function ProgressControls({ lessonId, loginHref, initialState, action }: {
  lessonId: string;
  loginHref: string;
  initialState: ProgressState;
  action: (data: FormData) => Promise<ProgressResult>;
}) {
  const [state, submit, pending] = useActionState(async (previous: ProgressState, data: FormData): Promise<ProgressState> => {
    try {
      const result = await action(data);
      return { ...result, status: "status" in result ? result.status : previous.status };
    } catch {
      return { ...previous, kind: "error", message: "We couldn’t confirm that change. Try again or reload progress." };
    }
  }, initialState);
  const id = useId();
  const feedback = useRef<HTMLParagraphElement>(null);
  useEffect(() => { if (state.message) feedback.current?.focus(); }, [state]);
  return <section className="lesson-progress" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`} className="progress-title">Your lesson progress</h2>
    {state.status !== null && <p className="progress-current">{state.kind === "error" && <span>Last confirmed: </span>}<ProgressStatus status={state.status} /></p>}
    {pending ? <p className="progress-feedback" role="status">Saving progress…</p> : state.message && <p ref={feedback} tabIndex={-1} className="progress-feedback" role={state.kind === "error" || state.kind === "unauthenticated" ? "alert" : "status"}>{state.message}</p>}
    {state.kind === "unauthenticated" ? <Link href={loginHref} className="text-link progress-login">Sign in to save progress</Link> : <form action={submit} aria-busy={pending}>
      <input type="hidden" name="lessonId" value={lessonId} />
      <fieldset disabled={pending} className="progress-actions" aria-label="Update lesson progress">
        {state.status === null ? <button type="submit" name="intent" value="reload" className="progress-button">Reload progress</button> : <>
          {state.status !== "in_progress" && <button type="submit" name="intent" value="in_progress" className={`progress-button${state.status === "not_started" ? " progress-primary" : ""}`}>{state.status === "completed" ? "Mark In Progress" : "Start Learning"}</button>}
          {state.status !== "completed" && <button type="submit" name="intent" value="completed" className={`progress-button${state.status === "in_progress" ? " progress-primary" : ""}`}>Mark as Complete</button>}
          {state.status !== "not_started" && <button type="submit" name="intent" value="reset" className="progress-button">Reset progress</button>}
          {state.kind === "error" && <button type="submit" name="intent" value="reload" className="progress-button">Reload progress</button>}
        </>}
      </fieldset>
    </form>}
    <p className="progress-note">Updates are saved to your account. Reading or revisiting this lesson does not change its status.</p>
  </section>;
}
