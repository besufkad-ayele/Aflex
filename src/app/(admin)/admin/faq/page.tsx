'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Plus, 
  HelpCircle, 
  Sparkles, 
  Search, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Globe,
  SlidersHorizontal
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: string;
  question_en: string;
  answer_en: string;
  question_am: string;
  answer_am: string;
  question_om: string;
  answer_om: string;
  usageCount: number;
}

const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-01',
    category: 'Admissions & Curricula',
    question_en: 'How can civil servants apply for the Public Service Leadership Excellence (PSLE) program?',
    answer_en: 'Nominations are coordinated through federal ministries and regional civil service bureaus, followed by executive assessment and AFLEX senate review.',
    question_am: 'የመንግስት ሰራተኞች ለህዝብ አገልግሎት መሪነት ልህቀት (PSLE) ፕሮግራም እንዴት ማመልከት ይችላሉ?',
    answer_am: 'ምልመላው የሚከናወነው በሚኒስቴር መስሪያ ቤቶች እና በክልል ሲቪል ሰርቪስ ቢሮዎች በኩል ሲሆን፣ ከዚያም በአካዳሚው ሰኔት ይገመገማል።',
    question_om: 'Hojjettoonni mootummaa sagantaa PSLE irratti akkamitti iyyachuu danda\'u?',
    answer_om: 'Kaadhimamtoonni ministeerota federaalaa fi biirolee siivil sarvisii naannooleetiin dhiyaatu.',
    usageCount: 420,
  },
  {
    id: 'faq-02',
    category: 'Campus & Residency',
    question_en: 'Where is the AFLEX main campus located, and what accommodation is available?',
    answer_en: 'The AFLEX campus is situated in Sululta, Oromia, 25 minutes north of Addis Ababa at 2,600m altitude. We offer 160 executive residential suites for program cohorts.',
    question_am: 'የአፍሌክስ ዋና ግቢ የት ይገኛል? የመኝታ አገልግሎትስ አለ?',
    answer_am: 'አካዳሚው ከአዲስ አበባ በስተሰሜን በሱሉልታ ከተማ በ2600 ሜትር ከፍታ ላይ የሚገኝ ሲሆን፣ 160 ዘመናዊ የስራ አስፈፃሚ ማረፊያዎችን ያካትታል።',
    question_om: 'Gabiin guddaan AFLEX eessatti argama? Tajaajilli bultii hoo jiraa?',
    answer_om: 'AFLEX Sulultatti argama; kutaalee bultii hoggantootaa 160 qaba.',
    usageCount: 680,
  },
  {
    id: 'faq-03',
    category: 'Procurement & Bids',
    question_en: 'What are the CPO requirements for institutional procurement tenders?',
    answer_en: 'Tenderers must submit an unconditional Bank Guarantee or CPO from a recognized commercial bank of Ethiopia corresponding to the specified tender document.',
    question_am: 'ለጨረታዎች የሲፒኦ (CPO) መስፈርት ምንድን ነው?',
    answer_am: 'ተጫራቾች በጨረታ ሰነዱ በተጠቀሰው መሰረት በኢትዮጵያ ንግድ ባንኮች የተረጋገጠ ሲፒኦ ማቅረብ ይጠበቅባቸዋል።',
    question_om: 'Ulaagaan CPO caalbaasii maali?',
    answer_om: 'Dorgomtoonni wabiin baankii yookaan CPO dhiyaachuu qaba.',
    usageCount: 310,
  },
];

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_FAQS);
  const [activeLang, setActiveLang] = useState<'en' | 'am' | 'om'>('en');
  const [search, setSearch] = useState('');
  
  // Interactive Steward AI Test Sandbox
  const [testPrompt, setTestPrompt] = useState('');
  const [stewardResponse, setStewardResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qEn, setQEn] = useState('');
  const [aEn, setAEn] = useState('');
  const [qAm, setQAm] = useState('');
  const [aAm, setAAm] = useState('');
  const [category, setCategory] = useState('Admissions & Curricula');

  const handleTestSteward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPrompt.trim()) return;

    setIsThinking(true);
    setStewardResponse(null);

    setTimeout(() => {
      const match = faqs.find((f) =>
        f.question_en.toLowerCase().includes(testPrompt.toLowerCase()) ||
        f.answer_en.toLowerCase().includes(testPrompt.toLowerCase()) ||
        testPrompt.toLowerCase().includes('sululta') ||
        testPrompt.toLowerCase().includes('program') ||
        testPrompt.toLowerCase().includes('tender')
      );

      if (match) {
        setStewardResponse(`[Sululta Steward AI Knowledge Match - ${match.category}]:\n${match.answer_en}`);
      } else {
        setStewardResponse(`[Sululta Steward AI]: The African Leadership Excellence Academy at Sululta trains future continental leaders through executive curricula, cutting-edge research, and civil service development. Regarding "${testPrompt}", please contact the Directorate General at info@aflex.edu.et.`);
      }
      setIsThinking(false);
    }, 700);
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qEn.trim() || !aEn.trim()) return;

    const newFaq: FaqItem = {
      id: `faq-0${faqs.length + 1}`,
      category,
      question_en: qEn.trim(),
      answer_en: aEn.trim(),
      question_am: qAm.trim() || qEn.trim(),
      answer_am: aAm.trim() || aEn.trim(),
      question_om: qEn.trim(),
      answer_om: aEn.trim(),
      usageCount: 0,
    };

    setFaqs([newFaq, ...faqs]);
    setQEn('');
    setAEn('');
    setQAm('');
    setAAm('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <Bot className="w-3.5 h-3.5 text-[#024696]" /> Cognitive AI & Institutional Knowledge
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Sululta Steward AI & FAQ Knowledge Base
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Curate ground-truth knowledge units and training contexts for the institutional AI concierge and public FAQ.
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

      {/* Interactive AI Agent Simulator Sandbox */}
      <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C]">
            <Sparkles className="w-3.5 h-3.5 text-[#024696]" />
            <span>Interactive Steward AI Agent Tester</span>
          </div>
          <span className="text-[10px] bg-[#024696]/20 text-[#C9A84C] border border-[#C9A84C]/30 px-2.5 py-0.5 rounded-[2px] font-mono uppercase tracking-widest">
            Gemini Multimodal Active
          </span>
        </div>

        <form onSubmit={handleTestSteward} className="flex gap-2">
          <input
            type="text"
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            placeholder="Type a query to simulate the Steward AI response (e.g. 'Where is campus?', 'How to apply for PSLE?')..."
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
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9A84C] block mb-1">Steward AI Output:</span>
            {stewardResponse}
          </div>
        )}
      </div>

      {/* Language Switcher */}
      <div className="flex items-center justify-between">
        <div className="inline-flex p-1 bg-[#02142d] border border-white/10 rounded-[2px] gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
              activeLang === 'en' ? 'bg-[#024696] text-white shadow' : 'text-white/60 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('am')}
            className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
              activeLang === 'am' ? 'bg-[#C9A84C] text-[#021024] font-bold shadow' : 'text-white/60 hover:text-white'
            }`}
          >
            አማርኛ
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('om')}
            className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
              activeLang === 'om' ? 'bg-[#024696] text-white shadow' : 'text-white/60 hover:text-white'
            }`}
          >
            Afaan Oromoo
          </button>
        </div>

        <Link
          href="/faq"
          target="_blank"
          className="text-xs text-[#C9A84C] font-mono uppercase tracking-wider hover:underline"
        >
          View Public FAQ Portal &rarr;
        </Link>
      </div>

      {/* FAQ Knowledge Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((faq) => {
          const q = activeLang === 'en' ? faq.question_en : activeLang === 'am' ? faq.question_am : faq.question_om;
          const a = activeLang === 'en' ? faq.answer_en : activeLang === 'am' ? faq.answer_am : faq.answer_om;

          return (
            <div
              key={faq.id}
              className="bg-[#02142d] border border-white/10 rounded-[2px] p-5 space-y-3 hover:border-[#C9A84C]/40 transition-all shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-mono text-[#C9A84C] bg-[#024696]/20 px-2 py-0.5 rounded-[2px] border border-[#C9A84C]/30 font-semibold uppercase tracking-widest">
                    {faq.category}
                  </span>
                  <span className="text-white/40 font-mono">
                    {faq.usageCount} AI Queries
                  </span>
                </div>

                <h3 className="font-serif font-bold text-white text-sm leading-snug">
                  {q}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  {a}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span>REF: {faq.id.toUpperCase()}</span>
                <span className="text-[#C9A84C] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#024696]" /> Ground Truth Verified
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add FAQ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#021024]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">Cognitive AI Knowledge Vault</div>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">Add Knowledge Base Unit</h3>
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
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Category</label>
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
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Question (English)</label>
                <input
                  type="text"
                  required
                  value={qEn}
                  onChange={(e) => setQEn(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Answer (English)</label>
                <textarea
                  rows={3}
                  required
                  value={aEn}
                  onChange={(e) => setAEn(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">ጥያቄ (አማርኛ)</label>
                <input
                  type="text"
                  value={qAm}
                  onChange={(e) => setQAm(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">መልስ (አማርኛ)</label>
                <textarea
                  rows={2}
                  value={aAm}
                  onChange={(e) => setAAm(e.target.value)}
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
                  className="px-4 py-2 bg-[#C9A84C] text-[#021024] font-mono text-xs uppercase tracking-widest font-bold rounded-[2px] hover:bg-[#b5953f]"
                >
                  Save Knowledge Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

