"use client";

import Link from "next/link";
import { useState } from "react";
import { programDetails } from "@/lib/programs-data";
import type { Locale } from "@/lib/i18n";

interface ProgramsListViewProps {
  locale?: Locale;
}

const programImages: Record<string, string> = {
  "leadership-development": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85",
  "project-wild": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=85",
  "psle": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85"
};

export function ProgramsListView({ locale }: ProgramsListViewProps) {
  const [expandedProgram, setExpandedProgram] = useState<string | null>("leadership-development");

  return (
    <div className="programs-full-list">
      {programDetails.map((program, idx) => {
        const isExpanded = expandedProgram === program.id;
        const img = programImages[program.id] || "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85";
        const contactUrl = locale ? `/${locale}/contact?program=${program.id}` : `/contact?program=${program.id}`;

        return (
          <article 
            className={`program-executive-card ${isExpanded ? "expanded" : ""}`}
            id={program.id}
            key={program.id}
          >
            {/* Top Bar Header */}
            <div className="program-card-header">
              <div className="program-code-badge">
                <span className="code-num">{program.code}</span>
                <span className="code-meta">{program.meta}</span>
              </div>
              <button
                type="button"
                className="program-expand-toggle"
                onClick={() => setExpandedProgram(isExpanded ? null : program.id)}
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? "Hide Curriculum" : "View Curriculum & Modules"}</span>
                <span className="toggle-icon">{isExpanded ? "▲" : "▼"}</span>
              </button>
            </div>

            {/* Main 2-Column Banner */}
            <div className="program-card-main-grid">
              <div className="program-card-copy-col">
                <h2>{program.title}</h2>
                <p className="program-lead-text">{program.copy}</p>

                <div className="program-audience-box">
                  <span className="mono" style={{ color: "var(--gold)", fontSize: "11px" }}>TARGET COHORT:</span>
                  <p>{program.audience}</p>
                </div>

                <div className="program-actions-row">
                  <Link className="button button-primary" href={contactUrl} style={{ background: "var(--gold)", color: "#000", fontWeight: 600 }}>
                    <span>Inquire / Apply</span>
                    <span>↗</span>
                  </Link>
                  <button
                    type="button"
                    className="button button-outline light"
                    onClick={() => setExpandedProgram(isExpanded ? null : program.id)}
                  >
                    <span>{isExpanded ? "Collapse Details" : "Curriculum Overview"}</span>
                  </button>
                </div>
              </div>

              <div className="program-card-media-col">
                <img src={img} alt={program.title} className="program-banner-img" />
                <div className="program-media-overlay" />
                <span className="program-format-pill">{program.format.split(".")[0]}</span>
              </div>
            </div>

            {/* Expanded Detailed Curriculum, Modules & Outcomes */}
            {isExpanded && (
              <div className="program-card-expanded-drawer">
                <div className="expanded-details-grid">
                  <div className="expanded-col">
                    <span className="eyebrow" style={{ color: "var(--gold)" }}>ABOUT THIS PATHWAY</span>
                    <p className="expanded-full-desc">{program.fullDescription}</p>

                    {program.outcomes && (
                      <div className="expanded-outcomes-wrap">
                        <span className="eyebrow" style={{ color: "var(--gold)", fontSize: "11px", marginTop: "18px" }}>
                          TRANSFORMATIVE OUTCOMES
                        </span>
                        <ul className="outcomes-list">
                          {program.outcomes.map((outcome, i) => (
                            <li key={i}>
                              <span style={{ color: "var(--gold)" }}>✓</span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="expanded-col">
                    {program.modules && (
                      <div className="modules-block">
                        <span className="eyebrow" style={{ color: "var(--gold)" }}>CORE MODULES & FRAMEWORKS</span>
                        <div className="modules-grid">
                          {program.modules.map((mod, i) => (
                            <div key={i} className="module-item">
                              <span className="mono module-num">0{i + 1}</span>
                              <span className="module-title">{mod}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {program.structure && (
                      <div className="structure-block">
                        <span className="eyebrow" style={{ color: "var(--gold)" }}>COHORT STRUCTURE</span>
                        <div className="structure-list">
                          {program.structure.map((item, i) => (
                            <div key={i} className="structure-item">
                              <span className="mono" style={{ color: "var(--gold)" }}>✦</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="program-intake-note">
                      <span className="mono" style={{ color: "var(--gold)" }}>ADMISSIONS NOTE:</span>
                      <p>{program.note}</p>
                      <Link className="text-link" href={contactUrl} style={{ color: "var(--gold)", fontWeight: 600, fontSize: "14px", marginTop: "8px" }}>
                        <span>Register for upcoming cohort</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
