'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Newspaper, CheckCircle2, Clock, Eye, Search, Filter } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { NewsArticle } from '@/lib/supabase/types';

const INITIAL_DEMO_NEWS: NewsArticle[] = [
  {
    id: 'news-01',
    slug: 'aflex-concludes-high-level-leadership-summit',
    category: 'Institutional',
    published_at: '2026-10-28',
    hero_image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    status: 'published',
    title_en: 'AFLEX Concludes High-Level Pan-African Leadership Summit at Sululta',
    lead_en: 'Over 400 African executive leaders and ministers concluded deliberations on ethical civil service stewardship.',
    body_en: 'The African Leadership Excellence Academy gathered top continental delegates in Sululta...',
    title_am: 'አፍሌክስ በሱሉልታ ሲያካሂድ የነበረውን ከፍተኛ የአመራር ጉባኤ አጠናቀቀ',
    lead_am: 'ከ400 በላይ አፍሪካውያን ከፍተኛ መሪዎች የተሳተፉበት ጉባኤ በስኬት ተጠናቋል።',
    body_am: 'በሱሉልታ ግቢ በተካሄደው ጉባኤ ላይ...',
    title_om: 'AFLEX Walga\'ii Hoggansa Olaanaa Sulultatti Xumure',
    lead_om: 'Hoggantoonni Afrikaa 400 ol ta\'an walga\'ii kana irratti hirmaataniiru.',
    body_om: 'Dhaabbanni AFLEX hoggantoota Afrikaa simachuun...',
    author_id: null,
    created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'news-02',
    slug: 'project-wild-cohort-launches',
    category: 'Executive Education',
    published_at: '2026-10-25',
    hero_image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    status: 'published',
    title_en: 'Project WILD Welcomes New Cohort of Pan-African Female Executives',
    lead_en: '85 emerging female leaders from 14 AU countries began their 18-month transformative fellowship.',
    body_en: 'Empowering women across civil service, diplomacy, and macroeconomic policy...',
    title_am: 'የፕሮጀክት ዋይልድ አዲስ የሴት አመራሮች ስብስብ ስልጠና ጀመረ',
    lead_am: 'ከ14 የአፍሪካ ሀገራት የተውጣጡ 85 ሴት መሪዎች ስልጠናቸውን ጀምረዋል።',
    body_am: 'በአፍሪካ የሴቶች መሪነትን ለማጎልበት...',
    title_om: 'Sagantaan WILD Hoggantoota Dubartootaa Haaraa Simatee',
    lead_om: 'Dubartoonni 85 leenjii hoggansaa ji\'a 18 eegalaniiru.',
    body_om: 'Hoggansa dubartootaa cimsuuf...',
    author_id: null,
    created_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'news-03',
    slug: 'datacenter-cloud-infrastructure-upgrade',
    category: 'Smart Campus',
    published_at: '2026-10-20',
    hero_image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    featured: false,
    status: 'review_pending',
    title_en: 'AFLEX Announces Campus Cloud Datacenter Modernization Program',
    lead_en: 'Upgrading digital research infrastructure to power national administrative intelligence.',
    body_en: 'The procurement directorate has issued invitations to bid for high-performance computing clusters...',
    title_am: 'አፍሌክስ የዳታ ማዕከል እና የደመና መሰረተ-ልማት ማዘመኛ ይፋ አደረገ',
    lead_am: 'የዲጂታል ምርምር መሰረተ ልማትን ለማሳደግ የተዘጋጀ ፕሮግራም ነው።',
    body_am: 'የግዢ ዳይሬክቶሬቱ ጨረታ ማውጣቱን ገልጿል...',
    title_om: 'AFLEX Sagantaa Fooyya\'iinsa Daataa Wiirtuu Labsaniiru',
    lead_om: 'Miseensa ICT cimsuuf sagantaan qophaa\'eera.',
    body_om: 'Caalbaasiin teknooloojii baheera...',
    author_id: null,
    created_at: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function AdminNewsListPage() {
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_DEMO_NEWS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function fetchNews() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('news_articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          setArticles(data as unknown as NewsArticle[]);
        }
      } catch {
        // Fallback to demo items
      }
    }
    fetchNews();
  }, []);

  const handleToggleStatus = (id: string) => {
    const updated = articles.map((a) =>
      a.id === id ? { ...a, status: a.status === 'published' ? 'draft' : 'published' } as NewsArticle : a
    );
    setArticles(updated);
  };

  const filtered = articles.filter((a) => {
    const matchesSearch = a.title_en.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#C9A84C] flex items-center gap-2">
            <Newspaper className="w-3.5 h-3.5" /> Editorial Desk & Publishing
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            News & Press Releases
          </h1>
          <p className="font-sans text-xs text-white/70 mt-1">
            Publish and manage official institutional communiqués across English, Amharic, and Afaan Oromoo.
          </p>
        </div>

        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#d8b85c] text-[#021024] font-mono font-semibold px-4 py-2 rounded-[2px] text-xs uppercase tracking-wider transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Compose New Article</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#02142d] border border-white/10 p-3 rounded-[2px]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search headline or category..."
            className="w-full bg-[#010e21] border border-white/15 focus:border-[#C9A84C] rounded-[2px] pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 outline-none font-sans"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-[#C9A84C]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#010e21] border border-white/15 rounded-[2px] px-3 py-1.5 text-xs text-white outline-none cursor-pointer font-sans"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Live</option>
            <option value="draft">Drafts</option>
            <option value="review_pending">In Review</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-[#02142d] border border-white/10 rounded-[2px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#010c1c] border-b border-white/10 text-white/60 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Headline & Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Localization</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Release Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80 font-sans">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-white max-w-xs">
                    <div className="flex items-center gap-3">
                      {item.hero_image_url ? (
                        <div className="w-11 h-11 rounded-[2px] overflow-hidden shrink-0 relative bg-[#024696]/20 border border-white/10">
                          <Image
                            src={item.hero_image_url}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-[2px] bg-[#024696]/20 border border-white/10 flex items-center justify-center shrink-0 text-[#C9A84C]">
                          <Newspaper className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-white line-clamp-1">{item.title_en}</div>
                        <div className="font-mono text-[10px] text-[#C9A84C]">/news/{item.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-[2px] bg-[#024696]/30 border border-[#024696] text-white text-[11px] font-sans">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1 py-0.2 rounded-[2px] bg-[#024696] text-white">EN</span>
                      {item.title_am && <span className="px-1 py-0.2 rounded-[2px] bg-[#C9A84C] text-[#021024] font-bold">AM</span>}
                      {item.title_om && <span className="px-1 py-0.2 rounded-[2px] border border-white/30 text-white">OM</span>}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(item.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] text-[10px] font-mono uppercase tracking-wider border cursor-pointer ${
                        item.status === 'published'
                          ? 'bg-[#C9A84C]/15 text-[#C9A84C] border-[#C9A84C]/40'
                          : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                      }`}
                    >
                      {item.status === 'published' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-[#C9A84C]" /> Published
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" /> {item.status}
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-white/50 font-mono text-[11px]">
                    {item.published_at}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href="/en/news"
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
