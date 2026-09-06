import Link from "next/link";
import { EmptyState, PageFrame } from "@/components/page-primitives";
import { copy, getLocale, locales } from "@/lib/i18n";

const pageNames: Record<string, string> = { programs: "Programs", news: "News & Events", gallery: "Gallery & Resources", catalog: "Training Catalog", vacancy: "Careers at AFLEX", contact: "Contact Us", procurement: "Procurement", scholarship: "Scholarships & Fellowships", "campus-locator": "Campus Locator", "online-learning": "Online Learning & LMS", library: "Library & Repository", faq: "Frequently Asked Questions" };
export function generateStaticParams() { return locales.flatMap((locale) => Object.keys(pageNames).map((slug) => ({ locale, slug: [slug] }))); }
export default async function LocalizedPage({ params }: PageProps<"/[locale]/[...slug]">) {
  const { locale: rawLocale, slug } = await params; const locale = getLocale(rawLocale); const page = pageNames[slug[0]] ?? "AFLEX"; const labels = copy[locale].nav;
  return <PageFrame active={page} locale={locale} crumb={page} title={page} intro={`${labels[1]} · ${copy[locale].about.intro}`}><section className="section"><div className="container narrow-content"><span className="eyebrow">{copy[locale].home.close}</span><h2>{copy[locale].home.programsTitle}</h2><p className="lead">{copy[locale].home.programsCopy}</p><EmptyState title="Full translation in preparation" copy="This page is available in your language route. AFLEX editorial review is required before the complete localized content is published." href={`/${locale}`} label="Return to the localized home" /><Link className="text-link" href={`/${locale}/about`}>{labels[1]} <span>↗</span></Link></div></section></PageFrame>;
}