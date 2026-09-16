"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

interface ProgramsResearchImpactProps {
  locale?: Locale;
}

const studies = [
  {
    id: "pan-africanism-now",
    category: "pan-africanism",
    categoryLabel: "PAN-AFRICANISM",
    badge: "COMMISSIONED RESEARCH PROJECT",
    year: "2026",
    title: "Pan-Africanism Now: Pan-Africanism for a Changing World",
    abstract:
      "Studying Pan-Africanism as an intellectual and political movement for liberation, unity, and self-reliance—and its significance for contemporary stability, security, and prosperity across Africa and the diaspora.",
    docTitle: "Pan-Africanism Now: Pan-Africanism for a Changing World",
    pages: "RESEARCH BRIEF · PDF",
    citation: "AFLEX Policy & Research · Commissioned Study",
    metrics: [
      { label: "Thematic Focus", val: "Unity" },
      { label: "Policy Horizon", val: "Continental" },
    ],
  },
  {
    id: "indigenous-wisdom",
    category: "indigenous",
    categoryLabel: "INDIGENOUS STATECRAFT",
    badge: "POLICY WHITE PAPER · 2026 EDITION",
    year: "2026",
    title: "Recovering the architecture of true African wisdom.",
    abstract: "Investigating how African public institutions and civil services draw from centuries of lived governance philosophy—from Gadaa term limits to Axumite diplomacy—to build agile, ethical state institutions.",
    docTitle: "Architectures of Wisdom: Reclaiming African Institutional Philosophy for Modern Public Administration",
    pages: "36 PAGES · PDF",
    citation: "AFLEX Policy Lab & Continental Fellow Network",
    metrics: [
      { label: "African Constitutions & Traditional Systems Mapped", val: "54" },
      { label: "Pilot Reform Frameworks Active", val: "12" }
    ]
  },
  {
    id: "gadaa-ethics",
    category: "governance",
    categoryLabel: "DEMOCRATIC GOVERNANCE",
    badge: "EXECUTIVE MONOGRAPH",
    year: "2025",
    title: "Gadaa Constitutional Ethics & Generational Term Limits",
    abstract: "Analyzing separation of powers, 8-year generational cycles, and Siinqee institutional checks in the Oromo Gadaa model as blueprints for modern constitutional stability and peaceful transitions.",
    docTitle: "Gadaa Jurisprudence: Indigenous Checks & Balances for Modern African Republics",
    pages: "28 PAGES · PDF",
    citation: "Governance & Ethics Faculty",
    metrics: [
      { label: "Strict Term Limit Cycle", val: "8-YR" },
      { label: "Peaceful Power Transfer Record", val: "100%" }
    ]
  },
  {
    id: "afcfta-economy",
    category: "trade",
    categoryLabel: "ECONOMIC INTEGRATION",
    badge: "STRATEGIC TRADE STUDY",
    year: "2026",
    title: "AfCFTA Corridors & Sovereign African Payment Networks",
    abstract: "Examining cross-border trade facilitation, aviation cargo logistics via Ethiopian Airlines, and sovereign currency clearing mechanisms to eliminate non-tariff trade barriers.",
    docTitle: "Unlocking Continental Value Chains: Financial Sovereignty & Logistics Under AfCFTA",
    pages: "44 PAGES · PDF",
    citation: "Economic Statecraft Center",
    metrics: [
      { label: "Single Market GDP Potential", val: "$3.4T" },
      { label: "Aviation Trade Hubs Connected", val: "130+" }
    ]
  },
  {
    id: "climate-energy",
    category: "climate",
    categoryLabel: "ENERGY & CLIMATE",
    badge: "HYDROLOGICAL ASSESSMENT",
    year: "2025",
    title: "Trans-Boundary River Basins & Renewable Energy Geopolitics",
    abstract: "Lessons from the Grand Ethiopian Renaissance Dam (GERD) and Green Legacy 32B+ tree planting initiative on trans-boundary water diplomacy, clean power pools, and climate resilience.",
    docTitle: "Hydrological Statecraft: Clean Power Pools & Water Diplomacy in the Horn of Africa",
    pages: "32 PAGES · PDF",
    citation: "Resource Geopolitics Division",
    metrics: [
      { label: "Clean Hydro Power Generation", val: "5,150 MW" },
      { label: "National Forestation Seedlings", val: "32B+" }
    ]
  }
];

