"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  category: "board" | "executive";
  image: string;
  badge: string;
  bio: string;
  responsibilities?: string[];
  externalUrl?: string;
}

const seniorExecutives: LeaderProfile[] = [
  {
    id: "zadig-abreha",
    name: "Zadig Abreha",
    role: "Chief of the Academy",
    category: "executive",
    image: "/images/zadig abereha.webp",
    badge: "CHIEF EXECUTIVE OFFICER",
    externalUrl: "https://aflexacademy.gov.et/zadig-abreha/",
    bio: "H.E. Zadig Abreha leads the African Leadership Excellence Academy with a clear mission: to build a world-class center of excellence for dialogue, ideation, and elite executive training across Africa. Under his leadership, the Academy has established high-impact leadership paths, continent-wide partnerships, and state-of-the-art facilities at the Sululta highland campus.",
    responsibilities: [
      "Institutional Strategy & Overall Command",
      "Continental Alliances & Ministerial Partnerships",
      "Curricula Direction & Statecraft Flagships"
    ]
  },
  {
    id: "meseret-desta",
    name: "Mrs. Meseret Desta",
    role: "Vice Chief of Academy, Leadership Development",
    category: "executive",
    image: "/about/meseret desta vice chief of acadamy leadership development.jpg",
    badge: "VICE CHIEF · LEADERSHIP DEVELOPMENT",
    externalUrl: "https://aflexacademy.gov.et/zadig-abreha/",
    bio: "Mrs. Meseret Desta directs the Academy's flagship leadership development programs, executive cohorts, and women's leadership initiatives (Project WILD). She oversees pedagogical innovation, participant mentorship, and transformational leadership tracks tailored to senior decision-makers.",
    responsibilities: [
      "Leadership Development & Executive Cohorts",
      "Project WILD (Women in Leadership)",
      "Pedagogy, Faculty & Participant Experience"
    ]
  },
  {
    id: "wondeye-legesse",
    name: "Wondeye Legesse (PhD)",
    role: "Vice Chief of Academy, Operations",
    category: "executive",
    image: "/about/wondeye legese vice chief of acadaymy operation.png",
    badge: "VICE CHIEF · OPERATIONS",
    externalUrl: "https://aflexacademy.gov.et/aflex/vice-president-and-operational-sector/",
    bio: "Dr. Wondeye Legesse leads operational excellence, residential infrastructure, campus technology, and institutional finance at AFLEX. He ensures the Sululta highland campus operates at globally competitive standards for executive deliberation and continuous learning.",
    responsibilities: [
      "Campus Operations & Residential Logistics",
      "Institutional Technology, LMS & Infrastructure",
      "Finance, Administration & Procurement Standards"
    ]
  }
];

