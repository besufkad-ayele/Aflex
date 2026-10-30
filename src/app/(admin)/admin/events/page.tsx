'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Plus, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ExecutiveEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  delegateCapacity: number;
  registeredCount: number;
  keynote: string;
  status: 'upcoming' | 'in_progress' | 'completed';
}

const INITIAL_EVENTS: ExecutiveEvent[] = [
  {
    id: 'evt-01',
    title: 'High-Level Pan-African Executive Leadership Symposium 2026',
    date: 'November 14 - 17, 2026',
    location: 'Nelson Mandela Great Hall, Sululta Campus',
    delegateCapacity: 450,
    registeredCount: 388,
    keynote: 'HE Prime Minister & AU Commission Leadership',
    status: 'upcoming',
  },
  {
    id: 'evt-02',
    title: 'Project WILD Continental Executive Immersion Forum',
    date: 'December 02 - 05, 2026',
    location: 'African Unity Executive Pavilion, Sululta',
    delegateCapacity: 180,
    registeredCount: 165,
    keynote: 'Dr. Amina Diop & Leading African Women CEOs',
    status: 'upcoming',
  },
  {
    id: 'evt-03',
    title: 'Public Service Leadership Excellence (PSLE) Cohort IV Graduation',
    date: 'January 20, 2027',
    location: 'Main Amphitheater, AFLEX Sululta',
    delegateCapacity: 600,
    registeredCount: 520,
    keynote: 'Federal Civil Service Commission & AFLEX Senate',
    status: 'upcoming',
  },
];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<ExecutiveEvent[]>(INITIAL_EVENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Event Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('Nelson Mandela Great Hall, Sululta');
  const [capacity, setCapacity] = useState(250);
  const [keynote, setKeynote] = useState('');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvent: ExecutiveEvent = {
      id: `evt-0${events.length + 1}`,
      title: title.trim(),
      date: date || 'December 2026',
      location,
      delegateCapacity: Number(capacity) || 200,
      registeredCount: 1,
      keynote: keynote.trim() || 'Distinguished African Leaders',
      status: 'upcoming',
    };

    setEvents([newEvent, ...events]);
    setTitle('');
    setDate('');
    setKeynote('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <Calendar className="w-3.5 h-3.5 text-[#024696]" /> Summits & Executive Forums
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Institutional Events & Symposiums
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Coordinate continental leadership summits, academic symposiums, and executive cohort workshops.
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => {
          const percentFull = Math.min(100, Math.round((evt.registeredCount / evt.delegateCapacity) * 100));

          return (
            <div
              key={evt.id}
              className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 flex flex-col justify-between hover:border-[#C9A84C]/40 transition-all shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold text-[#C9A84C] bg-[#024696]/20 px-2.5 py-1 rounded-[2px] border border-[#C9A84C]/30 uppercase tracking-widest">
                    {evt.id.toUpperCase()}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-[2px] bg-[#024696]/20 text-[#C9A84C] border border-[#C9A84C]/40">
                    {evt.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-[#C9A84C] transition-colors leading-snug">
                    {evt.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#C9A84C]/90 font-mono mt-2">
                    <Calendar className="w-3.5 h-3.5 text-[#024696]" />
                    <span>{evt.date}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <Users className="w-3.5 h-3.5 text-[#024696] shrink-0" />
                    <span>{evt.registeredCount} / {evt.delegateCapacity} Delegates Registered ({percentFull}%)</span>
                  </div>
                  <div className="w-full bg-[#010c1c] border border-white/5 h-1.5 rounded-[1px] overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#024696] to-[#C9A84C] h-full rounded-[1px] transition-all duration-500"
                      style={{ width: `${percentFull}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-white/50 pt-1">
                    <span className="text-white/80 font-mono uppercase tracking-wider text-[10px]">Keynote: </span>
                    {evt.keynote}
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
                <button
                  type="button"
                  onClick={() => {
                    const updated = events.map(e => e.id === evt.id ? { ...e, registeredCount: e.registeredCount + 1 } : e);
                    setEvents(updated);
                  }}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-[2px] text-[10px] font-mono uppercase tracking-wider cursor-pointer"
                >
                  + Simulate RSVP
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#021024]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">Leadership Forums & Summits</div>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">Schedule Executive Summit</h3>
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
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Event Title</label>
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
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Dates / Duration</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Dec 10 - 12, 2026"
                    className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Delegate Capacity</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Campus Venue</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Keynote Speaker(s)</label>
                <input
                  type="text"
                  value={keynote}
                  onChange={(e) => setKeynote(e.target.value)}
                  placeholder="e.g. AU Commissioners & Federal Ministers"
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none"
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
                  className="px-4 py-2 bg-[#C9A84C] text-[#021024] font-mono text-xs uppercase tracking-widest font-bold rounded-[2px] hover:bg-[#b5953f]"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

