import { createClient } from '@/lib/supabase/server';
import { newsArticles, type NewsItem } from '@/lib/news-data';
import { programDetails } from '@/lib/programs-data';
import { vacancies as staticVacancies, type Vacancy as StaticVacancy } from '@/lib/vacancies-data';
import type {
  NewsArticle,
  Program,
  Vacancy as DbVacancy,
  ProcurementTender,
} from '@/lib/supabase/types';

function estimateReadTime(body: string | null): string {
  const words = (body || '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.ceil(words / 200) || 4);
  return `${minutes} MIN READ`;
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
  const body = row.body_en || '';
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
    title: row.title_en,
    category: mapCategory(row.category),
    date: formatNewsDate(row.published_at),
    readTime: estimateReadTime(row.body_en),
    image: row.hero_image_url || '/images/news2.png',
    author: 'AFLEX Editorial Desk',
    authorRole: 'African Leadership Excellence Academy',
    excerpt: row.lead_en || paragraphs[0] || '',
    content: paragraphs.length > 0 ? paragraphs : [row.lead_en || row.title_en],
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
    ? row.structure.map((s) =>
        typeof s === 'string' ? s : `${s.label}: ${s.value}`
      )
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
  const responsibilities = (row.responsibilities || '')
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
    category: 'Leadership & Executive',
    type: (row.employment_type as StaticVacancy['type']) || 'Full-time',
    location: row.location || 'Sululta, Ethiopia',
    gradeLevel: 'Institutional Appointment',
    deadline: row.deadline,
    closingDateISO: row.deadline,
    salaryRange: 'Competitive institutional scale',
    summary: requirements[0] || row.title,
    overview: row.requirements || row.title,
    keyResponsibilities: responsibilities.length ? responsibilities : ['Contribute to AFLEX institutional mandate'],
    requiredQualifications: {
      education: requirements.find((r) => /degree|phd|master/i.test(r)) || 'Relevant advanced degree',
      experience: requirements.find((r) => /year/i.test(r)) || 'Demonstrated professional experience',
      languages: ['English'],
    },
    preferredExperience: requirements.slice(0, 3),
    competencies: ['Leadership', 'Institutional stewardship', 'Pan-African collaboration'],
    benefits: ['Competitive package', 'Sululta campus access', 'Continental professional network'],
    referenceNumber: row.reference_no,
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

export async function getPublishedTenders(): Promise<ProcurementTender[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('procurement_tenders')
      .select('*')
      .eq('status', 'published')
      .order('closing_date', { ascending: true });

    if (!error && data) {
      return data as ProcurementTender[];
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
    return (data as import('@/lib/supabase/types').FaqItem[]).map((row) => ({
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
    return data as import('@/lib/supabase/types').AcademyEventRow[];
  } catch {
    return null;
  }
}
