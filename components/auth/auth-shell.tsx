import type { ReactNode } from "react";
import Link from "next/link";
import { PageContainer } from "../layout/page-container";

export function AuthShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <section className="content-section auth-section">
    <PageContainer><div className="auth-reading">
      <h1 className="subject-page-title auth-title">{title}</h1>
      <p className="auth-description">{description}</p>
      {children}
      <p className="auth-public-note">Your account is optional for reading. <Link href="/curriculum">Explore the public curriculum</Link>.</p>
    </div></PageContainer>
  </section>;
}
