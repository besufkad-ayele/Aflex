"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { featuredNews } from "@/lib/news-data";

const SLIDE_MS = 5500;

export function NewsHeroSection() {
  const slides = featuredNews;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(timer);
  }, [slides.length, paused]);

  if (slides.length === 0) return null;

  const current = slides[active];

  return (
    <section
      className="news-hero"
      aria-label="Featured news"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="news-hero-media" aria-hidden="true">
        {slides.map((slide, index) => (
          <Image
            fill
            sizes="100vw"
            priority={index === 0}
            style={{ objectFit: "cover" }}
            key={slide.slug}
            src={slide.image}
            alt=""
            className={`news-hero-image ${index === active ? "active" : ""}`}
          />
        ))}
        <div className="news-hero-overlay" />
      </div>

      <div className="container news-hero-content">
        <span className="mono news-hero-breadcrumb">
          HOME <b>/</b> NEWS &amp; EVENTS
        </span>

        <div className="news-hero-featured-tag">Featured</div>

        <p className="news-hero-brand">AFLEX</p>

        <div className="news-hero-slide-copy" key={current.slug}>
          <span className="mono news-hero-meta">
            {current.category} · {current.date} · {current.readTime}
          </span>
          <h1>{current.title}</h1>
          <p className="news-hero-lead">{current.excerpt}</p>
          <div className="button-row">
            <Link className="button button-primary" href={`/news/${current.slug}`}>
              Read story <span>↗</span>
            </Link>
            <Link className="button button-outline light" href="#academy-news">
              All news <span>↓</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="news-hero-controls">
        <div className="news-hero-dots" role="tablist" aria-label="Featured stories">
          {slides.map((slide, index) => (
            <button
              key={slide.slug}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show: ${slide.title}`}
              className={`news-hero-dot ${index === active ? "active" : ""}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <div className="news-hero-progress" aria-hidden="true">
          <span
            key={`${current.slug}-${paused}`}
            className={`news-hero-progress-bar ${paused ? "paused" : ""}`}
            style={{ animationDuration: `${SLIDE_MS}ms` }}
          />
        </div>
      </div>
    </section>
  );
}
