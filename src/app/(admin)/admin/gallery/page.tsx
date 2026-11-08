'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Image as ImageIcon, Plus, Video, Eye, Share2, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import {
  deleteMediaGalleryItem,
  deleteMediaSocialPost,
  upsertMediaGalleryItem,
  upsertMediaSocialPost,
} from '@/lib/cms/actions';
import type { MediaSocialPost, SocialPlatform } from '@/lib/media-hub';
import { parseSocialPostUrl } from '@/lib/media-social-embed';
import type { MediaGalleryItemRow, MediaSocialPostRow } from '@/lib/supabase/types';

interface GalleryItem {
  id: string;
  title: string;
  album: string;
  mediaType: 'photo' | 'video';
  imageUrl: string;
  videoUrl?: string | null;
  caption?: string | null;
}

const ALBUMS = ['Campus', 'Summits', 'Graduation', 'Pan-Africanism', 'Cohorts & Events'];
const PLATFORMS: SocialPlatform[] = ['youtube', 'tiktok', 'facebook'];

export default function AdminMediaHubPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [posts, setPosts] = useState<MediaSocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState(ALBUMS[0]);
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState('');

  const [postTitle, setPostTitle] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [postCaption, setPostCaption] = useState('');
  const [postPlatform, setPostPlatform] = useState<SocialPlatform | 'auto'>('auto');
  const [savingPost, setSavingPost] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const [{ data: galleryData }, { data: postsData }] = await Promise.all([
        supabase.from('media_gallery_items').select('*').order('sort_order', { ascending: true }),
        supabase.from('media_social_posts').select('*').order('sort_order', { ascending: true }),
      ]);

      const galleryRows = (galleryData ?? []) as unknown as MediaGalleryItemRow[];
      const postRows = (postsData ?? []) as unknown as MediaSocialPostRow[];

      if (galleryRows.length) {
        setItems(
          galleryRows.map((row) => ({
            id: row.id,
            title: row.title,
            album: row.album,
            mediaType: row.media_type,
            imageUrl: row.image_url,
            videoUrl: row.video_url,
            caption: row.caption,
          }))
        );
      }

      if (postRows.length) {
        setPosts(
          postRows.map((row) => ({
            id: row.id,
            platform: row.platform,
            title: row.title,
            postUrl: row.post_url,
            embedUrl: row.embed_url,
            externalId: row.external_id,
            thumbnailUrl: row.thumbnail_url,
            caption: row.caption,
            isPublished: Boolean(row.is_published),
            sortOrder: Number(row.sort_order ?? 0),
          }))
        );
      }
    } catch {
      // Tables may not be migrated yet
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    try {
      const saved = await upsertMediaGalleryItem({
        title: title.trim(),
        album,
        mediaType,
        imageUrl: imageUrl.trim(),
        videoUrl: mediaType === 'video' ? videoUrl.trim() || null : null,
        caption: caption.trim() || null,
        status: 'published',
      });

      setItems((prev) => [
        {
          id: (saved as { id: string }).id,
          title: title.trim(),
          album,
          mediaType,
          imageUrl: imageUrl.trim(),
          videoUrl: mediaType === 'video' ? videoUrl.trim() : null,
          caption: caption.trim() || null,
        },
        ...prev,
      ]);
      setMessage('Gallery item published to /media');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not save gallery item.');
    }

    setTitle('');
    setImageUrl('');
    setVideoUrl('');
    setCaption('');
    setIsModalOpen(false);
  };

  const handleDeleteItem = async (id: string) => {
    try {
      if (!id.startsWith('local-')) await deleteMediaGalleryItem(id);
    } catch {
      // ignore
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddSocialPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseSocialPostUrl(postUrl);
    if (!parsed) {
      setMessage('Paste a valid YouTube, TikTok, or Facebook video/post URL.');
      return;
    }
    if (postPlatform !== 'auto' && postPlatform !== parsed.platform) {
      setMessage(`That URL looks like ${parsed.platform}, not ${postPlatform}.`);
      return;
    }

    setSavingPost(true);
    setMessage(null);
    try {
      const saved = await upsertMediaSocialPost({
        platform: parsed.platform,
        title: postTitle.trim() || `${parsed.platform} post`,
        postUrl: parsed.postUrl,
        embedUrl: parsed.embedUrl,
        externalId: parsed.externalId,
        caption: postCaption.trim() || null,
        isPublished: true,
        sortOrder: posts.length,
      });

      setPosts((prev) => [
        {
          id: (saved as { id: string }).id,
          platform: parsed.platform,
          title: postTitle.trim() || `${parsed.platform} post`,
          postUrl: parsed.postUrl,
          embedUrl: parsed.embedUrl,
          externalId: parsed.externalId,
          thumbnailUrl: null,
          caption: postCaption.trim() || null,
          isPublished: true,
          sortOrder: posts.length,
        },
        ...prev,
      ]);
      setMessage(`${parsed.platform} video published — plays on /media?tab=${parsed.platform}`);
      setPostTitle('');
      setPostUrl('');
      setPostCaption('');
      setPostPlatform('auto');
    } catch (err) {
      setMessage(
        err instanceof Error
          ? `${err.message} — run supabase/migrations/20261109_media_social_posts.sql first.`
          : 'Could not save social post.'
      );
    } finally {
      setSavingPost(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      if (!id.startsWith('local-')) await deleteMediaSocialPost(id);
    } catch {
      // ignore
    }
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <ImageIcon className="w-3.5 h-3.5 text-[#024696]" /> Media Hub
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Photos, Videos & Featured Social Posts
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Paste YouTube / TikTok / Facebook <strong>video post links</strong> — visitors watch them
            embedded on the Media page tabs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/media"
            target="_blank"
            className="inline-flex items-center gap-2 bg-[#02142d] hover:bg-white/10 text-white/80 font-mono font-semibold px-4 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all border border-white/10"
          >
            <Eye className="w-4 h-4 text-[#C9A84C]" />
            <span>Public Media</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b5953f] text-[#021024] font-mono font-semibold px-4 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photo / Video</span>
          </button>
        </div>
      </div>

      {message ? (
        <div className="rounded-[2px] border border-[#C9A84C]/35 bg-[#C9A84C]/10 px-4 py-3 text-xs text-[#C9A84C] font-mono">
          {message}
        </div>
      ) : null}

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
          <Share2 className="w-3.5 h-3.5" /> Featured social videos (post links)
        </div>

        <form
          onSubmit={handleAddSocialPost}
          className="bg-[#02142d] border border-white/10 rounded-[2px] p-5 grid grid-cols-1 lg:grid-cols-12 gap-3"
        >
          <div className="lg:col-span-3 space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-widest text-white/50">
              Title
            </label>
            <input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="e.g. Pan-Africanism Forum highlight"
              className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white text-xs outline-none focus:border-[#C9A84C]"
            />
          </div>
          <div className="lg:col-span-5 space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-widest text-white/50">
              Post / video URL
            </label>
            <input
              required
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=… or tiktok.com/@…/video/…"
              className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white text-xs outline-none focus:border-[#C9A84C] font-mono"
            />
          </div>
          <div className="lg:col-span-2 space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-widest text-white/50">
              Platform
            </label>
            <select
              value={postPlatform}
              onChange={(e) => setPostPlatform(e.target.value as SocialPlatform | 'auto')}
              className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white text-xs outline-none font-mono"
            >
              <option value="auto">Auto-detect</option>
              {PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={savingPost}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b5953f] disabled:opacity-60 text-[#021024] font-mono font-semibold px-3 py-2.5 rounded-[2px] text-[11px] uppercase tracking-widest"
            >
              <Plus className="w-3.5 h-3.5" />
              {savingPost ? 'Saving…' : 'Add post'}
            </button>
          </div>
          <div className="lg:col-span-12 space-y-1">
            <label className="block font-mono text-[10px] uppercase tracking-widest text-white/50">
              Caption (optional)
            </label>
            <input
              value={postCaption}
              onChange={(e) => setPostCaption(e.target.value)}
              placeholder="Short note shown under the player"
              className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white text-xs outline-none focus:border-[#C9A84C]"
            />
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-[#02142d] border border-white/10 rounded-[2px] overflow-hidden"
            >
              <div className="aspect-video bg-black">
                <iframe
                  title={post.title}
                  src={post.embedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A84C]">
                    {post.platform}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeletePost(post.id)}
                    className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 text-[10px] font-mono uppercase tracking-wider"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
                <h3 className="font-serif font-bold text-white text-sm">{post.title}</h3>
                <p className="text-[11px] text-white/50 font-mono break-all line-clamp-2">
                  {post.postUrl}
                </p>
              </div>
            </article>
          ))}
          {!posts.length && !loading ? (
            <p className="text-white/50 text-xs font-mono lg:col-span-3">
              No featured social posts yet. Paste a YouTube / TikTok / Facebook video link above.
            </p>
          ) : null}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
          <Video className="w-3.5 h-3.5" /> Photo & video archive
          {loading ? <span className="text-white/40 normal-case tracking-normal">Loading…</span> : null}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#02142d] border border-white/10 rounded-[2px] overflow-hidden shadow-lg flex flex-col justify-between group hover:border-[#C9A84C]/40 transition-all"
            >
              <div className="relative aspect-video bg-[#010c1c] overflow-hidden">
                {item.mediaType === 'photo' ? (
                  <Image
                    src={item.imageUrl}
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
                  {item.album}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-serif font-bold text-white text-sm line-clamp-1 group-hover:text-[#C9A84C] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-white/60 line-clamp-2 font-sans">
                  {item.caption || item.mediaType}
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>{item.mediaType.toUpperCase()}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 uppercase tracking-wider cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#021024]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">
                  Media Hub
                </div>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">Add Photo / Video</h3>
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
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                    Album
                  </label>
                  <select
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono text-[11px]"
                  >
                    {ALBUMS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                    Type
                  </label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as 'photo' | 'video')}
                    className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono text-[11px]"
                  >
                    <option value="photo">Photo</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  Image / Poster URL
                </label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono"
                />
              </div>

              {mediaType === 'video' ? (
                <div className="space-y-1">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                    Video URL
                  </label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono"
                  />
                </div>
              ) : null}

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">
                  Caption
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
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
                  Publish to Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
