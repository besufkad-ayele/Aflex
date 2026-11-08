'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Globe, 
  Image as ImageIcon, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { revalidateCmsContent } from '@/lib/cms/actions';
import { RichTextEditor } from '@/components/admin/rich-text-editor';

export default function NewNewsArticlePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'en' | 'am' | 'om'>('en');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Common Metadata
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Institutional');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split('T')[0]);

  // English
  const [titleEn, setTitleEn] = useState('');
  const [leadEn, setLeadEn] = useState('');
  const [bodyEn, setBodyEn] = useState('');

  // Amharic
  const [titleAm, setTitleAm] = useState('');
  const [leadAm, setLeadAm] = useState('');
  const [bodyAm, setBodyAm] = useState('');

  // Afaan Oromoo
  const [titleOm, setTitleOm] = useState('');
  const [leadOm, setLeadOm] = useState('');
  const [bodyOm, setBodyOm] = useState('');

  const autoGenerateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleEnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitleEn(val);
    if (!slug) {
      setSlug(autoGenerateSlug(val));
    }
  };

  const handleSubmit = async (targetStatus: 'published' | 'draft') => {
    if (!titleEn.trim()) {
      setErrorMsg('English headline is required.');
      return;
    }
    if (!slug.trim()) {
      setErrorMsg('URL slug is required.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();

      const articlePayload = {
        slug: slug.trim(),
        category,
        published_at: publishedAt,
        hero_image_url: heroImageUrl.trim() || null,
        featured,
        status: targetStatus,
        title_en: titleEn.trim(),
        lead_en: leadEn.trim() || null,
        body_en: bodyEn.trim() || null,
        title_am: titleAm.trim() || null,
        lead_am: leadAm.trim() || null,
        body_am: bodyAm.trim() || null,
        title_om: titleOm.trim() || null,
        lead_om: leadOm.trim() || null,
        body_om: bodyOm.trim() || null,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await supabase
        .from('news_articles')
        .insert(articlePayload as any)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Record audit log
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await supabase.from('audit_logs').insert({
        action: targetStatus === 'published' ? 'ARTICLE_PUBLISHED' : 'ARTICLE_DRAFT_CREATED',
        target_table: 'news_articles',
        target_id: (data as any)?.id,
        new_data: { slug, title_en: titleEn, status: targetStatus },
      } as any);

      await revalidateCmsContent({
        table: 'news_articles',
        path: `/news/${slug}`,
        record: { slug, id: (data as { id?: string })?.id },
      }).catch(() => {});

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/news');
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to publish article.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="p-2 rounded-[2px] bg-[#024696]/30 border border-white/10 hover:border-white/30 text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#C9A84C]">
              Editorial Desk
            </div>
            <h1 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
              Compose Press Release
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit('draft')}
            className="flex items-center gap-2 bg-[#02142d] hover:bg-[#032047] text-white/80 font-mono px-3.5 py-2 rounded-[2px] text-xs uppercase tracking-wider transition-colors border border-white/15 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit('published')}
            className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#d8b85c] text-[#021024] font-mono font-semibold px-4 py-2 rounded-[2px] text-xs uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono rounded-[2px]">
          {errorMsg}
        </div>
      )}

      {success && (
        <div className="p-3 bg-[#024696]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-mono rounded-[2px]">
          Article published successfully. Caches purged.
        </div>
      )}

      {/* Main Grid: Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Multilingual Content Tabs */}
        <div className="lg:col-span-2 space-y-4">
          {/* Language Switcher Tabs */}
          <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-1 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`flex-1 py-1.5 px-3 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'en'
                  ? 'bg-[#024696] text-white font-medium'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('am')}
              className={`flex-1 py-1.5 px-3 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'am'
                  ? 'bg-[#C9A84C] text-[#021024] font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              አማርኛ
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('om')}
              className={`flex-1 py-1.5 px-3 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'om'
                  ? 'bg-[#024696] text-white font-medium border border-white/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Afaan Oromoo
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 space-y-4">
            {activeTab === 'en' && (
              <>
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
                    Headline (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={handleTitleEnChange}
                    placeholder="e.g. AFLEX Concludes High-Level Leadership Summit at Sululta"
                    className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3.5 py-2 text-sm text-white placeholder-white/40 outline-none font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
                    Lead Paragraph (English)
                  </label>
                  <textarea
                    rows={3}
                    value={leadEn}
                    onChange={(e) => setLeadEn(e.target.value)}
                    placeholder="Executive summary of key resolutions..."
                    className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3.5 py-2 text-xs text-white placeholder-white/40 outline-none font-sans resize-y"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
                    Full Body Text (English)
                  </label>
                  <RichTextEditor
                    value={bodyEn}
                    onChange={setBodyEn}
                    placeholder="Full press release communique…"
                  />
                </div>
              </>
            )}

            {activeTab === 'am' && (
              <>
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
                    የዜና ርዕስ (አማርኛ)
                  </label>
                  <input
                    type="text"
                    value={titleAm}
                    onChange={(e) => setTitleAm(e.target.value)}
                    placeholder="የዜናውን ርዕስ እዚህ ያስገቡ..."
                    className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3.5 py-2 text-sm text-white placeholder-white/40 outline-none font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
                    አጭር መግለጫ (አማርኛ)
                  </label>
                  <textarea
                    rows={3}
                    value={leadAm}
                    onChange={(e) => setLeadAm(e.target.value)}
                    placeholder="የዜናው አጭር ማጠቃለያ..."
                    className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3.5 py-2 text-xs text-white placeholder-white/40 outline-none font-sans resize-y"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
                    ሙሉ ዘገባ (አማርኛ)
                  </label>
                  <textarea
                    rows={10}
                    value={bodyAm}
                    onChange={(e) => setBodyAm(e.target.value)}
                    placeholder="ሙሉውን የዜና ይዘት እዚህ ይጻፉ..."
                    className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3.5 py-2 text-xs text-white placeholder-white/40 outline-none font-sans resize-y leading-relaxed"
                  />
                </div>
              </>
            )}

            {activeTab === 'om' && (
              <>
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
                    Mata Duree Oduu (Afaan Oromoo)
                  </label>
                  <input
                    type="text"
                    value={titleOm}
                    onChange={(e) => setTitleOm(e.target.value)}
                    placeholder="Mata duree oduu asitti galchaa..."
                    className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3.5 py-2 text-sm text-white placeholder-white/40 outline-none font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
                    Ibsa Gabaabaa (Afaan Oromoo)
                  </label>
                  <textarea
                    rows={3}
                    value={leadOm}
                    onChange={(e) => setLeadOm(e.target.value)}
                    placeholder="Cuunfaa gabaabaa oduu..."
                    className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3.5 py-2 text-xs text-white placeholder-white/40 outline-none font-sans resize-y"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
                    Gabaasa Guutuu (Afaan Oromoo)
                  </label>
                  <textarea
                    rows={10}
                    value={bodyOm}
                    onChange={(e) => setBodyOm(e.target.value)}
                    placeholder="Qabiyyee guutuu oduu asitti barreessaa..."
                    className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3.5 py-2 text-xs text-white placeholder-white/40 outline-none font-sans resize-y leading-relaxed"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Metadata */}
        <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 space-y-4 h-fit">
          <div className="font-mono text-xs font-medium uppercase tracking-wider text-[#C9A84C] border-b border-white/10 pb-2">
            Publication Settings
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-white/70">
              URL Slug *
            </label>
            <div className="flex items-center bg-[#010e21] border border-white/15 rounded-[2px] px-2 py-1.5 text-xs">
              <span className="font-mono text-white/40">/news/</span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="bg-transparent text-white focus:outline-none flex-1 font-mono text-xs pl-1"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-white/70">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#010e21] border border-white/15 rounded-[2px] px-3 py-1.5 text-xs text-white outline-none font-sans"
            >
              <option value="Institutional">Institutional</option>
              <option value="Executive Education">Executive Education</option>
              <option value="Pan-African Research">Pan-African Research</option>
              <option value="Governance & Policy">Governance & Policy</option>
              <option value="Smart Campus">Smart Campus</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-white/70">
              Hero Image URL
            </label>
            <input
              type="url"
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#010e21] border border-white/15 rounded-[2px] px-3 py-1.5 text-xs text-white placeholder-white/40 outline-none font-sans"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-white/70">
              Release Date
            </label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full bg-[#010e21] border border-white/15 rounded-[2px] px-3 py-1.5 text-xs text-white outline-none font-mono"
            />
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs text-white">Homepage Feature</div>
              <div className="text-[10px] text-white/50">Showcase on root hero</div>
            </div>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-[#024696] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
