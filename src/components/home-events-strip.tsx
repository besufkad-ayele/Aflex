"use client";

import Link from "next/link";
import { academyEvents } from "@/lib/events-data";
import type { Locale } from "@/lib/i18n";

interface HomeEventsStripProps {
  locale?: Locale;
}

export function HomeEventsStrip({ locale }: HomeEventsStripProps) {
  const eventsUrl = locale ? `/${locale}/news#events` : "/news#events";
  const displayedEvents = academyEvents.slice(0, 3);

  return (
    <section className="home-events-section" id="events">
      <div className="container">
        <div className="home-events-header">
          <div>
            <span className="eyebrow" style={{ color: "var(--gold)" }}>
              UPCOMING CONVENINGS · CONTINENTAL DELIBERATIONS
            </span>
            <h2>
              Events & executive<br />
              <em>forums at Sululta.</em>
            </h2>
          </div>

          <Link className="all-link" href={eventsUrl} style={{ color: "var(--gold)" }}>
            <span>View all convenings ({academyEvents.length})</span>
            <span>↗</span>
          </Link>
        </div>

        {/* 3-Column Simple Events Grid */}
        <div className="home-events-grid">
          {displayedEvents.map((event) => (
            <article key={event.id} className="home-event-card">
              <div className="home-event-date-box">
                <span className="home-event-month">{event.month}</span>
                <span className="home-event-day">{event.day}</span>
                <span className="home-event-year">{event.year}</span>
              </div>

              <div className="home-event-body">
                <div className="home-event-meta-line">
                  <span className="home-event-type-badge">{event.type}</span>
                  <span className="home-event-status-pill">{event.status}</span>
                </div>

                <h3>{event.title}</h3>
                <p>{event.description}</p>

                <div className="home-event-footer">
                  <span className="mono" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "11px" }}>
                    📍 {event.location}
                  </span>
                  <Link className="home-event-link" href={eventsUrl}>
                    <span>Details & RSVP</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
