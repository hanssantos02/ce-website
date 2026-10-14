---
name: CEPath
description: An engineering faculty bulletin for readable civil engineering study.
colors:
  accent-blue: "#234f88"
  accent-soft: "#e9f0f8"
  focus-color: "#1c5cba"
  surface-paper: "#f6f8fb"
  surface-reading: "#ffffff"
  text-ink: "#182e45"
  text-muted: "#506276"
  rule-color: "#cbd6e2"
typography:
  display: {fontFamily: "var(--font-source-serif), serif", fontSize: "clamp(2.375rem, 4.5vw, 3.75rem)", fontWeight: 500, lineHeight: 1.12}
  headline: {fontFamily: "var(--font-source-serif), serif", fontSize: "2rem", fontWeight: 500, lineHeight: 1.25}
  title: {fontFamily: "var(--font-source-serif), serif", fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.35}
  body: {fontFamily: "var(--font-source-sans), sans-serif", fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.7}
  lead: {fontFamily: "var(--font-source-sans), sans-serif", fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.65}
  label: {fontFamily: "var(--font-source-sans), sans-serif", fontSize: "1rem", fontWeight: 400, lineHeight: 1.7}
  wordmark: {fontFamily: "var(--font-source-serif), serif", fontSize: "1.875rem", fontWeight: 600, lineHeight: 1.2}
spacing:
  space-1: "0.25rem"
  space-2: "0.5rem"
  space-3: "0.75rem"
  space-4: "1rem"
  space-6: "1.5rem"
  space-8: "2rem"
  space-12: "3rem"
  space-16: "4rem"
components:
  wordmark: {textColor: "{colors.accent-blue}", typography: "{typography.wordmark}"}
  navigation-link: {typography: "{typography.label}", padding: "0 0.5rem"}
  text-link: {textColor: "{colors.accent-blue}"}
  primary-link: {backgroundColor: "{colors.accent-blue}", textColor: "{colors.surface-reading}", padding: "0.75rem 1.5rem"}
  primary-link-hover: {backgroundColor: "{colors.text-ink}", textColor: "{colors.surface-reading}"}
  section-index: {typography: "{typography.label}", padding: "1rem 0 0"}
  study-row: {textColor: "{colors.text-ink}", padding: "1.5rem 0"}
  subject-card: {backgroundColor: "{colors.surface-reading}", textColor: "{colors.text-ink}", padding: "2rem"}
  subject-card-hover: {backgroundColor: "{colors.accent-soft}"}
---

# Design System: CEPath

## Overview

**Creative North Star: "Engineering faculty bulletin — white reading surfaces, deep blue ink, academic headings, and a compact section index."**

CEPath uses the clarity of an engineering faculty bulletin: open reading sheets, academic headings, measured rules, and a small structural mark. The character is modern, calm, and precise, with enough space to read beside notes under ordinary study light.

Engineering identity comes from geometry and orderly typography. Flat surfaces and a restrained blue accent keep attention on the text; oversized promotional heroes, generic SaaS styling, glass effects, and distracting animation are outside the selected direction.

**Key Characteristics:**
- White reading surfaces and lightly tinted supporting fields.
- Serif academic hierarchy with clear sans-serif prose and navigation.
- Compact visible navigation, a ruled section index, and ordered study rows.

Recorded from the finished design foundation, landing page, subject catalog, module/lesson navigation, and lesson-reader extension on 2026-10-14. [app/globals.css](app/globals.css) is the implementation source of truth; keep these extracted tokens and the sidecar synchronized with it. Font bindings live in [app/layout.tsx](app/layout.tsx). This system describes the existing public shell, landing, catalog, subject and module overviews, and the published Forces and Vectors reader. Other Statics lessons remain planned; MSTE and HGE module overviews have no lesson bodies.

## Colors

One blue accent family sits against cool neutral paper and deep blue reading ink. Light mode is selected for ordinary study light.

