import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { AboutCampusSlideshow } from "@/components/about-campus-slideshow";
import { AboutCeoMessage } from "@/components/about-ceo-message";
import { AboutHeroSection } from "@/components/about-hero-section";
import { AboutHistorySection } from "@/components/about-history-section";
import { AboutLeadershipSection } from "@/components/about-leadership-section";
import { AboutSectionNav } from "@/components/about-section-nav";
import { AboutStorySection } from "@/components/about-story-section";
import { AboutValuesSection } from "@/components/about-values-section";
import { PartnersMarquee } from "@/components/partners-marquee";

const pillars = [
  {
    title: "INNOVATE",
    code: "01 / TRANSFORM",
    icon: "✦",
    text: "Drive transformational agendas at all levels. Create and implement content that is relevant, cutting-edge, and immediately applicable across African governance.",
    focus: "Curriculum · Research · New models",
  },
  {
    title: "INTEGRATE",
    code: "02 / COLLABORATION",
    icon: "◎",
    text: "Build an ecosystem of partnerships and alliances for mutual benefit. Continuously make learning accessible, collaborative, and deeply practical.",
    focus: "Partnerships · Cohorts · Networks",
  },
  {
    title: "IMPACT",
    code: "03 / RESULTS",
    icon: "▲",
    text: "Create lasting impact through learners and stakeholders by influencing policy formulation, institutional culture, and effective ways of working.",
    focus: "Policy · Institutions · Outcomes",
  },
];

const mandateChips = [
  "Leadership Development",
  "Research",
  "Policy Advisory",
];

export const metadata = {
  title: "About AFLEX",
  description:
    "Mandate, History, Vision, Values, Governing Board, and Senior Executive Leadership of the African Leadership Excellence Academy.",
};

export default function About() {
  return (
    <>
      <SiteHeader active="About AFLEX" />
      <main id="main-content">
        <AboutHeroSection />
        <AboutSectionNav />
        <AboutCeoMessage />
        <AboutStorySection />
        <AboutHistorySection />

        <section className="section vision-section about-light-section about-vision-section" id="vision">
          <div className="container">
            <div className="about-vision-intro">
              <span className="eyebrow">VISION & MISSION</span>
              <h2>
                A continental center of excellence for
                <br />
                <em>elite African leadership.</em>
              </h2>
              <div className="about-mandate-chips" aria-label="Primary mandate areas">
                {mandateChips.map((chip) => (
                  <span key={chip} className="about-mandate-chip">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="vision-grid about-vision-grid">
              <article className="about-light-card about-vision-card">
                <span className="eyebrow">01 / VISION</span>
                <h3>
                  To be the African center of excellence in leadership and to raise{" "}
                  <em>elite leaders</em> who realize African prosperity.
                </h3>
              </article>
              <article className="about-light-card about-vision-card">
                <span className="eyebrow">02 / MISSION</span>
                <p className="lead">
                  Provide existing and emerging African leaders with premium innovative learning, research, and collaborative experience that enables them to positively impact the lives of Africans.
                </p>
                <Link href="/programs" className="about-inline-link">
                  <span>Explore leadership programs</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            </div>
          </div>
        </section>

        <AboutValuesSection />

        <section className="section pillars-section about-light-section about-pillars-light" id="pillars">
          <div className="container">
            <div className="pillars-intro">
              <span className="eyebrow">THE THREE PILLARS</span>
              <h2>
                Three engines of
                <br />
                <em>continental impact.</em>
              </h2>
              <p>
                Leadership Development, Research, and Policy Advisory Services structured into three actionable pillars.
              </p>
            </div>
            <div className="pillar-grid about-pillar-grid">
              {pillars.map((pillar, index) => (
                <article key={pillar.title} className="about-pillar-card" style={{ animationDelay: `${index * 80}ms` }}>
                  <span className="about-pillar-icon" aria-hidden="true">{pillar.icon}</span>
                  <span className="mono pillar-code">{pillar.code}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                  <span className="about-pillar-focus">{pillar.focus}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PartnersMarquee />
        <AboutLeadershipSection />
        <AboutCampusSlideshow />
      </main>
      <SiteFooter />
    </>
  );
}
