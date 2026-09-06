import { copy, getLocale, locales } from "@/lib/i18n";
import LocalizedHomeClient from "./page-client";

export function generateStaticParams() { 
  return locales.map((locale) => ({ locale })); 
}

export default async function LocalizedHome({ params }: PageProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const text = copy[locale].home;
  
  return <LocalizedHomeClient locale={locale} text={text} />;
}
