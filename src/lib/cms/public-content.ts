import { createClient } from '@/lib/supabase/server';
import { newsArticles, type NewsItem } from '@/lib/news-data';
import { programDetails } from '@/lib/programs-data';
import { vacancies as staticVacancies, type Vacancy as StaticVacancy } from '@/lib/vacancies-data';
import type {
  NewsArticle,
  Program,
  Vacancy as DbVacancy,
  ProcurementTender,
  FaqItem,
  AcademyEventRow,
  MediaGalleryItemRow,
  MediaSocialFeedRow,
  MediaSocialPostRow,
} from '@/lib/supabase/types';
import {
  mergeSocialFeeds,
  staticMediaItems,
  staticSocialPosts,
  type MediaSocialFeed,
  type MediaSocialPost,
  type PublicMediaItem,
} from '@/lib/media-hub';

function estimateReadTime(body: string | null, minutes?: number | null): string {
  if (minutes) return `${minutes} MIN READ`;
  const words = (body || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 200) || 4)} MIN READ`;
}

function formatNewsDate(isoDate: string | null | undefined): string {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}.${mm}.${yy}`;
}

function mapCategory(raw: string): NewsItem['category'] {
  const upper = raw.toUpperCase();
  if (upper.includes('CAMPUS')) return 'CAMPUS';
  if (upper.includes('INSIGHT')) return 'INSIGHT';
  if (upper.includes('RESEARCH') || upper.includes('POLICY')) return 'RESEARCH';
  if (upper.includes('PRESS') || upper.includes('MEDIA')) return 'PRESS';
  return 'ACADEMY';
}

export function mapNewsArticle(row: NewsArticle): NewsItem {
  const title = row.title || row.title_en || 'Untitled';
  const excerpt = row.excerpt || row.lead_en || '';
  const body = row.content || row.body_en || '';
  const paragraphs = body.includes('<')
    ? body
        .replace(/<\/p>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
    : body
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);

  return {
    slug: row.slug,
    title,
    category: mapCategory(row.category || 'ACADEMY'),
    date: formatNewsDate(row.published_at),
    readTime: estimateReadTime(body, row.read_time_minutes),
    image: row.hero_image_url || '/images/news2.png',
    author: 'AFLEX Editorial Desk',
    authorRole: 'African Leadership Excellence Academy',
    excerpt: excerpt || paragraphs[0] || '',
    content: paragraphs.length > 0 ? paragraphs : [excerpt || title],
    featured: Boolean(row.featured),
  };
}

export async function getPublishedNews(): Promise<NewsItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return (data as NewsArticle[]).map(mapNewsArticle);
    }
  } catch {
    // Fall through to static catalog
  }
  return newsArticles;
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (!error && data) {
      return mapNewsArticle(data as NewsArticle);
    }
  } catch {
    // Fall through
  }
  return newsArticles.find((item) => item.slug === slug) ?? null;
}

export type PublicProgram = (typeof programDetails)[number];

export function mapProgramRow(row: Program): PublicProgram {
  const modules = Array.isArray(row.modules)
    ? row.modules.map((m) => (typeof m === 'string' ? m : m.title))
    : [];
  const outcomes = Array.isArray(row.outcomes) ? row.outcomes.map(String) : [];
  const structure = Array.isArray(row.structure)
    ? row.structure.map((s) => (typeof s === 'string' ? s : `${s.label}: ${s.value}`))
    : undefined;

  return {
    id: row.id,
    code: row.code,
    title: row.title,
    meta: row.format || 'PROGRAM',
    copy: row.lead || '',
    fullDescription: row.full_description || row.lead || '',
    audience: row.target_audience || '',
    format: row.format || '',
    outcomes,
    modules,
    ...(structure ? { structure } : {}),
    note: row.admissions_note || undefined,
  } as PublicProgram;
}

export async function getPublishedPrograms(): Promise<PublicProgram[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('status', 'published')
      .order('code');

    if (!error && data && data.length > 0) {
      return (data as Program[]).map(mapProgramRow);
    }
  } catch {
    // Fall through
  }
  return programDetails;
}

