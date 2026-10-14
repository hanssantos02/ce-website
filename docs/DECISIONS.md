# CEPath decision record

Updated: 2026-10-14. **Established** means supplied by the Product Owner or directly observed. **Proposed** means awaiting a decision. M1 authorized the scaffold; M2 authorizes the design foundation; M3 authorizes the landing page; M4 authorizes the public subject catalog. M5 authorizes representative module/lesson navigation and one metadata overview. Full lesson and account architecture remain deferred.

## D001 — Documentation first; one milestone at a time — Established

The first assignment is AGENTS.md, STRATEGY.md, ROADMAP.md, and this record. The repository initially contains only a one-line README.md and its initial commit, with a clean working tree. Do not scaffold, install dependencies, connect databases, or implement authentication in this milestone. Small independently testable milestones conserve usage and keep changes reviewable; this deliberately postpones a runnable application.

## D002 — Original, concept-first Philippine CELE platform — Established

CEPath is a temporary working title. Serve civil engineering students building foundations, graduating students, reviewees, and retakers through structured concepts, engineering explanations, and practice. The Odin Project inspires learning structure only; create original identity and content. The priority among audience subgroups remains open for later validation.

## D003 — Curriculum hierarchy and dated official baseline — Established

Use subject → module → lesson, with explanation, worked example, practice, and eventual completion inside a lesson. Give content stable identifiers and keep it separate from UI code. The initial schema and route choices were deferred; implemented subject and module/lesson-overview choices are recorded in D013 and D014.

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

## D007 — Accessible reading and coherent engineering identity — Established

Use Impeccable for new UI surfaces and major frontend work. Prioritize technical readability, math, clear sequence and status, keyboard access, contrast, and responsive layouts. Keep engineering motifs subtle; avoid clutter, generic SaaS templates, huge empty heroes, excessive gradients and glass effects, or distracting animation. The Product Owner selected the engineering faculty bulletin direction in M2; see D011 and DESIGN.md for its built expression. PRODUCT.md records behavior, including CE-NAV-001, separately from visual tokens.

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

The later M2 Design Foundation assignment moves the original module-navigation plan to M2a without changing its curriculum requirements.

## D010 — Minimal application scaffold — Established

Approved 2026-10-13: narrow M1 to a working Next.js/TypeScript/Tailwind application with a temporary homepage and reliable local commands. Move the originally proposed curriculum overview/subject access to planned M1a; leave M2 and subsequent implementation unstarted.

Use stable Next.js 16.4.0, React/React DOM 19.3.0, Tailwind/PostCSS adapter 4.3.3, and TypeScript 5.9.3. Node 24 matches the development runtime and is selected by .nvmrc and package engines. Pin direct dependencies and retain npm's lockfile for reproducible installation; respect the configured minimum release age (PostCSS 8.5.29 is used because 8.5.30 is too recent).

