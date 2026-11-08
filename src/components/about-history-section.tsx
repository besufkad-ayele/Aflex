import Image from "next/image";
import Link from "next/link";
import { aflexStoryMilestones, ceoHistory } from "@/lib/aflex-history-data";

export function AboutHistorySection() {
  return (
    <section className="about-history-section" id="history" aria-labelledby="aflex-history-heading">
      <div className="container">
        <div className="about-history-intro">
          <span className="eyebrow">OUR STORY & LEADERSHIP ERA</span>
          <h2 id="aflex-history-heading">
            From a national academy to Africa&apos;s
            <br />
            <em>leadership excellence mandate.</em>
          </h2>
          <p>
            AFLEX carries forward a highland tradition of executive learning — reestablished in 2021 with a continental mission, guided by successive institutional leadership.
          </p>
        </div>

        <div className="about-history-layout">
          <div className="about-timeline" aria-label="AFLEX institutional timeline">
            {aflexStoryMilestones.map((item, index) => (
              <article key={item.id} className="about-timeline-item">
                <div className="about-timeline-rail" aria-hidden="true">
                  <span className="about-timeline-dot" />
                  {index < aflexStoryMilestones.length - 1 ? <span className="about-timeline-line" /> : null}
                </div>
                <div className="about-timeline-body">
                  <span className="mono about-timeline-era">{item.era}</span>
                  <span className="about-timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  {item.titleAm ? <p className="about-timeline-am">{item.titleAm}</p> : null}
                  <p>{item.summary}</p>
                  {item.highlights?.length ? (
                    <ul className="about-timeline-highlights">
                      {item.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <aside className="about-ceo-history" aria-label="History of AFLEX chief executives">
            <div className="about-ceo-history-header">
              <span className="eyebrow">CEO HISTORY</span>
              <h3>Chief executives who stewarded the Academy.</h3>
              <p>
                Current leadership is published in full. Predecessor-era names can be added as archival records are confirmed — speeches link out to YouTube when available.
              </p>
            </div>

            <div className="about-ceo-history-list">
              {ceoHistory.map((ceo) => (
                <article key={ceo.id} className={`about-ceo-history-card status-${ceo.status}`}>
                  <div className="about-ceo-history-top">
                    {ceo.image ? (
                      <div className="about-ceo-history-photo">
                        <Image
                          src={ceo.image}
                          alt={ceo.name}
                          fill
                          sizes="96px"
                          style={{ objectFit: "cover", objectPosition: "center top" }}
                        />
                      </div>
                    ) : (
                      <div className="about-ceo-history-photo placeholder" aria-hidden="true">
                        AF
                      </div>
                    )}
                    <div>
                      <span className="mono about-ceo-history-period">{ceo.period}</span>
                      <h4>{ceo.name}</h4>
                      {ceo.nameAm ? <p className="about-ceo-history-am">{ceo.nameAm}</p> : null}
                      <p className="about-ceo-history-title">{ceo.title}</p>
                    </div>
                  </div>
                  <p className="about-ceo-history-summary">{ceo.summary}</p>
                  {ceo.focus?.length ? (
                    <ul className="about-ceo-history-focus">
                      {ceo.focus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="about-ceo-history-actions">
                    {ceo.youtubeUrl ? (
                      <a
                        href={ceo.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-speech-link"
                      >
                        Watch speech on YouTube ↗
                      </a>
                    ) : (
                      <span className="about-speech-pending">Speech link coming soon</span>
                    )}
                    {ceo.status === "current" ? (
                      <Link href="/about/leadership" className="about-inline-link">
                        Full hierarchy ↗
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
