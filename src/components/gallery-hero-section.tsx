"use client";

import { useEffect, useRef, useState } from "react";
import { galleryHeroSlides } from "@/lib/gallery-data";

const SLIDE_MS = 2000;

export function GalleryHeroSection() {
  const slides = galleryHeroSlides;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(timer);
  }, [slides.length, paused]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && slides[index]?.type === "video") {
        video.currentTime = 0;
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [active, slides]);

  const current = slides[active];

  return (
    <section
      className="gallery-hero"
      aria-label="Gallery highlight reel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="gallery-hero-media" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`gallery-hero-slide ${index === active ? "active" : ""}`}
          >
            {slide.type === "video" ? (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="gallery-hero-asset"
                src={slide.src}
                poster={slide.poster}
                muted
                playsInline
                loop
                preload="metadata"
              />
            ) : (
              <img className="gallery-hero-asset" src={slide.src} alt="" />
            )}
          </div>
        ))}
        <div className="gallery-hero-overlay" />
      </div>

      <div className="container gallery-hero-content">
        <span className="mono gallery-hero-breadcrumb">
          HOME <b>/</b> GALLERY
        </span>
        <p className="gallery-hero-brand">AFLEX</p>
        <div className="gallery-hero-copy" key={current.id}>
          <span className="mono gallery-hero-meta">
            {current.type === "video" ? "VIDEO" : "PHOTO"} · {current.album}
          </span>
          <h1>
            Gallery &amp;
            <br />
            <em>Archive</em>
          </h1>
          <p className="gallery-hero-lead">{current.title}</p>
        </div>
      </div>

      <div className="gallery-hero-controls">
        <div className="gallery-hero-dots" role="tablist" aria-label="Gallery slides">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`${slide.type}: ${slide.title}`}
              className={`gallery-hero-dot ${index === active ? "active" : ""} ${slide.type}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <div className="gallery-hero-progress" aria-hidden="true">
          <span
            key={`${current.id}-${paused}`}
            className={`gallery-hero-progress-bar ${paused ? "paused" : ""}`}
            style={{ animationDuration: `${SLIDE_MS}ms` }}
          />
        </div>
      </div>
    </section>
  );
}
