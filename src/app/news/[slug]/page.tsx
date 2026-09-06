import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { notFound } from "next/navigation";
import { newsArticles, type NewsItem } from "@/lib/news-data";

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const related = newsArticles.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <SiteHeader active="News & Events" />
      <main id="main-content">
        {/* Article Hero Banner */}
        <section className="article-hero-modern">
          <div className="article-hero-bg">
            <img src={article.image} alt={article.title} />
            <div className="article-hero-overlay" />
          </div>

          <div className="container article-hero-content">
            <div className="breadcrumb" style={{ marginBottom: "20px" }}>
              <Link href="/">HOME</Link> <b>/</b> <Link href="/news">NEWS & EVENTS</Link> <b>/</b> <span style={{ color: "var(--gold)" }}>{article.category}</span>
            </div>

            <div className="article-badge-row">
              <span className="news-editorial-badge" style={{ position: "static", display: "inline-block" }}>
                {article.category}
              </span>
              <span className="mono" style={{ color: "var(--gold)", fontSize: "12px" }}>
                {article.date} · {article.readTime}
              </span>
            </div>

            <h1 className="article-main-title">{article.title}</h1>

            <div className="article-author-byline">
              <div className="author-avatar-stamp">
                {article.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <strong>{article.author}</strong>
                <span className="mono" style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "11px", display: "block" }}>
                  {article.authorRole}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body Content */}
        <section className="article-body-section" style={{ background: "#050507", color: "#fff" }}>
          <div className="container article-body-container">
            <div className="article-body-main">
              <p className="article-lead-paragraph">{article.excerpt}</p>

              {/* Key Takeaways Callout */}
              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <div style={{ background: "#000000", borderLeft: "3px solid var(--gold)", padding: "20px 24px", borderRadius: "4px", margin: "24px 0 32px" }}>
                  <span className="mono" style={{ color: "var(--gold)", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", display: "block", marginBottom: "10px" }}>
                    KEY TAKEAWAYS & STRATEGIC HIGHLIGHTS
                  </span>
                  <ul style={{ margin: 0, paddingLeft: "18px", color: "rgba(255, 255, 255, 0.9)", fontSize: "14px", lineHeight: "1.7" }}>
                    {article.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} style={{ marginBottom: "6px" }}>{takeaway}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="article-prose">
                {article.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Press Release Contact Information if applicable */}
              {article.pressContact && (
                <div style={{ background: "rgba(212, 175, 55, 0.08)", border: "1px solid rgba(212, 175, 55, 0.3)", padding: "16px 20px", borderRadius: "4px", margin: "28px 0" }}>
                  <span className="mono" style={{ color: "var(--gold)", fontSize: "11px" }}>MEDIA INQUIRIES & PRESS DESK</span>
                  <p style={{ margin: "4px 0 0", color: "#fff", fontSize: "13px" }}>
                    {article.pressContact}
                  </p>
                </div>
              )}

              {/* In-Article Callout Quote */}
              <div className="article-executive-quote">
                <span className="mono" style={{ color: "var(--gold)", fontSize: "11px", display: "block", marginBottom: "8px" }}>
                  AFLEX PERSPECTIVE ON STATECRAFT
                </span>
                <blockquote>
                  “Leadership excellence in Africa is not an abstract technique—it is an enduring moral commitment to sovereign capability and institutional trust.”
                </blockquote>
              </div>

              {/* Author Bio Box */}
              <div className="article-author-bio-card">
                <div className="author-bio-header">
                  <span className="mono" style={{ color: "var(--gold)", fontSize: "11px" }}>DISPATCH AUTHOR</span>
                  <h3>{article.author}</h3>
                  <span className="mono" style={{ color: "var(--gold)", fontSize: "12px" }}>{article.authorRole}</span>
                </div>
                <p>
                  Contributing strategic analyses, policy monographs, and executive perspectives on African statecraft and public institution reform.
                </p>
                <div style={{ marginTop: "16px" }}>
                  <Link className="button button-outline light" href="/contact" style={{ fontSize: "12px", padding: "8px 18px" }}>
                    <span>Contact Editorial Desk</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar with Quick Actions & Share */}
            <aside className="article-sidebar">
              <div className="sidebar-widget">
                <span className="eyebrow" style={{ color: "var(--gold)" }}>SHARE THIS DISPATCH</span>
                <div className="sidebar-share-buttons">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://aflexacademy.gov.et/news/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=https://aflexacademy.gov.et/news/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn"
                  >
                    X / Twitter ↗
                  </a>
                  <Link href="/news" className="share-btn">
                    Back to News Hub
                  </Link>
                </div>
              </div>

              <div className="sidebar-widget" style={{ marginTop: "24px" }}>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>EXECUTIVE INTAKE</span>
                <h4 style={{ color: "#fff", fontSize: "16px", margin: "8px 0 10px" }}>Ready to join an AFLEX cohort?</h4>
                <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6, marginBottom: "16px" }}>
                  Explore our leadership pathways and upcoming convenings at the Sululta highland campus.
                </p>
                <Link className="button button-primary" href="/programs" style={{ width: "100%", textAlign: "center", background: "var(--gold)", color: "#000", fontWeight: 600, fontSize: "13px" }}>
                  <span>Explore Programs</span>
                  <span>↗</span>
                </Link>
              </div>

              <div className="sidebar-widget" style={{ marginTop: "24px" }}>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>UPCOMING EVENTS</span>
                <h4 style={{ color: "#fff", fontSize: "15px", margin: "8px 0 10px" }}>Continental Leadership Summits</h4>
                <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.5, marginBottom: "14px" }}>
                  View the 2026–2027 calendar of high-level ministerial roundtables and residential retreats.
                </p>
                <Link className="button button-outline light" href="/news#events" style={{ width: "100%", textAlign: "center", fontSize: "12px" }}>
                  <span>View Events Calendar</span>
                  <span>↗</span>
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Related Dispatches */}
        <section className="related-articles-section" style={{ background: "#000000", color: "#fff", borderTop: "1px solid rgba(212, 175, 55, 0.2)" }}>
          <div className="container">
            <div className="section-heading" style={{ marginBottom: "36px" }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>CONTINENTAL DISPATCHES</span>
              <h2>Related Insights &<br /><em>Perspectives.</em></h2>
            </div>

            <div className="news-detailed-grid">
              {related.map((item) => (
                <article className="news-editorial-card" key={item.slug}>
                  <div className="news-editorial-thumb">
                    <img src={item.image} alt={item.title} />
                    <span className="news-editorial-badge">{item.category}</span>
                  </div>

                  <div className="news-editorial-body">
                    <div className="news-editorial-meta">
                      <span className="mono" style={{ color: "var(--gold)" }}>{item.date}</span>
                      <span className="mono">{item.readTime}</span>
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>

                    <div className="news-editorial-footer">
                      <Link className="text-link" href={`/news/${item.slug}`} style={{ color: "var(--gold)", fontWeight: 600 }}>
                        <span>Read Dispatch</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
