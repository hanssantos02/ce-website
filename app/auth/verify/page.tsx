import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { emailLinkCookie, readStagedEmailLink } from "../../../lib/auth/email-link";
import { confirmEmailAction } from "../../../lib/auth/actions";
import { AuthShell } from "../../../components/auth/auth-shell";
import { SubmitButton } from "../../../components/auth/submit-button";
import { getSupabaseConfig } from "../../../lib/supabase/config";

export const metadata: Metadata = { title: "Verify email link — CEPath", robots: { index: false, follow: false } };

export default async function VerifyEmailPage() {
  const store = await cookies();
  const link = readStagedEmailLink(store.get(emailLinkCookie)?.value);
  const recovery = link?.type === "recovery";
  return <AuthShell title={recovery ? "Continue password recovery." : "Confirm your email."} description="Continue with the email link you requested. This step verifies the link before opening your account or password form.">
    {link ? <form action={confirmEmailAction} className="auth-form"><SubmitButton disabled={!getSupabaseConfig()} pendingLabel="Verifying link…">{recovery ? "Continue recovery" : "Confirm email"}</SubmitButton></form> : <div className="auth-feedback"><p>This link is unavailable or has expired. Open a fresh email link to continue.</p><nav className="auth-links" aria-label="Email link help"><Link href="/forgot-password">Request a recovery link</Link><Link href="/login">Return to login</Link></nav></div>}
  </AuthShell>;
}
