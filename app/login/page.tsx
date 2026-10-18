import type { Metadata } from "next";
import { AuthShell } from "../../components/auth/auth-shell";
import { AuthForm } from "../../components/auth/auth-form";
import { getSupabaseConfig, getSiteUrl } from "../../lib/supabase/config";
import { safeDestination } from "../../lib/auth/policy";

export const metadata: Metadata = { title: "Welcome back. — CEPath", robots: { index: false, follow: false } };
export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string; error?: string; notice?: string }> }) {
  const params = await searchParams;
  return <AuthShell title="Welcome back." description="Log in to your CEPath account. Published lessons remain open to everyone.">{params.notice === "signout-unconfirmed" && <p className="auth-feedback" role="alert">We couldn’t confirm sign-out. Your session may still be active. Please try signing out again when the connection is restored.</p>}<AuthForm mode="login" configured={!!getSupabaseConfig() && !!getSiteUrl()} next={safeDestination(params.next)} linkError={params.error === "email-link"} /></AuthShell>;
}
