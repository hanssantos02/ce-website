# Interactive practice: content, behavior and verification

Milestone 10 adds five original single-answer multiple-choice questions to the existing Forces and Vectors lesson. Practice is public, optional and independent of authentication, saved lesson progress and the dashboard. There is no new route, dependency, database migration, backend endpoint or attempt storage.

## Question architecture

`content/practice-questions.ts` owns the repository-managed bank and its TypeScript types. A question has a stable ID, stable parent lesson ID, explicit display order, the single supported question type, publication/review states, a prompt, given context, stable option IDs/text, one `correctOptionId`, an explanation and a structured solution. The solution records the required unknown, explained steps with optional TeX equations, final answer and interpretation. It contains no HTML or executable content.

Publication and editorial checks are distinct. `draft` questions are excluded. Published questions must pass source/calculation checks; the public notice separately states that independent academic review is pending. This is not a professional-review claim. The questions are CEPath-authored educational examples, not official PRC items or copied textbook questions.

`lib/practice/questions.ts` checks IDs, real lesson references, supported states/type, positive integer order, distinct complete choices, exactly one valid answer-key target and complete published explanations. Duplicate question IDs are rejected. The lesson lookup filters invalid/draft/unchecked questions and requires a registered published lesson with a real destination. Sorting uses display order, then stable ID. No ID is derived from a title or option label. Invalid equations fail strict rendering and the test/build gate before publication.

## Rendering and lesson integration

The Server Component reader queries the bank using its existing stable lesson ID, adds a real section-index anchor only when questions exist, and places practice after the existing MDX article and before the curriculum footer. The original nine MDX sections, static self-study exercise, math, diagram, progress controls and lesson navigation remain intact. An empty question array renders no practice section. Only one lesson currently has complete published content; no fake second lesson was created to demonstrate the empty case.

`components/practice/practice-section.tsx` prepares solution content on the server. `lib/practice/math.ts` uses the existing KaTeX package; `mdx-options.mjs` shares strict, `trust:false`, HTML-plus-MathML settings with MDX. The HTML insertion boundary accepts only KaTeX output from trusted repository equations. Raw question text is escaped by React; public HTML/MDX input is not accepted. KaTeX is not imported by the client engine. Equation containers scroll locally and are keyboard-focusable when narrow.

`components/practice/practice-engine.tsx` receives the question metadata and server-rendered solution nodes. Correct answers are delivered to the browser, which is acceptable for low-stakes self-study; this offers no secure-examination or anti-cheating guarantee.

## Grading and temporary state

`lib/practice/state.ts` grades by stable option ID, never option position/text or browser floating-point calculations. Unknown option/key references do not grade. The transition helper supports Unanswered, Selected and Submitted, preserves the submitted selection/result, ignores repeated submissions/changes after submission, and permits an explicit retry.

The owner chose one question at a time. A question selector and Previous/Next controls allow moving without answering. A local map retains each question's attempt until refresh; retry clears only the current question. Refresh resets this temporary state. No cookie, localStorage, Supabase write, score, history or implicit completion accompanies an answer.

Native fieldsets, legends, labels and radios retain keyboard behavior. Submit is disabled until selection and after submission. Feedback identifies both the submitted and correct answers with words and SVG geometry, then reveals the detailed solution. Feedback receives focus; Previous/Next and Retry focus the question heading. The question selector retains native focus for repeated arrow keys. Initial rendering does not steal lesson focus. Practice does not lock lesson access or make prerequisites mandatory.

## Authored answer checks

Axes use positive x rightward and positive y upward; force angles are counterclockwise from positive x. Numerical choices and final solutions use newtons, with component results displayed to two decimal places.

| Question | Independently recomputed result |
| --- | --- |
| Horizontal component, 500 N at 30° | 500 cos(30°) ≈ 433.01 N, rightward. |
| Vertical component, 300 N at 30° | 300 sin(30°) = 150.00 N, upward. |
| Magnitude from +300 N / +400 N components | √(300² + 400²) = 500.00 N. |
| Horizontal sign, 200 N at 120° | 200 cos(120°) = −100.00 N, leftward. |
| Vector versus scalar | Force has magnitude/direction; mass has magnitude without a spatial direction. |

