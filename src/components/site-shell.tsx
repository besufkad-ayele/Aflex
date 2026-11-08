"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { copy, getLocale, localeNames, locales, type Locale } from "@/lib/i18n";
import { searchIndex } from "@/lib/search-index";
import { newsArticles } from "@/lib/news-data";
import { BrandLogo } from "@/components/brand-logo";
import { OnlineLearningModal } from "@/components/online-learning-modal";
import { FloatingQuickConnect } from "@/components/floating-quick-connect";
import { openVacancyCount } from "@/lib/vacancies-data";
import { socialChannels } from "@/lib/social-links";

const footerSocialIcons: Record<string, ReactNode> = {
  facebook: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  x: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  telegram: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z" />
    </svg>
  ),
  youtube: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  instagram: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  tiktok: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.68a8.2 8.2 0 0 0 4.76 1.52V6.74a4.85 4.85 0 0 1-1-.05z" />
    </svg>
  ),
};

// Nav items: [label, href, dropdown-key | null]
const navItems: [string, string, string | null][] = [
  ["Home",          "/",         null],
  ["About AFLEX",   "/about",    "about"],
  ["Programs",      "/programs", "programs"],
  ["News & Events", "/news",     "news"],
  ["Gallery",       "/gallery",  null],
];

const localeCodes = /^(en|am|om|so|ti|sw|ha|yo)(\/|$)/;

function browserLocale(): Locale {
  const languages =
    typeof navigator === "undefined"
      ? []
      : navigator.languages.length
      ? navigator.languages
      : [navigator.language];
  for (const language of languages) {
    const code = language.toLowerCase().split("-")[0];
    if (locales.includes(code as Locale)) return code as Locale;
  }
  return "en";
}

// ─── Dropdown panel sub-components ──────────────────────────────────────────

function NavColHeader({ children }: { children: React.ReactNode }) {
  return <span className="nav-col-header">{children}</span>;
}

function DropdownAbout({ route }: { route: (p: string) => string }) {
  return (
    <div className="mega-cols mega-cols-4">
      {/* Col 1-2: nav links */}
      <div className="nav-dropdown-col mega-col-span-2">
        <NavColHeader>NAVIGATE THE ACADEMY</NavColHeader>
        <div className="mega-link-grid">
          {(
            [
              ["Our Story",           "/about#story"],
              ["Vision & Mission",    "/about#vision"],
              ["Our Values",          "/about#values"],
              ["The Three Pillars",   "/about#pillars"],
              ["Governance & Board",  "/about#governance"],
              ["Leadership Team",     "/about#leadership"],
              ["Campus & Facilities", "/about#campus"],
            ] as [string, string][]
          ).map(([label, href]) => (
            <Link key={label} href={route(href)} className="nav-dropdown-link">
              <span className="nav-link-arrow" aria-hidden="true">›</span>
              {label}
            </Link>
          ))}
        </div>
      </div>
      {/* Col 3: spacer / divider */}
      <div className="mega-divider" aria-hidden="true" />
      {/* Col 4: info card */}
      <div className="nav-dropdown-col">
        <NavColHeader>THE ACADEMY</NavColHeader>
        <div className="nav-info-card">
          <span className="nav-info-card-eyebrow mono">FOUNDED · 2021</span>
          <p className="nav-info-card-title">Established by the Council of Ministers</p>
          <p className="nav-info-card-copy">
            Sululta, Oromia · Federal Democratic Republic of Ethiopia
          </p>
          <Link href={route("/about")} className="nav-info-card-link">
            View official mandate <span>↗</span>
          </Link>
        </div>
        <div className="nav-info-card" style={{ marginTop: 16 }}>
          <span className="nav-info-card-eyebrow mono">QUICK LINKS</span>
          <Link href={route("/catalog")} className="nav-dropdown-link" style={{ marginTop: 8 }}>
            <span className="nav-link-arrow" aria-hidden="true">›</span>Training Catalog
          </Link>
          <Link href={route("/campus-locator")} className="nav-dropdown-link">
            <span className="nav-link-arrow" aria-hidden="true">›</span>Campus Locator
          </Link>
          <Link href={route("/vacancy")} className="nav-dropdown-link">
            <span className="nav-link-arrow" aria-hidden="true">›</span>Careers &amp; Vacancies
          </Link>
        </div>
      </div>
    </div>
  );
}

