"use client";
import { useActionState } from "react";
import { signoutAction } from "../../lib/auth/actions";
import { SubmitButton } from "./submit-button";

export function SignoutControl() {
  const [state, action] = useActionState(signoutAction, { status: "idle" });
  return <form action={action} className="signout-form"><SubmitButton pendingLabel="Signing out…">Sign out</SubmitButton>{state.message && <p role="alert" className="auth-field-error">{state.message}</p>}</form>;
}
