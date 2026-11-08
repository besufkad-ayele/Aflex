'use client';

import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  Key, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  ExternalLink,
  UserCheck
} from 'lucide-react';
import { useAdmin, ROLES, type AdminRole } from '@/components/admin/admin-context';

export default function AdminStaffSimulatorPage() {
  const { role, baseRole, setRole, profileName, profileEmail } = useAdmin();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-[#C9A84C] bg-[#024696]/20 px-2.5 py-1 rounded-[2px] border border-[#C9A84C]/30">
              Governance & Identity
            </span>
            <span className="text-xs text-[#C9A84C] flex items-center gap-1.5 font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#024696]" />{' '}
              {baseRole === 'super_admin' ? 'Simulation available' : 'Live profile role'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Staff Roles & Permissions
          </h1>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl font-sans">
            Roles are loaded from <code className="text-[#C9A84C]">public.profiles</code>
            {profileEmail ? ` (${profileName || profileEmail})` : ''}. Super admins may temporarily
            preview other operational perspectives.
          </p>
        </div>

        <div className="px-4 py-3 bg-[#010c1c] border border-[#C9A84C]/40 rounded-[2px] text-right">
          <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block">Currently Active</span>
          <span className="text-sm font-serif font-bold text-[#C9A84C]">{ROLES[role].title}</span>
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(ROLES).map((r) => {
          const isActive = role === r.id;
          return (
            <div
              key={r.id}
              className={`rounded-[2px] p-6 flex flex-col justify-between transition-all border shadow-lg ${
                isActive
                  ? 'bg-[#02142d] border-[#C9A84C] shadow-[#C9A84C]/10'
                  : 'bg-[#02142d] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[2px] bg-[#010c1c] border border-white/10 flex items-center justify-center font-mono font-bold text-[#C9A84C] text-sm">
                    {r.avatarInitials}
                  </div>
                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#C9A84C] bg-[#024696]/20 px-2.5 py-1 rounded-[2px] border border-[#C9A84C]/40">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A84C]" /> Active Persona
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 bg-white/5 px-2 py-0.5 rounded-[2px] border border-white/5">
                      Available
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-white">{r.name}</h3>
                  <div className="text-xs font-mono tracking-wider text-[#C9A84C] mt-0.5">{r.title}</div>
                  <div className="text-[11px] text-white/50 mt-1">{r.department}</div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-white/40">
                    Authorized Scope
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.permissions.map((perm) => (
                      <span
                        key={perm}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-[#010c1c] border border-white/10 text-white/70"
                      >
                        {perm.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  disabled={isActive || baseRole !== 'super_admin'}
                  onClick={() => setRole(r.id)}
                  className={`w-full py-2.5 px-4 rounded-[2px] text-xs font-mono font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#C9A84C] text-[#021024] cursor-default'
                      : 'bg-white/5 hover:bg-[#C9A84C] text-white/80 hover:text-[#021024] border border-white/10 hover:border-[#C9A84C] active:scale-98'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isActive ? 'Persona Active' : 'Switch To This Role'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Architecture Matrix */}
      <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C]">
          <Key className="w-4 h-4 text-[#024696]" />
          <span>AFLEX RBAC Security & Policy Matrix</span>
        </div>
        <p className="text-xs text-white/60 leading-relaxed max-w-3xl font-sans">
          Row Level Security (RLS) is cryptographically enforced on Supabase PostgreSQL. Unauthenticated public users can only read published news, vacancies, and tenders. Any creation or deletion requires staff JWT authentication matching the user&apos;s verified institutional profile.
        </p>
      </div>
    </div>
  );
}

