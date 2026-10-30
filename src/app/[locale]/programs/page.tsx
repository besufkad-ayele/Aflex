import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { SectionTitle } from "@/components/page-primitives";
import { ProgramsHeroSection } from "@/components/programs-hero-section";
import { ProgramsListView } from "@/components/programs-list-view";
import { ProgramsResearchImpact } from "@/components/programs-research-impact";
import { PanAfricanismResearch } from "@/components/pan-africanism-research";
import { ResearchThemesSection } from "@/components/research-themes-section";
import { copy, getLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocalizedProgramsProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalizedPrograms({ params }: LocalizedProgramsProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const text = copy[locale].programs;

  return (
    <>
      <SiteHeader active="Programs" locale={locale} />
      <main id="main-content" lang={locale}>
        <ProgramsHeroSection />

        <section
          className="section"
          id="offer"
          style={{ background: "#000000", color: "#ffffff", paddingBottom: "70px" }}
        >
          <div className="container">
            <SectionTitle
              eyebrow={text.offerEyebrow}
              title={<>{text.offerTitle}</>}
              copy={text.offerCopy}
            />

            <ProgramsListView locale={locale} />
          </div>
        </section>

        <section className="programs-pedagogy-white-section">
          <div className="container">
            <div className="programs-white-layout">
              <div className="programs-white-left">
                <span className="eyebrow" style={{ color: "var(--gold)" }}>
                  {text.pedagogyEyebrow}
                </span>
                <h2>
                  {text.pedagogyTitle}
                </h2>
                <p className="programs-white-lead">
                  {text.pedagogyLead}
                </p>
                <div className="programs-white-actions">
                  <Link
                    className="button button-outline"
                    href={locale === "en" ? "/contact" : `/${locale}/contact`}
                    style={{ borderColor: "#000000", color: "#000000" }}
                  >
                    <span>{text.consult}</span>
                    <span>↗</span>
                  </Link>
                  <Link
                    className="text-link"
                    href={locale === "en" ? "/catalog" : `/${locale}/catalog`}
                    style={{ color: "var(--gold)", fontWeight: 600 }}
                  >
                    <span>{text.catalog}</span>
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
                  <h3>Knowledge Generation</h3>
                  <p>
                    Producing policy-relevant analysis and indigenous case studies
                    grounded in continental experience.
                  </p>
                </div>

                <div className="pedagogy-pillar-item">
                  <span
                    className="mono"
                    style={{ color: "var(--gold)", fontSize: "12px", fontWeight: 700 }}
                  >
                    03 / CONSULTING
                  </span>
                  <h3>Institutional Transformation</h3>
                  <p>
                    Partnering with ministries and continental organs on reform
                    implementation, culture change, and strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProgramsResearchImpact />
        <PanAfricanismResearch />
        <ResearchThemesSection />
      </main>
      <SiteFooter />
    </>
  );
}

