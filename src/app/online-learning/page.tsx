"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { lmsPortals, type LMSPortal } from "@/components/online-learning-modal";

export default function OnlineLearningPage() {
  const [selectedPortal, setSelectedPortal] = useState<LMSPortal | null>(null);
  const [authId, setAuthId] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handlePortalClick = (portal: LMSPortal) => {
    setSelectedPortal(portal);
    setAuthSuccess(false);
    // Smooth scroll to login section
    setTimeout(() => {
      document.getElementById("login-box")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      setTimeout(() => {
        if (selectedPortal) {
          window.open(selectedPortal.directLmsUrl, "_blank", "noopener,noreferrer");
        }
      }, 1200);
    }, 1500);
  };

  return (
    <>
      <SiteHeader active="Programs" />
      <main id="main-content">
        {/* Page Header */}
        <section className="page-header blue-section">
          <div className="container">
            <span className="mono breadcrumb">HOME <b>/</b> ONLINE LEARNING & LMS</span>
            <h1>Online Learning &<br /><em>Student LMS.</em></h1>
            <p>Access your designated AFLEX learning portal, asynchronous modules, policy labs, and leadership coaching.</p>
          </div>
                  </section>

        {/* Portals Showcase Section */}
        <section className="section black-section online-learning-portals" style={{ background: "var(--coffee)", color: "#fff", padding: "80px 0" }}>
          <div className="container">
            <div className="section-heading" style={{ maxWidth: "800px", marginBottom: "48px" }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>
                SELECT YOUR COHORT PORTAL
              </span>
              <h2 style={{ color: "#ffffff" }}>
                Choose your learning<br />
                <em style={{ color: "var(--gold)" }}>pathway & sign in.</em>
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "16px", marginTop: "12px" }}>
                Each AFLEX program operates a specialized digital ecosystem tailored to the confidential deliberations and applied projects of its cohort.
              </p>
            </div>

            {/* 3 LMS Cards */}
            <div className="lms-cards-grid" style={{ marginBottom: "60px" }}>
              {lmsPortals.map((portal) => {
                const isWild = portal.id === "wild";
                const isSelected = selectedPortal?.id === portal.id;

                return (
                  <div
                    key={portal.id}
                    className={`lms-portal-card ${isWild ? "lms-card-wild" : ""} ${isSelected ? "lms-card-selected" : ""}`}
                    onClick={() => handlePortalClick(portal)}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                  >
                    {/* Rose Floral Banner for WILD */}
                    {isWild && (
                      <div className="wild-floral-banner">
                        <div className="wild-floral-watermark">🌹 🌸 🌺</div>
                        <div className="wild-floral-badge-row">
                          <span className="wild-rose-icon">🌹</span>
                          <span className="wild-badge-text">WOMEN LEADERSHIP PORTAL</span>
                          <span className="wild-flower-icon">🌸</span>
                        </div>
                      </div>
                    )}

                    <div className="lms-card-content">
                      <span className={`lms-cohort-badge ${isWild ? "wild-tag" : ""}`}>
                        {portal.badge}
                      </span>

                      <h3 className="lms-card-title">{portal.name}</h3>

                      {/* Leadership Motivation Quote for Women Portal */}
                      {isWild && portal.quote && (
                        <div className="wild-motivation-box">
                          <div className="wild-flower-decor">
                            <span>🌸</span>
                            <span className="wild-decor-line" />
                            <span>🌹</span>
                          </div>
                          <blockquote>{portal.quote}</blockquote>
                          <cite>— {portal.quoteAuthor}</cite>
                        </div>
                      )}

                      <p className="lms-card-desc">{portal.description}</p>

                      <div className="lms-card-features">
                        <span className="mono lms-features-label">PORTAL CAPABILITIES:</span>
                        <ul>
                          {portal.features.map((feat, idx) => (
                            <li key={idx}>
                              <span className="lms-bullet">{isWild ? "🌸" : "✦"}</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="lms-card-action">
                        <button
                          type="button"
                          className={`button ${isWild ? "button-wild-portal" : "button-primary"}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePortalClick(portal);
                          }}
                        >
                          <span>{isWild ? "🌹 Sign In to WILD Portal" : "Sign In to LMS"}</span>
                          <span>↗</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Login Box Section */}
            {selectedPortal && (
              <div id="login-box" style={{ maxWidth: "680px", margin: "0 auto", scrollMarginTop: "120px" }}>
                <div style={{ background: "#050507", border: `1px solid ${selectedPortal.id === "wild" ? "rgba(244, 63, 94, 0.4)" : "rgba(212, 175, 55, 0.3)"}`, borderRadius: "8px", padding: "40px 32px" }}>
                  {selectedPortal.id === "wild" && (
                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                      <div style={{ fontSize: "28px", letterSpacing: "8px" }}>🌹 🌸 🌺 🌸 🌹</div>
                      <span className="mono" style={{ color: "#f43f5e", fontSize: "12px", fontWeight: 700, letterSpacing: "1px", display: "block", marginTop: "8px" }}>
                        PROJECT WILD · WOMEN IN STATECRAFT & LEADERSHIP
                      </span>
                    </div>
                  )}

                  <div style={{ textAlign: "center", marginBottom: "28px" }}>
                    <span className="mono eyebrow" style={{ color: selectedPortal.id === "wild" ? "#fb7185" : "var(--gold)" }}>
                      AUTHENTICATION · {selectedPortal.badge}
                    </span>
                    <h2 style={{ fontSize: "28px", color: "#fff", margin: "8px 0" }}>
                      Sign In to {selectedPortal.name}
                    </h2>
                    <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "14px" }}>
                      Enter your AFLEX Student ID / Fellow Username to redirect to your active session.
                    </p>
                  </div>

                  {authSuccess ? (
                    <div style={{ textAlign: "center", padding: "32px 20px", background: "rgba(212, 175, 55, 0.08)", border: "1px solid var(--gold)", borderRadius: "6px" }}>
                      <span style={{ fontSize: "40px" }}>{selectedPortal.id === "wild" ? "🌹" : "✓"}</span>
                      <h3 style={{ color: "#fff", margin: "14px 0 8px" }}>Authentication Successful</h3>
                      <p style={{ color: "var(--gold)", fontSize: "14px", marginBottom: "16px" }}>
                        Opening secure LMS session for {selectedPortal.name}...
                      </p>
                      <a
                        href={selectedPortal.directLmsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-primary"
                        style={{ display: "inline-flex" }}
                      >
                        <span>Click here to enter LMS</span>
                        <span>↗</span>
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleLoginSubmit} className="lms-login-form">
                      <div className="lms-form-group">
                        <label htmlFor="pageAuthId" className="mono">
                          AFLEX ID / STUDENT USERNAME
                        </label>
                        <input
                          id="pageAuthId"
                          type="text"
                          required
                          value={authId}
                          onChange={(e) => setAuthId(e.target.value)}
                          placeholder="e.g. AFX-2026-EXECUTIVE-102"
                        />
                      </div>

                      <div className="lms-form-group">
                        <label htmlFor="pageAuthPassword" className="mono">
                          PASSWORD / ACCESS TOKEN
                        </label>
                        <input
                          id="pageAuthPassword"
                          type="password"
                          required
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          placeholder="••••••••••••"
                        />
                      </div>

                      <div className="lms-form-actions" style={{ marginTop: "24px" }}>
                        <button
                          type="submit"
                          disabled={isAuthenticating}
                          className={`button ${selectedPortal.id === "wild" ? "button-wild-portal" : "button-primary"}`}
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          <span>{isAuthenticating ? "Verifying Credentials..." : `Proceed to ${selectedPortal.name} Login`}</span>
                          <span>↗</span>
                        </button>

                        <div style={{ textAlign: "center", margin: "16px 0", position: "relative" }}>
                          <span style={{ background: "#050507", padding: "0 10px", color: "rgba(255, 255, 255, 0.5)", fontSize: "11px" }}>
                            OR DIRECT SSO
                          </span>
                        </div>

                        <a
                          href={selectedPortal.directLmsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button button-outline light"
                          style={{ width: "100%", justifyContent: "center", fontSize: "13px" }}
                        >
                          <span>Direct Link to {selectedPortal.name} Login</span>
                          <span>↗</span>
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
