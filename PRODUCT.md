# CEPath product behavior

Updated: 2026-10-14. The application has a design foundation and a landing page introducing CEPath, its planned curriculum, and its learning approach, plus a public subject catalog. Subject and module navigation and one complete Forces and Vectors lesson reader are implemented. Accounts and saved progress remain future behavior. See [STRATEGY.md](STRATEGY.md) for direction, [DESIGN.md](DESIGN.md) for the visual system, and [CE-NAV-001](docs/DECISIONS.md#ce-nav-001--guided-but-flexible-curriculum-navigation--approved) for curriculum rationale.

## Design Foundation — Milestone 02

The Product Owner selected an engineering faculty bulletin identity: white reading surfaces, deep blue ink, academic headings, and a compact section index. This is a shared visual foundation for future learning surfaces, demonstrated on the existing public homepage.

The implemented reusable layout set is a page container, header, and footer. Visual tokens and usage rules belong in DESIGN.md. The root layout owns the skip link and main landmark; Home is marked current only on the homepage, including when the shell appears on a missing route.

## Landing Page — Milestone 03

The homepage introduces the planned concept-first learning platform and identifies one available sample lesson and names accounts, saved progress and interactive practice as future work. Primary “Explore the curriculum” links now lead to /curriculum; “How it works” links lead to #how-it-works. Landing subject previews retain their visual layout and now provide explicit links to the implemented overviews.

The three groups use full examination names and representative topics from PRC’s dated September 2026 program, with MSTE identified as student shorthand. The page links the source and does not promise a complete syllabus. Subject metadata and representative preview topics now come from content/curriculum.ts, shared with the catalog. Landing-only journey and values remain in content/landing.ts.

The learning journey describes planned behavior: freely choose a subject, follow or skip the recommended sequence, read the first sample with explanations/examples/static practice, and later resume using account-backed progress. It explicitly says that prerequisites offer guidance without locks and every published free lesson will remain accessible anonymously, revisitable, and independent of subject order.

The header offers Home, Curriculum, and How it works. Navigation remains visible and wraps on mobile. The hero includes a compact section index; native anchors move focus to real content. M2’s #approach and #about anchors remain meaningful. Values and closing sections explain the intended approach and link to the catalog. The footer includes working navigation, independent-platform/PRC non-affiliation language, and the temporary-name/development notice. Catalog, subject, representative module and one published lesson route are implemented; authentication, additional lesson content and legal-page routes remain absent.

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

The Product Owner selected a compact native section index. Its anchors focus real sections; reading content remains visible when the index is closed. All content is publicly accessible. Publication means a complete body is available; visible editorial status records source/calculation checks separately from pending independent academic review. Planned next lessons remain plain recommendations, with no active links. Authentication and progress require separate approval.

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

- **Continue Learning:** return to the most recently visited unfinished lesson.
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
