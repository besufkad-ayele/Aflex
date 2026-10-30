-- AFLEX CMS Database Schema
-- Project: qezexucrwwdxgotpofph
-- Date: 2026-10-30

-- 1. Create Enums
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('super_admin', 'editor', 'procurement_officer', 'hr_manager', 'translator', 'viewer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE content_status AS ENUM ('draft', 'review_pending', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. User Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'viewer',
  department TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. News Articles (Multilingual)
CREATE TABLE IF NOT EXISTS public.news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'Institutional',
  published_at DATE DEFAULT CURRENT_DATE,
  hero_image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  status content_status NOT NULL DEFAULT 'draft',
  title_en TEXT NOT NULL,
  lead_en TEXT,
  body_en TEXT,
  title_am TEXT,
  lead_am TEXT,
  body_am TEXT,
  title_om TEXT,
  lead_om TEXT,
  body_om TEXT,
  author_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Academic & Leadership Programs
CREATE TABLE IF NOT EXISTS public.programs (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  lead TEXT,
  full_description TEXT,
  format TEXT,
  target_audience TEXT,
  hero_image_url TEXT,
  modules JSONB DEFAULT '[]'::jsonb,
  outcomes JSONB DEFAULT '[]'::jsonb,
  structure JSONB DEFAULT '[]'::jsonb,
  admissions_note TEXT,
  language_code VARCHAR(10) NOT NULL DEFAULT 'en',
  status content_status NOT NULL DEFAULT 'published',
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Vacancies & Careers
CREATE TABLE IF NOT EXISTS public.vacancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_no TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Sululta, Ethiopia',
  employment_type TEXT NOT NULL DEFAULT 'Full-Time',
  positions_available INTEGER NOT NULL DEFAULT 1,
  deadline DATE NOT NULL,
  requirements TEXT,
  responsibilities TEXT,
  status content_status NOT NULL DEFAULT 'published',
  application_url TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Procurement & Tenders
CREATE TABLE IF NOT EXISTS public.procurement_tenders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tender_no TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  procurement_type TEXT NOT NULL DEFAULT 'NCB',
  closing_date TIMESTAMPTZ NOT NULL,
  bid_bond_amount NUMERIC(14, 2),
  bid_bond_currency VARCHAR(5) DEFAULT 'ETB',
  tor_document_url TEXT,
  status content_status NOT NULL DEFAULT 'published',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Media Assets
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  bucket_id TEXT NOT NULL DEFAULT 'public-media',
  storage_path TEXT NOT NULL UNIQUE,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  alt_text TEXT,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Emergency Banners
CREATE TABLE IF NOT EXISTS public.emergency_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_en TEXT NOT NULL,
  message_am TEXT,
  message_om TEXT,
  alert_level TEXT NOT NULL DEFAULT 'info',
  is_active BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  target_table TEXT NOT NULL,
  target_id TEXT,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procurement_tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 11. Policies
-- Public Read for Published Content
CREATE POLICY "Public read published news" ON public.news_articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published programs" ON public.programs FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published vacancies" ON public.vacancies FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published tenders" ON public.procurement_tenders FOR SELECT USING (status = 'published');
CREATE POLICY "Public read active banners" ON public.emergency_banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public read media assets" ON public.media_assets FOR SELECT USING (true);

-- Authenticated Users Policies
CREATE POLICY "Staff read profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Super Admin full access
CREATE POLICY "Super admin all profiles" ON public.profiles FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);
CREATE POLICY "Staff full access news" ON public.news_articles FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
);
CREATE POLICY "Staff full access programs" ON public.programs FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
);
CREATE POLICY "Staff full access vacancies" ON public.vacancies FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'hr_manager'))
);
CREATE POLICY "Staff full access tenders" ON public.procurement_tenders FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'procurement_officer'))
);
CREATE POLICY "Staff full access media" ON public.media_assets FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor', 'procurement_officer', 'hr_manager'))
);
CREATE POLICY "Staff full access banners" ON public.emergency_banners FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);
CREATE POLICY "Audit logs insert" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Audit logs select super_admin" ON public.audit_logs FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

