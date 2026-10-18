import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getDashboard } from "../../lib/dashboard/data";
import { StudentDashboard, DashboardUnavailable } from "../../components/dashboard/student-dashboard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your learning dashboard — CEPath", robots: { index: false, follow: false } };

export default async function DashboardPage() {
  const result = await getDashboard();
  if (result.kind === "unauthenticated") redirect("/login?next=/dashboard");
  if (result.kind !== "ready") return <DashboardUnavailable />;
  return <StudentDashboard summary={result.dashboard} />;
}
