# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**ADN Local** (`adnlocal.es`) — web for ADN Urbano's training brand. Two faces: an **Instituto** (sells and delivers online courses — fully built and live in production) and an editorial **resource center** (currently static/mocked; real CMS + filtering is Phase 2). Live at `https://www.adnlocal.es` (Vercel + Neon EU Postgres). Project notes/decisions are written in Spanish; the codebase comments and UI are Spanish.

## Commands

```bash
npm run dev        # Next dev (Turbopack) — use this for local work; Payload auto-pushes schema in dev
npm run devsafe    # rm -rf .next && next dev — recover a broken dev server
npm run build      # next build --webpack  (MUST stay --webpack; Turbopack build crashes with Payload)
npm run start      # serve a production build
npm run lint       # eslint .  (flat config in eslint.config.mjs)
```

- **Do NOT use the Payload CLI** (`payload generate:types`, `generate:importmap`, seed scripts). It's broken here (tsx/file-type ESM exports). The importMap auto-generates during `next dev`. There are no generated Payload types — collection docs are cast `as unknown as <Doc>` in the data layer.
- **Never mix `next build` and `next dev` over the same `.next`** — it leaves the dev server returning 404s for routes and `/_next/...` assets. Recover with `pkill next; rm -rf .next; npm run dev`.
- **Linting**: `next lint` was removed in Next 16; `npm run lint` now runs `eslint .` against a flat config in `eslint.config.mjs` that extends `next/core-web-vitals` + `next/typescript` (uses the native flat config exported by `eslint-config-next` 16 — no `FlatCompat`/`@eslint/eslintrc`), with `ignores` for `.next/**`, `node_modules/**`, and `src/app/(payload)/**`. It works. **Known debt**: 9 pre-existing ESLint errors in never-linted code (6× `@next/next/no-html-link-for-pages` in `Header.tsx`, 3× `react-hooks/set-state-in-effect` in `NextSession.tsx` / `Onboarding.tsx` / `AccountForm.tsx` / `CookieBanner.tsx`) — not blocking, left to clean up later.
- **Tests**: Vitest is configured (`vitest.config.mts`); 31+ co-located unit tests pass. See the **Testing** section below. (For end-to-end/API flows, verification is still manual — curl, headless-browser screenshots.)

### Seeding / admin (via Next route, not CLI)

`GET /api/seed?secret=<PAYLOAD_SECRET>` wipes and reseeds (4 courses + admin + test student + enrollment). Guarded by the secret; 403 in prod. Source data: `src/data/courses-seed.ts`.

Dev admin login at `/admin`. Test student flow: `/acceder` → enter `alumno@adnlocal.es` → in dev the response returns a `devLink` (no email needed) → `/area`.

## Environment

Copy `.env.example` → `.env.local`. Key vars: `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, plus Stripe (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`), Resend (`RESEND_API_KEY`, `EMAIL_FROM`).

- **Dev DB**: local Homebrew Postgres over Unix socket to avoid SCRAM password: `DATABASE_URI=postgresql://santi@localhost:5432/adnlocal?host=/tmp`. Do NOT change the `santi` role password.
- **Prod DB**: Neon EU. Schema is pushed by running `dev` against Neon (Payload only auto-pushes in dev, never in prod). Connecting to Neon from local Node needs `NODE_OPTIONS="--no-network-family-autoselection --dns-result-order=ipv4first"` (IPv6/autoSelectFamily bug); not needed on Vercel.
- **Stripe local testing**: `stripe listen --forward-to localhost:3000/api/stripe/webhook` → put the `whsec_` into `.env.local`, restart dev. Test card `4242 4242 4242 4242`.
- **Vercel build**: override Build Command to `npm run build` (the `--webpack` one).

## Architecture

**Next.js 16 App Router + TypeScript + Tailwind v4, with Payload CMS 3.85 embedded in the same app** (Postgres adapter, Lexical rich text). `next.config.ts` wraps the config in `withPayload(...)`.

### Route groups — two separate root layouts, no root `src/app/layout.tsx`

