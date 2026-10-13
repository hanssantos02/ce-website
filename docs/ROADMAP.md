# CEPath roadmap

Updated: 2026-10-14. M0, M1, and M2 Design Foundation are authorized. Later milestones remain proposals to scope and approve individually; no dates or launch commitments have been set.

CE-NAV-001 constrains future curriculum implementation; it does not authorize it. The Product Owner's current Milestone 02 is Design Foundation. The previously planned M2 module-navigation scope is preserved as M2a. Earlier feature mappings are now: Subject Catalog → M1a; Module and Lesson Navigation → M2a; Lesson Reader → M3; Progress Tracking → M6; Student Dashboard → M7. Practice (M4), accounts (M5), and hosting (M8) retain their scopes.

## Phase 0 — Project context

### M0: Documentation foundation — Completed

- Outcome: durable project instructions, product strategy, phased roadmap, and decision record.
- Acceptance: repository inspected; AGENTS.md, STRATEGY.md, this roadmap, and DECISIONS.md agree with the brief; strategy gets its required edit pass; no application or service setup.
- Completion evidence: inspected the original README-only repository; created the four context documents; Product Owner approved the strategy draft with metrics and tracks kept provisional; no application or service setup.

## Phase 1 — Public learning path

### M1: Application Scaffold — Completed

- Outcome: the Product Owner can install dependencies, run the application locally, and open a temporary homepage.
- Approved scope (2026-10-13): smallest Next.js/TypeScript/Tailwind scaffold, minimal App Router layout and homepage, development/check/build commands, and concise README. The current instruction narrows the original M1; curriculum overview and subject access move to planned M1a below.
- Acceptance: stable compatible dependencies and reproducible lockfile; lint and type checks pass; production build succeeds; development and production servers serve the homepage locally. Verify Tailwind styles, semantic heading/main structure, desktop/mobile rendering, and default missing-route handling. No full landing design, authentication, database, curriculum, progress, quizzes, or premium features.
- Completion evidence (2026-10-13): npm ci succeeded with zero reported vulnerabilities; npm run check passed (lint and strict types); npm run build passed. Development and production HTTP checks returned 200 for / and 404 for an unknown route; compiled Tailwind CSS served successfully. Browser checks at 1280×800 and 375×812 showed applied styles and no horizontal overflow, with no console warnings/errors; final production render also checked. Development preserves AGENTS.md with agentRules disabled. Source/configuration inspection completed locally; no unit-test framework or full multi-agent review was introduced. The design detector's Arial warning was an intentional temporary-style exception, not approved branding. Subsequently committed and pushed to main at the Product Owner's request (cb8e7d3); no deployment. M1a remains Planned; M2's later authorization and completion are recorded below.

### M2: Design Foundation — Completed

- Outcome: a distinctive, accessible visual foundation for the Filipino civil engineering learning platform, demonstrated on the existing public page.
- Approved scope (2026-10-14): coherent color, typography, spacing and reading-layout tokens; responsive header/navigation, page container and footer; subtle engineering identity; design documentation. The Product Owner selected the engineering faculty bulletin direction with direct code implementation.
- Acceptance: actual navigation and keyboard skip/section links work; readable desktop/mobile layout; normal text contrast meets 4.5:1; responsive reflow, focus, and reduced-motion support; lint/types/build pass; Impeccable finish review and DESIGN.md/design sidecar completed. No dashboard, lesson reader, or curriculum catalog.
- Completion evidence (2026-10-14): npm run check and production build passed. Production browser inspection at 1440×900, 1280×720, and 390×844 showed loaded local fonts, visible navigation, and no horizontal overflow; an additional 320px-width check passed. Keyboard skip, approach/about anchors, and return-to-top transferred focus correctly. Main navigation targets measured at least 44px; normal text contrast measured at least 5.89:1 across the implemented pairings. Homepage and both local font assets returned 200; an unknown route returned 404 without falsely marking Home current. No browser warnings/errors. Reduced-motion CSS was inspected but not browser-emulated. Impeccable's detector returned no findings; its source/screenshot finish review returned ship against the approved textual direction (no raster-comp or catalog-image benchmark). DESIGN.md and the schemaVersion 2 sidecar were checked for token/narrative consistency; the official schema linter/live panel were not run. No new dependencies or unit-test framework. Changes remain uncommitted; no push or deployment. M1a, M2a, and later milestones remain Planned.

### M1a: Public curriculum overview and subject catalog — Planned

- Outcome: a student can open a responsive public page, read the platform's purpose, and access each of the three subject overviews.
- Proposed scope: build on M1 and M2 with accessible public subject overviews and separate subject data with stable IDs. Reuse the established visual foundation and update relevant product/design context when behavior expands.
- Acceptance: page loads on desktop and mobile; heading structure, contrast, and keyboard navigation checked; applicable type, lint, and production-build checks pass. No accounts, lesson catalog, or nonfunctional study links.
- CE-NAV-001 acceptance (Subject Catalog): PSAD, MSTE, and HGE are independently accessible anonymously. No subject requires another subject's completion; the catalog does not create lesson-unlocking rules.

