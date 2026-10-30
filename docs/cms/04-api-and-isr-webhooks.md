# 04 — API Routes, Storage Buckets & On-Demand ISR Webhooks

**Module:** AFLEX CMS Integration & Cache Invalidation  
**Framework:** Next.js 16 (App Router) + Supabase Edge Functions  
**Security:** HMAC / Shared Secret Token Verification  

---

## 1. Next.js 16 Supabase Client Setup

To maintain secure session management across Server Components, Server Actions, and Client Components, install and configure `@supabase/ssr`:

### 1.1. Required Packages
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 1.2. Server Client Factory (`src/lib/supabase/server.ts`)
```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}

// Privileged service-role client for administrative actions and audit logging
export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  );
}
```

---

## 2. On-Demand Incremental Static Regeneration (ISR) Webhook

When a record is published, edited, or archived in the CMS, the public web portal must reflect the new content instantly without rebuilding the entire application.

### 2.1. Webhook Route Handler (`src/app/api/revalidate/route.ts`)
```ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "@/lib/i18n";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-revalidation-secret");
    const secret = process.env.REVALIDATION_SECRET_TOKEN;

    if (!secret || authHeader !== secret) {
      return NextResponse.json({ error: "Invalid revalidation secret" }, { status: 401 });
    }

    const body = await request.json();
    const { table, record, old_record } = body;

    const pathsToRevalidate: string[] = ["/"];

    switch (table) {
      case "news_articles":
        pathsToRevalidate.push("/news");
        if (record?.slug) pathsToRevalidate.push(`/news/${record.slug}`);
        if (old_record?.slug) pathsToRevalidate.push(`/news/${old_record.slug}`);
        // Revalidate all localized paths
        locales.forEach((loc) => {
          pathsToRevalidate.push(`/${loc}`);
          pathsToRevalidate.push(`/${loc}/news`);
          if (record?.slug) pathsToRevalidate.push(`/${loc}/news/${record.slug}`);
        });
        break;

      case "programs":
        pathsToRevalidate.push("/programs", "/catalog");
        locales.forEach((loc) => {
          pathsToRevalidate.push(`/${loc}/programs`);
        });
        break;

      case "vacancies":
        pathsToRevalidate.push("/vacancy");
        if (record?.id) pathsToRevalidate.push(`/vacancy/${record.id}`);
        break;

      case "procurement_tenders":
        pathsToRevalidate.push("/procurement");
        break;

      default:
        return NextResponse.json({ message: "No purge rules for table", table }, { status: 200 });
    }

    // Execute revalidation across all matching routes
    pathsToRevalidate.forEach((path) => {
      revalidatePath(path);
    });

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      paths: pathsToRevalidate,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal revalidation error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
```

---

## 3. Supabase Storage Buckets Configuration

Run this SQL snippet in the Supabase SQL editor to provision the official storage buckets with strict MIME-type and size limits:

```sql
-- 1. Create Media Bucket (Public Read, Authenticated Write)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public-media',
  'public-media',
  true,
  20971520, -- 20MB Max
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/mp4']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Create Bid Documents Bucket (Public Download, Authenticated Upload)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'bid-documents',
  'bid-documents',
  true,
  52428800, -- 50MB Max
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- 3. Create Private Applicant Dossiers Bucket (Restricted to HR)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'applicant-dossiers',
  'applicant-dossiers',
  false,
  10485760, -- 10MB Max
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public read on media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'public-media');

CREATE POLICY "Authenticated staff can upload media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'public-media');

CREATE POLICY "HR can access applicant dossiers"
  ON storage.objects FOR ALL
  TO authenticated
  USING (
    bucket_id = 'applicant-dossiers'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('hr_procurement_officer', 'super_admin')
    )
  );
```

---

## 4. Production Security & Rollout Checklist

| Phase | Milestone | Acceptance Criteria |
| :--- | :--- | :--- |
| **Phase 1** | **DDL Deployment** | Run `docs/cms/02-database-schema-and-rls.md` in Supabase SQL editor; confirm all 7 tables and enums are created. |
| **Phase 2** | **Initial Admin Provisioning** | Create the first `super_admin` record in `public.profiles` matching your Supabase Auth UID. |
| **Phase 3** | **Storage & Buckets** | Run storage DDL; verify test uploads of `.webp` photos and `.pdf` procurement files. |
| **Phase 4** | **Webhook Linking** | In Supabase Dashboard $\rightarrow$ Database $\rightarrow$ Webhooks, register `POST https://yourdomain.gov.et/api/revalidate` with `x-revalidation-secret`. |
| **Phase 5** | **Smoke Test Approval Cycle** | Create a test news article in `draft` $\rightarrow$ transition to `in_review` $\rightarrow$ approve as `editorial_reviewer` $\rightarrow$ verify instant reflection on `/news`. |

