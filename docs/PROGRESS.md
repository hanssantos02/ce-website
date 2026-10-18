# Lesson progress: setup and verification

M08 adds explicit per-lesson account progress. Implementation and isolated checks do not mean the hosted table exists or that live persistence has been accepted. The connected project is a **development project**, as confirmed by the Product Owner on 2026-10-16. The owner also reports login, session persistence and sign-out passed manually. This does not independently verify M07 email/recovery or M08 saves.

## Current prerequisite acceptance — 2026-10-17

The Product Owner reports applying the migration and successfully testing saving, page refresh and sign-out/sign-in persistence. A new agent-run read-only anonymous Data API probe returned 401/42501 permission denied rather than PGRST205. No migration was applied by the agent. This supports proceeding with approved M09, while positive hosted/two-user security acceptance remains separately unverified. Earlier local handoff notes below describe the pre-application state.

## Migration and approval boundary

Review [the versioned SQL migration](../supabase/migrations/20261016000100_create_lesson_progress.sql) before application. It has not been applied by the agent. A read-only public API probe returned PGRST205/table not found before implementation. Only public SDK configuration is available locally; it cannot execute SQL migrations. Never request or commit a service-role key, database password or management token for ordinary progress operations.

The migration creates only `public.lesson_progress`, one invoker timestamp function/trigger, four authenticated ownership policies, and explicit table/function permissions inside a transaction. It does not alter existing account/curriculum data, reset the database, drop tables, add a profile table or duplicate curriculum metadata. If the table already exists, the migration fails instead of silently accepting a possibly different schema.

After explicit approval for the named development project:

1. Confirm the Supabase dashboard is showing that development project, never production.
2. Open SQL Editor and paste the complete migration file. Review the statements and run it once. Do not use database reset or a destructive workaround if an object already exists.
3. Confirm the table, composite primary key, FK, timestamp trigger, RLS, four policies and grants exist. Reload the application; no additional environment variable or privileged client is required.
4. With an authorized test identity, run the live acceptance checklist below. Production application requires separate review and explicit approval.

There was no existing migration workflow/CLI configuration. This establishes a standard `supabase/migrations/<version>_<name>.sql` file. On a machine with an approved Supabase CLI workflow, migration history/linking must be reconciled with the actual remote project before using a push command. No CLI link/push/reset has run here. The SQL Editor path also requires recording application in the team's migration history; never reapply blindly.

## Schema and timestamps

| Field | Meaning |
| --- | --- |
| `user_id uuid` | Authenticated Supabase identity; FK to `auth.users(id)` with delete cascade. |
| `lesson_id text` | Stable repository lesson ID, not a title or URL. Nonempty, maximum 160 characters. |
| `status text` | Checked `in_progress` or `completed`; no row means Not Started. |
| `started_at timestamptz` | Database time when this row is first inserted; preserved through status changes. |
| `completed_at timestamptz` | Set on entering Completed, cleared on In Progress; same-state retries preserve it. |
| `updated_at timestamptz` | Database time of the last real status change; same-state retries preserve it. |

The `(user_id,lesson_id)` primary key prevents duplicate rows and already indexes user-scoped reads. No extra user index is added. Both identity columns are immutable after insertion. Trigger logic ignores client-provided timestamps. Repeating an upsert is safe; reset deletes only the current user's target row, and resetting an absent row succeeds. Restarting after reset creates a new start time. Merely fetching or revisiting never writes anything.

## Authorization and content integrity

Table grants and RLS protect different boundaries. The migration revokes inherited table privileges from PUBLIC/anon/authenticated, then grants authenticated SELECT/INSERT/UPDATE/DELETE only. Policies apply only to authenticated and compare `user_id` with `(select auth.uid())`. UPDATE has both USING and WITH CHECK. Anonymous clients have no table CRUD access. No ordinary operation uses service-role credentials or bypasses RLS.

The application creates a request-scoped server Supabase client, verifies fresh identity with `getUser`, and derives `user_id` from that result. Browser-supplied ownership is ignored. Actions use the same writable client for verification and storage. Required fields, intent and published lesson IDs are validated server-side; duplicates/malformed fields are rejected. Missing/expired identity differs from a verification outage.

