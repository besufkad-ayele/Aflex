"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  portalLinks,
  qrImageUrl,
  socialChannels,
  type SocialChannel,
} from "@/lib/social-links";

type QrTarget =
  | { kind: "portal"; id: "portal" | "programs" }
  | { kind: "social"; id: string };

const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  x: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  telegram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z" />
    </svg>
  ),
  youtube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  tiktok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.68a8.2 8.2 0 0 0 4.76 1.52V6.74a4.85 4.85 0 0 1-1-.05z" />
    </svg>
  ),
};

function resolveTarget(target: QrTarget) {
  if (target.kind === "portal") {
    const item = target.id === "programs" ? portalLinks.programs : portalLinks.website;
    return {
      title: item.name,
      url: item.url,
      description: item.description,
      badge: item.badge,
      handle: item.handle,
    };
  }
  const channel = socialChannels.find((c) => c.id === target.id) ?? socialChannels[0];
  return {
    title: channel.name,
    url: channel.url,
    description: channel.description,
    badge: channel.handle,
    handle: channel.handle,
  };
}

export function FloatingQuickConnect() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<QrTarget>({ kind: "social", id: "telegram" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const active = useMemo(() => resolveTarget(activeTarget), [activeTarget]);
  const qrSrc = useMemo(() => qrImageUrl(active.url, 220), [active.url]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const selectSocial = (channel: SocialChannel) => {
    setActiveTarget({ kind: "social", id: channel.id });
  };

  return (
    <>
      <aside className="aflex-floating-wrapper" aria-label="AFLEX Quick Connect and QR Hub">
        <button
          type="button"
          className={`aflex-floating-trigger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          title="Open AFLEX Quick QR & Social Media Gateway"
        >
          <div className="aflex-floating-pulse" />
          <div className="aflex-floating-icon">
            {isOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <path d="M14 14h2v2h-2z" fill="currentColor" stroke="none" />
                <path d="M19 14h2v2h-2z" fill="currentColor" stroke="none" />
                <path d="M14 19h2v2h-2z" fill="currentColor" stroke="none" />
                <path d="M19 19h2v2h-2z" fill="currentColor" stroke="none" />
              </svg>
            )}
          </div>
          <span className="aflex-floating-label">
            <strong>CONNECT</strong>
            <small>QR & Socials</small>
          </span>
        </button>
      </aside>

      {isOpen && (
        <div className="aflex-connect-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="aflex-connect-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="connect-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aflex-connect-header">
              <div className="aflex-connect-brand">
                <span className="seal" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <div>
                  <h3 id="connect-modal-title">AFLEX Digital Gateway</h3>
                  <p>African Leadership Excellence Academy · Sululta</p>
                </div>
              </div>
              <button
                type="button"
                className="aflex-connect-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="aflex-connect-body">
              <div className="aflex-qr-card">
                <div className="aflex-qr-tabs">
                  <button
                    type="button"
                    className={`aflex-qr-tab ${activeTarget.kind === "portal" && activeTarget.id === "portal" ? "active" : ""}`}
                    onClick={() => setActiveTarget({ kind: "portal", id: "portal" })}
                  >
                    Website
                  </button>
                  <button
                    type="button"
                    className={`aflex-qr-tab ${activeTarget.kind === "portal" && activeTarget.id === "programs" ? "active" : ""}`}
                    onClick={() => setActiveTarget({ kind: "portal", id: "programs" })}
                  >
                    Programs
                  </button>
                  <button
                    type="button"
                    className={`aflex-qr-tab ${activeTarget.kind === "social" ? "active" : ""}`}
                    onClick={() =>
                      setActiveTarget({
                        kind: "social",
                        id: activeTarget.kind === "social" ? activeTarget.id : "telegram",
                      })
                    }
                  >
                    Socials
                  </button>
                </div>

                <div className="aflex-qr-display-box">
                  <div className="aflex-qr-frame">
                    <Image
                      unoptimized
                      key={active.url}
                      className="aflex-qr-image"
                      src={qrSrc}
                      alt={`QR code for ${active.title}: ${active.url}`}
                      width={180}
                      height={180}
                    />
                    <div className="aflex-qr-scan-line" />
                  </div>

                  <div className="aflex-qr-info">
                    <span className="aflex-qr-badge">{active.badge}</span>
                    <h4>{active.title}</h4>
                    <p>{active.description}</p>
                    <p className="aflex-qr-url mono">{active.url}</p>
                    <div className="aflex-qr-actions">
                      <button type="button" className="aflex-btn-copy" onClick={handleCopy}>
                        {copied ? "✓ Link Copied" : "Copy Link"}
                      </button>
                      <a
                        href={active.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aflex-btn-launch"
                      >
                        Open ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="aflex-social-hub">
                <div className="aflex-social-hub-title">
                  <span>ALL-IN-ONE CHANNELS</span>
                  <small>Select a channel to generate its QR · then scan or open</small>
                </div>

                <div className="aflex-social-grid">
                  {socialChannels.map((social) => {
                    const isActive =
                      activeTarget.kind === "social" && activeTarget.id === social.id;
                    return (
                      <button
                        key={social.id}
                        type="button"
                        className={`aflex-social-tile ${isActive ? "active" : ""}`}
                        style={
                          {
                            "--brand-color": social.color,
                            "--brand-bg": social.bgHover,
                            "--brand-border": social.borderHover,
                          } as React.CSSProperties
                        }
                        onClick={() => selectSocial(social)}
                        aria-pressed={isActive}
                      >
                        <div className="aflex-social-tile-icon">{socialIcons[social.id]}</div>
                        <div className="aflex-social-tile-text">
                          <strong>{social.name}</strong>
                          <small>{social.handle}</small>
                        </div>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aflex-social-tile-arrow"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open ${social.name}`}
                        >
                          ↗
                        </a>
                      </button>
                    );
                  })}
                </div>

                <div className="aflex-direct-contacts">
                  <div className="aflex-contact-item">
                    <span className="aflex-contact-icon">📞</span>
                    <div>
                      <strong>Academy Hotline</strong>
                      <a href="tel:+251111261200">+251 11 126 1200</a>
                    </div>
                  </div>
                  <div className="aflex-contact-item">
                    <span className="aflex-contact-icon">✉️</span>
                    <div>
                      <strong>General Inquiries</strong>
                      <a href="mailto:info@aflexacademy.gov.et">info@aflexacademy.gov.et</a>
                    </div>
                  </div>
                  <div className="aflex-contact-item">
                    <span className="aflex-contact-icon">📍</span>
                    <div>
                      <strong>Sululta Campus</strong>
                      <span>Oromia, Ethiopia · 2,450m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="aflex-connect-footer">
              <span>Federal Democratic Republic of Ethiopia · African Leadership Excellence Academy</span>
              <span className="mono">AFLEX / GATEWAY 2026</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
