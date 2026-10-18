---
version: 1
slug: "components-progress-lesson-progress-tsx"
primary_target: "components/progress/lesson-progress.tsx"
related_targets: ["components/progress/progress-controls.tsx","components/progress/progress-status.tsx","components/lesson/lesson-reader.tsx","app/curriculum/[slug]/[moduleSlug]/page.tsx","app/globals.css"]
---

# M08: Explicit lesson progress

Mode: Operate within the Read-mode lesson. Existing engineering faculty bulletin; no replacement identity or new primitives. The Product Owner selected controls before the lesson index/objectives. Students explicitly save or reset progress; reading never changes it and never requires an account.

THESIS: A small, honest status and native action group help students save their place without interrupting the engineering lesson.

OWN-WORLD: Existing Source Serif headings, Source Sans labels, deep blue actions, cool paper, thin neutral rules and square controls. No dashboard, percentages, rings, toast library or locks.

STORY: Read freely, optionally sign in and return to this canonical lesson; retrieve an actual status, explicitly start/complete/resume/reset, see a saving state, then confirmed results or actionable failure. Module entries reflect the same saved rows independently of recommended order.

FIRST VIEWPORT: The existing lesson header stays intact. Before the native index/objectives, a compact ruled region contains Your lesson progress, a text-and-icon status, wrapping native buttons and quiet explanation. Anonymous visitors see a short sign-in reminder with a safe return path. Unavailable reads show no invented Not Started status. Mobile actions stack; all touch targets remain at least 44px.

FORM: Code-led extension of inherited candidate 5 / seed 1f41974b. Native form submission, focusable inline feedback, pending disabled actions, clear error/retry and session-expired link form the signature interaction. No new comp, seed or raster asset.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Scope boundary: M08 only. Hosted migration is unapplied until approved; private live persistence and cross-device acceptance cannot be inferred from isolated PostgreSQL tests or UI fixtures. Keep those evidence classes explicit in the final review. No account creation/email, commits, push, deployment or M09.

Finish record (2026-10-17): bounded public/synthetic state coverage reviewed; the initial review requested a 44px anonymous link target and persistence documentation. Both were fixed and the focused verdict resolved both. This is not whole-surface hosted acceptance. DESIGN.md and the static sidecar preview document the implemented region; no shipping raster asset was introduced. Hosted migration/persistence remains unverified; M08 stays In Progress.
