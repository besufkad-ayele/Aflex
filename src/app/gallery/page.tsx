import { redirect } from "next/navigation";

interface GalleryRedirectProps {
  searchParams?: Promise<{ type?: string; tab?: string }>;
}

export default async function GalleryRedirect({ searchParams }: GalleryRedirectProps) {
  const params = searchParams ? await searchParams : {};
  const tab = params.tab || params.type;
  if (tab === "video" || tab === "videos") {
    redirect("/media?tab=videos");
  }
  if (tab === "tiktok" || tab === "facebook" || tab === "youtube") {
    redirect(`/media?tab=${tab}`);
  }
  redirect("/media");
}
