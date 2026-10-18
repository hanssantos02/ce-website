"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton({ children, pendingLabel = "Please wait…", disabled = false }: { children: string; pendingLabel?: string; disabled?: boolean }) {
  const { pending } = useFormStatus();
  return <button type="submit" className="auth-submit" disabled={disabled || pending} aria-disabled={disabled || pending}>{pending ? pendingLabel : children}</button>;
}
