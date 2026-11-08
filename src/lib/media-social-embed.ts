import type { SocialPlatform } from "@/lib/media-hub";

export interface ParsedSocialPost {
  platform: SocialPlatform;
  postUrl: string;
  embedUrl: string;
  externalId: string;
}

/** Turn a public YouTube / TikTok / Facebook post URL into an embeddable player URL. */
export function parseSocialPostUrl(raw: string): ParsedSocialPost | null {
  const input = raw.trim();
  if (!input) return null;

  let url: URL;
  try {
    url = new URL(input.startsWith("http") ? input : `https://${input}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  // YouTube
  if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
    let id = "";
    if (host === "youtu.be") {
      id = url.pathname.split("/").filter(Boolean)[0] || "";
    } else if (url.pathname.startsWith("/shorts/")) {
      id = url.pathname.split("/")[2] || "";
    } else if (url.pathname.startsWith("/embed/")) {
      id = url.pathname.split("/")[2] || "";
    } else if (url.pathname.startsWith("/live/")) {
      id = url.pathname.split("/")[2] || "";
    } else {
      id = url.searchParams.get("v") || "";
    }
    id = id.replace(/[^a-zA-Z0-9_-]/g, "");
    if (!id) return null;
    return {
      platform: "youtube",
      postUrl: `https://www.youtube.com/watch?v=${id}`,
      embedUrl: `https://www.youtube.com/embed/${id}`,
      externalId: id,
    };
  }

  // TikTok
  if (host.endsWith("tiktok.com")) {
    const match = url.pathname.match(/\/video\/(\d+)/);
    const id = match?.[1];
    if (!id) return null;
    return {
      platform: "tiktok",
      postUrl: input.startsWith("http") ? input : `https://${input}`,
      embedUrl: `https://www.tiktok.com/embed/v2/${id}`,
      externalId: id,
    };
  }

  // Facebook video / reel
  if (host.endsWith("facebook.com") || host.endsWith("fb.watch")) {
    const href = encodeURIComponent(input.startsWith("http") ? input : `https://${input}`);
    return {
      platform: "facebook",
      postUrl: input.startsWith("http") ? input : `https://${input}`,
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${href}&show_text=false&width=560`,
      externalId: url.pathname.replace(/\W+/g, "-").slice(0, 48) || "fb-post",
    };
  }

  return null;
}

export function detectPlatformFromUrl(raw: string): SocialPlatform | null {
  return parseSocialPostUrl(raw)?.platform ?? null;
}
