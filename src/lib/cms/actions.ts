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

  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: `STATUS_${input.nextStatus.toUpperCase()}`,
    target_table: input.table,
    target_id: input.id,
    new_data: { status: input.nextStatus, slug: input.slug ?? null },
  } as never);

  const paths = collectRevalidatePaths({
    table: input.table,
    record: { id: input.id, slug: input.slug },
  });
  revalidateCollectedPaths(paths);
  revalidatePath('/admin');
  revalidatePath(`/admin/${input.table === 'news_articles' ? 'news' : input.table === 'procurement_tenders' ? 'procurement' : input.table}`);

  return data;
}
