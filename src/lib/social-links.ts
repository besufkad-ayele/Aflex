export interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  url: string;
  description: string;
  color: string;
  bgHover: string;
  borderHover: string;
}

/** Official AFLEX channels — single source of truth for footer, QR hub, and share surfaces */
export const socialChannels: SocialChannel[] = [
  {
    id: "telegram",
    name: "Telegram",
    handle: "@afleexac",
    url: "https://t.me/afleexac",
    description: "Instant academy updates, bulletins, and alerts",
    color: "#229ED9",
    bgHover: "rgba(34, 158, 217, 0.15)",
    borderHover: "#229ED9",
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@aflex_academy",
    url: "https://www.tiktok.com/@aflex_academy",
    description: "Short-form campus life and leadership moments",
    color: "#ffffff",
    bgHover: "rgba(255, 255, 255, 0.12)",
    borderHover: "rgba(255, 255, 255, 0.65)",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "@AfricanLeadershipExcellenceAca",
    url: "https://www.youtube.com/@AfricanLeadershipExcellenceAca",
    description: "Lectures, forums, and institutional broadcasts",
    color: "#FF0000",
    bgHover: "rgba(255, 0, 0, 0.15)",
    borderHover: "#FF0000",
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "/aflexacademy.gov.et",
    url: "https://www.facebook.com/aflexacademy.gov.et",
    description: "Public updates from the Academy community",
    color: "#1877F2",
    bgHover: "rgba(24, 119, 242, 0.15)",
    borderHover: "#1877F2",
  },
  {
    id: "x",
    name: "X (Twitter)",
    handle: "@Afleexacademy",
    url: "https://x.com/Afleexacademy",
    description: "News, statements, and live commentary",
    color: "#ffffff",
    bgHover: "rgba(255, 255, 255, 0.12)",
    borderHover: "rgba(255, 255, 255, 0.6)",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "AFLEX Academy",
    url: "https://www.linkedin.com/company/african-leadership-excellence-academy-aflex-%E1%8B%A8%E1%8A%A0%E1%8D%8D%E1%88%AA%E1%8A%AB-%E1%8A%A0%E1%88%98%E1%88%AB%E1%88%AD-%E1%88%8D%E1%88%85%E1%89%80%E1%89%B5-%E1%8A%A0%E1%8A%AB%E1%8B%B3%E1%88%9A/",
    description: "Professional network and institutional updates",
    color: "#0A66C2",
    bgHover: "rgba(10, 102, 194, 0.15)",
    borderHover: "#0A66C2",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@aflexacademy",
    url: "https://www.instagram.com/aflexacademy",
    description: "Visual stories from Sululta and beyond",
    color: "#E1306C",
    bgHover: "rgba(225, 48, 108, 0.15)",
    borderHover: "#E1306C",
  },
];

export const portalLinks = {
  website: {
    id: "portal",
    name: "AFLEX Portal",
    handle: "aflexacademy.gov.et",
    url: "https://aflexacademy.gov.et",
    description: "Official institutional web portal and publications",
    badge: "Main Website",
  },
  programs: {
    id: "programs",
    name: "Executive Programs",
    handle: "/programs",
    url: "https://aflexacademy.gov.et/programs",
    description: "Curricula, intake schedule, and applications",
    badge: "Intake 2026",
  },
};

/** Build a scannable QR image URL that encodes the target link */
export function qrImageUrl(targetUrl: string, size = 200) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=10&ecc=M&data=${encodeURIComponent(targetUrl)}`;
}
