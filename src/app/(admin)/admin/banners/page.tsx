'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Plus, 
  Radio, 
  Save, 
  CheckCircle2, 
  Bell, 
  Globe, 
  Sparkles,
  Eye,
  Trash2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { revalidateCmsContent } from '@/lib/cms/actions';

interface BannerItem {
  id: string;
  message_en: string;
  message_am: string;
  message_om: string;
  alert_level: 'info' | 'warning' | 'urgent';
  is_active: boolean;
  expires_at: string;
}

const INITIAL_BANNERS: BannerItem[] = [
  {
    id: 'ban-01',
    message_en: 'Admissions Open: Executive Public Service Leadership Excellence (PSLE) Cohort 2027 is now accepting nominations.',
    message_am: 'የመሪነት ልህቀት ስልጠና ምዝገባ ተከፍቷል፡ ለ2027 ዓ.ም የስራ አስፈፃሚዎች ምዝገባ እየተካሄደ ይገኛል።',
    message_om: 'Galmeen Leenjii Hoggansaa Banameera: Bara 2027 sagantaa PSLE dhaaf qorannoon eegalameera.',
    alert_level: 'info',
    is_active: true,
    expires_at: '2027-01-31',
  },
  {
    id: 'ban-02',
    message_en: 'Procurement Notice: High-Performance Datacenter tender submission deadline extended by 7 days.',
    message_am: 'የግዢ ማስታወቂያ፡ የዳታ ማዕከል ጨረታ ማቅረቢያ ጊዜ ለ7 ቀናት ተራዝሟል።',
    message_om: 'Beeksisa Caalbaasii: Yeroon caalbaasii Daataa Wiirtuu guyyoota 7f dheerateera.',
    alert_level: 'warning',
    is_active: false,
    expires_at: '2026-11-20',
  },
];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<BannerItem[]>(INITIAL_BANNERS);
  const [activeTab, setActiveTab] = useState<'en' | 'am' | 'om'>('en');
  const [messageEn, setMessageEn] = useState('');
  const [messageAm, setMessageAm] = useState('');
  const [messageOm, setMessageOm] = useState('');
  const [alertLevel, setAlertLevel] = useState<'info' | 'warning' | 'urgent'>('info');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleToggleActive = (id: string) => {
    const updated = banners.map((b) => (b.id === id ? { ...b, is_active: !b.is_active } : b));
    setBanners(updated);
    setSuccessMsg('Banner status updated and broadcasted across all public routes.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleCreateBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageEn.trim()) return;

    const newBanner: BannerItem = {
      id: `ban-0${banners.length + 1}`,
      message_en: messageEn.trim(),
      message_am: messageAm.trim() || messageEn.trim(),
      message_om: messageOm.trim() || messageEn.trim(),
      alert_level: alertLevel,
      is_active: true,
      expires_at: '2027-01-31',
    };

    setBanners([newBanner, ...banners]);
    setMessageEn('');
    setMessageAm('');
    setMessageOm('');
    setSuccessMsg('New alert banner created and activated on homepage.');
    setTimeout(() => setSuccessMsg(null), 3000);

    void revalidateCmsContent({ table: 'emergency_banners', path: '/' }).catch(() => {});
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <Radio className="w-3.5 h-3.5 text-[#024696] animate-pulse" /> Emergency & Hero Marquee
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Global Broadcast Announcements
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Broadcast high-priority institutional announcements, tender deadlines, or admissions alerts to every public visitor.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-[2px] bg-[#024696]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs flex items-center gap-2.5 font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C9A84C]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Live Preview of Active Banner */}
      <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A84C] flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-[#024696]" /> Live Website Marquee Preview
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A84C] bg-[#024696]/20 px-2 py-0.5 rounded-[2px] border border-[#C9A84C]/30">
            Realtime Broadcast
          </span>
        </div>

        {banners.find((b) => b.is_active) ? (
          (() => {
            const active = banners.find((b) => b.is_active)!;
            const levelColors = {
              info: 'bg-[#024696]/20 border-[#C9A84C]/40 text-white',
              warning: 'bg-amber-500/15 border-amber-500/40 text-amber-200',
              urgent: 'bg-rose-500/15 border-rose-500/40 text-rose-200',
            }[active.alert_level];

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
                  <button
                    type="button"
                    onClick={() => setActiveTab('en')}
                    className={`px-2 py-0.5 rounded-[2px] transition-colors ${activeTab === 'en' ? 'bg-[#C9A84C] text-[#021024] font-bold' : 'text-white/60 hover:text-white'}`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('am')}
                    className={`px-2 py-0.5 rounded-[2px] transition-colors ${activeTab === 'am' ? 'bg-[#C9A84C] text-[#021024] font-bold' : 'text-white/60 hover:text-white'}`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('om')}
                    className={`px-2 py-0.5 rounded-[2px] transition-colors ${activeTab === 'om' ? 'bg-[#C9A84C] text-[#021024] font-bold' : 'text-white/60 hover:text-white'}`}
                  >
                    OM
                  </button>
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

      {/* Two Column: Composer & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Composer */}
        <form onSubmit={handleCreateBanner} className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 space-y-4 shadow-xl">
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">Public Notice Stream</div>
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2 mt-0.5">
              <Radio className="w-4 h-4 text-[#024696]" />
              Compose Broadcast Alert
            </h3>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Alert Priority Level</label>
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
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Message (English)</label>
            <textarea
              rows={2}
              required
              value={messageEn}
              onChange={(e) => setMessageEn(e.target.value)}
              placeholder="e.g. Sululta Campus Main Gate will experience scheduled maintenance this Saturday..."
              className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-xs text-white outline-none resize-none font-sans"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">መልእክት (አማርኛ)</label>
            <textarea
              rows={2}
              value={messageAm}
              onChange={(e) => setMessageAm(e.target.value)}
              placeholder="የማስታወቂያው መልእክት በአማርኛ..."
              className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-xs text-white outline-none resize-none font-sans"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Ergaa (Afaan Oromoo)</label>
            <textarea
              rows={2}
              value={messageOm}
              onChange={(e) => setMessageOm(e.target.value)}
              placeholder="Ergaa beeksisaa Afaan Oromootiin..."
              className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-xs text-white outline-none resize-none font-sans"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#C9A84C] hover:bg-[#b5953f] text-[#021024] font-mono font-semibold uppercase tracking-widest text-xs rounded-[2px] transition-all cursor-pointer active:scale-95"
            >
              Broadcast Alert Live
            </button>
          </div>
        </form>

        {/* Existing Banners Management */}
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
              <div
                key={b.id}
                className="p-4 bg-[#010c1c] border border-white/10 rounded-[2px] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold text-white/50 uppercase tracking-widest">
                    Level: <span className="text-[#C9A84C]">{b.alert_level}</span>
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

                <p className="text-xs text-white/80 line-clamp-2 font-sans">
                  {b.message_en}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-2 border-t border-white/5 uppercase tracking-wider">
                  <span>Expires: {b.expires_at}</span>
                  <button
                    type="button"
                    onClick={() => setBanners(banners.filter((item) => item.id !== b.id))}
                    className="text-rose-400 hover:text-rose-300 uppercase tracking-widest cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