### Primary
- **Faculty Blue** (`accent-blue`): wordmark, links, primary anchor backgrounds, engineering linework, ordered step numbers, current navigation rule, and text selection.
- **Blue Wash** (`accent-soft`): navigation and subject-card hover backgrounds, and the landing page’s closing invitation field.
- **Focus Blue** (`focus-color`): keyboard focus outlines.

### Neutral
- **Cool Paper** (`surface-paper`): page ground, curriculum preview, and values section.
- **Reading White** (`surface-reading`): header, reading sheets, and footer; reversed selection, primary anchor, and skip-link text.
- **Deep Blue Ink** (`text-ink`): main reading text and headings.
- **Slate Text** (`text-muted`): supporting copy and project notes.
- **Measured Rule** (`rule-color`): section boundaries and row dividers.

**The One Accent Rule.** Use the existing blue family for identity and interaction; keep reading surfaces neutral.

## Typography

**Display Font:** Source Serif 4, through the local font variable with a generated Times New Roman fallback and generic serif.
**Body Font:** Source Sans 3, through the local font variable with a generated Arial fallback and generic sans-serif.

Both are self-hosted, unmodified Adobe upright variable fonts (weights 200–900, swap display). Licenses and pinned provenance are in [app/fonts/SOURCES.md](app/fonts/SOURCES.md); the two files total 599,288 bytes. No separate mono family or italic face is installed.

### Hierarchy
- **Display:** bounded page heading; balanced wrapping and an 18ch cap.
- **Headline:** section headings; balanced wrapping and an 18ch cap.
- **Title:** study-row, informational topic, module/lesson-entry, subject-preview, and subject-card headings.
- **Body:** reading prose with a 68ch cap.
- **Lead:** opening explanation with a 54ch cap.
- **Label:** navigation, index, numbering, notes, and footer; index heading uses weight 600.
- **Wordmark:** the compact CEPath name beside the structural mark.

Catalog introductions use a smaller surface heading (2.5rem, weight 500, line-height 1.2, 28ch cap), reducing to 2rem at and below 48rem. Subject, module, and lesson headings stay at 2rem (32px) with a 38ch cap and the same weight and line-height. These are fixed reading-surface variants of the academic hierarchy, not changes to the landing display role. Their introductory prose uses the body size and the 68ch reading cap.

Long-form lesson prose retains the body size (18px) with a reading-specific line-height of 1.8 (32.4px); its section headings use the existing headline role with pretty wrapping, and worked-example/note headings use the title role. Supporting subheadings use body-size sans-serif at weight 600 and line-height 1.5. KaTeX supplies notation fonts and visual/MathML output through the reader's imported stylesheet; mathematical notation uses 1.05em within lesson prose. These notation fonts are not another brand type family.

**The Reading Measure Rule.** Cap sustained prose at 68ch and keep headings distinct through the serif hierarchy.

## Layout

The centered page container uses `min(calc(100% - 3rem), 72rem)`, leaving 1.5rem side gutters. Spacing follows the extracted quarter-rem scale. Desktop sections use 4rem vertical padding and gaps; section introductions occupy one share beside two shares of reading content. The shared layout set remains a page container, header, and footer.

The landing page extends this grammar with a 5:4 hero: offer and actions on the left, geometric structural drawing and compact wrapping index on the right. The availability notice stays with the offer. Subject previews use ruled rows with a 7rem identity column beside equally sized heading and detail columns, with 2rem gaps and vertical padding. Their explicit explore links open the subject overviews. These are page-specific compositions, not a replacement grid for future learning surfaces; the direction contract lives in [.impeccable/surfaces/app-page-tsx.md](.impeccable/surfaces/app-page-tsx.md).

