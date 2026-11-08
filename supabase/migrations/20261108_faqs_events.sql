-- AFLEX CMS: FAQ + Events tables
-- Project: qezexucrwwdxgotpofph
-- Apply in Supabase Dashboard → SQL Editor if CLI/management token is unavailable.

CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL DEFAULT 'General',
  question_en TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  question_am TEXT,
  answer_am TEXT,
  question_om TEXT,
  answer_om TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  location TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  hero_image_url TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS faqs_status_sort_idx ON public.faqs (status, sort_order);
CREATE INDEX IF NOT EXISTS events_status_starts_idx ON public.events (status, starts_at);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public read published faqs" ON public.faqs
    FOR SELECT USING (status = 'published');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Staff full access faqs" ON public.faqs
    FOR ALL TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('super_admin', 'editor')
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('super_admin', 'editor')
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Public read published events" ON public.events
    FOR SELECT USING (status = 'published');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Staff full access events" ON public.events
    FOR ALL TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('super_admin', 'editor')
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('super_admin', 'editor')
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT ALL ON public.faqs TO authenticated;
GRANT SELECT ON public.events TO anon, authenticated;
GRANT ALL ON public.events TO authenticated;

-- Seed starter knowledge units (safe to re-run)
INSERT INTO public.faqs (category, question_en, answer_en, question_am, answer_am, question_om, answer_om, status, sort_order)
SELECT * FROM (VALUES
  (
    'Admissions & Curricula',
    'How can civil servants apply for the Public Service Leadership Excellence (PSLE) program?',
    'Nominations are coordinated through federal ministries and regional civil service bureaus, followed by executive assessment and AFLEX senate review.',
    'የመንግስት ሰራተኞች ለህዝብ አገልግሎት መሪነት ልህቀት (PSLE) ፕሮግራም እንዴት ማመልከት ይችላሉ?',
    'ምልመላው የሚከናወነው በሚኒስቴር መስሪያ ቤቶች እና በክልል ሲቪል ሰርቪስ ቢሮዎች በኩል ሲሆን፣ ከዚያም በአካዳሚው ሰኔት ይገመገማል።',
    'Hojjettoonni mootummaa sagantaa PSLE irratti akkamitti iyyachuu danda''u?',
    'Kaadhimamtoonni ministeerota federaalaa fi biirolee siivil sarvisii naannooleetiin dhiyaatu.',
    'published'::content_status,
    1
  ),
  (
    'Campus & Residency',
    'Where is the AFLEX main campus located, and what accommodation is available?',
    'The AFLEX campus is situated in Sululta, Oromia, 25 minutes north of Addis Ababa at 2,600m altitude. We offer 160 executive residential suites for program cohorts.',
    'የአፍሌክስ ዋና ግቢ የት ይገኛል? የመኝታ አገልግሎትስ አለ?',
    'አካዳሚው ከአዲስ አበባ በስተሰሜን በሱሉልታ ከተማ በ2600 ሜትር ከፍታ ላይ የሚገኝ ሲሆን፣ 160 ዘመናዊ የስራ አስፈፃሚ ማረፊያዎችን ያካትታል።',
    'Gabiin guddaan AFLEX eessatti argama? Tajaajilli bultii hoo jiraa?',
    'AFLEX Sulultatti argama; kutaalee bultii hoggantootaa 160 qaba.',
    'published'::content_status,
    2
  ),
  (
    'Procurement & Bids',
    'What are the CPO requirements for institutional procurement tenders?',
    'Tenderers must submit an unconditional Bank Guarantee or CPO from a recognized commercial bank of Ethiopia corresponding to the specified tender document.',
    'ለጨረታዎች የሲፒኦ (CPO) መስፈርት ምንድን ነው?',
    'ተጫራቾች በጨረታ ሰነዱ በተጠቀሰው መሰረት በኢትዮጵያ ንግድ ባንኮች የተረጋገጠ ሲፒኦ ማቅረብ ይጠበቅባቸዋል።',
    'Ulaagaan CPO caalbaasii maali?',
    'Dorgomtoonni wabiin baankii yookaan CPO dhiyaachuu qaba.',
    'published'::content_status,
    3
  )
) AS seed(category, question_en, answer_en, question_am, answer_am, question_om, answer_om, status, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.faqs LIMIT 1);

INSERT INTO public.events (slug, title, summary, location, starts_at, ends_at, status, featured)
SELECT * FROM (VALUES
  (
    'pan-african-executive-symposium-2026',
    'High-Level Pan-African Executive Leadership Symposium 2026',
    'Keynote: HE Prime Minister & AU Commission Leadership',
    'Nelson Mandela Great Hall, Sululta Campus',
    '2026-11-14T09:00:00+03:00'::timestamptz,
    '2026-11-17T17:00:00+03:00'::timestamptz,
    'published'::content_status,
    true
  ),
  (
    'project-wild-immersion-forum-2026',
    'Project WILD Continental Executive Immersion Forum',
    'Keynote: Leading African Women CEOs & executive mentors',
    'African Unity Executive Pavilion, Sululta',
    '2026-12-02T09:00:00+03:00'::timestamptz,
    '2026-12-05T17:00:00+03:00'::timestamptz,
    'published'::content_status,
    true
  ),
  (
    'psle-cohort-iv-graduation-2027',
    'Public Service Leadership Excellence (PSLE) Cohort IV Graduation',
    'Keynote: Federal Civil Service Commission & AFLEX Senate',
    'Main Amphitheater, AFLEX Sululta',
    '2027-01-20T10:00:00+03:00'::timestamptz,
    '2027-01-20T14:00:00+03:00'::timestamptz,
    'published'::content_status,
    false
  )
) AS seed(slug, title, summary, location, starts_at, ends_at, status, featured)
WHERE NOT EXISTS (SELECT 1 FROM public.events LIMIT 1);
