# CEPath product behavior

Updated: 2026-10-14. The application has a design foundation and a landing page introducing CEPath, its planned curriculum, and its learning approach. Curriculum and progress behavior below remains approved future behavior, not implemented features. See [STRATEGY.md](STRATEGY.md) for direction, [DESIGN.md](DESIGN.md) for the visual system, and [CE-NAV-001](docs/DECISIONS.md#ce-nav-001--guided-but-flexible-curriculum-navigation--approved) for curriculum rationale.

## Design Foundation — Milestone 02

The Product Owner selected an engineering faculty bulletin identity: white reading surfaces, deep blue ink, academic headings, and a compact section index. This is a shared visual foundation for future learning surfaces, demonstrated on the existing public homepage.

The implemented reusable layout set is a page container, header, and footer. Visual tokens and usage rules belong in DESIGN.md. The root layout owns the skip link and main landmark; Home is marked current only on the homepage, including when the shell appears on a missing route.

## Landing Page — Milestone 03

The homepage introduces the planned concept-first learning platform and clearly names lessons, practice, accounts, and progress tracking as unavailable. Primary “Explore the curriculum” links lead to #curriculum; “How it works” links lead to #how-it-works. Subject previews are descriptive content, not interactive subject cards or a full catalog.

The three groups use full examination names and representative topics from PRC’s dated September 2026 program, with MSTE identified as student shorthand. The page links the source and does not promise a complete syllabus. Preview content has stable subject IDs and lives separately from UI in content/landing.ts.

The learning journey describes planned behavior: freely choose a subject, follow or skip the recommended sequence, learn through future explanations/examples/practice, and later resume using account-backed progress. It explicitly says that prerequisites offer guidance without locks and every published free lesson will remain accessible anonymously, revisitable, and independent of subject order.

The header offers Home, Curriculum, and How it works. Navigation remains visible and wraps on mobile. The hero includes a compact section index; native anchors move focus to real content. M2’s #approach and #about anchors remain meaningful. Values and closing sections explain the intended approach and return to the preview. The footer includes working navigation, independent-platform/PRC non-affiliation language, and the temporary-name/development notice. There are no authentication, subject, lesson, or legal-page routes.

## Guided but flexible curriculum — CE-NAV-001

### Sequence and access

Each subject contains modules, and each module contains an ordered collection of lessons. Module and lesson ordering defines a recommended learning sequence; following it is optional. Students can enter any of PSAD, MSTE, and HGE without completing another subject.

All published free lessons are accessible anonymously and regardless of completion history. Students may skip to advanced topics, return to earlier lessons, switch subjects, and review completed lessons. Publication controls availability; prerequisites and progress do not. Unpublished content need not be exposed by this decision. Future optional premium content is outside its scope; current monetization exclusions still apply.

Never introduce mandatory lesson unlocking, forced prerequisite checks, completion-based restrictions, or artificial progression barriers.

### Prerequisite recommendations

A lesson may reference suggested prerequisite lessons by stable identifiers. Display prerequisite links and an informational recommendation; when authenticated completion records exist, an incomplete prerequisite may prompt advice. Students can still proceed immediately. Anonymous students receive useful recommendations without an account requirement or assumed completion history.

For example, Equilibrium of Particles may recommend Forces and Vectors and Free Body Diagrams: “Before studying this lesson, we recommend reviewing Forces and Vectors.” These are illustrative references, not authorization to create the sample lessons.

### Lesson reader

The eventual reader provides curriculum breadcrumbs, recommended previous/next lessons, a module lesson list, prerequisite links where applicable, and a clear return to the curriculum. Previous/next controls follow recommended order while every published free lesson remains independently selectable. Handle sequence boundaries without links to nonexistent lessons.

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

When implemented, curriculum content supports stable subject/module/lesson identifiers, module and lesson ordering metadata, optional prerequisite references, and lesson publication status. Publication status is distinct from academic editorial review status. Ordering and prerequisites must never be interpreted as progress records or access-control rules.

## Documentation acceptance examples

These are future verification cases, not tests that have run:

- An anonymous learner opens a published advanced free lesson directly with no prerequisite completion and can follow suggested prerequisite links or continue reading.
- A learner switches from PSAD to HGE without completing PSAD; previous/next guidance and the module list remain available.
- A learner completes Lesson 5 first; Lessons 1–4 remain unfinished and progress reflects only actual completions.
- Revisiting Lesson 5 preserves Completed.
- A learner's latest unfinished visit is out of order; Continue Learning opens that lesson while Recommended Next stays a separate optional action.
