"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageContainer } from "./page-container";

import { SignoutControl } from "../auth/signout-control";

export function SiteNavigation({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <PageContainer className="header-inner">
        <Link href="/" className="brand" aria-label="CEPath home">
          <svg viewBox="0 0 40 36" width="40" height="36" aria-hidden="true">
            <path
              d="M6 30V6h28v24M6 6l28 24M0 31h12m16 0h12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
          <span className="brand-name">CEPath</span>
        </Link>
        <nav aria-label="Main navigation" className="main-nav">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
            Home
          </Link>
          <Link href="/curriculum" aria-current={pathname === "/curriculum" ? "page" : pathname.startsWith("/curriculum/") ? "location" : undefined}>Curriculum</Link>
          <a href="/#how-it-works">How it works</a>
          {signedIn ? <><Link href="/dashboard" prefetch={false} aria-current={pathname === "/dashboard" ? "page" : undefined}>Dashboard</Link><Link href="/account" aria-current={pathname === "/account" ? "page" : undefined}>My account</Link><SignoutControl /></> : <><Link href="/login" aria-current={pathname === "/login" ? "page" : undefined}>Log in</Link><Link href="/signup" aria-current={pathname === "/signup" ? "page" : undefined}>Sign up</Link></>}
        </nav>
      </PageContainer>
    </header>
  );
}
