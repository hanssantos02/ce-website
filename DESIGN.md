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
  auth-input: {backgroundColor: "{colors.surface-reading}", textColor: "{colors.text-ink}", typography: "{typography.body}", padding: "0.75rem 1rem"}
  auth-submit: {backgroundColor: "{colors.accent-blue}", textColor: "{colors.surface-reading}", padding: "0.75rem 1.5rem"}
  auth-submit-hover: {backgroundColor: "{colors.text-ink}", textColor: "{colors.surface-reading}"}
  auth-submit-disabled: {backgroundColor: "{colors.text-muted}", textColor: "{colors.surface-reading}"}
  password-toggle: {textColor: "{colors.accent-blue}"}
  auth-feedback: {backgroundColor: "{colors.surface-paper}", textColor: "{colors.text-ink}", padding: "1rem"}
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

Recorded from the finished design foundation, landing page, subject catalog, module/lesson navigation, lesson reader, focused account forms, explicit progress-control extension, and student dashboard extension through 2026-10-17. [app/globals.css](app/globals.css) is the implementation source of truth; keep these extracted tokens and the sidecar synchronized with it. Font bindings live in [app/layout.tsx](app/layout.tsx). This system describes the existing public shell, landing, catalog, subject and module overviews, published Forces and Vectors reader, implemented account surfaces, optional lesson-progress controls, and the implemented private dashboard. Other Statics lessons remain planned; MSTE and HGE module overviews have no lesson bodies.

The account extension retains this world and its primitives. Its recorded finish review covers 19 guest, validation, unavailable-link/session, sign-out-uncertainty and missing-configuration captures. Positive live email and authenticated views remain unverified; their patterns below are source-derived, and M07 remains In Progress. This documentation records implementation rather than declaring manual account acceptance complete.

The M08 extension records a compact progress region before the reader index/objectives and separate status labels in module rows. Actual production captures cover the anonymous lesson reminder and public module; private control states and keyboard/pending/recovery behavior were exercised with explicitly synthetic data in an isolated fixture. Authenticated production placement and private module data remain source-reviewed only. That local review preceded hosted acceptance. On 2026-10-17, the owner reported applying the M08 migration and passing saving, refresh and sign-out/sign-in persistence checks. Hosted two-user isolation and agent-run positive hosted dashboard acceptance remain unverified. The source and these evidence limits describe the pattern without declaring persistent-progress acceptance complete.

The M09 dashboard extends the same reading sheet with summary first, followed by separate study actions, compact subject rows and bounded recorded-lesson lists. Its code-led contract is [.impeccable/surfaces/app-dashboard-page-tsx.md](.impeccable/surfaces/app-dashboard-page-tsx.md). The M09 presentation evidence comprises 13 measured state/viewport combinations, keyboard focus checks and an empty detector result; the private dashboard captures are explicitly synthetic fixtures. Actual production captures cover the anonymous dashboard-to-login redirect and the public lesson only. These checks do not establish authenticated hosted dashboard behavior or persistence. Hosted dashboard and two-user acceptance remain unverified; M09 remains In Progress. The final independent visual review inspected all 18 current captures and returned ship at presentation scope, with no material visual fixes. Two invalid initial screenshot exports were replaced before that full review. This does not extend the verdict to hosted behavior.

## Colors

One blue accent family sits against cool neutral paper and deep blue reading ink. Light mode is selected for ordinary study light.

### Primary
- **Faculty Blue** (`accent-blue`): wordmark, links, primary anchor and account-submit backgrounds, engineering linework, ordered step numbers, current navigation rule, invalid-field emphasis, progress-status geometry and actions, and text selection.
- **Blue Wash** (`accent-soft`): navigation and subject-card hover backgrounds, and the landing page’s closing invitation field.
- **Focus Blue** (`focus-color`): keyboard focus outlines.

### Neutral
- **Cool Paper** (`surface-paper`): page ground, curriculum preview, values section, and account-feedback fields.
- **Reading White** (`surface-reading`): header, reading sheets, account inputs, and footer; reversed selection, primary action, and skip-link text.
- **Deep Blue Ink** (`text-ink`): main reading text and headings.
- **Slate Text** (`text-muted`): supporting copy, project notes, account-input borders, disabled account actions, and pending progress controls.
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
- **Label:** navigation, index, numbering, notes, account and progress help/actions/feedback, and footer; index headings, account actions/errors, and progress actions/status labels use weight 600.
- **Wordmark:** the compact CEPath name beside the structural mark.

