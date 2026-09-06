"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";

interface AboutCampusSlideshowProps {
  locale?: Locale;
}

const campusSlides = [
  {
    type: "video",
    src: "/videos/home_hero_video.mp4",
    title: "Highland Academic Cloister",
    caption: "Highland quiet at 2,600m altitude for deep deliberation"
  },
  {
    type: "video",
    src: "/videos/continue_to_the_second_set.mp4",
    title: "Executive Deliberation Halls",
    caption: "State-of-the-art amphitheatres designed for strategic policy discourse"
  },
  {
    type: "video",
    src: "/videos/generate_another_video_use_all.mp4",
    title: "Continental Dialogue Suites",
    caption: "Bilateral negotiation chambers and high-level caucus rooms"
  },
  {
    type: "video",
    src: "/videos/Use_the_provided_room_view_pho (1).mp4",
    title: "Residential Executive Sanctuaries",
    caption: "Serene highland accommodation tailored for intensive cohort retreats"
  }
];

export function AboutCampusSlideshow({ locale }: AboutCampusSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campusSlides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    // Play current video and restart it
    const activeVid = videoRefs.current[currentSlide];
    if (activeVid) {
      activeVid.currentTime = 0;
      activeVid.play().catch(() => {});
    }
  }, [currentSlide]);

  const visitUrl = locale ? `/${locale}/contact` : "/contact";
  const locatorUrl = "/campus-locator";

  return (
    <section className="about-campus-slideshow-section" id="campus-retreat">
      {/* Background Slides */}
      <div className="campus-slideshow-backdrop">
        {campusSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.src}
              className={`campus-slide-item ${isActive ? "active" : ""}`}
              aria-hidden={!isActive}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={slide.src}
                muted
                loop
                playsInline
                className="campus-slide-video"
              />
              <div className="campus-slide-gradient" />
            </div>
          );
        })}
      </div>

      {/* Main Content Overlay */}
      <div className="container campus-slideshow-content-wrap">
        <div className="campus-slideshow-copy">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>
            THE SULULTA CAMPUS · 2,600M HIGHLAND RETREAT
          </span>

          <h2>
            A place to<br />
            <em>come back to.</em>
          </h2>

          <p className="campus-slideshow-lead">
            Purpose-built spaces for learning, conversation, rest, and the long view. Situated in the serene highlands of Sululta, the campus is not merely a venue—it is an integral part of our transformative leadership pedagogy.
          </p>

          <div className="campus-slide-caption-box">
            <span className="mono" style={{ color: "var(--gold)", fontSize: "11px" }}>
              CURRENT VIEW ({String(currentSlide + 1).padStart(2, "0")}/{String(campusSlides.length).padStart(2, "0")}):
            </span>
            <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#fff", fontWeight: 500 }}>
              {campusSlides[currentSlide].title} — <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>{campusSlides[currentSlide].caption}</span>
            </p>
          </div>

          <div className="campus-slideshow-actions">
            <Link className="button button-primary" href={visitUrl} style={{ background: "var(--gold)", color: "#000", fontWeight: 600 }}>
              <span>Plan a visit</span>
              <span>↗</span>
            </Link>
            <Link className="button button-outline light" href={locatorUrl}>
              <span>Campus Locator</span>
              <span>↗</span>
            </Link>
          </div>
        </div>

        {/* Slideshow Controls Bar */}
        <div className="campus-slideshow-controls">
          <div className="slideshow-indicators">
            {campusSlides.map((slide, idx) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`slideshow-dot ${idx === currentSlide ? "active" : ""}`}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              >
                <div className="slideshow-dot-fill" />
              </button>
            ))}
          </div>

          <div className="slideshow-nav-buttons">
            <button
              type="button"
              className="slideshow-nav-btn"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + campusSlides.length) % campusSlides.length)}
              aria-label="Previous campus view"
            >
              ←
            </button>
            <button
              type="button"
              className="slideshow-nav-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button
              type="button"
              className="slideshow-nav-btn"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % campusSlides.length)}
              aria-label="Next campus view"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