function DropdownPrograms({ route }: { route: (p: string) => string }) {
  return (
    <div className="mega-cols mega-cols-4">
      {/* Col 1: training programs */}
      <div className="nav-dropdown-col">
        <NavColHeader>LEADERSHIP TRAINING</NavColHeader>
        {(
          [
            { code: "01", label: "Leadership Development Training", sub: "12 · 24 · 36 WEEKS",  href: "/programs#ldt"  },
            { code: "02", label: "Project WILD",                    sub: "WOMEN IN LEADERSHIP", href: "/programs#wild" },
            { code: "03", label: "PSLE",                            sub: "EXECUTIVE PROGRAM",   href: "/programs#psle" },
          ]
        ).map(({ code, label, sub, href }) => (
          <Link key={label} href={route(href)} className="nav-dropdown-link">
            <span className="nav-link-code">{code}</span>
            <span>
              {label}
              <span className="nav-dropdown-sublabel">{sub}</span>
            </span>
          </Link>
        ))}
        <Link href={route("/catalog")} className="nav-dropdown-textlink">
          View full Training Catalog <span>↗</span>
        </Link>
      </div>
      {/* Col 2: research */}
      <div className="nav-dropdown-col">
        <NavColHeader>RESEARCH AREAS</NavColHeader>
        {(
          [
            ["Pan-Africanism & Continental Integration", "/programs#pan-africanism"],
            ["Public Sector Governance",                 "/programs#governance-research"],
            ["Climate & Sustainable Development",        "/programs#climate"],
            ["Trade, Investment & Economic Policy",      "/programs#trade"],
            ["Women in Public Leadership",               "/programs#women"],
            ["Digital Transformation of Government",     "/programs#digital"],
          ] as [string, string][]
        ).map(([label, href]) => (
          <Link key={label} href={route(href)} className="nav-dropdown-link nav-dropdown-link--sm">
            <span className="nav-link-arrow" aria-hidden="true">›</span>
            {label}
          </Link>
        ))}
        <Link href={route("/programs#research")} className="nav-dropdown-textlink">
          All research themes <span>↗</span>
        </Link>
      </div>
      {/* Col 3: pedagogy / quick facts */}
      <div className="nav-dropdown-col">
        <NavColHeader>HOW WE TEACH</NavColHeader>
        {(
          [
            ["Classroom & Residential",   "/programs#pedagogy"],
            ["eLearning & Digital",       "/online-learning"],
            ["Immersive Simulations",     "/programs#immersive"],
            ["Pan-African Policy Forum",  "/programs#pan-africanism"],
            ["Executive Coaching",        "/programs#coaching"],
          ] as [string, string][]
        ).map(([label, href]) => (
          <Link key={label} href={route(href)} className="nav-dropdown-link nav-dropdown-link--sm">
            <span className="nav-link-arrow" aria-hidden="true">›</span>
            {label}
          </Link>
        ))}
      </div>
      {/* Col 4: CTA card */}
      <div className="nav-dropdown-col">
        <div className="nav-cta-card">
          <span className="nav-col-header" style={{ color: "rgba(255,255,255,.5)", marginBottom: 10 }}>
            NEXT INTAKE
          </span>
          <p className="nav-cta-card-title">Applications open for 2026 cohorts</p>
          <Link href={route("/programs")} className="button button-outline light nav-cta-btn">
            Apply / Enroll <span>↗</span>
          </Link>
          <Link href={route("/contact") + "?subject=admissions"} className="nav-cta-card-sub">
            Questions? Contact admissions →
          </Link>
        </div>
      </div>
    </div>
  );
}

