# Authentication setup and verification

Milestone 07 implements account flows locally; positive live registration, email confirmation, session persistence, account isolation, sign-out and recovery acceptance remain pending the Product Owner’s manual tests. No test account or external email was created by the agent. M08 prepares the first application table; its hosted migration remains unapplied. The owner reported login, session persistence and sign-out passing on 2026-10-16; email/recovery and two-user acceptance are still pending.

## Local configuration

The existing ignored `.env.local` contains the project URL and current publishable key. A read-only request to the real project's public Auth settings returned 200 on 2026-10-14: email authentication and sign-up are enabled; automatic email confirmation is disabled, so confirmation is required. Dashboard redirect URLs, templates, SMTP and password policy cannot be inspected with a publishable key and remain to be checked manually.

Use `.env.example` only as a template when setting up another checkout; never overwrite an existing `.env.local`. Required values:

| Variable | Source or purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project Connect dialog: Project URL. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Connect dialog or Project Settings → API Keys: publishable key beginning `sb_publishable_`. |
| `APP_SITE_URL` | Exact CEPath origin, currently `http://localhost:3000`; use the deployed HTTPS origin before deployment. |

Never supply a secret, service-role key, database password or management access token. The two `NEXT_PUBLIC` values are intentionally public SDK configuration; privileged credentials are neither required nor accepted. `.env.local` is ignored by Git and has owner-only file permissions. Restart development after changing configuration; public variables are incorporated at build time, so rebuild production after changes. The anonymous curriculum still renders when account configuration is missing; account forms show an unavailable-service notice and disable submission. Private pages deny unverified access.

## Required dashboard settings

In the connected project, inspect Authentication → Sign In / Providers (Email), Authentication → URL Configuration, and Authentication → Email Templates:

1. Enable Email/password authentication and allow new sign-ups. Keep email confirmation enabled. Leave password requirements in the provider as the authority; the app checks required fields and matching confirmation, then displays sanitized provider feedback for weak passwords. Do not weaken existing policies for testing.
2. Set local **Site URL** to `http://localhost:3000`, matching `APP_SITE_URL`.
3. Add exact **Redirect URLs** for `http://localhost:3000/auth/callback?next=/account` and `http://localhost:3000/auth/callback?next=/update-password`. Use exact routes/origins rather than broad production wildcards. Match the port if you deliberately run a different local origin.
4. Prefer the token-hash templates below for email confirmation and recovery. These enter a short-lived confirmation step and work without requiring the browser that initiated the request.
5. Verify email delivery. Supabase’s built-in email service is restricted and intended for trial use; configure approved SMTP before public use. Do not assume it can deliver to arbitrary students. This repository does not change SMTP or send marketing mail.

No production deployment is configured. When one is approved, set both Site URL and `APP_SITE_URL` to its exact HTTPS origin, add the two exact HTTPS callback URLs, and update the templates' origin through Site URL. Review preview origins individually; no wildcard rule or paid service was created here.

## Email templates and callbacks

For **Confirm signup**, use this link in the dashboard template:

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Confirm your CEPath email</a>
```

For **Reset password**:

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery">Recover CEPath access</a>
```

`/auth/confirm` accepts only email/signup or recovery intent. GET stages the opaque credential in a ten-minute HttpOnly, SameSite=Lax cookie scoped to `/auth`, then redirects to `/auth/verify` without the token in the URL. It does not consume the token. The explicit confirmation button posts a same-origin Server Action, clears the staging cookie and calls Supabase `verifyOtp`. A valid provider session leads to `/account` or `/update-password`; invalid, expired or used links produce a safe retry path. Credential data is not embedded in the verification page's HTML or client props.

The standard Supabase PKCE template can also use `/auth/callback` with an opaque code. That route exchanges the code through the SDK and the requesting browser’s verifier cookie. Open these links in the browser where they were requested; cross-browser failures require a fresh request or the token-hash templates above. Return targets use an exact allowlist: `/account`, `/dashboard`, `/update-password`, `/curriculum` and registered published lesson paths. Caller-supplied external URLs, encoded variants, query tricks and duplicate credential parameters never select a redirect destination.

Callback redirects remove the code/hash and use the configured origin. Auth responses have `Cache-Control: private, no-store` and `Referrer-Policy: no-referrer`. Next.js development logs ignore the credential-bearing callback paths. A future deployment must also redact query credentials in infrastructure/access logs; no deployment logging was configured by this milestone.

## Server and browser boundaries

`lib/supabase/client.ts` is the official cookie-based browser client factory. `server.ts` creates a new server client for each request; writable contexts persist cookie changes, while read-only Server Components rely on proxy refresh. `proxy.ts` refreshes sessions using `getClaims`, passes refreshed cookies to both the request and response, and propagates SDK cache headers. It never blocks curriculum routes.

The shared header receives verified `getClaims` identity state from the server and exposes no email. `/account` and password updates use a fresh `getUser` record; a cookie payload or unverified `getSession` user never authorizes access. React identity caching is request-local. Reading session cookies in the shared layout means public pages now render per request; this is the small-app tradeoff for consistent navigation. Responses containing personal/session state are not publicly cached.

Server Actions validate inputs, use Next’s same-origin protections, and map provider errors without logging passwords or raw errors. Registration-pending and authenticated results are distinct. Recovery acknowledgments do not reveal whether an account exists. Passwords are handled only by Supabase and are never returned in action state, logged, or stored in application tables.

