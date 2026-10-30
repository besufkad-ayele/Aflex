'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, FileText, CheckCircle2, Clock, Eye, Download, Search, Filter } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { ProcurementTender } from '@/lib/supabase/types';

const INITIAL_DEMO_TENDERS: ProcurementTender[] = [
  {
    id: 'ten-01',
    tender_no: 'AFLEX/NCB/2026/041',
    title: 'Procurement of High-Performance Campus Datacenter & Cloud Architecture for AFLEX',
    procurement_type: 'National Competitive Bidding (NCB)',
    closing_date: '2026-11-25T14:00:00Z',
    bid_bond_amount: 150000,
    bid_bond_currency: 'ETB',
    tor_document_url: 'https://qezexucrwwdxgotpofph.supabase.co/storage/v1/object/public/bid-documents/tor-datacenter-2026.pdf',
    status: 'published',
    created_by: null,
    created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ten-02',
    tender_no: 'AFLEX/RFP/2026/019',
    title: 'Consultancy Services for Macroeconomic Impact Modeling of Pan-African Trade Corridor',
    procurement_type: 'Consultancy (RFP)',
    closing_date: '2026-12-10T17:00:00Z',
    bid_bond_amount: 80000,
    bid_bond_currency: 'ETB',
    tor_document_url: null,
    status: 'published',
    created_by: null,
    created_at: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ten-03',
    tender_no: 'AFLEX/ICB/2026/005',
    title: 'Supply, Installation & Commissioning of High-Altitude Athletics & Wellness Technology',
    procurement_type: 'International Competitive Bidding (ICB)',
    closing_date: '2027-01-15T10:00:00Z',
    bid_bond_amount: 10000,
    bid_bond_currency: 'USD',
    tor_document_url: 'https://qezexucrwwdxgotpofph.supabase.co/storage/v1/object/public/bid-documents/tor-wellness-2026.pdf',
    status: 'published',
    created_by: null,
    created_at: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function AdminProcurementPage() {
  const [tenders, setTenders] = useState<ProcurementTender[]>(INITIAL_DEMO_TENDERS);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadTenders() {
      try {
        const supabase = createClient();
        const { data } = await supabase.from('procurement_tenders').select('*').order('created_at', { ascending: false });
        if (data && data.length > 0) {
          setTenders(data as unknown as ProcurementTender[]);
        }
      } catch {
        // Fallback to demo items
      }
    }
    loadTenders();
  }, []);

  const handleToggleStatus = (id: string) => {
    const updated = tenders.map((t) =>
      t.id === id ? { ...t, status: t.status === 'published' ? 'draft' : 'published' } as ProcurementTender : t
    );
    setTenders(updated);
  };

  const filtered = tenders.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) || t.tender_no.toLowerCase().includes(search.toLowerCase())
  );

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
                    {item.tender_no}
                  </td>
                  <td className="py-4 px-4 font-medium text-white max-w-sm">
                    <div className="line-clamp-2">{item.title}</div>
                    {item.tor_document_url && (
                      <div className="text-[10px] text-[#C9A84C]/90 font-mono flex items-center gap-1 mt-1">
                        <Download className="w-3 h-3 text-[#024696]" /> TOR Document Attached
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-[2px] bg-[#010c1c] border border-white/10 text-white/70 font-mono text-[10px] tracking-wider uppercase">
                      {item.procurement_type}
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
                    {new Date(item.closing_date).toLocaleDateString()}
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
