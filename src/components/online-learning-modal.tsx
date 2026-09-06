"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface LMSPortal {
  id: "executive" | "wild" | "civil-service";
  name: string;
  badge: string;
  theme: "gold" | "rose" | "blue";
  icon: string;
  quote?: string;
  quoteAuthor?: string;
  description: string;
  audience: string;
  features: string[];
  loginUrl: string;
  directLmsUrl: string;
}

export const lmsPortals: LMSPortal[] = [
  {
    id: "executive",
    name: "AFLEX Executive LMS",
    badge: "EXECUTIVE COHORT · ADVANCED LMS",
    theme: "gold",
    icon: "🏛️",
    description: "The primary learning management platform for senior ministers, state secretaries, and continental executive fellows.",
    audience: "Cabinet Ministers, Permanent Secretaries & Executive Fellows",
    features: [
      "Crisis simulation & war-room policy scenarios",
      "Confidential Chatham House cohort forums",
      "Executive reading lists & statecraft white papers"
    ],
    loginUrl: "/online-learning/login?portal=executive",
    directLmsUrl: "https://lms.aflexacademy.gov.et/login"
  },
  {
    id: "wild",
    name: "Project WILD · Women Leadership Portal",
    badge: "WOMEN IN STATECRAFT · FLOURISHING WISDOM",
    theme: "rose",
    icon: "🌹",
    quote: "“Like the desert rose that flourishes through stone, African women in statecraft lead with sovereign grace, unyielding wisdom, and transformative vision.”",
    quoteAuthor: "Project WILD · Women Integrated Leadership Development",
    description: "Dedicated learning sanctuary, applied transformation dashboard, and executive coaching hub for Africa's women leaders in governance.",
    audience: "Women Ministers, Judicial Fellows & Statecraft Directors",
    features: [
      "18-month applied institutional project tracker",
      "1-on-1 executive mentorship & coaching schedules",
      "Pan-African women leaders peer exchange network"
    ],
    loginUrl: "/online-learning/login?portal=wild",
    directLmsUrl: "https://wild.aflexacademy.gov.et/login"
  },
  {
    id: "civil-service",
    name: "Public Service Digital Academy",
    badge: "PUBLIC SERVICE EXCELLENCE · E-LEARNING",
    theme: "blue",
    icon: "📜",
    description: "Digital competency portal and asynchronous certifications for public servants, ministry directors, and regional bureau leaders.",
    audience: "Federal Civil Servants & Regional Department Heads",
    features: [
      "Digital government & anti-corruption credentials",
      "Public procurement & integrity masterclasses",
      "Self-paced civil service transformation modules"
    ],
    loginUrl: "/online-learning/login?portal=civil-service",
    directLmsUrl: "https://elearning.aflexacademy.gov.et/login"
  }
];

