-- Curated social video posts for Media hub tabs (YouTube / TikTok / Facebook)

CREATE TABLE IF NOT EXISTS public.media_social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'facebook', 'youtube')),
  title TEXT NOT NULL,
  post_url TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  external_id TEXT,
  thumbnail_url TEXT,
  caption TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS media_social_posts_platform_idx
  ON public.media_social_posts (platform, sort_order, published_at DESC);

ALTER TABLE public.media_social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published social posts"
  ON public.media_social_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Staff full access social posts"
  ON public.media_social_posts FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
