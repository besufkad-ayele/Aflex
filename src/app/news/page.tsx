import { getPublishedNews } from "@/lib/cms/public-content";
import NewsEventsPage from "./news-page-client";

export const metadata = {
  title: "News & Events",
  description: "Academy news, press releases, and executive events from AFLEX.",
};

export default async function NewsPage() {
  const articles = await getPublishedNews();
  return <NewsEventsPage articles={articles} />;
}
