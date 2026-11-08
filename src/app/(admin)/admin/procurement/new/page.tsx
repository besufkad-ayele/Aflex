'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { revalidateCmsContent } from '@/lib/cms/actions';

export default function NewProcurementTenderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [tenderNo, setTenderNo] = useState(`AFLEX/NCB/${new Date().getFullYear()}/${Math.floor(10 + Math.random() * 90)}`);
  const [title, setTitle] = useState('');
  const [procurementType, setProcurementType] = useState('NCB');
  const [closingDate, setClosingDate] = useState(new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [bidBondAmount, setBidBondAmount] = useState<string>('50000');
  const [bidBondCurrency, setBidBondCurrency] = useState('ETB');
  const [torDocumentUrl, setTorDocumentUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Tender title is required.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const payload = {
        tender_no: tenderNo.trim(),
        title: title.trim(),
        procurement_type: procurementType,
        closing_date: new Date(closingDate).toISOString(),
        bid_bond_amount: bidBondAmount ? Number(bidBondAmount) : null,
        bid_bond_currency: bidBondCurrency,
        tor_document_url: torDocumentUrl.trim() || null,
        status: 'published' as const,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await supabase
        .from('procurement_tenders')
        .insert(payload as any)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await supabase.from('audit_logs').insert({
        action: 'TENDER_ISSUED',
        target_table: 'procurement_tenders',
        target_id: (data as any)?.id,
        new_data: { tender_no: tenderNo, title },
      } as any);

      await revalidateCmsContent({
        table: 'procurement_tenders',
        record: { id: (data as { id?: string } | null)?.id },
      }).catch((e) => console.warn('Cache revalidation trigger:', e));

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/procurement');
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to publish tender.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/procurement"
            className="p-2 rounded-[2px] bg-[#02142d] hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">Procurement & Property</div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
              Issue Public Tender Notice
            </h1>
            <p className="text-xs text-white/60 mt-0.5">
              Publish Invitation for Bids (IFB) complying with Federal Public Procurement guidelines.
            </p>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-[2px] bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-[2px] bg-[#024696]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs flex items-center gap-2.5 font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C9A84C]" />
          <span>Tender published successfully! Public portal updated.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-widest text-white/70">
              Tender Reference Number <span className="text-[#C9A84C]">*</span>
            </label>
            <input
              type="text"
              required
              value={tenderNo}
              onChange={(e) => setTenderNo(e.target.value)}
              className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-4 py-2.5 text-xs text-white font-mono outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-widest text-white/70">
              Procurement Category
            </label>
            <select
              value={procurementType}
              onChange={(e) => setProcurementType(e.target.value)}
              className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-3 py-2.5 text-xs text-white outline-none font-mono"
            >
              <option value="NCB">National Competitive Bidding (NCB)</option>
              <option value="ICB">International Competitive Bidding (ICB)</option>
              <option value="Consultancy">Consultancy Services (RFP)</option>
              <option value="Framework">Framework Agreement</option>
              <option value="Expression of Interest">Expression of Interest (EOI)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-mono uppercase tracking-widest text-white/70">
            Tender / Assignment Title <span className="text-[#C9A84C]">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Procurement of High-Performance Campus Datacenter & Cloud Architecture for AFLEX"
            className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-widest text-white/70">
              Closing / Submission Date <span className="text-[#C9A84C]">*</span>
            </label>
            <input
              type="date"
              required
              value={closingDate}
              onChange={(e) => setClosingDate(e.target.value)}
              className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-xs text-white outline-none font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-widest text-white/70">
              Bid Bond Security (CPO)
            </label>
            <input
              type="number"
              value={bidBondAmount}
              onChange={(e) => setBidBondAmount(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-xs text-white outline-none font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-widest text-white/70">
              Currency
            </label>
            <select
              value={bidBondCurrency}
              onChange={(e) => setBidBondCurrency(e.target.value)}
              className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-xs text-white outline-none font-mono"
            >
              <option value="ETB">ETB (Ethiopian Birr)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-mono uppercase tracking-widest text-white/70">
            Terms of Reference (TOR) / Bid Document URL
          </label>
          <input
            type="url"
            value={torDocumentUrl}
            onChange={(e) => setTorDocumentUrl(e.target.value)}
            placeholder="https://qezexucrwwdxgotpofph.supabase.co/storage/v1/object/public/bid-documents/tor-2026.pdf"
            className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] px-4 py-2.5 text-xs text-white placeholder-white/30 outline-none font-mono"
          />
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b5953f] disabled:opacity-50 text-[#021024] font-mono font-semibold px-6 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Publishing...' : 'Publish Official Tender'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
