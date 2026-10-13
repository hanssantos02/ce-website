# CEPath

An original learning platform for Filipino civil engineering students preparing
for the CELE. CEPath is a working title.

Milestone 01 provides only an application scaffold and temporary homepage.
Curriculum navigation, accounts, and progress are future work.

## Run locally

Use Node.js 24 and npm. If you use nvm, run `nvm install` and `nvm use`;
the repository's `.nvmrc` selects Node 24.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No environment variables or external
service accounts are required. Stop the server with Ctrl+C.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with automatic updates. |
| `npm run lint` | Check recommended JavaScript/TypeScript lint rules; warnings fail the check. |
| `npm run typecheck` | Generate Next.js route types, then check TypeScript without emitting code. |
| `npm run check` | Run lint and type checking. |
| `npm run build` | Create and type-check the production build. |
| `npm start` | Serve an existing production build locally. |

For a production smoke check, stop the development server, run `npm run build`,
then `npm start`. The app uses port 3000 by default; to choose another port,
run `npm run dev -- --port 3001` or `npm start -- --port 3001`.

## Code structure

- `app/page.tsx` defines the `/` homepage. App Router folders will define future routes.
- `app/layout.tsx` provides the shared HTML document, language, metadata, and global CSS import.
- `app/globals.css` loads Tailwind and temporary base styles; utility classes in the page provide spacing and typography.
- `postcss.config.mjs` enables Tailwind's CSS compilation.
- `next.config.ts` disables generated agent instructions so running development does not rewrite AGENTS.md.
- `tsconfig.json` enables strict type checking; `eslint.config.mjs` configures recommended JavaScript/TypeScript lint rules.
- `package-lock.json` records the exact installed dependency tree. Use `npm ci` to reproduce it.

The homepage is a Server Component by default: no client state or browser event
handlers are needed. Next.js supplies the default missing-route page. There is no
API, database, or test framework in this scaffold.
`next-env.d.ts`, `.next/`, and TypeScript's build cache are generated and ignored.
Do not edit generated files.

Linting uses supported ESLint 10 and typescript-eslint. Next's lint preset is
deferred because its React plugin currently requires ESLint 9 and its dependency
chain has an unpatched advisory. Next-specific lint rules are not enabled;
Next.js type generation and the production build still check framework integration.

## Project context

Read [AGENTS.md](AGENTS.md), [STRATEGY.md](STRATEGY.md),
[PRODUCT.md](PRODUCT.md), [docs/ROADMAP.md](docs/ROADMAP.md), and
[docs/DECISIONS.md](docs/DECISIONS.md) before starting another milestone.
Visual branding and curriculum implementation remain unapproved.
