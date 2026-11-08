import { MediaPageClient } from "@/components/media-page-client";
import {
  getPublishedMediaItems,
  getPublishedSocialFeeds,
  getPublishedSocialPosts,
} from "@/lib/cms/public-content";
import type { MediaTab } from "@/lib/media-hub";

export const metadata = {
  title: "Media | AFLEX Academy",
  description:
    "AFLEX photos, campus videos, and featured YouTube, TikTok, and Facebook posts from the academy.",
};

interface MediaPageProps {
  searchParams?: Promise<{ tab?: string; type?: string }>;
}

function resolveTab(tab?: string, type?: string): MediaTab {
  const value = (tab || type || "photos").toLowerCase();
  if (value === "video" || value === "videos") return "videos";
  if (value === "tiktok" || value === "facebook" || value === "youtube") return value;
  return "photos";
}

export default async function MediaPage({ searchParams }: MediaPageProps) {
  const params = searchParams ? await searchParams : {};
  const [items, socialFeeds, socialPosts] = await Promise.all([
    getPublishedMediaItems(),
    getPublishedSocialFeeds(),
    getPublishedSocialPosts(),
  ]);

  return (
    <MediaPageClient
      items={items}
      socialFeeds={socialFeeds}
      socialPosts={socialPosts}
      initialTab={resolveTab(params.tab, params.type)}
    />
  );
}
