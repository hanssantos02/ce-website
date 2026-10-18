# Student dashboard: architecture and verification

Milestone 09 adds `/dashboard` as a private study hub. `/account` remains account management. The Product Owner selected summary first, followed by Continue Learning and Recommended Next, inside the existing faculty bulletin design. No database schema, dependency, environment variable, visit tracking or additional lesson is introduced.

## Prerequisites and evidence

On 2026-10-17 the owner confirmed applying the M08 migration and successfully testing saved progress across refresh and sign-out/sign-in. An agent-run read-only anonymous Data API request returned permission denied (401/42501), rather than the earlier missing-table error. Those observations justify proceeding with M09; they are not agent-run positive dashboard or hosted two-user verification. M07 email/recovery acceptance and the remaining M08 security checks are not silently marked complete.

## Private data flow

`lib/dashboard/data.ts` requests all eligible lesson IDs through M08's existing request-local progress loader. That loader verifies the current identity with Supabase `getUser`, derives ownership on the server, and issues one query scoped to that user and the eligible IDs. The only added database field in the read projection is the existing `updated_at`. There is no per-lesson query loop, browser-supplied owner, privileged credential, new endpoint or shared private cache.

`lib/dashboard/summary.ts` computes the presentation model without importing MDX bodies. The model contains curriculum context and personal statuses, never the internal user ID or email. `content/published-lessons.ts` enumerates actual registered published lessons in subject, module and lesson display order. Existing content tests verify registration against authored MDX. Planned, missing and unregistered lessons cannot inflate totals or become recommendation destinations.

`/dashboard` redirects a missing/expired identity to `/login?next=/dashboard`. Its native App Router loading boundary can stream a 200 response with Next redirect metadata; the browser still navigates to login, and no private counts are rendered. An unavailable provider/identity check renders a generic retry surface with no progress values. The existing proxy sets private/no-store headers, and the page is explicitly dynamic. A failed read is never treated as an empty successful result.

Confirmed progress actions invalidate `/dashboard` along with the affected lesson and module. The authenticated header and account page link to it without prefetching. An exact `/dashboard` entry joins the existing safe return allowlist; `/account` remains the default, and published lesson/password-recovery destinations are preserved. No URL prefix or external/query/hash redirect is accepted.

## Calculations and recommendations

Completed and In Progress counts use distinct eligible lesson IDs and saved statuses. Currently Available is the number of registered published lessons with a real destination. Each subject uses completed / available × 100, rounded to a whole percent. A zero-content subject has no percentage or progress bar and says Lessons coming soon. Completing PSAD's currently single lesson means 1 of 1 available lessons, never mastery of PSAD or the CELE syllabus.

Continue Learning selects the eligible In Progress record with the latest progress-change `updated_at`. Equal timestamps use the explicit curriculum order, then stable lesson ID. Missing/invalid timestamps sort after valid timestamps and use the same deterministic order. This is saved progress activity, not a lesson visit; merely opening a lesson still writes nothing.

Recommended Next uses the Continue context when present, otherwise the latest saved eligible activity. It chooses the first incomplete published lesson in that module, then that subject, then the full curriculum order. Without activity, it starts with the first incomplete published lesson globally. Suggested prerequisites remain informational and never authorize access. With the one current published lesson, Continue and Recommended may name the same lesson; the page explains why. No incomplete published lesson means an honest end state and curriculum/review links.

Completed and In Progress lists display up to five latest saved updates each. Older records still count in totals. Duplicate defensive inputs do not double-count; their latest timestamp wins, with a deterministic status tie-breaker. The database primary key prevents such duplicate rows in normal storage. Registry-scoped reads omit historical unknown/unpublished IDs; they do not delete or inspect those stored rows. The pure helper also ignores unexpected references if supplied and returns an ignored-record count; no hosted inconsistency has been detected or cleaned up by this work.

## Verification

