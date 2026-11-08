import { revalidatePath } from 'next/cache';
import { locales } from '@/lib/i18n';

export type CmsTable =
  | 'news_articles'
  | 'programs'
  | 'vacancies'
  | 'procurement_tenders'
  | 'emergency_banners'
  | 'media_assets'
  | 'faqs'
  | 'events';

type RevalidatePayload = {
  table?: CmsTable | string;
  type?: 'news' | 'programs' | 'vacancies' | 'tenders' | 'banners';
  path?: string;
  record?: { slug?: string; id?: string };
  old_record?: { slug?: string; id?: string };
};

function mapTypeToTable(type?: string): CmsTable | undefined {
  switch (type) {
    case 'news':
      return 'news_articles';
    case 'programs':
      return 'programs';
    case 'vacancies':
      return 'vacancies';
    case 'tenders':
      return 'procurement_tenders';
    case 'banners':
      return 'emergency_banners';
    default:
      return undefined;
  }
}

export function collectRevalidatePaths(payload: RevalidatePayload): string[] {
  const paths = new Set<string>(['/']);
  const table = payload.table || mapTypeToTable(payload.type);
  const record = payload.record;
  const oldRecord = payload.old_record;

  if (payload.path) {
    paths.add(payload.path);
  }

  switch (table) {
    case 'news_articles':
      paths.add('/news');
      if (record?.slug) paths.add(`/news/${record.slug}`);
      if (oldRecord?.slug) paths.add(`/news/${oldRecord.slug}`);
      for (const loc of locales) {
        paths.add(`/${loc}`);
        paths.add(`/${loc}/news`);
        if (record?.slug) paths.add(`/${loc}/news/${record.slug}`);
      }
      break;
    case 'programs':
      paths.add('/programs');
      paths.add('/catalog');
      for (const loc of locales) {
        paths.add(`/${loc}/programs`);
      }
      break;
    case 'vacancies':
      paths.add('/vacancy');
      if (record?.id) paths.add(`/vacancy/${record.id}`);
      break;
    case 'procurement_tenders':
      paths.add('/procurement');
      break;
    case 'emergency_banners':
      paths.add('/');
      for (const loc of locales) {
        paths.add(`/${loc}`);
      }
      break;
    case 'media_assets':
      paths.add('/gallery');
      paths.add('/about');
      break;
    case 'faqs':
      paths.add('/faq');
      break;
    case 'events':
      paths.add('/events');
      paths.add('/news');
      paths.add('/');
      break;
    default:
      break;
  }

  return Array.from(paths);
}

export function revalidateCollectedPaths(paths: string[]) {
  for (const path of paths) {
    revalidatePath(path);
  }
}
