"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export function PageFrame({ active, crumb, title, intro, locale, children }: { active: string; crumb: string; title: string; intro: string; locale?: import("@/lib/i18n").Locale; children: React.ReactNode }) {
  return (
    <>
      <SiteHeader active={active} locale={locale} />
      <main id="main-content">
        <section className="page-header blue-section">
          <div className="container page-header-inner">
            <div className="page-header-copy page-enter">
              <span className="mono breadcrumb">HOME <b>/</b> {crumb.toUpperCase()}</span>
              <h1>{title}</h1>
              <p>{intro}</p>
            </div>
            <div className="page-header-mark page-enter page-enter-delay" aria-hidden="true">
              <BrandLogo variant="full" />
            </div>
          </div>
        </section>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

export function EmptyState({ title, copy, href, label }: { title: string; copy: string; href?: string; label?: string }) {
  return <div className="empty-state"><span className="empty-mark">—</span><h3>{title}</h3><p>{copy}</p>{href && label && <Link className="button button-outline" href={href}>{label} <span>↗</span></Link>}</div>;
}

export function DocumentRow({ title, filename, detail }: { title: string; filename: string; detail: string }) {
  return <div className="document-row"><span className="document-icon">PDF</span><div><h3>{title}</h3><span className="mono">{filename} · {detail}</span></div><button type="button" className="icon-button document-download" aria-label={`Download ${title}`}>↓</button></div>;
}

export function InquiryForm({ subject = "General inquiry", defaultProgram = "" }: { subject?: string; defaultProgram?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(defaultProgram);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <span className="eyebrow">SEND AN INQUIRY</span>
      <h2>Let&apos;s continue<br /><em>the conversation.</em></h2>
      
      {submitted ? (
        <div className="form-success-banner">
          <strong>Thank you for reaching out.</strong>
          <p style={{ margin: "6px 0 0", fontSize: "13px", opacity: 0.9 }}>
            Your inquiry has been received by the AFLEX Academy admissions & partnerships team. We will respond within 2 business days.
          </p>
        </div>
      ) : null}

      <label htmlFor="name">Full name</label>
      <input id="name" name="name" required placeholder="Your full name" />
      
      <label htmlFor="email">Email address</label>
      <input id="email" name="email" required type="email" placeholder="you@example.com" />
      
      <label htmlFor="program-select">Program / Area of Interest</label>
      <select 
        id="program-select" 
        value={selectedProgram} 
        onChange={(e) => setSelectedProgram(e.target.value)}
        style={{ width: "100%", padding: "12px", border: "1px solid var(--line-light)", borderRadius: "4px", background: "var(--white)", color: "var(--black)" }}
      >
        <option value="">General Institutional Inquiry</option>
        <option value="leadership-development">01 - Leadership Development Training (Short-term)</option>
        <option value="project-wild">02 - Project WILD (Women in Leadership)</option>
        <option value="psle">03 - Public Service Leadership Excellence (PSLE)</option>
        <option value="research">Research & Policy Advisory</option>
        <option value="campus-visit">Campus Visit / Facility Rental</option>
      </select>

      <label htmlFor="subject">Subject</label>
      <input id="subject" name="subject" defaultValue={subject} />
      
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" required rows={5} placeholder="How can we help you or your institution?" />
      
      <button type="submit" className="button button-primary">
        Send inquiry <span>↗</span>
      </button>
    </form>
  );
}
export { programDetails } from "@/lib/programs-data";
