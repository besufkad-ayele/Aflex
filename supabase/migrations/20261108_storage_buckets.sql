-- AFLEX CMS Storage Buckets
-- Project: qezexucrwwdxgotpofph
-- Date: 2026-11-08

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public-media',
  'public-media',
  true,
  20971520,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/mp4']
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'bid-documents',
  'bid-documents',
  true,
  52428800,
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'applicant-dossiers',
  'applicant-dossiers',
  false,
  10485760,
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
  CREATE POLICY "Public read on media"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'public-media');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated staff can upload media"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'public-media');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Public read bid documents"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'bid-documents');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated staff can upload bid documents"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'bid-documents');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "HR can access applicant dossiers"
    ON storage.objects FOR ALL
    TO authenticated
    USING (
      bucket_id = 'applicant-dossiers'
      AND EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('hr_manager', 'super_admin')
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
