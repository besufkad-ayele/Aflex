"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

import {
  boardMembers,
  seniorExecutives,
  type LeaderProfile,
} from "@/lib/leadership-data";

function LeaderExpandedCard({ leader, index }: { leader: LeaderProfile; index: number }) {
  return (
    <article
      className="horizontal-card expanded card-gold executive-always-expanded"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="card-top-photo-box">
        <Image src={leader.image} alt={leader.name} fill sizes="(max-width: 768px) 100vw, 320px" className="card-top-photo-img" style={{ objectFit: "cover" }} />
      </div>
      <div className="card-bottom-extension">
        <div className="card-extension-badge-row">
          <span className="card-extension-badge">{leader.badge}</span>
        </div>
        <h4 className="card-extension-name">{leader.name}</h4>
        <p className="card-extension-role">{leader.role}</p>
        <div className="card-extension-accent-line">
          <div className="card-extension-accent-dot" />
        </div>
        <p className="card-extension-bio">{leader.bio}</p>
        {leader.responsibilities && (
          <div className="card-extension-responsibilities">
            <span className="responsibilities-title">PORTFOLIO & DIRECTIVES:</span>
            <ul>
              {leader.responsibilities.map((item, idx) => (
                <li key={idx}>
                  <span className="list-marker">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {leader.externalUrl && (
          <div className="card-extension-cta">
            <a
              href={leader.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="extension-profile-btn"
            >
              <span>Official Executive Profile</span>
              <span>↗</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

function ExecutiveShowcase({ leaders }: { leaders: LeaderProfile[] }) {
  return (
    <div className="leadership-strip-group executive-golden-strip executive-all-expanded" id="leadership">
      <div className="leadership-strip-header executive-showcase-header">
        <div className="leadership-badge-pill">
          <span className="leadership-pill-dot" style={{ background: "#D4AF37", boxShadow: "0 0 8px #D4AF37" }} />
          <span>EXECUTIVE DIRECTORATE</span>
        </div>
        <h3 className="strip-title">Senior Executive Team</h3>
        <p className="strip-subtitle">
          Directing the Academy&apos;s day-to-day operations, curriculum rigor, and continental statecraft flagships.
        </p>
      </div>

      <div className="horizontal-accordion-container executive-expanded-container">
        <div className="horizontal-accordion-track executive-expanded-track">
          {leaders.map((leader, index) => (
            <LeaderExpandedCard key={leader.id} leader={leader} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface HorizontalStripProps {
  title: string;
  subtitle: string;
  badgeTitle: string;
  badgeDotColor?: string;
  leaders: LeaderProfile[];
  theme: "gold" | "board";
  defaultActiveId: string;
}

function HorizontalStrip({
  title,
  subtitle,
  badgeTitle,
  badgeDotColor,
  leaders,
  theme,
  defaultActiveId,
}: HorizontalStripProps) {
  const [activeId, setActiveId] = useState<string>(defaultActiveId);
  const [isMobile, setIsMobile] = useState(false);
  const isBoard = theme === "board";
  const forceExpanded = isBoard && isMobile;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className={`leadership-strip-group ${theme === "gold" ? "executive-golden-strip" : "board-strip"}`}>
      <div className="leadership-strip-header">
        <div className="leadership-badge-pill">
          <span className="leadership-pill-dot" style={badgeDotColor ? { background: badgeDotColor, boxShadow: `0 0 8px ${badgeDotColor}` } : {}} />
          <span>{badgeTitle}</span>
        </div>
        <h3 className="strip-title">{title}</h3>
        <p className="strip-subtitle">{subtitle}</p>
      </div>

      <div className="horizontal-accordion-container">
        <div className="horizontal-accordion-track">
          {leaders.map((leader) => {
            const isExpanded = forceExpanded || leader.id === activeId;

            return (
              <div
                key={leader.id}
                className={`horizontal-card ${isExpanded ? "expanded" : "collapsed"} ${theme === "gold" ? "card-gold" : "card-board"}`}
                onClick={forceExpanded ? undefined : () => setActiveId(leader.id)}
                role={forceExpanded ? "article" : "button"}
                tabIndex={forceExpanded ? undefined : 0}
                aria-expanded={isExpanded}
                onKeyDown={
                  forceExpanded
                    ? undefined
                    : (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveId(leader.id);
                        }
                      }
                }
              >
                <div className="card-top-photo-box">
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    style={{ objectFit: "cover" }}
                    src={leader.image}
                    alt={leader.name}
                    className="card-top-photo-img"
                  />
                  {!isExpanded && (
                    <div className="collapsed-spine-overlay">
                      <span className="collapsed-spine-name">{leader.name}</span>
                    </div>
                  )}
                </div>

                {isExpanded && (
                  <div className="card-bottom-extension">
                    <div className="card-extension-badge-row">
                      <span className="card-extension-badge">{leader.badge}</span>
                    </div>

                    <h4 className="card-extension-name">{leader.name}</h4>
                    <p className="card-extension-role">{leader.role}</p>

                    <div className="card-extension-accent-line">
                      <div className="card-extension-accent-dot" />
                    </div>

                    <p className="card-extension-bio">{leader.bio}</p>

                    {leader.responsibilities && (
                      <div className="card-extension-responsibilities">
                        <span className="responsibilities-title">PORTFOLIO & DIRECTIVES:</span>
                        <ul>
                          {leader.responsibilities.map((item, idx) => (
                            <li key={idx}>
                              <span className="list-marker">✦</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {leader.externalUrl && (
                      <div className="card-extension-cta">
                        <a
                          href={leader.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="extension-profile-btn"
                        >
                          <span>Official Executive Profile</span>
                          <span>↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface AboutLeadershipSectionProps {
  locale?: Locale;
}

export function AboutLeadershipSection({ locale }: AboutLeadershipSectionProps) {
  return (
    <section className="horizontal-leadership-section" id="governance">
      <div className="container">
        {/* Section Master Heading (No Tab Switcher Needed) */}
        <div className="leadership-master-header leadership-master-header-centered">
          <div className="leadership-badge-pill">
            <span className="leadership-pill-dot" />
            <span>ACADEMY GOVERNANCE & STEWARDSHIP</span>
          </div>
          <h2>
            Leadership & <em>Governing Stewardship.</em>
          </h2>
          <p>
            Entrusted with the mandate to shape Africa&apos;s premier institution for leadership excellence, policy research, and continental transformation.
          </p>
          <Link href="/about/leadership" className="button button-outline light" style={{ marginTop: 22 }}>
            <span>See all</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* 1. Senior Executive Team — all profiles visible, centered */}
        <ExecutiveShowcase leaders={seniorExecutives} />

        {/* 2. AFLEX Board Members Strip (Governing Board) */}
        <HorizontalStrip
          title="AFLEX Governing Board Members"
          subtitle="Guiding legislative policy, inter-ministerial alignment, and continental alliances across Africa."
          badgeTitle="BOARD OF GOVERNORS"
          badgeDotColor="#1e73be"
          leaders={boardMembers}
          theme="board"
          defaultActiveId="tagese-chafo"
        />

        {/* Bottom Summary Strip */}
        <div className="leadership-footer-summary">
          <div className="leadership-summary-item">
            <span className="summary-number gold">03</span>
            <div>
              <strong>Senior Executive Team</strong>
              <small>Led by Mohammedrafie Abaraya (Chief Executive Officer)</small>
            </div>
          </div>
          <div className="leadership-summary-divider" />
          <div className="leadership-summary-item">
            <span className="summary-number">07</span>
            <div>
              <strong>Governing Board Members</strong>
              <small>Presided by H.E Tagesse Chafo (Chairperson)</small>
            </div>
          </div>
          <div className="leadership-summary-divider" />
          <div className="leadership-summary-item">
            <span className="summary-number">2021</span>
            <div>
              <strong>Federal Mandate</strong>
              <small>Established by Council of Ministers (FDRE)</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
