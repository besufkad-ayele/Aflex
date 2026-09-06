"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface ResearchPolicySectionProps {
  locale?: Locale;
}

export function ResearchPolicySection({ locale }: ResearchPolicySectionProps) {
  const programsUrl = locale ? `/${locale}/programs#research-impact` : "/programs#research-impact";

  return (
    <section className="research-section" id="research">
      <div className="container research-grid">
        <div className="research-label">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>RESEARCH & POLICY PRACTICE</span>
          <span className="vertical-rule" style={{ background: "rgba(212, 175, 55, 0.35)" }} />
        </div>

        <div>
          <span className="mono" style={{ color: "var(--gold)", fontSize: "11px", letterSpacing: "0.1em" }}>
            FEATURED PRACTICE / 2026
          </span>
          <h2 style={{ color: "#ffffff", margin: "14px 0 16px", fontSize: "clamp(2rem, 3.8vw, 3.2rem)", lineHeight: 1.15 }}>
            Ideas that shape<br />
            <em>African statecraft.</em>
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.88)", fontSize: "16px", lineHeight: 1.75, maxWidth: "620px", marginBottom: "22px" }}>
            Our research practice asks how African institutions can draw from history, culture, and lived experience to build futures that are both locally grounded and globally engaged.
          </p>
          <div className="research-simple-tags-row">
            <span className="research-simple-tag">✦ Indigenous Governance Philosophy</span>
            <span className="research-simple-tag">✦ AfCFTA Trade & Aviation Logistics</span>
            <span className="research-simple-tag">✦ Climate Geopolitics & Clean Energy</span>
          </div>
          <Link className="text-link" href={programsUrl} style={{ color: "var(--gold)", fontWeight: 600, fontSize: "15px", display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
            <span>Explore research & impact</span>
            <span>↗</span>
          </Link>
        </div>

        <div className="research-mark" style={{ color: "rgba(212, 175, 55, 0.35)" }}>
          AF<span>LEX</span>
        </div>
      </div>
    </section>
  );
}
