"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter, Weave } from "@/components/site-shell";

interface FAQItem {
  id: string;
  category: "Admissions & Nominations" | "Sululta Campus & Life" | "Online Learning & LMS" | "Certifications & Accreditation" | "Careers & Fellowships" | "Procurement & Tenders";
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQItem[] = [
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

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ "faq-01": true });

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
            <h1>Knowledge & Guidance<br /><em>Help Center.</em></h1>
            <p>
              Find clear answers regarding academy admissions, Sululta residential life, digital LMS access, credentials, and career appointments.
            </p>
          </div>
          <Weave dark />
        </section>

        {/* FAQ Search & Interactive Accordions */}
        <section className="section" style={{ background: "#f8f9fa", color: "#111", padding: "64px 0" }}>
          <div className="container">
            
            {/* Search Box */}
            <div style={{ maxWidth: "700px", margin: "0 auto 40px" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search questions by keyword, topic, or phrase..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-field"
                  style={{
                    background: "#fff",
                    borderColor: "#cbd5e1",
                    color: "#111",
                    padding: "16px 20px",
                    borderRadius: "6px",
                    fontSize: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "16px" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  style={{ margin: 0 }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Actions (Expand/Collapse) */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "860px", margin: "0 auto 16px" }}>
              <span className="mono" style={{ color: "#64748b", fontSize: "12px" }}>
                Showing {filteredFaqs.length} question{filteredFaqs.length === 1 ? "" : "s"}
              </span>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  onClick={expandAll}
                  style={{ background: "none", border: "none", color: "var(--gold)", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                >
                  Expand All +
                </button>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <button
                  type="button"
                  onClick={collapseAll}
                  style={{ background: "none", border: "none", color: "#64748b", fontSize: "12px", cursor: "pointer" }}
                >
                  Collapse All −
                </button>
              </div>
            </div>

            {/* Accordion List */}
            <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
              {filteredFaqs.map((faq) => {
                const isOpen = !!openItems[faq.id];
                return (
                  <div
                    key={faq.id}
                    style={{
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      overflow: "hidden",
                      boxShadow: isOpen ? "0 4px 12px rgba(0,0,0,0.04)" : "0 1px 3px rgba(0,0,0,0.02)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(faq.id)}
                      style={{
                        width: "100%",
                        padding: "20px 24px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: isOpen ? "rgba(212, 175, 55, 0.03)" : "none",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        gap: "16px"
                      }}
                    >
                      <div>
                        <span className="mono" style={{ fontSize: "11px", color: "var(--gold)", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                          {faq.category.toUpperCase()}
                        </span>
                        <h3 style={{ margin: 0, fontSize: "16px", color: "#0f172a", fontWeight: 600, lineHeight: "1.4" }}>
                          {faq.question}
                        </h3>
                      </div>
                      <span
                        style={{
                          fontSize: "20px",
                          color: "var(--gold)",
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          background: isOpen ? "rgba(212, 175, 55, 0.15)" : "#f1f5f9",
                          flexShrink: 0
                        }}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: "0 24px 24px",
                          color: "#475569",
                          fontSize: "14.5px",
                          lineHeight: "1.7",
                          borderTop: "1px solid #f1f5f9"
                        }}
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div style={{ padding: "64px 24px", textAlign: "center", background: "#fff", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "36px", display: "block", marginBottom: "12px" }}>❓</span>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px" }}>No matching answers found</h3>
                  <p style={{ color: "#64748b", maxWidth: "480px", margin: "0 auto 24px", fontSize: "14px" }}>
                    Have a specific question not covered here? Reach out directly to our Academy Admissions & Inquiries team.
                  </p>
                  <Link href="/contact" className="button button-primary">
                    <span>Contact Academy Inquiries</span>
                    <span>↗</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Still Have Questions Box */}
            <div
              style={{
                maxWidth: "860px",
                margin: "64px auto 0",
                padding: "36px 32px",
                background: "#050508",
                color: "#fff",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "24px"
              }}
            >
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>DIRECT ASSISTANCE</span>
                <h3 style={{ margin: "6px 0 4px", fontSize: "22px", color: "#fff" }}>
                  Still have questions?
                </h3>
                <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
                  Our admissions counselors and protocol officers are on hand to assist with your delegation or enrollment inquiry.
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/contact" className="button button-primary">
                  <span>Send Inquiries</span>
                  <span>↗</span>
                </Link>
                <a
                  href="tel:+251111234567"
                  className="button button-outline light"
                  style={{ fontSize: "13px" }}
                >
                  <span>📞 Call Hotline</span>
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