Catalog introductions use a smaller surface heading (2.5rem, weight 500, line-height 1.2, 28ch cap), reducing to 2rem at and below 48rem. Subject, module, and lesson headings stay at 2rem (32px) with a 38ch cap and the same weight and line-height. These are fixed reading-surface variants of the academic hierarchy, not changes to the landing display role. Their introductory prose uses the body size and the 68ch reading cap.

Account task headings use that same 2rem, 500-weight serif scale and 1.25 line-height, with pretty wrapping inside a 32rem column. Descriptions and inputs inherit the body role; field labels use body-size sans-serif at weight 600. Password help, visibility controls, submit buttons, field errors and public-reading reminders use the 1rem label size. These are component applications of the existing roles, not additional type tokens.

The progress region reuses the title role for its subordinate heading (1.5rem, weight 500, line-height 1.35). Status labels and native actions use the 1rem label size at weight 600; explanatory and feedback copy use that size at normal weight. Progress adds no type role.

The dashboard uses the headline role for its main heading and the title role for section headings. Lesson and subject subheadings use a local serif application (1.25rem, weight 500, line-height 1.4); this is not an eighth typography token. Definition-list counts use 1.5rem sans-serif at weight 600 with tabular numerals. Metric labels, context, published-content denominator notes and links reuse the 1rem label size; links use weight 600.

Long-form lesson prose retains the body size (18px) with a reading-specific line-height of 1.8 (32.4px); its section headings use the existing headline role with pretty wrapping, and worked-example/note headings use the title role. Supporting subheadings use body-size sans-serif at weight 600 and line-height 1.5. KaTeX supplies notation fonts and visual/MathML output through the reader's imported stylesheet; mathematical notation uses 1.05em within lesson prose. These notation fonts are not another brand type family.

**The Reading Measure Rule.** Cap sustained prose at 68ch and keep headings distinct through the serif hierarchy.

## Layout

The centered page container uses `min(calc(100% - 3rem), 72rem)`, leaving 1.5rem side gutters. Spacing follows the extracted quarter-rem scale. Desktop sections use 4rem vertical padding and gaps; section introductions occupy one share beside two shares of reading content. The shared layout set remains a page container, header, and footer.

The landing page extends this grammar with a 5:4 hero: offer and actions on the left, geometric structural drawing and compact wrapping index on the right. The availability notice stays with the offer. Subject previews use ruled rows with a 7rem identity column beside equally sized heading and detail columns, with 2rem gaps and vertical padding. Their explicit explore links open the subject overviews. These are page-specific compositions, not a replacement grid for future learning surfaces; the direction contract lives in [.impeccable/surfaces/app-page-tsx.md](.impeccable/surfaces/app-page-tsx.md).

Catalog and subject introductions use a white sheet with 2rem top and 3rem bottom padding. The catalog stacks full-width subject cards with 1.5rem gaps; each card uses a 7rem identity column beside 1.2 shares of description and one share of topics, with 2rem gaps and padding. Subject reading uses a 17rem navigation column beside the main reading content, separated by 4rem. Its future-structure explanation has a neutral top rule with 3rem margin and padding. A separate module section precedes the existing topics, with a neutral bottom rule and 3rem bottom margin and padding. Surface contracts live in [.impeccable/surfaces/app-curriculum-page-tsx.md](.impeccable/surfaces/app-curriculum-page-tsx.md) and [.impeccable/surfaces/app-curriculum-slug-page-tsx.md](.impeccable/surfaces/app-curriculum-slug-page-tsx.md).

Module and lesson metadata overviews use the same introduction and white reading sheet, with the main reading column capped at 68ch. Ordered entries, availability notes, and optional prerequisite bullets stay together; empty-module copy uses neutral rules and 2rem vertical padding. The shared lesson-navigation footer uses a neutral top rule, 4rem top margin and 2rem top padding; its neighbor section has another neutral top rule, 3rem top margin and 2rem top padding. These surfaces add no sidebar or new breakpoint. Their contracts live in [.impeccable/surfaces/app-curriculum-slug-moduleslug-page-tsx.md](.impeccable/surfaces/app-curriculum-slug-moduleslug-page-tsx.md) and [.impeccable/surfaces/app-curriculum-slug-moduleslug-lessonslug-page-tsx.md](.impeccable/surfaces/app-curriculum-slug-moduleslug-lessonslug-page-tsx.md).