Node tests independently recompute the four numerical results and compare the keyed choice, final answer and rendered equation values. They check units, explicit angle conventions, distinct distractors and unique correct mapping. All authored equations are rendered with the real strict KaTeX configuration, including HTML/MathML assertions and an intentionally malformed expression. Conceptual vector conventions were checked against [OpenStax Algebra of Vectors](https://openstax.org/books/university-physics-volume-1/pages/2-3-algebra-of-vectors). These checks do not replace independent academic review.

## Adding an approved question

1. Use a real stable lesson ID from the curriculum/registration source. Questions appear only when that lesson has published content.
2. Add a `PracticeQuestion` object to the bank with a new stable question ID and stable option IDs. Use `draft` / `unchecked` during authoring. Give it an explicit display order; never change IDs just to rename text.
3. Write the original prompt/context and distinct choices. Set `correctOptionId` to exactly one existing option. Fill the explanation, required unknown, solution steps, answer/units and interpretation. Optional step equations use `String.raw` TeX strings; the existing server renderer handles them.
4. Independently check the reasoning, calculations, units, signs, conventions and distractors. Set the truthful source/calculation review state, then publish. Independent academic review must still be disclosed unless actually performed.
5. Extend the numerical/content tests and the intentionally current five-question scope assertions for approved expansion. Run `npm run check` and `npm run build`, then verify the actual lesson on a phone and with the keyboard.

No reader or engine rewrite is needed to add questions to another approved published lesson. Unsupported question types, question randomization, authoring tools and persistent attempts require separate scope.

## Verification and acceptance

`npm run check` passed lint, strict TypeScript and 51 tests. `npm run build` passed with the same suite. Six new practice tests cover bank integrity/filtering/order, correct/incorrect stable-ID grading, guarded/repeated submissions/retry, independent numeric answers and strict mathematical rendering. Existing curriculum, MDX, authentication, dashboard and isolated PostgreSQL policy tests remain passing.

The `ce-code-review` quick path used the built-in Codex review, scoped to M10. It found one P2 native question-selector focus issue. The issue was reproduced in the real browser, fixed, and confirmed with repeated ArrowDown navigation retaining SELECT focus. A focused follow-up review marked it resolved; no other concrete M10 bugs were reported. A feedback punctuation adjustment was included in the same correction batch.

Browser checks use the actual published production lesson anonymously, not a synthetic private fixture. They exercise native radio Space/ArrowDown selection, disabled submit, correct/incorrect feedback and all five keys, solution math, per-question state preservation, independent retry, direct question selection, Previous/Next, no initial focus theft, refresh reset and visible public-reading context. Desktop/mobile and 768px/320px/user-1280 layouts fit without page-wide overflow; labels/buttons measured at least 44px. At 320px, a long resultant equation scrolled locally with the keyboard. Fifteen production HTTP responses passed lesson integration, initial hidden-solution/four-radio state, public/auth route availability, private dashboard denial/no-store, invalid/planned routes and no practice section on unrelated pages. Text/selection/focus contrast pairs passed 4.5:1. Browser console warnings/errors and the single mechanical detector result were empty. The independent Impeccable finish reviewer opened all 18 valid desktop/mobile/tablet/narrow/user-width captures and returned `ship` with no material fixes. Its verdict covers this public practice extension; it does not verify private hosted behavior or independent academic review. Final design documentation adds the practice pattern and one explicitly static preview. Snapshot checks preserve the eight color, eight spacing and seven typography primitives, North Star, canonical headings and all 14 incumbent previews. M10 acceptance passed; M11 has not begun.

Limitations: independent academic review, a screen-reader session, comprehensive automated accessibility audit and a positive live authenticated browser session remain unverified. M09 private hosted acceptance remains pending independently; M10 does not alter its data path. Source inspection establishes no practice backend/persistence path; no network interception or hosted database write test is claimed. Refresh deliberately discards practice attempts.

## Manual checks

1. Open Forces and Vectors signed out. Use On this page → Interactive practice; reading remains public.
2. Select a wrong answer and submit. Confirm your choice, the correct choice and full solution appear; submission/radios cannot alter the submitted result.
3. Retry, select the correct answer and submit. Use the keyboard as well as the pointer.
4. Move freely using Previous/Next and the selector. Submitted answers stay attached to their own question. Retry one question and confirm another answer remains.
5. Refresh: practice returns to Unanswered. Signed-in lesson progress, if present, must be unchanged; answering practice never starts/completes/resets it.
6. On a phone, check wrapped concept choices, equations, feedback and 44px actions. With keyboard focus in the selector, press successive arrows without refocusing it.

## M10 file manifest

Created: `content/practice-questions.ts`; `lib/practice/questions.ts`, `state.ts`, `math.ts`; `components/practice/practice-section.tsx`, `practice-engine.tsx`; `tests/practice.test.mjs`; this guide; `.impeccable/surfaces/components-practice-practice-section-tsx.md`.

Modified: `components/lesson/lesson-reader.tsx`, `mdx-options.mjs`, `app/globals.css`, `README.md`, `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, `docs/ROADMAP.md`, `docs/DECISIONS.md`. Earlier M07/M08/M09 work remains uncommitted and was preserved. No commit, push, deployment, account/email creation or migration was performed. M11 Curriculum Content Expansion remains unstarted.
