"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface ResearchPolicySectionProps {
  locale?: Locale;
}

const researchTags = [
  "Indigenous Governance Philosophy",
  "AfCFTA Trade & Aviation Logistics",
  "Climate Geopolitics & Clean Energy",
];

export function ResearchPolicySection({ locale }: ResearchPolicySectionProps) {
  const programsUrl = locale ? `/${locale}/programs#research-impact` : "/programs#research-impact";

  return (
    <section className="research-section research-section-home" id="research">
      <div className="container">
        <div className="research-feature-card">
          <div className="research-feature-body">
            <span className="eyebrow research-feature-eyebrow">RESEARCH & POLICY PRACTICE</span>
            <span className="mono research-feature-code">FEATURED PRACTICE / 2026</span>
            <h2>
              Ideas that shape<br />
              <em>African statecraft.</em>
            </h2>
            <p>
              Our research practice asks how African institutions can draw from history, culture, and lived experience to build futures that are both locally grounded and globally engaged.
            </p>

            <div className="research-simple-tags-row">
              {researchTags.map((tag) => (
                <span className="research-simple-tag" key={tag}>✓ {tag}</span>
              ))}
            </div>

            <Link className="stacked-card-cta" href={programsUrl}>
              <span>Explore research & impact</span>
              <span className="stacked-card-cta-icon">↗</span>
            </Link>
          </div>

          <div className="research-feature-mark" aria-hidden="true">
            <img src="/images/aflex-logo.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
