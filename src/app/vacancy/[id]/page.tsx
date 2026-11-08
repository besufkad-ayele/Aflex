import { notFound } from "next/navigation";
import { getPublishedVacancies, getVacancyById } from "@/lib/cms/public-content";
import { vacancies as staticVacancies } from "@/lib/vacancies-data";
import VacancyDetailClient from "./vacancy-detail-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const live = await getPublishedVacancies();
  const ids = new Set([
    ...live.map((v) => v.id),
    ...staticVacancies.map((v) => v.id),
  ]);
  return Array.from(ids).map((id) => ({ id }));
}

export default async function VacancyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vacancy = await getVacancyById(id);

  if (!vacancy) {
    notFound();
  }

  const all = await getPublishedVacancies();
  const relatedVacancies = all.filter((v) => v.id !== vacancy.id).slice(0, 2);

  return <VacancyDetailClient vacancy={vacancy} relatedVacancies={relatedVacancies} />;
}
