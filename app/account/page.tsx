import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getVerifiedUser } from "../../lib/auth/identity";
import { AuthShell } from "../../components/auth/auth-shell";
import { SignoutControl } from "../../components/auth/signout-control";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your account — CEPath", robots: { index: false, follow: false } };

export default async function AccountPage() {
  const user = await getVerifiedUser();
  if (!user) redirect("/login?next=/account");
  return <AuthShell title="Welcome to CEPath." description="Manage your CEPath account. Your learning dashboard keeps your saved lesson progress in one place.">
    <dl className="account-details">
      <div><dt>Signed-in email</dt><dd>{user.email ?? "Email unavailable"}</dd></div>
      <div><dt>Email verification</dt><dd>{user.email_confirmed_at ? "Confirmed" : "Confirmation pending"}</dd></div>
    </dl>
    <p className="auth-feedback">Use the controls in a published lesson to save your progress. Reading remains open to everyone.</p>
    <Link href="/dashboard" prefetch={false} className="dashboard-link">Open your learning dashboard</Link>
    <div className="account-actions"><SignoutControl /></div>
  </AuthShell>;
}