**RLS enforces ownership; application validation enforces lesson availability.** The database has no repository curriculum FK or list of published IDs. A direct authenticated SDK caller can store an arbitrary ID in their own rows. CEPath mutations reject unknown/planned/unregistered lessons, and registry-scoped reads never display those arbitrary entries. No claim is made that PostgreSQL enforces publication. The plain registered-ID export is checked against actual authored MDX exports; no runtime arbitrary MDX import is introduced.

## Server operations and interface

`content/published-lessons.ts` derives eligible lessons and canonical return paths from curriculum metadata and the trusted registration list. `lib/progress/service.ts` handles validated reads/mutations through a small gateway; `store.ts` is the server-only Supabase adapter. One scoped query fetches a module's relevant published statuses; there is no per-row query loop or shared user cache. React caching is request-local. Confirmed updates and reloads revalidate the lesson and parent module.

`actions.ts` exposes one same-origin Server Action. Upsert returns the saved row; reset performs a confirming read, including idempotent deletion of an absent row. Provider errors are sanitized and never logged with tokens. A failed read is unavailable, not Not Started. A failed save retains the last confirmed display with error/retry guidance. A session expiry offers sign-in while the lesson remains readable. Pending controls prevent duplicate submissions; no optimistic Completed label is shown.

The lesson reader adds one small client form above its native index/objectives. It supports Start Learning, Mark as Complete, Mark In Progress, Reset progress, reload/retry and clear text status. Not Started permits direct completion as well as starting; no mandatory sequence is introduced. The module displays real statuses only for verified users and eligible lessons. Planned lesson labels remain publication labels with no completion controls. Safe login returns accept exact canonical published lesson paths, never an arbitrary curriculum prefix or external/query/hash variant.

## Verification classes

- **Isolated PostgreSQL:** development-only PGlite executes the actual migration. Synthetic `auth.users`, `auth.uid()` and role fixtures stand in for Supabase identity plumbing. Tests run as non-owner authenticated/anon roles and exercise ownership/grants, uniqueness, timestamps, independent lessons, idempotent reset and account deletion. This is a real PostgreSQL engine, not real Supabase Auth/PostgREST integration.
- **Isolated application:** focused Node tests check eligibility, malformed actions, verified-owner derivation, errors, explicit transitions, safe redirects and independent order. Provider doubles are not live persistence proof.
- **Browser UI:** actual public reader/module checks are separate from the ignored, temporary isolated UI fixture used to exercise authenticated-looking status/pending/error controls without creating a real account. Fixture results never establish a saved database record.
- **Hosted integration:** migration application, real authenticated saves, reload, logout/login, a second browser/device and hosted two-user isolation remain unverified until explicitly executed. Do not mark M08 Completed on isolated results alone.

The local environment initially had no Docker/PostgreSQL/Supabase CLI. Pinned `@electric-sql/pglite` is a test-only dependency; no database engine enters the browser or application runtime bundle. The migration and tests run without remote credentials or student data.

## Live acceptance checklist

Use authorized development test identities, not real student records. Account/email creation remains the Product Owner's manual work.

1. Apply the reviewed migration only after approval. Sign in as A and open Forces and Vectors. Confirm Not Started; simply refresh/revisit and verify no row is created.
2. Start Learning, confirm In Progress, refresh and check it remains. Mark Completed, refresh and revisit; it stays Completed until an explicit change.
3. Mark In Progress again and verify completion time is cleared. Reset and confirm Not Started; reset of an absent record is safe and no unrelated row is removed.
4. Sign out. Confirm public content remains readable and private status/actions disappear. Sign back in and check the same saved status returns. Repeat with a separate browser/device using A.
5. In a separate profile as B, confirm A's records are not visible or writable. Exercise SELECT/INSERT/UPDATE/DELETE and ownership reassignment against the hosted Data API using only each authorized user's normal credentials; no privileged key or real student row. Repeat anonymous denial. Local policy tests do not replace this provider-boundary acceptance.
6. Interrupt a save or expire the session. Check pending, failure/retry/reload and sign-in feedback, with no false success or locked reading. On a phone, verify labels, focus and touch targets.
7. Confirm module status matches the saved row; other planned lessons retain planned publication labels. The repository currently publishes only one lesson: independent multi-lesson/out-of-order behavior is tested with isolated synthetic rows, not a fabricated additional lesson.