The published reader centers that same 68ch column within the existing page container, both in the introduction and the reading sheet. The collapsed native section index precedes objectives, which end with a neutral rule and 3rem bottom padding. Nine real focusable content sections follow, separated by 4rem top margins; objectives and sections retain 1.5rem anchor scroll clearance. There is no new main region, sidebar, or client-state layout. Narrow widths keep the same reading order and local horizontal scrolling for equations and tables rather than page-wide overflow.

Optional interactive practice follows the MDX article and precedes the curriculum footer within the same 68ch reader column. A neutral top rule, 3rem top margin and 2rem top padding introduce it; each question uses 2rem vertical margins. Navigation wraps with 1.5rem gaps above a neutral rule. At and below 30rem, navigation and buttons stack and stretch, and answer-row padding reduces from 1rem to 0.75rem. This local extension adds no layout primitive or breakpoint.

Optional lesson progress precedes that collapsed index inside the same reading column. A compact region uses neutral top/bottom rules, 1.5rem vertical padding and 2rem bottom margin. Its status follows the title by 0.75rem; actions and feedback use 1rem top gaps. Native actions wrap with 0.75rem gaps, then stack and stretch at and below 30rem. Anonymous reminder and session-expired sign-in links retain 44px minimum height. This local action breakpoint does not change the reader layout or reading access.

Account tasks center a full-width column capped at 32rem within the same page container and ruled content section. The inherited 4rem vertical padding reduces to 3rem at the existing mobile breakpoint. A short description follows the task heading with a 1rem gap; forms start after 2rem, fields after 1.5rem, and full-width primary actions after 2rem. Account help follows after 1.5rem; a neutral rule separates the public-reading reminder with 2rem top margin and 1.5rem top padding. Password help and its text button wrap naturally with 0.5rem × 1rem gaps, without another breakpoint. The focused form has no sidebar, index, nested card or illustration; its contract lives in [.impeccable/surfaces/app-signup-page-tsx.md](.impeccable/surfaces/app-signup-page-tsx.md).

The dashboard fills the existing page container on Reading White, with 3rem top and 4rem bottom padding. A compact heading and curriculum link share its header with a 2rem gap and 2rem bottom padding. Neutral top rules and 2rem vertical padding separate sections. Three equal definition-list columns use 2rem gaps; each label/count pair aligns on the baseline with a 1rem gap. Continue Learning and Recommended Next occupy equal columns separated by 3rem. Subject rows use 1.2:1 columns, 3rem gaps and 1.5rem vertical padding; the existing symbol and subject name sit 1rem apart. Recorded lessons reuse the two-column arrangement and neutral row dividers, with up to five links per state. This is a dashboard composition, not a new global layout primitive.

At and below 48rem, the dashboard uses 2rem top and 3rem bottom padding. Its header becomes a block; summary metrics stack into label/value rows with 0.75rem gaps and opposite alignment. Study actions and subject rows become one column with 1rem gaps; study sections use 1.5rem vertical padding. Subject progress keeps a 60px left inset aligned with the subject text beside its 44px symbol. The main navigation now wraps at and below 64rem to accommodate the authenticated Dashboard link; the existing shared shell and 48rem stacking remain intact.

At and below 64rem, landing subject rows use a 6rem identity column beside the heading and detail, with details in the second column. Catalog cards use a 5rem identity column with topics in the second column. The subject navigation column narrows to 14rem with a 2rem gap. The closing invitation stacks its copy and action.

At and below 48rem, header and footer stack, navigation stays visible and wraps, shared content columns become one column with 2rem gaps, and major sections use 3rem vertical padding. The landing hero stacks offer/actions before the drawing/index, with a 3rem gap and a 30rem cap on the support column. Subject rows become one column with 1rem gaps, and their symbol and shorthand share a horizontal identity line. The landing index wraps at every width. Navigation and text-link targets retain at least 44px height; main navigation also retains at least 44px width. Primary anchors have a 48px minimum height.

