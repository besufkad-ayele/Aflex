"use client";

import Link from "next/link";
import Image from "next/image";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { PanAfricanHeritage } from "@/components/pan-african-heritage";
import { ResearchPolicySection } from "@/components/research-policy-section";
import { HomeEventsStrip } from "@/components/home-events-strip";
import { useEffect, useRef, useState } from "react";
import type { Locale, LocaleCopy } from "@/lib/i18n";

interface LocalizedHomeClientProps {
  locale: Locale;
  text: LocaleCopy["home"];
}

const flagshipPrograms = [
  {
    id: "leadership-development",
    code: "01 / SHORT-TERM · 3–10 DAYS",
    title: "Leadership Development Training",
    description: "Focused executive learning for public, private, and civic leaders shaping Africa's next chapter. Tailored to high-stakes decision contexts.",
    tags: ["Executive Deliberation", "Strategic Decision-Making", "Sululta Campus"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: "project-wild",
    code: "02 / LONG-TERM · 12–18 MONTHS",
    title: "Project WILD",
    description: "The Women Integrated Leadership Development flagship supporting women leaders as they expand institutional influence and statecraft.",
    tags: ["Women in Leadership", "Executive Mentorship", "Applied Reform"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: "psle",
    code: "03 / EXECUTIVE · MODULAR",
    title: "Public Service Leadership Excellence",
    description: "Building the judgement, ethical fortitude, and managerial capability required for public institutions and civil services to thrive.",
    tags: ["Statecraft & Ethics", "Policy Implementation", "Modular Executive"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85"
  }
];

const testimonials = [
  {
    name: "Nagesh Wagesho (Dr/Eng.)",
    title: "South West Ethiopia Peoples' Regional State President",
    quote: "This is my second time attending training here at the Academy. Based on my observations, this academy has several good things…they all indicate that it will soon be an African Center of Excellence. I am sure it will keep enhancing the services it offers. The facilities, and instruction are globally competitive. In addition, the sport facilities are refreshing to the soul.",
    image: "/images/negash image.jpg"
  },
  {
    name: "H.E Melese Alemu",
    title: "Democracy Systems Coordinator, Prosperity Party (Minister)",
    quote: "The training facility is welcoming. Our stay here was pleasant and the services we received were top notch. The instructors were well prepared, and modern and scientific methods of instruction were employed. The Academy provided a conducive environment for learning.",
    image: "/images/melese.jpg"
  },
  {
    name: "Fisha Yitagesu",
    title: "CEO, Ethiopian Broadcasting Corporation",
    quote: "The service delivery of the academy is excellent. The quality of the building, the accommodation; the meeting rooms and hall were all satisfactory. The academy is built to international standards; it may be the first of its kind for our country. The place allowed us to connect with our teams, and we have built strong team spirit during our stay.",
    image: "/images/fisha.jpg"
  },
  {
    name: "Seleshi Bekele (Dr.) Engineer",
    title: "Ambassador Extraordinary & Plenipotentiary to the USA",
    quote: "The facilities are modern and comparable to other centers we have seen around the world. My suggestion is to include more recreational activities to complement the learning. You can also improve the courtyard to host more events and activities there.",
    image: "/images/seleshi.jpg"
  },
  {
    name: "Selamawit Kassa",
    title: "State Minister, Government Communication Service",
    quote: "It is my second time attending a program at the Academy. Both times I enjoyed my time here. The courses we attend are structured to give us plenty of time to reflect and note how we will put the learning into practice. The environment encourages reflection. I also have enjoyed all the amenities available on campus.",
    image: "/images/selam.jpg"
  }
];

const newsItems = [
  { 
    date: "07.06.24", 
    category: "ACADEMY", 
    readTime: "4 MIN READ",
    title: "Leadership, learning, and the work ahead", 
    excerpt: "Exploring the intersection of strategic governance, institutional ethics, and modern statecraft for Africa's emerging executive leadership.",
    slug: "leadership-learning-work-ahead",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=85"
  },
  { 
    date: "29.05.24", 
    category: "CAMPUS", 
    readTime: "3 MIN READ",
    title: "A place built for serious reflection", 
    excerpt: "How the purpose-built architecture and highland tranquility of Sululta foster focus, intellectual honesty, and deep peer exchange.",
    slug: "place-for-reflection",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=85"
  },
  { 
    date: "16.05.24", 
    category: "INSIGHT", 
    readTime: "5 MIN READ",
    title: "Rethinking the architecture of public service", 
    excerpt: "Practical frameworks for reforming public sector institutions to deliver sustainable value in rapidly changing socio-economic contexts.",
    slug: "rethinking-public-service",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=85"
  }
];

export default function LocalizedHomeClient({ locale, text }: LocalizedHomeClientProps) {
  const campusVideoRef = useRef<HTMLDivElement>(null);
  const voicesTouchStartX = useRef<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const onVoiceTouchStart = (clientX: number) => {
    voicesTouchStartX.current = clientX;
  };

  const onVoiceTouchEnd = (clientX: number) => {
    if (voicesTouchStartX.current == null) return;
    const delta = clientX - voicesTouchStartX.current;
    voicesTouchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) nextTestimonial();
    else prevTestimonial();
  };
  
  useEffect(() => {
    const container = campusVideoRef.current;
    if (!container) return;
    
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    
    const autoScroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= container.scrollWidth / 2) {
        scrollPosition = 0;
      }
      container.scrollLeft = scrollPosition;
    };
    
    const interval = setInterval(autoScroll, 30);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main-content">
        <section className="hero video-hero">
          <video className="hero-video" autoPlay muted loop playsInline>
            <source src="/videos/home_hero_video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="container hero-content" lang={locale}>
            <span className="eyebrow hero-eyebrow hero-enter">{text.eyebrow}</span>
            <h1 className="hero-enter hero-enter-delay-1">{text.title}<br /><em>{text.accent}</em></h1>
            <p className="hero-lead hero-enter hero-enter-delay-2">{text.lead}</p>

            {/* Key stats row */}
            <div className="hero-stats hero-enter hero-enter-delay-3">
              <div className="hero-stat">
                <strong>2,450m</strong>
                <span>Sululta Elevation</span>
              </div>
              <div className="hero-stat">
                <strong>54+</strong>
                <span>African Nations Served</span>
              </div>
              <div className="hero-stat">
                <strong>3</strong>
                <span>Flagship Programs</span>
              </div>
              <div className="hero-stat">
                <strong>Est. 2022</strong>
                <span>Academy Founded</span>
              </div>
            </div>

            <div className="button-row hero-enter hero-enter-delay-4">
              <Link className="button button-primary" href={locale === "en" ? "/programs" : `/${locale}/programs`}>
                {text.explore} <span>↗</span>
              </Link>
              <Link className="button button-outline light" href={locale === "en" ? "/programs" : `/${locale}/programs`}>
                {text.apply} <span>↗</span>
              </Link>
            </div>
          </div>
          <div className="hero-caption mono">01 / SULULTA CAMPUS<br />ELEVATION 2,450M</div>
          <div className="hero-scroll-hint mono">SCROLL</div>
        </section>
        
        <section className="news-strip" id="news">
          <div className="container">
            <div className="news-strip-header">
              <div>
                <div className="news-live-pill">
                  <span className="news-live-dot" />
                  <span>LATEST DISPATCHES</span>
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", margin: "4px 0 0", fontWeight: 600, letterSpacing: "-0.04em" }}>
                  Insights from the <em>Academy.</em>
                </h2>
              </div>
              <Link className="button button-outline light" href={locale === "en" ? "/news" : `/${locale}/news`} style={{ fontSize: "12px", padding: "10px 18px" }}>
                View all updates <span>↗</span>
              </Link>
            </div>

            <div className="news-cards-grid">
              {newsItems.map((item) => (
                <Link className="news-card-interactive" href={locale === "en" ? `/news/${item.slug}` : `/${locale}/news/${item.slug}`} key={item.slug}>
                  <div className="news-card-thumb" style={{ position: "relative" }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="news-card-badge">{item.category}</span>
                  </div>
                  <div className="news-card-body">
                    <div className="news-card-meta">
                      <span className="mono" style={{ color: "var(--gold)" }}>{item.date}</span>
                      <span className="mono" style={{ color: "rgba(255,255,255,0.5)" }}>{item.readTime}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <div className="news-card-footer">
                      Read dispatch <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Academy Events Strip */}
        <HomeEventsStrip locale={locale} />
        
        <section className="section programs-section black-section" id="programs" style={{ background: "var(--coffee)", color: "var(--white)", overflow: "visible", paddingBottom: "60px" }}>
          <div className="container" lang={locale}>
            <div className="section-heading">
              <span className="eyebrow" style={{ color: "var(--gold)" }}>{text.programs}</span>
              <h2 style={{ color: "var(--white)" }}>{text.programsTitle}</h2>
              <p style={{ color: "var(--muted-dark)" }}>{text.programsCopy}</p>
            </div>

            <div className="stacked-cards-container" aria-label="Flagship leadership programs">
              {flagshipPrograms.map((program, idx) => (
                <article
                  className="stacked-card-wrapper"
                  key={program.id}
                  style={
                    {
                      "--stack-index": idx,
                      "--card-image": `url(${program.image})`,
                    } as React.CSSProperties
                  }
                >
                  <div className="stacked-card-tab">
                    <Image
                      src="/images/aflex-logo.png"
                      alt=""
                      width={16}
                      height={16}
                      className="stacked-card-tab-logo"
                      aria-hidden="true"
                    />
                    <span className="stacked-tab-dot" />
                    <span>{program.code}</span>
                  </div>
                  <div className="stacked-card-inner">
                    <div className="stacked-card-left">
                      <h3><span>{program.code.split("/")[0]?.trim()}</span> {program.title}</h3>
                      <div className="stacked-card-separator" />
                      <p>{program.description}</p>

                      <div className="stacked-card-pills">
                        {program.tags.map((tag) => (
                          <span key={tag} className="stacked-card-pill">✓ {tag}</span>
                        ))}
                      </div>

                      <Link className="stacked-card-cta" href={locale === "en" ? `/programs#${program.id}` : `/${locale}/programs#${program.id}`}>
                        <span>{text.explore}</span>
                        <span className="stacked-card-cta-icon">↗</span>
                      </Link>
                    </div>

                    <div className="stacked-card-right" style={{ position: "relative" }}>
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="stacked-cards-hint mono" aria-hidden="true">
              Swipe to explore paths →
            </p>
          </div>
        </section>

        <ResearchPolicySection locale={locale} />
        
        {/* Sululta Campus Video Section */}
        <section className="campus-video-section" id="campus">
          <div className="campus-video-scroll" ref={campusVideoRef}>
            <video autoPlay muted loop playsInline className="campus-video-item">
              <source src="/videos/home_hero_video.mp4" type="video/mp4" />
            </video>
            <video autoPlay muted loop playsInline className="campus-video-item">
              <source src="/videos/continue_to_the_second_set.mp4" type="video/mp4" />
            </video>
            <video autoPlay muted loop playsInline className="campus-video-item">
              <source src="/videos/generate_another_video_use_all.mp4" type="video/mp4" />
            </video>
            <video autoPlay muted loop playsInline className="campus-video-item">
              <source src="/videos/Use_the_provided_room_view_pho (1).mp4" type="video/mp4" />
            </video>
            <video autoPlay muted loop playsInline className="campus-video-item">
              <source src="/videos/home_hero_video.mp4" type="video/mp4" />
            </video>
            <video autoPlay muted loop playsInline className="campus-video-item">
              <source src="/videos/continue_to_the_second_set.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="campus-copy-overlay">
            <div className="container">
              <div className="campus-copy-box" lang={locale}>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>{text.campus}</span>
                <h2>
                  {locale === "en" ? (
                    <>
                      Sululta is the future for<br />
                      <em>Africa&apos;s solutions.</em>
                    </>
                  ) : (
                    text.campusTitle
                  )}
                </h2>
                <p>
                  {locale === "en"
                    ? "From leadership and governance to energy, trade, and continental diplomacy — Sululta is where Africa shapes answers that work in every aspect of public life."
                    : text.campusCopy}
                </p>
                <Link className="button button-outline light" href={locale === "en" ? "/about" : `/${locale}/about`}>
                  <span>{text.explore}</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Building on centuries of wisdom */}
        <section className="legacy-section">
          <div className="container">
            <div className="legacy-grid">
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>AFRICA&apos;S LEGACY</span>
                <h2>
                  Building on centuries<br />
                  of <em>wisdom.</em>
                </h2>
              </div>
              <div>
                <p className="lead">
                  From ancient Ethiopia&apos;s contributions to civilization, to Mandela&apos;s vision of ubuntu, Africa has always been a wellspring of leadership philosophy.
                </p>
                <p>
                  This academy stands on that foundation. We honor the past while building the future—developing leaders who understand that true leadership is rooted in service, community, and the long view of history.
                </p>
                <p>
                  Ethiopia taught the world about resistance, sovereignty, and pride. Now, AFLEX continues that tradition by equipping Africa&apos;s leaders with the wisdom, skills, and vision needed for the challenges ahead.
                </p>
                <Link className="text-link" href={locale === "en" ? "/about" : `/${locale}/about`}>
                  <span>Learn our story</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="voices-section-modern" id="testimonials">
          <div className="container">
            <div className="voices-header">
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>{text.voices}</span>
                <h2>{text.voicesTitle}</h2>
              </div>
              <div className="voices-nav-btns">
                <button 
                  className="voices-nav-btn" 
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button 
                  className="voices-nav-btn" 
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>

            {/* Featured Voice Spotlight Card — swipeable on mobile */}
            <div
              className="featured-voice-card"
              onTouchStart={(e) => onVoiceTouchStart(e.changedTouches[0]?.clientX ?? 0)}
              onTouchEnd={(e) => onVoiceTouchEnd(e.changedTouches[0]?.clientX ?? 0)}
            >
              <div className="featured-voice-portrait" style={{ position: "relative" }}>
                <Image 
                  src={testimonials[activeTestimonial].image} 
                  alt={testimonials[activeTestimonial].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div className="featured-voice-badge">
                  LEADERSHIP COHORT
                </div>
              </div>

              <div className="featured-voice-content">
                <div className="quote-mark" style={{ color: "var(--gold)", opacity: 0.6, fontSize: "40px", lineHeight: "1", marginBottom: "8px" }}>“</div>
                <p className="featured-voice-quote">
                  {testimonials[activeTestimonial].quote}
                </p>
                <div className="featured-voice-author">
                  <strong>{testimonials[activeTestimonial].name}</strong>
                  <span>{testimonials[activeTestimonial].title}</span>
                </div>
                <div className="voices-mobile-dots" aria-hidden="true">
                  {testimonials.map((item, index) => (
                    <span
                      key={item.name}
                      className={`voices-mobile-dot ${index === activeTestimonial ? "active" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Leader Switcher — horizontal portable cards on mobile */}
            <div className="voices-switcher" role="tablist" aria-label="Leadership voices">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={index === activeTestimonial}
                  className={`voice-switch-tab ${index === activeTestimonial ? "active" : ""}`}
                  onClick={() => setActiveTestimonial(index)}
                >
                  <div className="voice-switch-avatar" style={{ position: "relative", width: "40px", height: "40px" }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                  </div>
                  <div className="voice-switch-info">
                    <strong>{item.name.split(" ")[0]} {item.name.split(" ")[1] || ""}</strong>
                    <small>{item.title}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
        
        <PanAfricanHeritage locale={locale} />
      </main>
      <SiteFooter />
    </>
  );
}
