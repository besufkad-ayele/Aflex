# 02 — Database Schema & Row Level Security (RLS)

**Module:** AFLEX CMS Database Engine  
**Database:** PostgreSQL 15+ (Supabase Managed)  
**Host URL:** `https://qezexucrwwdxgotpofph.supabase.co`  
**Execution:** Ready to copy-paste directly into the Supabase SQL Editor  

---

## 1. Migration DDL: Extensions, Enums & Tables

```sql
-- ==============================================================================
-- 1. EXTENSIONS
-- ==============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "citext";

-- ==============================================================================
-- 2. ENUMS
-- ==============================================================================
DO $$ BEGIN
  CREATE TYPE user_role_type AS ENUM (
    'super_admin',
    'academic_director',
    'comms_officer',
    'hr_procurement_officer',
    'editorial_reviewer',
    'auditor'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE publication_status AS ENUM (
    'draft',
    'in_review',
    'approved',
    'published',
    'archived'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE procurement_category AS ENUM (
    'Works',
    'Goods',
    'Consultancy Services',
    'Non-Consultancy Services'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. STAFF PROFILES & RBAC IDENTITIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email CITEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  department TEXT NOT NULL,
  role user_role_type NOT NULL DEFAULT 'comms_officer',
  phone TEXT,
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. NEWS & PRESS ARTICLES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content JSONB NOT NULL, -- TipTap / ProseMirror rich text AST
  category TEXT NOT NULL DEFAULT 'ACADEMY', -- 'ACADEMY', 'CAMPUS', 'INSIGHT', 'RESEARCH', 'PRESS'
  featured BOOLEAN NOT NULL DEFAULT false,
  hero_image_url TEXT NOT NULL,
  hero_caption TEXT,
  read_time_minutes INT NOT NULL DEFAULT 4,
  language_code VARCHAR(5) NOT NULL DEFAULT 'en', -- 'en', 'am', 'om', 'so', 'ti', etc.
  translation_group_id UUID NOT NULL DEFAULT gen_random_uuid(), -- Groups translations of same story
  status publication_status NOT NULL DEFAULT 'draft',
  editorial_notes TEXT, -- Feedback left during review
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT news_slug_lang_unique UNIQUE (slug, language_code)
);

-- Full-text search index on title & excerpt
CREATE INDEX IF NOT EXISTS idx_news_fts ON public.news_articles 
USING gin(to_tsvector('english', title || ' ' || excerpt));

-- ==============================================================================
-- 5. ACADEMIC PROGRAMS & CURRICULA
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.programs (
  id TEXT PRIMARY KEY, -- 'leadership-development', 'project-wild', 'psle'
  code TEXT NOT NULL, -- e.g. '01 / SHORT-TERM · 3–10 DAYS'
  title TEXT NOT NULL,
  lead TEXT NOT NULL,
  full_description TEXT NOT NULL,
  format TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  hero_image_url TEXT NOT NULL,
  modules JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of module syllabus titles
  outcomes JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of tangible competencies
  structure JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of cohort phases
  admissions_note TEXT,
  language_code VARCHAR(5) NOT NULL DEFAULT 'en',
  status publication_status NOT NULL DEFAULT 'published',
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 6. VACANCIES & APPOINTMENTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.vacancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Academic', 'Operations', 'Digital Systems', 'Strategic Relations'
  location TEXT NOT NULL DEFAULT 'Sululta Campus, Oromia',
  type TEXT NOT NULL DEFAULT 'Full-time · Federal Appointment',
  experience_level TEXT NOT NULL,
  summary TEXT NOT NULL,
  duties JSONB NOT NULL DEFAULT '[]'::jsonb,
  requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
  compensation TEXT NOT NULL,
  deadline DATE NOT NULL,
  status publication_status NOT NULL DEFAULT 'published',
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 7. PUBLIC PROCUREMENT & TENDERS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.procurement_tenders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tender_ref_number TEXT UNIQUE NOT NULL, -- e.g. 'AFLEX/NCB/01/2026'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category procurement_category NOT NULL DEFAULT 'Goods',
  document_url TEXT NOT NULL, -- Supabase Storage download link for TOR / Bidding Document
  document_size_bytes BIGINT,
  bid_bond_amount TEXT,
  submission_deadline TIMESTAMPTZ NOT NULL,
  opening_date TIMESTAMPTZ NOT NULL,
  status publication_status NOT NULL DEFAULT 'published',
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 8. MEDIA ASSET REGISTRY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL UNIQUE,
  mime_type TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  width INT,
  height INT,
  alt_text TEXT NOT NULL, -- Enforced accessibility
  caption TEXT,
  album TEXT DEFAULT 'General',
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 9. EMERGENCY BANNER & ACADEMY BROADCASTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.emergency_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_en TEXT NOT NULL,
  message_am TEXT NOT NULL,
  message_om TEXT,
  banner_type TEXT NOT NULL DEFAULT 'info', -- 'info', 'warning', 'urgent'
  cta_label TEXT,
  cta_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 10. IMMUTABLE AUDIT TRAIL
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  user_role user_role_type NOT NULL,
  action TEXT NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'ARCHIVE', 'RETRACT'
  entity_type TEXT NOT NULL, -- 'news_articles', 'programs', 'vacancies', 'tenders'
  entity_id TEXT NOT NULL,
  changes JSONB NOT NULL DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_entity ON public.audit_logs (entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON public.audit_logs (created_at DESC);
```

