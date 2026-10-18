# CEPath product behavior

Updated: 2026-10-17. The application has a design foundation and a landing page introducing CEPath, its planned curriculum, and its learning approach, plus a public subject catalog. Subject and module navigation and one complete Forces and Vectors lesson reader are implemented. The Supabase account foundation is implemented; the owner reports login/session/sign-out checks passed while email/recovery acceptance remains pending. M08 migration, saving and persistence were reported successful by the owner on 2026-10-17; hosted two-user isolation remains unverified. M09 adds a locally implemented private learning dashboard, pending authenticated hosted dashboard acceptance. M10 adds optional public interactive practice to the one published lesson. See [STRATEGY.md](STRATEGY.md) for direction, [DESIGN.md](DESIGN.md) for the visual system, and [CE-NAV-001](docs/DECISIONS.md#ce-nav-001--guided-but-flexible-curriculum-navigation--approved) for curriculum rationale.

## Design Foundation — Milestone 02

The Product Owner selected an engineering faculty bulletin identity: white reading surfaces, deep blue ink, academic headings, and a compact section index. This is a shared visual foundation for future learning surfaces, demonstrated on the existing public homepage.

The implemented reusable layout set is a page container, header, and footer. Visual tokens and usage rules belong in DESIGN.md. The root layout owns the skip link and main landmark; Home is marked current only on the homepage, including when the shell appears on a missing route.

## Landing Page — Milestone 03

The homepage introduces the planned concept-first learning platform and identifies one available sample lesson and names accounts, saved progress and interactive practice as future work. Primary “Explore the curriculum” links now lead to /curriculum; “How it works” links lead to #how-it-works. Landing subject previews retain their visual layout and now provide explicit links to the implemented overviews.

The three groups use full examination names and representative topics from PRC’s dated September 2026 program, with MSTE identified as student shorthand. The page links the source and does not promise a complete syllabus. Subject metadata and representative preview topics now come from content/curriculum.ts, shared with the catalog. Landing-only journey and values remain in content/landing.ts.

The learning journey describes planned behavior: freely choose a subject, follow or skip the recommended sequence, read the first sample with explanations/examples/static practice, and later resume using account-backed progress. It explicitly says that prerequisites offer guidance without locks and every published free lesson will remain accessible anonymously, revisitable, and independent of subject order.

The header offers Home, Curriculum, and How it works. Navigation remains visible and wraps on mobile. The hero includes a compact section index; native anchors move focus to real content. M2’s #approach and #about anchors remain meaningful. Values and closing sections explain the intended approach and link to the catalog. The footer includes working navigation, independent-platform/PRC non-affiliation language, and the temporary-name/development notice. Catalog, subject, representative module and one published lesson route are implemented; account routes now exist; additional lesson content and legal-page routes remain absent.

## Subject Catalog — Milestone 04

/curriculum presents PSAD, MSTE, and HGE in explicit display order. Each whole subject card is one accessible link, with a symbol, abbreviation, full title, description, representative topics, and explore action. Subject overviews and topic descriptions are available without an account; lesson availability is stated within each module.

/curriculum/[slug] uses one Server Component template for the three known slugs. It includes full subject naming, learning overview, breadcrumb navigation, advisory topic ordering, a compact native index disclosure, and a return link. The Product Owner selected the index plus ordered list. Index links transfer focus to real on-page descriptions; topic descriptions retain their existing anchors and no completion controls; a separate module section opens the representative module. The index starts collapsed so long lists remain compact on mobile, and opens using standard keyboard/browser behavior.

One typed source in content/curriculum.ts owns stable subject/topic IDs and slugs, descriptions, explicit displayOrder, and curated landing-preview labels. Ordered helpers do not mutate the source. The existing three subject symbols are shared with the landing page. generateStaticParams prebuilds known subject routes; dynamicParams=false and notFound reject unknown slugs. No database, authentication, or new client boundary.

These are representative CEPath groupings and suggested study order, not a complete official syllabus or prescribed examination sequence. Official full subject titles retain the dated PRC September 2026 source; MSTE is student shorthand. The subject → module → lesson hierarchy now has representative navigation; full curriculum coverage remains future work. Header Curriculum leads to /curriculum and marks the catalog page or curriculum location current appropriately; footer and homepage routes also lead to real destinations.

## Module & Lesson Navigation — Milestone 05

Each subject retains its existing topic list and adds one representative module overview. PSAD demonstrates Engineering Mechanics — Statics with four defined lesson entries. MSTE’s Engineering mathematics and HGE’s Fluid properties reuse existing topic metadata and have no defined lesson sequence yet; their shared module template gives an honest empty state. These are small navigation examples, not complete curricula.

The Statics sequence contains Forces and Vectors, Free Body Diagrams, Equilibrium of Particles, and Equilibrium of Rigid Bodies. Milestone 06 replaces the first lesson’s metadata overview with complete content at the same URL. Other lessons remain planned, without links or pages; module entries and prerequisite recommendations reflect that availability. There are no progress controls or completion requirements.

content/curriculum.ts remains authoritative. Module IDs/slugs, parent subject ID, descriptions, explicit order, availability and lessons sit beside the existing subject/topic data. Lesson records contain stable ID/slug, parent module ID, short description, order, optional prerequisite lesson IDs and content availability. The current availability states are planned and overview; publication of complete MDX content waits for M06. Stable IDs remain independent of title/slug edits.

ID lookup resolves prerequisites across curriculum metadata; only destinations backed by available overviews or published lessons are linked. Planned recommendations show their title; a missing reference is defensively displayed as unavailable and rejected by data validation tests. A small validator rejects missing IDs, self references, duplicates and cycles; it never participates in access checks. Immediate previous/next metadata follows explicit order without skipping planned lessons; unavailable neighbors are plain text, and module boundaries are explained.

Each new page enumerates complete route parameters from authoritative metadata and scopes lookup to its real subject/module parents. generateStaticParams and dynamicParams=false prebuild only available module and lesson destinations, while notFound rejects unknown or planned lesson destinations. Existing shared breadcrumbs, reading styles and native links provide navigation without a new client boundary or database. M06 introduces the MDX/KaTeX packages for the reader.

## Lesson Reader — Milestone 06

Forces and Vectors is complete at its existing URL and stable lesson ID. Trusted repository MDX owns objectives, nine section headings and educational prose; shared curriculum data continues to own titles, description, ordering and prerequisite references. KaTeX server output includes visual notation and MathML. A proportional 500 N/30° diagram, ruled worked example, quiet notes and one optional 600 N/120° exercise with a native solution disclosure support study. No grading or learner state is stored.

The Product Owner selected a compact native section index. Its anchors focus real sections; reading content remains visible when the index is closed. All content is publicly accessible. Publication means a complete body is available; visible editorial status records source/calculation checks separately from pending independent academic review. Planned next lessons remain plain recommendations, with no active links. M07 and M08 extend this reader with optional account progress while keeping reading public.

## Accounts and Authentication — Milestone 07

Focused email/password forms extend the faculty bulletin with a short public-curriculum reminder. Signup requests, confirmation-pending feedback, login, recovery, password updates, local sign-out and a minimal private account page are implemented. No profiles, public directories, progress records or dashboard are introduced. The Product Owner chose to test email flows manually; positive live acceptance remains pending.

The header receives verified server identity without exposing email; account pages use a fresh verified Supabase user. Published free lessons stay public. Token-hash email links first stage a short-lived private credential and ask for explicit confirmation; PKCE callbacks use the requesting browser's verifier. Redirects are limited to known internal destinations. Private responses are not publicly cached. Errors never claim that a request, verification or sign-out succeeded when it did not.

See [authentication setup](docs/AUTHENTICATION.md) for required provider settings and remaining manual acceptance checks. M08 and M09 are authorized; M10 remains unapproved.

## Persistent Lesson Progress — Milestone 08

The owner selected a compact progress block before the lesson index/objectives. Anonymous students read freely and may sign in with a safe return to this exact published lesson. Verified students explicitly Start Learning, Mark as Complete, Mark In Progress or Reset progress. No row means Not Started; reading/revisiting never creates or changes a record, and any lesson can be completed directly without prior completion or a mandatory Start action. Completed is retained until an explicit change.

Only published lessons backed by registered MDX have controls. Module lists fetch real relevant statuses once, separately from publication labels. Unknown/planned application mutations are rejected. Browser ownership is ignored; server verification and PostgreSQL ownership policies protect private records. Missing progress reads remain unavailable, never an invented Not Started. Saves show pending, confirmed results or retry/reload/session-expired guidance; private responses are not shared publicly.

The owner reports applying the first application table migration and passing saving, refresh and sign-out/sign-in persistence checks on 2026-10-17. A read-only anonymous request was denied with 42501; this is not independent positive authenticated or hosted two-user verification. Local PostgreSQL policy tests and synthetic UI fixtures do not establish hosted persistence. See [progress setup and acceptance](docs/PROGRESS.md). M08 introduces no dashboard, aggregate percentages or new lessons; the separately approved M09 extension is described below.

## Student Dashboard — Milestone 09

`/dashboard` is a private learning hub, separate from `/account`. The owner selected a compact summary before learning actions. Its server read reuses M08 identity verification, one user-scoped progress query and the authoritative published-content registry. No schema or dependency is added. The authenticated header and account page link to the dashboard; explicit safe `/dashboard` returns work while the default `/account` and lesson/recovery returns remain compatible.

Counts include distinct published lessons with registered content only. Subject percentages describe currently published content, not CELE mastery; a subject with no published lessons says Lessons coming soon and has no percentage. Failed loads show unavailable/retry rather than zeros. Newly registered students get a suggested starting lesson; students who complete all available content can review or browse without a false full-curriculum completion claim.

Continue Learning uses the latest `updated_at` among eligible In Progress records, breaking equal timestamps by explicit curriculum order. Recommended Next is separate: prefer the Continue context, otherwise the latest saved activity, then choose the first incomplete published lesson within that module, that subject, or global order. With no records, use global order. Missing/invalid timestamps sort last with curriculum tie-breaking. The same lesson may serve both purposes when only one is available, and the interface explains that overlap. Prerequisites remain informational and every published free lesson stays publicly accessible.

Recorded lesson lists show up to five latest progress updates per state. Confirmed progress actions invalidate the dashboard along with the lesson/module; personal data is request-scoped and never publicly cached. No visit tracking, study hours, scores, streaks, adaptive engine, account schema or M10 is introduced. Hosted authenticated dashboard and two-user browser acceptance remain unverified; see [dashboard verification](docs/DASHBOARD.md).

## Interactive Practice — Milestone 10

The published Forces and Vectors lesson adds five original single-answer questions after the MDX article and before the curriculum footer, reachable from the native section index. The owner chose one question at a time. Students may select/change an answer, submit for explicit correct/incorrect feedback and a worked explanation, retry only the current question, or navigate freely without submitting. Per-question attempts remain in component memory until refresh and never change saved lesson progress. Practice is open without an account.

The typed repository bank owns stable question/lesson/option IDs, explicit order, separate publication/review states and original solution content. Lookup excludes invalid/draft/unchecked entries and requires an actual published registered lesson; lessons with no question bank have no empty practice region. The deterministic grader uses option IDs, independent of labels or position. Existing strict KaTeX settings render solution equations on the server with HTML/MathML; no client math engine, raw public HTML or arbitrary MDX is accepted.

The component uses native radios/labels, disabled submission before selection and after grading, textual/SVG answer states and inline feedback. Submit focuses feedback; Previous/Next and Retry focus the question; the selector retains native keyboard focus. Initial reading focus is preserved. Source/calculation checks are explicit while independent academic review remains pending. These are educational CEPath examples, not official PRC questions or a secure assessment.

There is no Supabase attempt write, score, saved quiz history, authentication change, automatic completion, timer, randomization, new service/dependency/schema, additional lesson or M11 implementation. See [practice architecture and authoring](docs/PRACTICE.md).

## Guided but flexible curriculum — CE-NAV-001

### Sequence and access

Each subject contains modules, and each module contains an ordered collection of lessons. Module and lesson ordering defines a recommended learning sequence; following it is optional. Students can enter any of PSAD, MSTE, and HGE without completing another subject.

All published free lessons are accessible anonymously and regardless of completion history. Students may skip to advanced topics, return to earlier lessons, switch subjects, and review completed lessons. Publication controls availability; prerequisites and progress do not. Unpublished content need not be exposed by this decision. Future optional premium content is outside its scope; current monetization exclusions still apply.

Never introduce mandatory lesson unlocking, forced prerequisite checks, completion-based restrictions, or artificial progression barriers.

### Prerequisite recommendations

A lesson may reference suggested prerequisite lessons by stable identifiers. Display prerequisite links and an informational recommendation; when authenticated completion records exist, an incomplete prerequisite may prompt advice. Students can still proceed immediately. Anonymous students receive useful recommendations without an account requirement or assumed completion history.

For example, Equilibrium of Particles may recommend Forces and Vectors and Free Body Diagrams: “Before studying this lesson, we recommend reviewing Forces and Vectors.” These are illustrative references, not authorization to create the sample lessons.

### Lesson reader

The implemented reader provides curriculum breadcrumbs, recommended previous/next lesson references, prerequisite links where applicable, and a return to the module’s ordered lesson list. Previous/next controls follow recommended order while every published free lesson remains independently selectable. Handle sequence boundaries without links to nonexistent lessons.

When progress tracking is available, show lesson completion status and the student's actual progress. Account-backed status is personal information; it must not gate public lesson content. Do not display fabricated progress before that feature exists.

### Independent lesson progress

Authenticated tracking supports **Not Started**, **In Progress**, and **Completed** per lesson. Store student progress separately from curriculum order and publication metadata. A student can complete Lesson 5 while Lessons 1–4 remain unfinished; aggregate progress must reflect actual completion records rather than filling in earlier lessons.

Revisiting a Completed lesson preserves its status. Accounts are needed for persistent personal progress, not for reading published free lessons. The database schema, precise event/state transitions, and progress denominator policy will be planned in the progress milestone; this decision does not create tables or prescribe storage fields.

### Continue Learning and Recommended Next

The eventual dashboard shows curriculum progress and provides distinct actions:

- **Continue Learning:** in M09, return to the In Progress lesson with the most recent saved progress update; page visits are not tracked. A future visit-based behavior requires separate scope.
- **Recommended Next:** offer the next lesson in the recommended curriculum sequence.
- **Completed lessons:** reopen material for review without clearing completion.
- **Curriculum subjects:** navigate freely to PSAD, MSTE, or HGE.

Continuing an out-of-order lesson must not redirect the student into a forced linear sequence. Recommendations guide rather than override that choice. If no unfinished visit or next recommendation exists, show an honest empty/end state and keep curriculum navigation available. Cross-module/subject recommendation selection and tie-breaking remain to be settled in the dashboard milestone.

### Curriculum metadata boundary

Curriculum content supports stable subject/module/lesson identifiers, module and lesson ordering metadata, optional prerequisite references, and lesson publication status. Publication status is distinct from academic editorial review status. Ordering and prerequisites must never be interpreted as progress records or access-control rules.

## Documentation acceptance examples

These are future verification cases, not tests that have run:

- An anonymous learner opens a published advanced free lesson directly with no prerequisite completion and can follow suggested prerequisite links or continue reading.
- A learner switches from PSAD to HGE without completing PSAD; previous/next guidance and the module list remain available.
- A learner completes Lesson 5 first; Lessons 1–4 remain unfinished and progress reflects only actual completions.
- Revisiting Lesson 5 preserves Completed.
- A learner's latest unfinished visit is out of order; Continue Learning opens that lesson while Recommended Next stays a separate optional action.
