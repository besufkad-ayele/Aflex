"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter, Weave } from "@/components/site-shell";
import { vacancies, type Vacancy } from "@/lib/vacancies-data";

export default function VacancyHubPage() {
  const [selectedDept, setSelectedDept] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [talentAlertOpen, setTalentAlertOpen] = useState(false);
  const [talentRegistered, setTalentRegistered] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const departments = [
    "All Categories",
    "Academic",
    "Operations",
    "Digital Systems",
    "Strategic Relations"
  ];

  const filteredVacancies = vacancies.filter((pos) => {
    const matchesDept = selectedDept === "All Categories" || pos.category === selectedDept;
    const matchesQuery = 
      pos.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pos.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pos.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pos.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  const recruitmentSteps = [
    {
      num: "01",
      title: "Online Application & Dossier",
      desc: "Submit your comprehensive CV, academic credentials, and statement of leadership intent via our dedicated vacancy portal."
    },
    {
      num: "02",
      title: "Academic & Technical Review",
      desc: "The AFLEX Appointments Committee shortlists dossiers matching our rigorous competency and statecraft standards."
    },
    {
      num: "03",
      title: "Panel Presentation & Colloquium",
      desc: "Shortlisted senior candidates deliver a masterclass or policy simulation before a panel of distinguished scholars and ministers."
    },
    {
      num: "04",
      title: "Vetting & Reference Review",
      desc: "Verification of academic publications, institutional credentials, and security clearance for federal academy appointments."
    },
    {
      num: "05",
      title: "Onboarding at Sululta Campus",
      desc: "Formal conferment, residential villa assignment, and integration into the AFLEX leadership faculty and executive community."
    }
  ];

  const candidateFaqs = [
    {
      q: "Are AFLEX vacancies open to international and Pan-African candidates?",
      a: "Yes. In accordance with our Pan-African mandate, Senior Research Fellowships, visiting professorships, and specialized directorships welcome qualified scholars and practitioners from across the 55 African Union member states and the global diaspora."
    },
    {
      q: "What residential accommodations are provided for Sululta campus appointees?",
      a: "Executive fellows and senior directors receive fully-furnished residential villas within the serene, highland Sululta campus compound, complete with dedicated utility infrastructure, wellness club access, and private study facilities."
    },
    {
      q: "Can I submit an unsolicited CV if no matching role is currently open?",
      a: "Absolutely. We encourage distinguished scholars, executive coaches, and policy practitioners to submit their CV to our Talent Network Registry. The Appointments Board continuously reviews candidates for visiting fellowships and guest faculty modules."
    },
    {
      q: "What is the typical timeframe for the recruitment selection process?",
      a: "Standard recruitments conclude within 4 to 6 weeks from the official closing date. Shortlisted applicants receive formal notification within 14 business days following the deadline."
    }
  ];

  return (
    <>
      <SiteHeader active="Services" />
      <main id="main-content">
        {/* Hero Section */}
        <section className="page-header blue-section">
          <div className="container">
            <span className="mono breadcrumb">HOME <b>/</b> CAREERS & APPOINTMENTS</span>
            <h1>Careers at AFLEX &<br /><em>Faculty Appointments.</em></h1>
            <p>
              Join a premier federal academy dedicated to transforming public leadership, institutional capability, and Africa&apos;s governance renaissance.
            </p>

            {/* Quick Metrics Strip */}
            <div style={{ display: "flex", gap: "24px", marginTop: "28px", flexWrap: "wrap" }}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,175,55,0.3)", padding: "12px 20px", borderRadius: "4px" }}>
                <span className="mono" style={{ color: "var(--gold)", fontSize: "20px", fontWeight: 700, display: "block" }}>{vacancies.length}</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>Active Openings</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,175,55,0.3)", padding: "12px 20px", borderRadius: "4px" }}>
                <span className="mono" style={{ color: "var(--gold)", fontSize: "20px", fontWeight: 700, display: "block" }}>55 AU Nations</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>Pan-African Eligibility</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,175,55,0.3)", padding: "12px 20px", borderRadius: "4px" }}>
                <span className="mono" style={{ color: "var(--gold)", fontSize: "20px", fontWeight: 700, display: "block" }}>Sululta & Hybrid</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>Highland Campus Duty</span>
              </div>
            </div>
          </div>
          <Weave dark />
        </section>

        {/* Search, Filter & Listings Section */}
        <section className="section" style={{ background: "#f0f5fd", color: "#024696", padding: "64px 0" }}>
          <div className="container">
            
            {/* Filter Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "32px" }}>
              <div className="filter-bar" style={{ margin: 0 }}>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    className={`filter ${selectedDept === dept ? "active" : ""}`}
                    onClick={() => setSelectedDept(dept)}
                    type="button"
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Keyword Search Field */}
              <div style={{ position: "relative", minWidth: "280px", flex: "1", maxWidth: "400px" }}>
                <input
                  type="text"
                  placeholder="Search openings by title, discipline, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-field"
                  style={{ background: "#fff", borderColor: "rgba(2,70,150,0.2)", color: "#024696", padding: "12px 16px", borderRadius: "4px" }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(2,70,150,0.4)", cursor: "pointer" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Vacancies Grid */}
            <div style={{ display: "grid", gap: "24px" }}>
              {filteredVacancies.length > 0 ? (
                filteredVacancies.map((pos) => (
                  <article
                    key={pos.id}
                    style={{
                      padding: "32px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      background: "#ffffff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                        <span className="mono" style={{ color: "var(--gold)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.5px" }}>
                          {pos.category.toUpperCase()} · {pos.type.toUpperCase()}
                        </span>
                        <span style={{ color: "#cbd5e1" }}>•</span>
                        <span className="mono" style={{ color: "rgba(2,70,150,0.6)", fontSize: "12px" }}>
                          REF: {pos.referenceNumber}
                        </span>
                      </div>
                      <span className="mono" style={{ color: "#e11d48", fontSize: "12px", background: "rgba(225, 29, 72, 0.08)", padding: "4px 8px", borderRadius: "2px", fontWeight: 600 }}>
                        CLOSING: {pos.deadline}
                      </span>
                    </div>

                    <h2 style={{ margin: "14px 0 10px", fontSize: "24px", color: "#0f172a" }}>
                      <Link href={`/vacancy/${pos.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {pos.title}
                      </Link>
                    </h2>

                    <p style={{ margin: "0 0 20px", color: "#475569", maxWidth: "820px", fontSize: "15px", lineHeight: "1.6" }}>
                      {pos.summary}
                    </p>

                    <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                      <span style={{ fontSize: "13px", color: "rgba(2,70,150,0.6)" }}>
                        📍 <strong>Duty Station:</strong> {pos.location}
                      </span>
                      <span style={{ color: "#cbd5e1" }}>•</span>
                      <span style={{ fontSize: "13px", color: "rgba(2,70,150,0.6)" }}>
                        💼 <strong>Grade:</strong> {pos.gradeLevel}
                      </span>

                      <div style={{ marginLeft: "auto", display: "flex", gap: "12px", alignItems: "center" }}>
                        <Link 
                          href={`/vacancy/${pos.id}`} 
                          className="button button-primary"
                          style={{ padding: "10px 20px", fontSize: "13px" }}
                        >
                          <span>View Full Terms of Reference</span>
                          <span>↗</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div style={{ padding: "64px 24px", textAlign: "center", background: "#fff", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "36px", display: "block", marginBottom: "12px" }}>🔍</span>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px" }}>No active openings match your criteria</h3>
                  <p style={{ color: "rgba(2,70,150,0.6)", maxWidth: "480px", margin: "0 auto 24px", fontSize: "14px" }}>
                    Try selecting a different department category or submit your CV to our Pan-African Talent Registry for future appointments.
                  </p>
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => setTalentAlertOpen(true)}
                  >
                    <span>Join AFLEX Talent Registry</span>
                    <span>↗</span>
                  </button>
                </div>
              )}
            </div>

            {/* Talent Network Banner */}
            <div style={{ marginTop: "64px", padding: "40px 36px", background: "#050508", color: "#fff", borderRadius: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "28px" }}>
                <div>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>PAN-AFRICAN TALENT NETWORK</span>
                  <h3 style={{ margin: "8px 0 6px", fontSize: "26px", color: "#fff" }}>
                    Don&apos;t see a matching vacancy?
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, maxWidth: "620px", fontSize: "14px", lineHeight: "1.6" }}>
                    Submit your curriculum vitae to the AFLEX Institutional Talent Registry. The Appointments Board proactively consults this database for visiting professorships, policy consulting rosters, and executive cohort facilitation.
                  </p>
                </div>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => setTalentAlertOpen(true)}
                  style={{ padding: "14px 28px" }}
                >
                  <span>Register Your Interest</span>
                  <span>↗</span>
                </button>
              </div>
            </div>

            {/* 5-Stage Recruitment Roadmap */}
            <div style={{ marginTop: "80px" }}>
              <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>SELECTION ARCHITECTURE</span>
                <h2 style={{ fontSize: "30px", margin: "8px 0 12px" }}>The AFLEX Recruitment Journey</h2>
                <p style={{ color: "rgba(2,70,150,0.6)", fontSize: "15px" }}>
                  A merit-based, transparent 5-stage evaluation process designed to attract Africa&apos;s most capable scholars and leaders.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                {recruitmentSteps.map((step) => (
                  <div key={step.num} style={{ padding: "24px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
                    <span className="mono" style={{ fontSize: "28px", fontWeight: 700, color: "var(--gold)", display: "block", marginBottom: "8px" }}>
                      {step.num}
                    </span>
                    <h4 style={{ margin: "0 0 8px", fontSize: "16px", color: "#0f172a" }}>{step.title}</h4>
                    <p style={{ margin: 0, fontSize: "13px", color: "rgba(2,70,150,0.6)", lineHeight: "1.5" }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate FAQ Accordion */}
            <div style={{ marginTop: "80px", maxWidth: "860px", margin: "80px auto 0" }}>
              <div style={{ textAlign: "center", marginBottom: "36px" }}>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>CANDIDATE GUIDANCE</span>
                <h2 style={{ fontSize: "28px", margin: "8px 0" }}>Frequently Asked Questions</h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {candidateFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "4px", overflow: "hidden" }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        style={{
                          width: "100%",
                          padding: "18px 24px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "none",
                          border: "none",
                          textAlign: "left",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: "15px",
                          color: "#0f172a"
                        }}
                      >
                        <span>{faq.q}</span>
                        <span style={{ fontSize: "18px", color: "var(--gold)" }}>{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div style={{ padding: "0 24px 20px", color: "#475569", fontSize: "14px", lineHeight: "1.6", borderTop: "1px solid #f1f5f9" }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Equal Opportunity Statement */}
            <div style={{ marginTop: "60px", padding: "24px", background: "rgba(15, 59, 46, 0.05)", border: "1px solid rgba(15, 59, 46, 0.2)", borderRadius: "4px", textAlign: "center" }}>
              <h4 style={{ margin: "0 0 6px", fontSize: "15px", color: "#0f3b2e" }}>
                Pan-African Equal Opportunity & Diversity Commitment
              </h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#475569", maxWidth: "780px", marginInline: "auto" }}>
                AFLEX is committed to creating an inclusive, high-integrity academic environment. We strongly encourage qualified women leaders and candidates from across all African regional blocs to apply.
              </p>
            </div>

          </div>
        </section>
      </main>

      {/* Talent Network Modal */}
      {talentAlertOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" onClick={() => setTalentAlertOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={{ padding: "36px", maxWidth: "600px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>TALENT REGISTRATION</span>
                <h3 style={{ margin: "6px 0 0", fontSize: "22px" }}>Join the AFLEX Talent Roster</h3>
              </div>
              <button 
                type="button" 
                onClick={() => { setTalentAlertOpen(false); setTalentRegistered(false); }}
                style={{ background: "none", border: "none", color: "white", fontSize: "24px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {talentRegistered ? (
              <div style={{ padding: "32px 20px", textAlign: "center", background: "rgba(212, 175, 55, 0.08)", border: "1px solid var(--gold)", borderRadius: "4px" }}>
                <span style={{ fontSize: "40px" }}>✓</span>
                <h3 style={{ color: "#fff", margin: "14px 0 8px" }}>Registration Received</h3>
                <p style={{ color: "var(--gold)", fontSize: "14px" }}>
                  Your profile and credentials have been deposited into the AFLEX Appointments Database.
                </p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginTop: "8px" }}>
                  You will receive direct notifications when matching academic fellowships or executive roles are published.
                </p>
                <button 
                  type="button" 
                  className="button button-primary"
                  onClick={() => { setTalentAlertOpen(false); setTalentRegistered(false); }}
                  style={{ marginTop: "16px" }}
                >
                  Close <span>✓</span>
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => { e.preventDefault(); setTalentRegistered(true); }}
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Full Name *</label>
                  <input required placeholder="Dr. / Prof. / Mr. / Ms. Full Name" className="search-input-field" />
                </div>
                
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Email Address *</label>
                  <input required type="email" placeholder="you@institution.edu" className="search-input-field" />
                </div>
                
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Primary Discipline / Domain *</label>
                  <select className="search-input-field" style={{ background: "#ffffff", color: "#024696", borderColor: "rgba(2,70,150,0.25)" }}>
                    <option>Pan-African Governance & Statecraft</option>
                    <option>Public Policy, Economics & Development</option>
                    <option>Executive Leadership & Coaching</option>
                    <option>Digital Governance & Educational Technology</option>
                    <option>Institutional Operations & Hospitality Management</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>LinkedIn Profile or CV Link</label>
                  <input type="url" placeholder="https://linkedin.com/in/..." className="search-input-field" />
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Brief Bio / Areas of Research Interest</label>
                  <textarea rows={3} placeholder="Tell us about your expertise and how you wish to collaborate with AFLEX..." className="search-input-field" />
                </div>

                <button type="submit" className="button button-primary" style={{ marginTop: "12px", width: "100%", justifyContent: "center" }}>
                  <span>Register Dossier</span>
                  <span>↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <SiteFooter />
    </>
  );
}