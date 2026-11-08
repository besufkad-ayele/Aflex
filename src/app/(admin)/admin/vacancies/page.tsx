'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Briefcase, CheckCircle2, Clock, Eye, Search } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toggleContentStatus } from '@/lib/cms/actions';
import type { Vacancy } from '@/lib/supabase/types';

export default function AdminVacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadVacancies() {
      setLoading(true);
      setLoadError(null);
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('vacancies').select('*').order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        setVacancies((data as Vacancy[]) || []);
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : 'Failed to load vacancies');
        setVacancies([]);
      } finally {
        setLoading(false);
      }
    }
    loadVacancies();
  }, []);

  const handleToggleStatus = async (id: string) => {
    const current = vacancies.find((v) => v.id === id);
    if (!current) return;
    const nextStatus = current.status === 'published' ? 'draft' : 'published';
    try {
      await toggleContentStatus({ table: 'vacancies', id, nextStatus });
      setVacancies((prev) =>
        prev.map((v) => (v.id === id ? ({ ...v, status: nextStatus } as Vacancy) : v))
      );
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const filtered = vacancies.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()) || v.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#C9A84C] flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5" /> Human Capital Directorate
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Institutional Careers & Fellowships
          </h1>
          <p className="font-sans text-xs text-white/70 mt-1">
            Manage academic appointments, senior research chairs, and administrative recruitment postings.
          </p>
        </div>

        <Link
          href="/admin/vacancies/new"
          className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#d8b85c] text-[#021024] font-mono font-semibold px-4 py-2 rounded-[2px] text-xs uppercase tracking-wider transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Post New Vacancy</span>
        </Link>
      </div>

      {loading && (
        <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Loading vacancies…</p>
      )}
      {loadError && (
        <p className="text-xs font-mono text-rose-300 border border-rose-500/30 bg-rose-500/10 px-3 py-2 rounded-[2px]">
          {loadError}
        </p>
      )}
      {!loading && !loadError && vacancies.length === 0 && (
        <p className="text-xs font-sans text-white/60 border border-white/10 bg-[#02142d] px-3 py-3 rounded-[2px]">
          No vacancy postings in the database yet.
        </p>
      )}

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-[#02142d] border border-white/10 p-3 rounded-[2px]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles or departments..."
            className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 outline-none font-sans"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#02142d] border border-white/10 rounded-[2px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#010c1c] border-b border-white/10 text-white/60 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Ref #</th>
                <th className="py-3 px-4">Role Title</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80 font-sans">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#C9A84C]">
                    {item.reference_no || item.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-white">
                    <div>{item.title}</div>
                    <div className="font-mono text-[10px] text-white/40 mt-0.5">
                      {item.experience_level || item.category || 'Open role'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-white/70">
                    {item.department}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-[2px] bg-[#024696]/20 border border-white/10 text-white font-mono text-[10px]">
                      {item.type || item.employment_type || '—'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-white/60">
                    {item.deadline ? new Date(item.deadline).toLocaleDateString() : '—'}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(item.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] uppercase border cursor-pointer ${
                        item.status === 'published'
                          ? 'bg-[#C9A84C]/15 text-[#C9A84C] border-[#C9A84C]/40'
                          : 'bg-white/5 text-white/60 border-white/10'
                      }`}
                    >
                      {item.status === 'published' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-[#C9A84C]" /> Active
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" /> {item.status}
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href="/vacancy"
                      target="_blank"
                      className="font-mono text-[11px] text-[#C9A84C] hover:underline uppercase tracking-wider inline-flex items-center gap-1"
                    >
                      <span>Live</span>
                      <Eye className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
