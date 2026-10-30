'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Plus, 
  FileText, 
  Globe, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Sparkles,
  Download,
  ExternalLink
} from 'lucide-react';

interface ResearchPaper {
  id: string;
  title: string;
  thematicPillar: string;
  leadAuthor: string;
  publishedYear: number;
  status: 'published' | 'under_review' | 'archived';
  downloadsCount: number;
  abstract: string;
}

const INITIAL_RESEARCH: ResearchPaper[] = [
  {
    id: 'res-01',
    title: 'Transformational Leadership Paradigms for the African Century',
    thematicPillar: 'Pan-African Integration',
    leadAuthor: 'Dr. Zewdu Mengiste & Prof. Kofi Asante',
    publishedYear: 2026,
    status: 'published',
    downloadsCount: 1420,
    abstract: 'An empirical exploration of indigenous African leadership philosophies synthesized with modern agile governance structures across 18 AU member states.',
  },
  {
    id: 'res-02',
    title: 'Digital Public Infrastructure & AI-Driven Governance in Ethiopia',
    thematicPillar: 'Smart Governance',
    leadAuthor: 'Bethlehem Tadesse & Dr. Yared Hailu',
    publishedYear: 2026,
    status: 'published',
    downloadsCount: 890,
    abstract: 'Analyzing the societal and institutional impact of national biometric digital ID, interoperable payment switches, and governmental AI stewardship in Sululta.',
  },
  {
    id: 'res-03',
    title: 'Public Sector Ethics, Anti-Corruption Mechanisms & Meritocracy',
    thematicPillar: 'Public Sector Ethics',
    leadAuthor: 'Mekonnen Kebede',
    publishedYear: 2025,
    status: 'published',
    downloadsCount: 2310,
    abstract: 'Framework for civil service modernization and anti-corruption compliance systems designed for institutional excellence.',
  },
  {
    id: 'res-04',
    title: 'Project WILD: Women in Transformative African Executive Leadership',
    thematicPillar: 'Transformational Leadership',
    leadAuthor: 'Almaz Wolde & Dr. Amina Diop',
    publishedYear: 2026,
    status: 'under_review',
    downloadsCount: 340,
    abstract: 'Evaluating long-term career progression and institutional outcomes of female leaders across the East African civil service.',
  },
];

export default function AdminResearchPage() {
  const [papers, setPapers] = useState<ResearchPaper[]>(INITIAL_RESEARCH);
  const [search, setSearch] = useState('');
  const [pillarFilter, setPillarFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Paper Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPillar, setNewPillar] = useState('Pan-African Integration');
  const [newAuthor, setNewAuthor] = useState('AFLEX Research Directorate');
  const [newAbstract, setNewAbstract] = useState('');

  const handleAddPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry: ResearchPaper = {
      id: `res-0${papers.length + 1}`,
      title: newTitle.trim(),
      thematicPillar: newPillar,
      leadAuthor: newAuthor,
      publishedYear: new Date().getFullYear(),
      status: 'published',
      downloadsCount: 0,
      abstract: newAbstract.trim() || 'Comprehensive policy brief developed under the AFLEX Research Directorate.',
    };

    setPapers([newEntry, ...papers]);
    setNewTitle('');
    setNewAbstract('');
    setIsModalOpen(false);
  };

  const filteredPapers = papers.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.leadAuthor.toLowerCase().includes(search.toLowerCase());
    const matchesPillar = pillarFilter === 'All' || p.thematicPillar === pillarFilter;
    return matchesSearch && matchesPillar;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <BookOpen className="w-3.5 h-3.5 text-[#024696]" /> Pan-African Policy Center
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Research Papers & Policy Briefs
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Manage academic publications, working papers, and Pan-African policy initiatives.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b5953f] text-[#021024] font-mono font-semibold px-4 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Research Publication</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#02142d] border border-white/10 p-3.5 rounded-[2px]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search papers by title or author..."
            className="w-full bg-[#010c1c] border border-white/10 focus:border-[#C9A84C] rounded-[2px] pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 outline-none font-mono"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-white/40" />
          <select
            value={pillarFilter}
            onChange={(e) => setPillarFilter(e.target.value)}
            className="bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-xs text-white outline-none cursor-pointer font-mono text-[11px]"
          >
            <option value="All">All Thematic Pillars</option>
            <option value="Pan-African Integration">Pan-African Integration</option>
            <option value="Smart Governance">Smart Governance</option>
            <option value="Public Sector Ethics">Public Sector Ethics</option>
            <option value="Transformational Leadership">Transformational Leadership</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#02142d] border border-white/10 rounded-[2px] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#010c1c] border-b border-white/10 text-white/60 font-mono text-[10px] uppercase tracking-widest">
                <th className="py-3.5 px-4">Research Paper Title</th>
                <th className="py-3.5 px-4">Thematic Pillar</th>
                <th className="py-3.5 px-4">Authors</th>
                <th className="py-3.5 px-4">Year</th>
                <th className="py-3.5 px-4">Downloads</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {filteredPapers.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-medium text-white max-w-sm">
                    <div className="line-clamp-2">{p.title}</div>
                    <div className="text-[11px] text-white/50 mt-1 line-clamp-1">{p.abstract}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-[2px] bg-[#024696]/20 text-[#C9A84C] font-mono text-[10px] uppercase tracking-wider border border-[#C9A84C]/30">
                      {p.thematicPillar}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/70">
                    {p.leadAuthor}
                  </td>
                  <td className="py-4 px-4 font-mono text-white/60">
                    {p.publishedYear}
                  </td>
                  <td className="py-4 px-4 font-mono text-[#C9A84C]">
                    <div className="flex items-center gap-1.5">
                      <Download className="w-3 h-3 text-[#024696]" />
                      <span>{p.downloadsCount.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {p.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-[#024696]/20 text-[#C9A84C] border border-[#C9A84C]/40 text-[10px] font-mono uppercase tracking-widest">
                        <CheckCircle2 className="w-3 h-3 text-[#C9A84C]" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-white/5 text-white/60 border border-white/10 text-[10px] font-mono uppercase tracking-widest">
                        <Clock className="w-3 h-3" /> In Review
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      href="/library"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-[#C9A84C] hover:underline font-mono text-[11px] uppercase tracking-wider"
                    >
                      <span>Public Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Paper Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#021024]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">Pan-African Policy Directorate</div>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">Add Policy Publication</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white/40 hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddPaper} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Paper Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Continental Energy Integration & African Leadership"
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Thematic Pillar</label>
                  <select
                    value={newPillar}
                    onChange={(e) => setNewPillar(e.target.value)}
                    className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono text-[11px]"
                  >
                    <option value="Pan-African Integration">Pan-African Integration</option>
                    <option value="Smart Governance">Smart Governance</option>
                    <option value="Public Sector Ethics">Public Sector Ethics</option>
                    <option value="Transformational Leadership">Transformational Leadership</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Lead Author</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Executive Summary / Abstract</label>
                <textarea
                  rows={3}
                  value={newAbstract}
                  onChange={(e) => setNewAbstract(e.target.value)}
                  placeholder="Key research findings and strategic policy recommendations..."
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none resize-none font-sans"
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
                  Publish Publication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

