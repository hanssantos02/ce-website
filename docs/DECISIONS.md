# CEPath decision record

Updated: 2026-10-13. **Established** means supplied by the Product Owner's brief or directly observed. **Proposed** means awaiting an explicit decision. M1 authorizes only the minimal application scaffold; curriculum and account architecture remain deferred.

## D001 — Documentation first; one milestone at a time — Established

The first assignment is AGENTS.md, STRATEGY.md, ROADMAP.md, and this record. The repository initially contains only a one-line README.md and its initial commit, with a clean working tree. Do not scaffold, install dependencies, connect databases, or implement authentication in this milestone. Small independently testable milestones conserve usage and keep changes reviewable; this deliberately postpones a runnable application.

## D002 — Original, concept-first Philippine CELE platform — Established

CEPath is a temporary working title. Serve civil engineering students building foundations, graduating students, reviewees, and retakers through structured concepts, engineering explanations, and practice. The Odin Project inspires learning structure only; create original identity and content. The priority among audience subgroups remains open for later validation.

## D003 — Curriculum hierarchy and dated official baseline — Established

Use subject → module → lesson, with explanation, worked example, practice, and eventual completion inside a lesson. Give content stable identifiers and keep it separate from UI code; the content schema and exact route patterns are not yet chosen.

Baseline: [PRC revised March 2026 CELE examination program](https://www.prc.gov.ph/sites/default/files/RevisedExamProgramMarch2026CivilEngg.pdf), dated March 6, 2026; first-page subject names and weights checked against the source on 2026-10-13:

| Group | Baseline name | Weight |
| --- | --- | --- |
| PSAD | Principles of Structural Analysis and Design | 35% |
| MSTE (student shorthand) | Applied Mathematics, Surveying, Principles of Transportation and Highway Engineering, Construction Management and Methods | 35% |
| HGE | Hydraulics and Principles of Geotechnical Engineering | 30% |

This is a dated baseline, not a claim about all later examinations. MSTE is shorthand, not the full official title. Recheck official scope before publication or curriculum changes. No PRC affiliation or endorsement is implied.

## D004 — Content quality before catalog size — Established

Write only agreed sample content, with objectives, prerequisites, clear reasoning, defined variables and units, checked examples and exercises, common mistakes, and appropriate sources. Maintain an explicit editorial status and never label unchecked material verified. The reviewer, approval criteria, status vocabulary, sample lesson, and content metadata remain to be agreed before lesson implementation. A small catalog is preferable to unreliable filler.

## D005 — Preferred stack introduced only when needed — Established for scaffold; remaining tools Proposed

Preferred defaults from the brief: Next.js, TypeScript, Tailwind CSS, Supabase PostgreSQL/Auth, MDX, KaTeX, Vitest, Playwright, and Vercel. On 2026-10-13 the Product Owner approved Next.js/TypeScript/Tailwind for a temporary-homepage scaffold only; later content, testing, account, and hosting tools still need milestone-specific justification. Evaluate existing code before any replacement and explain dependencies before installing them.

## D006 — Secure account-backed progress — Established constraint; implementation deferred

When accounts and progress are introduced, enforce server-side authorization and Supabase RLS for user-owned data; keep secrets out of client code. Browser local storage cannot be the authoritative store for authenticated progress. CE-NAV-001 settles independent lesson statuses, preservation on revisit, and the Continue Learning behavior; remaining schema and event details will be settled in the relevant milestones. Personal progress authorization does not restrict published free lessons; no tables or APIs are created now.

## D007 — Accessible reading and coherent engineering identity — Established principles; visual choices deferred

Use Impeccable for new UI surfaces and major frontend work. Prioritize technical readability, math, clear sequence and status, keyboard access, contrast, and responsive layouts. Keep engineering motifs subtle; avoid clutter, generic SaaS templates, huge empty heroes, excessive gradients and glass effects, or distracting animation. Palette, typography, layouts, and components are not yet approved. PRODUCT.md now records CE-NAV-001's approved behavior; DESIGN.md remains deferred until visual decisions justify it.

## D008 — Monetization and advanced features deferred — Established

No payments, subscription models, checkout, artificial premium locks, fictional pricing, or premium badges now. Adaptive exams, analytics, study planning, and expanded walkthroughs are future hypotheses rather than approved features. Core learning should remain accessible without paying; there is no passing guarantee.

## D009 — Strategy metrics and investment tracks — Proposed

The strategy proposes lesson completion, practice learning gain, return to study, and concept clarity feedback as outcome signals, plus curriculum reliability, structured study experience, and learning continuity as investment areas. The Product Owner approved the document on 2026-10-13 with these proposals kept provisional. No metric targets, instrumentation, analytics service, or validation evidence exists. This edit pass does not authorize application implementation or measurement infrastructure.

## CE-NAV-001 — Guided but Flexible Curriculum Navigation — Approved

Approved by the Product Owner on 2026-10-13. Documentation updated; implementation remains deferred. [PRODUCT.md](../PRODUCT.md) is the behavior reference, and [ROADMAP.md](ROADMAP.md) carries future milestone acceptance criteria.

**Decision:** Recommend an ordered subject/module/lesson learning path while allowing anonymous access to every published free lesson regardless of prerequisites, lesson position, or completion history. Students can skip ahead, return, switch subjects, and revisit completed lessons. Prerequisite links are informational advice, never authorization checks. Future optional premium content is outside this decision and is not approved for implementation.

**Rationale:** Beginners benefit from sequence and prerequisite guidance; board exam reviewees need immediate access to weak topics. Advisory guidance serves both without forcing a single path or confusing study completion with permission to read.

**Consequences:** Keep stable identifiers, module/lesson ordering, optional prerequisite references, and publication status separate from student progress. Authenticated statuses are Not Started, In Progress, and Completed independently per lesson; out-of-order completion never implies earlier completion, and revisits preserve Completed. Continue Learning targets the most recently visited unfinished lesson; Recommended Next is a distinct optional suggestion. Personal progress remains protected while free published lessons remain public. Recommended previous/next links, breadcrumbs, module lists, and return navigation guide without locking access.

**Rejected alternatives:** Mandatory lesson unlocking; completion-based restrictions; forced prerequisite checks; subject gates; deriving completion from lesson position; resetting completion on revisit; and a single resume action that forces students back into linear order.

**Compatibility and open details:** This clarifies the existing structured-learning strategy without changing the content-quality, security, or monetization constraints. D006's previously open resume rule is now settled as above; schema, visit events, progress denominator, and recommendation selection details still need milestone-specific planning. Supplied Milestones 04/05/06/08/09 originally mapped by feature to M1/M2/M3/M6/M7; subject catalog now moves to M1a under D010. CE-NAV-001's approval covered documentation only; subsequent M1 approval covers the scaffold, not curriculum implementation.

## D010 — Minimal application scaffold — Established

Approved 2026-10-13: narrow M1 to a working Next.js/TypeScript/Tailwind application with a temporary homepage and reliable local commands. Move the originally proposed curriculum overview/subject access to planned M1a; leave M2 and subsequent implementation unstarted.

Use stable Next.js 16.4.0, React/React DOM 19.3.0, Tailwind/PostCSS adapter 4.3.3, and TypeScript 5.9.3. Node 24 matches the development runtime and is selected by .nvmrc and package engines. Pin direct dependencies and retain npm's lockfile for reproducible installation; respect the configured minimum release age (PostCSS 8.5.29 is used because 8.5.30 is too recent).

Use supported ESLint 10.12.0 with @eslint/js 10.0.1 and typescript-eslint 8.71.1 for recommended JavaScript/TypeScript rules. Next's preset is deferred: its React plugin's peer range excludes ESLint 10, [ESLint 9 is end-of-life](https://eslint.org/version-support/), and the preset introduces an [unpatched braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). This avoids deprecated tooling and that dependency chain; the tradeoff is no Next-specific lint rules yet. Route type generation and production build verify framework integration.

App Router's app/layout.tsx owns the shared document and metadata; app/page.tsx owns /. Keep the page a Server Component and use system fonts with temporary neutral styles. No external font downloads, client state, service credentials, or unused routes are required. Default Next.js handling supplies missing-route behavior. The only Next.js configuration disables agentRules: its development default appends generated instructions to AGENTS.md, while our durable project instructions should stay under project control.

For this scaffold, lint, generated route types/TypeScript checks, production build, local HTTP checks, and bounded browser inspection replace unit-test setup. There is no business logic to unit-test yet; introducing Vitest/Playwright as repository dependencies is deferred until a feature needs them. This minimizes setup while still verifying the actual runnable application.
