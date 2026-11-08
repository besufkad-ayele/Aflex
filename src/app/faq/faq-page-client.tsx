"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { FaqStewardAgent } from "@/components/faq-steward-agent";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string | React.ReactNode;
}

const STATIC_FAQS: FAQItem[] = [
  {
    id: "faq-01",
    category: "Admissions & Nominations",
    question: "Who is eligible to attend AFLEX executive leadership training programs?",
    answer: "AFLEX programs are designed for senior and emerging leaders across three main pillars: (1) Public Sector (Ministers, State Ministers, Directors General, Regional Bureau Heads, Senior Civil Servants), (2) Private Sector (C-Suite Executives, Board Members, Entrepreneurs), and (3) Civic & Pan-African Institutions (Diplomats, NGO Executives, AU Organs). Specific prerequisites vary by course level."
  },
  {
    id: "faq-02",
    category: "Admissions & Nominations",
    question: "How does the nomination and enrollment process work for government ministries?",
    answer: "Federal and regional institutions submit official nomination packages signed by the respective Minister or Regional Bureau Head to the AFLEX Admissions Office (admissions@aflex.gov.et). Selected nominees receive formal acceptance credentials, preparatory reading packs, and Sululta campus arrival logistics."
  },
  {
    id: "faq-03",
    category: "Admissions & Nominations",
    question: "Can self-sponsored or private sector executives apply directly?",
    answer: "Yes. For our executive masterclasses, Project WILD cohorts, and specialized leadership tracks, private sector and civic leaders may apply directly through our online enrollment gateway or by submitting a detailed CV and leadership statement."
  },
  {
    id: "faq-04",
    category: "Sululta Campus & Life",
    question: "Where is the AFLEX Academy located and how do delegates travel there?",
    answer: "The AFLEX Main Academy is situated in the highland quiet of Sululta, Oromia, approximately 25 kilometers north of Addis Ababa. AFLEX operates scheduled executive shuttles from Addis Ababa liaison offices and Bole International Airport for arriving delegates."
  },
  {
    id: "faq-05",
    category: "Sululta Campus & Life",
    question: "What residential and dining amenities are available for trainees?",
    answer: "Trainees reside in 500+ private executive en-suite rooms and presidential villas on campus. Amenities include world-class banquet and buffet dining halls, executive reading lounges, a high-altitude athletic track, modern gymnasium, tennis courts, and high-speed Wi-Fi throughout all facilities."
  },
  {
    id: "faq-06",
    category: "Sululta Campus & Life",
    question: "What security measures are implemented on the campus grounds?",
    answer: "AFLEX operates 24/7 high-level perimeter security, electronic access control, and dedicated federal VIP protection protocol to guarantee a private, secure, and conducive environment for statecraft deliberations."
  },
  {
    id: "faq-07",
    category: "Online Learning & LMS",
    question: "How do enrolled students access the AFLEX Online Learning Management System?",
    answer: "Enrolled cohort members receive an official AFLEX Student ID and secure login credentials via email prior to cohort orientation. You can sign in directly through our Online Learning Portal (/online-learning) to access courseware, live webinars, and case study deliberation forums."
  },
  {
    id: "faq-08",
    category: "Online Learning & LMS",
    question: "What if I experience technical difficulties or forget my LMS password?",
    answer: "Our Digital E-Learning Center provides dedicated technical support. You can use the 'Forgot Password' link on the LMS login page or contact the 24/7 Academy Helpdesk at support@aflex.gov.et."
  },
  {
    id: "faq-09",
    category: "Certifications & Accreditation",
    question: "Are AFLEX certificates and postgraduate diplomas internationally recognized?",
    answer: "Yes. AFLEX certificates are issued under the authority of the Federal Democratic Republic of Ethiopia Council of Ministers Proclamation. Our curricula adhere to international executive education standards and are recognized by African Union partner institutions and international universities."
  },
  {
    id: "faq-10",
    category: "Certifications & Accreditation",
    question: "What are the graduation and completion criteria for leadership programs?",
    answer: "To graduate, participants must maintain a minimum 90% attendance in plenary sessions, actively contribute to syndicate policy clinics, complete all applied project deliverables, and pass the end-of-cohort leadership evaluation."
  },
  {
    id: "faq-11",
    category: "Careers & Fellowships",
    question: "How can scholars apply for Senior Research Fellowships or visiting positions?",
    answer: "Distinguished scholars can review active openings on our dedicated Vacancy Portal (/vacancy) or submit their curriculum vitae to our Pan-African Talent Registry. We regularly appoint visiting fellows, guest lecturers, and policy advisors."
  },
  {
    id: "faq-12",
    category: "Careers & Fellowships",
    question: "Are there scholarship opportunities for candidates from other African countries?",
    answer: "Yes. AFLEX offers Pan-African Emerging Leaders Fellowships and Project WILD leadership grants that cover full tuition, residential accommodation in Sululta, and travel stipends for qualified international African candidates. Visit /scholarship for active intake deadlines."
  },
  {
    id: "faq-13",
    category: "Procurement & Tenders",
    question: "How can vendors and suppliers participate in AFLEX public tenders?",
    answer: "Official bidding invitations, Terms of Reference, and tender documents are published on our Procurement Portal (/procurement). Qualified suppliers can purchase bidding documents at our Sululta or Addis Ababa finance offices in accordance with public procurement regulations."
  }
];