Catalog and subject introductions use a white sheet with 2rem top and 3rem bottom padding. The catalog stacks full-width subject cards with 1.5rem gaps; each card uses a 7rem identity column beside 1.2 shares of description and one share of topics, with 2rem gaps and padding. Subject reading uses a 17rem navigation column beside the main reading content, separated by 4rem. Its future-structure explanation has a neutral top rule with 3rem margin and padding. A separate module section precedes the existing topics, with a neutral bottom rule and 3rem bottom margin and padding. Surface contracts live in [.impeccable/surfaces/app-curriculum-page-tsx.md](.impeccable/surfaces/app-curriculum-page-tsx.md) and [.impeccable/surfaces/app-curriculum-slug-page-tsx.md](.impeccable/surfaces/app-curriculum-slug-page-tsx.md).

Module and lesson metadata overviews use the same introduction and white reading sheet, with the main reading column capped at 68ch. Ordered entries, availability notes, and optional prerequisite bullets stay together; empty-module copy uses neutral rules and 2rem vertical padding. The shared lesson-navigation footer uses a neutral top rule, 4rem top margin and 2rem top padding; its neighbor section has another neutral top rule, 3rem top margin and 2rem top padding. These surfaces add no sidebar or new breakpoint. Their contracts live in [.impeccable/surfaces/app-curriculum-slug-moduleslug-page-tsx.md](.impeccable/surfaces/app-curriculum-slug-moduleslug-page-tsx.md) and [.impeccable/surfaces/app-curriculum-slug-moduleslug-lessonslug-page-tsx.md](.impeccable/surfaces/app-curriculum-slug-moduleslug-lessonslug-page-tsx.md).

The published reader centers that same 68ch column within the existing page container, both in the introduction and the reading sheet. The collapsed native section index precedes objectives, which end with a neutral rule and 3rem bottom padding. Nine real focusable content sections follow, separated by 4rem top margins; objectives and sections retain 1.5rem anchor scroll clearance. There is no new main region, sidebar, or client-state layout. Narrow widths keep the same reading order and local horizontal scrolling for equations and tables rather than page-wide overflow.

At and below 64rem, landing subject rows use a 6rem identity column beside the heading and detail, with details in the second column. Catalog cards use a 5rem identity column with topics in the second column. The subject navigation column narrows to 14rem with a 2rem gap. The closing invitation stacks its copy and action.

At and below 48rem, header and footer stack, navigation stays visible and wraps, shared content columns become one column with 2rem gaps, and major sections use 3rem vertical padding. The landing hero stacks offer/actions before the drawing/index, with a 3rem gap and a 30rem cap on the support column. Subject rows become one column with 1rem gaps, and their symbol and shorthand share a horizontal identity line. The landing index wraps at every width. Navigation and text-link targets retain at least 44px height; main navigation also retains at least 44px width. Primary anchors have a 48px minimum height.

At this same mobile breakpoint, catalog introductions use 1rem top and 2rem bottom padding. Cards stack with 1.5rem gaps and padding, keeping symbol and shorthand on one line. Subject navigation precedes the reading content with a 3rem gap. Breadcrumbs wrap at every width; the native topic index starts collapsed at every width.

Native section, module-section, and topic anchors target focusable sections or list rows (`tabIndex={-1}`), with 1.5rem scroll clearance and blue target headings. A skip link leads to the focusable main region. Smooth anchor scrolling becomes automatic when reduced motion is requested.

## Elevation & Depth

Flat sheets, background tone, and measured rules establish grouping. There are no shadows. Focus uses a clear 3px outline with 4px offset, rather than elevation.

**The Flat Sheet Rule.** Group content with spacing, neutral fields, and rules; preserve the open reading sheet.

## Shapes

Square corners and thin rules keep the geometry precise. There are no radius tokens. Structural emphasis uses a 2px blue rule; ordinary dividers and catalog-card borders are 1px. The wordmark’s inline portal-frame SVG, the landing structural drawing, and the three subject symbols use authored engineering geometry. The unchanged 48px subject symbols are shared through [components/curriculum/subject-symbol.tsx](components/curriculum/subject-symbol.tsx). The landing drawing has a two-line caption that identifies it as illustrative geometry, not a worked design. The lesson figure instead conveys exact force/component geometry and provides a descriptive title, alternative description, and caption. Shipping raster imagery is absent.

