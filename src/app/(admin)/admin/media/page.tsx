'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Image as ImageIcon, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { MediaAsset } from '@/lib/supabase/types';

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchAssets = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('media_assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      setAssets((data as unknown as MediaAsset[]) || []);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to fetch media assets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const storagePath = `uploads/${Date.now()}_${cleanFileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('public-media')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Record in media_assets table
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: dbError } = await supabase
        .from('media_assets')
        .insert({
          file_name: file.name,
          bucket_id: 'public-media',
          storage_path: storagePath,
          mime_type: file.type || 'application/octet-stream',
          size_bytes: file.size,
          alt_text: file.name.replace(/\.[^/.]+$/, ''),
        } as any)
        .select()
        .single();

      if (dbError) {
        throw new Error(dbError.message);
      }

      // Refresh asset list
      await fetchAssets();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  const getPublicUrl = (storagePath: string) => {
    const supabase = createClient();
    const { data } = supabase.storage.from('public-media').getPublicUrl(storagePath);
    return data.publicUrl;
  };

  const handleCopyUrl = (id: string, storagePath: string) => {
    const url = getPublicUrl(storagePath);
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <ImageIcon className="w-3.5 h-3.5 text-[#024696]" /> Cloud Storage
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Media & Asset Storage
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Institutional digital asset management powered by Supabase Storage bucket <code className="text-[#C9A84C] font-mono">public-media</code>.
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b5953f] text-[#021024] font-mono font-semibold px-4 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all active:scale-95 cursor-pointer shrink-0">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Media Asset'}</span>
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            accept="image/*,application/pdf"
          />
        </label>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-[2px] bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-white/50 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider">
          <RefreshCw className="w-4 h-4 animate-spin text-[#C9A84C]" />
          <span>Loading media assets...</span>
        </div>
      ) : assets.length === 0 ? (
        <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-[2px] bg-[#010c1c] border border-white/10 flex items-center justify-center mx-auto text-white/40">
            <ImageIcon className="w-8 h-8 text-[#024696]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-serif font-bold text-white">Media Library Is Empty</h3>
            <p className="text-xs text-white/60 max-w-md mx-auto font-sans">
              Upload event photographs, campus views, executive portraits, or tender TOR PDFs to generate persistent public URLs.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {assets.map((asset) => {
            const url = getPublicUrl(asset.storage_path);
            const isImage = asset.mime_type.startsWith('image/');

            return (
              <div
                key={asset.id}
                className="bg-[#02142d] border border-white/10 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-[#C9A84C]/40 transition-all shadow-md"
              >
                <div className="relative aspect-video bg-[#010c1c] overflow-hidden">
                  {isImage ? (
                    <Image
                      src={url}
                      alt={asset.alt_text || asset.file_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40 text-xs font-mono">
                      PDF DOC
                    </div>
                  )}
                </div>

                <div className="p-3 space-y-2">
                  <div className="font-medium text-white text-xs truncate" title={asset.file_name}>
                    {asset.file_name}
                  </div>
                  <div className="text-[10px] text-white/40 font-mono">
                    {(asset.size_bytes / 1024).toFixed(1)} KB &bull; {asset.mime_type.split('/')[1]?.toUpperCase()}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyUrl(asset.id, asset.storage_path)}
                    className="w-full mt-2 py-1.5 px-2 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 rounded-[2px] text-[10px] font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C9A84C]" />
                        <span className="text-[#C9A84C]">Copied URL</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
