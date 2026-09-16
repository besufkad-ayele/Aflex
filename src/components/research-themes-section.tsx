"use client";

import Link from "next/link";
import { useState } from "react";

const researchThemes = [
  {
    id: "pan-africanism",
    title: "Pan-Africanism",
    description:
      "Continental solidarity, shared destiny, and the political economy of African unity—from liberation movements to AfCFTA integration.",
    focus: "Continental Integration",
  },
  {
    id: "political-economy",
    title: "Political Economy",
    description:
      "How power, resources, and institutions interact across African states—examining trade corridors, sovereign finance, and structural transformation.",
    focus: "Economic Statecraft",
  },
  {
    id: "state-leadership",
    title: "State Leadership",
    description:
      "The craft of governing under constraint: executive judgment, bureaucratic capacity, and the daily work of building capable states.",
    focus: "Executive Practice",
  },
  {
    id: "nation-building",
    title: "Nation Building",
    description:
      "Forging shared identity and institutional trust across diverse societies—constitutional design, civic culture, and generational continuity.",
    focus: "Institutional Design",
  },
  {
    id: "intellectualism",
    title: "Intellectualism",
    description:
      "Recovering African epistemologies and intellectual traditions as foundations for policy, education, and public discourse.",
    focus: "Indigenous Knowledge",
  },
  {
    id: "public-diplomacy",
    title: "Public Diplomacy",
    description:
      "How African nations project influence, build alliances, and shape continental and global narratives through strategic engagement.",
    focus: "Soft Power",
  },
  {
    id: "leadership-personalities",
    title: "Leadership Personalities",
    description:
      "Biographical and psychological dimensions of African leadership—character, conviction, and the weight of public office.",
    focus: "Leadership Biography",
  },
  {
    id: "institutional-leadership",
    title: "Institutional Leadership",
    description:
      "Building and sustaining organizations that outlast individuals—reform architecture, succession planning, and organizational resilience.",
    focus: "Organizational Excellence",
  },
];

const themeStats = [
  { value: "8", label: "Core inquiry themes" },
  { value: "24+", label: "Active research fellows" },
  { value: "12", label: "Policy briefs published" },
  { value: "54", label: "Governance systems mapped" },
];

export function ResearchThemesSection() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  return (
    <section className="research-themes-light-section" id="research-themes">
      <div className="container">
        <div className="research-themes-header">
          <div className="research-themes-heading">
            <span className="eyebrow">RESEARCH THEMES</span>
            <h2>
              Themes guiding our
              <br />
              <em>inquiry.</em>
            </h2>
            <p>
              Our research practice explores the histories, systems, and ideas that shape African
              leadership and public life—grounding executive education in rigorous, locally rooted
              scholarship.
            </p>
          </div>

          <div className="research-themes-stats">
            {themeStats.map((stat) => (
              <div className="research-theme-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="research-themes-grid">
          {researchThemes.map((theme, index) => {
            const isActive = activeTheme === theme.id;

            return (
              <article
                key={theme.id}
                className={`research-theme-card ${isActive ? "active" : ""}`}
                onMouseEnter={() => setActiveTheme(theme.id)}
                onMouseLeave={() => setActiveTheme(null)}
                onFocus={() => setActiveTheme(theme.id)}
                onBlur={() => setActiveTheme(null)}
                tabIndex={0}
              >
                <span className="research-theme-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="research-theme-body">
                  <span className="research-theme-focus">{theme.focus}</span>
                  <h3>{theme.title}</h3>
                  <p>{theme.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="research-themes-featured">
          <div className="research-themes-doc">
            <span className="mono research-themes-doc-badge">FEATURED RESEARCH · PAN-AFRICANISM</span>
            <h3>Pan-Africanism Now: Pan-Africanism for a Changing World</h3>
            <p>
              A commissioned AFLEX study on Pan-Africanism’s meaning for contemporary stability,
              security, and prosperity—and how Ethiopia can advance continental objectives.
            </p>
            <Link className="button button-outline" href="#pan-africanism">
              <span>Read the project overview</span>
              <span>↗</span>
            </Link>
          </div>

          <div className="research-themes-connect research-themes-connect-photo">
            <img
              src="/images/pan1.jpg"
              alt="Founding Pan-African leaders at an early African unity summit."
            />
            <p>
              Every AFLEX program is informed by ongoing research across these themes—connecting
              classroom learning to live policy inquiry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
