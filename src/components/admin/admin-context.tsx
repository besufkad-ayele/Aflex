'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { UserRole } from '@/lib/supabase/types';
import { ROLE_LABELS } from '@/lib/cms/rbac';

export type AdminRole = UserRole;

export interface RoleConfig {
  id: AdminRole;
  title: string;
  name: string;
  department: string;
  avatarInitials: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  permissions: string[];
}

const ROLE_STYLES: Record<UserRole, Pick<RoleConfig, 'badgeBg' | 'badgeBorder' | 'badgeText' | 'permissions'>> = {
  super_admin: {
    badgeBg: 'bg-[#C9A84C]/15',
    badgeBorder: 'border-[#C9A84C]/40',
    badgeText: 'text-[#C9A84C]',
    permissions: ['all'],
  },
  editor: {
    badgeBg: 'bg-[#024696]/30',
    badgeBorder: 'border-[#024696]',
    badgeText: 'text-[#ffffff]',
    permissions: ['news', 'banners', 'gallery', 'faq', 'programs', 'events'],
  },
  hr_manager: {
    badgeBg: 'bg-[#024696]/20',
    badgeBorder: 'border-[#024696]/60',
    badgeText: 'text-[#C9A84C]',
    permissions: ['vacancies', 'staff'],
  },
  procurement_officer: {
    badgeBg: 'bg-[#C9A84C]/10',
    badgeBorder: 'border-[#C9A84C]/40',
    badgeText: 'text-[#ffffff]',
    permissions: ['procurement'],
  },
  translator: {
    badgeBg: 'bg-[#024696]/20',
    badgeBorder: 'border-[#C9A84C]/30',
    badgeText: 'text-[#C9A84C]',
    permissions: ['news'],
  },
  viewer: {
    badgeBg: 'bg-white/10',
    badgeBorder: 'border-white/20',
    badgeText: 'text-white/70',
    permissions: [],
  },
};

export const ROLES: Record<AdminRole, RoleConfig> = {
  super_admin: {
    id: 'super_admin',
    title: ROLE_LABELS.super_admin,
    name: 'Academy Administrator',
    department: 'Director General Office',
    avatarInitials: 'SA',
    ...ROLE_STYLES.super_admin,
  },
  editor: {
    id: 'editor',
    title: ROLE_LABELS.editor,
    name: 'Content Editor',
    department: 'Communications',
    avatarInitials: 'ED',
    ...ROLE_STYLES.editor,
  },
  hr_manager: {
    id: 'hr_manager',
    title: ROLE_LABELS.hr_manager,
    name: 'HR Manager',
    department: 'Human Capital',
    avatarInitials: 'HR',
    ...ROLE_STYLES.hr_manager,
  },
  procurement_officer: {
    id: 'procurement_officer',
    title: ROLE_LABELS.procurement_officer,
    name: 'Procurement Officer',
    department: 'Procurement & Property',
    avatarInitials: 'PO',
    ...ROLE_STYLES.procurement_officer,
  },
  translator: {
    id: 'translator',
    title: ROLE_LABELS.translator,
    name: 'Translator',
    department: 'Multilingual Desk',
    avatarInitials: 'TR',
    ...ROLE_STYLES.translator,
  },
  viewer: {
    id: 'viewer',
    title: ROLE_LABELS.viewer,
    name: 'Viewer',
    department: 'Read Only',
    avatarInitials: 'VW',
    ...ROLE_STYLES.viewer,
  },
};

interface AdminContextType {
  role: AdminRole;
  baseRole: AdminRole;
  roleConfig: RoleConfig;
  setRole: (role: AdminRole) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  notificationsCount: number;
  clearNotifications: () => void;
  isSimulatorActive: boolean;
  setIsSimulatorActive: (val: boolean) => void;
  profileName: string | null;
  profileEmail: string | null;
  loadingProfile: boolean;
  signOut: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<AdminRole>('viewer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [isSimulatorActive, setIsSimulatorActive] = useState(false);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [profileEmail, setProfileEmail] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [realRole, setRealRole] = useState<AdminRole>('viewer');

  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          if (!cancelled) {
            setLoadingProfile(false);
          }
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role, email, full_name')
          .eq('id', user.id)
          .maybeSingle();

        if (cancelled) return;

        const row = profile as { role?: AdminRole; email?: string; full_name?: string } | null;
        const resolvedRole = row?.role || 'viewer';
        setRealRole(resolvedRole);
        setRoleState(resolvedRole);
        setProfileEmail(row?.email || user.email || null);
        setProfileName(row?.full_name || user.email || null);
      } catch {
        // Keep defaults
      } finally {
        if (!cancelled) setLoadingProfile(false);
      }
    }
    void loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  const setRole = useCallback(
    (newRole: AdminRole) => {
      // Simulator only for super_admins
      if (realRole !== 'super_admin') return;
      setIsSimulatorActive(true);
      setRoleState(newRole);
    },
    [realRole]
  );

  const signOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  }, []);

  const roleConfig: RoleConfig = {
    ...ROLES[role],
    name: profileName || ROLES[role].name,
    avatarInitials: profileName ? initialsFromName(profileName) : ROLES[role].avatarInitials,
  };

  return (
    <AdminContext.Provider
      value={{
        role,
        baseRole: realRole,
        roleConfig,
        setRole,
        isSidebarOpen,
        toggleSidebar: () => setIsSidebarOpen((prev) => !prev),
        closeSidebar: () => setIsSidebarOpen(false),
        notificationsCount,
        clearNotifications: () => setNotificationsCount(0),
        isSimulatorActive,
        setIsSimulatorActive,
        profileName,
        profileEmail,
        loadingProfile,
        signOut,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
