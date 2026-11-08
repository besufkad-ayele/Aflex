# AFLEX Academy Web Portal

Public website and administrative CMS for the **African Leadership Excellence Academy (AFLEX)** — Sululta, Ethiopia.

## Stack

- **Next.js 16** (App Router) + React 19
- **Supabase** (Auth, Postgres + RLS, Storage)
- **Tailwind CSS v4** + institutional design system
- **Gemini** for the Sululta Steward FAQ agent

## Getting started

```bash
pnpm install
cp .env.example .env.local
# Fill Supabase + Gemini + REVALIDATION_SECRET_TOKEN values
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin console: [http://localhost:3000/admin](http://localhost:3000/admin) (requires Supabase Auth login).

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only privileged key |
| `SUPABASE_ACCESS_TOKEN` | Personal access token (`sbp_…`) for CLI/MCP |
| `SUPABASE_PROJECT_REF` | Project ref (e.g. `qezexucrwwdxgotpofph`) |
| `REVALIDATION_SECRET_TOKEN` | Shared secret for `POST /api/revalidate` webhooks |
| `GEMINI_API_KEY` | Sululta Steward AI |

## Supabase setup

1. Apply schema: `supabase/migrations/20261030_cms_init.sql`
2. Apply storage: `supabase/migrations/20261108_storage_buckets.sql`
3. Apply FAQ/events: `supabase/migrations/20261108_faqs_events.sql`
4. Create the first Auth user, then insert a matching `public.profiles` row with `role = 'super_admin'`
5. (Optional) Database webhook → `POST /api/revalidate` with header `x-revalidation-secret: <REVALIDATION_SECRET_TOKEN>`

Connected project: `https://qezexucrwwdxgotpofph.supabase.co`

### Staff bootstrap SQL

```sql
insert into public.profiles (id, email, full_name, role)
values ('YOUR_AUTH_USER_UUID', 'you@aflex.edu.et', 'Your Name', 'super_admin');
```

## Content model

Public pages load **published** rows from Supabase when available, and fall back to static catalogs in `src/lib/*-data.ts`.

Admin writes go through the browser Supabase client (RLS) and trigger cache revalidation via authenticated server actions (`src/lib/cms/actions.ts`). External webhooks use `/api/revalidate`.

## Docs

- `docs/cms/` — CMS architecture, RBAC, schema, ISR webhooks
- `docs/02-prd.md` — product requirements
- `AGENTS.md` — Next.js agent notes for this repo
