'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, FileText, CheckCircle2, Clock, Eye, Download, Search, Filter } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toggleContentStatus } from '@/lib/cms/actions';
import type { ProcurementTender } from '@/lib/supabase/types';

export default function AdminProcurementPage() {
  const [tenders, setTenders] = useState<ProcurementTender[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadTenders() {
      setLoading(true);
      setLoadError(null);
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('procurement_tenders').select('*').order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        setTenders((data as ProcurementTender[]) || []);
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : 'Failed to load tenders');
        setTenders([]);
      } finally {
        setLoading(false);
      }
    }
    loadTenders();
  }, []);

  const handleToggleStatus = async (id: string) => {
    const current = tenders.find((t) => t.id === id);
    if (!current) return;
    const nextStatus = current.status === 'published' ? 'draft' : 'published';
    try {
      await toggleContentStatus({ table: 'procurement_tenders', id, nextStatus });
      setTenders((prev) =>
        prev.map((t) => (t.id === id ? ({ ...t, status: nextStatus } as ProcurementTender) : t))
      );
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const filtered = tenders.filter((t) => {
    const ref = (t.tender_ref_number || t.tender_no || '').toLowerCase();
    return t.title.toLowerCase().includes(search.toLowerCase()) || ref.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <FileText className="w-3.5 h-3.5 text-[#024696]" /> Procurement & Property Directorate
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Institutional Tenders & Invitations to Bid
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Oversee public tenders, procurement notices, bid security bonds, and Terms of Reference (TOR) files.
          </p>
        </div>

        <Link
          href="/admin/procurement/new"
          className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b5953f] text-[#021024] font-mono font-semibold px-4 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Tender Notice</span>
        </Link>
      </div>

      {loading && (
        <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Loading tenders…</p>
      )}
      {loadError && (
        <p className="text-xs font-mono text-rose-300 border border-rose-500/30 bg-rose-500/10 px-3 py-2 rounded-[2px]">
          {loadError}
        </p>
      )}
      {!loading && !loadError && tenders.length === 0 && (
        <p className="text-xs font-sans text-white/60 border border-white/10 bg-[#02142d] px-3 py-3 rounded-[2px]">
          No procurement notices in the database yet.
        </p>
      )}

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-[#02142d] border border-white/10 p-3.5 rounded-[2px]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tenders by ref or title..."
            className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 outline-none font-mono"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#02142d] border border-white/10 rounded-[2px] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#010c1c] border-b border-white/10 text-white/60 font-mono text-[10px] uppercase tracking-widest">
                <th className="py-3.5 px-4">Tender Ref</th>
                <th className="py-3.5 px-4">Tender Title</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Bid Security (CPO)</th>
                <th className="py-3.5 px-4">Closing Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-mono font-semibold text-[#C9A84C]">
                    {item.tender_ref_number || item.tender_no}
                  </td>
                  <td className="py-4 px-4 font-medium text-white max-w-sm">
                    <div className="line-clamp-2">{item.title}</div>
                    {(item.document_url || item.tor_document_url) && (
                      <div className="text-[10px] text-[#C9A84C]/90 font-mono flex items-center gap-1 mt-1">
                        <Download className="w-3 h-3 text-[#024696]" /> TOR Document Attached
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-[2px] bg-[#010c1c] border border-white/10 text-white/70 font-mono text-[10px] tracking-wider uppercase">
                      {item.category || item.procurement_type || '—'}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-white/80">
                    {item.bid_bond_amount ? (
                      <span>
                        {Number(item.bid_bond_amount).toLocaleString()} {item.bid_bond_currency || 'ETB'}
                      </span>
                    ) : (
                      <span className="text-white/40">None required</span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-mono text-white/70">
                    {new Date(item.submission_deadline || item.closing_date || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(item.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] text-[10px] font-mono tracking-widest uppercase border cursor-pointer transition-colors ${
                        item.status === 'published'
                          ? 'bg-[#024696]/20 text-[#C9A84C] border-[#C9A84C]/40'
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
                  <td className="py-4 px-4 text-right">
                    <Link
                      href="/procurement"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-white/60 hover:text-[#C9A84C] p-1.5 hover:bg-white/5 rounded-[2px] transition-colors"
                      title="View public tender board"
                    >
                      <Eye className="w-4 h-4" />
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
