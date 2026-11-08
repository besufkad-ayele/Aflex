import { getPublishedFaqs } from "@/lib/cms/public-content";
import FaqPageClient from "./faq-page-client";

export const metadata = {
  title: "FAQ & Help Center",
  description: "Frequently asked questions about AFLEX programs, campus, and services.",
};

export default async function FaqPage() {
  const live = await getPublishedFaqs();
  const initialFaqs = live?.map((item) => ({
    id: item.id,
    category: item.category,
    question: item.question,
    answer: item.answer,
  }));

  return <FaqPageClient initialFaqs={initialFaqs || undefined} />;
}
