import Link from "next/link";
import { PageFrame, SectionTitle } from "@/components/page-primitives";
import { ProgramsListView } from "@/components/programs-list-view";
import { ProgramsResearchImpact } from "@/components/programs-research-impact";
import { ResearchThemesSection } from "@/components/research-themes-section";

export const metadata = {
  title: "Programs & Research",
  description: "Leadership development, Project WILD, PSLE, and policy research at AFLEX Academy."
};

export default function Programs() {
  return (
    <PageFrame
      active="Programs"
      crumb="Programs"
      title="Programs & Research"
      intro="Three pathways for leaders, supported by increased access, quality research, and change acceleration."
    >
      <section className="section" style={{ background: "#000000", color: "#ffffff", paddingBottom: "70px" }}>
        <div className="container">
          <SectionTitle
            eyebrow="THE OFFER"
            title={<>Learning for the<br /><em>moment we are in.</em></>}
            copy="AFLEX programs are built around the decisions leaders face now: complex institutions, changing societies, and the responsibility to leave stronger systems behind."
          />
          
          {/* Executive Built-in Programs View */}
          <ProgramsListView />
        </div>
      </section>

      {/* Editorial White Background Content: Pedagogy & Cohort Experience */}
      <section className="programs-pedagogy-white-section">
        <div className="container">
          <div className="programs-white-layout">
            <div className="programs-white-left">
              <span className="eyebrow" style={{ color: "var(--gold)" }}>
                HOW WE TEACH · THE METHOD
              </span>
              <h2>
                Learning designed for<br />
                the <em>weight of public office.</em>
              </h2>
              <p className="programs-white-lead">
                We do not teach leadership through distant textbook theories. Every case, deliberation, and retreat is structured around real statecraft, institutional friction, and collective African resilience.
              </p>
              <div className="programs-white-actions">
                <Link className="button button-outline" href="/contact" style={{ borderColor: "#000000", color: "#000000" }}>
                  <span>Consult with Faculty</span>
                  <span>↗</span>
                </Link>
                <Link className="text-link" href="/catalog" style={{ color: "var(--gold)", fontWeight: 600 }}>
                  <span>View Training Catalog</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="programs-white-right">
              <div className="pedagogy-pillar-item">
                <span className="mono" style={{ color: "var(--gold)", fontSize: "12px", fontWeight: 700 }}>
                  01 / CASE-BASED STATECRAFT
                </span>
                <h3>Real African Institutional Dilemmas</h3>
                <p>Curricula built around actual reform challenges from ministries, state enterprises, and regional economic commissions across Africa.</p>
              </div>

              <div className="pedagogy-pillar-item">
                <span className="mono" style={{ color: "var(--gold)", fontSize: "12px", fontWeight: 700 }}>
                  02 / HIGHLAND CONTEMPLATION
                </span>
                <h3>The Sululta Sanctuary Effect</h3>
                <p>Intensive residential sessions at 2,600m altitude that allow leaders to step back from daily operational crises and examine long-term horizons.</p>
              </div>

              <div className="pedagogy-pillar-item">
                <span className="mono" style={{ color: "var(--gold)", fontSize: "12px", fontWeight: 700 }}>
                  03 / CONFIDENTIAL PEER CIRCLES
                </span>
                <h3>Cross-Sector Leadership Coalitions</h3>
                <p>Bringing public servants, private innovators, and civil society directors into the same room to forge enduring continental networks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Research Impact & Policy Studies Section */}
      <ProgramsResearchImpact />

      <ResearchThemesSection />
    </PageFrame>
  );
}