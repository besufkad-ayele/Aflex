import NewsEventsPage from "@/app/news/news-page-client";
import { getPublishedNews } from "@/lib/cms/public-content";
import { getLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalizedNews({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const articles = await getPublishedNews();
  return <NewsEventsPage locale={locale} articles={articles} />;
}
