import { NextRequest, NextResponse } from 'next/server';
import {
  collectRevalidatePaths,
  revalidateCollectedPaths,
  type CmsTable,
} from '@/lib/cms/revalidate-paths';

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.REVALIDATION_SECRET_TOKEN;
    const authHeader = request.headers.get('x-revalidation-secret');
    const secretQuery = request.nextUrl.searchParams.get('secret');

    if (!secret || (authHeader !== secret && secretQuery !== secret)) {
      return NextResponse.json(
        { error: 'Invalid or missing revalidation secret' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const {
      table,
      type,
      path,
      tag,
      record,
      old_record,
    } = body as {
      table?: CmsTable | string;
      type?: 'news' | 'programs' | 'vacancies' | 'tenders' | 'banners';
      path?: string;
      tag?: string;
      record?: { slug?: string; id?: string };
      old_record?: { slug?: string; id?: string };
    };

    const paths = collectRevalidatePaths({
      table,
      type,
      path,
      record,
      old_record,
    });

    if (paths.length === 1 && !table && !type && !path) {
      return NextResponse.json(
        { message: 'No purge rules for payload', table: table ?? null, type: type ?? null },
        { status: 200 }
      );
    }

    revalidateCollectedPaths(paths);

    if (tag) {
      const { revalidateTag } = await import('next/cache');
      revalidateTag(tag, 'max-age');
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      paths,
      tag: tag || null,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown error during revalidation';
    return NextResponse.json({ revalidated: false, message: errMessage }, { status: 500 });
  }
}
