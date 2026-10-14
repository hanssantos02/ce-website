# CEPath

An original learning platform for Filipino civil engineering students preparing
for the CELE. CEPath is a working title.

Milestones 01–05 established the application, faculty bulletin design, landing page,
public subject catalog, and representative module navigation. Milestone 06 adds a
complete Forces and Vectors lesson with MDX, equations, a diagram and one static
exercise. Accounts, saved progress and interactive quizzes remain future work.

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
| `npm test` | Run focused curriculum, MDX, publication, prerequisite and calculation tests with Node 24. |
| `npm run check` | Run lint, type checking, and the focused tests. |
| `npm run build` | Validate content and equations, then create and type-check the production build. |
| `npm start` | Serve an existing production build locally. |

For a production smoke check, stop the development server, run `npm run build`,
then `npm start`. The app uses port 3000 by default; to choose another port,
run `npm run dev -- --port 3001` or `npm start -- --port 3001`.

## Code structure

- `app/page.tsx` defines `/`, with a hero, curriculum preview, planned journey, values, and working section CTAs.
- `content/curriculum.ts` owns typed subject/topic/module/lesson metadata, stable prerequisite references, ordering/lookup/availability helpers, validation, and landing preview content.
- `content/landing.ts` keeps the landing journey and values separate from UI.
- `app/curriculum/page.tsx` defines the catalog; `app/curriculum/[slug]/page.tsx` renders all three static subject overviews from shared data.
- `app/curriculum/[slug]/[moduleSlug]/page.tsx` renders all three representative modules; its `[lessonSlug]/page.tsx` serves the published lesson reader and supports metadata overviews. Planned lesson URLs return 404.
- `components/curriculum/` holds shared breadcrumbs, the existing subject symbols, and prerequisite recommendations.
- `tests/curriculum.test.mjs` and `tests/curriculum-navigation.test.mjs` use Node’s built-in runner and native TypeScript support; no test dependency is needed.
- `components/landing/engineering-visual.tsx` contains the authored geometric diagram; subject symbols now live in components/curriculum/.
- `app/layout.tsx` provides the document, metadata, local fonts, shared header/footer, and skip-to-content main region.
- `app/globals.css` loads Tailwind and defines the design tokens, typography, spacing, responsive layout, and focus/reduced-motion rules.
- `components/layout/` contains the reused page container, header/navigation, and footer.
- `app/fonts/` contains self-hosted Adobe fonts, upstream references, and SIL OFL licenses; no runtime font requests leave the site.
- `DESIGN.md` documents the implemented visual system; `.impeccable/design.json` supports Impeccable's design preview.
- `postcss.config.mjs` enables Tailwind's CSS compilation.
- `next.config.ts` disables generated agent instructions so running development does not rewrite AGENTS.md.
- `tsconfig.json` enables strict type checking; `eslint.config.mjs` configures recommended JavaScript/TypeScript lint rules.
- `package-lock.json` records the exact installed dependency tree. Use `npm ci` to reproduce it.

The homepage and main layout are Server Components. The header uses a small client
component to identify the current route correctly, including on a missing page.
Native section anchors preserve browser focus behavior. Next.js supplies the
default missing-route page. There is no
API, database, or external test framework. The package explicitly uses ES modules, matching the existing TypeScript/configuration syntax.
`next-env.d.ts`, `.next/`, and TypeScript's build cache are generated and ignored.
Do not edit generated files.

Linting uses supported ESLint 10 and typescript-eslint. Next's lint preset is
deferred because its React plugin currently requires ESLint 9 and its dependency
chain has an unpatched advisory. Next-specific lint rules are not enabled;
Next.js type generation and the production build still check framework integration.

## Project context

Read [AGENTS.md](AGENTS.md), [STRATEGY.md](STRATEGY.md),
[PRODUCT.md](PRODUCT.md), [DESIGN.md](DESIGN.md), [docs/ROADMAP.md](docs/ROADMAP.md), and
[docs/DECISIONS.md](docs/DECISIONS.md) before starting another milestone.
The bulletin visual direction and subject catalog are implemented. The representative module navigation is implemented. The sample lesson reader is implemented; Authentication requires separate approval.

## Lesson content

The existing lesson URL is `/curriculum/psad/engineering-mechanics-statics/forces-and-vectors`.
`content/curriculum.ts` owns stable IDs, descriptions, sequence and prerequisite IDs.
`content/lessons/*.mdx` owns the educational body, objectives, section index and editorial status.
`content/lesson-documents.ts` registers explicit local imports by their exported `lessonId`.
`components/lesson/` supplies the server-rendered reader, navigation, ruled worked examples,
quiet notes, native solution disclosure and a proportional SVG diagram. `mdx-components.tsx`
provides the approved MDX components and accessible scrolling tables.

To add an approved lesson:

1. Add its metadata to the appropriate module, retaining stable IDs and explicit order. Keep unavailable content `planned`; an implemented metadata-only destination may use `overview`.
2. Author a local MDX file with `lessonId`, `learningObjectives`, `sections` and a truthful `editorialStatus`. Use `LessonSection` with the section exports so headings and index labels share one source. Do not repeat the curriculum title, description or prerequisites.
3. Import the MDX module in `content/lesson-documents.ts` and add it to `documents`. After completing source/calculation checks and stating the editorial status, set that lesson’s availability to `published`.
4. Run `npm run check` and `npm run build`, then verify the new route, equations, diagram, navigation and narrow-screen layout. The core reader needs no changes.

Use `$...$` for inline math and `$$...$$` on separate lines for display math.
`mdx-options.mjs` shares GFM tables, remark-math and rehype-katex options between
Next.js and content tests. KaTeX produces visual HTML plus MathML on the server;
its stylesheet is imported by the reader. Invalid equation messages fail the content
tests, which also run before production builds. MDX is executable trusted repository
content: never accept arbitrary user-authored or remote MDX through this registry.

KaTeX is pinned to 0.19.0, with a single npm override to avoid older transitive copies.
The actual compiler integration is tested; no client equation renderer, database or CMS
is needed. Independent academic review of the sample remains pending.
