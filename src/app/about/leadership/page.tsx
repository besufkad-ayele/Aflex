import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { OrgHierarchySection } from "@/components/org-hierarchy-section";
import { boardMembers, seniorExecutives } from "@/lib/leadership-data";
import { orgHierarchy } from "@/lib/org-hierarchy-data";

export const metadata = {
  title: "Leadership Hierarchy | AFLEX Academy",
  description:
    "Full bilingual organizational hierarchy of AFLEX Academy — CEO, lead executives, deputies, and directorate seats with speech links when published.",
};

export default function LeadershipDirectoryPage() {
  return (
    <>
      <SiteHeader active="About AFLEX" />
      <main id="main-content">
        <section className="page-header blue-section leadership-hierarchy-hero">
          <div className="container">
            <Link href="/about#leadership" className="about-back-link">
              ← Back to About AFLEX
            </Link>
            <span className="mono breadcrumb">
              HOME <b>/</b> ABOUT <b>/</b> LEADERSHIP HIERARCHY
            </span>
            <h1 style={{ color: "#ffffff" }}>
              Institutional
              <br />
              <em>leadership hierarchy.</em>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.88)", maxWidth: 640 }}>
              Detailed bilingual directory of AFLEX seats — from the Chief Executive Officer through lead executives, deputies, and campus services. When a leader has a public address, the card links to YouTube.
            </p>
            <div className="leadership-hero-stats" aria-label="Directory snapshot">
              <div>
                <strong>{orgHierarchy.length}</strong>
                <span>Hierarchy seats</span>
              </div>
              <div>
                <strong>{seniorExecutives.length}</strong>
                <span>Published senior executives</span>
              </div>
              <div>
                <strong>{boardMembers.length}</strong>
                <span>Governing board members</span>
              </div>
            </div>
          </div>
        </section>

        <section className="leadership-directory">
          <div className="container">
            <div className="leadership-directory-header">
              <span className="eyebrow">ORGANIZATIONAL STRUCTURE</span>
              <h1>See how AFLEX is organized to deliver its mandate.</h1>
              <p>
                Roles are grouped by directorate. Deputies nest under their lead executives. Names and speech links can be filled as appointments and public addresses are confirmed.
              </p>
              <div className="leadership-directory-links">
                <Link href="/about#governance">Governing board on About →</Link>
                <Link href="/about#history">AFLEX story & CEO history →</Link>
              </div>
            </div>

            <div className="leadership-published-strip">
              <span className="eyebrow">PUBLISHED SENIOR TEAM</span>
              <div className="leadership-published-grid">
                {seniorExecutives.map((person) => (
                  <article key={person.id} className="leadership-published-card">
                    <span className="mono">{person.badge}</span>
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                    {person.externalUrl ? (
                      <a href={person.externalUrl} target="_blank" rel="noopener noreferrer">
                        Official profile ↗
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>

            <OrgHierarchySection />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
