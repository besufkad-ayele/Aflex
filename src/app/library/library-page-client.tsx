"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteHeader, SiteFooter, Weave } from "@/components/site-shell";
import { libraryResources as resources } from "@/lib/library-data";

const CATEGORY_ALIASES: Record<string, string> = {
  reports: "Policy Brief",
  research: "Executive Monograph",
  archive: "Historical Archive",
  thesis: "Applied Thesis",
  "policy-brief": "Policy Brief",
  "historical-archive": "Historical Archive",
  "executive-monograph": "Executive Monograph",
  "applied-thesis": "Applied Thesis",
};

function resolveCategory(raw: string | null): string {
  if (!raw) return "All Categories";
  const decoded = decodeURIComponent(raw).trim();
  if (decoded.toLowerCase() === "all" || decoded === "All Categories") {
    return "All Categories";
  }
  const alias = CATEGORY_ALIASES[decoded.toLowerCase()];
  if (alias) return alias;
  const exact = [
    "Policy Brief",
    "Historical Archive",
    "Executive Monograph",
    "Applied Thesis",
  ].find((c) => c.toLowerCase() === decoded.toLowerCase());
  return exact || "All Categories";
}

export default function LibraryPage() {
  const searchParams = useSearchParams();
  const initialCategory = resolveCategory(searchParams.get("category"));
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const categories = [
    "All Categories",
    "Policy Brief",
    "Historical Archive",
    "Executive Monograph",
    "Applied Thesis"
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchesCat = selectedCategory === "All Categories" || res.category === selectedCategory;
      const matchesSearch =
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const partnerDatabases = [
    {
      name: "African Union Digital Library",
      desc: "Access 40,000+ continental treaties, assembly resolutions, and diplomatic archives.",
      badge: "AU Official",
      url: "https://archives.au.int"
    },
    {
      name: "JSTOR Leadership & Social Sciences",
      desc: "Full-text access to 2,800+ top-tier academic journals in political economy and governance.",
      badge: "Subscription Peer-Review",
      url: "https://www.jstor.org"
    },
    {
      name: "UNECA Knowledge Repository",
      desc: "United Nations Economic Commission for Africa research, macroeconomic reports, and statistics.",
      badge: "UN Partner",
      url: "https://repository.uneca.org"
    },
    {
      name: "Research4Life Global Commons",
      desc: "Multidisciplinary academic collections for developing nations and research institutions.",
      badge: "Global Access",
      url: "https://www.research4life.org"
    }
  ];

  return (
    <>
      <SiteHeader active="Services" />
      <main id="main-content">
        {/* Header Banner */}
        <section className="page-header blue-section">
          <div className="container">
            <span className="mono breadcrumb">HOME <b>/</b> LIBRARY & RESEARCH REPOSITORY</span>
            <h1>Knowledge for Africa&apos;s<br /><em>Renaissance.</em></h1>
            <p>
              The AFLEX Library & Knowledge Center serves as the continental intellectual repository for statecraft, public administration, historical treaties, and policy advisory studies.
            </p>

            <div style={{ display: "flex", gap: "24px", marginTop: "28px", flexWrap: "wrap" }}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,175,55,0.3)", padding: "12px 20px", borderRadius: "4px" }}>
                <span className="mono" style={{ color: "var(--gold)", fontSize: "20px", fontWeight: 700, display: "block" }}>25,000+</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>Volumes in Sululta</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,175,55,0.3)", padding: "12px 20px", borderRadius: "4px" }}>
                <span className="mono" style={{ color: "var(--gold)", fontSize: "20px", fontWeight: 700, display: "block" }}>4 Multilateral</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>E-Journal Databases</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,175,55,0.3)", padding: "12px 20px", borderRadius: "4px" }}>
                <span className="mono" style={{ color: "var(--gold)", fontSize: "20px", fontWeight: 700, display: "block" }}>24/7 Access</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>For Enrolled Fellows</span>
              </div>
            </div>
          </div>
          <Weave dark />
        </section>

        {/* Digital Repository Search & Explorer */}
        <section className="section" style={{ background: "#f0f5fd", color: "#024696", padding: "64px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "760px", marginBottom: "32px" }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>DIGITAL REPOSITORY & POLICY BRIEFS</span>
              <h2 style={{ fontSize: "28px", margin: "8px 0 12px" }}>Search Academy Publications & Historical Archives</h2>
              <p style={{ color: "rgba(2,70,150,0.6)", fontSize: "15px" }}>
                Filter our growing repository of open-access policy briefs, executive monographs, and Pan-African historical collections.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "32px" }}>
              <div className="filter-bar" style={{ margin: 0 }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                    type="button"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ position: "relative", minWidth: "280px", flex: "1", maxWidth: "420px" }}>
                <input
                  type="text"
                  placeholder="Search by title, author, topic, or keyword..."
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

            {/* Resources Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "24px" }}>
              {filteredResources.map((res) => (
                <div
                  key={res.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span className="mono" style={{ color: "var(--gold)", fontSize: "11px", fontWeight: 700 }}>
                      {res.category.toUpperCase()}
                    </span>
                    <span className="mono" style={{ color: "#94a3b8", fontSize: "11px" }}>
                      {res.year} · {res.pages}
                    </span>
                  </div>

                  <h3 style={{ margin: "0 0 10px", fontSize: "19px", lineHeight: "1.35", color: "#0f172a" }}>
                    {res.title}
                  </h3>

                  <p style={{ fontSize: "13px", color: "var(--gold)", fontWeight: 600, margin: "0 0 12px" }}>
                    By {res.author}
                  </p>

                  <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: "0 0 20px", flex: 1 }}>
                    {res.abstract}
                  </p>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                    {res.keywords.map((kw, idx) => (
                      <span key={idx} style={{ background: "#f1f5f9", color: "#475569", fontSize: "11px", padding: "3px 8px", borderRadius: "2px" }}>
                        #{kw}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "10px", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                    <button
                      type="button"
                      onClick={() => alert(`Downloading document: ${res.title} (PDF)`)}
                      className="button button-primary"
                      style={{ padding: "8px 16px", fontSize: "12px" }}
                    >
                      <span>Download PDF</span>
                      <span>↓</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(`${res.author} (${res.year}). "${res.title}". AFLEX Academy Repository.`);
                        alert("Citation copied to clipboard (APA Format)");
                      }}
                      className="button button-outline"
                      style={{ padding: "8px 14px", fontSize: "12px" }}
                    >
                      <span>Cite 📋</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div style={{ padding: "64px 24px", textAlign: "center", background: "#fff", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "36px", display: "block", marginBottom: "12px" }}>📖</span>
                <h3 style={{ margin: "0 0 8px", fontSize: "20px" }}>No documents found matching &ldquo;{searchQuery}&rdquo;</h3>
                <p style={{ color: "rgba(2,70,150,0.6)", maxWidth: "480px", margin: "0 auto 20px", fontSize: "14px" }}>
                  Our research librarians can assist you in locating specific policy briefs or historical documents.
                </p>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => setConsultModalOpen(true)}
                >
                  <span>Request Document from Librarian</span>
                  <span>↗</span>
                </button>
              </div>
            )}

            {/* External Partner Databases Section */}
            <div style={{ marginTop: "80px" }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>INSTITUTIONAL ALLIANCES</span>
              <h2 style={{ fontSize: "28px", margin: "8px 0 16px" }}>Partner Subscription Databases</h2>
              <p style={{ color: "rgba(2,70,150,0.6)", fontSize: "15px", maxWidth: "700px", marginBottom: "32px" }}>
                Enrolled fellows, visiting faculty, and researchers have full federated single-sign-on (SSO) access to leading international databases:
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                {partnerDatabases.map((db, idx) => (
                  <div key={idx} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span className="mono" style={{ color: "#0f3b2e", background: "rgba(15, 59, 46, 0.08)", padding: "3px 8px", borderRadius: "2px", fontSize: "11px", fontWeight: 700 }}>
                        {db.badge}
                      </span>
                    </div>
                    <h3 style={{ margin: "0 0 8px", fontSize: "18px", color: "#0f172a" }}>{db.name}</h3>
                    <p style={{ fontSize: "13px", color: "rgba(2,70,150,0.6)", lineHeight: "1.5", margin: "0 0 16px" }}>{db.desc}</p>
                    <a
                      href={db.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                      style={{ fontSize: "13px" }}
                    >
                      Access Database Portal <span>↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Sululta Physical Facility Overview */}
            <div style={{ marginTop: "80px", padding: "48px 40px", background: "#050508", color: "#fff", borderRadius: "6px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
                <div>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>ON-CAMPUS FACILITIES</span>
                  <h2 style={{ fontSize: "28px", color: "#fff", margin: "8px 0 16px" }}>
                    The Sululta Academy Physical Library
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
                    Situated at the heart of the Sululta highlands, our two-story library complex offers an inspiring sanctuary for deep scholarly reflection, group policy debates, and archival preservation.
                  </p>

                  <div style={{ display: "grid", gap: "12px", fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span style={{ color: "var(--gold)" }}>✦</span>
                      <span><strong>Executive Reading Lounge:</strong> Silent zone overlooking mountain vistas.</span>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span style={{ color: "var(--gold)" }}>✦</span>
                      <span><strong>Syndicate Pods:</strong> Sound-insulated deliberation rooms with smart monitors.</span>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span style={{ color: "var(--gold)" }}>✦</span>
                      <span><strong>24/7 Digital Hub:</strong> High-bandwidth fiber connectivity with printing and scanning.</span>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span style={{ color: "var(--gold)" }}>✦</span>
                      <span><strong>Rare African Manuscripts:</strong> Preserved treaties, maps, and state proclamations.</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", marginTop: "32px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="button button-primary"
                      onClick={() => setConsultModalOpen(true)}
                    >
                      <span>Book Research Consultation</span>
                      <span>↗</span>
                    </button>
                    <button
                      type="button"
                      className="button button-outline light"
                      onClick={() => setRequestModalOpen(true)}
                    >
                      <span>Request Book Acquisition</span>
                      <span>+</span>
                    </button>
                  </div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "6px", padding: "32px" }}>
                  <h3 style={{ fontSize: "20px", color: "var(--gold)", margin: "0 0 16px" }}>Operating Hours & Access</h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>
                    <div>
                      <strong style={{ color: "#fff", display: "block" }}>Monday – Friday</strong>
                      <span>Main Circulation Desk: 08:00 AM – 09:00 PM</span>
                    </div>
                    <div>
                      <strong style={{ color: "#fff", display: "block" }}>Saturday – Sunday</strong>
                      <span>Weekend Reading Rooms: 09:00 AM – 06:00 PM</span>
                    </div>
                    <div>
                      <strong style={{ color: "#fff", display: "block" }}>Resident Fellows 24/7 Badge Access</strong>
                      <span>Digital Lab & Quiet Pods open continuously during active training cohorts.</span>
                    </div>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "12px" }}>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                        Library Inquiries: <strong style={{ color: "var(--gold)" }}>library@aflex.gov.et</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Book Acquisition Request Modal */}
      {requestModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" onClick={() => setRequestModalOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={{ padding: "36px", maxWidth: "560px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>LIBRARY SERVICES</span>
                <h3 style={{ margin: "6px 0 0", fontSize: "22px" }}>Request Book / Resource Acquisition</h3>
              </div>
              <button 
                type="button" 
                onClick={() => { setRequestModalOpen(false); setRequestSubmitted(false); }}
                style={{ background: "none", border: "none", color: "white", fontSize: "24px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {requestSubmitted ? (
              <div style={{ padding: "32px 20px", textAlign: "center", background: "rgba(212, 175, 55, 0.08)", border: "1px solid var(--gold)", borderRadius: "4px" }}>
                <span style={{ fontSize: "40px" }}>✓</span>
                <h3 style={{ color: "#fff", margin: "14px 0 8px" }}>Acquisition Request Received</h3>
                <p style={{ color: "var(--gold)", fontSize: "14px" }}>
                  Your book/journal requisition has been logged with the AFLEX Chief Librarian.
                </p>
                <button 
                  type="button" 
                  className="button button-primary"
                  onClick={() => { setRequestModalOpen(false); setRequestSubmitted(false); }}
                  style={{ marginTop: "16px" }}
                >
                  Close <span>✓</span>
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => { e.preventDefault(); setRequestSubmitted(true); }}
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Full Name *</label>
                  <input required placeholder="Your Name" className="search-input-field" />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Email / AFLEX Student ID *</label>
                  <input required type="email" placeholder="you@aflex.gov.et" className="search-input-field" />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Book / Publication Title *</label>
                  <input required placeholder="Title of Book, Monograph, or Journal" className="search-input-field" />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Author & ISBN (if known)</label>
                  <input placeholder="e.g. Chinua Achebe / ISBN 978-..." className="search-input-field" />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Justification / Relevance to Program</label>
                  <textarea rows={2} placeholder="Explain how this resource supports your research or cohort curriculum..." className="search-input-field" />
                </div>
                <button type="submit" className="button button-primary" style={{ marginTop: "8px", width: "100%", justifyContent: "center" }}>
                  <span>Submit Requisition</span>
                  <span>↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Research Consultation Modal */}
      {consultModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" onClick={() => setConsultModalOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={{ padding: "36px", maxWidth: "560px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>SCHOLARLY SUPPORT</span>
                <h3 style={{ margin: "6px 0 0", fontSize: "22px" }}>Book Research Consultation</h3>
              </div>
              <button 
                type="button" 
                onClick={() => { setConsultModalOpen(false); setConsultSubmitted(false); }}
                style={{ background: "none", border: "none", color: "white", fontSize: "24px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {consultSubmitted ? (
              <div style={{ padding: "32px 20px", textAlign: "center", background: "rgba(212, 175, 55, 0.08)", border: "1px solid var(--gold)", borderRadius: "4px" }}>
                <span style={{ fontSize: "40px" }}>✓</span>
                <h3 style={{ color: "#fff", margin: "14px 0 8px" }}>Consultation Confirmed</h3>
                <p style={{ color: "var(--gold)", fontSize: "14px" }}>
                  A Senior Research Librarian will contact you within 24 hours to schedule your session.
                </p>
                <button 
                  type="button" 
                  className="button button-primary"
                  onClick={() => { setConsultModalOpen(false); setConsultSubmitted(false); }}
                  style={{ marginTop: "16px" }}
                >
                  Close <span>✓</span>
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => { e.preventDefault(); setConsultSubmitted(true); }}
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Full Name *</label>
                  <input required placeholder="Your Name" className="search-input-field" />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Email *</label>
                  <input required type="email" placeholder="you@institution.gov.et" className="search-input-field" />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Research Topic / Subject Area *</label>
                  <input required placeholder="e.g. Pan-African Peace Architecture / Trade Integration" className="search-input-field" />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "4px" }}>Preferred Consultation Mode</label>
                  <select className="search-input-field" style={{ background: "#ffffff", color: "#024696", borderColor: "rgba(2,70,150,0.25)" }}>
                    <option>In-Person at Sululta Library Consultation Suite</option>
                    <option>Virtual Video Conference (Zoom / Teams)</option>
                    <option>Email Literature Package Delivery</option>
                  </select>
                </div>
                <button type="submit" className="button button-primary" style={{ marginTop: "8px", width: "100%", justifyContent: "center" }}>
                  <span>Schedule Consultation</span>
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
