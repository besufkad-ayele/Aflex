# AFLEX Academy Content Management & Governance System (CMS)

**Version:** 1.0  
**Target Environment:** Next.js 16 (App Router) + Supabase PostgreSQL  
**Connected Backend:** `https://qezexucrwwdxgotpofph.supabase.co`  
**Host Entity:** African Leadership Excellence Academy (AFLEX) · Federal Democratic Republic of Ethiopia  

---

## 1. Overview & Vision

The **AFLEX Content Management System (CMS)** is a tailored, secure, and sovereign administrative platform designed to empower Academy staff—communications officers, faculty deans, HR recruiters, and procurement officers—to manage public-facing content without requiring direct developer involvement or risking site instability.

### Core Institutional Requirements
1. **Federal Caliber & Integrity:** Content on `aflexacademy.gov.et` represents an institution training cabinet ministers, regional presidents, and continental delegates. Editorial control must be audit-tracked and strictly role-gated.
2. **Multilingual by Design:** Every content entity (news, programs, announcements) natively supports translations across **Amharic (`am`)**, **Afaan Oromoo (`om`)**, and **English (`en`)**, with extension capacity for other African languages.
3. **Instant Cache Revalidation (ISR):** Public pages are statically rendered for sub-second global performance. When an editor publishes an article or tender in the CMS, an on-demand revalidation webhook invalidates the Next.js cache instantaneously.
4. **Zero-Trust Security:** Built upon PostgreSQL Row Level Security (RLS) and Supabase Auth with granular Role-Based Access Control (RBAC).

---

## 2. Documentation Architecture

This specification is organized into four detailed modular manuals:

| Document | Purpose |
| :--- | :--- |
| [**`01-architecture-and-rbac.md`**](./01-architecture-and-rbac.md) | High-level system topology, role profiles, permission matrix, and editorial approval state machine. |
| [**`02-database-schema-and-rls.md`**](./02-database-schema-and-rls.md) | Complete PostgreSQL DDL migrations, tables, foreign keys, triggers, full-text search, and Row Level Security policies. |
| [**`03-dashboard-routes-and-ui.md`**](./03-dashboard-routes-and-ui.md) | Next.js App Router UI layout, dashboard screens (`/admin/*`), rich-text composer, and asset browser specs. |
| [**`04-api-and-isr-webhooks.md`**](./04-api-and-isr-webhooks.md) | Server Actions, Supabase Storage bucket rules, automated Next.js cache revalidation, and deployment runbook. |

---

## 3. Technology Stack

- **Framework:** Next.js 16.3.2 (App Router with Server Actions & `@supabase/ssr`)
- **Database & Identity:** Supabase PostgreSQL with Row Level Security (RLS) & Auth
- **Storage:** Supabase S3-compatible Object Storage for media assets and PDF bid documents
- **Rich Text Editor:** TipTap / ProseMirror with custom Callout and Pull-Quote blocks
- **Styling:** Tailwind CSS v4 using the AFLEX Sovereign Palette (Gold `#9e8c39`, Blue `#1e73be`, Black `#000000`, White `#ffffff`)
- **Cache Management:** Next.js `revalidatePath` and `revalidateTag` via database webhooks

---

## 4. Quick Reference: Environment Configuration

The CMS relies on the configured credentials in `.env.local` and `.vscode/mcp.json`:

```bash
# Supabase Production Backend
NEXT_PUBLIC_SUPABASE_URL="https://qezexucrwwdxgotpofph.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_public_key_here"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_secret_here"
SUPABASE_ACCESS_TOKEN="your_personal_access_token_here"
SUPABASE_PROJECT_REF="qezexucrwwdxgotpofph"

# Cache Invalidation Secret (Shared between Supabase Webhooks & Next.js API)
REVALIDATION_SECRET_TOKEN="generate_strong_secret_token_here"
```

