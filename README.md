# Biofix

**Keep every machine working.** Biofix is a Progressive Web App that helps hospitals in Nigeria track medical equipment, report broken machines and hire verified biomedical technicians.

This repository is the **frontend only**. All data comes from a typed mock API in `lib/api` that simulates network latency and occasional errors, so it can be swapped for Supabase without touching UI components.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000 and use the **Demo accounts** on `/login` (password `biofix123`):

| Role | Email | Lands on |
| --- | --- | --- |
| Hospital Admin | admin@biofix.demo | `/hospital` |
| Nurse | nurse@biofix.demo | `/nurse` |
| Technician | tech@biofix.demo | `/tech` |
| Super Admin | super@biofix.demo | `/admin` |

Mock data is persisted in `localStorage` (`biofix:mock-db:v1`), so a job reported as a nurse is visible to the admin and technician in the same browser. Clear that key to reset the seed data.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack, service worker disabled) |
| `npm run build` | Production build with webpack (required by `@serwist/next`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, strict mode |
| `npm run check:lines` | Fails if any source file exceeds 150 lines |

## Environment

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://biofix.ng` | Canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_MOCK_ERROR_RATE` | `0.03` | Chance a mock read fails, to exercise error states |

## Project structure

```
app/                 Routes (thin pages that compose components and export metadata)
components/ui        Base primitives (Radix + Tailwind, shadcn-style)
components/shared    App-level reusable components
components/marketing Landing page sections (Server Components)
components/seo       JSON-LD components
components/{hospital,nurse,tech,admin,machine,auth}  Role-specific components
hooks/               React Query hooks, the only way UI talks to the API
lib/api              Mock API, one module per domain
lib/mock-data        Nigerian seed data
lib/seo              Site config and buildMetadata helper
lib/validation       zod schemas for every form
types/               All domain types
```