- `npm run check`: lint, strict types and 45 tests passed on the final code before the read-only review. Seven new dashboard tests cover real-registry counts, denominators, new students, zero-content subjects/catalogs, duplicate/stale/planned records, independent out-of-order completion, activity ordering/ties, recommendation fallbacks and error/expired states. Progress-read timestamp and exact dashboard-return checks extend existing tests.
- `npm run build`: passed, including the full test suite. Existing PostgreSQL engine tests continue to execute the unchanged M08 migration and ownership policies in an isolated database; no hosted schema was changed.
- Production HTTP checks: 22 responses passed for nine public curriculum pages, private dashboard/account denial and no-store, canonical/unsafe login returns, recovery/lesson return compatibility and invalid/planned 404s. Browser navigation confirmed the streamed dashboard redirect reaches login. Published MDX/KaTeX remains public.
- Browser presentation: clearly labeled isolated fixtures exercise the real dashboard component with synthetic new, In Progress, all-available-complete, unavailable and loading states at desktop/mobile, plus tablet, 320px and actual user-1280 widths. They are outside the checkout and never ship as a route. All measured layouts fit without horizontal overflow, fonts loaded, links measured at least 44px, keyboard skip focused main and subsequent focus had a visible 3px outline. No browser warning/error was observed. Actual anonymous redirect/public-reader captures are separate from the synthetic private states.
- One Impeccable detector returned no findings. Independent targeted source review found no concrete correctness/security defect in its scoped files; the full autonomous CE shipping pipeline did not run. Independent Impeccable full visual review returned `ship` for the presentation after inspecting all 18 current captures. Two initial invalid screenshot exports were replaced with valid viewport captures before the full review; they were evidence defects, not application defects. No material visual fix was requested. DESIGN.md and the sidecar now record the dashboard, preserve all eight color/eight spacing/seven type primitives and the North Star, and add one bounded synthetic static preview while retaining the 13 incumbent previews. A final-build forged-cookie check also denied private counts and preserved no-store and the safe dashboard return.

No real authenticated dashboard session, hosted two-user dashboard isolation, live save-to-dashboard freshness, browser history/session-expiry acceptance, screen-reader session or comprehensive automated accessibility audit was executed by the agent. Owner-reported M08 checks do not substitute for these M09 acceptance checks. Do not mark M09 Completed solely from isolated tests and fixtures.

## Manual acceptance

1. Run the app and visit `/dashboard` signed out. Confirm login appears, then sign in and return safely to the dashboard. Confirm `/account` still works and a lesson sign-in still returns to that lesson.
2. With no progress, expect 0 Completed, 0 In Progress, 1 Available, a suggested Forces and Vectors lesson, and Lessons coming soon for MSTE/HGE. This is the current published registry, not the full subject syllabus.
3. Start Forces and Vectors. Navigate to Dashboard and confirm 1 In Progress, the Continue link and the appropriate recommendation. Mark Completed, return and refresh: expect 1 Completed, 0 In Progress, 1 of 1 published PSAD lessons completed, no unfinished recommendation, and a review link.
4. Mark In Progress again and then Reset. Confirm the dashboard reflects each confirmed save without stale values, including browser Back/forward and navigating through the header. Revisit without a mutation and confirm nothing changes automatically.
5. Sign out and confirm private data/actions disappear. Reload/back must not expose a prior account's dashboard. Sign in as another authorized test user in a separate browser profile: only that user's records may appear. The existing hosted RLS checklist in [PROGRESS.md](PROGRESS.md) remains required; separate UI values alone do not prove database isolation.
6. Interrupt database access or expire the session. Expect unavailable/retry or login recovery, never fabricated zero counts or progress-based reading restrictions. On a phone, check full subject names, clear labels, keyboard focus and all navigation targets.

No new Supabase dashboard setting or migration is required for M09. Use the existing development project and authorized identities; no account/email was created by the agent. Do not reset a database or reapply M08 SQL to run these checks.

## File manifest

Created: `app/dashboard/page.tsx`, `app/dashboard/loading.tsx`, `components/dashboard/student-dashboard.tsx`, `lib/dashboard/data.ts`, `lib/dashboard/summary.ts`, `tests/dashboard.test.mjs`, this guide and `.impeccable/surfaces/app-dashboard-page-tsx.md`.

Modified for M09: `content/published-lessons.ts`; `lib/progress/policy.ts`, `service.ts`, `store.ts`, `actions.ts`; `lib/auth/policy.ts`; `components/layout/site-navigation.tsx`; `app/account/page.tsx`; `app/globals.css`; `tests/progress-service.test.mjs`, `tests/auth-policy.test.mjs`; `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, `README.md`, `docs/ROADMAP.md`, `docs/DECISIONS.md`, `docs/PROGRESS.md`, `docs/AUTHENTICATION.md`.

Earlier M07/M08 uncommitted work was preserved. This manifest describes only M09 additions and integrations. No commit, push, deployment or remote migration was performed. M09 remains In Progress pending real authenticated dashboard acceptance. M10 Practice Question Engine remains proposed and unstarted.

## References

- [Supabase server-side identity and caching guidance](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
