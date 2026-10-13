---
version: 1
slug: "app-curriculum-page-tsx"
primary_target: "app/curriculum/page.tsx"
related_targets: ["app/globals.css","components/curriculum/subject-symbol.tsx","components/curriculum/breadcrumbs.tsx","content/curriculum.ts"]
---

# Milestone 04: Curriculum catalog

Mode: Operate. Audience: Filipino civil engineering students selecting a subject. Code-led extension of the established faculty bulletin. The supplied three-part structure is fixed, not an open visual-world exercise.

## Direction contract

THESIS: A readable academic catalog makes all three subjects equally accessible, without progress, locks, or dashboard chrome.

OWN-WORLD: Preserve white reading sheets, deep blue ink, existing Source fonts, flat rules, and the three geometric subject symbols. Students browse beside their review notes under ordinary study light.

STORY: Read the purpose and availability, scan three subject choices, open any overview, and understand that order is advice.

FIRST VIEWPORT: Compact shared header and breadcrumb, bounded serif title with a short introduction, then the first substantial subject card. Each ruled white card has a distinct symbol/abbreviation, full title/description, selected topics, and a clear explore action. Mobile stacks these within one accessible link.

FORM: Specified new catalog inside the inherited faculty bulletin, candidate 5/seed 1f41974b from M02. No new seed or comp required for the pinned structure. Signature interaction: one meaningful destination per whole card with visible hover and focus; no nested interactive controls. Existing restrained motion remains.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Scope: /curriculum and shared navigation integration. Preview metadata comes from the same typed source as subject pages. Lessons are coming soon; no accounts or progress. Verify three destinations, focus/contrast/reflow, current navigation, types/build, HTTP unknown-slug behavior, and M03 regressions. No commit/push.

Completion (2026-10-14): independent finish review returned ship with no material fixes. DESIGN.md and the design sidecar document the actual catalog/overview extension while preserving the approved world and primitive tokens. Lint/types/build and four data tests passed; route, ordering, anchor, asset, 404, keyboard/focus, and bounded desktop/tablet/mobile checks passed. Seventeen captures span five widths and expanded index states, with no overflow or console warnings/errors. Catalog normal-text contrast minimum 5.89:1; measured subject pages 6.27:1. Reduced motion source-inspected only; official design-schema/live panel and screen-reader audit not run. No shipping raster assets, dependencies, client boundary, or future features. M04 complete; no next milestone started. The Product Owner subsequently authorized committing and pushing the verified milestone to main; no deployment.
