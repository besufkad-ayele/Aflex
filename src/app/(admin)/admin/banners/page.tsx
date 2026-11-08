'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Eye,
  Radio,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { revalidateCmsContent } from '@/lib/cms/actions';
import type { EmergencyBanner } from '@/lib/supabase/types';

type BannerRow = EmergencyBanner & { alert_level?: 'info' | 'warning' | 'urgent' };

function levelFromType(bannerType: string): 'info' | 'warning' | 'urgent' {
  if (bannerType === 'urgent' || bannerType === 'warning' || bannerType === 'info') {
    return bannerType;
  }
  return 'info';
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<BannerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'en' | 'am' | 'om'>('en');
  const [messageEn, setMessageEn] = useState('');
  const [messageAm, setMessageAm] = useState('');
  const [messageOm, setMessageOm] = useState('');
  const [alertLevel, setAlertLevel] = useState<'info' | 'warning' | 'urgent'>('info');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadBanners = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('emergency_banners')
        .select('*')
        .order('updated_at', { ascending: false });
      if (error) throw new Error(error.message);
      setBanners(
        ((data as EmergencyBanner[]) || []).map((b) => ({
          ...b,
          alert_level: levelFromType(b.banner_type || b.alert_level || 'info'),
        }))
      );
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Failed to load banners');
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBanners();
  }, []);

  const handleToggleActive = async (id: string) => {
    const current = banners.find((b) => b.id === id);
    if (!current) return;
    const next = !current.is_active;
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('emergency_banners')
        .update({ is_active: next, updated_at: new Date().toISOString() } as never)
        .eq('id', id);
      if (error) throw new Error(error.message);
      setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, is_active: next } : b)));
      setSuccessMsg(next ? 'Banner is now broadcasting.' : 'Banner disabled.');
      setTimeout(() => setSuccessMsg(null), 3000);
      await revalidateCmsContent({ table: 'emergency_banners', path: '/' }).catch(() => {});
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update banner');
    }
  };

  const handleCreateBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageEn.trim()) return;
    setSaving(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Only one active banner at a time keeps the marquee clear
      await supabase
        .from('emergency_banners')
        .update({ is_active: false } as never)
        .eq('is_active', true);

      const { error } = await supabase.from('emergency_banners').insert({
        message_en: messageEn.trim(),
        message_am: messageAm.trim() || messageEn.trim(),
        message_om: messageOm.trim() || messageEn.trim(),
        banner_type: alertLevel,
        cta_label: null,
        cta_url: null,
        is_active: true,
        updated_by: user?.id ?? null,
        updated_at: new Date().toISOString(),
      } as never);
      if (error) throw new Error(error.message);

      setMessageEn('');
      setMessageAm('');
      setMessageOm('');
      setSuccessMsg('Broadcast alert published to the public site.');
      setTimeout(() => setSuccessMsg(null), 3000);
      await loadBanners();
      await revalidateCmsContent({ table: 'emergency_banners', path: '/' }).catch(() => {});
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create banner');
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('emergency_banners').delete().eq('id', id);
      if (error) throw new Error(error.message);
      setBanners((prev) => prev.filter((b) => b.id !== id));
      await revalidateCmsContent({ table: 'emergency_banners', path: '/' }).catch(() => {});
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to remove banner');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <Radio className="w-3.5 h-3.5 text-[#024696] animate-pulse" /> Emergency & Hero Marquee
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Global Broadcast Announcements
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Broadcast high-priority institutional announcements to every public visitor.
          </p>
        </div>
      </div>

      {loading && (
        <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Loading banners…</p>
      )}
      {loadError && (
        <p className="text-xs font-mono text-rose-300 border border-rose-500/30 bg-rose-500/10 px-3 py-2 rounded-[2px]">
          {loadError}
        </p>
      )}

      {successMsg && (
        <div className="p-3.5 rounded-[2px] bg-[#024696]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs flex items-center gap-2.5 font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C9A84C]" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A84C] flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-[#024696]" /> Live Website Marquee Preview
          </span>
        </div>

        {banners.find((b) => b.is_active) ? (
          (() => {
            const active = banners.find((b) => b.is_active)!;
            const level = active.alert_level || levelFromType(active.banner_type);
            const levelColors = {
              info: 'bg-[#024696]/20 border-[#C9A84C]/40 text-white',
              warning: 'bg-amber-500/15 border-amber-500/40 text-amber-200',
              urgent: 'bg-rose-500/15 border-rose-500/40 text-rose-200',
            }[level];

            return (
              <div className={`p-4 rounded-[2px] border flex items-center justify-between gap-4 ${levelColors}`}>
                <div className="flex items-center gap-3 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-[#C9A84C]" />
                  <span className="font-sans font-medium">
                    {activeTab === 'en' && active.message_en}
                    {activeTab === 'am' && active.message_am}
                    {activeTab === 'om' && active.message_om}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 text-[10px] uppercase font-mono tracking-wider">
                  {(['en', 'am', 'om'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveTab(lang)}
                      className={`px-2 py-0.5 rounded-[2px] transition-colors ${
                        activeTab === lang
                          ? 'bg-[#C9A84C] text-[#021024] font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()
        ) : (
          <div className="p-4 rounded-[2px] bg-[#010c1c] border border-white/10 text-white/40 text-xs text-center font-mono uppercase tracking-wider">
            No broadcast alert currently active on the public website.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form
          onSubmit={handleCreateBanner}
          className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 space-y-4 shadow-xl"
        >
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">
              Public Notice Stream
            </div>
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2 mt-0.5">
              <Radio className="w-4 h-4 text-[#024696]" />
              Compose Broadcast Alert
            </h3>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
              Alert Priority Level
            </label>
            <div className="flex items-center gap-3">
              {(['info', 'warning', 'urgent'] as const).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setAlertLevel(lvl)}
                  className={`flex-1 py-1.5 px-3 rounded-[2px] font-mono uppercase tracking-widest text-[10px] font-semibold border cursor-pointer transition-all ${
                    alertLevel === lvl
                      ? lvl === 'urgent'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                        : lvl === 'warning'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                          : 'bg-[#024696]/20 text-[#C9A84C] border-[#C9A84C]/40'
                      : 'border-white/10 text-white/50 hover:bg-white/5'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
              Message (English)
            </label>
            <textarea
              rows={2}
              required
              value={messageEn}
              onChange={(e) => setMessageEn(e.target.value)}
              className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-xs text-white outline-none resize-none font-sans"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
              መልእክት (አማርኛ)
            </label>
            <textarea
              rows={2}
              value={messageAm}
              onChange={(e) => setMessageAm(e.target.value)}
              className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-xs text-white outline-none resize-none font-sans"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
              Ergaa (Afaan Oromoo)
            </label>
            <textarea
              rows={2}
              value={messageOm}
              onChange={(e) => setMessageOm(e.target.value)}
              className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-xs text-white outline-none resize-none font-sans"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 px-4 bg-[#C9A84C] hover:bg-[#b5953f] disabled:opacity-50 text-[#021024] font-mono font-semibold uppercase tracking-widest text-xs rounded-[2px] transition-all cursor-pointer active:scale-95"
            >
              {saving ? 'Publishing…' : 'Broadcast Alert Live'}
            </button>
          </div>
        </form>

        <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 space-y-4 shadow-xl">
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">Active Feed</div>
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2 mt-0.5">
              <Bell className="w-4 h-4 text-[#024696]" />
              Configured Broadcasts
            </h3>
          </div>

          <div className="space-y-3">
            {banners.map((b) => (
              <div key={b.id} className="p-4 bg-[#010c1c] border border-white/10 rounded-[2px] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold text-white/50 uppercase tracking-widest">
                    Level:{' '}
                    <span className="text-[#C9A84C]">
                      {b.alert_level || levelFromType(b.banner_type)}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(b.id)}
                    className={`px-2.5 py-1 rounded-[2px] font-mono text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                      b.is_active
                        ? 'bg-[#024696]/20 text-[#C9A84C] border border-[#C9A84C]/40'
                        : 'bg-white/5 text-white/40 border border-white/10 hover:text-white'
                    }`}
                  >
                    {b.is_active ? '● Broadcasting Live' : '○ Disabled'}
                  </button>
                </div>

                <p className="text-xs text-white/80 line-clamp-2 font-sans">{b.message_en}</p>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-2 border-t border-white/5 uppercase tracking-wider">
                  <span>
                    Updated:{' '}
                    {b.updated_at ? new Date(b.updated_at).toLocaleDateString() : '—'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemove(b.id)}
                    className="text-rose-400 hover:text-rose-300 uppercase tracking-widest cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {!loading && banners.length === 0 && (
              <p className="text-xs text-white/50 font-sans">No banners in the database yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
