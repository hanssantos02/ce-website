---
version: 1
slug: "components-practice-practice-section-tsx"
primary_target: "components/practice/practice-section.tsx"
related_targets: ["components/practice/practice-engine.tsx", "components/lesson/lesson-reader.tsx", "app/globals.css"]
---

# M10: Optional practice within a lesson

Mode: Operate inside the Read lesson. Inherit the faculty bulletin's white reading sheet, deep blue ink, academic serif headings, native controls and measured rules. This is a bounded code-led extension, with no new identity, comp, raster or seed.

THESIS: An optional question and its explanation turn vector concepts into a deliberate self-study check without interrupting free reading.

OWN-WORLD: Existing 68ch lesson column, neutral rules, Source Serif headings and Source Sans labels/prose; existing blue and neutral tokens only. Native radios, square buttons and exact SVG check/cross geometry make selection and feedback unambiguous without color dependence.

STORY: Read the published lesson, jump to practice, select one answer, submit, compare the submitted and correct choices, study a server-rendered worked solution, retry or freely choose another question. Attempts are page memory only and never change lesson progress.

FIRST VIEWPORT: The existing lesson header/index/objectives and progress region are preserved. Practice follows the existing article and precedes the curriculum footer. A section heading and honest editorial/temporary-state note introduce one question, its given context, labeled radio choices and submit action. Feedback and detailed solution appear only after submission. No score, timer, account gate, completion claim or attempt history.

FORM: The owner selected one question at a time. Previous/Next and a native question selector allow moving without answering, preserving each answer until refresh; retry clears only the current question. Submit focuses feedback; Previous/Next and Retry focus the question. The native selector retains focus for repeated arrow keys, and initial lesson focus is preserved. Labels/controls reach at least 44px, buttons wrap/stack on phones, equations scroll locally when needed.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Scope: five original checked questions for Forces and Vectors only, generic typed bank and ID-based grading, existing KaTeX rendered on the server. Source/calculation checks are distinct from independent academic review, which remains pending. No Supabase attempt writes, auth changes, migrations, dependencies, quiz history, new lessons, M11, commits, push or deployment.

Final verification (2026-10-17): 51 tests, lint/types and production build passed; 15 HTTP checks and actual anonymous keyboard/state/refresh flows passed. All 18 viewport captures were reviewed individually by the shipped finish reviewer: disposition ship, no material fixes. Detector and browser console were empty. Existing primitives are inherited; independent academic review and screen-reader acceptance remain pending.
