---
version: 1
slug: "app-curriculum-slug-moduleslug-lessonslug-page-tsx"
primary_target: "app/curriculum/[slug]/[moduleSlug]/[lessonSlug]/page.tsx"
related_targets: ["app/globals.css","content/curriculum.ts","content/lesson-documents.ts","content/lessons/forces-and-vectors.mdx","content/lessons/free-body-diagrams.mdx","components/lesson/lesson-reader.tsx","components/lesson/lesson-index.tsx","components/lesson/educational-components.tsx","components/lesson/force-components-diagram.tsx","mdx-options.mjs","rehype-equation-accessibility.mjs"]
---

# CE-DESIGN-002: Textbook and engineering lesson workspace

Mode: Read. Filipino civil engineering students read substantial textbook lessons, inspect figures and equations, and practice beside review notes. Code-led refinement of the existing engineering faculty bulletin. The Product Owner selected the right-hand contextual section index on wide screens. Existing lesson IDs, routes, publication state and learning behavior remain authoritative.

## Direction contract

THESIS: A calm engineering textbook connects chapter context, conceptual explanations, exact figures, worked examples and optional practice with contextual desktop chapter navigation.

OWN-WORLD: Inherit M02's faculty blue and white reading sheets, Source Serif academic headings and Source Sans prose, square geometry and measured neutral rules. Preserve every existing color, spacing and typography primitive, the 68ch reading measure and 18px prose at line-height 1.8. Refine the shared reader without replacing its identity.

STORY: Identify the chapter, subject/module, advisory sequence and honest editorial status; optionally inspect or explicitly change personal progress; read or jump to any section, inspect figures and equations, reveal solutions and practice freely. Section location is reading position, never student progress. Published free lessons remain publicly accessible regardless of prerequisites, completion or index state.

FIRST VIEWPORT: Real wider wrapping breadcrumbs precede a 48px serif chapter heading (38px at and below 48rem), description and grouped subject/module, sequence and editorial metadata. Below, a textbook reading column and optional progress region sit beside a 240px right index at and above 72rem, separated by 4rem. Below that breakpoint, one closed native disclosure occupies the linear flow above objectives and below progress; no duplicate mobile index. The client opens the disclosure at wide widths and resets opening when the breakpoint changes. Sustained prose stays within 68ch. Cool Paper insets distinguish worked examples; exact SVG figures receive sequential blue “Figure N.” caption prefixes; equations retain local scrolling and named keyboard-focusable regions.

FORM: Code-led refinement, incumbent candidate 5 / seed 1f41974b from M02. No new assets or world replacement. Keep the existing page container, header and footer. The small client index enhances server-rendered native anchors with passive, animation-frame-coalesced scroll observation and `aria-current="location"`, without writes or forced sequence. Without JavaScript, the disclosure and links remain usable. Strict server KaTeX HTML/MathML preserves notation; a repository rehype plugin adds `tabIndex={0}`, `role="region"` and the name “Equation” to display math. Existing practice and explicit progress controls retain their own behavior.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Scope: shared reader presentation and the bounded equation-accessibility plugin. Preserve lesson content/calculations, IDs, routes, metadata, question keys/engine, authentication, progress, database and RLS. Free Body Diagrams was already published by D021; `/review/free-body-diagrams` remains a redirect to its canonical public lesson. No draft status, new draft-review system, packages, curriculum expansion, commit, push or deployment is introduced by this refinement.

## Current implementation and evidence — 2026-10-19

The chapter header and responsive workspace are implemented in the shared reader and stylesheet. One native lesson index includes objectives, actual document sections and interactive practice only when questions exist. On desktop it is sticky at 1.5rem, capped at `calc(100dvh - 3rem)` with local overflow; on phones/tablets it uses native disclosure behavior. Objectives end with a neutral rule and 2rem padding. Existing lesson sections retain 4rem top margins and 1.5rem anchor clearance. Worked-example padding is 1.5rem, reducing to 1rem at and below 48rem; shared figure captions use a per-lesson counter. No progress writes are triggered by reading or index tracking.

Reported verification from the implementation and visual-review agents: 59 tests, lint, strict types and production build passed; 16 production HTTP cases and responsive checks at 1440, 1266, 768, 390 and 320px were checked. The independent visual reviewer opened all 12 captures under `.impeccable/review/design-v2` and reported no material UI defects. Capture files use `.jpg` for their actual native JPEG bytes. This evidence covers presentation and exercised local behavior; it does not establish hosted private-progress behavior, screen-reader acceptance or independent academic review.

DESIGN.md and schemaVersion 2 `.impeccable/design.json` record the finished refinement. All existing frontmatter primitives and 15 incumbent sidecar preview objects are preserved. A sixteenth, explicitly static workspace specimen shows the new chapter/contextual-index composition; it does not simulate live scroll observation, progress writes, practice grading or KaTeX. Earlier preview specimens and the milestone evidence below are historical/source-derived records, not assertions that the current reader retains its old centered/no-sidebar composition.

## Historical evidence

The following M05/M06 records describe their original implementation boundaries and checks. CE-DESIGN-002 above supersedes their 32px chapter title, centered reader and all-width collapsed-index layout. Subsequent milestones already introduced optional progress and practice and published Free Body Diagrams; historical “no client boundary,” “no progress,” “no authentication,” “planned” and “stop before M07” statements are not current constraints.

Historical M05 record:

Completion (2026-10-14): independent finish review returned ship with no material fixes. DESIGN.md and its sidecar document the actual navigation rows, availability, prerequisites and reading-sheet patterns, preserving incumbent primitives and North Star. Lint/types, nine data tests and production build passed. All nine real routes, local links/anchors, 32 existing topic entries, ordered references, ten invalid/planned 404 cases and local assets verified. Fifteen final captures across five widths, including the current 1266px viewport, show no overflow or loading defect. Keyboard hierarchy, prerequisite links, parent returns/breadcrumbs, native subject index, skip focus and 404 recovery passed. Measured text contrast minimum 6.27:1; navigation targets at least 44px; detector and console findings empty. Reduced motion inspected in CSS only; screen-reader and official design-schema/live-panel audits not run. No full reader, published lessons, progress, accounts, services, packages or new client boundary. No shipping raster imagery; review JPEGs retain native bytes with correct extensions. M05 complete; no M06 work started. The Product Owner subsequently authorized committing and pushing the verified milestone to main; no deployment.

M06 completion (2026-10-14): one complete trusted local MDX lesson and server KaTeX/MathML reader replace the metadata overview at the unchanged URL. Seven objectives, nine sections, optional native index, proportional SVG, ruled worked example, quiet notes, static solution disclosure and advisory curriculum footer are implemented. Lint/types, 14 focused tests, production build and nine-page route/link/asset checks passed; ten invalid/planned cases404. Desktop/user/tablet/mobile/narrow captures show no page-wide overflow; local scrolling, keyboard focus/navigation and availability truth verified. One diagram label refinement batch confirmed; detector and console findings empty. Independent finish review returned ship across23captures with no material fixes. DESIGN.md and schemaVersion2 sidecar updated with unchanged primitives/NorthStar and11 bounded patterns; static documentation consistency verified. Independent academic review, screen-reader and official schema/live-panel audits remain pending/unrun. No shipping raster assets, new client boundary or future milestone work. M06 complete locally; changes uncommitted, no push or deployment.

The Product Owner subsequently authorized committing and pushing the verified M06 milestone to main. No deployment or M07 work is authorized.