At this same mobile breakpoint, catalog introductions use 1rem top and 2rem bottom padding. Cards stack with 1.5rem gaps and padding, keeping symbol and shorthand on one line. Subject navigation precedes the reading content with a 3rem gap. Breadcrumbs wrap at every width; the native topic index starts collapsed at every width.

Native section, module-section, and topic anchors target focusable sections or list rows (`tabIndex={-1}`), with 1.5rem scroll clearance and blue target headings. A skip link leads to the focusable main region. Smooth anchor scrolling becomes automatic when reduced motion is requested.

## Elevation & Depth

Flat sheets, background tone, and measured rules establish grouping. There are no shadows. Focus uses a clear 3px outline with 4px offset, rather than elevation.

**The Flat Sheet Rule.** Group content with spacing, neutral fields, and rules; preserve the open reading sheet.

## Shapes

Square corners and thin rules keep the geometry precise. There are no radius tokens. Structural emphasis uses a 2px blue rule; ordinary dividers and catalog-card borders are 1px. The wordmark’s inline portal-frame SVG, the landing structural drawing, and the three subject symbols use authored engineering geometry. The existing subject SVG geometry uses 48px on public curriculum surfaces and a 44px dashboard application, shared through [components/curriculum/subject-symbol.tsx](components/curriculum/subject-symbol.tsx). The landing drawing has a two-line caption that identifies it as illustrative geometry, not a worked design. The lesson figure instead conveys exact force/component geometry and provides a descriptive title, alternative description, and caption. Shipping raster imagery is absent.

## Components

- **Wordmark:** serif name beside a 40×36 structural SVG, with a 0.75rem gap and a home link. Keep its accessible home label and decorative SVG semantics.
- **Navigation:** visible text links with 0.5rem horizontal padding, a transparent bottom rule at rest, and blue text/rule for the current page or hover. Hover adds Blue Wash; keyboard focus retains the global outline. Curriculum opens `/curriculum`; current-page and current-location states use `aria-current` and the same visual treatment. Guest navigation adds Log in and Sign up; verified session navigation uses Dashboard, My account and a compact Sign out button without exposing email. All items remain visible; main navigation can wrap at and below 64rem. The authenticated variant is source-derived pending live acceptance.
- **Text link:** blue, underlined, weight 600; underline offset is 0.22em. Hover thickens the underline from 1px to 2px. Footer and index links share this underline behavior.
- **Primary anchor:** square solid Faculty Blue field, Reading White text, weight 600, 1rem label, 0.75rem × 1.5rem padding, and a 48px minimum height. A decorative 20px SVG arrow supports the real destination. Hover uses Deep Blue Ink and an underline; keyboard focus keeps the global blue outline. The hero and closing invitation share this pattern.
- **Section index:** open navigation above a blue rule; a compact heading and native section links use 44px minimum targets. Landing links wrap with 1.5rem horizontal gaps. The availability notice sits with hero copy, separate from the index. Target sections remain keyboard focusable.
- **Breadcrumbs:** compact wrapping ordered navigation, muted current-page text and slash separators, blue underlined destination links, 1rem type, and 44px minimum targets. Links thicken their underline on hover and retain the global focus outline; the current item is plain text with `aria-current="page"`.
- **Topic and lesson index:** native `details`/`summary` navigation, initially collapsed at all widths. A 2px blue top rule and 1px neutral bottom rule frame the compact disclosure; padding is 0.5rem vertically. The blue 600-weight summary uses 0.75rem vertical padding and a 44px minimum height. Expanded links use 0.5rem vertical padding, 44px minimum height, and the shared underline/focus treatment. Retain the browser disclosure marker and native keyboard behavior. The lesson variant adds 3rem bottom margin and 0.5rem vertical list padding; its objectives and nine section links focus real destinations without hiding their reading content.
- **Ordered study rows:** a 2rem number column beside text, 1.5rem gap, tabular blue numbers, serif titles, and muted explanations. Rows use thin dividers; the first and last edges omit outer padding and the last divider. Apply row layout and edge spacing to direct ordered-list children, keeping nested prerequisite bullets outside the number/text grid. These are semantic ordered lists. On the landing page, the copy remains prospective and a blue top rule separates the advisory-sequence note. Subject topic rows reuse this pattern as informational descriptions, with real focusable index destinations and blue targeted headings; their numbering expresses advisory order. Module and lesson lists use the same rows with truthful availability and real overview destinations; module rows contain no mutation controls. Authenticated published-lesson rows can show a separate personal status; anonymous rows show only curriculum availability.

