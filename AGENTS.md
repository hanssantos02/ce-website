# CEPath project instructions

## Read before work

- Read this file, [STRATEGY.md](STRATEGY.md), [docs/ROADMAP.md](docs/ROADMAP.md), and relevant entries in [docs/DECISIONS.md](docs/DECISIONS.md).
- Consult PRODUCT.md and DESIGN.md when they exist. Create them only when product behavior or design decisions justify them; do not duplicate strategy or plans.
- Inspect relevant existing implementation before proposing replacements. CEPath is a temporary name.

## Scope and authority

- The human user is the Product Owner. Explain tradeoffs and obtain approval for major product or architecture decisions.
- Work on exactly one approved milestone at a time. Roadmap entries and the preferred stack are proposals, not implementation authorization.
- The initial assignment is documentation only. Do not scaffold an app, install dependencies, connect services, or begin coding until the Product Owner approves the next milestone.
- Prefer the smallest independently testable slice. Do not prebuild future features, unused abstractions, schemas, APIs, or placeholder lessons.
- Explain why each dependency is needed before installation. Preserve existing work and avoid unrelated rewrites.
- Do not commit, push, publish, or open a PR without authorization. Do not run lfg, automatic shipping, or costly multi-agent workflows unless explicitly requested.

## Milestone workflow

1. Read project memory and identify the exact user-visible outcome. Ask one focused question if a critical decision is missing; do not ask about trivial implementation choices.
2. Give a concise outline for small changes. Separate planning from implementation for substantial, architectural, security-sensitive, or data-changing work; use ce-plan and its required review when applicable.
3. Implement only approved scope using existing conventions. Keep curriculum content separate from UI code and identifiers stable.
4. Run checks appropriate to the change: types, lint, relevant tests, and affected browser, responsive, accessibility, or authorization flows. Never claim a check passed unless it ran and passed; report unverified areas.
5. Update relevant living documentation without generating duplicate plans. Explain important choices and their tradeoffs so the Product Owner can maintain the code.
6. Report completion, changed files, checks and results, limitations, manual checks, next small milestone, and commit status. Stop; do not start another milestone automatically.

## Product and curriculum

- Serve Filipino civil engineering students preparing for the Philippine CELE. Build an original product inspired by structured learning, not an Odin Project clone.
- Follow subject → module → lesson. Honor **CE-CONTENT-001 — Full Textbook-Style Lessons (Approved)**: substantial lessons provide comprehensive original engineering instruction, with conceptual depth and correctness rather than short reviewer notes or an arbitrary word count. Include engineering relevance, objectives, advisory prerequisites, progressive foundational explanations, defined variables/units, assumptions and appropriate derivations, accurate diagrams, increasingly demanding worked examples, conceptual/computational practice with detailed solutions, misconceptions, board-exam applications, summaries and verifiable academic references where appropriate. See [the approved standard](docs/DECISIONS.md#ce-content-001--full-textbook-style-lessons--approved). Preserve correct content during audits; update only genuine gaps. Lesson completion and next navigation use the existing product architecture, never an educational access restriction.
- Honor **CE-NAV-001 — Guided but Flexible Curriculum Navigation (Approved)**: recommended module/lesson order is advisory. All published free lessons remain accessible anonymously, regardless of completion or prerequisites; allow skipping, returning, reviewing completed lessons, and switching freely between PSAD, MSTE, and HGE. Never implement lesson unlocking, mandatory prerequisite checks, or completion-based access restrictions. See [PRODUCT.md](PRODUCT.md) and docs/DECISIONS.md.
- Use stable prerequisite references with navigable informational recommendations, never authorization rules. Keep ordering and publication metadata separate from student progress.
- When authenticated progress is introduced, track **Not Started**, **In Progress**, and **Completed** independently per lesson. Permit out-of-order completion, calculate progress from actual records, and preserve Completed when a lesson is revisited.
- Keep **Continue Learning** (most recently visited unfinished lesson) separate from **Recommended Next** (curriculum guidance). Neither may override student choice or block access elsewhere.
- Write only agreed sample content. Verify calculations and dimensional consistency; use Philippine engineering conventions where applicable.
- Maintain an explicit editorial review status. Draft or unchecked content must not be presented as verified. The review process and metadata schema require agreement before implementation.
- Use the dated PRC baseline and recheck official sources when publishing scope claims; see docs/DECISIONS.md. Do not invent official requirements, questions, endorsement, or passing guarantees.
- Keep core learning accessible without paying. No payments, subscriptions, checkout, premium locks, fictional pricing, payment models, or premium badges at this stage.

## Technology and data

- M1's approved scaffold uses Next.js App Router, TypeScript, Tailwind CSS, and npm on Node 24. See README.md for commands; keep package-lock.json with dependency changes. Later MDX, KaTeX, Supabase PostgreSQL/Auth, Vitest, Playwright, and Vercel remain unconfigured proposals, introduced only as justified by an approved milestone.
- Evaluate existing implementations before changing stacks. Favor maintainable architecture and practical free tiers; introduce each tool only when needed.
- Keep routing predictable; handle missing content, errors, loading, and empty states as applicable.
- When accounts arrive, authorize protected data on the server and apply Supabase Row Level Security to user-owned data. Never expose secret credentials in client code.
- Browser local storage must not be the authoritative source of authenticated progress. Never make destructive data changes without approval.
- Avoid premature CMS or microservices.

## Interface and skills

- Use Impeccable for new UI surfaces and major frontend design work. Follow its actual workflow and maintain appropriate design context once choices are established.
- Preserve the Product Owner's engineering faculty bulletin foundation from Milestone 02, evolved by **CE-DESIGN-002 — Hybrid Digital Textbook + Engineering Workspace (Approved)**: keep the existing identity and tokens; use a readable textbook column with contextual navigation on wide screens and a single compact index on mobile. Read DESIGN.md and the matching .impeccable surface brief before UI work; use existing color/spacing/font tokens and the three layout components instead of inventing a new identity. Keep documented tokens synchronized with app/globals.css. Do not add unavailable-feature navigation links.
- Favor technical-documentation readability, clear learning order, responsive layouts, visible lesson status, accessible contrast, keyboard access, and readable math.
- Use a coherent professional identity with subtle engineering motifs. Avoid generic SaaS layouts, oversized empty heroes, excessive gradients or glass effects, clutter, and distracting animation.
- Use relevant installed Compound Engineering skills selectively: ce-strategy for direction, ce-brainstorm for unresolved requirements, ce-plan for implementation plans, ce-work for approved implementation, ce-debug for diagnosis, and review/testing skills when appropriate.
- Read selected skills and required references rather than guessing their workflows. Honor required review steps; if a skill is unavailable, state that it did not run. Do not repeatedly revisit settled decisions.

## Project memory ownership

- STRATEGY.md: purpose, positioning, users, boundaries, metrics, and investment areas.
- PRODUCT.md: established behavior and user experience decisions, when justified.
- DESIGN.md: approved visual direction and principles, when justified.
- docs/ROADMAP.md: small milestones and statuses (Planned, In Progress, Completed, Blocked).
- docs/DECISIONS.md: important decisions, rationale, proposal status, and known limitations.
