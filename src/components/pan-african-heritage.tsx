"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import type { Locale } from "@/lib/i18n";

interface PanAfricanHeritageProps {
  locale?: Locale;
}

const heritageStories = [
  {
    id: "mandela",
    year: "1962",
    badge: "MILITARY & STRATEGIC COMMAND",
    location: "KOLFE MILITARY BASE · ADDIS ABABA",
    title: "Nelson Mandela's Crucible of Freedom",
    quote: "“Ethiopia has always held a special place in my imagination and the history of Africa… It was where I first saw Africans flying airplanes, commanding modern armies, and governing free nations.”",
    narrative: "In 1962, Nelson Mandela arrived covertly in Ethiopia under the alias David Motsamayi. He underwent intensive guerrilla warfare, military statecraft, and tactical leadership training at Kolfe under General Tadesse Birru. Emperor Haile Selassie I presented him with an Ethiopian diplomatic passport and a warrior firearm, providing the security and legitimacy that enabled the anti-apartheid liberation struggle.",
    pillars: ["Guerrilla Statecraft", "Covert Continental Diplomacy", "Anti-Apartheid Vanguard"],
    legacy: "ARCHITECT OF THE NEW SOUTH AFRICA",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "adwa-1896",
    year: "1896",
    badge: "SOVEREIGN STRATEGY & DEFENSE",
    location: "ADWA HIGHLANDS · TIGRAY",
    title: "The Battle of Adwa: Defeating Colonialism",
    quote: "“Adwa was not just an Ethiopian victory; it was the psychological liberation of the entire Black world—proving that African strategy could decisively defeat imperial force.”",
    narrative: "Under the tactical brilliance of Empress Taytu Betul and Emperor Menelik II, over 100,000 Ethiopians united across ethnic and regional lines to defeat the invading Italian army. Adwa stands as the eternal masterclass in logistics, sovereign diplomacy, military intelligence, and continental self-determination.",
    pillars: ["Unified National Command", "Empress Taytu's Intelligence Strategy", "Global Black Sovereignty"],
    legacy: "BEACON OF AFRICAN INDEPENDENCE",
    image: "https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "oau-1963",
    year: "1963",
    badge: "CONTINENTAL DIPLOMATIC ARCHITECTURE",
    location: "AFRICA HALL · ADDIS ABABA",
    title: "The Birth of the OAU & African Unity",
    quote: "“May this Union of African States last as long as the stars remain in the heavens, binding our destinies in peace and prosperity.”",
    narrative: "On May 25, 1963, 32 independent African heads of state converged at Africa Hall in Addis Ababa. Led by visionary statesmen including Kwame Nkrumah, Emperor Haile Selassie I, Gamal Abdel Nasser, and Julius Nyerere, they signed the OAU Charter, permanently establishing Addis Ababa as the political and diplomatic capital of Africa.",
    pillars: ["Pan-African Unification", "Treaty Architecture", "Permanent Diplomatic Capital"],
    legacy: "FOUNDATION OF THE AFRICAN UNION",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "frelimo-mozambique",
    year: "1965",
    badge: "LIBERATION FRONTS SANCTUARY",
    location: "ETHIOPIAN MILITARY ACADEMIES",
    title: "Samora Machel & Mozambique’s Sovereignty",
    quote: "“Solidarity is not an act of charity, but mutual aid between forces fighting for the same objective—total liberation.”",
    narrative: "Ethiopia provided full military combat training, strategic doctrine, logistical arms, and international travel sanctuary to Samora Machel and the freedom fighters of FRELIMO, directly accelerating Mozambique's path from colonial servitude to sovereign statehood.",
    pillars: ["Cross-Border Logistics", "Executive Combat Cadres", "Southern Africa Liberation"],
    legacy: "ARCHITECT OF MOZAMBIQUE SOVEREIGNTY",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "zanu-swapo",
    year: "1970s",
    badge: "CADRE DEVELOPMENT & STATECRAFT",
    location: "HARAR MILITARY ACADEMY & ADDIS ABABA",
    title: "Zimbabwe & Namibia Freedom Cadres",
    quote: "“In Ethiopia, we learned not only how to liberate our homelands on the battlefield, but how to construct institutions to govern them honorably.”",
    narrative: "Commanders and political officers from Zimbabwe's ZANU/ZANLA (Josiah Tongogara, Robert Mugabe) and Namibia's SWAPO (Sam Nujoma) were trained in Ethiopian military academies. The curriculum combined battlefield tactics with public administration, preparing cadres to transition from liberation movements into functional democratic governments.",
    pillars: ["Civil-Military Transition", "Institutional Building", "Constitutional Governance"],
    legacy: "TRANSFORMATIVE CADRE PREPARATION",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "gadaa-governance",
    year: "TIMELESS",
    badge: "INDIGENOUS DEMOCRATIC PHILOSOPHY",
    location: "UNESCO INTANGIBLE CULTURAL HERITAGE",
    title: "The Gadaa System: Indigenous African Democracy",
    quote: "“Centuries before modern constitutional theories, Africa practiced peaceful power transfers, institutional checks, and egalitarian governance.”",
    narrative: "The traditional Oromo Gadaa governance model is an indigenous socio-political system based on eight-year generational cycles, strict term limits, separation of executive, legislative, and judicial powers, and women's institutional Siinqee checks. It provides AFLEX with timeless philosophical foundations for ethical, participatory leadership.",
    pillars: ["8-Year Term Limits", "Siinqee Gender Balance", "Consensus Deliberation"],
    legacy: "ETHIOPIAN DEMOCRATIC HERITAGE",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "green-legacy",
    year: "2019-2026",
    badge: "ECOLOGICAL & ENERGY SOVEREIGNTY",
    location: "SULULTA, ABAY BASIN & NATIONAL WATERSHEDS",
    title: "Green Legacy & African Energy Self-Reliance",
    quote: "“True African leadership does not wait for foreign climate solutions—we plant our own forests and build our own power for future generations.”",
    narrative: "With over 32 billion trees planted across Ethiopia and the completion of the Grand Ethiopian Renaissance Dam (GERD), Ethiopia exemplifies proactive climate statecraft and clean energy industrialization. AFLEX integrates environmental stewardship and resource diplomacy directly into its executive leadership curriculum.",
    pillars: ["32B+ Tree Cultivation", "GERD Renewable Power", "Continental Climate Statecraft"],
    legacy: "PAN-AFRICAN RENEWABLE FRONTIER",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "economic-integration",
    year: "2026",
    badge: "CONTINENTAL COMMERCE & AVIATION",
    location: "130+ DESTINATIONS ACROSS AFRICA & THE WORLD",
    title: "Economic Sovereignty & Continental Corridors",
    quote: "“Connecting Africa to itself is the prerequisite for economic renaissance—bringing people, trade, and ideas together without external bottlenecks.”",
    narrative: "Through Ethiopian Airlines' seven decades of bridging every corner of Africa and the country's active championing of the African Continental Free Trade Area (AfCFTA), Ethiopia continues to serve as the physical, commercial, and logistical backbone connecting 1.4 billion African citizens.",
    pillars: ["AfCFTA Single Market", "Aviation Logistics Hub", "Intra-African Trade Corridors"],
    legacy: "ENGINE OF CONTINENTAL COMMERCE",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85"
  }
];

