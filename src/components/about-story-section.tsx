"use client";

import React, { useState } from "react";
import Link from "next/link";

export function AboutStorySection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="about-detailed-story-section" id="about-mandate">
      <div className="container">
        <div className="about-story-grid">
          {/* Left Column: Rich Text with See More Toggle */}
          <div className="about-story-content">
            <div className="about-story-pill">
              <span className="about-story-dot" />
              <span>ABOUT THE ACADEMY · INSTITUTIONAL MANDATE</span>
            </div>
            
            <h2 className="about-story-heading">
              Shaping Africa&apos;s <em>leaders</em> for a transformative era.
            </h2>

            <div className="about-story-paragraphs">
              <p className="lead-paragraph">
                <strong>African Leadership Excellence Academy (AFLEX)</strong> was reestablished in June, 2021 by the Council of Ministers, Federal Democratic Republic of Ethiopia. Prior to its reestablishment it was the Meles Zenawi Leadership Academy, an institution which provided various learning opportunities to national government leaders.
              </p>

              <p>
                Under its new mandate, the Academy strives to become the premier gathering place for leaders and thinkers from all over Africa who are ready to impact the values of society and culture. AFLEX aims to be the center of excellence for dialogue and ideation for years to come.
              </p>

              <p>
                The Academy will focus on three primary areas: <strong>Leadership Development</strong>, <strong>Research</strong>, and <strong>Policy Advisory Services</strong>. Under each of these pillars, flagship programs will be launched to equip senior and emerging leaders across the continent.
              </p>

              {/* Collapsible Extended Paragraphs */}
              <div className={`about-story-extended ${isExpanded ? "open" : ""}`}>
                <p>
                  The state-of-the-art facility located in Sululta, 25kms from Addis Ababa is a serene environment ideal for learning and reflection, fostering the required enabling environment.
                </p>

                <p>
                  Through its programs, engagement with likeminded leaders, AFLEX alumni will better understand the challenges the continent is facing and be equipped to address it with wisdom and understanding improving the lives of the communities and institutions they serve. Leaders will leave with practical tools to drive better outcomes.
                </p>
              </div>
            </div>

            {/* See More / See Less Toggle Button */}
            <div className="about-story-actions">
              <button
                type="button"
                className="about-see-more-btn"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? "Show Less" : "See More About AFLEX"}</span>
                <span className="see-more-icon">{isExpanded ? "↑" : "↓"}</span>
              </button>

              <Link href="/programs" className="about-explore-link">
                <span>Explore Programs</span>
                <span>↗</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Photo of all AFLEX Workers with Luxury Framing */}
          <div className="about-story-media">
            <div className="about-team-photo-card">
              <div className="team-photo-wrapper">
                <img
                  src="/about/aflex workees.jpg"
                  alt="AFLEX Academy Faculty, Leadership, and Staff at Sululta Campus"
                  className="team-photo-img"
                />
                <div className="team-photo-glow" />
                <div className="team-photo-badge">
                  <span className="badge-dot" />
                  <span>AFLEX FACULTY, RESEARCHERS & STAFF</span>
                </div>
              </div>

              <div className="team-photo-footer">
                <div>
                  <strong>Sululta Highland Campus</strong>
                  <small>United in building leadership excellence for Africa&apos;s renaissance</small>
                </div>
                <span className="mono team-elevation">2,450M ELEVATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
