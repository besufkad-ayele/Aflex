"use client";

import { useState } from "react";
import { PageFrame, SectionTitle } from "@/components/page-primitives";

const galleryItems = [
  { id: 1, album: "Campus", title: "Sululta highland campus at sunrise", shape: "tall", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85" },
  { id: 2, album: "Cohorts & Events", title: "Executive seminar cohort in deliberation", shape: "wide", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85" },
  { id: 3, album: "Pan-Africanism Forum", title: "Pan-African policy roundtable & delegates", shape: "standard", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85" },
  { id: 4, album: "Green Legacy Program", title: "Environmental stewardship on campus grounds", shape: "tall", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85" },
  { id: 5, album: "Campus", title: "Central courtyard and quiet study pavilion", shape: "standard", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85" },
  { id: 6, album: "Cohorts & Events", title: "Graduation ceremony & cohort celebration", shape: "wide", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85" }
];

const albums = ["All albums", "Campus", "Cohorts & Events", "Pan-Africanism Forum", "Green Legacy Program"];

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState("All albums");
  const [selectedPhoto, setSelectedPhoto] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = activeAlbum === "All albums"
    ? galleryItems
    : galleryItems.filter((item) => item.album === activeAlbum);

  return (
    <PageFrame 
      active="Gallery" 
      crumb="Gallery" 
      title="Gallery & Resources" 
      intro="A visual archive of the people, spaces, and intellectual life that make the academy a place of transformative practice."
    >
      <section className="section">
        <div className="container">
          <SectionTitle 
            eyebrow="THE ARCHIVE" 
            title={<>See the academy<br /><em>in practice.</em></>} 
            copy="Explore photographs from our Sululta campus, cohort convenings, and continental symposiums."
          />

          <div className="filter-bar gallery-filters">
            {albums.map((album) => (
              <button 
                key={album}
                className={`filter ${activeAlbum === album ? "active" : ""}`}
                onClick={() => setActiveAlbum(album)}
                type="button"
              >
                {album}
              </button>
            ))}
          </div>

          <div className="masonry-grid">
            {filteredItems.map((item) => (
              <figure 
                className={`gallery-item ${item.shape}`} 
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                style={{ cursor: "pointer" }}
              >
                <div 
                  className="gallery-image"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.65)), url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease"
                  }}
                >
                  <span className="mono" style={{ background: "rgba(0,0,0,0.8)", border: "1px solid var(--gold)", color: "var(--gold)" }}>
                    {item.album} ↗
                  </span>
                </div>
                <figcaption style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{item.title}</span>
                  <span className="mono" style={{ color: "var(--muted-light)", fontSize: "11px" }}>Expand ⌕</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Preview Modal */}
      {selectedPhoto && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ position: "relative" }}>
              <img src={selectedPhoto.image} alt={selectedPhoto.title} />
              <button 
                type="button" 
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "18px"
                }}
                aria-label="Close photo"
              >
                ✕
              </button>
            </div>
            <div className="lightbox-caption" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span className="mono" style={{ color: "var(--gold)" }}>{selectedPhoto.album}</span>
                <h4 style={{ margin: "4px 0 0", fontSize: "18px" }}>{selectedPhoto.title}</h4>
              </div>
              <span className="mono" style={{ color: "var(--muted-dark)" }}>AFLEX SULULTA CAMPUS</span>
            </div>
          </div>
        </div>
      )}

      <section className="section downloads-section">
        <div className="container">
          <SectionTitle 
            eyebrow="PUBLICATIONS & MEDIA" 
            title={<>Official documents &<br /><em>brochures.</em></>} 
            copy="Download official institution guidelines, academic calendar summaries, and press materials."
          />
          <div className="documents">
            <div className="document-row">
              <span className="document-icon">PDF</span>
              <div>
                <h3>AFLEX Academy Institutional Overview & Curriculum</h3>
                <span className="mono">aflex-overview-2026.pdf · 4.8 MB · English / Amharic</span>
              </div>
              <a 
                href="/docs/02-prd.md" 
                download="AFLEX-Academy-Brochure.pdf" 
                className="icon-button document-download" 
                aria-label="Download AFLEX overview"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              >
                ↓
              </a>
            </div>

            <div className="document-row">
              <span className="document-icon">PDF</span>
              <div>
                <h3>Project WILD — Women in Leadership Program Dossier</h3>
                <span className="mono">project-wild-brief.pdf · 2.1 MB · English</span>
              </div>
              <a 
                href="/docs/01-design-system.md" 
                download="Project-WILD-Brief.pdf" 
                className="icon-button document-download" 
                aria-label="Download Project WILD brief"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              >
                ↓
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}