Sign-out uses `scope: 'local'` and revalidates the root layout before redirecting. SDK errors may occur after local cookies have been cleared; the error route explicitly says sign-out could not be confirmed and the session may still be active, rather than claiming remote revocation succeeded. Supabase JWTs can remain usable until expiry even after refresh-token revocation; this app’s fresh account lookup and cleared browser session are not a promise of instant global JWT invalidation.

M08/M09 extend post-login returns to exact canonical paths from the registered published lesson registry, alongside `/account`, `/dashboard`, `/update-password` and `/curriculum`. It does not permit arbitrary curriculum prefixes, query/hash variants or external URLs.

## Verification recorded locally

- Existing curriculum and mathematical-content tests remain in the suite.
- Policy/service/staging tests use isolated provider doubles for success/error branches; these are not live integration tests.
- Actual Next.js HTTP checks cover anonymous account denial, a synthetic forged cookie denied by the real SDK, public lesson rendering, private no-store headers, unsafe/invalid callbacks, opaque staged credential absent from HTML, cross-origin multipart Server Action rejection, same-origin server validation and invalid explicit confirmation with staging-cookie deletion.
- Real project's public settings endpoint is reachable. No positive real account flow or email delivery is claimed.
- Configured and missing-config production builds and `npm run check` passed: lint, strict types and 26 focused Node tests. Guest forms were captured at 1440, 1280, 768, 390 and 320px without horizontal overflow. Keyboard password visibility and alert-focused validation were exercised. Authenticated views and positive email/session flows still require manual acceptance. Final design-review scope is recorded in the roadmap.

## Manual acceptance checklist

Use an address you control in this development project. Do not use real student data for tests.

1. Configure the dashboard values/templates above. Open `/signup`, verify invalid email and mismatched passwords are rejected, then create your test account. Confirm that the page shows email pending and does not claim an authenticated session.
2. Follow the confirmation email. With token-hash templates, explicitly confirm the link, then verify `/account` displays only your authenticated email and confirmed status. Test an expired/used link and its recovery guidance.
3. Sign out and confirm `/account` redirects to `/login?next=/account`. Open the public Forces and Vectors lesson while signed out.
4. Log in with valid credentials, refresh `/account`, navigate through the curriculum and return. Confirm the session remains available. Try invalid credentials and check safe feedback.
5. Request recovery, follow the email and continue recovery. Set a new password with matching confirmation. Test invalid/expired recovery links, then verify the new password signs in and the previous password does not.
6. Using two separate browser profiles and two authorized test identities, verify one cannot see the other's email/private account page. Check browser Back/refresh after sign-out for stale personal information.
7. Check keyboard focus, password visibility, pending controls, errors and navigation on your phone. Test a normal session-expiry/refresh cycle before marking the milestone complete.

Report these outcomes before changing M07 to Completed. M08 progress tracking is now approved; its migration and separate acceptance limits are documented in [PROGRESS.md](PROGRESS.md).

## Implementation files

Created:

- Account pages: `app/signup/page.tsx`, `app/login/page.tsx`, `app/forgot-password/page.tsx`, `app/update-password/page.tsx`, `app/account/page.tsx`.
- Email callbacks: `app/auth/confirm/route.ts`, `app/auth/callback/route.ts`, `app/auth/verify/page.tsx`.
- Provider boundary: `lib/supabase/config.ts`, `client.ts`, `server.ts`, `proxy.ts`; root `proxy.ts`.
- Auth logic: `lib/auth/policy.ts`, `service.ts`, `actions.ts`, `identity.ts`, `email-link.ts`.
- Reusable forms: `components/auth/auth-shell.tsx`, `auth-form.tsx`, `submit-button.tsx`, `signout-control.tsx`; `components/layout/site-navigation.tsx`.
- Tests: `tests/auth-policy.test.mjs`, `auth-service.test.mjs`, `auth-callback.test.mjs`.
- Configuration and context: `.env.example`, this guide, `docs/plans/2026-10-14-1617-feat-accounts-authentication-plan.md`, `.impeccable/surfaces/app-signup-page-tsx.md`.

Modified: `app/globals.css`, `components/layout/site-header.tsx`, `next.config.ts`, `package.json`, `package-lock.json`, `tsconfig.json`, `README.md`, `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, `docs/ROADMAP.md`, `docs/DECISIONS.md`. Local-only `.env.local` keeps the existing public configuration and adds the canonical origin; it is not committed.

## Privacy questions before a public launch

Only email, password credentials and Supabase's authentication/session identity are required. Password storage belongs to Supabase; CEPath has no profile table, public directory or trackers. M08 introduces private lesson status records; include their retention/deletion in that review. Review retention/deletion procedures for test and future student identities, provider logs and access permissions, email-delivery processing, an appropriate privacy notice, and applicable age/consent requirements with qualified advice before public launch. This document is implementation guidance, not a legally reviewed privacy policy or a compliance claim.

## Official references

- [Supabase SSR clients and Next.js proxy](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Password authentication and recovery](https://supabase.com/docs/guides/auth/passwords)
- [Redirect configuration](https://supabase.com/docs/guides/auth/redirect-urls)
- [Email templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [SSR caching and flow details](https://supabase.com/docs/guides/auth/server-side/advanced-guide)
