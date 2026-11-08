'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Newspaper, CheckCircle2, Clock, Eye, Search, Filter } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toggleContentStatus } from '@/lib/cms/actions';
import type { NewsArticle } from '@/lib/supabase/types';

export default function AdminNewsListPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setLoadError(null);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        setArticles((data as NewsArticle[]) || []);
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : 'Failed to load articles');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const handleToggleStatus = async (id: string) => {
    const current = articles.find((a) => a.id === id);
    if (!current) return;

    const nextStatus = current.status === 'published' ? 'draft' : 'published';
    try {
      await toggleContentStatus({
        table: 'news_articles',
        id,
        nextStatus,
        slug: current.slug,
      });
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? ({ ...a, status: nextStatus } as NewsArticle) : a))
      );
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const filtered = articles.filter((a) => {
    const headline = (a.title || a.title_en || '').toLowerCase();
    const matchesSearch =
      headline.includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase());
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

      {loading && (
        <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Loading articles from Supabase…</p>
      )}
      {loadError && (
        <p className="text-xs font-mono text-rose-300 border border-rose-500/30 bg-rose-500/10 px-3 py-2 rounded-[2px]">
          {loadError}
        </p>
      )}
      {!loading && !loadError && articles.length === 0 && (
        <p className="text-xs font-sans text-white/60 border border-white/10 bg-[#02142d] px-3 py-3 rounded-[2px]">
          No articles yet. Compose the first official release to populate the public news desk.
        </p>
      )}

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
                        <div className="font-semibold text-white line-clamp-1">{item.title || item.title_en}</div>
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
                      <span className="px-1 py-0.2 rounded-[2px] bg-[#024696] text-white">
                        {(item.language_code || 'en').toUpperCase()}
                      </span>
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
                    {item.published_at ? new Date(item.published_at).toLocaleDateString() : '—'}
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
