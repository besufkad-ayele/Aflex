import Image from "next/image";
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

        <section className="message-section section" style={{ background: "#024696", color: "#fff" }}>
          <div className="container message-grid" style={{ alignItems: "start" }}>
            <div className="chief-portrait" style={{ position: "relative" }}>
              <Image
                src="/Mohammedrafie.jpg"
                alt="Mohammedrafie Abaraya, Chief Executive Officer"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
              <span className="chief-portrait-badge">CHIEF EXECUTIVE OFFICER</span>
            </div>
            <div className="message-copy">
              <span className="eyebrow" style={{ color: "var(--gold)" }}>{text.message}</span>
              <blockquote>
                “Leadership is a science as much as it is an art. African Leadership Excellence Academy is where these two meet.”
              </blockquote>
              <p>Welcome to the African Leadership Excellence Academy!</p>
              <p>
                At our academy an inter-generational leadership transaction of wisdom transfer happens. In the past half millennia Africa has lost its leadership structure and philosophy due to the many dark histories it underwent – including slavery, colonization, and internal conflicts.
              </p>
              <p>
                Our academy strives to create a unique space to incubate, empower, and elevate the next generation of African leaders, and regain the lost structure of true African wisdom and leadership. Through training and research the academy envisions to support current leaders in the public, private, and civic sectors.
              </p>
              <p>
                In this season, the academy is focused on training senior national leaders in parallel to completing its internal reform works. Our efforts have been fruitful, and the feedback from stakeholders is very encouraging.
              </p>
              <p>
                In the next season, the academy will open its doors to its continental Pan-African agenda. As part of this endeavor the academy will host the first of its kind event on the side event of the AU 36th Heads of States Summit. With its state-of-the-art facility, the academy will host different workshops, trainings, and other deliberations to push the Pan-African agenda forward.
              </p>
              <p>
                The future is in line with Africa’s renaissance and our academy looks forward to contributing to this great opportunity in the changing global order of which we are all are part of.
              </p>
              <blockquote>“Shaping the future leaders of Africa”</blockquote>
              <span className="mono signature" style={{ color: "var(--gold)" }}>
                MOHAMMEDRAFIE ABARAYA<br />
                <span style={{ display: "block", marginTop: 4, color: "rgba(255,255,255,0.85)", fontFamily: "var(--sans, inherit)", letterSpacing: "0.02em" }}>
                  ሙሐመድራፊዕ አባራያ
                </span>
                <b style={{ color: "#fff" }}>CHIEF EXECUTIVE OFFICER (CEO)</b>
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