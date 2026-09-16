"use client";

import { useEffect, useRef, useState } from "react";
import { Weave } from "@/components/site-shell";
import { aboutHeroSlides } from "@/lib/gallery-data";

const LOGO_ANIMATION_SRC = "/videos/logo animation.mp4";
const SLIDE_INTERVAL_MS = 3000;

const collageTiles = [
  { shape: "circle", top: "12%", left: "58%", size: 110 },
  { shape: "rounded", top: "28%", left: "72%", size: 140 },
  { shape: "diamond", top: "52%", left: "64%", size: 96 },
  { shape: "hex", top: "18%", left: "82%", size: 100 },
  { shape: "arch", top: "62%", left: "78%", size: 120 },
];

export function AboutHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => setShowIntro(false);
    video.addEventListener("ended", handleEnded);

    video.play().catch(() => {
      setShowIntro(false);
    });

    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    if (showIntro) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutHeroSlides.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [showIntro]);

  const activeItem = aboutHeroSlides[currentSlide];

  return (
    <section className="about-hero-section page-header blue-section">
      {/* Logo intro — plays once */}
      <div className={`about-hero-intro ${showIntro ? "visible" : "hidden"}`} aria-hidden={!showIntro}>
        <video
          ref={videoRef}
          src={LOGO_ANIMATION_SRC}
          muted
          playsInline
          className="about-hero-logo-video"
        />
        <div className="about-hero-intro-overlay" />
      </div>

      {/* Gallery collage backdrop */}
      <div className={`about-hero-collage ${showIntro ? "" : "active"}`}>
        {aboutHeroSlides.map((item, index) => (
          <div
            key={item.id}
            className={`about-hero-slide ${item.image.includes("aflex-logo") ? "logo-slide" : ""} ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url("${item.image}")` }}
            aria-hidden={index !== currentSlide}
          />
        ))}

        {/* Floating collage tiles in varied shapes */}
        <div className="about-collage-tiles" aria-hidden="true">
          {collageTiles.map((tile, index) => {
            const item = aboutHeroSlides[(currentSlide + index + 1) % aboutHeroSlides.length];
            return (
              <div
                key={tile.shape}
                className={`about-collage-tile about-collage-tile-${tile.shape}`}
                style={{
                  top: tile.top,
                  left: tile.left,
                  width: tile.size,
                  height: tile.size,
                  backgroundImage: `url("${item.image}")`,
                  animationDelay: `${index * 0.12}s`,
                }}
              />
            );
          })}
        </div>

        {/* Logo shapes */}
        <div className="about-logo-shapes" aria-hidden="true">
          <div className="about-logo-shape about-logo-shape-circle">
            <img src="/images/aflex-logo.png" alt="" />
          </div>
          <div className="about-logo-shape about-logo-shape-rounded">
            <img src="/images/aflex-logo.png" alt="" />
          </div>
          <div className="about-logo-shape about-logo-shape-diamond">
            <img src="/images/aflex-logo.png" alt="" />
          </div>
          <div className="about-logo-shape about-logo-shape-hex">
            <img src="/images/aflex-logo.png" alt="" />
          </div>
        </div>

        <div className="about-hero-collage-gradient" />
      </div>

      {/* Page copy */}
      <div className="container about-hero-content">
        <span className="mono breadcrumb">
          HOME <b>/</b> ABOUT AFLEX
        </span>
        <h1>
          About
          <br />
          <em>AFLEX.</em>
        </h1>
        <p>A premier institution for public leadership, policy research, and Africa&apos;s renaissance.</p>

        {!showIntro && (
          <div className="about-hero-caption">
            <span className="mono">{activeItem.album}</span>
            <span>{activeItem.title}</span>
          </div>
        )}
      </div>

      <Weave dark />
    </section>
  );
}