- **Curriculum entry links:** an available module or lesson title is blue and underlined, with its smaller 1rem, 600-weight “Explore module,” “Open overview,” or “Open lesson” action inside the same link, matching the actual availability. Forces and Vectors is labeled “Lesson available”; the other Statics titles remain planned. The link stacks its title and action, aligning them left; the action retains a 44px minimum height. Hover thickens the underline, active uses Deep Blue Ink, and keyboard focus uses the global outline. Planned titles remain plain serif text; muted 1rem availability copy sits below the description with a 0.75rem gap.
- **Prerequisite recommendations:** compact 1rem prose and ordinary disc bullets, with 1.5rem left padding and a 0.5rem gap above the list. Available references are blue underlined links with 44px targets and the shared hover/focus treatment; planned references stay plain text. Forces and Vectors has no suggested prerequisites and displays a plain note.
- **Empty module and lesson neighbors:** open reading copy framed by neutral rules, without cards or controls. Empty modules use the existing title role and muted explanation; neighbors use bold 1rem labels above real links or plain planned/boundary text, with 1.5rem gaps between entries. Shared text links return to the actual parent.

- **Lesson reading patterns:** [components/lesson/lesson-reader.tsx](components/lesson/lesson-reader.tsx) owns the centered header, editorial note, native index, objectives, content article, and shared curriculum footer. [components/lesson/educational-components.tsx](components/lesson/educational-components.tsx) supplies focusable sections, ruled examples, notes, tables, and optional solution disclosures. Trusted local MDX keeps educational content outside the UI. Source/calculation checks and pending independent academic review remain visible separately from publication; no exercise scoring or stored answer accompanies the static exercise; optional lesson-progress controls are separate and change only on explicit student action.
- **Equations and tables:** server-compiled KaTeX retains visual notation and MathML. Display math scrolls locally within the reading column, with 0.75rem vertical padding and 1.5rem vertical margins. Tables use a focusable region (`tabIndex={0}`), local horizontal overflow, collapsed borders, 1rem text at line-height 1.6, left-aligned cells with 0.75rem padding, neutral row rules, and Blue Wash headers. Keep the global focus outline on the region; do not shrink math or force wide tables into the viewport.
- **Worked examples, notes, and practice solutions:** examples use neutral rules above and below, 2rem vertical padding and 1.5rem top margin. Quiet notes use Cool Paper, the same neutral rules, 1.5rem padding and 2rem vertical margins. Native solution disclosures start collapsed, with neutral top/bottom rules and 2rem top margin; the blue 600-weight summary has 1rem vertical padding, a 44px minimum height, and the global keyboard focus outline. Open solution content ends with 1.5rem bottom padding. Preserve native markers and static reveal behavior, without scoring or saved learner state.
- **Optional practice question:** [components/practice/practice-section.tsx](components/practice/practice-section.tsx) and [components/practice/practice-engine.tsx](components/practice/practice-engine.tsx) reuse the headline/title serif roles and 1rem supporting labels. A native fieldset/legend groups radio labels with square 1px neutral borders, 1rem padding, 0.75rem gaps and at least 44px targets; native radios are 20px and retain browser keyboard behavior. Selection and correct answers use Faculty Blue borders and Blue Wash; incorrect submitted choices use a dashed Deep Blue Ink border on Cool Paper. Explicit Selected, Correct answer and Your answer — incorrect labels carry the meaning; submitted states add the existing 20px circle/check or circle/cross SVG geometry. Focus on a radio outlines its whole row with Focus Blue (3px, 3px offset). No new success/error palette or type token is introduced.
- **Practice actions and solution:** square native buttons and the labeled question selector use 44px minimum height, 0.5rem × 1rem padding, Faculty Blue borders/text and the 1rem label role. Submit uses Faculty Blue fill and Reading White text; disabled actions use Slate Text on Cool Paper. Hover uses Blue Wash/Deep Blue Ink, active uses Cool Paper/Deep Blue Ink, and keyboard focus retains the shared outline. Inline Cool Paper feedback has neutral top/bottom rules, 1rem padding, text plus SVG, status semantics and programmatic focus. The revealed solution uses the title role, given/required definitions, ordered reasoning, keyboard-focusable locally scrolling server-rendered KaTeX and a ruled final answer. Submit focuses feedback; Previous/Next and Retry focus the question heading, while the native selector retains focus for successive arrow keys. One question appears at a time; free navigation preserves temporary per-question state until refresh, and retry resets only the current question. Practice remains separate from saved progress. The sidecar specimen is an illustrative static selected state using the actual first question of five, with no live grading or score.

