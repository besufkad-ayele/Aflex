'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Newspaper, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Image as ImageIcon, 
  ShieldAlert, 
  ExternalLink, 
  ChevronDown, 
  Calendar, 
  BookOpen, 
  MapPin, 
  Bot, 
  Radio,
  Users, 
  Sparkles,
  X
} from 'lucide-react';
import { useAdmin, ROLES, type AdminRole } from './admin-context';
import { canAccessAdminPath } from '@/lib/cms/rbac';

interface NavGroup {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: {
    label: string;
    href: string;
    badge?: string;
    exact?: boolean;
    roleRequired?: AdminRole[];
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'executive',
    label: 'Executive Suite',
    icon: LayoutDashboard,
    items: [
      { label: 'Executive Overview', href: '/admin', exact: true },
      { label: 'Staff & Roles', href: '/admin/staff' },
    ],
  },
  {
    id: 'academic',
    label: 'Academic & Curricula',
    icon: GraduationCap,
    items: [
      { label: 'Leadership Curricula', href: '/admin/programs', badge: '3 Programs' },
      { label: 'Policy & Research Themes', href: '/admin/research', badge: '6 Papers' },
      { label: 'Summits & Executive Events', href: '/admin/events', badge: 'Upcoming' },
    ],
  },
  {
    id: 'editorial',
    label: 'News & Multilingual Press',
    icon: Newspaper,
    items: [
      { label: 'Articles & Releases', href: '/admin/news', exact: true },
      { label: 'Multilingual Composer', href: '/admin/news/new', badge: 'EN/AM/OM' },
      { label: 'Hero & Emergency Banners', href: '/admin/banners', badge: 'Alerts' },
    ],
  },
  {
    id: 'institutional',
    label: 'Public Portals & Tenders',
    icon: FileText,
    items: [
      { label: 'Careers & Vacancies', href: '/admin/vacancies', exact: true },
      { label: 'Post New Opening', href: '/admin/vacancies/new' },
      { label: 'Procurement Tenders', href: '/admin/procurement', exact: true },
      { label: 'Issue Public Bid Notice', href: '/admin/procurement/new' },
    ],
  },
  {
    id: 'campus',
    label: 'Campus & Smart AI',
    icon: MapPin,
    items: [
      { label: 'Sululta Campus Facilities', href: '/admin/campus', badge: 'GIS' },
      { label: 'Steward AI & FAQ Engine', href: '/admin/faq', badge: 'Agent' },
      { label: 'Photo & Video Archives', href: '/admin/gallery' },
      { label: 'Cloud Storage Assets', href: '/admin/media' },
    ],
  },
  {
    id: 'governance',
    label: 'Security & Compliance',
    icon: ShieldAlert,
    items: [
      { label: 'System Audit Trail', href: '/admin/audit', badge: 'Immutable' },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { role, baseRole, roleConfig, setRole, isSidebarOpen, closeSidebar, signOut, profileEmail } = useAdmin();
  
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    executive: true,
    academic: true,
    editorial: true,
    institutional: true,
    campus: true,
    governance: true,
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const isItemActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => canAccessAdminPath(item.href, role)),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#02142d] border-r border-white/10 flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#010c1c]">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 border border-[#C9A84C]/60 bg-[#024696] rounded-[2px] flex items-center justify-center p-1.5 shadow-sm">
              <Image
                src="/images/aflex-icon.jpg"
                alt="AFLEX"
                width={26}
                height={26}
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-serif text-base font-bold tracking-tight text-white group-hover:text-[#C9A84C] transition-colors flex items-center gap-1.5">
                <span>AFLEX CMS</span>
                <span className="font-mono text-[9px] px-1 py-0.2 bg-[#024696] text-white border border-white/20 rounded-[2px]">
                  v2.0
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#C9A84C] font-medium block">
                Executive Administration
              </span>
            </div>
          </Link>

          <button
            onClick={closeSidebar}
            className="lg:hidden p-1.5 text-white/70 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active staff identity */}
        <div className="p-3 bg-[#010e21] border-b border-white/10">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/60 mb-1.5">
            <span className="flex items-center gap-1 text-[#C9A84C]">
              <Sparkles className="w-3 h-3" /> Signed in as
            </span>
            {baseRole === 'super_admin' && (
              <Link href="/admin/staff" className="text-[#C9A84C] hover:underline">
                Roles &rarr;
              </Link>
            )}
          </div>
          {baseRole === 'super_admin' ? (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as AdminRole)}
              className="w-full bg-[#02142d] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-2.5 py-1.5 font-sans text-xs text-white outline-none cursor-pointer"
            >
              {Object.values(ROLES)
                .filter((r) => r.id !== 'viewer')
                .map((r) => (
                  <option key={r.id} value={r.id} className="bg-[#02142d] text-white">
                    {r.title}
                  </option>
                ))}
            </select>
          ) : (
            <div className="w-full bg-[#02142d] border border-white/15 rounded-[2px] px-2.5 py-1.5 font-sans text-xs text-white">
              {roleConfig.title}
            </div>
          )}
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-white/60">
            <span className="truncate max-w-[170px]">{profileEmail || roleConfig.department}</span>
            <span className="font-mono px-1.5 py-0.5 rounded-[2px] border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#C9A84C] text-[9px] font-medium">
              {role}
            </span>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
          {visibleGroups.map((group) => {
            const GroupIcon = group.icon;
            const isOpen = !!openGroups[group.id];
            const hasActiveChild = group.items.some((item) => isItemActive(item.href, item.exact));

            return (
              <div key={group.id} className="rounded-[2px] border border-white/5 bg-[#010e21]/40 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left cursor-pointer transition-colors ${
                    hasActiveChild ? 'bg-[#024696]/40 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GroupIcon className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span className="font-mono text-[10px] font-medium tracking-wider uppercase">
                      {group.label}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="py-0.5 border-t border-white/5 bg-[#010917]">
                    {group.items.map((item) => {
                      const active = isItemActive(item.href, item.exact);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            if (window.innerWidth < 1024) closeSidebar();
                          }}
                          className={`flex items-center justify-between px-3 py-1.5 text-xs transition-colors rounded-[2px] ${
                            active
                              ? 'bg-[#024696] text-white border-l-2 border-[#C9A84C] font-medium'
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`font-mono text-[9px] px-1 py-0.2 rounded-[2px] uppercase ${
                                active
                                  ? 'bg-[#C9A84C] text-[#021024] font-bold'
                                  : 'bg-white/10 text-white/70'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-white/10 bg-[#010c1c] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-1.5 rounded-[2px] text-xs font-sans text-white/80 hover:text-white bg-[#024696]/20 hover:bg-[#024696]/40 border border-white/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>Public Live Site</span>
            </span>
            <span className="font-mono text-[9px] text-[#C9A84C] uppercase">
              Open &rarr;
            </span>
          </Link>

          <button
            type="button"
            onClick={() => void signOut()}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-[2px] text-xs font-sans text-rose-200/90 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
          >
            <span>Sign out</span>
            <span className="font-mono text-[9px] uppercase">Exit</span>
          </button>

          <div className="flex items-center justify-between text-[10px] font-mono text-white/50 pt-1">
            <span>AFLEX Sululta Node</span>
            <span className="text-[#C9A84C] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              Connected
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
