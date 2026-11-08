"use client";

import { useState } from "react";
import Image from "next/image";

export function AboutCeoMessage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="message-section section about-ceo-section" aria-labelledby="ceo-message-heading">
      <div className="container message-grid about-ceo-grid">
        <div className="chief-portrait about-ceo-portrait">
          <Image
            src="/Mohammedrafie.jpg"
            alt="Mohammedrafie Abaraya, Chief Executive Officer"
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
          <span className="chief-portrait-badge">CHIEF EXECUTIVE OFFICER</span>
        </div>

        <div className="message-copy about-ceo-copy">
          <span className="eyebrow about-ceo-eyebrow">A NOTE FROM THE CHIEF EXECUTIVE OFFICER</span>
          <h2 id="ceo-message-heading" className="about-ceo-quote">
            “<span className="ceo-quote-art">Leadership is a science</span> as much as it is an art. African Leadership Excellence Academy is where these two meet.”
          </h2>

          <div className={`about-ceo-body ${expanded ? "is-expanded" : ""}`}>
            <p>Welcome to the African Leadership Excellence Academy!</p>
            <p>
              At our academy an inter-generational leadership transaction of wisdom transfer happens. In the past half millennia Africa has lost its leadership structure and philosophy due to the many dark histories it underwent – including slavery, colonization, and internal conflicts.
            </p>
            <p>
              Our academy strives to create a unique space to incubate, empower, and elevate the next generation of African leaders, and regain the lost structure of true African wisdom and leadership. Through training and research the academy envisions to support current leaders in the public, private, and civic sectors.
            </p>

            <div className="about-ceo-extended" aria-hidden={!expanded}>
              <div className="about-ceo-extended-inner">
                <p>
                  In this season, the academy is focused on training senior national leaders in parallel to completing its internal reform works. Our efforts have been fruitful, and the feedback from stakeholders is very encouraging.
                </p>
                <p>
                  In the next season, the academy will open its doors to its continental Pan-African agenda. As part of this endeavor the academy will host the first of its kind event on the side event of the AU 36th Heads of States Summit. With its state-of-the-art facility, the academy will host different workshops, trainings, and other deliberations to push the Pan-African agenda forward.
                </p>
                <p>
                  The future is in line with Africa’s renaissance and our academy looks forward to contributing to this great opportunity in the changing global order of which we are all are part of.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="about-ceo-toggle"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
          >
            <span>{expanded ? "Show less" : "Continue reading"}</span>
            <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
          </button>

          <p className="about-ceo-closing">Shaping the future leaders of Africa</p>

          <div className="about-ceo-signature">
            <span className="mono signature about-ceo-name">MOHAMMEDRAFIE ABARAYA</span>
            <span className="about-ceo-amharic">ሙሐመድራፊዕ አባራያ</span>
            <b className="about-ceo-title">CHIEF EXECUTIVE OFFICER (CEO)</b>
          </div>
        </div>
      </div>
    </section>
  );
}
