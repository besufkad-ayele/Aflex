"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { aboutHeroSlides } from "@/lib/gallery-data";

const SLIDE_INTERVAL_MS = 3000;

const collageTiles = [
  { shape: "circle", top: "12%", left: "58%", size: 110 },
  { shape: "rounded", top: "28%", left: "72%", size: 140 },
  { shape: "diamond", top: "52%", left: "64%", size: 96 },
  { shape: "hex", top: "18%", left: "82%", size: 100 },
  { shape: "arch", top: "62%", left: "78%", size: 120 },
];

export function AboutHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutHeroSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const activeItem = aboutHeroSlides[currentSlide];

  return (
    <section className="about-hero-section page-header blue-section">
      <div className="about-hero-collage active">
        {aboutHeroSlides.map((item, index) => (
          <div
            key={item.id}
            className={`about-hero-slide ${item.image.includes("aflex-logo") ? "logo-slide" : ""} ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url("${item.image}")` }}
            aria-hidden={index !== currentSlide}
          />
        ))}

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

        <div className="about-logo-shapes" aria-hidden="true">
          <div className="about-logo-shape about-logo-shape-circle">
            <Image src="/images/aflex-logo.png" alt="" width={120} height={120} style={{ objectFit: "contain", width: "auto", height: "auto" }} />
          </div>
          <div className="about-logo-shape about-logo-shape-rounded">
            <Image src="/images/aflex-logo.png" alt="" width={120} height={120} style={{ objectFit: "contain", width: "auto", height: "auto" }} />
          </div>
          <div className="about-logo-shape about-logo-shape-diamond">
            <Image src="/images/aflex-logo.png" alt="" width={120} height={120} style={{ objectFit: "contain", width: "auto", height: "auto" }} />
          </div>
          <div className="about-logo-shape about-logo-shape-hex">
            <Image src="/images/aflex-logo.png" alt="" width={120} height={120} style={{ objectFit: "contain", width: "auto", height: "auto" }} />
          </div>
        </div>

        <div className="about-hero-collage-gradient" />
      </div>

      <div className="container about-hero-content page-enter">
        <span className="mono breadcrumb">
          HOME <b>/</b> ABOUT AFLEX
        </span>
        <h1>
          About
          <br />
          <em>AFLEX.</em>
        </h1>
        <p>A premier institution for public leadership, policy research, and Africa&apos;s renaissance.</p>

        <div className="about-hero-actions button-row">
          <a className="button button-primary about-hero-cta" href="#story">
            <span>Our story</span>
            <span aria-hidden="true">↓</span>
          </a>
          <a className="button button-outline light" href="#leadership">
            <span>Meet leadership</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="about-hero-caption">
          <span className="mono">{activeItem.album}</span>
          <span>{activeItem.title}</span>
        </div>
      </div>
    </section>
  );
}
