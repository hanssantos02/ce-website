# Educational content review

Current publication record — 2026-10-19: the Product Owner explicitly approved publication and pushing to main. Free Body Diagrams and both questions are now public at `/curriculum/psad/engineering-mechanics-statics/free-body-diagrams`. Source/calculation checks are complete; independent academic review remains pending. The dated draft/audit records below retain their original evidence limits. No database, authentication or hosted progress data was changed.

Use one explicitly approved lesson batch at a time. Publication approval is separate from implementation and from independent academic review. Existing availability metadata remains the public gate; do not infer publication from an MDX file existing.

## Repeatable checklist

- [ ] Apply [CE-CONTENT-001](DECISIONS.md#ce-content-001--full-textbook-style-lessons--approved): assess all fifteen elements where appropriate; prioritize conceptual depth and correctness rather than a word-count target.
- [ ] Confirm the approved subject/module/lesson, stable ID, slug, display order and suggested prerequisite IDs against `content/curriculum.ts`.
- [ ] Inspect the existing reader and question model; extend content rather than duplicating UI or grading.
- [ ] State measurable objectives and a logical section sequence for the intended learner.
- [ ] Define the isolated body, physical assumptions, variables, axes, signs and units before equations.
- [ ] Check conceptual claims against real educational sources; write original explanations and record working reference URLs and the check date.
- [ ] Independently recompute each numerical example and keyed answer. Check dimensions, units, signs, rounding, force balance and moment balance where applicable. Test distractors for ambiguity.
- [ ] Inspect every diagram against the problem: body boundary, support idealization, load locations, reaction directions, labels and dimensions. Identify schematics that are not to force scale.
- [ ] Validate stable question/option IDs, ordering, answer-key references and complete solutions using the existing validator. Compile all draft MDX and render all equations with the real strict KaTeX setup.
- [ ] Check headings, meaningful figure descriptions, keyboard navigation, native choices/feedback, narrow-screen equations and legible diagram labels.
- [ ] Run types, lint, relevant tests, build and affected real-browser flows; record checks that did not run.
- [ ] Keep drafts out of public routes, published counts, recommended destinations, progress eligibility and public question lookup. Verify the production preview returns 404.
- [ ] Ask a qualified human academic reviewer to assess explanations, support models, diagrams, solutions and learner suitability; record reviewer/date/findings only when that review actually occurs.
- [ ] Obtain Product Owner approval before publication. Approval to commit or push is not approval to publish the lesson.

## Current lifecycle

No new CMS, role system or publication enum is introduced. An authored review-ready draft lives under `content/drafts/`, remains `planned` in curriculum metadata and has `draft` question status. Its prose separately records source/calculation checks and pending independent academic review. The published registry does not import it.

After explicit publication approval, use the existing mechanism: move/register the MDX body through `content/lesson-documents.ts` and `content/lesson-ids.ts`, set the existing curriculum entry to `published`, include the approved questions in the public bank with truthful review/publication metadata, and update tests/next-topic copy. Preserve IDs and prerequisites. Run the complete checks again, including new published counts, navigation, safe login returns and independent progress. This was subsequently approved for M11A on 2026-10-19.

## M11A review packet — Free Body Diagrams

The initial checks below record the 2026-10-18 baseline. The 2026-10-19 [CE-CONTENT-001 audit](#ce-content-001-audit--free-body-diagrams) extends it to three worked examples and six SVG figures while preserving publication status and the original questions.

Location: PSAD → Engineering Mechanics — Statics → Free Body Diagrams. The approved hierarchy has a single combined Engineering Mechanics — Statics module; it does not add another nested Statics route.

- Stable ID: `psad-statics-free-body-diagrams`.
- Public route: `/curriculum/psad/engineering-mechanics-statics/free-body-diagrams`.
- Prerequisite: Forces and Vectors, advisory; second of four defined lessons.
- Status: published with Product Owner approval on 2026-10-19. Independent academic review pending.
- Source check date: 2026-10-18. References: [Engineering Statics FBDs](https://engineeringstatics.org/Chapter_05-free-body-diagrams.html), [University of Alberta FBDs](https://engcourses-uofa.ca/books/statics/free-body-diagram/), [Engineering Statics planar equilibrium](https://engineeringstatics.org/Chapter_05-2d-rigid-body-equilibrium.html).

### Initial M11A checks (2026-10-18)

- Nine measurable objectives and eight sections cover isolation, external/internal interactions, support models, construction, two worked examples, mistakes and summary.
- Smooth stationary uniform 20 kg block, g = 9.81 m/s²: W = N = 196.20 N, no friction; coincident force lines and moment balance checked. Equal forces are not misidentified as a third-law pair.
- 6 m beam, ideal left pin/right horizontal roller, downward 12 kN at midpoint, self-weight neglected: Ax = 0 kN; Ay = By = 6 kN upward. Horizontal/vertical residuals and moments about both supports independently give zero.
- Original conceptual question: one vertical normal reaction at an ideal frictionless roller on a horizontal surface, with contact maintained. No horizontal reaction or reaction couple.
- Original numerical question: 5 m pin/roller beam, 10 kN downward 2 m from A: By = 4 kN upward, Ay = 6 kN upward, Ax = 0. Force and both support-moment residuals are zero. A 4 kN downward distractor is a different signed answer, not a second correct choice.
- Three diagram components provide five exact SVG figures: three support reaction sets, block, and physical-beam/FBD comparison. Titles/descriptions, captions and the text carry meaning without color alone. Force arrows are directional, not a magnitude scale.
- Exactly two draft questions use the existing practice engine, answer IDs, complete explanation structure and strict server-rendered KaTeX. Attempts remain temporary and independent of saved progress.

### Human review still required

- [ ] Review beginner comprehension, terminology, the introduction of moment balance and the scope boundary with subsequent equilibrium lessons.
- [ ] Check ideal roller/pin/fixed assumptions, unanchored-contact limitations and the internal/external-force explanation.
- [ ] Inspect all diagram arrow directions, the fixed-support counterclockwise couple, labels and dimension locations against the prose.
- [ ] Recompute worked examples and practice keys independently; assess the distractors and explanatory feedback.
- [ ] Approve or request revisions; record academic review status truthfully. No licensed-engineer review is claimed.
- [x] Product Owner explicitly approved publication on 2026-10-19; independent academic review is still pending.

### Review the published lesson locally

Run `npm run dev -- --hostname 127.0.0.1`, then open `http://127.0.0.1:3000/curriculum/psad/engineering-mechanics-statics/free-body-diagrams`. The former `/review/free-body-diagrams` bookmark redirects there in development and production. Content is public, with advisory prerequisites; only saving personal progress requires sign-in.

Review all six figures, three worked examples and both correct/incorrect practice results. Retry and switch questions, then refresh to confirm attempts reset. Inspect mobile equation scrolling, breadcrumbs, and previous/next references. In an authorized signed-in session, save this lesson before Forces and Vectors and confirm their statuses remain independent after refresh and sign-out/sign-in. Stop the terminal process with Ctrl+C when finished.

### Initial implementation and verification record (before publication)

The existing published metadata/registry, public question bank, progress service, auth, dashboard and SQL are unchanged. A trusted optional review prop feeds the same reader; only the development-only page supplies it. A source override lets the same practice section cite statics rather than the vectors source. No new dependencies, migration, RLS or progress writes.

Created: `content/drafts/free-body-diagrams.mdx`, `content/drafts/free-body-diagrams-questions.ts`, `components/lesson/free-body-diagrams.tsx`, `app/review/free-body-diagrams/page.tsx`, `tests/free-body-diagrams.test.mjs`, this checklist, and the M11A surface brief. Modified: `components/lesson/lesson-reader.tsx`, `components/practice/practice-section.tsx`, `mdx-components.tsx`, `README.md`, `PRODUCT.md`, `docs/DECISIONS.md`, `docs/ROADMAP.md`.

Final verification: `npm run check` passed lint, strict TypeScript and all 55 tests. `npm run build` passed. Fourteen production HTTP checks passed, including preview/public-draft 404s and query-bypass denial. The quick built-in code review found no actionable issue and three focused test files passed in that review. Actual local draft browser checks exercised both correct keys, incorrect conceptual feedback, retry, free navigation/retained answers, native selector focus, refresh reset and section-index focus. Desktop/mobile/tablet/320px/user-1280 layouts fit without page-wide overflow, buttons were at least 44px, and a narrow equation scrolled 40px by keyboard. All five final figures have label bounds inside their SVGs; the block axis label received one correction. Inherited text/focus contrast pairs pass 4.5:1, and console/detector output was empty. The final Impeccable full review inspected all 22 valid captures and returned `ship` with no material fixes. Two wrong-scroll screenshot exports were replaced before that full review; they were evidence defects, not publication or application failures. The shipped documenter confirmed DESIGN.md and its sidecar are byte-identical to baseline: eight color/eight spacing/seven type primitives, North Star and all 15 previews are preserved. No new visual system is needed. Existing 51 checks passed before changes; draft-specific tests initially failed because content did not exist. Four new tests check publication exclusion, actual MDX compilation/metadata, two complete question records and strict equations, independent mechanics and answer mappings. No hosted account/persistence test, screen-reader session or licensed academic review is inferred from these local checks.

## CE-CONTENT-001 audit — Free Body Diagrams

Audit date: 2026-10-19. Baseline: the existing M11A review-ready draft, not a blank lesson. This audit applies the newly approved textbook-style standard without changing publication status or expanding into M11B. Technical audit is not independent professional review.

| Standard requirement | Existing evidence and assessment | Targeted action |
| --- | --- | --- |
| Introduction/relevance | Clear definition, isolation rationale and civil beam example already meet the requirement. | Preserve; make the particle/rigid-body distinction explicit. |
| Objectives | Nine measurable objectives cover the approved topic. | Preserve verbatim. |
| Prerequisites | Valid advisory Forces and Vectors reference already appears in the reader footer. | Add a short early reminder/link and required skills, retaining the same prerequisite ID. |
| Foundational explanations | External/internal boundary and third-law examples are sound; point of application and line of action are only implicit. | Add the rigid-body model and force-location meaning. |
| Progressive development | Isolation → reactions → construction → equilibrium is logical. Reaction types are stated correctly but the motion-constraint rationale is brief. | Explain planar translation/rotation and how restraints generate unknown reactions. |
| Defined equations | Weight and equilibrium variables/units are mostly explicit. Moment component formula is stated without development. | Define force magnitude/perpendicular lever arm and distinguish individual moments from the sum. |
| Derivations/assumptions | Smooth contact, self-weight omission and sign conventions are explicit. Perpendicular-distance and reaction-share derivations are missing. | Derive the component moment and general single-load beam reactions with stated domain/assumptions. |
| Diagrams | Five original SVG figures accurately show supports, block and symmetric beam; no inaccurate existing geometry found. | Retain existing figures; reuse the beam component for a matching off-centre case with unique SVG references. |
| Increasing examples | Block then symmetric beam are complete and checked, but symmetry limits the progression. | Preserve both and add one off-centre worked beam example. |
| Misconceptions | Ten specific mistakes already give useful examples. | Preserve verbatim. |
| Conceptual/computational practice | Exactly two original questions cover roller modeling and off-centre equilibrium. | Preserve question IDs, wording, choices, keys and solutions. |
| Detailed solutions | Both original worked examples and both practice solutions state reasoning, calculations and interpretation. | Preserve; match their structure in the added example. |
| Board-exam application | No explicit transfer-to-exam method beyond generic statics checks. | Add a short original board-exam-style problem-solving method; no official exam claims. |
| Summary | Correct concise conceptual recap and advisory next topics. | Preserve core recap; connect it to the new derivation and asymmetric case. |
| Academic references | Three real relevant sources exist; they are sufficient for the existing content. | Retain them and add verified moment-definition/component references for new explanations. |

The draft is already a coherent lesson; its gaps concern depth and transfer, not a need to replace its architecture or all its prose. The comprehensive requirement is topic-dependent, not a requirement to include beam stress/design, advanced friction, every support type or an entire rigid-body equilibrium chapter here.

### Review outcome and verification

The technical audit is complete for the approved introductory FBD scope. Improvements were additive within the same eight section IDs: early prerequisite preparation, particle/rigid-body distinction, line of action, reaction-constraint reasoning, moment definition/component development and applied-couple treatment, a third asymmetric worked example, a constrained reaction-share derivation and original board-exam-style transfer guidance. Two verified moment references supplement the existing three sources. No arbitrary length target or full rigid-body/design chapter was added.

Preservation checks compare the pre-update draft, not just Git HEAD: the original nine objectives, both original worked examples, the complete misconceptions section and the two-question source are byte-for-byte unchanged. Existing lesson/question IDs, ordering/prerequisite metadata, public registry, routes, reader/practice implementation, publication state, auth/progress services and SQL are unchanged by this update. The existing beam component gains only an off-centre case with unique SVG references; its midpoint geometry and values remain the same. No dependencies or database operations were introduced.

Calculation checks: the new 6 m beam carries a 12 kN downward point load 2 m from A; Ax = 0 kN, Ay = 8 kN upward and By = 4 kN upward. Vertical forces and moments about A and B give zero residual. The generic results By = Pa/L and Ay = P(L-a)/L were checked at a = 0, 2, 3 and 6 m for P = 12 kN, L = 6 m, including symmetric and endpoint limits. The moment component identity and sliding a force along its line of action were independently checked numerically. Original 196.20 N block, 6/6 kN midpoint beam and 6/4 kN practice reactions remain correct.

Verification executed: `npm run check` passed all 57 tests, lint and strict TypeScript; `npm run build` passed. Two added focused tests exercise expanded MDX/equilibrium and actual rendered SVG load positions, dimension labels, unique IDs and accessibility/marker references. Fourteen production HTTP checks passed existing routes and unpublished/preview 404s, including query-bypass rejection. Real anonymous local-draft browser checks confirmed all six figures/MathML, both correct practice keys, incorrect numerical feedback, retry and responsive layout. Desktop 1440px, mobile 390px and narrow 320px captures had loaded fonts, no duplicate IDs, no figure-label clipping or page-wide overflow. Console and one detector run were empty. The quick source review found no concrete defects and executed all six FBD tests; this is not independent professional academic review. The shipped Impeccable finish reviewer inspected all six valid desktop/mobile/narrow captures and source adaptation, returning `ship` with no material fixes. This verdict covers the reading/diagram adaptation only, not academic publication approval. The shipped documenter confirmed preservation of all eight color/eight spacing/seven type primitives, the 68ch reader, North Star and fifteen existing previews; DESIGN.md and the sidecar are unchanged.

Remaining human academic review: confirm the chosen introductory depth and progression, the restraint/stability qualifications, moment/couple explanations, off-centre diagram and all assumptions. A licensed-engineer review, screen-reader session and live hosted private-progress checks did not occur. Existing progress behavior is protected by unchanged storage/identity/schema and passing eligibility/service/policy regression tests; no hosted student records were read or modified. At the end of this audit, Free Body Diagrams remained planned/unpublished with draft questions. The subsequent publication approval is recorded above. M11B has not begun.

## Approved publication implementation — 2026-10-19

Moved the trusted lesson to `content/lessons/free-body-diagrams.mdx` and question metadata to `content/free-body-diagrams-questions.ts`; explicitly registered both through existing content mechanisms. Only publication/editorial notices and next-topic integration changed after the standards audit; checked examples, figures, question IDs and answers are preserved. Removed temporary reader draft injection, retained the small per-lesson practice reference option, and redirected the review bookmark to the canonical public lesson. The progress service, authentication, SQL and RLS are unchanged.

Publication regression tests cover two real lesson bodies, seven lesson-scoped questions, updated dashboard denominators/recommendations, exact safe login returns and Free Body Diagrams completion before Forces and Vectors without modifying its progress. Hosted positive save/session behavior and independent academic review are not inferred from isolated tests.

Publication verification (2026-10-19): `npm run check` passed lint, strict TypeScript and all 59 tests, including the unchanged isolated PostgreSQL ownership/persistence tests. `npm run build` passed. Sixteen production HTTP checks confirmed public pages, both lesson bodies, ordered module links, planned/invalid 404s, the review bookmark redirect, safe lesson sign-in return and protected account denial. Actual anonymous desktop/mobile browser checks confirmed six SVG figures, 87 rendered MathML expressions, both practice keys, incorrect numerical feedback/retry, no page-wide overflow, and working module/sign-in-return navigation. Quick built-in source review found no actionable bugs. No live authenticated progress write, professional academic review or hosted deployment is claimed. No database migration was needed; M11B remains unstarted.