export function mapVacancyRow(row: DbVacancy): StaticVacancy {
  const responsibilities = (row.duties || row.responsibilities || '')
    .split(/\n+/)
    .map((s) => s.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean);
  const requirements = (row.requirements || '')
    .split(/\n+/)
    .map((s) => s.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean);

  return {
    id: row.id,
    title: row.title,
    department: row.department,
    category: (row.category as StaticVacancy['category']) || 'Leadership & Executive',
    type: (row.type as StaticVacancy['type']) || (row.employment_type as StaticVacancy['type']) || 'Full-time',
    location: row.location || 'Sululta, Ethiopia',
    gradeLevel: row.experience_level || 'Institutional Appointment',
    deadline: row.deadline,
    closingDateISO: row.deadline,
    salaryRange: row.compensation || 'Competitive institutional scale',
    summary: row.summary || requirements[0] || row.title,
    overview: row.summary || row.requirements || row.title,
    keyResponsibilities: responsibilities.length
      ? responsibilities
      : ['Contribute to AFLEX institutional mandate'],
    requiredQualifications: {
      education: requirements.find((r) => /degree|phd|master/i.test(r)) || 'Relevant advanced degree',
      experience: requirements.find((r) => /year/i.test(r)) || 'Demonstrated professional experience',
      languages: ['English'],
    },
    preferredExperience: requirements.slice(0, 3),
    competencies: ['Leadership', 'Institutional stewardship', 'Pan-African collaboration'],
    benefits: ['Competitive package', 'Sululta campus access', 'Continental professional network'],
    referenceNumber: row.reference_no || row.id.slice(0, 8).toUpperCase(),
  };
}

export async function getPublishedVacancies(): Promise<StaticVacancy[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('vacancies')
      .select('*')
      .eq('status', 'published')
      .order('deadline', { ascending: true });

    if (!error && data && data.length > 0) {
      return (data as DbVacancy[]).map(mapVacancyRow);
    }
  } catch {
    // Fall through
  }
  return staticVacancies;
}

export async function getVacancyById(id: string): Promise<StaticVacancy | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('vacancies')
      .select('*')
      .eq('id', id)
      .eq('status', 'published')
      .maybeSingle();

    if (!error && data) {
      return mapVacancyRow(data as DbVacancy);
    }
  } catch {
    // Fall through
  }
  return staticVacancies.find((v) => v.id === id) ?? null;
}

export async function getPublishedTenders(): Promise<
  Array<
    ProcurementTender & {
      tender_no: string;
      procurement_type: string;
      closing_date: string;
      tor_document_url: string | null;
      bid_bond_currency: string;
    }
  >
> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('procurement_tenders')
      .select('*')
      .eq('status', 'published')
      .order('submission_deadline', { ascending: true });

    if (!error && data) {
      return (data as ProcurementTender[]).map((row) => ({
        ...row,
        tender_no: row.tender_ref_number,
        procurement_type: row.category || 'Tender',
        closing_date: row.submission_deadline,
        tor_document_url: row.document_url,
        bid_bond_currency: 'ETB',
      }));
    }
  } catch {
    // Fall through
  }
  return [];
}

export type PublicFaq = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export async function getPublishedFaqs(): Promise<PublicFaq[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true });

    if (error || !data) return null;
    return (data as FaqItem[]).map((row) => ({
      id: row.id,
      category: row.category,
      question: row.question_en,
      answer: row.answer_en,
    }));
  } catch {
    return null;
  }
}

export async function getPublishedEvents() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('starts_at', { ascending: true });
    if (error || !data) return null;
    return data as AcademyEventRow[];
  } catch {
    return null;
  }
}

export async function getActiveEmergencyBanner() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('emergency_banners')
      .select('*')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getPublishedMediaItems(): Promise<PublicMediaItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('media_gallery_items')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('published_at', { ascending: false });

    if (error || !data?.length) return staticMediaItems();

    return (data as MediaGalleryItemRow[]).map((row) => ({
      id: row.id,
      album: row.album,
      title: row.title,
      shape: row.shape,
      type: row.media_type,
      image: row.image_url,
      video: row.video_url ?? undefined,
      caption: row.caption ?? undefined,
    }));
  } catch {
    return staticMediaItems();
  }
}

export async function getPublishedSocialFeeds(): Promise<MediaSocialFeed[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('media_social_feeds')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error || !data?.length) return mergeSocialFeeds(null);

    const mapped = (data as MediaSocialFeedRow[]).map((row) => ({
      id: row.id,
      platform: row.platform,
      label: row.label,
      handle: row.handle,
      profileUrl: row.profile_url,
      isPublished: row.is_published,
      sortOrder: row.sort_order,
    }));

    return mergeSocialFeeds(mapped);
  } catch {
    return mergeSocialFeeds(null);
  }
}

export async function getPublishedSocialPosts(): Promise<MediaSocialPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('media_social_posts')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('published_at', { ascending: false });

    if (error || !data?.length) return staticSocialPosts();

    return (data as MediaSocialPostRow[]).map((row) => ({
      id: row.id,
      platform: row.platform,
      title: row.title,
      postUrl: row.post_url,
      embedUrl: row.embed_url,
      externalId: row.external_id,
      thumbnailUrl: row.thumbnail_url,
      caption: row.caption,
      isPublished: row.is_published,
      sortOrder: row.sort_order,
    }));
  } catch {
    return staticSocialPosts();
  }
}
