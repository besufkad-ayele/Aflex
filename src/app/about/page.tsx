import Link from "next/link";
import { SiteFooter, SiteHeader, Weave } from "@/components/site-shell";
import { AboutCampusSlideshow } from "@/components/about-campus-slideshow";
import { AboutLeadershipSection } from "@/components/about-leadership-section";
import { AboutStorySection } from "@/components/about-story-section";

const values = [
  { name: "Civility", letter: "C", description: "Mutual respect, deep listening, and dignity in all public deliberation." },
  { name: "Optimity", letter: "O", description: "Relentless pursuit of optimal solutions and highest institutional standards." },
  { name: "Magnanimity", letter: "M", description: "Nobility of spirit, generous statesmanship, and serving the greater good." },
  { name: "Integrity", letter: "I", description: "Uncompromising ethical fortitude, honesty, and accountability." },
  { name: "Novelty", letter: "N", description: "Original thinking, innovative statecraft, and transformative curiosity." },
  { name: "Glocality", letter: "G", description: "Grounded in African heritage while mastering global best practices." }
];

const pillars = [
  {
    title: "INNOVATE",
    code: "01 / TRANSFORMATION",
    text: "Drive transformational agendas at all levels. Create and implement content that is relevant, cutting-edge, and immediately applicable across African governance."
  },
  {
    title: "INTEGRATE",
    code: "02 / COLLABORATION",
    text: "Build an ecosystem of partnerships and alliances for mutual benefit. Continuously make learning accessible, collaborative, and deeply practical."
  },
  {
    title: "IMPACT",
    code: "03 / RESULTS",
    text: "Create lasting impact through learners and stakeholders by influencing policy formulation, institutional culture, and effective ways of working."
  }
];

export const metadata = {
  title: "About AFLEX",
  description: "Mandate, History, Vision, Values, Governing Board, and Senior Executive Leadership of the African Leadership Excellence Academy."
};

export default function About() {
  return (
    <>
      <SiteHeader active="About AFLEX" />
      <main id="main-content">
        {/* Page Header */}
        <section className="page-header blue-section">
          <div className="container">
            <span className="mono breadcrumb">HOME <b>/</b> ABOUT AFLEX</span>
            <h1>About<br /><em>AFLEX.</em></h1>
            <p>A premier institution for public leadership, policy research, and Africa&apos;s renaissance.</p>
          </div>
          <Weave dark />
        </section>
        
        {/* Note from the Chief of Academy & Executive Message */}
        <section className="message-section section" style={{ background: "#080808", color: "#fff" }}>
          <div className="container message-grid">
            <div className="chief-portrait">
              <img src="/images/zadig abereha.webp" alt="H.E. Zadig Abreha, Chief of Academy" />
              <span className="chief-portrait-badge">CHIEF OF THE ACADEMY</span>
            </div>
            <div className="message-copy">
              <span className="eyebrow" style={{ color: "var(--gold)" }}>A NOTE FROM THE CHIEF OF ACADEMY</span>
              <blockquote>“The work of leadership is the work of widening what is possible for the people we serve.”</blockquote>
              <p>
                AFLEX exists to create the conditions for that work: rigorous learning, honest exchange, and the quiet highland space to consider what responsible leadership demands next.
              </p>
              <span className="mono signature" style={{ color: "var(--gold)" }}>
                ZADIG ABREHA<br />
                <b style={{ color: "#fff" }}>CHIEF OF THE ACADEMY · AFLEX</b>
              </span>
            </div>
          </div>
        </section>

        {/* Detailed About Us Section with Workers Image on the Right & Interactive See More Toggle */}
        <AboutStorySection />

        {/* Vision & Mission Section */}
        <section className="section vision-section" style={{ background: "#050505", color: "#fff", borderTop: "1px solid rgba(158,140,57,0.25)" }}>
          <div className="container vision-grid">
            <article style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "24px" }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>01 / VISION</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", margin: "12px 0 16px" }}>
                To be the African center of excellence in leadership and to raise <em>elite leaders</em> who realize African prosperity.
              </h2>
            </article>
            <article style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "24px" }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>02 / MISSION</span>
              <p className="lead" style={{ color: "#fff", fontSize: "20px", lineHeight: "1.6", margin: "12px 0" }}>
                Provide existing and emerging African leaders with premium innovative learning, research, and collaborative experience that enables them to positively impact the lives of Africans.
              </p>
            </article>
          </div>
        </section>

        {/* Values Section (C-O-M-I-N-G) */}
        <section className="values-section black-section" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow" style={{ color: "var(--gold)" }}>OUR GUIDING VALUES</span>
              <h2>The COMING Framework for<br /><em>ethical statecraft.</em></h2>
              <p style={{ color: "rgba(255,255,255,0.75)" }}>Six foundational values that guide our faculties, curriculum, and every cohort at AFLEX.</p>
            </div>
            <div className="value-grid">
              {values.map((item) => (
                <div className="value-item" key={item.name}>
                  <span className="value-icon">{item.letter}</span>
                  <h3>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "var(--muted-dark)", margin: "8px 0 0", lineHeight: "1.5" }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Pillars Section */}
        <section className="section pillars-section" style={{ background: "#070709", color: "#fff", borderTop: "1px solid rgba(158,140,57,0.2)" }}>
          <div className="container">
            <div className="pillars-intro">
              <span className="eyebrow" style={{ color: "var(--gold)" }}>THE THREE PILLARS</span>
              <h2>Three engines of<br /><em>continental impact.</em></h2>
              <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "12px" }}>
                Leadership Development, Research, and Policy Advisory Services structured into three actionable pillars.
              </p>
            </div>
            <div className="pillar-grid">
              {pillars.map((pillar) => (
                <article key={pillar.title} style={{ borderTop: "1px solid rgba(158,140,57,0.35)", padding: "28px 0" }}>
                  <span className="mono" style={{ color: "var(--gold)", fontSize: "11px" }}>{pillar.code}</span>
                  <h3 style={{ color: "#fff", margin: "16px 0 10px", fontSize: "24px" }}>{pillar.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", lineHeight: "1.65" }}>{pillar.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        
        {/* Interactive Horizontal Accordion: Board Members & Senior Executives */}
        <AboutLeadershipSection />

        {/* Auto-Advancing Sululta Campus Background Video Slideshow */}
        <AboutCampusSlideshow />
      </main>
      <SiteFooter />
    </>
  );
}