function DropdownNews({ route }: { route: (p: string) => string }) {
  const featured = newsArticles.find((a) => a.featured) ?? newsArticles[0];
  return (
    <div className="mega-cols mega-cols-4">
      {/* Col 1: browse */}
      <div className="nav-dropdown-col">
        <NavColHeader>BROWSE</NavColHeader>
        {(
          [
            ["All News & Events", "/news"],
            ["Academy News",      "/news?category=ACADEMY"],
            ["Campus Updates",    "/news?category=CAMPUS"],
            ["Research Insights", "/news?category=INSIGHT"],
            ["Press Releases",    "/news?category=PRESS"],
            ["Upcoming Events",   "/news?tab=events"],
          ] as [string, string][]
        ).map(([label, href]) => (
          <Link key={label} href={route(href)} className="nav-dropdown-link">
            <span className="nav-link-arrow" aria-hidden="true">›</span>
            {label}
          </Link>
        ))}
      </div>
      {/* Col 2: featured story */}
      <div className="nav-dropdown-col mega-col-span-2">
        <NavColHeader>LATEST STORY</NavColHeader>
        <div className="nav-featured-story nav-featured-story--wide">
          <span className="nav-featured-story-cat mono">{featured.category}</span>
          <p className="nav-featured-story-title nav-featured-story-title--lg">{featured.title}</p>
          <p className="nav-featured-story-excerpt">{featured.excerpt}</p>
          <span className="nav-featured-story-date mono">
            {featured.date} · {featured.readTime}
          </span>
          <Link href={route(`/news/${featured.slug}`)} className="nav-dropdown-textlink" style={{ marginTop: 14 }}>
            Read full article <span>↗</span>
          </Link>
        </div>
      </div>
      {/* Col 4: resources */}
      <div className="nav-dropdown-col">
        <NavColHeader>MEDIA & RESOURCES</NavColHeader>
        {(
          [
            ["Photo Gallery",       "/gallery"],
            ["Video Library",       "/gallery?type=video"],
            ["Press Kit & Logos",   "/gallery#downloads"],
            ["Annual Reports",      "/library?category=reports"],
            ["Research Publications", "/library?category=research"],
          ] as [string, string][]
        ).map(([label, href]) => (
          <Link key={label} href={route(href)} className="nav-dropdown-link nav-dropdown-link--sm">
            <span className="nav-link-arrow" aria-hidden="true">›</span>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function DropdownContact({ route }: { route: (p: string) => string }) {
  return (
    <div className="mega-cols mega-cols-4">
      {/* Col 1: inquiry types */}
      <div className="nav-dropdown-col">
        <NavColHeader>GET IN TOUCH</NavColHeader>
        {(
          [
            ["General Inquiries",            route("/contact")],
            ["Partnerships & MoUs",          route("/contact") + "?subject=partnerships"],
            ["Admissions & Enrolment",       route("/contact") + "?subject=admissions"],
            ["Media & Press",                route("/contact") + "?subject=press"],
            ["Campus Visit Requests",        route("/contact") + "?subject=campus-visit"],
            ["Procurement & Tenders",        route("/procurement")],
            ["Submit a Vacancy Application", route("/vacancy")],
          ] as [string, string][]
        ).map(([label, href]) => (
          <Link key={label} href={href} className="nav-dropdown-link">
            <span className="nav-link-arrow" aria-hidden="true">›</span>
            {label}
          </Link>
        ))}
      </div>
      {/* Col 2: address / hours */}
      <div className="nav-dropdown-col">
        <NavColHeader>FIND US</NavColHeader>
        <div className="nav-info-card">
          <span className="nav-info-card-eyebrow mono">MAIN CAMPUS</span>
          <p className="nav-info-card-copy" style={{ marginBottom: 10 }}>
            P.O. Box 1000<br />
            Sululta, Oromia<br />
            Federal Democratic Republic of Ethiopia
          </p>
          <span className="nav-info-card-eyebrow mono">OFFICE HOURS</span>
          <p className="nav-info-card-copy" style={{ marginBottom: 10 }}>
            Mon – Fri: 08:30 – 17:30<br />
            Sat: 09:00 – 13:00 (admin only)
          </p>
          <Link href={route("/campus-locator")} className="nav-info-card-link">
            View campus map <span>↗</span>
          </Link>
        </div>
      </div>
      {/* Col 3: contact details */}
      <div className="nav-dropdown-col">
        <NavColHeader>CONTACT DETAILS</NavColHeader>
        <div className="nav-contact-detail-list">
          {(
            [
              ["General",    "info@aflex.gov.et"],
              ["Admissions", "admissions@aflex.gov.et"],
              ["Media",      "communications@aflex.gov.et"],
              ["Procurement","procurement@aflex.gov.et"],
            ] as [string, string][]
          ).map(([type, email]) => (
            <div key={type} className="nav-contact-detail-row">
              <span className="nav-contact-detail-type mono">{type}</span>
              <a href={`mailto:${email}`} className="nav-contact-detail-email">{email}</a>
            </div>
          ))}
        </div>
      </div>
      {/* Col 4: quick action CTA */}
      <div className="nav-dropdown-col">
        <NavColHeader>QUICK ACTIONS</NavColHeader>
        <div className="nav-cta-card">
          <p className="nav-cta-card-title">Ready to get in touch?</p>
          <Link href={route("/contact")} className="button button-outline light nav-cta-btn">
            Open inquiry form <span>↗</span>
          </Link>
          <Link href={route("/contact") + "?subject=admissions"} className="nav-cta-card-sub">
            Apply to a program →
          </Link>
          <Link href={route("/procurement")} className="nav-cta-card-sub" style={{ marginTop: 6 }}>
            View open tenders →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main SiteHeader ─────────────────────────────────────────────────────────

export function SiteHeader({ active = "Home", locale = "en" }: { active?: string; locale?: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lmsOpen, setLmsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Desktop hover-dropdown
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // Mobile accordion
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  // Utility bar mini-dropdowns
  const [openUtility, setOpenUtility] = useState<string | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const utilityCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getLocale(locale);
  const hasLocalePath = localeCodes.test(pathname.replace(/^\//, ""));
  const localized = hasLocalePath;
  const localPath = pathname.replace(/^\/(en|am|om|so|ti|sw|ha|yo)/, "") || "/";
  const route = (path: string) => (localized ? `/${currentLocale}${path}` : path);
  const localePath = (nextLocale: Locale) => `/${nextLocale}${localPath}`;
  const labels = copy[currentLocale].nav;
  const utility = copy[currentLocale].utility;

  // Close all dropdowns on route change
  useEffect(() => {
    setOpenMenu(null);
    setOpenMobileSubmenu(null);
    setOpenUtility(null);
  }, [pathname]);

  useEffect(() => { setMounted(true); }, []);

  // Apply saved/browser locale once on first English (non-prefixed) visit.
  // Do not re-run on every pathname change — that caused thrashing between routes.
  useEffect(() => {
    if (!mounted || hasLocalePath) return;
    const saved = document.cookie.match(/(?:^|; )aflex-locale=([^;]+)/)?.[1];
    const preferred = getLocale(saved || browserLocale());
    if (preferred === "en") return;
    const target = `/${preferred}${localPath === "/" ? "" : localPath}` || `/${preferred}`;
    if (pathname === target) return;
    router.replace(target);
    // intentionally omit pathname from deps — one-shot locale bootstrap
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, hasLocalePath, router]);

  // Escape key closes everything
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setOpenUtility(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const update = () => setScrolled(globalThis.scrollY > 24);
    update();
    globalThis.addEventListener("scroll", update, { passive: true });
    return () => globalThis.removeEventListener("scroll", update);
  }, [mounted]);

  const chooseLocale = async (
    event: React.MouseEvent<HTMLAnchorElement>,
    nextLocale: Locale,
    href: string
  ) => {
    event.preventDefault();
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
    });
    router.push(href);
  };

  const searchResults = searchQuery.trim()
    ? searchIndex.filter((item) =>
        `${item.title} ${item.description} ${item.keywords}`
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      )
    : [];

  // Hover helpers — 160ms close delay so cursor can move into the panel
  const openDropdown = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  // Utility bar hover helpers
  const openUtilityDrop = (key: string) => {
    if (utilityCloseTimer.current) clearTimeout(utilityCloseTimer.current);
    setOpenUtility(key);
  };
  const scheduleUtilityClose = () => {
    utilityCloseTimer.current = setTimeout(() => setOpenUtility(null), 160);
  };

  const toggleMobileSubmenu = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMobileSubmenu(openMobileSubmenu === key ? null : key);
  };

  const dropdownMap: Record<string, ReactNode> = {
    about:    <DropdownAbout    route={route} />,
    programs: <DropdownPrograms route={route} />,
    news:     <DropdownNews     route={route} />,
    contact:  <DropdownContact  route={route} />,
  };

  const mobileSubItems: Record<string, [string, string][]> = {
    about: [
      ["Our Story",           route("/about#story")],
      ["Vision & Mission",    route("/about#vision")],
      ["Our Values",          route("/about#values")],
      ["The Three Pillars",   route("/about#pillars")],
      ["Governance & Board",  route("/about#governance")],
      ["Leadership Team",     route("/about#leadership")],
      ["Campus & Facilities", route("/about#campus")],
    ],
    programs: [
      ["Leadership Development Training", route("/programs#ldt")],
      ["Project WILD",                    route("/programs#wild")],
      ["PSLE",                            route("/programs#psle")],
      ["Training Catalog",                route("/catalog")],
      ["Research & Policy",               route("/programs#research")],
    ],
    news: [
      ["All News & Events",  route("/news")],
      ["Academy News",       route("/news?category=ACADEMY")],
      ["Campus Updates",     route("/news?category=CAMPUS")],
      ["Research Insights",  route("/news?category=INSIGHT")],
      ["Upcoming Events",    route("/news?tab=events")],
    ],
    contact: [
      ["General Inquiries",      route("/contact")],
      ["Partnerships & MoUs",    route("/contact") + "?subject=partnerships"],
      ["Admissions & Enrolment", route("/contact") + "?subject=admissions"],
      ["Media & Press",          route("/contact") + "?subject=press"],
      ["Procurement & Tenders",  route("/procurement")],
      ["Careers & Vacancies",    route("/vacancy")],
    ],
  };

  // Renders a nav item trigger + mobile accordion (mega panel lives in header-level bar)
  const renderDropItem = (
    label: string,
    href: string,
    dropKey: string,
    labelText: string,
    index: number
  ) => {
    const isActive = active === label;
    const isOpen = openMenu === dropKey;
    return (
      <span
        key={label}
        className={`nav-item-with-drop${isActive ? " active" : ""}${isOpen ? " drop-open" : ""}`}
        onMouseEnter={() => openDropdown(dropKey)}
        onMouseLeave={scheduleClose}
      >
        {/* Desktop trigger */}
        <Link
          href={localized || index < 2 ? route(href) : href}
          className={`nav-drop-trigger${isActive ? " active" : ""}`}
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setMenuOpen(false)}
        >
          {labelText}
          <span className="nav-caret" aria-hidden="true">▾</span>
        </Link>

        {/* Mobile row: link + caret toggle */}
        <span className="mobile-drop-row">
          <Link
            href={localized || index < 2 ? route(href) : href}
            className="mobile-drop-label"
            onClick={() => setMenuOpen(false)}
          >
            {labelText}
          </Link>
          <button
            type="button"
            className={`mobile-caret${openMobileSubmenu === dropKey ? " open" : ""}`}
            aria-label={`Toggle ${label} sub-menu`}
            aria-expanded={openMobileSubmenu === dropKey}
            onClick={(e) => toggleMobileSubmenu(e, dropKey)}
          >
            ▾
          </button>
        </span>

        {/* Mobile accordion */}
        {openMobileSubmenu === dropKey && (
          <div className="mobile-submenu">
            {mobileSubItems[dropKey]?.map(([subLabel, subHref]) => (
              <Link
                key={subHref}
                href={subHref}
                className="mobile-submenu-link"
                onClick={() => { setMenuOpen(false); setOpenMobileSubmenu(null); }}
              >
                {subLabel}
              </Link>
            ))}
          </div>
        )}
      </span>
    );
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      {/* ── Utility bar ──────────────────────────────────────────── */}
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA</span>
          <div className="utility-links">
            {utility.map((item, index) => {
              const getHref = () => {
                switch (index) {
                  case 0: return route("/online-learning");
                  case 1: return route("/library");
                  case 2: return route("/faq");
                  case 3: return route("/campus-locator");
                  case 4: return localized ? route("/vacancy") : "/vacancy";
                  default: return `#utility-${index}`;
                }
              };

              const isVacancies = index === 4;
              const utilityDropKey = index === 2 ? "faq" : index === 3 ? "campus" : null;

              if (utilityDropKey) {
                return (
                  <span
                    key={item}
                    className="utility-drop-trigger"
                    onMouseEnter={() => openUtilityDrop(utilityDropKey)}
                    onMouseLeave={scheduleUtilityClose}
                  >
                    <a href={getHref()}>
                      {item}
                      <span className="utility-caret" aria-hidden="true"> ▾</span>
                    </a>
                    <div
                      className={`utility-mini-drop${openUtility === utilityDropKey ? " is-open" : ""}`}
                      onMouseEnter={() => openUtilityDrop(utilityDropKey)}
                      onMouseLeave={scheduleUtilityClose}
                      role="region"
                      aria-label={`${item} quick links`}
                    >
                      {utilityDropKey === "faq" && (
                        [
                          ["Admissions FAQs",          route("/faq#admissions")],
                          ["Programs FAQs",            route("/faq#programs")],
                          ["Campus & Facilities FAQs", route("/faq#campus")],
                        ] as [string, string][]
                      ).map(([l, h]) => (
                        <Link key={h} href={h} className="utility-mini-link">{l}</Link>
                      ))}
                      {utilityDropKey === "campus" && (
                        [
                          ["Interactive Site Plan",  route("/campus-locator#plan")],
                          ["Building Directory",     route("/campus-locator#directory")],
                          ["Download Campus Map",    route("/campus-locator#downloads")],
                        ] as [string, string][]
                      ).map(([l, h]) => (
                        <Link key={h} href={h} className="utility-mini-link">{l}</Link>
                      ))}
                    </div>
                  </span>
                );
              }

              return (
                <a
                  href={getHref()}
                  key={item}
                  className={isVacancies ? "utility-link-vacancies" : undefined}
                  title={isVacancies ? `${openVacancyCount} open roles` : undefined}
                  onClick={(e) => {
                    if (index === 0 && e.button === 0 && !e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      setLmsOpen(true);
                    }
                  }}
                >
                  {index === 0 ? `🎓 ${item}` : item}
                  {isVacancies && openVacancyCount > 0 ? (
                    <span className="utility-job-badge" aria-label={`${openVacancyCount} new jobs posted`}>
                      {openVacancyCount}
                      <span className="utility-job-badge-label">new</span>
                    </span>
                  ) : null}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main header ──────────────────────────────────────────── */}
      <header className={scrolled ? "site-header scrolled" : "site-header"}>
        <div className="container nav-inner">
          <Link href={route("/")} className="wordmark brand-wordmark" aria-label="AFLEX Academy home">
            <Image
              src="/images/aflex-icon.jpg"
              alt=""
              width={32}
              height={32}
              className="brand-nav-icon"
              aria-hidden="true"
            />
            <span>
              <strong>AFLEX</strong>
              <small>ACADEMY</small>
            </span>
          </Link>

          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
            {navItems.map(([label, href, dropKey], index) => {
              if (!dropKey) {
                return (
                  <Link
                    key={label}
                    className={active === label ? "active" : ""}
                    href={localized || index < 2 ? route(href) : href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {labels[index]}
                  </Link>
                );
              }
              return renderDropItem(label, href, dropKey, labels[index], index);
            })}

            {/* Contact with dropdown */}
            {renderDropItem("Contact", "/contact", "contact", labels[5], 5)}

            <div className="mobile-language">
              {locales.map((code) => (
                <Link
                  key={code}
                  href={localePath(code)}
                  onClick={(event) => chooseLocale(event, code, localePath(code))}
                  className={currentLocale === code ? "language active" : "language"}
                  lang={code}
                >
                  {code === "am" ? "አማ" : code.toUpperCase()}
                </Link>
              ))}
            </div>
          </nav>

          <div className="nav-actions">
            <details className="language-picker desktop-language">
              <summary className="language active">
                {currentLocale === "am" ? "አማ" : currentLocale.toUpperCase()}
              </summary>
              <div>
                {locales.map((code) => (
                  <Link
                    key={code}
                    href={localePath(code)}
                    onClick={(event) => chooseLocale(event, code, localePath(code))}
                    lang={code}
                  >
                    {localeNames[code]}
                  </Link>
                ))}
              </div>
            </details>
            <button className="icon-button" type="button" aria-label="Search" onClick={() => setSearchOpen(true)}>
              ⌕
            </button>
            <Link
              className="button button-primary nav-apply"
              href={localized ? route("/programs") : "/programs"}
            >
              Apply / Enroll <span>↗</span>
            </Link>
            <button
              className="menu-button"
              type="button"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span /><b>Menu</b>
            </button>
          </div>
        </div>

        {/* ── Full-width mega-menu bar — lives inside <header> so it spans 100% ── */}
        {(["about", "programs", "news", "contact"] as const).map((key) => (
          <div
            key={key}
            className={`mega-menu-bar${openMenu === key ? " is-open" : ""}`}
            role="region"
            aria-label={`${key} submenu`}
            onMouseEnter={() => openDropdown(key)}
            onMouseLeave={scheduleClose}
          >
            <div className="container mega-menu-inner">
              {dropdownMap[key]}
            </div>
          </div>
        ))}
      </header>

      {/* ── Search overlay ────────────────────────────────────────── */}
      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search AFLEX">
          <button
            className="search-close"
            type="button"
            aria-label="Close search"
            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
          >
            ×
          </button>
          <div className="search-box">
            <span className="eyebrow">SEARCH THE ACADEMY</span>
            <input
              autoFocus
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="What are you looking for?"
              aria-controls="search-results"
            />
            <p>
              {searchQuery
                ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"}`
                : "Search programs, news, pages, and downloads."}
            </p>
            {searchQuery && (
              <div className="search-results" id="search-results" aria-live="polite">
                {searchResults.length ? (
                  searchResults.map((result) => (
                    <Link
                      className="search-result"
                      href={localized ? `/${currentLocale}${result.href}` : result.href}
                      key={result.href}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    >
                      <span className="mono">{result.type}</span>
                      <strong>{result.title}</strong>
                      <small>{result.description}</small>
                      <span className="search-arrow">↗</span>
                    </Link>
                  ))
                ) : (
                  <p className="search-empty">
                    No matching AFLEX pages. Try &quot;leadership&quot;, &quot;campus&quot;, or &quot;vacancy&quot;.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Online Learning & Student LMS Modal */}
      <OnlineLearningModal isOpen={lmsOpen} onClose={() => setLmsOpen(false)} />
    </>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer" id="contact">
        <div className="container footer-grid">
          <div className="footer-intro">
            <div className="wordmark brand-wordmark">
              <BrandLogo variant="full" />
            </div>
            <p>A premier institution for leadership excellence, research, and Africa&apos;s renaissance.</p>
            <p className="mono">
              SULULTA, OROMIA
              <br />
              FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA
            </p>
          </div>
          <div>
            <span className="footer-label">EXPLORE</span>
            <Link href="/">Home</Link>
            <Link href="/about">About AFLEX</Link>
            <Link href="/programs">Programs</Link>
            <Link href="/news">News &amp; Events</Link>
            <Link href="/gallery">Gallery</Link>
          </div>
          <div>
            <span className="footer-label">SERVICES &amp; PORTALS</span>
            <Link href="/online-learning">Online Learning (LMS)</Link>
            <Link href="/library">Library &amp; Repository</Link>
            <Link href="/vacancy">Careers &amp; Vacancies</Link>
            <Link href="/catalog">Training Catalog</Link>
            <Link href="/scholarship">Scholarships &amp; Grants</Link>
            <Link href="/procurement">Procurement</Link>
            <Link href="/campus-locator">Campus Locator</Link>
            <Link href="/faq">FAQ &amp; Help Center</Link>
          </div>
          <div className="footer-contact">
            <span className="footer-label">STAY INFORMED</span>
            <h3>Ideas for a stronger Africa.</h3>
            <div className="subscribe">
              <input aria-label="Email address" placeholder="Your email address" type="email" />
              <button type="button" aria-label="Subscribe">↗</button>
            </div>
            <div className="socials-wrapper">
              <span className="socials-title">CONNECT WITH AFLEX</span>
              <div className="socials">
                {socialChannels.map((channel) => (
                  <a
                    key={channel.id}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon-btn ${channel.id === "x" ? "x-twitter" : channel.id}`}
                    aria-label={`AFLEX on ${channel.name}`}
                    title={`${channel.name} · ${channel.handle}`}
                  >
                    {footerSocialIcons[channel.id]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-wordmark-banner" aria-hidden="true">
          <span className="footer-wordmark-text">AFLEX</span>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 AFLEX Academy · All Rights Reserved</span>
          <span>
            <a href="#privacy">Privacy Policy</a>
            <a href="#accessibility">Accessibility Statement</a>
          </span>
          <span className="mono">AFLEX / 01</span>
        </div>
      </footer>

      {/* Persistent Floating Connect & QR Gateway on All Pages */}
      <FloatingQuickConnect />
    </>
  );
}

export function Weave({ dark = false }: { dark?: boolean }) {
  return <div className={dark ? "weave weave-dark" : "weave"} aria-hidden="true"><span /></div>;
}
