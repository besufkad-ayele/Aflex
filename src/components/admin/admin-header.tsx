'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  Bell, 
  Search, 
  Sparkles, 
  ExternalLink, 
  Check, 
  Layers
} from 'lucide-react';
import { useAdmin } from './admin-context';

export function AdminHeader() {
  const { roleConfig, toggleSidebar, notificationsCount, clearNotifications } = useAdmin();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      title: 'Tender Bid Submitted',
      desc: 'Bid security bond confirmed for High-Performance Datacenter & Cloud RFP.',
      time: '12m ago',
    },
    {
      id: 2,
      title: 'New Fellowship Application',
      desc: 'Candidate Dr. Kwesi Mensah applied for Senior Research Fellow in Governance.',
      time: '45m ago',
    },
    {
      id: 3,
      title: 'Sululta Steward AI Synced',
      desc: 'AI knowledge base updated with 34 new campus locator points of interest.',
      time: '2h ago',
    },
    {
      id: 4,
      title: 'Multilingual Press Released',
      desc: 'English, Amharic, and Afaan Oromoo caches revalidated via On-Demand ISR.',
      time: '5h ago',
    },
  ];

  return (
    <header className="h-16 border-b border-white/10 bg-[#02142d] sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        <button
          type="button"
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-white/70 hover:text-white"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center gap-2 max-w-md w-full">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, vacancies, tenders, or campus facilities..."
              className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 outline-none font-sans"
            />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-1.5 font-serif font-bold text-white text-sm">
          <span>AFLEX CMS</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Database status pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-[#024696]/20 border border-[#024696] text-white/90 text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          <span>qezexucrwwdxgotpofph</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsNotificationsOpen((prev) => !prev);
              if (notificationsCount > 0) clearNotifications();
            }}
            aria-label="View notifications"
            className="p-2 text-white/70 hover:text-white relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#010e21] border border-white/10 rounded-[2px] shadow-2xl py-3 z-50 text-xs">
              <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-[#C9A84C]">
                  Activity Log
                </span>
                <span className="font-mono text-[10px] text-white/50">PostgreSQL 17</span>
              </div>

              <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between font-medium text-white text-xs">
                      <span>{n.title}</span>
                      <span className="font-mono text-[10px] text-white/40">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-white/60 mt-0.5 leading-relaxed">
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="px-4 pt-2 border-t border-white/10 text-right">
                <Link
                  href="/admin/audit"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="font-mono text-[10px] text-[#C9A84C] hover:underline uppercase tracking-wider"
                >
                  Full audit trail &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Current Role Profile Pill */}
        <Link
          href="/admin/staff"
          className="flex items-center gap-2.5 px-2.5 py-1 rounded-[2px] bg-[#010e21] border border-white/15 hover:border-[#C9A84C]/60 transition-colors group"
          title="Switch role view in the Staff Matrix"
        >
          <div className="text-right hidden sm:block">
            <div className="font-medium text-white text-xs leading-none group-hover:text-[#C9A84C] transition-colors">
              {roleConfig.name}
            </div>
            <div className="font-mono text-[9px] text-[#C9A84C] uppercase tracking-wider mt-0.5">
              {roleConfig.title}
            </div>
          </div>
          <div className="w-7 h-7 rounded-[2px] bg-[#024696] border border-[#C9A84C]/50 flex items-center justify-center font-mono text-[11px] font-bold text-white">
            {roleConfig.avatarInitials}
          </div>
        </Link>
      </div>
    </header>
  );
}
