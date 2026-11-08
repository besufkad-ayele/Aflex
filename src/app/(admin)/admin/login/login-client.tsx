'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(
    searchParams.get('error') === 'forbidden'
      ? 'Your account is authenticated but lacks a staff profile role. Ask a super_admin to insert your row in public.profiles.'
      : null
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        const next = searchParams.get('next');
        const dest = next && next.startsWith('/admin') ? next : '/admin';
        router.push(dest);
        router.refresh();
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-[2px] bg-[#02142d] border border-white/10 shadow-xl">
            <div className="w-14 h-14 bg-[#010c1c] rounded-[2px] flex items-center justify-center p-2 border border-white/5">
              <Image
                src="/images/aflex-icon.jpg"
                alt="AFLEX"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">
            African Leadership Excellence Academy
          </div>
          <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
            Institutional Access Portal
          </h2>
          <p className="text-xs text-white/60 max-w-xs mx-auto font-sans">
            Executive administrative credentials required for policy and content management.
          </p>
        </div>

        <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 shadow-2xl space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-[2px] bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-widest text-white/70">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aflex.edu.et"
                  className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-widest text-white/70">
                Access Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b5953f] disabled:opacity-50 text-[#021024] font-mono font-semibold py-3 px-4 rounded-[2px] text-xs uppercase tracking-widest transition-all active:scale-[0.99] cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In To Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/50">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>Protected by Supabase Auth & PostgreSQL RLS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