## Components

- **Wordmark:** serif name beside a 40×36 structural SVG, with a 0.75rem gap and a home link. Keep its accessible home label and decorative SVG semantics.
- **Navigation:** visible text links with 0.5rem horizontal padding, a transparent bottom rule at rest, and blue text/rule for the current page or hover. Hover adds Blue Wash; keyboard focus retains the global outline. Curriculum opens `/curriculum`; current-page and current-location states use `aria-current` and the same visual treatment.
- **Text link:** blue, underlined, weight 600; underline offset is 0.22em. Hover thickens the underline from 1px to 2px. Footer and index links share this underline behavior.
- **Primary anchor:** square solid Faculty Blue field, Reading White text, weight 600, 1rem label, 0.75rem × 1.5rem padding, and a 48px minimum height. A decorative 20px SVG arrow supports the real destination. Hover uses Deep Blue Ink and an underline; keyboard focus keeps the global blue outline. The hero and closing invitation share this pattern.
- **Section index:** open navigation above a blue rule; a compact heading and native section links use 44px minimum targets. Landing links wrap with 1.5rem horizontal gaps. The availability notice sits with hero copy, separate from the index. Target sections remain keyboard focusable.
- **Breadcrumbs:** compact wrapping ordered navigation, muted current-page text and slash separators, blue underlined destination links, 1rem type, and 44px minimum targets. Links thicken their underline on hover and retain the global focus outline; the current item is plain text with `aria-current="page"`.
- **Topic and lesson index:** native `details`/`summary` navigation, initially collapsed at all widths. A 2px blue top rule and 1px neutral bottom rule frame the compact disclosure; padding is 0.5rem vertically. The blue 600-weight summary uses 0.75rem vertical padding and a 44px minimum height. Expanded links use 0.5rem vertical padding, 44px minimum height, and the shared underline/focus treatment. Retain the browser disclosure marker and native keyboard behavior. The lesson variant adds 3rem bottom margin and 0.5rem vertical list padding; its objectives and nine section links focus real destinations without hiding their reading content.
- **Ordered study rows:** a 2rem number column beside text, 1.5rem gap, tabular blue numbers, serif titles, and muted explanations. Rows use thin dividers; the first and last edges omit outer padding and the last divider. Apply row layout and edge spacing to direct ordered-list children, keeping nested prerequisite bullets outside the number/text grid. These are semantic ordered lists. On the landing page, the copy remains prospective and a blue top rule separates the advisory-sequence note. Subject topic rows reuse this pattern as informational descriptions, with real focusable index destinations and blue targeted headings; their numbering expresses advisory order. Module and lesson lists use the same rows with truthful availability and real overview destinations; completion controls remain absent.

- **Curriculum entry links:** an available module or lesson title is blue and underlined, with its smaller 1rem, 600-weight “Explore module,” “Open overview,” or “Open lesson” action inside the same link, matching the actual availability. Forces and Vectors is labeled “Lesson available”; the other Statics titles remain planned. The link stacks its title and action, aligning them left; the action retains a 44px minimum height. Hover thickens the underline, active uses Deep Blue Ink, and keyboard focus uses the global outline. Planned titles remain plain serif text; muted 1rem availability copy sits below the description with a 0.75rem gap.
- **Prerequisite recommendations:** compact 1rem prose and ordinary disc bullets, with 1.5rem left padding and a 0.5rem gap above the list. Available references are blue underlined links with 44px targets and the shared hover/focus treatment; planned references stay plain text. Forces and Vectors has no suggested prerequisites and displays a plain note.
- **Empty module and lesson neighbors:** open reading copy framed by neutral rules, without cards or controls. Empty modules use the existing title role and muted explanation; neighbors use bold 1rem labels above real links or plain planned/boundary text, with 1.5rem gaps between entries. Shared text links return to the actual parent.