- **Force-components figure:** [components/lesson/force-components-diagram.tsx](components/lesson/force-components-diagram.tsx) uses a 460×310 SVG viewBox, proportional 500 N/30° geometry, and existing ink, muted, and accent colors. The figure has 2rem vertical margins; its SVG is centered, full-width up to 460px, and height auto. Source Sans labels are 26 drawing units (14.53px minimum effective size in the supplied 320px verification), not a new type token. Its caption uses muted 1rem text at line-height 1.7 and 1rem top margin. Keep the title/description and readable label placement with the exact geometry.

- **Subject previews:** ruled list rows, each with a 48px geometric SVG, blue subject shorthand, serif full title, muted description, and a compact bullet list of representative topics. An explicit 1rem explore text link below the title opens its subject overview; the whole row retains its reading treatment. Reflow follows the Layout section.
- **Subject cards:** square white sheets with a neutral 1px border, existing identity geometry, serif title, muted description and representative-topic list. Each whole card is one link; its blue underlined explore action is a noninteractive span with a decorative 20px arrow. Hover uses Blue Wash, a blue border, and a thicker action underline; active uses Cool Paper. Keyboard focus uses the global outline. Keep the title and explore text as the accessible link name and avoid nested controls.
- **Account shell:** [components/auth/auth-shell.tsx](components/auth/auth-shell.tsx) groups one serif task heading, a muted explanation, the current form or feedback, and the ruled optional-reading reminder. Account help is a vertical group of underlined blue links with 44px targets, 0.5rem gaps and 1.5rem top margin. The source-defined private account variant uses a definition list with 1.5rem gaps, 1rem bold labels, and wrap-safe values; it stays inside the same focused column.
- **Account fields:** square Reading White inputs have a 1px Slate Text border, Deep Blue Ink text, body typography, 0.75rem × 1rem padding and a 48px minimum height. Visible 600-weight labels sit 0.5rem above each field. The global blue focus outline remains visible; invalid fields use a 2px Faculty Blue border plus explicit 1rem bold error copy after a 0.5rem gap. Native email/password types and autocomplete hints remain intact; labels and help/error references use `htmlFor`, `aria-invalid` and `aria-describedby`.
- **Account submit and password visibility:** [components/auth/submit-button.tsx](components/auth/submit-button.tsx) is a square native button with Faculty Blue fill/border, Reading White text, 1rem 600-weight type, 0.75rem × 1.5rem padding and a 48px minimum height. Form submits occupy the full column width; hover uses Deep Blue Ink, active returns to Faculty Blue, and disabled/pending states use Slate Text with a not-allowed cursor and truthful pending text. The compact sign-out variant keeps 44px height and 0.5rem × 0.75rem padding. The password visibility control is a 44px square eye button inside the trailing edge of the password input. A crossed eye appears when the password is visible; Show/Hide password accessible labels and tooltips, `aria-pressed` and `aria-controls` describe the action and controlled fields. The 20px SVG uses the existing blue accent and a 2px stroke. It changes input visibility without submitting, retains the global focus outline, and reserves input padding so text cannot overlap the icon.
- **Account feedback:** [components/auth/auth-form.tsx](components/auth/auth-form.tsx) uses Cool Paper, neutral top/bottom rules, 1rem padding, 1.5rem vertical margins and wrap-safe text. Error messages use alert semantics; request-pending/success messages use status semantics, and returned form feedback receives programmatic focus. Field errors remain beside their fields. Completed request feedback replaces the entry controls in source; unavailable configuration disables submission and keeps public reading reachable. No new success/error color family or floating toast is introduced. Email-pending, successful verification and authenticated states still need live acceptance.
- **Lesson progress:** [components/progress/lesson-progress.tsx](components/progress/lesson-progress.tsx) places a small ruled region before the reader index/objectives. Anonymous visitors see a short blue underlined sign-in reminder with a safe return to this exact published lesson and plain free-reading copy; its inline-flex link has a 44px minimum height and the global focus outline. Verified progress uses a subordinate serif title and text-plus-SVG status: an empty circle for Not Started, clock hands for In Progress, and a check for Completed. The decorative SVG is 20px with a 1.75-unit stroke; visible text always carries the meaning. Module rows reuse this status below, separately from availability, without changing lesson links or recommended order. Unavailable module reads show a quiet status message instead of fabricated personal labels. Private module data and authenticated reader placement remain source-derived pending hosted acceptance.
- **Progress actions:** [components/progress/progress-controls.tsx](components/progress/progress-controls.tsx) uses a native form and labeled fieldset with square, 44px-minimum buttons, 0.5rem × 1rem padding, blue borders, and 1rem 600-weight labels. Not Started offers Start Learning as the filled primary action and direct Mark as Complete; In Progress offers primary Mark as Complete and Reset progress; Completed offers Mark In Progress and Reset progress. Secondary actions stay on the reading field. Hover uses Blue Wash with Deep Blue Ink; active uses Cool Paper with Deep Blue Ink; keyboard focus retains the global outline. At and below 30rem, actions stack at full available width. Reading and revisiting do not change status; no dashboard or aggregate-progress treatment is implied.
- **Progress feedback:** pending submission retains the last confirmed status, announces Saving progress and disables the action fieldset with Slate Text borders/text on Cool Paper and a wait cursor. Confirmed feedback uses status semantics; failed save names Last confirmed when known, retains retry actions and adds Reload progress. Returned feedback receives programmatic focus; error/session-expired feedback uses alert semantics. An unavailable initial read omits the status and offers only Reload progress. An expired session removes mutation controls and offers a 44px sign-in link. All feedback stays inline, wrap-safe and in the existing palette, with a quiet explanation below; public content remains available. These private states were checked with synthetic UI data, not successful hosted writes. The sidecar preview is a static source-derived demonstration and has no persistence behavior.

