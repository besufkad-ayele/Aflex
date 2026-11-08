"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter, Weave } from "@/components/site-shell";
import { type Vacancy } from "@/lib/vacancies-data";

export default function VacancyDetailClient({
  vacancy,
  relatedVacancies,
}: {
  vacancy: Vacancy;
  relatedVacancies: Vacancy[];
}) {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    highestDegree: "Ph.D. / Doctorate",
    currentInstitution: "",
    yearsExperience: "10+ Years",
    linkedInUrl: "",
    coverLetter: "",
    agreeToTerms: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const generatedRef = `AFX-APP-${Date.now().toString().slice(-6)}`;
      setRefNumber(generatedRef);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <>
      <SiteHeader active="Services" />
      <main id="main-content">
        {/* Page Hero Header */}
        <section className="page-header blue-section">
          <div className="container">
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" }}>
              <Link href="/vacancy" style={{ color: "var(--gold)", fontSize: "12px", textDecoration: "none", fontWeight: 600 }}>
                ← BACK TO ALL VACANCIES
              </Link>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
              <span className="mono" style={{ color: "var(--gold)", fontSize: "11px", letterSpacing: "1px" }}>
                {vacancy.referenceNumber}
              </span>
            </div>
            
            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, marginBottom: "16px" }}>
              {vacancy.title}
            </h1>
            
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginTop: "16px" }}>
              <span style={{ background: "rgba(212, 175, 55, 0.15)", border: "1px solid var(--gold)", color: "var(--gold)", padding: "4px 12px", borderRadius: "2px", fontSize: "12px", fontWeight: 600 }}>
                {vacancy.department}
              </span>
              <span style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff", padding: "4px 12px", borderRadius: "2px", fontSize: "12px" }}>
                📍 {vacancy.location}
              </span>
              <span style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff", padding: "4px 12px", borderRadius: "2px", fontSize: "12px" }}>
                ⏱ {vacancy.type}
              </span>
              <span style={{ background: "rgba(239, 68, 68, 0.2)", border: "1px solid rgba(239, 68, 68, 0.4)", color: "#fca5a5", padding: "4px 12px", borderRadius: "2px", fontSize: "12px" }}>
                ⌛ Deadline: {vacancy.deadline}
              </span>
            </div>
          </div>
          <Weave dark />
        </section>

        {/* Content & Sidebar Grid */}
        <section className="section" style={{ background: "#ffffff", color: "#111", padding: "64px 0" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "48px", alignItems: "start" }}>
              
              {/* Main Job Body */}
              <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                
                {/* Overview */}
                <div>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>POSITION OVERVIEW</span>
                  <h2 style={{ fontSize: "26px", margin: "8px 0 16px" }}>Role Mandate & Scope</h2>
                  <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#333" }}>
                    {vacancy.overview}
                  </p>
                </div>

                {/* Key Responsibilities */}
                <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "32px" }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>DELIVERABLES & SCOPE</span>
                  <h2 style={{ fontSize: "24px", margin: "8px 0 20px" }}>Key Responsibilities</h2>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "12px", paddingLeft: "20px", color: "#333", fontSize: "15px", lineHeight: "1.6" }}>
                    {vacancy.keyResponsibilities.map((resp, idx) => (
                      <li key={idx} style={{ paddingLeft: "6px" }}>
                        <strong>{resp.split(" ")[0]} {resp.split(" ")[1]}</strong> {resp.split(" ").slice(2).join(" ")}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Required Qualifications */}
                <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "32px" }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>CANDIDATE CRITERIA</span>
                  <h2 style={{ fontSize: "24px", margin: "8px 0 20px" }}>Required Qualifications & Experience</h2>
                  
                  <div style={{ display: "grid", gap: "16px" }}>
                    <div style={{ padding: "18px", background: "#f8f9fa", borderLeft: "3px solid var(--gold)", borderRadius: "2px" }}>
                      <strong style={{ display: "block", fontSize: "13px", color: "var(--gold)", textTransform: "uppercase", marginBottom: "4px" }}>
                        Formal Education
                      </strong>
                      <p style={{ margin: 0, fontSize: "15px", color: "#222" }}>{vacancy.requiredQualifications.education}</p>
                    </div>

                    <div style={{ padding: "18px", background: "#f8f9fa", borderLeft: "3px solid #0f3b2e", borderRadius: "2px" }}>
                      <strong style={{ display: "block", fontSize: "13px", color: "#0f3b2e", textTransform: "uppercase", marginBottom: "4px" }}>
                        Professional Experience
                      </strong>
                      <p style={{ margin: 0, fontSize: "15px", color: "#222" }}>{vacancy.requiredQualifications.experience}</p>
                    </div>

                    <div style={{ padding: "18px", background: "#f8f9fa", borderLeft: "3px solid #0a192f", borderRadius: "2px" }}>
                      <strong style={{ display: "block", fontSize: "13px", color: "#0a192f", textTransform: "uppercase", marginBottom: "4px" }}>
                        Language Proficiencies
                      </strong>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
                        {vacancy.requiredQualifications.languages.map((lang, idx) => (
                          <span key={idx} style={{ background: "#e5e7eb", padding: "4px 10px", borderRadius: "2px", fontSize: "13px", color: "#111" }}>
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferred Experience & Competencies */}
                <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "32px" }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>SKILLS & CAPABILITIES</span>
                  <h2 style={{ fontSize: "24px", margin: "8px 0 16px" }}>Core Competencies</h2>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {vacancy.competencies.map((comp, idx) => (
                      <span key={idx} style={{ padding: "8px 14px", background: "rgba(212, 175, 55, 0.1)", border: "1px solid rgba(212, 175, 55, 0.4)", borderRadius: "4px", fontSize: "13px", fontWeight: 600, color: "#926b00" }}>
                        ✓ {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits & Allowances */}
                <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "32px" }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>COMPENSATION & ACCOMMODATION</span>
                  <h2 style={{ fontSize: "24px", margin: "8px 0 16px" }}>Institutional Benefits Package</h2>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {vacancy.benefits.map((benefit, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "15px", color: "#333" }}>
                        <span style={{ color: "var(--gold)", fontSize: "18px" }}>✦</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Box */}
                <div style={{ background: "#050508", color: "#fff", padding: "36px", borderRadius: "4px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
                  <div>
                    <span className="eyebrow" style={{ color: "var(--gold)" }}>READY TO CONTRIBUTE?</span>
                    <h3 style={{ margin: "6px 0 4px", fontSize: "22px", color: "#fff" }}>Apply for this appointment</h3>
                    <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                      Applications are reviewed continuously by the AFLEX Appointments Board.
                    </p>
                  </div>
                  <button 
                    type="button" 
                    className="button button-primary"
                    onClick={() => setApplyModalOpen(true)}
                    style={{ padding: "14px 28px", fontSize: "15px" }}
                  >
                    <span>Submit Application</span>
                    <span>↗</span>
                  </button>
                </div>

              </div>

              {/* Sidebar Summary Card */}
              <aside style={{ position: "sticky", top: "100px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ padding: "28px", background: "#f8f9fa", border: "1px solid #e5e5e5", borderRadius: "4px" }}>
                  <h3 style={{ margin: "0 0 18px", fontSize: "18px", borderBottom: "1px solid #e5e5e5", paddingBottom: "12px" }}>
                    Appointment Summary
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "14px" }}>
                    <div>
                      <span style={{ color: "#666", fontSize: "12px", textTransform: "uppercase", display: "block" }}>Reference Code</span>
                      <strong className="mono" style={{ color: "#111" }}>{vacancy.referenceNumber}</strong>
                    </div>

                    <div>
                      <span style={{ color: "#666", fontSize: "12px", textTransform: "uppercase", display: "block" }}>Grade & Band</span>
                      <strong style={{ color: "#111" }}>{vacancy.gradeLevel}</strong>
                    </div>

                    <div>
                      <span style={{ color: "#666", fontSize: "12px", textTransform: "uppercase", display: "block" }}>Remuneration Scale</span>
                      <strong style={{ color: "#111", fontSize: "13px" }}>{vacancy.salaryRange}</strong>
                    </div>

                    <div>
                      <span style={{ color: "#666", fontSize: "12px", textTransform: "uppercase", display: "block" }}>Duty Station</span>
                      <strong style={{ color: "#111" }}>{vacancy.location}</strong>
                    </div>

                    <div>
                      <span style={{ color: "#666", fontSize: "12px", textTransform: "uppercase", display: "block" }}>Application Closing Date</span>
                      <strong style={{ color: "#b91c1c" }}>{vacancy.deadline}</strong>
                    </div>
                  </div>

                  <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button 
                      type="button" 
                      className="button button-primary"
                      onClick={() => setApplyModalOpen(true)}
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <span>Apply Online</span>
                      <span>↗</span>
                    </button>

                    <a 
                      href={`mailto:recruitment@aflex.gov.et?subject=Application:%20${encodeURIComponent(vacancy.title)}%20(${vacancy.referenceNumber})`}
                      className="button button-outline"
                      style={{ width: "100%", justifyContent: "center", fontSize: "13px" }}
                    >
                      <span>Email CV Directly</span>
                      <span>✉</span>
                    </a>
                  </div>
                </div>

                {/* Recruitment Inquiries Card */}
                <div style={{ padding: "20px", background: "#0a192f", color: "#fff", borderRadius: "4px" }}>
                  <span className="mono" style={{ color: "var(--gold)", fontSize: "11px", letterSpacing: "1px" }}>
                    HR RECRUITMENT DESK
                  </span>
                  <p style={{ margin: "8px 0 12px", fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
                    Have questions regarding this vacancy or diplomatic appointment criteria?
                  </p>
                  <a 
                    href="mailto:recruitment@aflex.gov.et" 
                    style={{ color: "var(--gold)", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
                  >
                    recruitment@aflex.gov.et ↗
                  </a>
                </div>
              </aside>

            </div>

            {/* Related Openings */}
            {relatedVacancies.length > 0 && (
              <div style={{ marginTop: "80px", borderTop: "1px solid #e5e5e5", paddingTop: "48px" }}>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>EXPLORE OTHER ROLES</span>
                <h3 style={{ fontSize: "24px", margin: "8px 0 24px" }}>Other Open Appointments at AFLEX</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
                  {relatedVacancies.map((rel) => (
                    <div 
                      key={rel.id} 
                      style={{ padding: "24px", border: "1px solid #e5e5e5", borderRadius: "4px", background: "#fdfdfd" }}
                    >
                      <span className="mono" style={{ color: "var(--gold)", fontSize: "11px" }}>{rel.department}</span>
                      <h4 style={{ margin: "10px 0 8px", fontSize: "18px" }}>
                        <Link href={`/vacancy/${rel.id}`} style={{ color: "#111", textDecoration: "none" }}>
                          {rel.title}
                        </Link>
                      </h4>
                      <p style={{ color: "#666", fontSize: "13px", margin: "0 0 16px" }}>{rel.summary}</p>
                      <Link href={`/vacancy/${rel.id}`} className="text-link" style={{ fontSize: "13px" }}>
                        View Terms of Reference <span>↗</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Interactive Application Modal */}
      {applyModalOpen && (
        <div 
          className="lightbox-overlay" 
          role="dialog" 
          aria-modal="true" 
          onClick={() => setApplyModalOpen(false)}
        >
          <div 
            className="lightbox-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ padding: "36px", maxWidth: "680px", maxHeight: "90vh", overflowY: "auto" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>APPLICATION SUBMISSION</span>
                <h3 style={{ margin: "6px 0 0", fontSize: "22px" }}>{vacancy.title}</h3>
                <span className="mono" style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>
                  Ref: {vacancy.referenceNumber} · {vacancy.department}
                </span>
              </div>
              <button 
                type="button" 
                onClick={() => { setApplyModalOpen(false); setSubmitted(false); }}
                style={{ background: "none", border: "none", color: "white", fontSize: "24px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div style={{ padding: "32px 20px", textAlign: "center", background: "rgba(212, 175, 55, 0.08)", border: "1px solid var(--gold)", borderRadius: "4px" }}>
                <span style={{ fontSize: "40px" }}>✓</span>
                <h3 style={{ color: "#fff", margin: "16px 0 8px" }}>Application Successfully Submitted</h3>
                <p style={{ color: "var(--gold)", fontSize: "14px", marginBottom: "8px" }}>
                  Your candidate application dossier has been received by the AFLEX Recruitment Board.
                </p>
                <div style={{ background: "rgba(0,0,0,0.5)", padding: "12px", borderRadius: "4px", margin: "16px auto", maxWidth: "340px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", display: "block" }}>APPLICATION TRACKING ID</span>
                  <strong className="mono" style={{ fontSize: "18px", color: "#fff" }}>{refNumber}</strong>
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", maxWidth: "440px", margin: "0 auto 20px" }}>
                  A formal acknowledgement email has been dispatched to <strong>{formData.email}</strong>. Shortlisted candidates will be contacted for panel deliberations.
                </p>
                <button 
                  type="button" 
                  className="button button-primary"
                  onClick={() => { setApplyModalOpen(false); setSubmitted(false); }}
                >
                  Return to Appointment Overview <span>↗</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>
                      Full Legal Name *
                    </label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Dr. Abebe Tessema" 
                      className="search-input-field"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>
                      Email Address *
                    </label>
                    <input 
                      required 
                      type="email" 
                      placeholder="e.g. a.tessema@university.edu" 
                      className="search-input-field"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>
                      Phone / WhatsApp *
                    </label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="+251 91 123 4567" 
                      className="search-input-field"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>
                      Highest Academic Degree
                    </label>
                    <select 
                      className="search-input-field" 
                      style={{ background: "#111", color: "#fff" }}
                      value={formData.highestDegree}
                      onChange={(e) => setFormData({ ...formData, highestDegree: e.target.value })}
                    >
                      <option>Ph.D. / Doctorate</option>
                      <option>Master&apos;s Degree (MBA / MPA / LL.M)</option>
                      <option>Postgraduate Diploma</option>
                      <option>Bachelor&apos;s Degree</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>
                      Current Organization / Institution
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ministry of Foreign Affairs / UNECA" 
                      className="search-input-field"
                      value={formData.currentInstitution}
                      onChange={(e) => setFormData({ ...formData, currentInstitution: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>
                      LinkedIn or Academic Profile URL
                    </label>
                    <input 
                      type="url" 
                      placeholder="https://linkedin.com/in/username" 
                      className="search-input-field"
                      value={formData.linkedInUrl}
                      onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>
                    Upload Curriculum Vitae / Resume (PDF, DOCX — Max 10MB) *
                  </label>
                  <div style={{ padding: "16px", border: "1px dashed rgba(212,175,55,0.5)", borderRadius: "4px", textAlign: "center", background: "rgba(255,255,255,0.03)" }}>
                    <span style={{ fontSize: "20px" }}>📄</span>
                    <p style={{ margin: "4px 0", fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
                      Drag and drop your CV or click to browse
                    </p>
                    <input type="file" required accept=".pdf,.doc,.docx" style={{ fontSize: "12px", color: "#999" }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>
                    Executive Statement of Motivation & Leadership Intent (Max 500 words)
                  </label>
                  <textarea 
                    rows={4} 
                    placeholder="Summarize your alignment with AFLEX's mission to transform Pan-African public governance..." 
                    className="search-input-field"
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginTop: "4px" }}>
                  <input 
                    required 
                    type="checkbox" 
                    id="terms" 
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    style={{ marginTop: "3px" }}
                  />
                  <label htmlFor="terms" style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", lineHeight: "1.4" }}>
                    I certify that all credentials provided are accurate and authorize the AFLEX HR Appointments Board to conduct professional and academic background verifications.
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="button button-primary" 
                  style={{ marginTop: "12px", width: "100%", justifyContent: "center" }}
                >
                  <span>{submitting ? "Transmitting Dossier..." : "Submit Candidate Application"}</span>
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
