"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CAMPUS_METADATA } from "@/lib/campus-data";
import { InquiryForm, PageFrame, SectionTitle } from "@/components/page-primitives";

function ContactFormWrapper() {
  const searchParams = useSearchParams();
  const programParam = searchParams.get("program") || "";
  const subjectParam = searchParams.get("subject") || (programParam ? `Inquiry regarding ${programParam}` : "General inquiry");

  return <InquiryForm defaultProgram={programParam} subject={subjectParam} />;
}

export default function Contact() {
  const { coordinates, googleMapsEmbedUrl, googleMapsUrl } = CAMPUS_METADATA;

  return (
    <PageFrame 
      active="Contact" 
      crumb="Contact Us" 
      title="Contact Us" 
      intro="For institutional nominations, program enrollment, research partnerships, and campus visits."
    >
      <section className="section contact-section">
        <div className="container contact-grid">
          <div>
            <SectionTitle 
              eyebrow="FIND THE ACADEMY" 
              title={<>Connect with our<br /><em>institutional team.</em></>} 
              copy="We are situated in the quiet highlands of Sululta, Oromia, 25km north of Addis Ababa."
            />

            <div className="address-block">
              <span className="mono">SULULTA CAMPUS</span>
              <p>
                African Leadership Excellence Academy (AFLEX)<br />
                Sululta, Oromia Region<br />
                Federal Democratic Republic of Ethiopia
              </p>

              <span className="mono">CONTACT HOTLINE & ADMISSIONS</span>
              <p style={{ marginTop: "6px" }}>
                <strong>Admissions & Programs:</strong> +251 11 872 2020<br />
                <strong>Institutional Partnerships:</strong> info@aflexacademy.gov.et<br />
                <strong>Office Hours:</strong> Monday – Friday · 08:30 – 17:30 EAT
              </p>

              <span className="mono">CAMPUS VISITS & PROTOCOL</span>
              <p style={{ marginTop: "6px" }}>
                Official institutional delegations and campus visits require 48 hours prior protocol clearance.
              </p>
            </div>

            <div className="contact-coordinates-card">
              <span className="mono">COORDINATES</span>
              <h4>{coordinates.formatted}</h4>
              <p>
                Elevation: 2,450 meters above sea level · Sululta Highlands
              </p>
              <Link className="text-link contact-map-link" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <span>Open in Google Maps</span>
                <span>↗</span>
              </Link>
            </div>

            <div className="contact-map-wrap">
              <div className="contact-map-header">
                <span className="mono">CAMPUS LOCATION</span>
                <span className="contact-map-live">LIVE MAP</span>
              </div>
              <iframe
                title="AFLEX Academy Sululta Campus location map"
                className="contact-map-embed"
                src={googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <Suspense fallback={<div>Loading inquiry form...</div>}>
            <ContactFormWrapper />
          </Suspense>
        </div>
      </section>
    </PageFrame>
  );
}