export function OnlineLearningModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedPortal, setSelectedPortal] = useState<LMSPortal | null>(null);
  const [loginStep, setLoginStep] = useState(false);
  const [authId, setAuthId] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePortalClick = (portal: LMSPortal) => {
    setSelectedPortal(portal);
    setLoginStep(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      setTimeout(() => {
        if (selectedPortal) {
          // Open LMS destination or redirect
          window.open(selectedPortal.directLmsUrl, "_blank", "noopener,noreferrer");
        }
      }, 1200);
    }, 1500);
  };

  return (
    <div
      className="lms-modal-overlay"
      onClick={() => {
        onClose();
        setLoginStep(false);
        setSelectedPortal(null);
        setAuthSuccess(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lms-modal-title"
    >
      <div
        className="lms-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          type="button"
          className="lms-modal-close-btn"
          onClick={() => {
            onClose();
            setLoginStep(false);
            setSelectedPortal(null);
            setAuthSuccess(false);
          }}
          aria-label="Close Online Learning modal"
        >
          ✕
        </button>

        {!loginStep ? (
          <div>
            {/* Modal Header */}
            <div className="lms-modal-header">
              <span className="mono eyebrow" style={{ color: "var(--gold)", letterSpacing: "1.5px" }}>
                AFLEX ACADEMY · DIGITAL LEARNING ECOSYSTEM
              </span>
              <h2 id="lms-modal-title">
                Online Learning &<br />
                <em>Student LMS Portals.</em>
              </h2>
              <p>
                Select your designated cohort portal below to access courses, policy labs, executive mentoring, and academic credentials.
              </p>
            </div>

            {/* 3 Portal Cards Grid */}
            <div className="lms-cards-grid">
              {lmsPortals.map((portal) => {
                const isWild = portal.id === "wild";

                return (
                  <div
                    key={portal.id}
                    className={`lms-portal-card ${isWild ? "lms-card-wild" : ""}`}
                    onClick={() => handlePortalClick(portal)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handlePortalClick(portal);
                      }
                    }}
                  >
                    {/* Rose Floral Motif Header for WILD Women Training Portal */}
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
                      {/* Badge */}
                      <span className={`lms-cohort-badge ${isWild ? "wild-tag" : ""}`}>
                        {portal.badge}
                      </span>

                      {/* Title */}
                      <h3 className="lms-card-title">
                        {portal.name}
                      </h3>

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

                      {/* Features */}
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

                      {/* CTA Button */}
                      <div className="lms-card-action">
                        <button
                          type="button"
                          className={`button ${isWild ? "button-wild-portal" : "button-primary"}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePortalClick(portal);
                          }}
                        >
                          <span>{isWild ? "🌹 Access WILD Portal Login" : "Access LMS Login"}</span>
                          <span>↗</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer Note */}
            <div className="lms-modal-footer">
              <span className="mono" style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>
                Need student credentials or forgotten your AFLEX SSO password?{" "}
                <Link href="/contact?subject=lms_support" onClick={onClose} style={{ color: "var(--gold)", textDecoration: "underline" }}>
                  Contact Digital Learning Support Desk ↗
                </Link>
              </span>
            </div>
          </div>
        ) : (
          /* Login Portal Screen */
          selectedPortal && (
            <div className="lms-login-screen">
              <button
                type="button"
                className="lms-back-btn"
                onClick={() => {
                  setLoginStep(false);
                  setAuthSuccess(false);
                }}
              >
                ← Back to All Portals
              </button>

              <div className="lms-login-card-container">
                {selectedPortal.id === "wild" && (
                  <div className="wild-floral-login-header">
                    <div className="wild-floral-icons">🌹 🌸 🌺 🌸 🌹</div>
                    <span className="mono" style={{ color: "#f43f5e", fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>
                      PROJECT WILD · WOMEN IN LEADERSHIP & STATECRAFT
                    </span>
                    <p className="wild-login-quote">
                      {selectedPortal.quote}
                    </p>
                  </div>
                )}

                <div className="lms-login-header">
                  <span className="mono eyebrow" style={{ color: selectedPortal.id === "wild" ? "#fb7185" : "var(--gold)" }}>
                    {selectedPortal.badge}
                  </span>
                  <h2>{selectedPortal.name}</h2>
                  <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "14px" }}>
                    Sign in with your official AFLEX credentials or Ethiopian Federal SSO.
                  </p>
                </div>

                {authSuccess ? (
                  <div className="lms-auth-success">
                    <span style={{ fontSize: "36px" }}>{selectedPortal.id === "wild" ? "🌹" : "✓"}</span>
                    <h3 style={{ color: "#fff", margin: "12px 0 6px" }}>Authentication Successful</h3>
                    <p style={{ color: "var(--gold)", fontSize: "14px" }}>
                      Redirecting you securely to your dedicated cohort LMS dashboard...
                    </p>
                    <a
                      href={selectedPortal.directLmsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-primary"
                      style={{ marginTop: "16px", display: "inline-flex" }}
                    >
                      <span>Click here if not redirected automatically</span>
                      <span>↗</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleLoginSubmit} className="lms-login-form">
                    <div className="lms-form-group">
                      <label htmlFor="authId" className="mono">
                        AFLEX ID / STUDENT USERNAME
                      </label>
                      <input
                        id="authId"
                        type="text"
                        required
                        value={authId}
                        onChange={(e) => setAuthId(e.target.value)}
                        placeholder="e.g. AFX-2026-WILD-409"
                      />
                    </div>

                    <div className="lms-form-group">
                      <label htmlFor="authPassword" className="mono">
                        PASSWORD / TOKEN
                      </label>
                      <input
                        id="authPassword"
                        type="password"
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••••••"
                      />
                    </div>

                    <div className="lms-form-actions">
                      <button
                        type="submit"
                        disabled={isAuthenticating}
                        className={`button ${selectedPortal.id === "wild" ? "button-wild-portal" : "button-primary"}`}
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        <span>{isAuthenticating ? "Authenticating SSO..." : `Log In to ${selectedPortal.name}`}</span>
                        <span>↗</span>
                      </button>

                      <div style={{ textAlign: "center", margin: "14px 0", position: "relative" }}>
                        <span style={{ background: "#050507", padding: "0 10px", color: "rgba(255, 255, 255, 0.5)", fontSize: "11px" }}>
                          OR SIGN IN WITH
                        </span>
                      </div>

                      <a
                        href={selectedPortal.directLmsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-outline light"
                        style={{ width: "100%", justifyContent: "center", fontSize: "13px" }}
                      >
                        <span>Federal GovID / Fayda SSO Login</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
