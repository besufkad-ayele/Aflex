"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { PageFrame, SectionTitle } from "@/components/page-primitives";
import { 
  CAMPUS_FACILITIES, 
  CAMPUS_METADATA, 
  ARRIVAL_ESSENTIALS, 
  type CampusFacility 
} from "@/lib/campus-data";

const CATEGORIES = [
  "All Facilities",
  "Academic & Training",
  "Executive Lodging",
  "Dining & Hospitality",
  "Recreation & Wellness",
  "Administration & Protocol"
] as const;

export default function CampusLocatorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Facilities");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFacilityId, setActiveFacilityId] = useState<string>("01");
  const [hoveredFacilityId, setHoveredFacilityId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"split" | "map" | "list">("split");

  const directoryListRef = useRef<HTMLDivElement>(null);

  // Filter facilities based on category and search query
  const filteredFacilities = useMemo(() => {
    return CAMPUS_FACILITIES.filter((f) => {
      const matchesCategory = 
        selectedCategory === "All Facilities" || f.category === selectedCategory;
      
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch = 
        f.name.toLowerCase().includes(query) ||
        f.shortName.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query) ||
        f.zone.toLowerCase().includes(query) ||
        f.features.some((feat) => feat.toLowerCase().includes(query)) ||
        f.specs.some((spec) => spec.value.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Selected facility object
  const activeFacility = useMemo(() => {
    return CAMPUS_FACILITIES.find((f) => f.id === activeFacilityId) || CAMPUS_FACILITIES[0];
  }, [activeFacilityId]);

  // Auto-scroll active card into view in directory when selected via map
  const selectFacility = (id: string) => {
    setActiveFacilityId(id);
    const element = document.getElementById(`facility-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const printCampusMap = () => {
    window.print();
  };

  return (
    <PageFrame
      active="Campus Locator"
      crumb="Campus Locator"
      title="Sululta Highland Campus"
      intro="A comprehensive interactive wayfinding guide to the facilities, plenary halls, executive residences, and arrival logistics of AFLEX."
    >
      {/* Top Banner / GPS & Elevation Bar */}
      <section className="campus-hero-bar">
        <div className="container">
          <div className="campus-meta-strip">
            <div className="campus-meta-pill">
              <span className="mono-dot" />
              <span className="meta-label">LOCATION:</span>
              <strong className="meta-value">Sululta, Oromia (~25km North of Addis Ababa)</strong>
            </div>

            <div className="campus-meta-pill">
              <span className="meta-label">ELEVATION:</span>
              <strong className="meta-value">2,450m – 2,600m ASL</strong>
            </div>

            <div className="campus-meta-pill">
              <span className="meta-label">COORDINATES:</span>
              <strong className="meta-value">{CAMPUS_METADATA.coordinates.formatted}</strong>
            </div>

            <div className="campus-action-buttons">
              <a
                href={CAMPUS_METADATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-campus-nav"
                title="Open exact GPS in Google Maps"
              >
                <span>↗ Open in Google Maps</span>
              </a>
              <button 
                type="button" 
                onClick={printCampusMap} 
                className="btn-campus-print"
                title="Print or export PDF map"
              >
                <span>⎙ Print Campus Guide</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Locator Section */}
      <section className="section locator-main-section" id="interactive-map">
        <div className="container">
          {/* Filter and Search Bar */}
          <div className="locator-toolbar">
            <div className="locator-search-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by hall, facility, room capacity, or amenities (e.g. 'Interpretation', 'Library', 'VIP')..."
                className="locator-search-input"
                aria-label="Search campus facilities"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile View Toggle */}
            <div className="view-mode-toggle">
              <button 
                type="button"
                className={`mode-btn ${viewMode === "split" ? "active" : ""}`}
                onClick={() => setViewMode("split")}
              >
                Split View
              </button>
              <button 
                type="button"
                className={`mode-btn ${viewMode === "map" ? "active" : ""}`}
                onClick={() => setViewMode("map")}
              >
                Map View
              </button>
              <button 
                type="button"
                className={`mode-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                Directory
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="category-chips-scroll">
            <div className="category-chips">
              {CATEGORIES.map((cat) => {
                const count = cat === "All Facilities" 
                  ? CAMPUS_FACILITIES.length 
                  : CAMPUS_FACILITIES.filter(f => f.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`category-chip ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>{cat}</span>
                    <span className="chip-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Two-Pane Map & Directory Grid */}
          <div className={`locator-grid-layout view-${viewMode}`}>
            {/* Left Pane: Interactive SVG Masterplan */}
            <div className="campus-map-container">
              <div className="map-header-overlay">
                <div className="map-title-badge">
                  <span className="live-indicator" />
                  <strong>SULULTA CAMPUS MASTERPLAN</strong>
                  <span className="map-scale">VECTOR WAYFINDING · 1:2500</span>
                </div>
                <div className="map-compass">
                  <span className="compass-n">N ▲</span>
                  <span className="compass-text">ENTRANCE NORTH</span>
                </div>
              </div>

              {/* Vector Architectural Site Plan */}
              <div className="svg-map-wrapper">
                <svg
                  viewBox="0 0 800 580"
                  className="campus-svg-plan"
                  aria-label="AFLEX Sululta Interactive Campus Site Plan"
                >
                  <defs>
                    {/* Background Gradients & Filters */}
                    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0B1320" />
                      <stop offset="50%" stopColor="#101C2E" />
                      <stop offset="100%" stopColor="#080E18" />
                    </linearGradient>

                    <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1E2B3E" />
                      <stop offset="100%" stopColor="#15202E" />
                    </linearGradient>

                    <linearGradient id="forestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0C2518" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#081A11" stopOpacity="0.9" />
                    </linearGradient>

                    <linearGradient id="buildingGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9E7D3B" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#765B27" stopOpacity="0.95" />
                    </linearGradient>

                    <linearGradient id="buildingGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#B38F26" />
                    </linearGradient>

                    <linearGradient id="buildingGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#132742" stopOpacity="0.95" />
                    </linearGradient>

                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Base Campus Terrain */}
                  <rect width="800" height="580" fill="url(#bgGrad)" rx="8" />

                  {/* Highland Forest & Green Belts */}
                  <path
                    d="M 20,20 Q 150,10 240,40 Q 200,180 80,180 Z"
                    fill="url(#forestGrad)"
                    stroke="#16432B"
                    strokeWidth="1"
                  />
                  <path
                    d="M 620,20 Q 760,10 780,160 Q 690,240 640,160 Z"
                    fill="url(#forestGrad)"
                    stroke="#16432B"
                    strokeWidth="1"
                  />
                  <path
                    d="M 590,340 Q 780,330 780,560 Q 600,560 580,450 Z"
                    fill="url(#forestGrad)"
                    stroke="#16432B"
                    strokeWidth="1"
                  />
                  <path
                    d="M 20,400 Q 160,380 140,560 Q 20,560 20,400 Z"
                    fill="url(#forestGrad)"
                    stroke="#16432B"
                    strokeWidth="1"
                  />

                  {/* Contour Elevation Lines */}
                  <path d="M 0,100 Q 400,80 800,120" fill="none" stroke="rgba(212,175,55,0.06)" strokeWidth="1" strokeDasharray="4 6" />
                  <path d="M 0,220 Q 400,190 800,240" fill="none" stroke="rgba(212,175,55,0.06)" strokeWidth="1" strokeDasharray="4 6" />
                  <path d="M 0,360 Q 400,320 800,380" fill="none" stroke="rgba(212,175,55,0.06)" strokeWidth="1" strokeDasharray="4 6" />
                  <path d="M 0,480 Q 400,450 800,500" fill="none" stroke="rgba(212,175,55,0.06)" strokeWidth="1" strokeDasharray="4 6" />

                  {/* Campus Ring Road & Internal Arteries */}
                  <g className="roads-layer" opacity="0.85">
                    {/* Main Entry Avenue */}
                    <path
                      d="M 345,0 L 345,140 L 450,140 L 450,290 L 345,290 L 345,500 L 480,500"
                      fill="none"
                      stroke="#22334A"
                      strokeWidth="22"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 345,0 L 345,140 L 450,140 L 450,290 L 345,290 L 345,500 L 480,500"
                      fill="none"
                      stroke="#3D5373"
                      strokeWidth="2"
                      strokeDasharray="6 8"
                    />

                    {/* East Academic Loop */}
                    <path
                      d="M 450,140 L 680,140 L 680,350 L 450,350"
                      fill="none"
                      stroke="#22334A"
                      strokeWidth="16"
                      strokeLinejoin="round"
                    />
                    {/* West Residential Spur */}
                    <path
                      d="M 345,200 L 190,200 L 190,470 L 345,470"
                      fill="none"
                      stroke="#22334A"
                      strokeWidth="16"
                      strokeLinejoin="round"
                    />

                    {/* Athletic Perimeter Jogging Path (3.2km) */}
                    <path
                      d="M 60,60 Q 400,30 740,60 Q 750,300 740,520 Q 400,550 60,520 Q 40,300 60,60 Z"
                      fill="none"
                      stroke="#1B4D3E"
                      strokeWidth="3"
                      strokeDasharray="8 6"
                    />
                  </g>

                  {/* Central Ceremonial Plaza & Flag Court */}
                  <circle cx="450" cy="220" r="32" fill="#132338" stroke="#D4AF37" strokeWidth="1.5" />
                  <circle cx="450" cy="220" r="14" fill="#1A304C" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="450" y="224" textAnchor="middle" fill="#D4AF37" fontSize="9" fontFamily="monospace" fontWeight="600">
                    FLAG PLAZA
                  </text>

                  {/* Gate Entrance Portal Markers */}
                  <g className="gate-marker">
                    <rect x="290" y="2" width="110" height="24" fill="#0E1826" stroke="#D4AF37" strokeWidth="1" rx="3" />
                    <text x="345" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                      ▲ MAIN SULULTA GATEWAY
                    </text>
                  </g>

                  {/* Forest Trail Labels */}
                  <text x="690" y="470" fill="#4E8C68" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(45, 690, 470)">
                    PINE FOREST JOGGING LOOP (3.2KM)
                  </text>
                  <text x="110" y="110" fill="#4E8C68" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-30, 110, 110)">
                    HIGH RESERVE GROVE
                  </text>

                  {/* Interactive Building Footprints */}
                  {CAMPUS_FACILITIES.map((facility) => {
                    const isActive = activeFacilityId === facility.id;
                    const isHovered = hoveredFacilityId === facility.id;
                    const isFiltered = filteredFacilities.some((f) => f.id === facility.id);
                    const { x, y, width = 100, height = 70 } = facility.coords;

                    return (
                      <g
                        key={facility.id}
                        className={`map-facility-group ${isActive ? "active-building" : ""} ${!isFiltered ? "dimmed-building" : ""}`}
                        onClick={() => selectFacility(facility.id)}
                        onMouseEnter={() => setHoveredFacilityId(facility.id)}
                        onMouseLeave={() => setHoveredFacilityId(null)}
                        style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                      >
                        {/* Active Glow Ring */}
                        {isActive && (
                          <rect
                            x={x - 6}
                            y={y - 6}
                            width={width + 12}
                            height={height + 12}
                            rx="8"
                            fill="none"
                            stroke="#D4AF37"
                            strokeWidth="2.5"
                            strokeDasharray="4 4"
                            className="pulse-stroke"
                            filter="url(#glow)"
                          />
                        )}

                        {/* Building Base Polygon */}
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          rx="5"
                          fill={isActive ? "url(#buildingGradActive)" : isHovered ? "url(#buildingGradGold)" : "url(#buildingGradBlue)"}
                          stroke={isActive ? "#FFFFFF" : isHovered ? "#D4AF37" : "#2E486B"}
                          strokeWidth={isActive ? "2" : "1.2"}
                          filter={isActive ? "url(#glow)" : undefined}
                        />

                        {/* Internal Architectural Grid Accents */}
                        <line x1={x + 10} y1={y + 10} x2={x + width - 10} y2={y + 10} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                        <line x1={x + 10} y1={y + height - 10} x2={x + width - 10} y2={y + height - 10} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                        {/* Building Zone ID Marker */}
                        <circle
                          cx={x + 18}
                          cy={y + 18}
                          r="10"
                          fill={isActive ? "#0E1826" : "#D4AF37"}
                          stroke="#FFFFFF"
                          strokeWidth="1"
                        />
                        <text
                          x={x + 18}
                          y={y + 22}
                          textAnchor="middle"
                          fill={isActive ? "#D4AF37" : "#0E1826"}
                          fontSize="9"
                          fontWeight="700"
                          fontFamily="monospace"
                        >
                          {facility.id}
                        </text>

                        {/* Short Building Name Text on Map */}
                        <text
                          x={x + width / 2}
                          y={y + height / 2 + (height > 70 ? 10 : 6)}
                          textAnchor="middle"
                          fill={isActive ? "#0B1320" : "#FFFFFF"}
                          fontSize={width > 110 ? "11" : "9.5"}
                          fontWeight="600"
                          fontFamily="sans-serif"
                        >
                          {facility.shortName}
                        </text>

                        {/* Capacity / Category Subtext */}
                        {height >= 75 && (
                          <text
                            x={x + width / 2}
                            y={y + height - 14}
                            textAnchor="middle"
                            fill={isActive ? "#1A2E40" : "rgba(212,175,55,0.85)"}
                            fontSize="8"
                            fontFamily="monospace"
                          >
                            {facility.capacity.split(" ")[0]} {facility.capacity.split(" ")[1] || "CAP"}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Floating Active Inspector Card inside Map */}
              <div className="map-active-inspector">
                <div className="inspector-head">
                  <div className="badge-wrapper">
                    <span className="facility-badge">{activeFacility.zone}</span>
                    <span className="facility-id-pill">ID: {activeFacility.id}</span>
                  </div>
                  <span className="facility-capacity-tag">{activeFacility.capacity}</span>
                </div>
                <h4 className="inspector-title">{activeFacility.name}</h4>
                <p className="inspector-desc">{activeFacility.description}</p>
                <div className="inspector-meta-row">
                  <span className="inspector-nav-note">
                    📍 <strong>Route:</strong> {activeFacility.navigation}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Pane: Filterable Synchronized Directory */}
            <div className="campus-directory-container" ref={directoryListRef}>
              <div className="directory-header-wrap">
                <span className="eyebrow" style={{ color: "var(--gold)" }}>FACILITIES DIRECTORY</span>
                <h3 className="directory-heading">
                  {selectedCategory === "All Facilities" ? "All Academy Grounds" : selectedCategory}
                  <span className="results-badge">({filteredFacilities.length})</span>
                </h3>
                <p className="directory-sub">
                  Select any block to highlight its spatial zone on the Sululta masterplan and view technical specifications.
                </p>
              </div>

              {filteredFacilities.length === 0 ? (
                <div className="directory-empty-state">
                  <p>No facilities match your search query <em>"{searchQuery}"</em> in <em>{selectedCategory}</em>.</p>
                  <button 
                    type="button" 
                    onClick={() => { setSelectedCategory("All Facilities"); setSearchQuery(""); }}
                    className="btn-reset-filters"
                  >
                    Reset Search & Filters
                  </button>
                </div>
              ) : (
                <div className="facility-cards-list">
                  {filteredFacilities.map((facility) => {
                    const isSelected = activeFacilityId === facility.id;
                    return (
                      <article
                        key={facility.id}
                        id={`facility-card-${facility.id}`}
                        className={`facility-card ${isSelected ? "selected-card" : ""}`}
                        onClick={() => selectFacility(facility.id)}
                        onMouseEnter={() => setHoveredFacilityId(facility.id)}
                        onMouseLeave={() => setHoveredFacilityId(null)}
                      >
                        <div className="card-top-bar">
                          <div className="card-index-group">
                            <span className="card-number">{facility.id}</span>
                            <span className="card-zone">{facility.zone}</span>
                          </div>
                          {isSelected && (
                            <span className="active-pill">ACTIVE ON MAP</span>
                          )}
                        </div>

                        <h4 className="card-facility-name">{facility.name}</h4>
                        <p className="card-facility-desc">{facility.description}</p>

                        {/* Specs Key-Value Grid */}
                        <div className="card-specs-grid">
                          {facility.specs.map((spec, i) => (
                            <div key={i} className="spec-item">
                              <span className="spec-label">{spec.label}</span>
                              <strong className="spec-value">{spec.value}</strong>
                            </div>
                          ))}
                        </div>

                        {/* Features Badges */}
                        <div className="card-features-list">
                          {facility.features.map((feat, i) => (
                            <span key={i} className="feature-chip">
                              ✓ {feat}
                            </span>
                          ))}
                        </div>

                        {/* Navigation Footer */}
                        <div className="card-nav-footer">
                          <span className="nav-icon">🧭</span>
                          <span className="nav-text"><strong>From Gate:</strong> {facility.navigation}</span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Arrival Essentials & Logistics Strip */}
      <section className="section arrival-essentials-section">
        <div className="container">
          <SectionTitle
            eyebrow="DELEGATION & VISITOR PROTOCOL"
            title={<>Essential Logistics for<br /><em>your Sululta arrival.</em></>}
            copy="Practical information prepared for arriving ministers, diplomatic delegations, international faculty, and cohort trainees."
          />

          <div className="arrival-grid">
            {ARRIVAL_ESSENTIALS.map((item) => (
              <div key={item.number} className="arrival-card">
                <div className="arrival-card-head">
                  <span className="arrival-number">{item.number}</span>
                  <span className="arrival-subtitle">{item.subtitle}</span>
                </div>
                <h3 className="arrival-title">{item.title}</h3>
                <p className="arrival-description">{item.description}</p>
                <ul className="arrival-details-list">
                  {item.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
                {item.actionLabel && (
                  <Link 
                    href={item.actionHref || "/contact"} 
                    className="arrival-action-link"
                  >
                    {item.actionLabel} <span>↗</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highland Environment & Climate Advisory */}
      <section className="section highland-advisory-section">
        <div className="container">
          <div className="advisory-box">
            <div className="advisory-left">
              <span className="eyebrow" style={{ color: "var(--gold)" }}>CLIMATE & ALTITUDE ADVISORY</span>
              <h2>Highland Serenity at 2,450M</h2>
              <p>
                AFLEX was intentionally situated in the scenic hills of Sululta to provide leaders with an unmatched sanctuary removed from metropolitan noise. The crisp highland air fosters clarity, rigorous deliberation, and restorative mindfulness.
              </p>
              <div className="advisory-metrics">
                <div className="metric-cell">
                  <span className="metric-val">2,450m</span>
                  <span className="metric-sub">Base Elevation</span>
                </div>
                <div className="metric-cell">
                  <span className="metric-val">25 km</span>
                  <span className="metric-sub">From Addis Ababa</span>
                </div>
                <div className="metric-cell">
                  <span className="metric-val">12°–24°C</span>
                  <span className="metric-sub">Average Temperature</span>
                </div>
                <div className="metric-cell">
                  <span className="metric-val">3.2 km</span>
                  <span className="metric-sub">Highland Forest Trail</span>
                </div>
              </div>
            </div>

            <div className="advisory-right">
              <div className="contact-quick-card">
                <h4>Sululta Campus Contacts</h4>
                <div className="contact-entry">
                  <span className="contact-role">Main Gate & Security Desk:</span>
                  <a href={`tel:${CAMPUS_METADATA.phones.campusDirect}`} className="contact-phone">
                    {CAMPUS_METADATA.phones.campusDirect}
                  </a>
                </div>
                <div className="contact-entry">
                  <span className="contact-role">Facilities & Booking Directorate:</span>
                  <a href={`mailto:${CAMPUS_METADATA.email}`} className="contact-email">
                    {CAMPUS_METADATA.email}
                  </a>
                </div>
                <div className="contact-entry">
                  <span className="contact-role">24/7 Medical & Emergency Unit:</span>
                  <a href={`tel:${CAMPUS_METADATA.phones.emergency}`} className="contact-phone emergency">
                    {CAMPUS_METADATA.phones.emergency}
                  </a>
                </div>
                <Link href="/contact" className="btn-secondary" style={{ marginTop: "16px", display: "inline-block", textAlign: "center" }}>
                  Official Contact Directory →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}