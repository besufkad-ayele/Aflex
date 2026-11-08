import { Suspense } from "react";
import LibraryPageClient from "./library-page-client";

export const metadata = {
  title: "Library & Repository",
  description: "AFLEX digital repository, policy briefs, and Pan-African research archives.",
};

export default function LibraryPage() {
  return (
    <Suspense fallback={null}>
      <LibraryPageClient />
    </Suspense>
  );
}
