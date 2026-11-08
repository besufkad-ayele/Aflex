'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { revalidateCmsContent } from '@/lib/cms/actions';

export default function NewVacancyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [referenceNo, setReferenceNo] = useState(`AFLEX-HR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Center for Pan-African Leadership');
  const [location, setLocation] = useState('Sululta, Ethiopia');
  const [employmentType, setEmploymentType] = useState('Full-Time');
  const [positionsAvailable, setPositionsAvailable] = useState(1);
  const [deadline, setDeadline] = useState(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [requirements, setRequirements] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [applicationUrl, setApplicationUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Role title is required.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const payload = {
        title: title.trim(),
        department,
        category: 'Leadership & Executive',
        location,
        type: employmentType,
        experience_level: Number(positionsAvailable) > 1 ? 'Multiple openings' : 'Open',
        summary: responsibilities.trim() || title.trim(),
        duties: responsibilities.trim() || null,
        requirements: requirements.trim() || null,
        compensation: applicationUrl.trim()
          ? `Apply: ${applicationUrl.trim()}`
          : 'Competitive institutional scale',
        deadline: new Date(deadline).toISOString(),
        status: 'published' as const,
        created_by: user?.id ?? null,
      };

      const { data, error } = await supabase
        .from('vacancies')
        .insert(payload as never)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      await supabase.from('audit_logs').insert({
        user_id: user?.id ?? null,
        user_email: user?.email ?? null,
        action: 'VACANCY_POSTED',
        entity_type: 'vacancies',
        entity_id: (data as { id?: string } | null)?.id ?? null,
        changes: { reference_no: referenceNo, title },
      } as never);

      await revalidateCmsContent({
        table: 'vacancies',
        record: { id: (data as { id?: string } | null)?.id },
      }).catch(() => {});

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/vacancies');
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to post vacancy.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/vacancies"
            className="p-2 rounded-[2px] bg-[#024696]/30 border border-white/10 hover:border-white/30 text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#C9A84C]">
              Human Capital Directorate
            </div>
            <h1 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
              Post Institutional Opening
            </h1>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono rounded-[2px]">
          {errorMsg}
        </div>
      )}

      {success && (
        <div className="p-3 bg-[#024696]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-mono rounded-[2px]">
          Vacancy published successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 space-y-4 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
              Reference Number *
            </label>
            <input
              type="text"
              required
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
              className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3.5 py-2 text-xs text-white font-mono outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
              Application Deadline *
            </label>
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3.5 py-2 text-xs text-white outline-none font-mono"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
            Position Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Research Fellow in Governance & African Integration"
            className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3.5 py-2 text-sm text-white placeholder-white/40 outline-none font-sans"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-[#010e21] border border-white/15 rounded-[2px] px-3 py-2 text-xs text-white outline-none font-sans"
            >
              <option value="Center for Pan-African Leadership">Center for Pan-African Leadership</option>
              <option value="Research & Policy Analysis Directorate">Research & Policy Analysis</option>
              <option value="Executive Education Wing">Executive Education Wing</option>
              <option value="Information & Communications Tech">ICT & Smart Campus</option>
              <option value="Administration & Institutional Operations">Administration</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
              Employment Type
            </label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full bg-[#010e21] border border-white/15 rounded-[2px] px-3 py-2 text-xs text-white outline-none font-sans"
            >
              <option value="Full-Time">Full-Time (Permanent)</option>
              <option value="Contractual">Contractual (2-Year)</option>
              <option value="Visiting Fellow">Visiting Fellow</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
              Positions Count
            </label>
            <input
              type="number"
              min={1}
              value={positionsAvailable}
              onChange={(e) => setPositionsAvailable(Number(e.target.value))}
              className="w-full bg-[#010e21] border border-white/15 rounded-[2px] px-3 py-2 text-xs text-white outline-none font-mono"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
            Responsibilities
          </label>
          <textarea
            rows={3}
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            className="w-full bg-[#010e21] border border-white/15 rounded-[2px] px-3 py-2 text-xs text-white placeholder-white/40 outline-none font-sans resize-y"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
            Requirements & Qualifications
          </label>
          <textarea
            rows={3}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full bg-[#010e21] border border-white/15 rounded-[2px] px-3 py-2 text-xs text-white placeholder-white/40 outline-none font-sans resize-y"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">
            Application Portal URL
          </label>
          <input
            type="url"
            value={applicationUrl}
            onChange={(e) => setApplicationUrl(e.target.value)}
            placeholder="https://recruitment.aflex.edu.et"
            className="w-full bg-[#010e21] border border-white/15 rounded-[2px] px-3 py-2 text-xs text-white placeholder-white/40 outline-none font-mono"
          />
        </div>

        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#d8b85c] disabled:opacity-50 text-[#021024] font-mono font-semibold px-6 py-2.5 rounded-[2px] text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{loading ? 'Publishing...' : 'Publish Vacancy Live'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
