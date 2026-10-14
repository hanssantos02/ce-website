# CEPath roadmap

Updated: 2026-10-14. M0, M1, M2 Design Foundation, M3 Landing Page, M4 Subject Catalog, and M5 Module & Lesson Navigation are authorized. Later milestones remain proposals to scope and approve individually; no dates or launch commitments have been set.

CE-NAV-001 constrains implementation without authorizing future work. The Product Owner’s current milestone assignments take precedence over the original numbering: M02 Design Foundation, M03 Landing Page, M04 Subject Catalog, M05 Module & Lesson Navigation, and proposed M06 Lesson Reader. M05 takes the deferred M2a navigation scope and adds the explicitly approved metadata overview; M06 takes the deferred M3a reader scope. Original accounts and progress scopes remain unapproved as M5a and M6a; original practice stays M4a. These suffixes preserve deferred work without authorizing it. M7 dashboard and M8 hosting keep their existing scopes.

## Phase 0 — Project context

### M0: Documentation foundation — Completed

- Outcome: durable project instructions, product strategy, phased roadmap, and decision record.
- Acceptance: repository inspected; AGENTS.md, STRATEGY.md, this roadmap, and DECISIONS.md agree with the brief; strategy gets its required edit pass; no application or service setup.
- Completion evidence: inspected the original README-only repository; created the four context documents; Product Owner approved the strategy draft with metrics and tracks kept provisional; no application or service setup.

## Phase 1 — Public learning path

### M1: Application Scaffold — Completed

- Outcome: the Product Owner can install dependencies, run the application locally, and open a temporary homepage.
- Approved scope (2026-10-13): smallest Next.js/TypeScript/Tailwind scaffold, minimal App Router layout and homepage, development/check/build commands, and concise README. The current instruction narrows the original M1; curriculum overview and subject access moved to the planned catalog, now M4 below.
- Acceptance: stable compatible dependencies and reproducible lockfile; lint and type checks pass; production build succeeds; development and production servers serve the homepage locally. Verify Tailwind styles, semantic heading/main structure, desktop/mobile rendering, and default missing-route handling. No full landing design, authentication, database, curriculum, progress, quizzes, or premium features.
- Completion evidence (2026-10-13): npm ci succeeded with zero reported vulnerabilities; npm run check passed (lint and strict types); npm run build passed. Development and production HTTP checks returned 200 for / and 404 for an unknown route; compiled Tailwind CSS served successfully. Browser checks at 1280×800 and 375×812 showed applied styles and no horizontal overflow, with no console warnings/errors; final production render also checked. Development preserves AGENTS.md with agentRules disabled. Source/configuration inspection completed locally; no unit-test framework or full multi-agent review was introduced. The design detector's Arial warning was an intentional temporary-style exception, not approved branding. Subsequently committed and pushed to main at the Product Owner's request (cb8e7d3); no deployment. The subject catalog remains Planned; M2's later authorization and completion are recorded below.

### M2: Design Foundation — Completed

- Outcome: a distinctive, accessible visual foundation for the Filipino civil engineering learning platform, demonstrated on the existing public page.
- Approved scope (2026-10-14): coherent color, typography, spacing and reading-layout tokens; responsive header/navigation, page container and footer; subtle engineering identity; design documentation. The Product Owner selected the engineering faculty bulletin direction with direct code implementation.
- Acceptance: actual navigation and keyboard skip/section links work; readable desktop/mobile layout; normal text contrast meets 4.5:1; responsive reflow, focus, and reduced-motion support; lint/types/build pass; Impeccable finish review and DESIGN.md/design sidecar completed. No dashboard, lesson reader, or curriculum catalog.
- Completion evidence (2026-10-14): npm run check and production build passed. Production browser inspection at 1440×900, 1280×720, and 390×844 showed loaded local fonts, visible navigation, and no horizontal overflow; an additional 320px-width check passed. Keyboard skip, approach/about anchors, and return-to-top transferred focus correctly. Main navigation targets measured at least 44px; normal text contrast measured at least 5.89:1 across the implemented pairings. Homepage and both local font assets returned 200; an unknown route returned 404 without falsely marking Home current. No browser warnings/errors. Reduced-motion CSS was inspected but not browser-emulated. Impeccable's detector returned no findings; its source/screenshot finish review returned ship against the approved textual direction (no raster-comp or catalog-image benchmark). DESIGN.md and the schemaVersion 2 sidecar were checked for token/narrative consistency; the official schema linter/live panel were not run. No new dependencies or unit-test framework. Subsequently committed and pushed to main at the Product Owner’s request (99cb968); no deployment. Curriculum and later feature milestones remained Planned at M2 completion.

### M3: Landing Page — Completed

