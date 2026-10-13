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
  section-index: {typography: "{typography.label}", padding: "1rem 0 0"}
  study-row: {textColor: "{colors.text-ink}", padding: "1.5rem 0"}
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

Recorded from the finished foundation on 2026-10-14. [app/globals.css](app/globals.css) is the implementation source of truth; keep these extracted tokens and the sidecar synchronized with it. Font bindings live in [app/layout.tsx](app/layout.tsx). This system describes the existing public shell; future reader and curriculum components require their own approved scope.

## Colors

One blue accent family sits against cool neutral paper and deep blue reading ink. Light mode is selected for ordinary study light.

### Primary
- **Faculty Blue** (`accent-blue`): wordmark, links, ordered step numbers, current navigation rule, and text selection.
- **Blue Wash** (`accent-soft`): navigation hover background.
- **Focus Blue** (`focus-color`): keyboard focus outlines.

### Neutral
- **Cool Paper** (`surface-paper`): page ground, supporting sections, and footer.
- **Reading White** (`surface-reading`): header and reading sheets; reversed selection and skip-link text.
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
- **Title:** study-row headings.
- **Body:** reading prose with a 68ch cap.
- **Lead:** opening explanation with a 54ch cap.
- **Label:** navigation, index, numbering, notes, and footer; index heading uses weight 600.
- **Wordmark:** the compact CEPath name beside the structural mark.

**The Reading Measure Rule.** Cap sustained prose at 68ch and keep headings distinct through the serif hierarchy.

## Layout

The centered page container uses `min(calc(100% - 3rem), 72rem)`, leaving 1.5rem side gutters. Spacing follows the extracted quarter-rem scale. Desktop sections use 4rem vertical padding and gaps; section introductions occupy one share beside two shares of reading content. The opening index is a compact 15rem column.

At and below 48rem, header and footer stack, navigation stays visible and wraps, content columns become one column with 2rem gaps, and major sections use 3rem vertical padding. The section index becomes a wrapping row. Navigation and primary text-link targets retain at least 44px height; main navigation also retains at least 44px width.

Native section anchors target focusable sections (`tabIndex={-1}`), with 1.5rem scroll clearance and blue target headings. A skip link leads to the focusable main region. Smooth anchor scrolling becomes automatic when reduced motion is requested.

## Elevation & Depth

Flat sheets, background tone, and measured rules establish grouping. There are no shadows. Focus uses a clear 3px outline with 4px offset, rather than elevation.

**The Flat Sheet Rule.** Group content with spacing, neutral fields, and rules; preserve the open reading sheet.

## Shapes

Square corners and thin rules keep the geometry precise. There are no radius tokens. Structural emphasis uses a 2px blue rule; ordinary dividers are 1px. The wordmark's inline portal-frame SVG is the engineering motif; shipping raster imagery is absent.

## Components

- **Wordmark:** serif name beside a 40×36 structural SVG, with a 0.75rem gap and a home link. Keep its accessible home label and decorative SVG semantics.
- **Navigation:** visible text links with 0.5rem horizontal padding, a transparent bottom rule at rest, and blue text/rule for the current page or hover. Hover adds Blue Wash; keyboard focus retains the global outline. Current-page state uses `aria-current`.
- **Text link:** blue, underlined, weight 600; underline offset is 0.22em. Hover thickens the underline from 1px to 2px. Footer and index links share this underline behavior.
- **Section index:** open navigation above a blue rule; a compact heading and native section links use 44px minimum targets. Development notes sit below a neutral divider. Target sections remain keyboard focusable.
- **Ordered study rows:** a 2rem number column beside text, 1.5rem gap, tabular blue numbers, serif titles, and muted explanations. Rows use thin dividers; the first and last edges omit outer padding and the last divider. These are semantic ordered lists, not interactive cards.

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
