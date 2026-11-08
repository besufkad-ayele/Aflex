"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { SectionTitle } from "@/components/page-primitives";
import { GalleryHeroSection } from "@/components/gallery-hero-section";
import type {
  MediaSocialFeed,
  MediaSocialPost,
  MediaTab,
  PublicMediaItem,
  SocialPlatform,
} from "@/lib/media-hub";
import { socialChannels } from "@/lib/social-links";

interface MediaPageClientProps {
  items: PublicMediaItem[];
  socialFeeds: MediaSocialFeed[];
  socialPosts: MediaSocialPost[];
  initialTab?: MediaTab;
}

const SOCIAL_TABS: SocialPlatform[] = ["tiktok", "facebook", "youtube"];

export function MediaPageClient({
  items,
  socialFeeds,
  socialPosts,
  initialTab = "photos",
}: MediaPageClientProps) {
  const [activeTab, setActiveTab] = useState<MediaTab>(initialTab);
  const [activeAlbum, setActiveAlbum] = useState("All albums");
  const [selected, setSelected] = useState<PublicMediaItem | null>(null);

  const albums = useMemo(() => {
    const set = new Set(items.map((item) => item.album));
    return ["All albums", ...Array.from(set)];
  }, [items]);

  const photoCount = items.filter((i) => i.type === "photo").length;
  const videoCount = items.filter((i) => i.type === "video").length;

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const typeOk =
        activeTab === "photos"
          ? item.type === "photo"
          : activeTab === "videos"
            ? item.type === "video"
            : false;
      const albumOk = activeAlbum === "All albums" || item.album === activeAlbum;
      return typeOk && albumOk;
    });
  }, [items, activeTab, activeAlbum]);

  const activeFeed = socialFeeds.find((feed) => feed.platform === activeTab);
  const activePosts = useMemo(
    () => socialPosts.filter((post) => post.platform === activeTab && post.isPublished),
    [socialPosts, activeTab]
  );

  return (
    <>
      <SiteHeader active="Media" />
      <main id="main-content">
        <GalleryHeroSection />

        <section className="section gallery-archive-section media-hub-section" id="archive">
          <div className="container">
            <SectionTitle
              eyebrow="MEDIA HUB"
              title={
                <>
                  Photos, video &amp;
                  <br />
                  <em>social updates.</em>
                </>
              }
              copy="Browse the AFLEX archive, then switch to TikTok, Facebook, or YouTube for the latest academy posts—managed from the CMS."
            />

            <div className="media-hub-tabs" role="tablist" aria-label="Media channels">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "photos"}
                className={`media-hub-tab ${activeTab === "photos" ? "active" : ""}`}
                onClick={() => setActiveTab("photos")}
              >
                Photos <b>{photoCount}</b>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "videos"}
                className={`media-hub-tab ${activeTab === "videos" ? "active" : ""}`}
                onClick={() => setActiveTab("videos")}
              >
                Videos <b>{videoCount}</b>
              </button>
              {SOCIAL_TABS.map((platform) => {
                const feed = socialFeeds.find((f) => f.platform === platform);
                return (
                  <button
                    key={platform}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === platform}
                    className={`media-hub-tab social ${activeTab === platform ? "active" : ""}`}
                    onClick={() => setActiveTab(platform)}
                  >
                    {feed?.label ?? platform}
                  </button>
                );
              })}
            </div>

            {(activeTab === "photos" || activeTab === "videos") && (
              <>
                <div className="filter-bar gallery-filters">
                  {albums.map((album) => (
                    <button
                      key={album}
                      className={`filter ${activeAlbum === album ? "active" : ""}`}
                      onClick={() => setActiveAlbum(album)}
                      type="button"
                    >
                      {album}
                    </button>
                  ))}
                </div>

                <div className="pinterest-masonry">
                  {filteredItems.map((item) => (
                    <figure
                      className={`pinterest-pin ${item.shape} ${item.type}`}
                      key={item.id}
                      onClick={() => setSelected(item)}
                    >
                      <div className="pinterest-pin-media">
                        {item.type === "video" ? (
                          <video
                            src={item.video}
                            poster={item.image}
                            muted
                            playsInline
                            preload="metadata"
                            onMouseEnter={(e) => {
                              e.currentTarget.play().catch(() => undefined);
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                        ) : (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            loading="lazy"
                          />
                        )}
                        <div className="pinterest-pin-shade" />
                        {item.type === "video" ? (
                          <span className="pinterest-play" aria-hidden="true">
                            ▶
                          </span>
                        ) : null}
                        <span className="pinterest-pin-type">
                          {item.type === "video" ? "Video" : "Photo"}
                        </span>
                      </div>
                      <figcaption>
                        <span className="mono">{item.album}</span>
                        <strong>{item.title}</strong>
                      </figcaption>
                    </figure>
                  ))}
                </div>

                {filteredItems.length === 0 ? (
                  <p className="gallery-empty">No items in this view. Try another filter.</p>
                ) : null}
              </>
            )}

            {activeFeed && (
              <div className="media-social-panel">
                <div className="media-social-header">
                  <div>
                    <span className="eyebrow" style={{ color: "var(--gold)" }}>
                      FEATURED {activeFeed.label.toUpperCase()} POSTS
                    </span>
                    <h3>
                      Best {activeFeed.label} videos
                      {activeFeed.handle ? ` · ${activeFeed.handle}` : ""}
                    </h3>
                    <p>
                      Curated AFLEX posts play here. In the CMS, paste each YouTube, TikTok, or
                      Facebook video link and it appears on this tab.
                    </p>
                  </div>
                </div>

                {activePosts.length > 0 ? (
                  <div className="media-social-posts-grid">
                    {activePosts.map((post) => (
                      <article key={post.id} className="media-social-post-card">
                        <div className={`media-social-post-frame ${post.platform}`}>
                          <iframe
                            title={post.title}
                            src={post.embedUrl}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                        <div className="media-social-post-meta">
                          <h4>{post.title}</h4>
                          {post.caption ? <p>{post.caption}</p> : null}
                          <a
                            className="text-link"
                            href={post.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>Open original post</span>
                            <span>↗</span>
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="media-social-fallback">
                    <p>
                      No {activeFeed.label} videos yet. Add post links in the CMS Media Hub — paste
                      a full video URL and it will play here.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {selected && (
          <div
            className="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            onClick={() => setSelected(null)}
          >
            <div className="lightbox-content lightbox-media" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                ✕
              </button>
              {selected.type === "video" && selected.video ? (
                <video
                  src={selected.video}
                  poster={selected.image}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <div style={{ position: "relative", width: "100%", height: "60vh", minHeight: "360px" }}>
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1000px"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              )}
              <div className="lightbox-caption">
                <div>
                  <span className="mono" style={{ color: "var(--gold)" }}>
                    {selected.type === "video" ? "VIDEO" : "PHOTO"} · {selected.album}
                  </span>
                  <h4 style={{ margin: "4px 0 0", fontSize: "18px" }}>{selected.title}</h4>
                </div>
                <span className="mono" style={{ color: "var(--muted-dark)" }}>
                  AFLEX MEDIA
                </span>
              </div>
            </div>
          </div>
        )}

        <section className="section media-social-directory-section" id="social">
          <div className="container">
            <SectionTitle
              eyebrow="FOLLOW AFLEX"
              title={
                <>
                  Social channels
                  <br />
                  <em>across the web.</em>
                </>
              }
              copy="Find the Academy on every platform we publish — short video, institutional updates, lectures, and community news."
            />

            <div className="media-social-directory-grid">
              {socialChannels.map((channel) => {
                const feedTab =
                  channel.id === "tiktok" || channel.id === "facebook" || channel.id === "youtube"
                    ? channel.id
                    : null;
                return (
                  <article key={channel.id} className="media-social-directory-card">
                    <div className="media-social-directory-top">
                      <span
                        className="media-social-directory-dot"
                        style={{ background: channel.color === "#ffffff" ? "#111111" : channel.color }}
                        aria-hidden="true"
                      />
                      <div>
                        <h3>{channel.name}</h3>
                        <span className="mono">{channel.handle}</span>
                      </div>
                    </div>
                    <p>{channel.description}</p>
                    <div className="media-social-directory-actions">
                      <a
                        className="button button-primary"
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: "var(--gold)", color: "#000", fontWeight: 600 }}
                      >
                        <span>Open {channel.name}</span>
                        <span>↗</span>
                      </a>
                      {feedTab ? (
                        <button
                          type="button"
                          className="button button-outline"
                          onClick={() => {
                            setActiveTab(feedTab);
                            document.getElementById("archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                        >
                          <span>View in Media</span>
                          <span>↑</span>
                        </button>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section downloads-section">
          <div className="container">
            <SectionTitle
              eyebrow="PUBLICATIONS & MEDIA"
              title={
                <>
                  Official documents &amp;
                  <br />
                  <em>brochures.</em>
                </>
              }
              copy="Download official institution guidelines, academic calendar summaries, and press materials."
            />
            <div className="documents">
              <div className="document-row">
                <span className="document-icon">PDF</span>
                <div>
                  <h3>AFLEX Academy Institutional Overview &amp; Curriculum</h3>
                  <span className="mono">aflex-overview-2026.pdf · 4.8 MB · English / Amharic</span>
                </div>
                <a
                  href="/docs/02-prd.md"
                  download="AFLEX-Academy-Brochure.pdf"
                  className="icon-button document-download"
                  aria-label="Download AFLEX overview"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  ↓
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
