"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "story", label: "Story" },
  { id: "history", label: "History" },
  { id: "vision", label: "Vision" },
  { id: "values", label: "Values" },
  { id: "pillars", label: "Pillars" },
  { id: "governance", label: "Governance" },
  { id: "leadership", label: "Leadership" },
  { id: "campus", label: "Campus" },
] as const;

export function AboutSectionNav() {
  const [activeId, setActiveId] = useState<string>("story");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".about-hero-section");
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (hero) observer.observe(hero);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <nav
      className={`about-section-nav ${visible ? "is-visible" : ""}`}
      aria-label="About page sections"
    >
      <div className="about-section-nav-inner">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`about-section-nav-link ${activeId === section.id ? "is-active" : ""}`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
