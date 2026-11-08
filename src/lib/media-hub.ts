import { galleryAlbums, galleryItems, type GalleryItem } from "@/lib/gallery-data";
import { socialChannels } from "@/lib/social-links";
import { parseSocialPostUrl } from "@/lib/media-social-embed";

export type MediaTab = "photos" | "videos" | "tiktok" | "facebook" | "youtube";
export type SocialPlatform = "tiktok" | "facebook" | "youtube";

export interface MediaSocialFeed {
  id: string;
  platform: SocialPlatform;
  label: string;
  handle: string | null;
  profileUrl: string;
  isPublished: boolean;
  sortOrder: number;
}

export interface MediaSocialPost {
  id: string;
  platform: SocialPlatform;
  title: string;
  postUrl: string;
  embedUrl: string;
  externalId: string | null;
  thumbnailUrl: string | null;
  caption: string | null;
  isPublished: boolean;
  sortOrder: number;
}

export interface PublicMediaItem {
  id: string;
  album: string;
  title: string;
  shape: GalleryItem["shape"];
  type: "photo" | "video";
  image: string;
  video?: string;
  caption?: string;
}

const SOCIAL_DEFAULTS: Record<SocialPlatform, Omit<MediaSocialFeed, "id">> = {
  tiktok: {
    platform: "tiktok",
    label: "TikTok",
    handle: socialChannels.find((c) => c.id === "tiktok")?.handle ?? "@aflex_academy",
    profileUrl: socialChannels.find((c) => c.id === "tiktok")?.url ?? "https://www.tiktok.com/@aflex_academy",
    isPublished: true,
    sortOrder: 1,
  },
  facebook: {
    platform: "facebook",
    label: "Facebook",
    handle: socialChannels.find((c) => c.id === "facebook")?.handle ?? "/aflexacademy.gov.et",
    profileUrl:
      socialChannels.find((c) => c.id === "facebook")?.url ??
      "https://www.facebook.com/aflexacademy.gov.et",
    isPublished: true,
    sortOrder: 2,
  },
  youtube: {
    platform: "youtube",
    label: "YouTube",
    handle:
      socialChannels.find((c) => c.id === "youtube")?.handle ??
      "@AfricanLeadershipExcellenceAca",
    profileUrl:
      socialChannels.find((c) => c.id === "youtube")?.url ??
      "https://www.youtube.com/@AfricanLeadershipExcellenceAca",
    isPublished: true,
    sortOrder: 3,
  },
};

/** Seed featured posts — replace from CMS with your best AFLEX videos. */
const STATIC_SOCIAL_POSTS: Array<Omit<MediaSocialPost, "id" | "embedUrl" | "externalId"> & { postUrl: string }> = [
  {
    platform: "youtube",
    title: "AFLEX Academy — leadership excellence highlight",
    postUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: null,
    caption: "Replace this seed video in CMS with an official AFLEX YouTube post.",
    isPublished: false,
    sortOrder: 1,
  },
];

export function defaultSocialFeeds(): MediaSocialFeed[] {
  return (Object.keys(SOCIAL_DEFAULTS) as SocialPlatform[]).map((platform) => ({
    id: `default-${platform}`,
    ...SOCIAL_DEFAULTS[platform],
  }));
}

export function staticSocialPosts(): MediaSocialPost[] {
  return STATIC_SOCIAL_POSTS.flatMap((post, index) => {
    const parsed = parseSocialPostUrl(post.postUrl);
    if (!parsed || !post.isPublished) return [];
    return [
      {
        id: `static-${index}`,
        platform: parsed.platform,
        title: post.title,
        postUrl: parsed.postUrl,
        embedUrl: parsed.embedUrl,
        externalId: parsed.externalId,
        thumbnailUrl: post.thumbnailUrl,
        caption: post.caption,
        isPublished: true,
        sortOrder: post.sortOrder,
      },
    ];
  });
}

export function staticMediaItems(): PublicMediaItem[] {
  return galleryItems.map((item) => ({
    id: String(item.id),
    album: item.album,
    title: item.title,
    shape: item.shape,
    type: item.type,
    image: item.image,
    video: item.video,
  }));
}

export function staticAlbums(): string[] {
  return galleryAlbums;
}

export function mergeSocialFeeds(cmsFeeds: MediaSocialFeed[] | null | undefined): MediaSocialFeed[] {
  const defaults = defaultSocialFeeds();
  if (!cmsFeeds?.length) return defaults;

  return defaults
    .map((fallback) => {
      const match = cmsFeeds.find((f) => f.platform === fallback.platform);
      return match ? { ...fallback, ...match, platform: fallback.platform } : fallback;
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
