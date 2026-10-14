---
version: 1
slug: "app-curriculum-slug-page-tsx"
primary_target: "app/curriculum/[slug]/page.tsx"
related_targets: ["app/globals.css","components/curriculum/subject-symbol.tsx","components/curriculum/breadcrumbs.tsx","content/curriculum.ts"]
---

# Milestone 04: Subject overview template

Mode: Read. Audience: students surveying a subject's learning areas. Inherit the faculty bulletin world; the brief fixes the overview/ordered-topic structure. The Product Owner selected a compact topic index plus ordered list.

## Direction contract

THESIS: Give students an honest map of a subject's learning areas, with useful order and immediate freedom to jump.

OWN-WORLD: Existing white sheets, serif academic hierarchy, sans prose, deep blue links, neutral rules, and 68ch reading measure. No new colors, fonts, ornamental imagery, or data states.

STORY: Recognize the subject, understand its scope, follow the on-page index to any informational topic, and return to the catalog. Understand future subject → module → lesson organization without fabricated modules or lessons.

FIRST VIEWPORT: Breadcrumb, full subject title and a brief academic introduction; below it a compact subject symbol and native topic-index disclosure beside the ordered content. Main topic rows have explicit advisory order, heading, and concise description. Mobile keeps title/availability before index and topic content; the longest MSTE title must remain legible.

FORM: Shared subject route /curriculum/[slug], inherited candidate 5/seed 1f41974b. The explicit brief and confirmed index fix the composition, so no new tournament/comp. The index is a native disclosure, initially collapsed to keep long subject lists compact on phones. Signature interaction: native index anchors transfer focus to actual topic descriptions, not nonexistent lessons; every subject is open anonymously.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Scope: three static subject overviews from one typed source, stable topic IDs/slugs, explicit displayOrder, metadata, breadcrumbs, and back navigation. These are representative CEPath groupings, not a complete official syllabus. Lessons coming soon; no progress, gating, practice, or accounts. Verify all topics/index targets and unknown slugs, including mobile MSTE and long HGE list. No commit/push.

Completion (2026-10-14): independent finish review returned ship with no material fixes. DESIGN.md and the design sidecar document the actual catalog/overview extension while preserving the approved world and primitive tokens. Lint/types/build and four data tests passed; route, ordering, anchor, asset, 404, keyboard/focus, and bounded desktop/tablet/mobile checks passed. Seventeen captures span five widths and expanded index states, with no overflow or console warnings/errors. Catalog normal-text contrast minimum 5.89:1; measured subject pages 6.27:1. Reduced motion source-inspected only; official design-schema/live panel and screen-reader audit not run. No shipping raster assets, dependencies, client boundary, or future features. M04 complete; no next milestone started. The Product Owner subsequently authorized committing and pushing the verified milestone to main; no deployment.

M05 integration (2026-10-14): retain all existing topic rows, anchors, styles and native index. Add a separate focusable module-overview section before learning areas and a native index link to it. Each subject has one representative module with explicit advisory order and a real module destination. PSAD Statics defines four lessons and one lesson overview; MSTE/HGE modules have no lesson sequence yet. Update availability/hierarchy wording to describe actual overviews, without implying complete lessons. No catalog or homepage redesign.
