"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { InquiryForm, PageFrame, SectionTitle } from "@/components/page-primitives";

function ContactFormWrapper() {
  const searchParams = useSearchParams();
  const programParam = searchParams.get("program") || "";
  const subjectParam = searchParams.get("subject") || (programParam ? `Inquiry regarding ${programParam}` : "General inquiry");

  return <InquiryForm defaultProgram={programParam} subject={subjectParam} />;
}

export default function Contact() {
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

            <div 
              style={{
                marginTop: "32px",
                padding: "24px",
                background: "var(--black)",
                color: "var(--white)",
                borderRadius: "4px",
                border: "1px solid var(--line-dark)"
              }}
            >
              <span className="mono" style={{ color: "var(--gold)" }}>COORDINATES</span>
              <h4 style={{ margin: "8px 0 4px", fontSize: "16px" }}>9°11&apos;08.4&quot;N 38°44&apos;52.8&quot;E</h4>
              <p style={{ color: "var(--muted-dark)", margin: 0, fontSize: "13px" }}>
                Elevation: 2,450 meters above sea level · Sululta Highlands
              </p>
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