- Outcome: a polished homepage introduces CEPath, previews the three examination subject groups, explains guided but flexible learning, and offers working section CTAs.
- Approved scope (2026-10-14): extend M2’s design system with a hero and engineering visual, static curriculum previews, planned learning journey, concise values, closing CTA, and responsive header/footer. Keep preview content separate from UI; no subject routes or lessons.
- Acceptance: all seven requested sections; accurate subject terminology with MSTE identified as shorthand; honest unavailable-feature notices; working anchors and keyboard focus; no overflow on mobile/tablet/desktop; accessible contrast and reduced-motion behavior; lint/types/build and bounded visual/code review. No accounts, database, progress, practice engine, or premium features. No commit/push without a separate request.
- Completion evidence (2026-10-14): npm run check and production build passed; / remains the only content route, with the default missing-route page. Production captures at 1440×900, 1086×900, 768×1024, 390×844, and 320×900 showed loaded local fonts, readable reflow, visible navigation, and no horizontal overflow. Normal text contrast measured at least 5.46:1; main-navigation targets measured 44px or taller. Browser keyboard checks passed for skip, both hero CTAs, closing CTA, about, return-to-top, legacy #approach, and curriculum access from a 404; no warnings/errors. HTTP assertions passed for metadata, unique landmarks/IDs, all local anchor destinations, two local WOFF2 fonts, scripts/CSS, 200 homepage, and 404 without false current-page state. The development homepage also returned 200. PRC September 2026 program downloaded and checked for preview terminology/topics. Impeccable detector returned no findings; independent finish review returned ship with no material fixes. Bounded manual source review found no required changes; the full autonomous/multi-agent CE shipping workflow was not run. DESIGN.md and its schemaVersion 2 sidecar preserve all primitive tokens and document actual landing patterns; static consistency/local documentation links passed. Reduced-motion CSS inspected only; official design-schema linter/live panel and screen-reader audit were not run. No unit framework, dependencies, routes, services, or new client boundary added. Local verification completed on codex/landing-page; the Product Owner subsequently authorized committing and pushing this milestone to main. No deployment. M4 and all later feature work remain Planned.

### M4: Subject Catalog — Completed

- Outcome: a student can access public overviews of each of the three subjects.
- Approved scope (2026-10-14): /curriculum plus three shared-template subject overviews at /curriculum/psad, /curriculum/mste, and /curriculum/hge. Typed subject/topic data with stable IDs/slugs and explicit order; introductory descriptions only. The Product Owner selected a topic index plus ordered list. Connect homepage/header/footer to actual catalog and subject destinations.
- Acceptance: all three groups independently accessible anonymously; topic ordering visibly advisory, without locks or progress. Keyboard-accessible cards, index anchors, breadcrumbs and return links; correct unknown-subject 404; mobile/tablet/desktop reflow and contrast; unit tests, lint/types/build and bounded visual/source review. No lessons, module catalog, accounts, practice, progress, services, or extra dependencies. Stop before the next milestone; no commit/push without separate authorization.
- CE-NAV-001 acceptance (Subject Catalog): no subject requires another subject’s completion. Topic links target actual informational descriptions, not unimplemented lesson routes. Future subject → module → lesson organization is explained without fabricating modules or lessons.

- Completion evidence (2026-10-14): npm run check passed (lint, strict route/type checks, four native Node data tests); production build passed with /curriculum and all three prebuilt subject overviews. Production HTTP assertions verified the homepage/catalog/subjects, all 32 ordered topic descriptions and index destinations, assets, breadcrumbs/return links, and five unknown or malformed 404 paths. Development catalog and MSTE overview also returned 200. Seventeen production captures across 1440, 1086, 768, 390, and 320px widths, including expanded indexes, showed loaded fonts, readable reflow, and no horizontal overflow. Browser keyboard checks passed for landing CTA, all subject cards, breadcrumbs, native disclosure, topic/structure anchors with transferred focus, skip link, return link, and 404 recovery; targets measured at least 44px. No browser warnings/errors. Normal-text contrast measured at least 5.89:1 on the catalog, 6.27:1 on measured subject pages, and 5.46:1 on the homepage. Impeccable detector returned no findings; independent finish review returned ship with no material fixes. Bounded manual source review completed; no full autonomous CE shipping workflow. DESIGN.md and schemaVersion 2 sidecar updated and statically checked for shared-token/narrative consistency. Reduced-motion CSS inspected only; official design-schema linter/live panel and screen-reader audit were not run. No new dependencies, client boundary, database, accounts, modules, or lessons. Local verification completed on codex/subject-catalog; the Product Owner subsequently authorized committing and pushing this milestone to main. No deployment. All subsequent milestones remain Planned.

### M5: Module & Lesson Navigation — Completed