---

## 2. Row Level Security (RLS) Policies

```sql
-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procurement_tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Get user role from session
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS user_role_type AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() AND is_active = true;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ==============================================================================
-- PROFILES POLICIES
-- ==============================================================================
CREATE POLICY "Public profiles are visible to authenticated staff"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Super Admins can manage all profiles"
  ON public.profiles FOR ALL
  TO authenticated
  USING (public.get_auth_role() = 'super_admin');

-- ==============================================================================
-- NEWS POLICIES
-- ==============================================================================
-- 1. Public can read published articles
CREATE POLICY "Public reads published news"
  ON public.news_articles FOR SELECT
  USING (status = 'published');

-- 2. Staff can read all news drafts
CREATE POLICY "Staff views all news"
  ON public.news_articles FOR SELECT
  TO authenticated
  USING (public.get_auth_role() IS NOT NULL);

-- 3. Comms and Super Admins can insert/update news
CREATE POLICY "Comms and Reviewers can author news"
  ON public.news_articles FOR INSERT
  TO authenticated
  WITH CHECK (public.get_auth_role() IN ('comms_officer', 'editorial_reviewer', 'super_admin'));

CREATE POLICY "Comms and Reviewers can update news"
  ON public.news_articles FOR UPDATE
  TO authenticated
  USING (public.get_auth_role() IN ('comms_officer', 'editorial_reviewer', 'super_admin'));

-- 4. Only Editorial Reviewer and Super Admin can publish news
CREATE POLICY "Only Reviewer and Super Admin can publish news"
  ON public.news_articles FOR UPDATE
  TO authenticated
  USING (
    public.get_auth_role() IN ('editorial_reviewer', 'super_admin')
    OR (status <> 'published')
  );

-- ==============================================================================
-- VACANCIES POLICIES
-- ==============================================================================
CREATE POLICY "Public reads active vacancies"
  ON public.vacancies FOR SELECT
  USING (status = 'published' AND deadline >= CURRENT_DATE);

CREATE POLICY "Staff views all vacancies"
  ON public.vacancies FOR SELECT
  TO authenticated
  USING (public.get_auth_role() IS NOT NULL);

CREATE POLICY "HR officers manage vacancies"
  ON public.vacancies FOR ALL
  TO authenticated
  USING (public.get_auth_role() IN ('hr_procurement_officer', 'super_admin'));

-- ==============================================================================
-- PROCUREMENT POLICIES
-- ==============================================================================
CREATE POLICY "Public reads active tenders"
  ON public.procurement_tenders FOR SELECT
  USING (status = 'published' AND submission_deadline >= NOW());

CREATE POLICY "Staff views all tenders"
  ON public.procurement_tenders FOR SELECT
  TO authenticated
  USING (public.get_auth_role() IS NOT NULL);

CREATE POLICY "Procurement officers manage tenders"
  ON public.procurement_tenders FOR ALL
  TO authenticated
  USING (public.get_auth_role() IN ('hr_procurement_officer', 'super_admin'));

-- ==============================================================================
-- AUDIT LOGS POLICIES (IMMUTABLE)
-- ==============================================================================
-- No user can update or delete audit logs
CREATE POLICY "Auditors and Super Admins can inspect audit logs"
  ON public.audit_logs FOR SELECT
  TO authenticated
  USING (public.get_auth_role() IN ('auditor', 'super_admin'));

CREATE POLICY "System can append audit logs"
  ON public.audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

---

## 3. Automated Timestamps & Audit Log Triggers

```sql
-- Trigger to keep updated_at in sync
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_news_timestamp
BEFORE UPDATE ON public.news_articles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_vacancies_timestamp
BEFORE UPDATE ON public.vacancies
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_tenders_timestamp
BEFORE UPDATE ON public.procurement_tenders
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

