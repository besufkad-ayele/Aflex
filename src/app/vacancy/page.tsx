import { getPublishedVacancies } from "@/lib/cms/public-content";
import VacancyHubPage from "./vacancy-page-client";

export const metadata = {
  title: "Careers & Vacancies",
  description: "Institutional careers, fellowships, and appointments at AFLEX Academy.",
};

export default async function VacancyPage() {
  const vacancies = await getPublishedVacancies();
  return <VacancyHubPage vacancies={vacancies} />;
}
