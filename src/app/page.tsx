import { copy } from "@/lib/i18n";
import LocalizedHomeClient from "./[locale]/page-client";

export const metadata = {
  title: "AFLEX Academy | African Leadership Excellence Academy",
  description:
    "A premier federal academy for Africa's public, private, and civic leaders, grounded in rigorous learning and reflection at our Sululta campus.",
};

export default function Home() {
  return <LocalizedHomeClient locale="en" text={copy.en.home} />;
}