export function ProgramsResearchImpact({ locale }: ProgramsResearchImpactProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredStudies = activeCategory === "all"
    ? studies
    : studies.filter((s) => s.category === activeCategory);

  return (
    <section className="programs-research-impact-section" id="research-impact">
      <div className="container">
        {/* Section Header */}
        <div className="section-heading" style={{ maxWidth: "800px" }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>
            RESEARCH & POLICY PRACTICE
          </span>
          <h2>
            Research impact &<br />
            <em>policy monographs.</em>
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "16px", marginTop: "12px" }}>
            Our research practice directly informs AFLEX executive curricula and provides African policy-makers with rigorous, locally-grounded monographs and actionable governance frameworks.
          </p>
        </div>

        {/* Continental Research Impact Metrics Bar */}
        <div className="programs-impact-metrics-grid">
          <div className="impact-metric-card">
            <strong>54</strong>
            <span>African Governance Systems Mapped</span>
          </div>
          <div className="impact-metric-card">
            <strong>12</strong>
            <span>Pilot Ministry Reform Frameworks</span>
          </div>
          <div className="impact-metric-card">
            <strong>$3.4T</strong>
            <span>AfCFTA Single Market Trade Focus</span>
          </div>
          <div className="impact-metric-card">
            <strong>5,150 MW</strong>
            <span>GERD Renewable Energy Statecraft</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="leadership-filter-bar" style={{ marginTop: "40px" }}>
          <button
            type="button"
            className={`leadership-filter-btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Studies ({studies.length})
          </button>
          <button
            type="button"
            className={`leadership-filter-btn ${activeCategory === "pan-africanism" ? "active" : ""}`}
            onClick={() => setActiveCategory("pan-africanism")}
          >
            Pan-Africanism
          </button>
          <button
            type="button"
            className={`leadership-filter-btn ${activeCategory === "indigenous" ? "active" : ""}`}
            onClick={() => setActiveCategory("indigenous")}
          >
            Indigenous Statecraft
          </button>
          <button
            type="button"
            className={`leadership-filter-btn ${activeCategory === "governance" ? "active" : ""}`}
            onClick={() => setActiveCategory("governance")}
          >
            Democratic Governance
          </button>
          <button
            type="button"
            className={`leadership-filter-btn ${activeCategory === "trade" ? "active" : ""}`}
            onClick={() => setActiveCategory("trade")}
          >
            Trade & AfCFTA
          </button>
          <button
            type="button"
            className={`leadership-filter-btn ${activeCategory === "climate" ? "active" : ""}`}
            onClick={() => setActiveCategory("climate")}
          >
            Climate & Energy
          </button>
        </div>

        {/* Detailed Studies List */}
        <div className="programs-studies-list">
          {filteredStudies.map((study) => (
            <article key={study.id} className="program-study-item">
              <div className="study-header-line">
                <span className="study-cat-badge">{study.categoryLabel}</span>
                <span className="mono" style={{ color: "var(--gold)", fontSize: "11px" }}>{study.badge}</span>
              </div>

              <h3>{study.title}</h3>
              <p className="study-abstract">{study.abstract}</p>

              <div className="study-metrics-row">
                {study.metrics.map((m, idx) => (
                  <div key={idx} className="study-metric-pill">
                    <strong>{m.val}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="study-doc-footer">
                <div className="study-doc-info">
                  <span className="mono" style={{ color: "var(--gold)", fontSize: "11px" }}>{study.pages}</span>
                  <span style={{ fontSize: "13px", color: "#fff", fontWeight: 500 }}>{study.docTitle}</span>
                </div>
                <Link
                  className="button button-outline light"
                  href={`/catalog?doc=${study.id}`}
                  style={{ fontSize: "12px", padding: "8px 18px", borderRadius: "20px" }}
                >
                  <span>Request PDF Brief</span>
                  <span>↓</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
