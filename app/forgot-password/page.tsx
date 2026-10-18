import type { Metadata } from "next";
import { AuthShell } from "../../components/auth/auth-shell";
import { AuthForm } from "../../components/auth/auth-form";
import { getSupabaseConfig, getSiteUrl } from "../../lib/supabase/config";
import { safeDestination } from "../../lib/auth/policy";

export const metadata: Metadata = { title: "Recover account access. — CEPath", robots: { index: false, follow: false } };
export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const params = await searchParams;
  return <AuthShell title="Recover account access." description="Request a password-reset link. If the address can receive recovery email, you’ll find the next step in your inbox."><AuthForm mode="forgot-password" configured={!!getSupabaseConfig() && !!getSiteUrl()} next={safeDestination(params.next)} linkError={params.error === "email-link"} /></AuthShell>;
}
