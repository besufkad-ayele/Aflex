'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Bot,
  Plus,
  Sparkles,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { createFaqItem, toggleFaqOrEventStatus } from '@/lib/cms/actions';
import type { FaqItem } from '@/lib/supabase/types';

type FaqRow = FaqItem & { usageCount?: number };

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<'en' | 'am' | 'om'>('en');
  const [search, setSearch] = useState('');

  const [testPrompt, setTestPrompt] = useState('');
  const [stewardResponse, setStewardResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [qEn, setQEn] = useState('');
  const [aEn, setAEn] = useState('');
  const [qAm, setQAm] = useState('');
  const [aAm, setAAm] = useState('');
  const [qOm, setQOm] = useState('');
  const [aOm, setAOm] = useState('');
  const [category, setCategory] = useState('Admissions & Curricula');

  const loadFaqs = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      setFaqs((data as FaqRow[]) || []);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Failed to load FAQs');
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadFaqs();
  }, []);

  const filtered = faqs.filter((f) => {
    const q = `${f.question_en} ${f.answer_en} ${f.category}`.toLowerCase();
    return q.includes(search.toLowerCase());
  });

  const handleTestSteward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPrompt.trim()) return;

    setIsThinking(true);
    setStewardResponse(null);

    setTimeout(() => {
      const needle = testPrompt.toLowerCase();
      const match = faqs.find(
        (f) =>
          f.question_en.toLowerCase().includes(needle) ||
          f.answer_en.toLowerCase().includes(needle) ||
          needle.includes('sululta') ||
          needle.includes('program') ||
          needle.includes('tender')
      );

      if (match) {
        setStewardResponse(
          `[Sululta Steward AI Knowledge Match - ${match.category}]:\n${match.answer_en}`
        );
      } else {
        setStewardResponse(
          `[Sululta Steward AI]: The African Leadership Excellence Academy at Sululta trains future continental leaders through executive curricula, cutting-edge research, and civil service development. Regarding "${testPrompt}", please contact the Directorate General at info@aflex.edu.et.`
        );
      }
      setIsThinking(false);
    }, 700);
  };

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qEn.trim() || !aEn.trim()) return;
    setSaving(true);
    try {
      await createFaqItem({
        category,
        question_en: qEn.trim(),
        answer_en: aEn.trim(),
        question_am: qAm.trim() || null,
        answer_am: aAm.trim() || null,
        question_om: qOm.trim() || null,
        answer_om: aOm.trim() || null,
      });
      setQEn('');
      setAEn('');
      setQAm('');
      setAAm('');
      setQOm('');
      setAOm('');
      setIsModalOpen(false);
      await loadFaqs();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save FAQ');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (faq: FaqRow) => {
    const nextStatus = faq.status === 'published' ? 'draft' : 'published';
    try {
      await toggleFaqOrEventStatus({ table: 'faqs', id: faq.id, nextStatus });
      setFaqs((prev) =>
        prev.map((f) => (f.id === faq.id ? { ...f, status: nextStatus } : f))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <Bot className="w-3.5 h-3.5 text-[#024696]" /> Cognitive AI & Institutional Knowledge
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Sululta Steward AI & FAQ Knowledge Base
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Curate ground-truth knowledge units for the institutional AI concierge and public FAQ.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b5953f] text-[#021024] font-mono font-semibold px-4 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Knowledge Unit</span>
        </button>
      </div>

      {loading && (
        <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Loading FAQs…</p>
      )}
      {loadError && (
        <div className="space-y-2 p-3 border border-rose-500/30 bg-rose-500/10 rounded-[2px]">
          <p className="text-xs font-mono text-rose-300">{loadError}</p>
          <p className="text-[11px] text-white/60 font-sans">
            If the message mentions a missing table, run{' '}
            <code className="text-[#C9A84C]">supabase/migrations/20261108_faqs_events.sql</code> in
            the Supabase SQL editor, then refresh.
          </p>
        </div>
      )}

      <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C]">
            <Sparkles className="w-3.5 h-3.5 text-[#024696]" />
            <span>Interactive Steward AI Agent Tester</span>
          </div>
          <span className="text-[10px] bg-[#024696]/20 text-[#C9A84C] border border-[#C9A84C]/30 px-2.5 py-0.5 rounded-[2px] font-mono uppercase tracking-widest">
            Live Knowledge Base
          </span>
        </div>

        <form onSubmit={handleTestSteward} className="flex gap-2">
          <input
            type="text"
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            placeholder="Simulate Steward AI (e.g. 'Where is campus?', 'How to apply for PSLE?')..."
            className="flex-1 bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-4 py-2 text-xs text-white placeholder-white/40 outline-none font-mono"
          />
          <button
            type="submit"
            disabled={isThinking}
            className="px-5 py-2 bg-[#024696] hover:bg-[#0356b8] disabled:opacity-50 text-white font-mono uppercase tracking-widest text-xs rounded-[2px] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span>{isThinking ? 'Thinking...' : 'Simulate'}</span>
          </button>
        </form>

        {stewardResponse && (
          <div className="p-3.5 rounded-[2px] bg-[#010c1c] border border-[#024696]/50 text-white/90 text-xs leading-relaxed font-sans">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9A84C] block mb-1">
              Steward AI Output:
            </span>
            {stewardResponse}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex p-1 bg-[#02142d] border border-white/10 rounded-[2px] gap-1 text-xs">
          {([
            ['en', 'English'],
            ['am', 'አማርኛ'],
            ['om', 'Afaan Oromoo'],
          ] as const).map(([code, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => setActiveLang(code)}
              className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeLang === code
                  ? code === 'am'
                    ? 'bg-[#C9A84C] text-[#021024] font-bold shadow'
                    : 'bg-[#024696] text-white shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search knowledge units…"
            className="bg-[#02142d] border border-white/10 rounded-[2px] px-3 py-1.5 text-xs text-white outline-none font-mono w-56"
          />
          <Link
            href="/faq"
            target="_blank"
            className="text-xs text-[#C9A84C] font-mono uppercase tracking-wider hover:underline"
          >
            View Public FAQ Portal →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((faq) => {
          const q =
            activeLang === 'en'
              ? faq.question_en
              : activeLang === 'am'
                ? faq.question_am || faq.question_en
                : faq.question_om || faq.question_en;
          const a =
            activeLang === 'en'
              ? faq.answer_en
              : activeLang === 'am'
                ? faq.answer_am || faq.answer_en
                : faq.answer_om || faq.answer_en;

          return (
            <div
              key={faq.id}
              className="bg-[#02142d] border border-white/10 rounded-[2px] p-5 space-y-3 hover:border-[#C9A84C]/40 transition-all shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] gap-2">
                  <span className="font-mono text-[#C9A84C] bg-[#024696]/20 px-2 py-0.5 rounded-[2px] border border-[#C9A84C]/30 font-semibold uppercase tracking-widest">
                    {faq.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(faq)}
                    className={`font-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px] border cursor-pointer ${
                      faq.status === 'published'
                        ? 'text-[#C9A84C] border-[#C9A84C]/40 bg-[#C9A84C]/10'
                        : 'text-white/50 border-white/10'
                    }`}
                  >
                    {faq.status}
                  </button>
                </div>

                <h3 className="font-serif font-bold text-white text-sm leading-snug">{q}</h3>
                <p className="text-xs text-white/70 leading-relaxed font-sans">{a}</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span>REF: {faq.id.slice(0, 8).toUpperCase()}</span>
                <span className="text-[#C9A84C] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#024696]" /> Ground Truth
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && !loadError && filtered.length === 0 && (
        <p className="text-xs text-white/60 font-sans border border-white/10 bg-[#02142d] px-3 py-3 rounded-[2px]">
          No FAQ knowledge units in the database yet. Add the first one to publish it live.
        </p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#021024]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">
                  Cognitive AI Knowledge Vault
                </div>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                  Add Knowledge Base Unit
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white/40 hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddFaq} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono text-[11px]"
                >
                  <option value="Admissions & Curricula">Admissions & Curricula</option>
                  <option value="Campus & Residency">Campus & Residency</option>
                  <option value="Research & Policy">Research & Policy</option>
                  <option value="Procurement & Bids">Procurement & Bids</option>
                  <option value="General Governance">General Governance</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  Question (English)
                </label>
                <input
                  type="text"
                  required
                  value={qEn}
                  onChange={(e) => setQEn(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  Answer (English)
                </label>
                <textarea
                  rows={3}
                  required
                  value={aEn}
                  onChange={(e) => setAEn(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  ጥያቄ (አማርኛ)
                </label>
                <input
                  type="text"
                  value={qAm}
                  onChange={(e) => setQAm(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  መልስ (አማርኛ)
                </label>
                <textarea
                  rows={2}
                  value={aAm}
                  onChange={(e) => setAAm(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  Gaaffii (Afaan Oromoo)
                </label>
                <input
                  type="text"
                  value={qOm}
                  onChange={(e) => setQOm(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  Deebii (Afaan Oromoo)
                </label>
                <textarea
                  rows={2}
                  value={aOm}
                  onChange={(e) => setAOm(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 rounded-[2px] font-mono text-xs uppercase tracking-wider hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#C9A84C] disabled:opacity-50 text-[#021024] font-mono text-xs uppercase tracking-widest font-bold rounded-[2px] hover:bg-[#b5953f]"
                >
                  {saving ? 'Saving…' : 'Save Knowledge Unit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
