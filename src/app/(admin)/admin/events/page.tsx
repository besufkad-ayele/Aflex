'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Plus,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { createAcademyEvent, toggleFaqOrEventStatus } from '@/lib/cms/actions';
import type { AcademyEventRow } from '@/lib/supabase/types';

function formatEventWindow(startsAt: string, endsAt: string | null) {
  const start = new Date(startsAt);
  if (Number.isNaN(start.getTime())) return startsAt;
  const startLabel = start.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  if (!endsAt) return startLabel;
  const end = new Date(endsAt);
  if (Number.isNaN(end.getTime())) return startLabel;
  return `${startLabel} – ${end.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;
}

function deriveUiStatus(startsAt: string, endsAt: string | null, status: string) {
  if (status !== 'published') return status;
  const now = Date.now();
  const start = new Date(startsAt).getTime();
  const end = endsAt ? new Date(endsAt).getTime() : start + 24 * 60 * 60 * 1000;
  if (now < start) return 'upcoming';
  if (now > end) return 'completed';
  return 'in_progress';
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AcademyEventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [location, setLocation] = useState('Nelson Mandela Great Hall, Sululta');
  const [summary, setSummary] = useState('');
  const [featured, setFeatured] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('starts_at', { ascending: true });
      if (error) throw new Error(error.message);
      setEvents((data as AcademyEventRow[]) || []);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Failed to load events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadEvents();
  }, []);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startsAt) return;
    setSaving(true);
    try {
      await createAcademyEvent({
        title: title.trim(),
        summary: summary.trim() || null,
        location: location.trim() || null,
        starts_at: new Date(startsAt).toISOString(),
        ends_at: endsAt ? new Date(endsAt).toISOString() : null,
        featured,
      });
      setTitle('');
      setStartsAt('');
      setEndsAt('');
      setSummary('');
      setFeatured(false);
      setIsModalOpen(false);
      await loadEvents();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to publish event');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (evt: AcademyEventRow) => {
    const nextStatus = evt.status === 'published' ? 'draft' : 'published';
    try {
      await toggleFaqOrEventStatus({
        table: 'events',
        id: evt.id,
        nextStatus,
        slug: evt.slug,
      });
      setEvents((prev) =>
        prev.map((row) => (row.id === evt.id ? { ...row, status: nextStatus } : row))
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
            <Calendar className="w-3.5 h-3.5 text-[#024696]" /> Summits & Executive Forums
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Institutional Events & Symposiums
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Coordinate continental leadership summits, academic symposiums, and executive workshops.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b5953f] text-[#021024] font-mono font-semibold px-4 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Event</span>
        </button>
      </div>

      {loading && (
        <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Loading events…</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => {
          const uiStatus = deriveUiStatus(evt.starts_at, evt.ends_at, evt.status);

          return (
            <div
              key={evt.id}
              className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 flex flex-col justify-between hover:border-[#C9A84C]/40 transition-all shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-semibold text-[#C9A84C] bg-[#024696]/20 px-2.5 py-1 rounded-[2px] border border-[#C9A84C]/30 uppercase tracking-widest truncate max-w-[55%]">
                    {evt.slug}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(evt)}
                    className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-[2px] bg-[#024696]/20 text-[#C9A84C] border border-[#C9A84C]/40 cursor-pointer"
                  >
                    {uiStatus}
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-[#C9A84C] transition-colors leading-snug">
                    {evt.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#C9A84C]/90 font-mono mt-2">
                    <Calendar className="w-3.5 h-3.5 text-[#024696]" />
                    <span>{formatEventWindow(evt.starts_at, evt.ends_at)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
                    <span className="truncate">{evt.location || 'Sululta Campus'}</span>
                  </div>
                  {evt.summary && (
                    <p className="text-[11px] text-white/60 leading-relaxed font-sans line-clamp-3">
                      {evt.summary}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/40">
                    <Clock className="w-3 h-3" />
                    <span>{evt.status}</span>
                    {evt.featured && (
                      <span className="text-[#C9A84C] border border-[#C9A84C]/40 px-1.5 py-0.5 rounded-[2px]">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <Link
                  href="/events"
                  target="_blank"
                  className="text-[#C9A84C] hover:underline font-mono text-[11px] uppercase tracking-wider flex items-center gap-1"
                >
                  View Public Calendar <ExternalLink className="w-3 h-3" />
                </Link>
                {evt.status === 'published' ? (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A84C] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Live
                  </span>
                ) : (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                    Draft
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!loading && !loadError && events.length === 0 && (
        <p className="text-xs text-white/60 font-sans border border-white/10 bg-[#02142d] px-3 py-3 rounded-[2px]">
          No events in the database yet. Schedule the first summit to publish it live.
        </p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#021024]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">
                  Leadership Forums & Summits
                </div>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                  Schedule Executive Summit
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

            <form onSubmit={handleAddEvent} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. African Digital Transformation Executive Forum"
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                    Starts
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={startsAt}
                    onChange={(e) => setStartsAt(e.target.value)}
                    className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                    Ends
                  </label>
                  <input
                    type="datetime-local"
                    value={endsAt}
                    onChange={(e) => setEndsAt(e.target.value)}
                    className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  Campus Venue
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  Summary / Keynote
                </label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Keynote speakers, agenda notes, or delegate focus…"
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none resize-none"
                />
              </div>

              <label className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="accent-[#C9A84C]"
                />
                Feature on homepage / events board
              </label>

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
                  {saving ? 'Publishing…' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
