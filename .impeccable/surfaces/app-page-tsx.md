---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/globals.css","components/layout/site-header.tsx","components/layout/site-footer.tsx","components/landing/engineering-visual.tsx","content/landing.ts","content/curriculum.ts","components/curriculum/subject-symbol.tsx"]
---

# Milestone 03: CEPath landing page

Mode: Persuade. Audience: Filipino civil engineering students preparing for the CELE. Extend the approved faculty bulletin world on the existing homepage. The supplied seven-section brief settles the page structure; no new identity or concept tournament. Code-led extension, preserving the established direct-code direction.

## Direction contract

THESIS: Make concept-first, guided-but-flexible study tangible through a composed engineering bulletin, with real subject previews and a clear invitation to explore them.

OWN-WORLD: Inherit white sheets, deep blue ink, Source Serif headings, Source Sans prose, flat rules, the structural wordmark, and compact visible navigation. Students read beside notes in ordinary study light.

STORY: Understand the planned offer, explore three examination groups, read how the future learning journey works, and return to the curriculum preview. No available lessons, accounts, or tracking implied.

FIRST VIEWPORT: Academic headline and two working CTAs on the left; a crisp geometric structural diagram and compact section index on the right. The curriculum begins below. Mobile keeps the offer and actions first, then stacks the drawing and index.

FORM: An extension of engineering faculty bulletin, inherited candidate 5 and seed 1f41974b from M02. The brief pins the section order. Signature interaction: native anchors transfer focus to real curriculum/how-it-works sections; existing blue focus and reduced-motion rules govern movement. No raster comp or new seed required for this specified extension.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Proof: descriptive static curriculum previews grounded in PRC's September 2026 program; no weights or comprehensive scope promises. Clearly distinguish MSTE student shorthand. No shipping raster imagery. Preserve legacy #approach and #about anchors. Verify lint/types/build, routes, focus, text contrast, responsive reflow, and desktop/mobile captures together. No commit/push or future feature implementation.

Completion (2026-10-14): independent finish review returned ship; no material fixes. DESIGN.md and .impeccable/design.json preserve primitive tokens/North Star and document the actual landing patterns. Lint/types/build, both local servers, asset/route/metadata HTTP assertions, all navigation/focus paths, and five responsive viewport checks passed. Detector findings: none. Normal text contrast minimum 5.46:1. Reduced motion was source-inspected; official design-panel/schema-linter and screen-reader checks were not run. No shipping raster assets or new dependencies/routes/client boundary; M03 complete, future milestones unstarted. The Product Owner subsequently authorized committing and pushing the verified milestone to main; no deployment.

M04 integration (2026-10-14): preserve the M03 composition. Primary curriculum CTAs and shared navigation now lead to /curriculum; existing preview rows have explicit subject-overview links. Shared subject metadata, source and preview labels live in content/curriculum.ts, and existing SVG symbols moved to components/curriculum/subject-symbol.tsx. The local #curriculum index still targets the real preview section. Subject overviews are available; lessons, practice, accounts and progress remain future work. Homepage regression checks passed at desktop/mobile, with keyboard navigation and no overflow.