- `src/app/(frontend)/` — public site + student area, owns its layout/Header/Footer.
- `src/app/(payload)/` — Payload admin (`/admin`), its own root layout.
- `src/app/api/` — route handlers (auth, checkout, stripe webhook, progress, account/RGPD, ics, seed).
- `globals.css` and `icon.svg` live in `src/app/` (shared). Brandbook design tokens are in `@theme` in `globals.css`.
- 404: `(frontend)/not-found.tsx` + a catch-all `(frontend)/[...notfound]/page.tsx` calling `notFound()` (route groups don't capture non-matching URLs). It does not interfere with `/admin` or `/api`.

### Payload collections (`src/collections/`)

`Users` (admin, roles) · `Students` (NO Payload auth — plain collection: email/name/stripeCustomerId/loginNonce) · `Courses` (modules → lessons NESTED as arrays, plus catalog/landing/faq/forYes/forNo/announcements) · `Enrollments` · `Media`.

### Data layer (`src/lib/`)

- `payload.ts` — cached `getPayloadClient()` (Local API) for server components. Local API bypasses access control, so the frontend can read Students even though access is admin-only.
- `courses.ts` — `getCourseBySlug`, `getCatalogCourses`, `nextLiveSession`, `courseMaterials`, `courseAnnouncements`, and the doc→`CourseDetail`/`CatalogCard` mappers. Payload docs are typed locally (`CourseDoc`, `LessonDoc`…) and cast `as unknown as`.
- `session.ts` — **custom student session, independent of Payload auth** (which is only for `/admin`). Magic-link login: HMAC-signed tokens/cookie using `PAYLOAD_SECRET`, single-use via a rotating `loginNonce`. Cookie `adn_session`.
- `stripe.ts`, `email.ts` (Resend).

`src/data/` holds static front content (`home.ts`, `recursos.ts`, `formacion.ts` header/method/testimonial) and **types only** (`curso.ts`). Course catalog/detail come from Payload, not `src/data`.

### Dual title model on courses

`title` = short name (catalog, breadcrumbs, metadata) + `accent`; `headline` = long hero title + `headlineAccent` (falls back to `title` if empty).

### Payment flow

Button `components/curso/CheckoutButton.tsx` → `POST /api/checkout` (reads course+price from Payload by slug, **never trusts client price**, requires `status:"open"`, normalizes `NEXT_PUBLIC_SERVER_URL` to add protocol/strip trailing slash) → Stripe Checkout → `POST /api/stripe/webhook` (`checkout.session.completed`) upserts Student + idempotent Enrollment. **Payload/Postgres IDs are integers**; Stripe metadata is always strings → `Number(metadata.courseId)` before creating the Enrollment.

### Schema migrations caveat

Postgres push **omits destructive changes**. Changing a collection's auth/structure may require `DROP SCHEMA public CASCADE; CREATE SCHEMA public;` then reseed (dev only).

## Testing

```bash
npm test          # vitest run — single pass
npm run test:watch # vitest — watch mode
```

- Runner is **Vitest**, configured in **`vitest.config.mts`**. The extension is `.mts` on purpose: `package.json` has no `"type": "module"`, so a `.ts` config gets loaded as CommonJS and Vite's ESM-only internals fail to load — `.mts` forces ESM without touching `package.json`. Path aliases (`@/*`, `@payload-config`) are defined manually in that config (no `vite-tsconfig-paths` dependency).
- **Test location convention**: unit tests are **co-located** next to the module (`src/lib/foo.test.ts` beside `foo.ts`). Cross-cutting / smoke tests live in **`src/__tests__/`**.
- Tests import `vitest` explicitly (`import { describe, it, expect } from "vitest"`) — `globals` is off, so `tsconfig.json` is left untouched.
- Scope so far is **pure functions only** (no DB/Payload/Stripe/network). The pure mappers/helpers in `src/lib/courses.ts` are covered (`toCourseDetail`, `toCatalogCard`, `nextLiveSession`, `courseMaterials`, `courseAnnouncements`).

### Caveat: reduced ICU in the test environment

The test runtime (this Node/Vitest) ships with **reduced ICU locale data**, so `toLocaleString("es-ES")` does **not** reproduce the thousands separator it produces in production (e.g. `149900` cents → `"1499€"` under test, `"1.499€"` in prod). Because of this, the `euros` price-format test is written to be **tolerant of the separator** (it asserts the rounding logic exactly and matches the separator loosely). The root-cause fix would be running tests on a **full-ICU Node** (e.g. `full-icu` / a Node build with complete ICU) — **pending, not done**.

### Future refactor candidate (not done): `computeProgress`

The progress formula `Math.round((completed / total) * 100)` currently lives **inline inside `getStudentCourses`** (which calls Payload), so it can't be unit-tested in isolation. A future, deliberate step could **extract it to a pure exported `computeProgress(total, completedLessons)`** and test it. Not refactored yet — do not extract it ad hoc.

### Claude Code hooks

Two hooks are wired up (don't be surprised by them):

- **`block-secrets`** (global, `~/.claude/hooks/` — not in this repo): a `PreToolUse` hook that **blocks** (exit 2) reading/writing secret files (`.env*` except `.env.example`, `*.pem`/`*.key`, ssh keys, `secrets.*`) and Bash commands containing secrets (Postgres URLs with passwords, `ghp_`/`sk_live`/`whsec_`/etc. tokens). If a legitimate action gets blocked, that's why.
- **`typecheck`** (project, `.claude/hooks/typecheck.mjs` + `.claude/settings.json`): a `SubagentStop` hook that runs `npx tsc --noEmit` when a subagent finishes and **warns via `systemMessage` without blocking** (always exit 0; guarded by `stop_hook_active`). It does **not** run lint or tests (kept fast, ~4s).

**Known baseline debt** the typecheck/lint will report — these are pre-existing, do NOT mass-fix them: **4× TS2532** ("possibly undefined") in `src/lib/courses.test.ts`, and **9 ESLint errors** (6× `@next/next/no-html-link-for-pages` in `Header.tsx`, 3× `react-hooks/set-state-in-effect`). After a change, check only whether you introduced something *new* on top of this baseline.

## Conventions

- **Mobile-first always**: `grid-cols-1` by default + `lg:` for multi-column. Do NOT use `col-[1/3]`/`row-[1/3]` with `max-lg:` overrides (the span creates an implicit column and overflows). `body { overflow-x: clip }` is the safety net (not `overflow:hidden` — that breaks the sticky header).
- Header is a client component using `usePathname` (active state + hamburger on `max-md`). It reads session via `GET /api/auth/me` so public pages stay static.
- Shared UI in `components/ui/`: `PageHeader`, `AccentTitle`, `ResourceCard`.
- Fonts are Google substitutes for the paid brand fonts; swapping = `next/font/local` in the frontend layout. `Big_Shoulders` uses `adjustFontFallback:false`.

## Status / pending

Phase 1 (sell + deliver courses) is built and live. Pending: **4.5** real video (Bunny) + R2 storage — until then, seed media (lesson SVG, CSV material) 404s on Vercel's ephemeral disk; **4.7** certificates, admin polish, rotate seed admin credentials, finish Stripe dashboard config (branding, receipts, Spain business data, IVA/Stripe Tax — `automatic_tax` is pre-wired in `/api/checkout`). Full plan: `/Users/santi/.claude/plans/scalable-baking-otter.md`.
