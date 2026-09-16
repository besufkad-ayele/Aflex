"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { copy, getLocale, localeNames, locales, type Locale } from "@/lib/i18n";
import { searchIndex } from "@/lib/search-index";
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

const navItems = [["Home", "/"], ["About AFLEX", "/about"], ["Programs", "/programs"], ["News & Events", "/news"], ["Gallery", "/gallery"]];
const localeCodes = /^(en|am|om|so|ti|sw|ha|yo)(\/|$)/;

function browserLocale(): Locale {
  const languages = typeof navigator === "undefined" ? [] : navigator.languages.length ? navigator.languages : [navigator.language];
  for (const language of languages) {
    const code = language.toLowerCase().split("-")[0];
    if (locales.includes(code as Locale)) return code as Locale;
  }
  return "en";
}

export function SiteHeader({ active = "Home", locale = "en" }: { active?: string; locale?: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lmsOpen, setLmsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getLocale(locale);
  const hasLocalePath = localeCodes.test(pathname.replace(/^\//, ""));
  const localized = hasLocalePath;
  const localPath = pathname.replace(/^\/(en|am|om|so|ti|sw|ha|yo)/, "") || "/";
  const route = (path: string) => localized ? `/${currentLocale}${path}` : path;
  const localePath = (nextLocale: Locale) => `/${nextLocale}${localPath}`;
  const labels = copy[currentLocale].nav;
  const utility = copy[currentLocale].utility;
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted || hasLocalePath) return;
    const saved = document.cookie.match(/(?:^|; )aflex-locale=([^;]+)/)?.[1];
    const preferred = getLocale(saved || browserLocale());
    if (preferred !== "en") router.replace(`/${preferred}${pathname === "/" ? "" : pathname}` || `/${preferred}`);
  }, [mounted, hasLocalePath, pathname, router]);
  
  const chooseLocale = async (event: React.MouseEvent<HTMLAnchorElement>, nextLocale: Locale, href: string) => { event.preventDefault(); await fetch("/api/locale", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: nextLocale }) }); router.push(href); };
  const searchResults = searchQuery.trim() ? searchIndex.filter((item) => `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(searchQuery.trim().toLowerCase())) : [];
  useEffect(() => {
    if (!mounted) return;
    const updateScrollState = () => setScrolled(globalThis.scrollY > 24);
    updateScrollState();
    globalThis.addEventListener("scroll", updateScrollState, { passive: true });
    return () => globalThis.removeEventListener("scroll", updateScrollState);
  }, [mounted]);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
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
    <header className={scrolled ? "site-header scrolled" : "site-header"}><div className="container nav-inner">
      <Link href={route("/")} className="wordmark brand-wordmark" aria-label="AFLEX Academy home">
        <img src="/images/aflex-icon.png" alt="" className="brand-nav-icon" aria-hidden="true" />
        <span>
          <strong>AFLEX</strong>
          <small>ACADEMY</small>
        </span>
      </Link>
      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
        {navItems.map(([label, href], index) => <Link key={label} className={active === label ? "active" : ""} href={index < 2 ? route(href) : localized ? route(href) : href} onClick={() => setMenuOpen(false)}>{labels[index]}</Link>)}
        <Link href={localized ? route("/contact") : "/contact"} onClick={() => setMenuOpen(false)}>{labels[5]}</Link>
        <div className="mobile-language">{locales.map((code) => <Link key={code} href={localePath(code)} onClick={(event) => chooseLocale(event, code, localePath(code))} className={currentLocale === code ? "language active" : "language"} lang={code}>{code === "am" ? "አማ" : code.toUpperCase()}</Link>)}</div>
      </nav>
      <div className="nav-actions">
        <details className="language-picker"><summary className="language active">{currentLocale === "am" ? "አማ" : currentLocale.toUpperCase()}</summary><div>{locales.map((code) => <Link key={code} href={localePath(code)} onClick={(event) => chooseLocale(event, code, localePath(code))} lang={code}>{localeNames[code]}</Link>)}</div></details>
        <button className="icon-button" type="button" aria-label="Search" onClick={() => setSearchOpen(true)}>⌕</button>
        <Link className="button button-primary nav-apply" href={localized ? route("/programs") : "/programs"}>Apply / Enroll <span>↗</span></Link>
        <button className="menu-button" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /><b>Menu</b></button>
      </div>
    </div></header>
    {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search AFLEX"><button className="search-close" type="button" aria-label="Close search" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>×</button><div className="search-box"><span className="eyebrow">SEARCH THE ACADEMY</span><input autoFocus type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="What are you looking for?" aria-controls="search-results" /><p>{searchQuery ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"}` : "Search programs, news, pages, and downloads."}</p>{searchQuery && <div className="search-results" id="search-results" aria-live="polite">{searchResults.length ? searchResults.map((result) => <Link className="search-result" href={localized ? `/${currentLocale}${result.href}` : result.href} key={result.href} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}><span className="mono">{result.type}</span><strong>{result.title}</strong><small>{result.description}</small><span className="search-arrow">↗</span></Link>) : <p className="search-empty">No matching AFLEX pages. Try “leadership”, “campus”, or “vacancy”.</p>}</div>}</div></div>}
    
    {/* Online Learning & Student LMS Modal */}
    <OnlineLearningModal isOpen={lmsOpen} onClose={() => setLmsOpen(false)} />
  </>;
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
            <Link href="/news">News & Events</Link>
            <Link href="/gallery">Gallery</Link>
          </div>
          <div>
            <span className="footer-label">SERVICES & PORTALS</span>
            <Link href="/online-learning">Online Learning (LMS)</Link>
            <Link href="/library">Library & Repository</Link>
            <Link href="/vacancy">Careers & Vacancies</Link>
            <Link href="/catalog">Training Catalog</Link>
            <Link href="/scholarship">Scholarships & Grants</Link>
            <Link href="/procurement">Procurement</Link>
            <Link href="/campus-locator">Campus Locator</Link>
            <Link href="/faq">FAQ & Help Center</Link>
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

export function Weave({ dark = false }: { dark?: boolean }) { return <div className={dark ? "weave weave-dark" : "weave"} aria-hidden="true"><span /></div>; }