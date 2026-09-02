# Skild

> [!NOTE]
> This project is under active early-stage setup. Expect the structure and conventions documented here to evolve as real features land.

## Tech Stack

| Layer            | Technology                                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework        | [TanStack Start](https://tanstack.com/start) (React 19, SSR) on [Vite](https://vitejs.dev/) 8                                                            |
| Routing          | [TanStack Router](https://tanstack.com/router) (file-based, type-safe)                                                                                   |
| Server           | [Nitro](https://nitro.build/) — deploys as a self-contained Node server, or to any Nitro-supported host                                                  |
| Data fetching    | [TanStack Query](https://tanstack.com/query)                                                                                                             |
| Forms            | [TanStack Form](https://tanstack.com/form)                                                                                                               |
| Auth             | [better-auth](https://www.better-auth.com/) (email/password, cookie-based)                                                                               |
| Styling          | [Tailwind CSS v4](https://tailwindcss.com/) + [HeroUI v3](https://heroui.com/)                                                                           |
| Icons            | [Iconify](https://iconify.design/) via `@iconify-icon/react` (`gravity-ui:*`, `lucide:*` sets)                                                           |
| Fonts            | [Space Grotesk](https://fontsource.org/fonts/space-grotesk) + [JetBrains Mono](https://fontsource.org/fonts/jetbrains-mono) (self-hosted via Fontsource) |
| Validation / env | [Zod](https://zod.dev/) + [`@t3-oss/env-core`](https://env.t3.gg/)                                                                                       |
| Tooling          | [Biome](https://biomejs.dev/) (lint + format), TypeScript (strict)                                                                                       |
| Package manager  | [pnpm](https://pnpm.io/) `11.25.0` (pinned via `packageManager`)                                                                                         |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (recent LTS)
- [pnpm](https://pnpm.io/) — install via [Corepack](https://pnpm.io/installation#using-corepack): `corepack enable`

### Installation

```bash
pnpm install
```

### Environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable             | Description                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| `BETTER_AUTH_URL`    | Base URL better-auth uses for callbacks/cookies (e.g. `http://localhost:3000`)  |
| `BETTER_AUTH_SECRET` | Secret used to sign sessions — generate with `pnpm dlx @better-auth/cli secret` |
| `VITE_SITE_URL`      | Public site URL, used for canonical links and Open Graph tags                   |

### Run the dev server

```bash
pnpm dev
```

The app is served at `http://localhost:3000`.

## Available Scripts

| Command                | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| `pnpm dev`             | Start the Vite dev server on port 3000                       |
| `pnpm build`           | Build for production (outputs to `.output/`)                 |
| `pnpm start`           | Run the production build (`node .output/server/index.mjs`)   |
| `pnpm preview`         | Preview the production build locally                         |
| `pnpm generate-routes` | Regenerate `src/routeTree.gen.ts` from the file-based routes |
| `pnpm check`           | Run Biome lint + format checks                               |
| `pnpm format`          | Auto-fix lint/format issues                                  |
| `pnpm outdated`        | List outdated dependencies, grouped                          |

## Project Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── header/           # App header: brand mark, nav, theme toggle, mobile drawer
│   │   └── footer.tsx        # Site footer with attribution
│   └── providers/            # Composable app-wide providers (RootProvider)
├── config/
│   ├── env.ts                # Typed, validated environment variables (@t3-oss/env-core)
│   ├── route.ts               # Shared nav route config (desktop nav + mobile drawer)
│   └── site.ts                # Site metadata: SEO, Open Graph, JSON-LD, theme color, favicon
├── integrations/
│   ├── app-theme/             # Light/dark/system theme system (cookie-persisted, SSR-safe)
│   ├── better-auth/           # Auth UI integration
│   └── tanstack-query/        # Query client provider + devtools
├── lib/
│   ├── auth.ts                # better-auth server instance
│   ├── auth-client.ts         # better-auth React client
│   └── utils.ts               # Shared helpers
├── routes/
│   ├── __root.tsx             # Root route: HTML shell, head/meta, providers, header/footer
│   ├── index.tsx              # Home route
│   └── api/auth/$.ts          # better-auth catch-all API route
├── styles/global.css          # Tailwind entry + design tokens
├── router.tsx                 # Router instance
└── routeTree.gen.ts           # Generated — do not edit by hand
```

## Key Features

- **SSR-safe theming** — light/dark/system theme resolved server-side from a cookie (no flash-of-wrong-theme), with client-side niceties layered on top: live OS theme sync, cross-tab sync via `BroadcastChannel`, and transition suppression while switching. A single toggle button in the header cycles through the three modes. See [`src/integrations/app-theme`](src/integrations/app-theme) and [`src/components/layout/header`](src/components/layout/header).
- **Route-driven navigation** — desktop nav and the mobile drawer both render from one shared `navRoute` config, keeping labels and login-gated items in sync across breakpoints. See [`src/config/route.ts`](src/config/route.ts).
- **Typed environment config** — env vars are validated with Zod and split into `server`/`client` scopes via `@t3-oss/env-core`, so a server-only secret can never leak into client code. See [`src/config/env.ts`](src/config/env.ts).
- **Centralized SEO/head config** — `src/config/site.ts` generates meta tags, Open Graph, canonical links, `theme-color`, favicon, and JSON-LD structured data for any route. See [`src/config/site.ts`](src/config/site.ts).
- **Auth scaffolding** — email/password auth via better-auth, mounted at `/api/auth/*`, stateless by default with an easy path to add a database.

## Deployment

This project uses Nitro as its server adapter, so the production build is a self-contained Node server:

```bash
pnpm build
pnpm start
```

Push the `.output/` directory to any Node-compatible host (Render, Fly.io, a VPS, etc.). For host-specific presets (Vercel, Netlify, Cloudflare, AWS Lambda, ...) and further tuning, see the [Nitro deployment docs](https://v3.nitro.build/deploy).

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) with tab indentation, single quotes, and organized imports enforced automatically:

```bash
pnpm check    # verify
pnpm format   # fix
```

## License

[MIT](LICENSE) © 2026 Pratama "Sam1Dz" Dimas
