'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Users, 
  Clock, 
  Eye, 
  Layers, 
  Plus, 
  CheckCircle2, 
  Edit3, 
  Save,
  Check
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { updateProgramFields } from '@/lib/cms/actions';
import type { Program } from '@/lib/supabase/types';

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editLead, setEditLead] = useState('');
  const [editFormat, setEditFormat] = useState('');
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    async function loadPrograms() {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('programs').select('*').order('code');
        if (error) throw error;
        setPrograms((data as unknown as Program[]) || []);
      } catch {
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    }
    loadPrograms();
  }, []);

  const openEditor = (prog: Program) => {
    setSelectedProgram(prog);
    setEditTitle(prog.title);
    setEditLead(prog.lead || '');
    setEditFormat(prog.format || '');
    setIsEditing(true);
  };

  const handleSaveProgram = async () => {
    if (!selectedProgram) return;
    try {
      await updateProgramFields({
        id: selectedProgram.id,
        title: editTitle,
        lead: editLead,
        format: editFormat,
      });
      const updated = programs.map((p) =>
        p.id === selectedProgram.id
          ? { ...p, title: editTitle, lead: editLead, format: editFormat, updated_at: new Date().toISOString() }
          : p
      );
      setPrograms(updated);
      setSavedFeedback(true);
      setTimeout(() => {
        setSavedFeedback(false);
        setIsEditing(false);
      }, 1200);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save program');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#C9A84C] flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" /> Academic Senate & Curricula
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Flagship Leadership Programs
          </h1>
          <p className="font-sans text-xs text-white/70 mt-1">
            Configure learning modules, target audiences, and executive competencies for the continental curriculum.
          </p>
        </div>

        <Link
          href="/en/programs"
          target="_blank"
          className="inline-flex items-center gap-2 bg-[#024696] hover:bg-[#0358c4] text-white font-mono px-4 py-2 rounded-[2px] text-xs uppercase tracking-wider transition-colors shrink-0"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Public Programs Page</span>
        </Link>
      </div>

      {loading && (
        <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Loading programs…</p>
      )}
      {!loading && programs.length === 0 && (
        <p className="text-xs font-sans text-white/60 border border-white/10 bg-[#02142d] px-3 py-3 rounded-[2px]">
          No programs found in Supabase yet.
        </p>
      )}

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {programs.map((prog) => {
          const modules = Array.isArray(prog.modules) ? prog.modules : [];
          const outcomes = Array.isArray(prog.outcomes) ? prog.outcomes : [];

          return (
            <div
              key={prog.id}
              className="bg-[#02142d] border border-white/10 hover:border-[#C9A84C]/50 rounded-[2px] p-6 flex flex-col justify-between transition-colors group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-medium text-[#C9A84C] uppercase tracking-wider">
                    {prog.code}
                  </span>
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-[2px] bg-[#024696]/40 text-white border border-[#024696]">
                    {prog.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#C9A84C] transition-colors leading-snug">
                    {prog.title}
                  </h3>
                  <p className="font-sans text-xs text-white/70 mt-2 line-clamp-3 leading-relaxed">
                    {prog.lead}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs font-sans text-white/80">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
                    <span>{prog.format}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
                    <span className="truncate">{prog.target_audience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Layers className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
                    <span>{modules.length} Core Modules &bull; {outcomes.length} Learning Outcomes</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => openEditor(prog)}
                  className="inline-flex items-center gap-1.5 text-white bg-[#024696]/30 hover:bg-[#024696] border border-white/10 px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3 h-3 text-[#C9A84C]" />
                  <span>Edit Curriculum</span>
                </button>
                <Link
                  href="/en/programs"
                  target="_blank"
                  className="font-mono text-[11px] text-[#C9A84C] hover:underline uppercase tracking-wider inline-flex items-center gap-1"
                >
                  <span>Live</span>
                  <Eye className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Curriculum Editor Modal */}
      {isEditing && selectedProgram && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#02142d] border border-white/20 rounded-[2px] p-6 max-w-xl w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[10px] text-[#C9A84C] uppercase tracking-wider">{selectedProgram.code}</span>
                <h3 className="font-serif text-lg font-bold text-white">Edit Program Curriculum</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="font-mono text-xs text-white/60 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-white outline-none font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">Format & Duration</label>
                <input
                  type="text"
                  value={editFormat}
                  onChange={(e) => setEditFormat(e.target.value)}
                  className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-white outline-none font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]">Executive Overview</label>
                <textarea
                  rows={4}
                  value={editLead}
                  onChange={(e) => setEditLead(e.target.value)}
                  className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] px-3 py-2 text-white outline-none font-sans resize-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#C9A84C]">
                  {savedFeedback ? 'Saved and revalidated live!' : 'Saves changes directly to state and database.'}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 text-white rounded-[2px] font-mono text-xs uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProgram}
                    className="px-4 py-1.5 bg-[#C9A84C] hover:bg-[#d8b85c] text-[#021024] font-mono font-bold rounded-[2px] text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