- **Student dashboard:** [components/dashboard/student-dashboard.tsx](components/dashboard/student-dashboard.tsx) retains the native reading-sheet composition. The summary is a semantic definition list of Completed lessons, In-progress lessons and Currently available lessons, with an adjacent published-content scope note. A quiet Cool Paper message welcomes students without records or acknowledges completion of all currently available lessons; neither claims syllabus mastery. Continue Learning and Recommended Next remain separately titled, with context, serif lesson titles and genuine 44px-minimum destination links. The first identifies the latest saved In Progress update and states that visits are not tracked; the second explains advisory order and any overlap. These are independent choices, with optional existing prerequisite recommendations.
- **Dashboard subject progress:** compact ruled list rows reuse the three authored subject SVGs at 44px and existing curriculum destinations. Native `progress` uses the actual completed count and available published-lesson maximum, labeled by visible count/denominator text; a separate line explicitly qualifies the percentage as currently published content. The blue bar has a neutral track, 0.5rem height and 26rem maximum width. Zero-lesson subjects show Lessons coming soon, with no percentage or empty progress bar. Subject and shortcut links use 1rem 600-weight blue underlined text, 44px minimum height, Blue Wash/Deep Blue Ink hover, Cool Paper active state and the global focus outline. No animation is introduced.
- **Dashboard records and recovery:** recorded In Progress and Completed lessons use semantic lists, context and existing text-plus-SVG statuses; empty lists explain the absent records. Lists show at most five latest progress updates with explicit truncation copy when needed. With no unfinished record or recommendation, plain explanatory copy preserves curriculum access. [app/dashboard/loading.tsx](app/dashboard/loading.tsx) uses an announced native status with a serif loading heading and quiet progress-retrieval text, without simulated counts or a skeleton. A failed query uses an alert explaining that counts are unavailable, plus Reload your dashboard, Check your account and the persistent curriculum link. [app/dashboard/page.tsx](app/dashboard/page.tsx) sends anonymous visitors to the login return path instead of showing private zero counts. The dashboard account shortcut and [app/account/page.tsx](app/account/page.tsx) dashboard link preserve the separate account surface. The sidecar dashboard sample is a static synthetic, source-derived presentation only; it cannot establish real authentication or persistence.

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
