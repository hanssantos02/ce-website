import type { Metadata } from "next";
import { AuthShell } from "../../components/auth/auth-shell";
import { AuthForm } from "../../components/auth/auth-form";
import { getSupabaseConfig, getSiteUrl } from "../../lib/supabase/config";
import { safeDestination } from "../../lib/auth/policy";

export const metadata: Metadata = { title: "Create your CEPath account. — CEPath", robots: { index: false, follow: false } };
export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const params = await searchParams;
  return <AuthShell title="Create your CEPath account." description="An account prepares you for future saved progress. Your email is used for account access and recovery."><AuthForm mode="signup" configured={!!getSupabaseConfig() && !!getSiteUrl()} next={safeDestination(params.next)} linkError={params.error === "email-link"} /></AuthShell>;
}
