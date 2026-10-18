"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { signupAction, loginAction, recoveryAction, updatePasswordAction } from "../../lib/auth/actions";
import type { AuthMode, AuthState } from "../../lib/auth/policy";
import { SubmitButton } from "./submit-button";

const actions = { signup: signupAction, login: loginAction, "forgot-password": recoveryAction, "update-password": updatePasswordAction };
const labels = { signup: "Create account", login: "Log in", "forgot-password": "Send recovery link", "update-password": "Update password" };

export function AuthForm({ mode, configured, next = "/account", linkError = false }: { mode: AuthMode; configured: boolean; next?: string; linkError?: boolean }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(actions[mode], { status: "idle" });
  const [visible, setVisible] = useState(false);
  const id = useId();
  const feedback = useRef<HTMLDivElement>(null);
  useEffect(() => { if (state.status !== "idle") feedback.current?.focus(); }, [state]);
  const complete = state.status === "pending-email" || state.status === "success";
  return <>
    {linkError && <p className="auth-feedback" role="alert">This email link could not be used. It may be expired, already used or opened in a different browser. Request a new recovery link, or try logging in if you have already confirmed your email.</p>}
    {!configured && <p className="auth-feedback" role="status">Account services are unavailable right now. You can continue reading without an account.</p>}
    <form action={action} className="auth-form" noValidate>
      {state.message && <div ref={feedback} tabIndex={-1} role={state.status === "error" ? "alert" : "status"} className="auth-feedback"><p>{state.message}</p></div>}
      {!complete && <>
        {mode !== "update-password" && <div className="auth-field">
          <label htmlFor={`${id}-email`}>Email address</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} defaultValue={state.email ?? ""} aria-invalid={!!state.errors?.email} aria-describedby={state.errors?.email ? `${id}-email-error` : undefined} />
          {state.errors?.email && <p id={`${id}-email-error`} className="auth-field-error">{state.errors.email}</p>}
        </div>}
        {mode !== "forgot-password" && <>
          <div className="auth-field">
            <label htmlFor={`${id}-password`}>{mode === "update-password" ? "New password" : "Password"}</label>
            <div className="password-input">
              <input id={`${id}-password`} name="password" type={visible ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} required aria-invalid={!!state.errors?.password} aria-describedby={`${id}-password-help${state.errors?.password ? ` ${id}-password-error` : ""}`} />
              <button type="button" className="password-toggle" aria-label={visible ? "Hide password" : "Show password"} title={visible ? "Hide password" : "Show password"} aria-pressed={visible} aria-controls={`${id}-password${mode === "login" ? "" : ` ${id}-confirmation`}`} onClick={() => setVisible(!visible)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                  {visible && <path d="m3 3 18 18" />}
                </svg>
              </button>
            </div>
            <div className="password-help"><p id={`${id}-password-help`}>{mode === "login" ? "Use the password for your CEPath account." : "Use a unique password. We’ll let you know if it needs to be stronger."}</p></div>
            {state.errors?.password && <p id={`${id}-password-error`} className="auth-field-error">{state.errors.password}</p>}
          </div>
          {(mode === "signup" || mode === "update-password") && <div className="auth-field">
            <label htmlFor={`${id}-confirmation`}>Confirm password</label>
            <input id={`${id}-confirmation`} name="confirmPassword" type={visible ? "text" : "password"} autoComplete="new-password" required aria-invalid={!!state.errors?.confirmPassword} aria-describedby={state.errors?.confirmPassword ? `${id}-confirmation-error` : undefined} />
            {state.errors?.confirmPassword && <p id={`${id}-confirmation-error`} className="auth-field-error">{state.errors.confirmPassword}</p>}
          </div>}
        </>}
        {mode === "login" && <input type="hidden" name="next" value={next} />}
        <SubmitButton disabled={!configured || pending} pendingLabel={mode === "forgot-password" ? "Requesting link…" : "Please wait…"}>{labels[mode]}</SubmitButton>
      </>}
    </form>
    <nav className="auth-links" aria-label="Account help">
      {mode !== "login" && <Link href="/login">Log in</Link>}
      {mode === "login" && <><Link href="/forgot-password">Forgot your password?</Link><Link href="/signup">Create an account</Link></>}
      {mode === "signup" && <Link href="/forgot-password">Already registered? Recover access</Link>}
      {mode === "update-password" && <Link href="/account">Return to your account</Link>}
    </nav>
  </>;
}
