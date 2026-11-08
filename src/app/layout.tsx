import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AFLEX Academy | African Leadership Excellence Academy",
    template: "%s | AFLEX Academy",
  },
  description: "African Leadership Excellence Academy: a federal institution for public leadership, research, and Africa's renaissance.",
  icons: {
    icon: [{ url: "/images/aflex-logo.png", type: "image/png" }],
    apple: [{ url: "/images/aflex-logo.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
