import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'aflex-secret-token-2026';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('x-revalidation-secret');
    const { searchParams } = new URL(request.url);
    const secretQuery = searchParams.get('secret');

    if (authHeader !== REVALIDATION_SECRET && secretQuery !== REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid or missing revalidation secret' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { path, tag, type } = body as { path?: string; tag?: string; type?: 'news' | 'programs' | 'vacancies' | 'tenders' };

    const locales = ['en', 'am', 'om', 'ti', 'so', 'aa', 'ar', 'fr'];
    const revalidatedPaths: string[] = [];

    if (path) {
      revalidatePath(path);
      revalidatedPaths.push(path);
    }

    if (tag) {
      revalidateTag(tag, 'max-age');
    }

    if (type) {
      for (const loc of locales) {
        const localizedPath = `/${loc}/${type}`;
        revalidatePath(localizedPath);
        revalidatedPaths.push(localizedPath);
      }
      revalidatePath(`/${type}`);
      revalidatePath('/');
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      paths: revalidatedPaths,
      tag: tag || null,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown error during revalidation';
    return NextResponse.json({ revalidated: false, message: errMessage }, { status: 500 });
  }
}

