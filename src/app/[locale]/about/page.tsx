import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { copy, getLocale, locales } from "@/lib/i18n";
import { AboutCampusSlideshow } from "@/components/about-campus-slideshow";
import { AboutHeroSection } from "@/components/about-hero-section";
import { AboutLeadershipSection } from "@/components/about-leadership-section";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalizedAbout({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const text = copy[locale].about;

  return (
    <>
      <SiteHeader active="About AFLEX" locale={locale} />
      <main id="main-content" lang={locale}>
        <AboutHeroSection />

        <section className="message-section section">
          <div className="container message-grid">
            <div className="chief-portrait">
              <img src="/images/zadig abereha.webp" alt="H.E. Zadig Abreha, Chief of Academy" />
              <span className="chief-portrait-badge">CHIEF OF ACADEMY</span>
            </div>
            <div className="message-copy">
              <span className="eyebrow" style={{ color: "var(--gold)" }}>{text.message}</span>
              <blockquote>“{text.message}”</blockquote>
              <span className="mono signature" style={{ color: "var(--gold)" }}>
                ZADIG ABREHA<br />
                <b style={{ color: "#fff" }}>CHIEF OF ACADEMY</b>
              </span>
            </div>
          </div>
        </section>

        <section className="story-section black-section">
          <div className="container story-grid">
            <div>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>{text.story}</span>
              <h2>{text.storyTitle}</h2>
            </div>
            <div className="timeline">
              <article>
                <span className="mono">JUNE 2021</span>
                <h3>AFLEX Academy</h3>
                <p>{text.intro}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section vision-section about-light-section">
          <div className="container vision-grid">
            <article className="about-light-card">
              <span className="eyebrow">01 / {text.vision}</span>
              <h2>{text.vision}</h2>
            </article>
            <article className="about-light-card">
              <span className="eyebrow">02 / {text.mission}</span>
              <p className="lead">
                AFLEX develops ethical, visionary leaders capable of meaningful change across public, private, and civic life.
              </p>
            </article>
          </div>
        </section>

        <section className="values-section black-section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow" style={{ color: "var(--gold)" }}>{text.values}</span>
              <h2>{text.values}</h2>
            </div>
            <div className="value-grid">
              {["Civility", "Optimity", "Magnanimity", "Integrity", "Novelty", "Glocality"].map((value, index) => (
                <div className="value-item" key={value}>
                  <span className="value-icon">0{index + 1}</span>
                  <h3>{value}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section pillars-section about-light-section about-pillars-light">
          <div className="container">
            <div className="pillars-intro">
              <span className="eyebrow">{text.pillars}</span>
              <h2>{text.team}</h2>
            </div>
            <div className="pillar-grid">
              {["Innovate", "Integrate", "Impact"].map((value, index) => (
                <article key={value} className="about-pillar-card">
                  <span className="mono pillar-code">0{index + 1}</span>
                  <h3>{value}</h3>
                  <p>{text.team}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Leadership Profile Section */}
        <AboutLeadershipSection locale={locale} />

        {/* Auto-Advancing Sululta Campus Background Video Slideshow */}
        <AboutCampusSlideshow locale={locale} />
      </main>
      <SiteFooter />
    </>
  );
}