const boardMembers: LeaderProfile[] = [
  {
    id: "tagese-chafo",
    name: "H.E Tagesse Chafo",
    role: "Chairperson of the Board",
    category: "board",
    image: "/about/he tages chafo chaire person.png",
    badge: "GOVERNING BOARD CHAIR",
    bio: "Speaker of the House of Peoples' Representatives of the Federal Democratic Republic of Ethiopia. H.E Tagesse Chafo presides over the AFLEX Governing Board, stewarding its legislative mandate and strategic alignment with national and continental leadership transformation.",
    responsibilities: [
      "Speaker of the House of Peoples' Representatives (FDRE)",
      "Chairperson · AFLEX Board of Governors",
      "Parliamentary Governance & National Policy Direction"
    ]
  },
  {
    id: "binalf-andualem",
    name: "H.E Binalf Andualem",
    role: "Board Member",
    category: "board",
    image: "/about/he binalf andualem.jpg",
    badge: "MINISTERIAL GOVERNOR",
    bio: "Minister of Peace of the Federal Democratic Republic of Ethiopia. H.E Binalf Andualem guides institutional consensus, state-building leadership curriculums, and national cohesion initiatives within the Academy.",
    responsibilities: [
      "Minister of Peace (FDRE)",
      "Governing Board Member · AFLEX",
      "State-Building & Civic Leadership Stewardship"
    ]
  },
  {
    id: "gedion-timotheos",
    name: "H.E Gedion Timotheos (PhD)",
    role: "Board Member",
    category: "board",
    image: "/about/he gedion timotheos.jpg",
    badge: "LEGAL & STRATEGIC ADVISOR",
    bio: "Minister of Foreign Affairs (and former Minister of Justice & Attorney General). Dr. Gedion Timotheos provides strategic counsel on continental legal frameworks, diplomatic statecraft, and multilateral cooperation for AFLEX programs.",
    responsibilities: [
      "Minister of Foreign Affairs (FDRE)",
      "Governing Board Member · AFLEX",
      "Constitutional Law & International Statecraft"
    ]
  },
  {
    id: "tesfaye-daba",
    name: "H.E Tesfaye Daba",
    role: "Board Member",
    category: "board",
    image: "/about/h.e tesfaye daba memener.png",
    badge: "GOVERNANCE & POLICY MEMBER",
    bio: "Senior Government Executive and Member of Parliament. H.E Tesfaye Daba champions institutional performance, executive public service accountability, and policy implementation excellence.",
    responsibilities: [
      "Member of Parliament & Senior Statesman",
      "Governing Board Member · AFLEX",
      "Public Sector Execution & Legislative Oversight"
    ]
  },
  {
    id: "muferihat-kamil",
    name: "H.E Muferihat Kamil",
    role: "Board Member",
    category: "board",
    image: "/about/he muferihat kamil memeber.jpg",
    badge: "HUMAN CAPITAL & LABOUR",
    bio: "Minister of Labour and Skills of the Federal Democratic Republic of Ethiopia. H.E Muferihat Kamil directs strategic focus on continental workforce readiness, human capital development, and executive mentorship flagships.",
    responsibilities: [
      "Minister of Labour and Skills (FDRE)",
      "Governing Board Member · AFLEX",
      "Human Capital Strategy & Executive Skill Transformation"
    ]
  },
  {
    id: "david-valle",
    name: "David Valle",
    role: "Board Member",
    category: "board",
    image: "/about/david valle memner.png",
    badge: "INTERNATIONAL STRATEGY",
    bio: "Global executive and international leadership strategist serving on the AFLEX Governing Board to foster global institutional linkages, executive mentorship exchanges, and cross-border research alliances.",
    responsibilities: [
      "International Governance & Development Strategist",
      "Governing Board Member · AFLEX",
      "Cross-Border Alliances & Institutional Innovation"
    ]
  },
  {
    id: "zadig-board-sec",
    name: "Zadig Abreha",
    role: "Secretary to the Board",
    category: "board",
    image: "/images/zadig abereha.webp",
    badge: "BOARD SECRETARY & CHIEF",
    bio: "Chief of the Academy and Secretary to the Governing Board. Leads the executive design and day-to-day execution of the Academy's continental mandate, coordinating between the Governing Board and academy faculties.",
    responsibilities: [
      "Chief of Academy · AFLEX",
      "Secretary to the Governing Board",
      "Executive Directorate Leadership"
    ]
  }
];

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
    <div className="leadership-strip-group executive-golden-strip executive-all-expanded">
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
            const isExpanded = leader.id === activeId;

            return (
              <div
                key={leader.id}
                className={`horizontal-card ${isExpanded ? "expanded" : "collapsed"} ${theme === "gold" ? "card-gold" : "card-board"}`}
                onClick={() => setActiveId(leader.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveId(leader.id);
                  }
                }}
              >
                {/* 1. TOP PORTRAIT PHOTO (Always fully visible at top, never covered) */}
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

                {/* 2. BOTTOM DETAILS (Extending directly BELOW the image when expanded) */}
                {isExpanded && (
                  <div className="card-bottom-extension">
                    <div className="card-extension-badge-row">
                      <span className="card-extension-badge">{leader.badge}</span>
                    </div>

                    <h4 className="card-extension-name">{leader.name}</h4>
                    <p className="card-extension-role">{leader.role}</p>

                    {/* Golden accent line with slider dot matching reference image */}
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
              <small>Led by Zadig Abreha (Chief of the Academy)</small>
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
