import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { canAccessAdminPath, isStaffRole } from '@/lib/cms/rbac';

export async function proxy(request: NextRequest) {
  const { response, user, role } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminLogin = pathname === '/admin/login';

  if (isAdminRoute && !isAdminLogin) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!isStaffRole(role)) {
      const denied = request.nextUrl.clone();
      denied.pathname = '/admin/login';
      denied.searchParams.set('error', 'forbidden');
      return NextResponse.redirect(denied);
    }

    if (!canAccessAdminPath(pathname, role) && pathname !== '/admin') {
      const dash = request.nextUrl.clone();
      dash.pathname = '/admin';
      dash.searchParams.set('error', 'forbidden');
      return NextResponse.redirect(dash);
    }
  }

  if (isAdminLogin && user && isStaffRole(role)) {
    const next = request.nextUrl.searchParams.get('next') || '/admin';
    const dest = request.nextUrl.clone();
    dest.pathname = next.startsWith('/admin') && canAccessAdminPath(next, role) ? next : '/admin';
    dest.search = '';
    return NextResponse.redirect(dest);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
