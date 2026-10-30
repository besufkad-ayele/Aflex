"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { SectionTitle } from "@/components/page-primitives";
import { GalleryHeroSection } from "@/components/gallery-hero-section";
import {
  galleryAlbums,
  galleryItems,
  type GalleryItem,
  type GalleryMediaType,
} from "@/lib/gallery-data";

type MediaFilter = "all" | GalleryMediaType;

export default function Gallery() {
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>("all");
  const [activeAlbum, setActiveAlbum] = useState("All albums");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const mediaOk = mediaFilter === "all" || item.type === mediaFilter;
      const albumOk = activeAlbum === "All albums" || item.album === activeAlbum;
      return mediaOk && albumOk;
    });
  }, [mediaFilter, activeAlbum]);

  const photoCount = galleryItems.filter((i) => i.type === "photo").length;
  const videoCount = galleryItems.filter((i) => i.type === "video").length;

  return (
    <>
      <SiteHeader active="Gallery" />
      <main id="main-content">
        <GalleryHeroSection />

        <section className="section gallery-archive-section" id="archive">
          <div className="container">
            <SectionTitle
              eyebrow="THE ARCHIVE"
              title={
                <>
                  See the academy
                  <br />
                  <em>in practice.</em>
                </>
              }
              copy="Browse a Pinterest-style mosaic of campus photography and motion from Sululta — filter by photos, videos, or album."
            />

            <div className="gallery-media-tabs" role="tablist" aria-label="Media type">
              <button
                type="button"
                role="tab"
                aria-selected={mediaFilter === "all"}
                className={`gallery-media-tab ${mediaFilter === "all" ? "active" : ""}`}
                onClick={() => setMediaFilter("all")}
              >
                All <b>{galleryItems.length}</b>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mediaFilter === "photo"}
                className={`gallery-media-tab ${mediaFilter === "photo" ? "active" : ""}`}
                onClick={() => setMediaFilter("photo")}
              >
                Photos <b>{photoCount}</b>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mediaFilter === "video"}
                className={`gallery-media-tab ${mediaFilter === "video" ? "active" : ""}`}
                onClick={() => setMediaFilter("video")}
              >
                Videos <b>{videoCount}</b>
              </button>
            </div>

            <div className="filter-bar gallery-filters">
              {galleryAlbums.map((album) => (
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
                  AFLEX ARCHIVE
                </span>
              </div>
            </div>
          </div>
        )}

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

              <div className="document-row">
                <span className="document-icon">PDF</span>
                <div>
                  <h3>Project WILD — Women in Leadership Program Dossier</h3>
                  <span className="mono">project-wild-brief.pdf · 2.1 MB · English</span>
                </div>
                <a
                  href="/docs/01-design-system.md"
                  download="Project-WILD-Brief.pdf"
                  className="icon-button document-download"
                  aria-label="Download Project WILD brief"
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
