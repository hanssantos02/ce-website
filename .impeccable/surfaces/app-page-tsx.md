---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/layout.tsx","app/globals.css","components/layout/page-container.tsx","components/layout/site-header.tsx","components/layout/site-footer.tsx"]
---

# Design Foundation: public page and shared shell

Mode: Read. Audience: Filipino civil engineering students and CELE reviewees.
Scope: typography/color/spacing foundation, responsive navigation, reading-width container, and footer on the existing homepage. No curriculum, reader, account, dashboard, or marketing expansion.

## Direction contract

THESIS: An engineering faculty bulletin makes CEPath's concept-first approach legible in one open reading sheet. No SaaS card grid or oversized promotional hero.

OWN-WORLD: White reading surfaces, deep blue ink, Source Serif 4 headings, Source Sans 3 text, measured rules, and a small portal-frame brand mark. Neutral surfaces plus one blue accent; a student reading beside notes under ordinary room light needs sustained contrast.

STORY: Recognize CEPath as an independent Filipino civil engineering learning project, read its purpose and four-part study philosophy, then follow the compact index to Approach or About.

FIRST VIEWPORT: Compact shared header; a two-column opening with a large but bounded academic heading on the left and a narrow section index on the right. The learning philosophy begins within the first viewport; blue emphasis identifies the actual approach link. On mobile the navigation stays visible and columns stack.

FORM: Engineering faculty bulletin, grounded candidate 5, seed 1f41974b; explicitly selected by the Product Owner on 2026-10-14. Direct code implementation selected with the direction. Signature interaction: section-index links move to readable, focusable section headings; active/focus treatment uses a clear blue rule, with reduced-motion support. No unused controls or implied available lessons.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Verification: lint/types/build; desktop and mobile screenshots; real navigation and skip-link keyboard checks; contrast and reflow; bounded Impeccable finish review. The inherited roadmap M2 module-navigation scope stays deferred; this task is the user-requested Milestone 02 Design Foundation.

Completion (2026-10-14): finish review returned ship; DESIGN.md and the schemaVersion 2 sidecar document the verified implementation. Lint, types, production build, desktop/mobile reflow, local fonts, native-anchor focus, and contrast checks passed. No shipping raster assets; review captures are local verification evidence. Reduced-motion behavior was inspected in CSS; live design-panel/schema-linter verification was not run. Milestone 02 is complete; future milestones remain unstarted.
