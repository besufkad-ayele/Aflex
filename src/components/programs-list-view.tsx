"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { programDetails } from "@/lib/programs-data";
import type { Locale } from "@/lib/i18n";

interface ProgramsListViewProps {
  locale?: Locale;
}

const programImages: Record<string, string> = {
  "leadership-development":
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85",
  "project-wild":
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=85",
  psle: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85",
};

function parseMetaChips(meta: string) {
  return meta.split("·").map((part) => part.trim()).filter(Boolean);
}

export function ProgramsListView({ locale }: ProgramsListViewProps) {
  const [expandedProgram, setExpandedProgram] = useState<string | null>("leadership-development");

  return (
    <div className="programs-full-list">
      {programDetails.map((program) => {
        const isExpanded = expandedProgram === program.id;
        const img =
          programImages[program.id] ||
          "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85";
        const contactUrl = locale
          ? `/${locale}/contact?program=${program.id}`
          : `/contact?program=${program.id}`;
        const metaChips = parseMetaChips(program.meta);

        return (
          <article
            className={`program-executive-card ${isExpanded ? "expanded" : ""}`}
            id={program.id}
            key={program.id}
          >
            <div className="program-card-accent-bar" aria-hidden="true" />

            <div className="program-card-body">
              <div className="program-card-main-grid">
                <div className="program-card-copy-col">
                  <div className="program-card-topline">
                    <span className="program-code-display">{program.code}</span>
                    <div className="program-meta-flow">
                      {metaChips.map((chip, i) => (
                        <span key={chip}>
                          {i > 0 && <span className="meta-dot" aria-hidden="true" />}
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="program-title-row">
                    <Image
                      src="/images/aflex-icon.png"
                      alt=""
                      width={22}
                      height={22}
                      className="program-card-mark"
                      aria-hidden="true"
                    />
                    <h2>{program.title}</h2>
                  </div>

                  <p className="program-lead-text">{program.copy}</p>

                  <dl className="program-meta-inline">
                    <div className="program-meta-item">
                      <dt>Format</dt>
                      <dd>{program.format.split(".")[0]}</dd>
                    </div>
                    <div className="program-meta-item">
                      <dt>Cohort</dt>
                      <dd>{metaChips[0] || "Executive"}</dd>
                    </div>
                    <div className="program-meta-item">
                      <dt>Delivery</dt>
                      <dd>{metaChips[metaChips.length - 1] || "Hybrid"}</dd>
                    </div>
                  </dl>

                  <div className="program-audience-line">
                    <span className="mono">Target cohort</span>
                    <p>{program.audience}</p>
                  </div>

                  <div className="program-actions-row">
                    <Link
                      className="button button-primary"
                      href={contactUrl}
                      style={{ background: "var(--gold)", color: "#000", fontWeight: 600 }}
                    >
                      <span>Inquire / Apply</span>
                      <span>↗</span>
                    </Link>
                    <button
                      type="button"
                      className="button button-outline light"
                      onClick={() => setExpandedProgram(isExpanded ? null : program.id)}
                    >
                      <span>{isExpanded ? "Collapse Details" : "Curriculum Overview"}</span>
                      <span className="toggle-icon">{isExpanded ? "▲" : "▼"}</span>
                    </button>
                  </div>
                </div>

                <div className="program-card-media-col" style={{ position: "relative", minHeight: "280px" }}>
                  <Image
                    src={img}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="program-banner-img"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="program-media-overlay" />
                </div>
              </div>

              {isExpanded && (
                <div className="program-card-expanded-drawer">
                  <Image
                    src="/images/aflex-icon.png"
                    alt=""
                    width={96}
                    height={96}
                    className="program-drawer-watermark"
                    aria-hidden="true"
                  />
                  <div className="expanded-details-grid">
                    <div className="expanded-col">
                      <span className="eyebrow expanded-label">About this pathway</span>
                      <p className="expanded-full-desc">{program.fullDescription}</p>

                      {program.outcomes && (
                        <div className="expanded-outcomes-wrap">
                          <span className="eyebrow expanded-label">Transformative outcomes</span>
                          <ul className="outcomes-list">
                            {program.outcomes.map((outcome, i) => (
                              <li key={i}>
                                <span className="outcome-mark">✓</span>
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
                          <span className="eyebrow expanded-label">Core modules & frameworks</span>
                          <ol className="modules-flow-list">
                            {program.modules.map((mod, i) => (
                              <li key={i}>
                                <span className="module-num">{String(i + 1).padStart(2, "0")}</span>
                                <span className="module-title">{mod}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {program.structure && (
                        <div className="structure-block">
                          <span className="eyebrow expanded-label">Cohort structure</span>
                          <ul className="structure-flow-list">
                            {program.structure.map((item, i) => (
                              <li key={i}>
                                <span className="structure-mark">✦</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="program-intake-note">
                        <span className="mono">Admissions note</span>
                        <p>{program.note}</p>
                        <Link className="text-link program-intake-link" href={contactUrl}>
                          <span>Register for upcoming cohort</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
