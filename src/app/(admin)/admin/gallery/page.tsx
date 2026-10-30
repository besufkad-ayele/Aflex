'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Image as ImageIcon, 
  Plus, 
  Video, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Eye
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Summits' | 'Graduation' | 'Pan-Africanism';
  mediaType: 'image' | 'video';
  url: string;
  caption: string;
}

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Sululta Campus Mountain View & Executive Quad',
    category: 'Campus',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    caption: 'Aerial panorama of the AFLEX Sululta highland campus at sunrise.',
  },
  {
    id: 'gal-02',
    title: 'High-Level Pan-African Executive Leadership Summit',
    category: 'Summits',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    caption: 'Executive deliberations in the Nelson Mandela Great Hall.',
  },
  {
    id: 'gal-03',
    title: 'Public Service Leadership Excellence (PSLE) Cohort',
    category: 'Graduation',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    caption: 'Senior civil service executives upon completion of modular immersion.',
  },
  {
    id: 'gal-04',
    title: 'AFLEX Institutional Identity & Logo Animation',
    category: 'Pan-Africanism',
    mediaType: 'video',
    url: '/videos/logo animation.mp4',
    caption: 'Official emblem animation symbolizing pan-African leadership excellence.',
  },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Campus');
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const newItem: GalleryItem = {
      id: `gal-0${items.length + 1}`,
      title: title.trim(),
      category,
      mediaType: url.endsWith('.mp4') ? 'video' : 'image',
      url: url.trim(),
      caption: caption.trim() || title.trim(),
    };

    setItems([newItem, ...items]);
    setTitle('');
    setUrl('');
    setCaption('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <ImageIcon className="w-3.5 h-3.5 text-[#024696]" /> Visual Media & Documentary Archives
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Photo & Video Gallery Archives
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Curate photo essays, documentary footage, and leadership summit visual records on the public gallery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/gallery"
            target="_blank"
            className="inline-flex items-center gap-2 bg-[#02142d] hover:bg-white/10 text-white/80 font-mono font-semibold px-4 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all border border-white/10"
          >
            <Eye className="w-4 h-4 text-[#C9A84C]" />
            <span>Public Gallery</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b5953f] text-[#021024] font-mono font-semibold px-4 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Visual Media</span>
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#02142d] border border-white/10 rounded-[2px] overflow-hidden shadow-lg flex flex-col justify-between group hover:border-[#C9A84C]/40 transition-all"
          >
            <div className="relative aspect-video bg-[#010c1c] overflow-hidden">
              {item.mediaType === 'image' ? (
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#010c1c] text-white/40">
                  <Video className="w-8 h-8 text-[#C9A84C]" />
                </div>
              )}
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-[2px] text-[9px] font-mono font-semibold uppercase tracking-widest bg-[#021024]/90 text-[#C9A84C] border border-white/10">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-serif font-bold text-white text-sm line-clamp-1 group-hover:text-[#C9A84C] transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-white/60 line-clamp-2 font-sans">
                {item.caption}
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>/{item.id.toUpperCase()}</span>
                <button
                  type="button"
                  onClick={() => setItems(items.filter((i) => i.id !== item.id))}
                  className="text-rose-400 hover:text-rose-300 uppercase tracking-wider cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#021024]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">Media Directorate</div>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">Add Visual Media</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white/40 hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Media Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Executive Cohort in Sululta Garden Quad"
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono text-[11px]"
                >
                  <option value="Campus">Campus & Architecture</option>
                  <option value="Summits">Leadership Summits</option>
                  <option value="Graduation">Graduation & Alumni</option>
                  <option value="Pan-Africanism">Pan-African Heritage</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Image / Video URL</label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or /videos/..."
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Caption / Narrative</label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Descriptive details for visitors..."
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
                  Save Visual Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