Use supported ESLint 10.12.0 with @eslint/js 10.0.1 and typescript-eslint 8.71.1 for recommended JavaScript/TypeScript rules. Next's preset is deferred: its React plugin's peer range excludes ESLint 10, [ESLint 9 is end-of-life](https://eslint.org/version-support/), and the preset introduces an [unpatched braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). This avoids deprecated tooling and that dependency chain; the tradeoff is no Next-specific lint rules yet. Route type generation and production build verify framework integration.

App Router's app/layout.tsx owns the shared document and metadata; app/page.tsx owns /. Keep the page a Server Component and use system fonts with temporary neutral styles. No external font downloads, client state, service credentials, or unused routes are required. Default Next.js handling supplies missing-route behavior. The only Next.js configuration disables agentRules: its development default appends generated instructions to AGENTS.md, while our durable project instructions should stay under project control.

For this scaffold, lint, generated route types/TypeScript checks, production build, local HTTP checks, and bounded browser inspection replace unit-test setup. There is no business logic to unit-test yet; introducing Vitest/Playwright as repository dependencies is deferred until a feature needs them. This minimizes setup while still verifying the actual runnable application.

## D011 — Engineering faculty bulletin design foundation — Established

On 2026-10-14 the Product Owner requested Milestone 02 Design Foundation and selected white reading surfaces, deep blue ink, academic headings, and a compact section index, with direct code implementation. This establishes the visual identity without implementing curriculum, a lesson reader, or a dashboard. The previous M2 module-navigation scope is retained as planned M2a; the new design foundation is M2.

Use a restrained blue accent, clear reading hierarchy, flat surfaces/rules, and a small geometric structural mark. Source Serif 4 headings and Source Sans 3 body/navigation are self-hosted through next/font/local with their upstream SIL OFL licenses. The two unmodified upright variable files total about 585 KiB; this avoids runtime third-party requests and preserves upstream glyph coverage, at the cost of a larger first-visit font transfer. Fonts are visible above the fold and remain preloaded; optimization can be assessed against an actual workload later.

Keep the reusable layout set to a page container, shared header, and shared footer. The root layout owns the main/skip-link landmark. The header's small client boundary reads the pathname so Home is not falsely marked current on a missing route; page content, main layout, and footer remain server-rendered. Native section anchors provide browser scrolling and focus without custom event handlers. Three navigation links stay visible and wrap on small screens; no menu state or unused control library is needed.

CSS custom properties are the implementation source for design tokens; DESIGN.md and .impeccable/design.json document that source and must stay synchronized. The existing page demonstrates the system with the approved product purpose and learning philosophy, explicitly identifying curriculum/progress as unavailable. No new package dependency is introduced.

## D012 — Landing page with truthful curriculum previews — Established

Approved 2026-10-14: implement M03 Landing Page within the existing faculty bulletin design. The specified seven-section brief fixes the page structure; extend it directly without a replacement-identity tournament, raster comps, dependencies, or backend work. Use authored geometric SVG linework for the engineering visual and three subject identifiers, not a dashboard mockup. The visual is explicitly illustrative, not an engineering design or worked problem.

The homepage primary CTA opens its curriculum preview; the secondary CTA opens the planned learning journey. Subject previews are static list rows, without pointer/hover affordances or subject-route links. Native anchors target focusable sections; keep #approach and #about from M2. Header navigation and footer links point only to existing destinations. Metadata describes the platform as in development. Hero and journey notices name the unavailable features; every statement of future lessons, practice, accounts, and progress stays prospective. CE-NAV-001 remains a permanent product requirement.

Rechecked PRC’s latest linked program on 2026-10-14: [September 2026 CELE program](https://www.prc.gov.ph/sites/default/files/exam%20program%20Sept%202026%20%28CE%29.pdf), linked from [PRC Downloads](https://www.prc.gov.ph/downloads). PDF pages 1–2 confirm the existing D003 subject groups and representative topics. Normalize its “APPIED” typo to “Applied” and keep the full MSTE group title; MSTE is familiar student shorthand. Use a dated source link and representative topics, without weights, completeness promises, or official endorsement. This extends the March baseline for this preview only; recheck sources when future curriculum scope changes.

The current user numbering makes M3 the landing page and M4 the proposed subject catalog. Preserve original sample-lesson and practice scopes as M3a and M4a; module navigation remains deferred M2a. This mapping authorizes only the landing page now.

No new client boundary, packages, routes, or font assets are needed. Structured preview/journey/value content lives in content/landing.ts, separate from presentation. Existing local fonts retain their documented M2 tradeoff. Browser/HTTP navigation and responsive checks, lint, types, and production build provide verification; no unit-test framework is added for this static page.

## D013 — Typed public subject catalog and shared overviews — Established

Approved 2026-10-14: create /curriculum and /curriculum/[slug] for PSAD, MSTE, and HGE using the existing design foundation. The current brief supplies representative topic groupings; each receives a concise introductory description and explicit advisory ordering. These are CEPath learning areas, not independently prescribed PRC examination categories or a complete syllabus. Reused the September 2026 PRC full titles checked in D012; the MSTE title retains “Principles of Transportation and Highway Engineering” and its shorthand explanation.

One readonly typed source, content/curriculum.ts, contains subject IDs/slugs, titles/abbreviations, descriptions, displayOrder, curated preview topics, and topics with stable IDs/slugs/title/shortDescription/displayOrder. Preserve the M03 preview wording in that shared source rather than duplicate subject metadata in landing components. Small lookup/order helpers support the real routes and return sorted copies; no CMS, publication schema, accounts, progress fields, or database is introduced.

One Server Component template renders all three subject overviews. generateStaticParams creates known routes and dynamicParams=false keeps unknown slugs unavailable; the template also validates lookup with notFound. Breadcrumbs and explicit return links work independently of subject order. Topic entries are informational; native anchors target actual focusable descriptions, with no lesson routes or unlock conditions. The Product Owner chose an index plus ordered list; a native disclosure keeps the index compact without client state. Subject → module → lesson is described as future organization, not implemented content.

Preserve the homepage composition, changing only real catalog/subject destinations and outdated availability copy. Move the existing subject symbol into a shared curriculum component without altering its geometry. Reuse fonts/colors/layout and add restrained whole-card hover/focus, breadcrumbs, and reading layouts. Header Curriculum is aria-current=page on the catalog and aria-current=location within its route area; unknown routes must never invent a current catalog page.

Add four focused Node built-in tests for independent exact-slug lookup, rejected slugs, stable unique topic IDs/anchors, and explicit non-mutating ordering. npm test uses Node 24’s native TypeScript support; package.json now explicitly declares ESM, matching existing source/config syntax and avoiding ambiguous module inference in the test runner. No dependencies installed; lockfile unchanged. Production HTTP and real-browser flows verify routing, rendered order, keyboard navigation, and missing slugs.

## D014 — Representative modules and truthful lesson-overview navigation — Established

Approved 2026-10-14: M05 is Module & Lesson Navigation, replacing the older deferred M2a label. Proposed M06 is Lesson Reader; accounts and progress remain unapproved under M5a/M6a. The Product Owner confirmed one representative module per subject while retaining all existing topic groupings. Define only the supplied four PSAD Statics lessons; Forces and Vectors has one metadata overview, and the other three remain planned. MSTE and HGE demonstrate reusable empty-module behavior with existing topic copy, not repetitive lesson placeholders.

Extend the authoritative TypeScript source with modules and lessons, independent stable IDs, explicit parent IDs and order, optional ID-based prerequisite recommendations and content availability. Current states planned/overview accurately describe what exists; no full lesson is published and no MDX import/reader or progress state is added. Source-check the sample description against [OpenStax Forces](https://openstax.org/books/university-physics-volume-1/pages/5-1-forces) and [Algebra of Vectors](https://openstax.org/books/university-physics-volume-1/pages/2-3-algebra-of-vectors). This check covers introductory metadata, not academic approval of future articles or prerequisite choices.

Use shared module and lesson-overview Server Components under the existing [slug] subject segment. Each page enumerates complete route parameters because a sibling subject page’s generateStaticParams is not a parent layout parameter generator. Build output and HTTP checks must verify actual destinations, not compilation alone. Available destinations derive from metadata and correct parent IDs; planned routes return 404. Previous/next refers to immediate ordered neighbors without inventing routes or skipping ahead. Prerequisites resolve by stable lesson ID; missing destinations remain text. A small testable reference/cycle validator enforces data integrity only, never access.

Reuse the faculty bulletin, breadcrumbs, ordered rows, native topic index and shared shell. Add one module section to subjects, distinguish linked overview titles from plain planned lesson titles, and label every content state honestly. No accounts, lesson locking, completion/progress controls, new client JavaScript, dependencies, database or CMS. Full publication metadata and MDX delivery will be scoped with M06.

## D015 — Trusted MDX reader and distinct publication/editorial states — Established

Approved 2026-10-14: M06 publishes only the existing `psad-statics-forces-vectors` lesson at its unchanged URL. M07 Authentication and M08 Progress Tracking remain proposals; dashboard/hosting scopes move to deferred M7a/M8a. All content remains freely accessible under CE-NAV-001.

Extend lesson availability with `published`, separate from module overview availability, editorial review and student progress. Curriculum metadata remains authoritative for title/description/order/prerequisites. Trusted local MDX exports its stable lesson ID, objectives, section labels and truthful editorial status; explicit static imports form a small content registry. No runtime user-selected imports, remote MDX evaluation, frontmatter duplication, database or CMS. Missing registered bodies for published content fail rather than becoming fake overviews.

Use the matching @next/mdx integration with serializable plugin names for Turbopack, remark-gfm tables, remark-math notation and rehype-katex server output with MathML and trust disabled. Share options with tests. KaTeX syntax errors are VFile messages rather than necessarily fatal compiler exceptions; `npm run build` therefore runs content tests first. Pin patched KaTeX 0.19.0 and override its older transitive ranges after the initial installation exposed a low-severity upstream advisory. The shared compiler fixture and real MDX validate compatibility; the final install reported zero vulnerabilities.

The faculty bulletin gains a centered 68ch reading column, seven objectives, nine focusable sections with an optional native index, ruled worked examples, quiet educational notes, accessible SVG geometry and a native static solution disclosure. No new client boundary or design primitives. Existing overview routes remain supported; planned lessons produce no active links. Immediate previous/next recommendations preserve sequence boundaries and never restrict access.

The original lesson checks force definitions, component convention (angle counterclockwise from positive x), units and quadrant-aware atan2 against OpenStax and Engineering Statics. Independent numeric checks give 500 N/30° components 433.01 N and 250 N, and the 600 N/120° exercise −300 N and 519.62 N. The SVG matches the former angle and component ratio. Source and calculation checks are disclosed; independent academic review is pending, with no claim of PRC endorsement or reviewed curriculum prerequisites.