- **Lesson reading patterns:** [components/lesson/lesson-reader.tsx](components/lesson/lesson-reader.tsx) owns the centered header, editorial note, native index, objectives, content article, and shared curriculum footer. [components/lesson/educational-components.tsx](components/lesson/educational-components.tsx) supplies focusable sections, ruled examples, notes, tables, and optional solution disclosures. Trusted local MDX keeps educational content outside the UI. Source/calculation checks and pending independent academic review remain visible separately from publication; no completion control or stored answer accompanies the static exercise.
- **Equations and tables:** server-compiled KaTeX retains visual notation and MathML. Display math scrolls locally within the reading column, with 0.75rem vertical padding and 1.5rem vertical margins. Tables use a focusable region (`tabIndex={0}`), local horizontal overflow, collapsed borders, 1rem text at line-height 1.6, left-aligned cells with 0.75rem padding, neutral row rules, and Blue Wash headers. Keep the global focus outline on the region; do not shrink math or force wide tables into the viewport.
- **Worked examples, notes, and practice solutions:** examples use neutral rules above and below, 2rem vertical padding and 1.5rem top margin. Quiet notes use Cool Paper, the same neutral rules, 1.5rem padding and 2rem vertical margins. Native solution disclosures start collapsed, with neutral top/bottom rules and 2rem top margin; the blue 600-weight summary has 1rem vertical padding, a 44px minimum height, and the global keyboard focus outline. Open solution content ends with 1.5rem bottom padding. Preserve native markers and static reveal behavior, without scoring or saved learner state.
- **Force-components figure:** [components/lesson/force-components-diagram.tsx](components/lesson/force-components-diagram.tsx) uses a 460×310 SVG viewBox, proportional 500 N/30° geometry, and existing ink, muted, and accent colors. The figure has 2rem vertical margins; its SVG is centered, full-width up to 460px, and height auto. Source Sans labels are 26 drawing units (14.53px minimum effective size in the supplied 320px verification), not a new type token. Its caption uses muted 1rem text at line-height 1.7 and 1rem top margin. Keep the title/description and readable label placement with the exact geometry.

- **Subject previews:** ruled list rows, each with a 48px geometric SVG, blue subject shorthand, serif full title, muted description, and a compact bullet list of representative topics. An explicit 1rem explore text link below the title opens its subject overview; the whole row retains its reading treatment. Reflow follows the Layout section.
- **Subject cards:** square white sheets with a neutral 1px border, existing identity geometry, serif title, muted description and representative-topic list. Each whole card is one link; its blue underlined explore action is a noninteractive span with a decorative 20px arrow. Hover uses Blue Wash, a blue border, and a thicker action underline; active uses Cool Paper. Keyboard focus uses the global outline. Keep the title and explore text as the accessible link name and avoid nested controls.
- **Footer:** Reading White sheet with a serif blue brand, a description capped at 36ch, visible wrapping links, and a separated disclaimer capped at the 68ch reading measure. It stacks at the shared mobile breakpoint.

## Do's and Don'ts

### Do:
- **Do** use white reading sheets, the existing blue family, and measured neutral rules.
- **Do** pair Source Serif 4 headings with Source Sans 3 prose and preserve the 68ch reading cap.
- **Do** keep navigation visible on narrow screens, with 44px targets and clear keyboard focus.
- **Do** retain semantic headings, ordered lists, native anchors, the skip link, and reduced-motion support.

### Don't:
- **Don't** introduce generic SaaS card grids, oversized empty heroes, excessive gradients, or glass effects.
- **Don't** add decorative shadows, distracting animation, or a second accent family to this selected world.
- **Don't** present future controls or fabricated progress as part of the existing component system.