## Boundaries and references

No dashboard, subject percentages, Continue Learning logic, analytics, timer, realtime/offline sync, account schema, completion-based access restriction, lesson publication, M09, commit or deployment.

- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase server-side clients](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [PGlite test engine](https://pglite.dev/docs/)

## Local handoff results — 2026-10-17

`npm run check` passed lint, strict TypeScript and all 37 tests; `npm run build` passed with the same test suite. Two tests execute the actual migration in isolated PostgreSQL, including cross-owner upsert denial, timestamp precision/idempotency, restart and cascade isolation. Twenty-one production HTTP responses passed assertions for existing public routes, planned/invalid 404s, safe lesson returns, anonymous account denial and private no-store headers.

Actual anonymous reader/module and explicitly synthetic private control states were inspected at desktop/mobile, with tablet, 320px and user-1280 checks. Keyboard transitions, saving-disabled controls, error retention/retry/reload, expired-session feedback and real anonymous action denial were exercised. No observed horizontal overflow or console warnings/errors. The anonymous sign-in target measures 44px on desktop/mobile; actions measured over 44px. One Impeccable detector returned no findings. Independent finish review requested two fixes; the focused verdict resolved both after the link target and design documentation changed. No positive hosted save, authenticated private module browser check, screen-reader session or comprehensive automated accessibility audit is claimed. Evidence is local-only under the ignored `.impeccable/review/m08/` directory; no temporary test route ships.

At the initial local handoff, M08 was **partially implemented / In Progress**, pending approved hosted migration and live acceptance. The current owner-reported migration/persistence update is recorded above; hosted two-user security acceptance remains outstanding. M09 Student Dashboard is now separately approved and locally implemented; see [DASHBOARD.md](DASHBOARD.md). No commit, push or deployment was performed.

## M08 file manifest

New:

- `supabase/migrations/20261016000100_create_lesson_progress.sql`: additive table, constraints, timestamp trigger, grants and policies.
- `content/lesson-ids.ts`, `content/published-lessons.ts`: stable registration IDs and published-content/URL eligibility.
- `lib/progress/policy.ts`, `service.ts`, `store.ts`, `actions.ts`: states, validated operations, server SDK adapter and single action.
- `components/progress/lesson-progress.tsx`, `progress-controls.tsx`, `progress-status.tsx`: server read/public reminder, explicit client controls and text/SVG status.
- `tests/progress-service.test.mjs`, `progress-database.test.mjs`: focused application and real PostgreSQL policy/data tests.
- This guide, `docs/plans/2026-10-16-feat-persistent-lesson-progress-plan.md` and `.impeccable/surfaces/components-progress-lesson-progress-tsx.md`.

Modified for M08:

- `components/lesson/lesson-reader.tsx`, `app/curriculum/[slug]/[moduleSlug]/page.tsx`, `app/globals.css`: reader/module integration and existing-token styles.
- `content/lesson-documents.ts`, `tests/lesson-content.test.mjs`: actual MDX/registered-ID correspondence.
- `lib/auth/policy.ts`, `tests/auth-policy.test.mjs`: exact published-lesson return paths.
- `package.json`, `package-lock.json`: pinned test-only PGlite dependency.
- `README.md`, `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, `docs/ROADMAP.md`, `docs/DECISIONS.md`, `docs/AUTHENTICATION.md`: current behavior, architecture and verification boundaries.

Earlier M07 authentication/eye-icon changes remain in the same uncommitted working tree. They were preserved; the manifest above describes M08 rather than attributing all existing changes to this milestone. Existing ignored `.env.local` is preserved, contains no new progress setting and remains outside Git.