export default function FaqPage({ initialFaqs }: { initialFaqs?: FAQItem[] }) {
  const faqs = initialFaqs && initialFaqs.length > 0 ? initialFaqs : STATIC_FAQS;
  const [selectedCategory, setSelectedCategory] = useState("All Questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [faqs[0]?.id || "faq-01"]: true,
  });

  const categories = [
    "All Questions",
    "Admissions & Nominations",
    "Sululta Campus & Life",
    "Online Learning & LMS",
    "Certifications & Accreditation",
    "Careers & Fellowships",
    "Procurement & Tenders"
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCat = selectedCategory === "All Questions" || item.category === selectedCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof item.answer === "string" && item.answer.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach((f) => { allOpen[f.id] = true; });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  return (
    <>
      <SiteHeader active="Services" />
      <main id="main-content">
        {/* Header Banner */}
        <section className="page-header blue-section">
          <div className="container">
            <span className="mono breadcrumb">HOME <b>/</b> FREQUENTLY ASKED QUESTIONS</span>
            <h1 style={{ color: "#ffffff" }}>Knowledge & Guidance<br /><em>Help Center.</em></h1>
            <p style={{ color: "rgba(255,255,255,0.88)" }}>
              Find clear answers regarding academy admissions, Sululta residential life, digital LMS access, credentials, and career appointments.
            </p>
          </div>
        </section>

        <FaqStewardAgent />

        <section className="section faq-browse-section" aria-labelledby="faq-browse-heading">
          <div className="container">
            <div className="faq-browse-header">
              <span className="eyebrow">KNOWLEDGE BASE</span>
              <h2 id="faq-browse-heading">
                Browse academy
                <br />
                <em>answers & guidance.</em>
              </h2>
            </div>

            <div className="faq-search-wrap">
              <input
                type="text"
                placeholder="Search questions by keyword, topic, or phrase..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="faq-search-input"
                aria-label="Search FAQ questions"
              />
              {searchQuery ? (
                <button
                  type="button"
                  className="faq-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              ) : null}
            </div>

            <div className="faq-category-row" role="tablist" aria-label="FAQ categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`faq-category-chip ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="faq-toolbar">
              <span className="mono faq-count">
                Showing {filteredFaqs.length} question{filteredFaqs.length === 1 ? "" : "s"}
              </span>
              <div className="faq-toolbar-actions">
                <button type="button" className="faq-toolbar-btn" onClick={expandAll}>
                  Expand all +
                </button>
                <button type="button" className="faq-toolbar-btn muted" onClick={collapseAll}>
                  Collapse all −
                </button>
              </div>
            </div>

            <div className="faq-accordion-list">
              {filteredFaqs.map((faq) => {
                const isOpen = !!openItems[faq.id];
                return (
                  <article key={faq.id} className={`faq-accordion-card ${isOpen ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className="faq-accordion-trigger"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-accordion-copy">
                        <span className="mono faq-accordion-category">{faq.category}</span>
                        <h3>{faq.question}</h3>
                      </div>
                      <span className="faq-accordion-icon" aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen ? (
                      <div className="faq-accordion-answer">
                        {faq.answer}
                      </div>
                    ) : null}
                  </article>
                );
              })}

              {filteredFaqs.length === 0 ? (
                <div className="faq-empty-state">
                  <h3>No matching answers found</h3>
                  <p>
                    Have a specific question not covered here? Reach out directly to our Academy Admissions &amp; Inquiries team.
                  </p>
                  <Link href="/contact" className="button button-primary">
                    <span>Contact Academy Inquiries</span>
                    <span>↗</span>
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="faq-assist-banner">
              <div className="faq-assist-copy">
                <span className="eyebrow">DIRECT ASSISTANCE</span>
                <h3>Still have questions?</h3>
                <p>
                  Our admissions counselors and protocol officers are on hand to assist with your delegation or enrollment inquiry.
                </p>
              </div>
              <div className="faq-assist-actions">
                <Link href="/contact" className="button button-primary">
                  <span>Send inquiries</span>
                  <span>↗</span>
                </Link>
                <a href="tel:+251111234567" className="button button-outline">
                  <span>Call hotline</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
