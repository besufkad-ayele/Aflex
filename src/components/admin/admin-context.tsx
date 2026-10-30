'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AdminRole = 
  | 'super_admin' 
  | 'editor' 
  | 'hr_director' 
  | 'procurement_officer' 
  | 'dean' 
  | 'steward_admin';

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

export const ROLES: Record<AdminRole, RoleConfig> = {
  super_admin: {
    id: 'super_admin',
    title: 'Super Administrator',
    name: 'Dr. Zewdu Mengiste',
    department: 'Director General Office',
    avatarInitials: 'ZM',
    badgeBg: 'bg-[#C9A84C]/15',
    badgeBorder: 'border-[#C9A84C]/40',
    badgeText: 'text-[#C9A84C]',
    permissions: ['all'],
  },
  editor: {
    id: 'editor',
    title: 'Chief Content Editor',
    name: 'Bethlehem Tadesse',
    department: 'Communications & Public Relations',
    avatarInitials: 'BT',
    badgeBg: 'bg-[#024696]/30',
    badgeBorder: 'border-[#024696]',
    badgeText: 'text-[#ffffff]',
    permissions: ['news', 'banners', 'gallery', 'faq'],
  },
  hr_director: {
    id: 'hr_director',
    title: 'Human Capital Director',
    name: 'Mekonnen Kebede',
    department: 'Talent Acquisition & HR Directorate',
    avatarInitials: 'MK',
    badgeBg: 'bg-[#024696]/20',
    badgeBorder: 'border-[#024696]/60',
    badgeText: 'text-[#C9A84C]',
    permissions: ['vacancies', 'staff'],
  },
  procurement_officer: {
    id: 'procurement_officer',
    title: 'Lead Procurement Specialist',
    name: 'Almaz Wolde',
    department: 'Procurement & Property Directorate',
    avatarInitials: 'AW',
    badgeBg: 'bg-[#C9A84C]/10',
    badgeBorder: 'border-[#C9A84C]/40',
    badgeText: 'text-[#ffffff]',
    permissions: ['procurement'],
  },
  dean: {
    id: 'dean',
    title: 'Dean of Leadership Studies',
    name: 'Prof. Kofi Asante',
    department: 'Academic & Curriculum Senate',
    avatarInitials: 'KA',
    badgeBg: 'bg-[#024696]/30',
    badgeBorder: 'border-[#C9A84C]/40',
    badgeText: 'text-[#C9A84C]',
    permissions: ['programs', 'research', 'events'],
  },
  steward_admin: {
    id: 'steward_admin',
    title: 'Sululta AI Steward Lead',
    name: 'Dr. Yared Hailu',
    department: 'Smart Campus & Knowledge Systems',
    avatarInitials: 'YH',
    badgeBg: 'bg-[#024696]/30',
    badgeBorder: 'border-[#024696]',
    badgeText: 'text-[#ffffff]',
    permissions: ['faq', 'campus', 'audit'],
  },
};

interface AdminContextType {
  role: AdminRole;
  roleConfig: RoleConfig;
  setRole: (role: AdminRole) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  notificationsCount: number;
  clearNotifications: () => void;
  isSimulatorActive: boolean;
  setIsSimulatorActive: (val: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<AdminRole>('super_admin');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(4);
  const [isSimulatorActive, setIsSimulatorActive] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('aflex_admin_sim_role') as AdminRole;
    if (saved && ROLES[saved]) {
      setRoleState(saved);
    }
  }, []);

  const setRole = (newRole: AdminRole) => {
    setRoleState(newRole);
    localStorage.setItem('aflex_admin_sim_role', newRole);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const clearNotifications = () => setNotificationsCount(0);

  return (
    <AdminContext.Provider
      value={{
        role,
        roleConfig: ROLES[role],
        setRole,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        notificationsCount,
        clearNotifications,
        isSimulatorActive,
        setIsSimulatorActive,
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
