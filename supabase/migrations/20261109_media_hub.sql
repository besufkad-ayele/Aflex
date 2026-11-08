-- Media hub: curated gallery items + social feed embeds (TikTok / Facebook / YouTube)

CREATE TABLE IF NOT EXISTS public.media_gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  album TEXT NOT NULL DEFAULT 'Campus',
  media_type TEXT NOT NULL CHECK (media_type IN ('photo', 'video')),
  image_url TEXT NOT NULL,
  video_url TEXT,
  shape TEXT NOT NULL DEFAULT 'standard' CHECK (shape IN ('tall', 'wide', 'standard')),
  caption TEXT,
  status TEXT NOT NULL DEFAULT 'published'
    CHECK (status IN ('draft', 'review_pending', 'in_review', 'approved', 'published', 'archived')),
  sort_order INT NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.media_social_feeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL UNIQUE CHECK (platform IN ('tiktok', 'facebook', 'youtube')),
  label TEXT NOT NULL,
  handle TEXT,
  profile_url TEXT NOT NULL,
  embed_url TEXT,
  embed_html TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.media_gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_social_feeds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published gallery items"
  ON public.media_gallery_items FOR SELECT
  USING (status = 'published');

CREATE POLICY "Staff full access gallery items"
  ON public.media_gallery_items FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public read published social feeds"
  ON public.media_social_feeds FOR SELECT
  USING (is_published = true);

CREATE POLICY "Staff full access social feeds"
  ON public.media_social_feeds FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO public.media_social_feeds (platform, label, handle, profile_url, embed_url, sort_order)
VALUES
  (
    'tiktok',
    'TikTok',
    '@aflex_academy',
    'https://www.tiktok.com/@aflex_academy',
    NULL,
    1
  ),
  (
    'facebook',
    'Facebook',
    '/aflexacademy.gov.et',
    'https://www.facebook.com/aflexacademy.gov.et',
    'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Faflexacademy.gov.et&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true',
    2
  ),
  (
    'youtube',
    'YouTube',
    '@AfricanLeadershipExcellenceAca',
    'https://www.youtube.com/@AfricanLeadershipExcellenceAca',
    'https://www.youtube.com/embed?listType=playlist&list=PLrAXtmRdnEQy6nuLMHjMZRAeD5SFlY_Ck',
    3
  )
ON CONFLICT (platform) DO NOTHING;