- Outcome: students move from any subject to a representative module, inspect explicit lesson order and optional prerequisites, and open one honest lesson metadata overview.
- Approved scope (2026-10-14): shared /curriculum/[slug]/[moduleSlug] and /curriculum/[slug]/[moduleSlug]/[lessonSlug] templates, typed stable module/lesson metadata, scoped lookup and data-derived destinations. PSAD Engineering Mechanics — Statics defines Forces and Vectors, Free Body Diagrams, Equilibrium of Particles, and Equilibrium of Rigid Bodies; only Forces and Vectors has an overview. Product Owner confirmed one representative MSTE and HGE module each, preserving all 32 existing topic entries.
- Acceptance: subject/module/lesson hierarchy and real return/breadcrumb paths work anonymously; explicit advisory order, valid acyclic ID-based prerequisites, correct first/last neighbor boundaries. Planned entries are plain text, available overview links work, empty module collections explain availability, and invalid or planned lesson URLs return 404. Targeted data tests, HTTP route/link/order checks, lint/types/build and bounded responsive/keyboard/design review pass. No full reader, MDX, equations, exercises, accounts, progress, database, or new dependencies.
- CE-NAV-001: overview access depends only on content availability and correct parent context, never completion, prerequisites, or subject order. Availability metadata is not student progress. Full published lessons do not exist yet; their reader/publication state belongs to M06. Stop after local verification, without commit/push or starting M06.

- Completion evidence (2026-10-14): npm run check passed with lint, strict route/types and nine native Node tests (four retained M04 tests, five new navigation tests). The production build explicitly prebuilt three representative module routes and one Forces and Vectors overview. Production HTTP assertions passed for all nine real pages, all local links/anchors, all 32 preserved topic entries, explicit lesson order and availability, immediate first/next references, ten invalid/mismatched/planned 404 cases, and ten unique compiled assets. Development module and sample-overview routes also returned 200. Fifteen final full-page captures at 1440, 1266 (the current user viewport), 768, 390, and 320px widths showed settled local fonts and no horizontal overflow; all measured main-navigation, breadcrumb, entry, prerequisite and return targets were at least 44px high. Keyboard flows passed for catalog → subject → module → overview, available prerequisite links, breadcrumb/back navigation, mobile MSTE/HGE empty states, native subject index focus, Tab/skip focus, and planned-lesson 404 recovery. Normal text contrast minimum measured 6.27:1 across four affected surfaces; no browser warnings/errors. One visual fix batch scoped ordered-row CSS to direct children so nested prerequisites keep normal readable bullets; the same capture matrix confirmed it. Impeccable detector returned no findings; independent finish review returned ship with no material fixes. Documenter updated DESIGN.md and the schemaVersion 2 sidecar; parent consistency checks confirmed unchanged primitive tokens/North Star, ten retained patterns, correct direct-child selectors and valid local documentation links. Targeted source review and inline reuse/quality/efficiency passes completed; the broad CE multi-agent/external-peer shipping pipeline was not run. Reduced-motion CSS was inspected only; screen-reader and official design-schema/live-panel audits were not run. No fully published lesson content, MDX, authentication, progress, services, dependencies or new client boundary. Local verification completed on codex/module-lesson-navigation; the Product Owner subsequently authorized committing and pushing this milestone to main. No deployment. M06 and later scopes remain Planned.

### M6: Lesson Reader — Planned

- Outcome: a student can read one agreed lesson with prerequisites, objectives, explanation, defined variables/units, and a checked worked example.
- Proposed scope: introduce MDX and KaTeX only if approved for this lesson; content remains separate from UI, with explicit editorial status and references.
- Acceptance: calculation and dimensional checks recorded; review status is visible and truthful; math and any necessary diagram work on narrow screens; invalid lesson routes handled. Academic approval requirements must be agreed before calling content reviewed.
- CE-NAV-001 acceptance (Lesson Reader): anonymous direct access to the published free sample lesson; curriculum breadcrumbs, module list, return navigation, and recommended previous/next links where published destinations exist. Prerequisite references are linked advice. Students can navigate elsewhere freely; missing neighbors do not justify generating unapproved lessons. Completion indicators wait for M6a.

### M4a: Practice for the sample lesson — Planned

- Outcome: a student attempts an agreed exercise and can reveal its checked solution and explanation.
- Acceptance: correct answer, units, and reasoning independently checked; controls accessible; any answer-validation behavior handles relevant edge cases. No invented official exam questions or claim that a completed exercise proves mastery.

## Phase 2 — Reliable learning continuity

### M5a: Accounts — Planned

- Outcome: a student can sign up, sign in, and sign out.
- Proposed scope: introduce Supabase Auth only after an approved plan covering credentials, sessions, errors, and required account behavior.
- Acceptance: essential account flow works; protected access is enforced on the server; secrets remain private. Progress tables and dashboard features remain outside this milestone.

### M6a: Complete and resume the sample lesson — Planned

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
