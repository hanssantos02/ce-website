import type { Metadata } from "next";
import Link from "next/link";
import { getVerifiedUser } from "../../lib/auth/identity";
import { getSupabaseConfig, getSiteUrl } from "../../lib/supabase/config";
import { AuthShell } from "../../components/auth/auth-shell";
import { AuthForm } from "../../components/auth/auth-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Update password — CEPath", robots: { index: false, follow: false } };

export default async function UpdatePasswordPage() {
  const user = await getVerifiedUser();
  return <AuthShell title="Choose a new password." description="Update the password for your verified CEPath session.">
    {user ? <AuthForm mode="update-password" configured={!!getSupabaseConfig() && !!getSiteUrl()} /> : <div className="auth-feedback"><p>A verified session is required. Open a valid recovery link from your email, or request a new one if your link has expired.</p><nav className="auth-links" aria-label="Recovery help"><Link href="/forgot-password">Request a recovery link</Link><Link href="/login">Log in</Link></nav></div>}
  </AuthShell>;
}
