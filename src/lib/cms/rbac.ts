import type { UserRole } from '@/lib/supabase/types';

/** Canonical roles — must match `user_role` enum in CMS migration. */
export const CMS_ROLES: UserRole[] = [
  'super_admin',
  'editor',
  'procurement_officer',
  'hr_manager',
  'translator',
  'viewer',
];

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Administrator',
  editor: 'Content Editor',
  procurement_officer: 'Procurement Officer',
  hr_manager: 'HR Manager',
  translator: 'Translator',
  viewer: 'Viewer',
  academic_director: 'Academic Director',
  comms_officer: 'Communications Officer',
  hr_procurement_officer: 'HR & Procurement Officer',
  editorial_reviewer: 'Editorial Reviewer',
  auditor: 'Auditor',
};

/** Admin UI sections → allowed roles */
export const ROUTE_ROLE_MAP: Record<string, UserRole[]> = {
  '/admin': CMS_ROLES.filter((r) => r !== 'viewer'),
  '/admin/news': ['super_admin', 'editor', 'translator'],
  '/admin/news/new': ['super_admin', 'editor', 'translator'],
  '/admin/programs': ['super_admin', 'editor'],
  '/admin/research': ['super_admin', 'editor'],
  '/admin/events': ['super_admin', 'editor'],
  '/admin/banners': ['super_admin', 'editor'],
  '/admin/vacancies': ['super_admin', 'hr_manager'],
  '/admin/vacancies/new': ['super_admin', 'hr_manager'],
  '/admin/procurement': ['super_admin', 'procurement_officer'],
  '/admin/procurement/new': ['super_admin', 'procurement_officer'],
  '/admin/media': ['super_admin', 'editor', 'procurement_officer', 'hr_manager'],
  '/admin/gallery': ['super_admin', 'editor'],
  '/admin/campus': ['super_admin', 'editor'],
  '/admin/faq': ['super_admin', 'editor'],
  '/admin/staff': ['super_admin'],
  '/admin/audit': ['super_admin'],
};

export function canAccessAdminPath(pathname: string, role: UserRole | null | undefined): boolean {
  if (!role) return false;
  if (role === 'super_admin') return true;
  if (role === 'viewer') return false;

  const exact = ROUTE_ROLE_MAP[pathname];
  if (exact) return exact.includes(role);

  // Prefix match for nested admin routes
  const match = Object.entries(ROUTE_ROLE_MAP)
    .filter(([path]) => path !== '/admin' && pathname.startsWith(path))
    .sort((a, b) => b[0].length - a[0].length)[0];

  if (match) return match[1].includes(role);

  // Default: any non-viewer staff can open the dashboard shell
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

export function isStaffRole(role: UserRole | null | undefined): boolean {
  return Boolean(role && role !== 'viewer');
}
