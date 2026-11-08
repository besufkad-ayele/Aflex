'use client';

import { usePathname } from 'next/navigation';
import { AdminProvider } from '@/components/admin/admin-context';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return (
      <AdminProvider>
        <div className="min-h-screen bg-[#021024] text-white font-sans selection:bg-[#C9A84C]/30 selection:text-white">
          {children}
        </div>
      </AdminProvider>
    );
  }

  return (
    <AdminProvider>
      <div className="min-h-screen bg-[#021024] text-[#ffffff] flex flex-col lg:flex-row font-sans selection:bg-[#C9A84C]/30 selection:text-[#ffffff]">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 bg-[#021024]">
          <AdminHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}
