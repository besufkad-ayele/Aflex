"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageFrame, SectionTitle } from "@/components/page-primitives";
import { programDetails } from "@/lib/programs-data";

const catalogOfferings = [
  ...programDetails.map((p) => ({
    id: p.id,
    title: p.title,
    meta: p.meta,
    category: p.meta.includes("SHORT-TERM") ? "Short-term" : p.meta.includes("LONG-TERM") ? "Long-term" : "Executive",
    modality: p.meta.includes("HYBRID") ? "Hybrid" : "In-person",
    target: p.id === "project-wild" ? "Women leaders" : "Senior executive",
    duration: p.meta.includes("3–10 DAYS") ? "3–10 Days" : p.meta.includes("12–18 MONTHS") ? "12–18 Months" : "Modular",
    description: p.copy,
    status: "Open for Nominations"
  })),
  {
    id: "pan-african-diplomacy",
    title: "Pan-African Public Diplomacy & Statecraft",
    meta: "EXECUTIVE SEMINAR · 5 DAYS · SULULTA",
    category: "Short-term",
    modality: "In-person",
    target: "Senior executive",
    duration: "5 Days",
    description: "Intensive forum on regional integration, AU Agenda 2063, and negotiations for senior diplomatic and ministerial delegations.",
    status: "Upcoming Cohort"
  },
  {
    id: "ethical-governance",
    title: "Ethical Governance & Anti-Corruption Systems",
    meta: "MODULAR CERTIFICATE · 2 WEEKS · HYBRID",
    category: "Short-term",
    modality: "Hybrid",
    target: "Senior executive",
    duration: "2 Weeks",
    description: "Practical methodologies for building resilient oversight, institutional transparency, and ethical leadership cultures.",
    status: "Upcoming Cohort"
  }
];

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredItems = useMemo(() => {
    return catalogOfferings.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.meta.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (selectedFilter === "all") return true;
      if (selectedFilter === "short-term") return item.category === "Short-term";
      if (selectedFilter === "long-term") return item.category === "Long-term";
      if (selectedFilter === "hybrid") return item.modality === "Hybrid";
      if (selectedFilter === "in-person") return item.modality === "In-person";
      if (selectedFilter === "women") return item.target === "Women leaders";
      if (selectedFilter === "executive") return item.target === "Senior executive";
      return true;
    });
  }, [searchQuery, selectedFilter]);

  const filterOptions = [
    { key: "all", label: "All Offerings" },
    { key: "short-term", label: "Short-term" },
    { key: "long-term", label: "Long-term" },
    { key: "in-person", label: "In-person" },
    { key: "hybrid", label: "Hybrid" },
    { key: "executive", label: "Senior Executive" },
    { key: "women", label: "Women Leaders" }
  ];

  return (
    <PageFrame 
      active="Catalog" 
      crumb="Catalog" 
      title="Training Catalog" 
      intro="Browse current and upcoming leadership offerings at the Sululta campus and hybrid formats."
    >
      <section className="section">
        <div className="container">
          <div className="catalog-layout">
            <aside className="catalog-filters">
              <span className="eyebrow">FILTER BY CATEGORY</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                {filterOptions.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSelectedFilter(opt.key)}
                    className={`filter-pill ${selectedFilter === opt.key ? "active" : ""}`}
                    style={{ textAlign: "left", width: "100%", borderRadius: "4px" }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </aside>

            <div>
              <SectionTitle 
                eyebrow="ACADEMIC OFFERINGS" 
                title={<>Find the right<br /><em>leadership track.</em></>} 
                copy="Select a track to review curriculum modules, delivery structure, and submit cohort nominations."
              />

              <div className="search-input-wrap">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog by title, theme, or duration..."
                  className="search-input-field"
                  aria-label="Search catalog"
                />
              </div>

              <div style={{ marginBottom: "20px", fontSize: "13px", color: "var(--muted-light)" }}>
                Showing <strong>{filteredItems.length}</strong> offering{filteredItems.length === 1 ? "" : "s"}
                {selectedFilter !== "all" || searchQuery ? (
                  <button 
                    onClick={() => { setSelectedFilter("all"); setSearchQuery(""); }}
                    style={{ marginLeft: "12px", border: "none", background: "none", color: "var(--blue)", cursor: "pointer", textDecoration: "underline" }}
                  >
                    Reset filters
                  </button>
                ) : null}
              </div>

              <div className="catalog-list">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <article className="catalog-row" key={item.id} style={{ padding: "28px 0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                        <span className="mono" style={{ color: "var(--gold)" }}>{item.meta}</span>
                        <span className="mono" style={{ background: "rgba(30,115,190,0.1)", color: "var(--blue)", padding: "3px 8px", borderRadius: "2px" }}>
                          {item.status}
                        </span>
                      </div>
                      <h3 style={{ margin: "14px 0 10px", fontSize: "24px" }}>{item.title}</h3>
                      <p style={{ margin: "0 0 18px", color: "var(--muted-light)", maxWidth: "680px" }}>{item.description}</p>
                      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                        <Link className="text-link" href={item.id.includes("-") ? `/programs#${item.id}` : `/programs`}>
                          View curriculum <span>→</span>
                        </Link>
                        <Link className="button button-primary" href={`/contact?program=${item.id}`} style={{ padding: "8px 16px", fontSize: "12px" }}>
                          Inquire / Nominate <span>↗</span>
                        </Link>
                      </div>
                    </article>
                  ))
                ) : (
                  <div style={{ padding: "40px 0", textAlign: "center", borderTop: "1px solid var(--line-light)" }}>
                    <p style={{ color: "var(--muted-light)", fontSize: "16px" }}>No offerings match your current filter criteria.</p>
                    <button 
                      className="button button-outline"
                      onClick={() => { setSelectedFilter("all"); setSearchQuery(""); }}
                      style={{ marginTop: "16px" }}
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}