export function PanAfricanHeritage({ locale }: PanAfricanHeritageProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const programsUrl = locale ? `/${locale}/programs` : "/programs";
  const totalSlides = heritageStories.length + 1; // +1 for the Grand Closing Card
  const maxSlideIndex = totalSlides - 1;
  const FINALE_HOLD_RATIO = 0.35;

  const getMaxTranslate = useCallback(() => {
    if (!trackRef.current) return 0;
    const cards = trackRef.current.querySelectorAll(".heritage-card");
    const lastCard = cards[cards.length - 1] as HTMLElement | undefined;
    if (!lastCard) return 0;

    // Center the 90vw finale card with breathing room on both sides
    const trackStyle = window.getComputedStyle(trackRef.current);
    const paddingLeft = parseFloat(trackStyle.paddingLeft) || 0;
    const sideInset = (window.innerWidth - lastCard.offsetWidth) / 2;
    return Math.max(0, lastCard.offsetLeft + paddingLeft - sideInset);
  }, []);

  // Vertical scroll drives horizontal translate; finale slide holds fully visible before release
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));
      setScrollProgress(progress);

      const holdStart = 1 - FINALE_HOLD_RATIO;
      const carouselProgress =
        progress >= holdStart ? 1 : progress / holdStart;

      const maxTranslate = getMaxTranslate();
      const rawPosition = carouselProgress * maxSlideIndex;
      const currentIndex =
        progress >= holdStart
          ? maxSlideIndex
          : Math.min(maxSlideIndex, Math.round(rawPosition));

      setTranslateX(carouselProgress * maxTranslate);
      setActiveStoryIndex(currentIndex);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [maxSlideIndex, getMaxTranslate]);

  const handleStart = (clientX: number) => {
    if (isUnlocked) return;
    setIsDragging(true);
  };

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !sliderTrackRef.current || isUnlocked) return;
    const rect = sliderTrackRef.current.getBoundingClientRect();
    const maxDrag = rect.width - 64;
    const currentDrag = Math.max(0, Math.min(clientX - rect.left - 28, maxDrag));
    setDragOffset(currentDrag);

    if (currentDrag >= maxDrag * 0.85) {
      setIsUnlocked(true);
      setIsDragging(false);
      setDragOffset(maxDrag);
      setTimeout(() => {
        router.push(programsUrl);
      }, 600);
    }
  }, [isDragging, isUnlocked, programsUrl, router]);

  const handleEnd = useCallback(() => {
    if (isUnlocked) return;
    setIsDragging(false);
    setDragOffset(0);
  }, [isUnlocked]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  const isFinaleHold = activeStoryIndex === maxSlideIndex;

  return (
    <div
      className="heritage-pinned-section"
      ref={containerRef}
      id="heritage"
      style={{ "--heritage-scroll-units": totalSlides + 1.5 } as React.CSSProperties}
    >
      <div className="heritage-sticky-viewport">
        <div className="container" style={{ width: "100%" }}>
          <div className="heritage-header">
            <div>
              <div className="heritage-counter-badge">
                <span>●</span>
                <span>PAN-AFRICAN LEADERSHIP ARCHIVE · CHAPTER {activeStoryIndex + 1} OF {totalSlides}</span>
              </div>
              <h2 style={{ fontSize: "clamp(22px, 2.6vw, 34px)", margin: 0 }}>
                The crucible that trained Africa&apos;s <em>greatest leaders.</em>
              </h2>
            </div>

            <div className="heritage-scroll-indicator">
              <span className="heritage-scroll-pulse">
                <span>{isFinaleHold ? "SCROLL TO CONTINUE" : "SCROLL TO EXPLORE"}</span>
                <span>↓</span>
              </span>
              <span className="mono" style={{ color: "var(--gold)", fontSize: "14px", fontWeight: 700 }}>
                {activeStoryIndex + 1} / {totalSlides}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll-Driven Horizontal Track */}
        <div 
          className="heritage-horizontal-track" 
          ref={trackRef}
          style={{
            transform: `translate3d(-${translateX}px, 0, 0)`
          }}
        >
          {heritageStories.map((story, index) => (
            <article
              className={`heritage-card${activeStoryIndex === index ? " heritage-card-active" : ""}`}
              key={story.id}
            >
              {/* Media Column with Sculpted Internal Mask */}
              <div className="heritage-card-media-col">
                <div className="heritage-media-bend-mask">
                  <img src={story.image} alt={story.title} />
                  <div className="heritage-media-bend-overlay" />
                  <span className="heritage-badge">{story.badge}</span>
                  
                  <div className="heritage-year-stamp">
                    {story.year}
                    <small>{story.location.split("·")[0].trim()}</small>
                  </div>
                </div>
              </div>

              {/* Inner Body Panel */}
              <div className="heritage-card-body">
                <div>
                  <div className="heritage-card-location">
                    <span>📍</span> {story.location}
                  </div>
                  <h3 className="heritage-card-title">{story.title}</h3>
                  
                  <div className="heritage-quote-box">
                    <p>{story.quote}</p>
                  </div>

                  <p className="heritage-card-narrative">{story.narrative}</p>
                </div>

                <div>
                  <div className="heritage-pillar-tags">
                    {story.pillars.map((pillar) => (
                      <span className="heritage-pillar-tag" key={pillar}>
                        ✓ {pillar}
                      </span>
                    ))}
                  </div>

                  <div className="heritage-card-footer">
                    <strong>{story.legacy}</strong>
                    <span>ETHIOPIAN STATECRAFT ARCHIVE</span>
                  </div>
                </div>

                {/* Ethiopian Cross Tibeb Watermark */}
                <svg
                  className="tibeb-watermark"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M45,5 L55,5 L55,30 L75,10 L82,17 L62,37 L95,37 L95,47 L70,47 L85,62 L78,69 L55,46 L55,70 L70,85 L63,92 L50,79 L37,92 L30,85 L45,70 L45,46 L22,69 L15,62 L30,47 L5,47 L5,37 L38,37 L18,17 L25,10 L45,30 Z" />
                </svg>
              </div>
            </article>
          ))}

          {/* THE GRAND CLOSING FINALE CARD: "BEGIN HERE / The next chapter needs leaders." */}
          <article
            className={`heritage-card heritage-gold-card${activeStoryIndex === heritageStories.length ? " heritage-card-active" : ""}`}
          >
            {/* Left Column Callout */}
            <div className="gold-callout-col">
              <div>
                <div className="gold-crown-icon" aria-hidden="true">
                  👑
                </div>
                
                <span className="eyebrow" style={{ color: "#d4af37", letterSpacing: "0.14em", fontSize: "11px" }}>
                  BEGIN HERE · INTAKE OPEN
                </span>
                
                <h3 style={{ fontSize: "clamp(26px, 2.8vw, 38px)", marginTop: "10px" }}>
                  The next chapter<br />
                  <em>needs leaders.</em>
                </h3>
              </div>

              <div className="heritage-pillar-tags">
                <span className="heritage-pillar-tag" style={{ borderColor: "#d4af37", color: "#d4af37" }}>
                  ✦ Executive Cohorts
                </span>
                <span className="heritage-pillar-tag" style={{ borderColor: "#d4af37", color: "#d4af37" }}>
                  ✦ Sululta Highland Campus
                </span>
                <span className="heritage-pillar-tag" style={{ borderColor: "#d4af37", color: "#d4af37" }}>
                  ✦ Public & Civic Leaders
                </span>
              </div>
            </div>

            {/* Right Column Body */}
            <div className="heritage-card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#fff", fontWeight: 500, marginBottom: "16px" }}>
                  Learning designed for people carrying the weight of public decisions. Each path begins with the same question: <em>what does the moment ask of us?</em>
                </p>

                <p style={{ fontSize: "14px", lineHeight: "1.7", color: "rgba(255, 255, 255, 0.75)" }}>
                  From Adwa and Mandela to 21st-century statecraft, the crucible of African leadership continues at our Sululta highland campus. Step forward to refine your judgement and lead transformative change.
                </p>
              </div>

              <div>
                {/* Swipe To Become A Leader Interactive Slider */}
                <div 
                  className="swipe-leader-container" 
                  ref={sliderTrackRef}
                  style={{
                    borderColor: isUnlocked ? "#228b22" : "rgba(212, 175, 55, 0.75)"
                  }}
                >
                  <div className="swipe-leader-track-text">
                    {isUnlocked ? "✓ ACCESS GRANTED · WELCOME TO AFLEX" : "SLIDE TO BECOME A LEADER ➔"}
                  </div>

                  <div
                    ref={handleRef}
                    className={`swipe-leader-handle ${isUnlocked ? "swipe-leader-unlocked" : ""}`}
                    style={{
                      transform: `translateX(${dragOffset}px)`
                    }}
                    onMouseDown={(e) => handleStart(e.clientX)}
                    onTouchStart={(e) => {
                      if (e.touches.length > 0) handleStart(e.touches[0].clientX);
                    }}
                  >
                    {isUnlocked ? "✓" : "➔"}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "14px", marginTop: "16px" }}>
                  <Link 
                    className="button button-primary" 
                    href={programsUrl}
                    style={{
                      background: "var(--gold)",
                      color: "#000",
                      fontWeight: 700,
                      padding: "14px 28px",
                      borderRadius: "30px",
                      fontSize: "15px",
                      boxShadow: "0 6px 20px rgba(158, 140, 57, 0.35)"
                    }}
                  >
                    <span>Find your path</span>
                    <span>↗</span>
                  </Link>

                  <span className="mono" style={{ fontSize: "12px", color: "rgba(212, 175, 55, 0.85)" }}>
                    SULULTA CAMPUS INTAKE · APPLY TODAY
                  </span>
                </div>
              </div>

              {/* Glowing Crown SVG Background */}
              <svg
                className="tibeb-watermark"
                viewBox="0 0 100 100"
                fill="rgba(212, 175, 55, 0.15)"
                aria-hidden="true"
              >
                <path d="M10,80 L90,80 L85,40 L65,60 L50,20 L35,60 L15,40 Z" />
              </svg>
            </div>
          </article>
        </div>

        {/* Progress Bar along bottom */}
        <div className="container" style={{ width: "100%" }}>
          <div className="heritage-progress-container">
            <div 
              className="heritage-progress-bar" 
              style={{ width: `${Math.max(5, scrollProgress * 100)}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
