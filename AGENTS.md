# AGENTS.md

MediaVaultUI is the React 19 + TypeScript + Vite frontend for a separate MediaVault backend API. There is no backend code, test suite, or test runner in this repo.

## Commands

- `npm install` (npm; `package-lock.json` is the source of truth)
- `npm run dev` — Vite dev server, requires the backend at the `VITE_URL` endpoint
- `npm run build` — runs `tsc -b` then `vite build`; this is the only typecheck
- `npm run lint` — ESLint; currently fails on pre-existing errors (see below)
- `npm run preview` — serve the production build

## Known lint state

`npm run lint` passes (exit 0) but reports pre-existing warnings: `exhaustive-deps` in `Catalog`, `Pagination`, `UpdateMedia`, and `react-refresh/only-export-components` in the context files. `npm run build` is the reliable verification step.

## Environment

- `.env` is committed and holds `VITE_URL=http://localhost:5000/api/v1`.
- All API calls are raw `axios` using `import.meta.env.VITE_URL`; there is no API client/abstraction. Preserve the existing URL/route shapes (`/`, `/:id`, `/addMedia`, `/auth/login`, `/auth/register`) when touching calls.
- Auth token lives in `localStorage` under `token`, sent as `Authorization: Bearer <token>`.
- Without a running backend, login and the home catalog will fail; build and lint do not need it.

## Architecture

- Routing uses `react-router` v7 (import from `"react-router"`, **not** `react-router-dom`). Route table: `src/routes/routes.tsx`, layout: `src/routes/RootLayout.tsx`.
- `AuthProvider` wraps all routes via `RootLayout`; `MediaProvider` wraps only `Home`. Components outside Home (e.g. Add/Update pages) cannot read `MediaContext`.
- `ProtectedRoute` guards `/` and `/add` only. `/:id/update` is intentionally or accidentally unguarded — be aware when changing auth behavior.
- Catalog data flow: `Filters` writes `queryString`/`currentAmount` into `MediaContext`; `Catalog`'s effect refetches on changes and writes results/pagination back into the same context.
- Filter query string is appended raw as `&score=&from=&to=&mediaType=&language=`. The UI score is 0–5 but is multiplied by 2 before being sent (`Filters.tsx`).
- `Media` items use `_id` (not `id`); values: `mediaType` ∈ movie/serie/anime/videogame/book, `language` ∈ spanish/english/sub-spanish.

## Styling

- Tailwind CSS v4 + daisyUI 5 via the Vite plugin. Entry is `src/index.css` (`@import "tailwindcss"; @plugin "daisyui";`). There is no `tailwind.config.js`; don't add one.
- UI uses daisyUI classes (`btn`, `input`, `select`, `join`, `drawer`, `tooltip`) and some raw popover APIs; match existing patterns.

## Deployment

- Vercel SPA deployment (`vercel.json` rewrites all paths to `/`). Because routing is client-side, don't add server-side assumptions.
