import { PageContainer } from "../../components/layout/page-container";

export default function Loading() {
  return <PageContainer className="dashboard"><section className="dashboard-section" role="status" aria-live="polite">
    <h1 className="section-title">Loading your dashboard</h1>
    <p>Retrieving your saved lesson progress…</p>
  </section></PageContainer>;
}
