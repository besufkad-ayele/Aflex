"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  amharicName?: string;
  category: "Government" | "International" | "Enterprise" | "Academic";
  logo: string;
  isFeatured?: boolean;
}

const partners: Partner[] = [
  {
    id: "mowe",
    name: "Ministry of Water and Energy",
    amharicName: "ውሃና ኢነርጂ ሚኒስቴር",
    category: "Government",
    logo: "/partners/water enegery.png",
    isFeatured: true,
  },
  {
    id: "osc",
    name: "Organisation of Southern Cooperation",
    amharicName: "የደቡብ ትብብር ድርጅት",
    category: "International",
    logo: "/partners/organisation of souther cooperation.png",
    isFeatured: true,
  },
  {
    id: "ethiopian-airlines",
    name: "Ethiopian Airlines",
    amharicName: "የኢትዮጵያ አየር መንገድ",
    category: "Enterprise",
    logo: "/partners/ethiopian airlines.png",
    isFeatured: true,
  },
  {
    id: "cag",
    name: "China National Academy of Governance",
    amharicName: "የቻይና ብሔራዊ የአስተዳደር አካዳሚ",
    category: "Academic",
    logo: "/partners/china acadamy of governance.png",
    isFeatured: true,
  },
  {
    id: "eep",
    name: "Ethiopian Electric Power",
    amharicName: "የኢትዮጵያ ኤሌክትሪክ ኃይል",
    category: "Enterprise",
    logo: "/partners/ethiopian electirc.png",
    isFeatured: true,
  },
  {
    id: "un",
    name: "United Nations",
    amharicName: "የተባበሩት መንግሥታት ድርጅት",
    category: "International",
    logo: "/partners/un logo.png",
  },
  {
    id: "gates-foundation",
    name: "Bill & Melinda Gates Foundation",
    amharicName: "ቢል እና ሜሊንዳ ጌትስ ፋውንዴሽን",
    category: "International",
    logo: "/partners/bill.png",
  },
  {
    id: "nus",
    name: "National University of Singapore",
    amharicName: "የሲንጋፖር ብሔራዊ ዩኒቨርሲቲ",
    category: "Academic",
    logo: "/partners/national universtiy of singapor.jpg",
  },
  {
    id: "china-aid",
    name: "China AID",
    amharicName: "የቻይና ዓለም አቀፍ ዕርዳታ",
    category: "International",
    logo: "/partners/china aid.png",
  },
  {
    id: "aibo",
    name: "Academy for International Business Officials",
    amharicName: "ዓለም አቀፍ የንግድ ባለሥልጣናት አካዳሚ",
    category: "Academic",
    logo: "/partners/aibo.png",
  },
  {
    id: "african-urban-lab",
    name: "African Urban Lab",
    amharicName: "የአፍሪካ ከተሞች ምርምር ማዕከል",
    category: "Academic",
    logo: "/partners/african urban lab.jpg",
  },
  {
    id: "medac",
    name: "Mediterranean Academy of Diplomatic Studies",
    amharicName: "የሜዲትራኒያን የዲፕሎማሲ ጥናት አካዳሚ",
    category: "Academic",
    logo: "/partners/medac.png",
  },
  {
    id: "elos",
    name: "ELOS Groups LLC",
    amharicName: "ኤሎስ ግሩፕስ",
    category: "Enterprise",
    logo: "/partners/elos groups llc.jpg",
  },
];

export function PartnersMarquee() {
  const [filter, setFilter] = useState<string>("All");

  const filteredPartners =
    filter === "All"
      ? partners
      : partners.filter((p) => p.category === filter);

  // Duplicate the list for infinite continuous scroll
  const marqueeList = [...filteredPartners, ...filteredPartners, ...filteredPartners];

  return (
    <section className="partners-section" id="partners">
      <div className="container">
        <div className="partners-header">
          <div className="partners-heading-left">
            <div className="partners-pill">
              <span className="partners-pill-dot" />
              <span>STRATEGIC ALLIANCES & COLLABORATION</span>
            </div>
            <h2>
              Partnering with <em>world-class</em> institutions.
            </h2>
            <p>
              AFLEX collaborates with premier ministries, multilateral organizations, and global academies to deliver transformative leadership programs and policy research.
            </p>
          </div>

          <div className="partners-filter-tabs">
            {["All", "Government", "International", "Academic", "Enterprise"].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`partners-tab-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat === "All" ? "All Alliances" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width autoscrolling track with golden hover illumination */}
      <div className="partners-marquee-wrapper" aria-label="Strategic Partners Marquee">
        <div className="partners-marquee-fade left" />
        <div className="partners-marquee-fade right" />

        <div className="partners-marquee-track">
          {marqueeList.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className={`partner-card ${partner.isFeatured ? "featured" : ""}`}
              title={partner.name}
            >
              <div className="partner-logo-box">
                <Image
                  width={120}
                  height={48}
                  style={{ objectFit: "contain" }}
                  src={partner.logo}
                  alt={partner.name}
                  className="partner-logo-img"
                  loading="lazy"
                />
              </div>
              <div className="partner-card-info">
                <span className="partner-category-tag">{partner.category}</span>
                <h4 className="partner-name">{partner.name}</h4>
                {partner.amharicName && (
                  <span className="partner-amharic-name">{partner.amharicName}</span>
                )}
              </div>
              <div className="partner-card-glow" />
            </div>
          ))}
        </div>
      </div>

      <div className="container partners-footer-note">
        <div className="partners-stat-strip">
          <div className="partner-stat-item">
            <strong>15+</strong>
            <span>Continental & Global Partners</span>
          </div>
          <div className="partner-stat-divider" />
          <div className="partner-stat-item">
            <strong>50+</strong>
            <span>Joint Leadership Curricula</span>
          </div>
          <div className="partner-stat-divider" />
          <div className="partner-stat-item">
            <strong>24+</strong>
            <span>African Countries Represented</span>
          </div>
        </div>
      </div>
    </section>
  );
}