### M2a: One subject-to-module path — Planned

- Outcome: a student can open one agreed subject, inspect one sample module's lesson sequence, and return to the overview.
- Acceptance: predictable routes and stable IDs; useful missing-content handling; unavailable content is clearly labeled; navigation works by keyboard. Agree on the sample module and lesson titles first; do not create a bulk catalog.
- CE-NAV-001 acceptance (Module and Lesson Navigation): show recommended module/lesson order using ordering metadata; every published free lesson is selectable regardless of prerequisites or completion. Suggested prerequisites use stable lesson references and informational links, with immediate access onward. Publication status governs availability; no lesson unlocking or forced checks. Personal progress indicators wait for M6.

### M3: One readable sample lesson — Planned

- Outcome: a student can read one agreed lesson with prerequisites, objectives, explanation, defined variables/units, and a checked worked example.
- Proposed scope: introduce MDX and KaTeX only if approved for this lesson; content remains separate from UI, with explicit editorial status and references.
- Acceptance: calculation and dimensional checks recorded; review status is visible and truthful; math and any necessary diagram work on narrow screens; invalid lesson routes handled. Academic approval requirements must be agreed before calling content reviewed.
- CE-NAV-001 acceptance (Lesson Reader): anonymous direct access to the published free sample lesson; curriculum breadcrumbs, module list, return navigation, and recommended previous/next links where published destinations exist. Prerequisite references are linked advice. Students can navigate elsewhere freely; missing neighbors do not justify generating unapproved lessons. Completion indicators wait for M6.

### M4: Practice for the sample lesson — Planned

- Outcome: a student attempts an agreed exercise and can reveal its checked solution and explanation.
- Acceptance: correct answer, units, and reasoning independently checked; controls accessible; any answer-validation behavior handles relevant edge cases. No invented official exam questions or claim that a completed exercise proves mastery.

## Phase 2 — Reliable learning continuity

### M5: Accounts — Planned

- Outcome: a student can sign up, sign in, and sign out.
- Proposed scope: introduce Supabase Auth only after an approved plan covering credentials, sessions, errors, and required account behavior.
- Acceptance: essential account flow works; protected access is enforced on the server; secrets remain private. Progress tables and dashboard features remain outside this milestone.

### M6: Complete and resume the sample lesson — Planned

- Outcome: a signed-in student can track Not Started, In Progress, and Completed for available lessons independently and retrieve progress after another session.
- Proposed scope: minimal user-owned progress data with Supabase RLS; completion means self-reported study completion, not verified mastery.
- Acceptance: persistence and duplicate actions behave correctly; one user cannot read or modify another user's progress; logged-out access and errors handled. Test authorization with separate users and direct data requests.
- CE-NAV-001 acceptance (Progress Tracking): authenticated progress persists separately from curriculum order; out-of-order completion changes only the selected lesson. Calculate totals from actual completion records without inferring earlier completions; revisits preserve Completed. Reader/module indicators reflect actual status. Capture the visit information needed for later resumption, with schema and event rules agreed in this milestone; all published free lessons remain accessible anonymously and independent of progress. Verify with bounded lesson fixtures without expanding the published catalog.

### M7: Study summary and resume action — Planned

- Outcome: a signed-in student can see completion across available content and navigate back to study.
- Acceptance: summary reflects actual stored progress and available lessons; a new account has a helpful empty state; no fabricated analytics or unavailable-content completion totals.
- CE-NAV-001 acceptance (Student Dashboard): Continue Learning opens the most recently visited unfinished lesson; a separate Recommended Next offers curriculum guidance without redirecting or restricting out-of-order study. Show completed lessons for review and links to every subject. Handle no unfinished visits and no next lesson honestly; agree and verify remaining recommendation selection rules in this milestone.

## Phase 3 — Small pilot

### M8: Hosted pilot of the sample path — Planned

- Outcome: the Product Owner and pilot learners can use the agreed sample path on a hosted preview.
- Proposed scope: Vercel or another approved host, necessary environment configuration, and a bounded accessibility/responsive review of that path. Publishing requires authorization.
- Acceptance: essential browse/read/practice/account/progress flow checked on the deployed preview; secrets private; editorial status clear; known limitations documented. Agree on pilot feedback and metrics before adding measurement tools.

## Future hypotheses — not approved milestones

Adaptive mock exams, performance analytics, intelligent study planning, expanded walkthroughs, and possible premium capabilities require evidence from the core learning experience. Wider curriculum coverage also requires an editorial process and reviewed content; no bulk lesson generation is approved.

## Execution rule

Before each milestone, agree on its scope, dependencies, decisions, acceptance criteria, and checks. Completion of one milestone never authorizes the next. Stop after verification and report what the Product Owner should manually review.
