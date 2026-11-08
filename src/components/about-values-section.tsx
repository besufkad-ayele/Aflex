"use client";

import { useState } from "react";

const values = [
  {
    name: "Civility",
    letter: "C",
    description: "Mutual respect, deep listening, and dignity in all public deliberation.",
  },
  {
    name: "Optimity",
    letter: "O",
    description: "Relentless pursuit of optimal solutions and highest institutional standards.",
  },
  {
    name: "Magnanimity",
    letter: "M",
    description: "Nobility of spirit, generous statesmanship, and serving the greater good.",
  },
  {
    name: "Integrity",
    letter: "I",
    description: "Uncompromising ethical fortitude, honesty, and accountability.",
  },
  {
    name: "Novelty",
    letter: "N",
    description: "Original thinking, innovative statecraft, and transformative curiosity.",
  },
  {
    name: "Glocality",
    letter: "G",
    description: "Grounded in African heritage while mastering global best practices.",
  },
] as const;

export function AboutValuesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = values[activeIndex];

  return (
    <section className="values-section black-section about-values-section" id="values">
      <div className="container">
        <div className="section-heading about-values-heading">
          <span className="eyebrow about-values-eyebrow">OUR GUIDING VALUES</span>
          <h2>
            The COMING Framework for
            <br />
            <em>ethical statecraft.</em>
          </h2>
          <p className="about-values-lead">
            Six foundational values that guide our faculties, curriculum, and every cohort at AFLEX. Select a letter to explore each principle.
          </p>
        </div>

        <div className="about-coming-spelling" role="tablist" aria-label="COMING values">
          {values.map((value, index) => (
            <button
              key={value.name}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls="coming-value-panel"
              id={`coming-tab-${value.letter}`}
              className={`about-coming-letter ${activeIndex === index ? "is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <span className="about-coming-char">{value.letter}</span>
              <span className="about-coming-name">{value.name}</span>
            </button>
          ))}
        </div>

        <div
          className="about-coming-panel"
          id="coming-value-panel"
          role="tabpanel"
          aria-labelledby={`coming-tab-${active.letter}`}
        >
          <span className="mono about-coming-panel-index">
            0{activeIndex + 1} / 06 · {active.letter}
          </span>
          <h3>{active.name}</h3>
          <p>{active.description}</p>
        </div>

        <div className="value-grid about-value-grid">
          {values.map((item, index) => (
            <button
              type="button"
              className={`value-item about-value-item ${activeIndex === index ? "is-active" : ""}`}
              key={item.name}
              onClick={() => setActiveIndex(index)}
            >
              <span className="value-icon">{item.letter}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
