"use client";

import Link from "next/link";
import { SiteFooter, SiteHeader, Weave } from "@/components/site-shell";
import { useState } from "react";
import { academyEvents, type AcademyEvent } from "@/lib/events-data";
import { newsArticles, type NewsItem } from "@/lib/news-data";

export default function NewsEventsPage() {
  const [newsCategory, setNewsCategory] = useState<string>("ALL");
  const [selectedEvent, setSelectedEvent] = useState<AcademyEvent | null>(null);

  const filteredNews = newsCategory === "ALL"
    ? newsArticles
    : newsArticles.filter((item) => item.category === newsCategory);

  return (
    <>
      <SiteHeader active="News & Events" />
      <main id="main-content">
        {/* Page Header */}
        <section className="page-header blue-section">
          <div className="container">
            <span className="mono breadcrumb">HOME <b>/</b> NEWS & EVENTS</span>
            <h1>News &<br /><em>Events.</em></h1>
            <p>Stay informed about the latest developments, insights, and upcoming programs at AFLEX Academy.</p>
          </div>
          <Weave dark />
        </section>

        {/* Section 1: LATEST UPDATES · Academy News */}
        <section className="section" style={{ background: "#050507", color: "#ffffff", padding: "80px 0" }}>
          <div className="container">
            <div className="section-heading" style={{ maxWidth: "800px", marginBottom: "36px" }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>
                LATEST UPDATES
              </span>
              <h2>
                Academy<br />
                <em>News.</em>
              </h2>
            </div>

            {/* Category Filter Bar */}
            <div className="leadership-filter-bar" style={{ marginBottom: "40px" }}>
              {["ALL", "ACADEMY", "CAMPUS", "INSIGHT", "RESEARCH"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`leadership-filter-btn ${newsCategory === cat ? "active" : ""}`}
                  onClick={() => setNewsCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* News Items Grid */}
            <div className="news-detailed-grid">
              {filteredNews.map((item) => (
                <article className="news-editorial-card" key={item.slug}>
                  <div className="news-editorial-thumb">
                    <img src={item.image} alt={item.title} />
                    <span className="news-editorial-badge">{item.category}</span>
                  </div>

                  <div className="news-editorial-body">
                    <div className="news-editorial-meta">
                      <span className="news-editorial-category-label">{item.category}</span>
                      <span className="mono news-editorial-date-label">{item.date}</span>
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>

                    <div className="news-editorial-footer" style={{ marginTop: "auto", paddingTop: "16px" }}>
                      <Link className="text-link news-read-more-link" href={`/news/${item.slug}`}>
                        <span>Read more</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: UPCOMING · Academy Events */}
        <section className="section" id="events" style={{ background: "#000000", color: "#ffffff", padding: "80px 0", borderTop: "1px solid rgba(212, 175, 55, 0.2)" }}>
          <div className="container">
            <div className="section-heading" style={{ maxWidth: "800px", marginBottom: "44px" }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>
                UPCOMING
              </span>
              <h2>
                Academy<br />
                <em>Events.</em>
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "16px", marginTop: "12px" }}>
                Join us for leadership programs, forums, and learning opportunities throughout the year.
              </p>
            </div>

            {/* Upcoming Events List */}
            <div className="academy-events-stack">
              {academyEvents.map((event) => (
                <article key={event.id} className="academy-event-row-card">
                  <div className="academy-event-date-col">
                    <span className="mono academy-event-date-text">{event.dateRange}</span>
                  </div>

                  <div className="academy-event-info-col">
                    <h3 className="academy-event-title">{event.title}</h3>
                    <div className="academy-event-meta-line">
                      <span className="academy-event-type-pill">{event.type}</span>
                      <span className="mono academy-event-location-text">📍 {event.location}</span>
                    </div>
                    <p className="academy-event-desc-text">{event.description}</p>
                  </div>

                  <div className="academy-event-actions-col">
                    <Link
                      className="button button-primary academy-event-cta-btn"
                      href={`/contact?event=${event.id}`}
                    >
                      <span>Register interest</span>
                      <span>→</span>
                    </Link>
                    <button
                      type="button"
                      className="button button-outline light"
                      onClick={() => setSelectedEvent(event)}
                      style={{ fontSize: "12px", padding: "8px 16px" }}
                    >
                      <span>Agenda Details</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Modal for Event Agenda / Details */}
        {selectedEvent && (
          <div
            className="leader-detail-overlay"
            onClick={() => setSelectedEvent(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="leader-detail-modal"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "780px", maxHeight: "90vh", overflowY: "auto" }}
            >
              <button
                type="button"
                className="leader-modal-close"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close event modal"
              >
                ✕
              </button>

              <div style={{ padding: "36px 32px" }}>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>
                  {selectedEvent.type.toUpperCase()} · {selectedEvent.dateRange}
                </span>
                <h2 style={{ fontSize: "28px", color: "#fff", margin: "10px 0 16px" }}>
                  {selectedEvent.title}
                </h2>

                <div style={{ background: "#000", borderLeft: "3px solid var(--gold)", padding: "14px 18px", borderRadius: "4px", marginBottom: "20px" }}>
                  <span className="mono" style={{ color: "var(--gold)", fontSize: "11px" }}>VENUE & SCHEDULE</span>
                  <p style={{ margin: "4px 0 0", color: "#fff", fontSize: "14px" }}>
                    📍 {selectedEvent.venue} · {selectedEvent.location} · ⏰ {selectedEvent.time}
                  </p>
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <span className="eyebrow" style={{ color: "var(--gold)", fontSize: "11px", marginBottom: "8px" }}>
                    CONVENING OVERVIEW
                  </span>
                  {selectedEvent.overview.map((para, idx) => (
                    <p key={idx} style={{ fontSize: "14px", lineHeight: "1.7", color: "rgba(255, 255, 255, 0.88)", marginBottom: "10px" }}>
                      {para}
                    </p>
                  ))}
                </div>

                {/* Event Schedule Agenda */}
                {selectedEvent.schedule && selectedEvent.schedule.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <span className="eyebrow" style={{ color: "var(--gold)", fontSize: "11px", marginBottom: "12px", display: "block" }}>
                      PROGRAM SCHEDULE
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {selectedEvent.schedule.map((item, idx) => (
                        <div key={idx} style={{ background: "#050507", border: "1px solid rgba(212, 175, 55, 0.2)", padding: "12px 16px", borderRadius: "4px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <span className="mono" style={{ color: "var(--gold)", fontSize: "12px", fontWeight: 600 }}>{item.time}</span>
                            {item.speaker && <span className="mono" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "11px" }}>{item.speaker}</span>}
                          </div>
                          <h4 style={{ color: "#fff", fontSize: "14px", margin: "4px 0 2px" }}>{item.session}</h4>
                          <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "12.5px", margin: 0 }}>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", borderTop: "1px solid rgba(212, 175, 55, 0.2)", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <span className="mono" style={{ color: "var(--gold)", fontSize: "12px", display: "block" }}>
                      STATUS: {selectedEvent.status.toUpperCase()}
                    </span>
                  </div>
                  <Link
                    className="button button-primary"
                    href={`/contact?event=${selectedEvent.id}`}
                    style={{ background: "var(--gold)", color: "#000", fontWeight: 600, fontSize: "13px" }}
                  >
                    <span>Register interest</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
