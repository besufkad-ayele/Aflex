import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { SectionTitle } from "@/components/page-primitives";
import { ProgramsHeroSection } from "@/components/programs-hero-section";
import { ProgramsListView } from "@/components/programs-list-view";
import { ProgramsResearchImpact } from "@/components/programs-research-impact";
import { PanAfricanismResearch } from "@/components/pan-africanism-research";
import { ResearchThemesSection } from "@/components/research-themes-section";
import { getPublishedPrograms } from "@/lib/cms/public-content";

export const metadata = {
  title: "Programs & Research",
  description:
    "Leadership development, Project WILD, PSLE, and Pan-Africanism policy research at AFLEX Academy.",
};

export default async function Programs() {
  const programs = await getPublishedPrograms();

  return (
    <>
      <SiteHeader active="Programs" />
      <main id="main-content">
        <ProgramsHeroSection />

        <section
          className="section"
          id="offer"
          style={{ background: "#000000", color: "#ffffff", paddingBottom: "70px" }}
        >
          <div className="container">
            <SectionTitle
              eyebrow="THE OFFER"
              title={
                <>
                  Learning for the
                  <br />
                  <em>moment we are in.</em>
                </>
              }
              copy="AFLEX is committed to changing the organizational and leadership culture of our continent. Through engaging curricula—classroom, eLearning, and immersive technology—leaders expand strategic thinking and business acumen. Three pillars support the work: access to learning, quality research for policy, and consulting that accelerates institutional change."
            />

            <ProgramsListView programs={programs} />
          </div>
        </section>

        <section className="programs-pedagogy-white-section">
          <div className="container">
            <div className="programs-white-layout">
              <div className="programs-white-left">
                <span className="eyebrow" style={{ color: "var(--gold)" }}>
                  HOW WE TEACH · THE METHOD
                </span>
                <h2>
                  Training built for
                  <br />
                  <em>self-authorship.</em>
                </h2>
                <p className="programs-white-lead">
                  Programs emphasize longitudinal learning and capacity for
                  reflection—delivered through in-person, e-learning, and digital
                  modalities grounded in adult learning methodology. Interventions
                  address leadership needs at every level, so learners leave with
                  tools for the next phase of growth in their industries.
                </p>
                <div className="programs-white-actions">
                  <Link
                    className="button button-outline"
                    href="/contact"
                    style={{ borderColor: "#000000", color: "#000000" }}
                  >
                    <span>Consult with Faculty</span>
                    <span>↗</span>
                  </Link>
                  <Link
                    className="text-link"
                    href="/catalog"
                    style={{ color: "var(--gold)", fontWeight: 600 }}
                  >
                    <span>View Training Catalog</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              <div className="programs-white-right">
                <div className="pedagogy-pillar-item">
                  <span
                    className="mono"
                    style={{ color: "var(--gold)", fontSize: "12px", fontWeight: 700 }}
                  >
                    01 / ACCESS
                  </span>
                  <h3>Increased Learning Opportunity</h3>
                  <p>
                    Expanding who can reach high-quality leadership development
                    through on-demand, hybrid, and residential pathways.
                  </p>
                </div>

                <div className="pedagogy-pillar-item">
                  <span
                    className="mono"
                    style={{ color: "var(--gold)", fontSize: "12px", fontWeight: 700 }}
                  >
                    02 / RESEARCH
                  </span>
                  <h3>Evidence for Decision &amp; Policy</h3>
                  <p>
                    Studies and publications shared with stakeholders to advance
                    research, advise governments, and sharpen public agendas.
                  </p>
                </div>

                <div className="pedagogy-pillar-item">
                  <span
                    className="mono"
                    style={{ color: "var(--gold)", fontSize: "12px", fontWeight: 700 }}
                  >
                    03 / CONSULTING
                  </span>
                  <h3>Accelerating Organizational Change</h3>
                  <p>
                    Advisory services that help institutions translate learning
                    into culture, systems, and lasting leadership practice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PanAfricanismResearch />

        <ProgramsResearchImpact />

        <ResearchThemesSection />
      </main>
      <SiteFooter />
    </>
  );
}
