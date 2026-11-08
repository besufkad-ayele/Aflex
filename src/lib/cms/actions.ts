'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import {
  collectRevalidatePaths,
  revalidateCollectedPaths,
  type CmsTable,
} from '@/lib/cms/revalidate-paths';
import type { ContentStatus } from '@/lib/supabase/types';

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Authentication required');
  }

  return { supabase, user };
}

async function writeAudit(
  supabase: Awaited<ReturnType<typeof createClient>>,
  user: { id: string; email?: string | null },
  action: string,
  entityType: string,
  entityId?: string,
  changes?: Record<string, unknown>
) {
  await supabase.from('audit_logs').insert({
    user_id: user.id,
    user_email: user.email ?? null,
    action,
    entity_type: entityType,
    entity_id: entityId ?? null,
    changes: changes ?? null,
  } as never);
}

export async function revalidateCmsContent(input: {
  table: CmsTable;
  path?: string;
  record?: { slug?: string; id?: string };
  old_record?: { slug?: string; id?: string };
}) {
  await requireUser();
  const paths = collectRevalidatePaths(input);
  revalidateCollectedPaths(paths);
  return { revalidated: true, paths };
}

export async function toggleContentStatus(input: {
  table: 'news_articles' | 'vacancies' | 'procurement_tenders' | 'programs';
  id: string;
  nextStatus: ContentStatus;
  slug?: string;
}) {
  const { supabase, user } = await requireUser();

  const { data, error } = await supabase
    .from(input.table)
    .update({ status: input.nextStatus } as never)
    .eq('id', input.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  await writeAudit(supabase, user, `STATUS_${input.nextStatus.toUpperCase()}`, input.table, input.id, {
    status: input.nextStatus,
    slug: input.slug ?? null,
  });

  const paths = collectRevalidatePaths({
    table: input.table,
    record: { id: input.id, slug: input.slug },
  });
  revalidateCollectedPaths(paths);
  revalidatePath('/admin');

  return data;
}

export async function updateProgramFields(input: {
  id: string;
  title: string;
  lead: string;
  format: string;
}) {
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from('programs')
    .update({
      title: input.title,
      lead: input.lead,
      format: input.format,
      updated_at: new Date().toISOString(),
    } as never)
    .eq('id', input.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  await writeAudit(supabase, user, 'PROGRAM_UPDATED', 'programs', input.id, {
    title: input.title,
  });
  await revalidateCmsContent({ table: 'programs' });
  return data;
}

export async function createFaqItem(input: {
  category: string;
  question_en: string;
  answer_en: string;
  question_am?: string | null;
  answer_am?: string | null;
  question_om?: string | null;
  answer_om?: string | null;
}) {
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from('faqs')
    .insert({
      category: input.category,
      question_en: input.question_en,
      answer_en: input.answer_en,
      question_am: input.question_am || null,
      answer_am: input.answer_am || null,
      question_om: input.question_om || null,
      answer_om: input.answer_om || null,
      status: 'published',
      sort_order: 0,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    } as never)
    .select()
    .single();

  if (error) throw new Error(error.message);

  await writeAudit(supabase, user, 'FAQ_CREATED', 'faqs', (data as { id?: string } | null)?.id, {
    category: input.category,
    question_en: input.question_en,
  });
  await revalidateCmsContent({ table: 'faqs', path: '/faq' });
  revalidatePath('/admin');
  return data;
}

export async function createAcademyEvent(input: {
  title: string;
  summary?: string | null;
  location?: string | null;
  starts_at: string;
  ends_at?: string | null;
  featured?: boolean;
}) {
  const { supabase, user } = await requireUser();
  const slugBase = input.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72);
  const slug = `${slugBase || 'event'}-${Date.now().toString(36)}`;

  const { data, error } = await supabase
    .from('events')
    .insert({
      slug,
      title: input.title,
      summary: input.summary || null,
      location: input.location || null,
      starts_at: input.starts_at,
      ends_at: input.ends_at || null,
      hero_image_url: null,
      status: 'published',
      featured: Boolean(input.featured),
      created_by: user.id,
      updated_at: new Date().toISOString(),
    } as never)
    .select()
    .single();

  if (error) throw new Error(error.message);

  await writeAudit(supabase, user, 'EVENT_PUBLISHED', 'events', (data as { id?: string } | null)?.id, {
    title: input.title,
    slug,
  });
  await revalidateCmsContent({
    table: 'events',
    path: '/events',
    record: { slug, id: (data as { id?: string } | null)?.id },
  });
  revalidatePath('/admin');
  return data;
}

export async function toggleFaqOrEventStatus(input: {
  table: 'faqs' | 'events';
  id: string;
  nextStatus: ContentStatus;
  slug?: string;
}) {
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from(input.table)
    .update({ status: input.nextStatus, updated_at: new Date().toISOString() } as never)
    .eq('id', input.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  await writeAudit(
    supabase,
    user,
    `STATUS_${input.nextStatus.toUpperCase()}`,
    input.table,
    input.id,
    { status: input.nextStatus, slug: input.slug ?? null }
  );
  await revalidateCmsContent({
    table: input.table,
    record: { id: input.id, slug: input.slug },
  });
  revalidatePath('/admin');
  return data;
}

export async function upsertMediaSocialFeed(input: {
  platform: 'tiktok' | 'facebook' | 'youtube';
  label: string;
  handle?: string | null;
  profileUrl: string;
  embedUrl?: string | null;
  embedHtml?: string | null;
  isPublished?: boolean;
  sortOrder?: number;
}) {
  const { supabase, user } = await requireUser();
  const payload = {
    platform: input.platform,
    label: input.label,
    handle: input.handle ?? null,
    profile_url: input.profileUrl,
    embed_url: input.embedUrl ?? null,
    embed_html: input.embedHtml ?? null,
    is_published: input.isPublished ?? true,
    sort_order: input.sortOrder ?? 0,
    updated_by: user.id,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('media_social_feeds')
    .upsert(payload as never, { onConflict: 'platform' })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await writeAudit(supabase, user, 'SOCIAL_FEED_UPSERT', 'media_social_feeds', (data as { id?: string } | null)?.id, {
    platform: input.platform,
  });
  await revalidateCmsContent({ table: 'media_social_feeds' });
  revalidatePath('/admin/gallery');
  return data;
}

export async function upsertMediaGalleryItem(input: {
  id?: string;
  title: string;
  album: string;
  mediaType: 'photo' | 'video';
  imageUrl: string;
  videoUrl?: string | null;
  shape?: 'tall' | 'wide' | 'standard';
  caption?: string | null;
  status?: ContentStatus;
  sortOrder?: number;
}) {
  const { supabase, user } = await requireUser();
  const payload = {
    title: input.title,
    album: input.album,
    media_type: input.mediaType,
    image_url: input.imageUrl,
    video_url: input.videoUrl ?? null,
    shape: input.shape ?? 'standard',
    caption: input.caption ?? null,
    status: input.status ?? 'published',
    sort_order: input.sortOrder ?? 0,
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...(input.id ? {} : { created_by: user.id }),
  };

  const query = input.id
    ? supabase.from('media_gallery_items').update(payload as never).eq('id', input.id)
    : supabase.from('media_gallery_items').insert(payload as never);

  const { data, error } = await query.select().single();
  if (error) throw new Error(error.message);

  await writeAudit(
    supabase,
    user,
    input.id ? 'GALLERY_UPDATED' : 'GALLERY_CREATED',
    'media_gallery_items',
    (data as { id?: string } | null)?.id,
    { title: input.title, mediaType: input.mediaType }
  );
  await revalidateCmsContent({ table: 'media_gallery_items' });
  revalidatePath('/admin/gallery');
  return data;
}

export async function deleteMediaGalleryItem(id: string) {
  const { supabase, user } = await requireUser();
  const { error } = await supabase.from('media_gallery_items').delete().eq('id', id);
  if (error) throw new Error(error.message);
  await writeAudit(supabase, user, 'GALLERY_DELETED', 'media_gallery_items', id, {});
  await revalidateCmsContent({ table: 'media_gallery_items' });
  revalidatePath('/admin/gallery');
}

export async function upsertMediaSocialPost(input: {
  id?: string;
  platform: 'tiktok' | 'facebook' | 'youtube';
  title: string;
  postUrl: string;
  embedUrl: string;
  externalId?: string | null;
  thumbnailUrl?: string | null;
  caption?: string | null;
  isPublished?: boolean;
  sortOrder?: number;
}) {
  const { supabase, user } = await requireUser();
  const payload = {
    platform: input.platform,
    title: input.title,
    post_url: input.postUrl,
    embed_url: input.embedUrl,
    external_id: input.externalId ?? null,
    thumbnail_url: input.thumbnailUrl ?? null,
    caption: input.caption ?? null,
    is_published: input.isPublished ?? true,
    sort_order: input.sortOrder ?? 0,
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...(input.id ? {} : { created_by: user.id }),
  };

  const query = input.id
    ? supabase.from('media_social_posts').update(payload as never).eq('id', input.id)
    : supabase.from('media_social_posts').insert(payload as never);

  const { data, error } = await query.select().single();
  if (error) throw new Error(error.message);

  await writeAudit(
    supabase,
    user,
    input.id ? 'SOCIAL_POST_UPDATED' : 'SOCIAL_POST_CREATED',
    'media_social_posts',
    (data as { id?: string } | null)?.id,
    { platform: input.platform, title: input.title }
  );
  await revalidateCmsContent({ table: 'media_social_posts' });
  revalidatePath('/admin/gallery');
  return data;
}

export async function deleteMediaSocialPost(id: string) {
  const { supabase, user } = await requireUser();
  const { error } = await supabase.from('media_social_posts').delete().eq('id', id);
  if (error) throw new Error(error.message);
  await writeAudit(supabase, user, 'SOCIAL_POST_DELETED', 'media_social_posts', id, {});
  await revalidateCmsContent({ table: 'media_social_posts' });
  revalidatePath('/admin/gallery');
}

