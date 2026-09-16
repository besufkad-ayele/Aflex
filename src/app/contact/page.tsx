"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CAMPUS_METADATA } from "@/lib/campus-data";
import { SiteFooter, SiteHeader, Weave } from "@/components/site-shell";

function ContactInquiryForm({
  defaultProgram = "",
  subject = "General inquiry",
}: {
  defaultProgram?: string;
  subject?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(defaultProgram);
  const [inquiryType, setInquiryType] = useState(
    defaultProgram ? "program" : "general"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="inquiry-form contact-inquiry-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="contact-form-header">
        <span className="eyebrow">SEND AN INQUIRY</span>
        <h2>
          Let&apos;s continue
          <br />
          <em>the conversation.</em>
        </h2>
        <p className="contact-form-lead">
          Share your details below. Admissions and partnerships typically respond within two business days.
        </p>
      </div>

      {submitted ? (
        <div className="form-success-banner" role="status">
          <span className="form-success-icon" aria-hidden="true">✓</span>
          <div>
            <strong>Thank you for reaching out.</strong>
            <p>
              Your inquiry has been received by the AFLEX Academy admissions &amp; partnerships team.
              We will respond within 2 business days.
            </p>
          </div>
        </div>
      ) : null}

      <fieldset className="contact-form-fieldset" disabled={submitted}>
        <legend className="contact-form-legend">Inquiry type</legend>
        <div className="contact-type-grid" role="radiogroup" aria-label="Inquiry type">
          {[
            { id: "general", label: "General", hint: "Academy questions" },
            { id: "program", label: "Programs", hint: "Enrollment & intake" },
            { id: "partnership", label: "Partnership", hint: "Institutions" },
            { id: "visit", label: "Campus visit", hint: "Protocol & tours" },
          ].map((type) => (
            <label
              key={type.id}
              className={`contact-type-card ${inquiryType === type.id ? "is-active" : ""}`}
            >
              <input
                type="radio"
                name="inquiryType"
                value={type.id}
                checked={inquiryType === type.id}
                onChange={() => setInquiryType(type.id)}
              />
              <strong>{type.label}</strong>
              <span>{type.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="contact-form-grid">
        <div className="contact-field">
          <label htmlFor="name">Full name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" required placeholder="Your full name" autoComplete="name" disabled={submitted} />
        </div>
        <div className="contact-field">
          <label htmlFor="organization">Organization / Institution</label>
          <input id="organization" name="organization" placeholder="Ministry, company, or NGO" autoComplete="organization" disabled={submitted} />
        </div>
        <div className="contact-field">
          <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
          <input id="email" name="email" required type="email" placeholder="you@example.com" autoComplete="email" disabled={submitted} />
        </div>
        <div className="contact-field">
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" placeholder="+251 …" autoComplete="tel" disabled={submitted} />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="program-select">Program / Area of interest</label>
        <select
          id="program-select"
          name="program"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          disabled={submitted}
        >
          <option value="">General institutional inquiry</option>
          <option value="leadership-development">01 — Leadership Development Training (Short-term)</option>
          <option value="project-wild">02 — Project WILD (Women in Leadership)</option>
          <option value="psle">03 — Public Service Leadership Excellence (PSLE)</option>
          <option value="research">Research &amp; Policy Advisory</option>
          <option value="campus-visit">Campus Visit / Facility Rental</option>
          <option value="partnership">Institutional Partnership</option>
        </select>
      </div>

      <div className="contact-field">
        <label htmlFor="subject">Subject <span aria-hidden="true">*</span></label>
        <input id="subject" name="subject" required defaultValue={subject} disabled={submitted} />
      </div>

      <div className="contact-field">
        <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us about your institution, preferred cohort dates, or the partnership you have in mind."
          disabled={submitted}
        />
        <span className="contact-field-hint">Include preferred dates, delegation size, or program goals if relevant.</span>
      </div>

      <div className="contact-form-footer">
        <label className="contact-consent">
          <input type="checkbox" name="consent" required disabled={submitted} />
          <span>I agree that AFLEX may contact me regarding this inquiry.</span>
        </label>
        <button type="submit" className="button button-primary contact-submit" disabled={submitted}>
          {submitted ? "Inquiry sent" : "Send inquiry"} <span>↗</span>
        </button>
      </div>
    </form>
  );
}

function ContactFormWrapper() {
  const searchParams = useSearchParams();
  const programParam = searchParams.get("program") || "";
  const subjectParam =
    searchParams.get("subject") ||
    (programParam ? `Inquiry regarding ${programParam}` : "General inquiry");

  return <ContactInquiryForm defaultProgram={programParam} subject={subjectParam} />;
}

export default function Contact() {
  const {
    coordinates,
    elevation,
    location,
    googleMapsEmbedUrl,
    googleMapsUrl,
    googleMapsDirectionsUrl,
    phones,
    email,
  } = CAMPUS_METADATA;

  return (
    <>
      <SiteHeader active="Contact" />
      <main id="main-content">
        <section className="contact-hero page-header blue-section">
          <div className="container contact-hero-grid">
            <div className="contact-hero-copy">
              <span className="mono breadcrumb">
                HOME <b>/</b> CONTACT US
              </span>
              <h1>Contact Us</h1>
              <p>
                For institutional nominations, program enrollment, research partnerships, and campus visits.
              </p>

              <div className="contact-hero-meta">
                <div>
                  <span className="mono">CAMPUS</span>
                  <strong>Sululta, Oromia</strong>
                  <small>~25 km north of Addis Ababa</small>
                </div>
                <div>
                  <span className="mono">COORDINATES</span>
                  <strong>{coordinates.formatted}</strong>
                  <small>{elevation}</small>
                </div>
              </div>

              <div className="contact-hero-actions">
                <a
                  className="button button-primary"
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions <span>↗</span>
                </a>
                <a
                  className="button button-outline light"
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps <span>↗</span>
                </a>
              </div>
            </div>

            <div className="contact-hero-map">
              <div className="contact-hero-map-chrome">
                <div className="contact-hero-map-label">
                  <span className="mono">SULULTA CAMPUS</span>
                  <span className="contact-map-live">LIVE MAP</span>
                </div>
                <a
                  className="contact-directions-chip"
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-directions-pin" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                    </svg>
                  </span>
                  <span>
                    <strong>Get directions</strong>
                    <small>Navigate to AFLEX</small>
                  </span>
                </a>
              </div>
              <iframe
                title="AFLEX Academy Sululta Campus location map"
                className="contact-hero-map-embed"
                src={googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="contact-hero-map-footer">
                <span>{location}</span>
                <a href={googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                  Start navigation →
                </a>
              </div>
            </div>
          </div>
          <Weave dark />
        </section>

        <section className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-info-col">
              <div className="section-heading">
                <span className="eyebrow">FIND THE ACADEMY</span>
                <h2>
                  Connect with our
                  <br />
                  <em>institutional team.</em>
                </h2>
                <p>
                  We are situated in the quiet highlands of Sululta, Oromia — a highland sanctuary for transformative African leadership.
                </p>
              </div>

              <div className="contact-info-cards">
                <article className="contact-info-card">
                  <span className="mono">SULULTA CAMPUS</span>
                  <p>
                    African Leadership Excellence Academy (AFLEX)
                    <br />
                    Sululta, Oromia Region
                    <br />
                    Federal Democratic Republic of Ethiopia
                  </p>
                </article>

                <article className="contact-info-card">
                  <span className="mono">HOTLINE & ADMISSIONS</span>
                  <ul className="contact-detail-list">
                    <li>
                      <span>Admissions &amp; Programs</span>
                      <a href="tel:+251118722020">+251 11 872 2020</a>
                    </li>
                    <li>
                      <span>Campus Direct</span>
                      <a href={`tel:${phones.campusDirect.replace(/\s/g, "")}`}>{phones.campusDirect}</a>
                    </li>
                    <li>
                      <span>Partnerships</span>
                      <a href="mailto:info@aflexacademy.gov.et">info@aflexacademy.gov.et</a>
                    </li>
                    <li>
                      <span>Facilities</span>
                      <a href={`mailto:${email}`}>{email}</a>
                    </li>
                  </ul>
                </article>

                <article className="contact-info-card">
                  <span className="mono">OFFICE HOURS & PROTOCOL</span>
                  <p>
                    Monday – Friday · 08:30 – 17:30 EAT
                    <br />
                    Official institutional delegations and campus visits require 48 hours prior protocol clearance.
                  </p>
                  <Link className="text-link" href="/campus-locator">
                    <span>Explore campus locator</span>
                    <span>→</span>
                  </Link>
                </article>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="inquiry-form contact-inquiry-form contact-form-loading">
                  Loading inquiry form…
                </div>
              }
            >
              <ContactFormWrapper />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
