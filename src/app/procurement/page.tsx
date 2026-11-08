import Link from "next/link";
import { EmptyState, PageFrame, SectionTitle } from "@/components/page-primitives";
import { getPublishedTenders } from "@/lib/cms/public-content";

export const metadata = {
  title: "Procurement",
  description: "Official procurement notices and bid documents from AFLEX Academy.",
};

function formatClosing(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function Procurement() {
  const tenders = await getPublishedTenders();

  return (
    <PageFrame
      active="Procurement"
      crumb="Procurement"
      title="Procurement"
      intro="Official notices and bid documents from the African Leadership Excellence Academy."
    >
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="OPEN TENDERS"
            title={
              <>
                Public work, made
                <br />
                <em>properly.</em>
              </>
            }
            copy="Procurement disclosure language and active notices are published here after review by AFLEX finance and legal teams."
          />

          {tenders.length === 0 ? (
            <EmptyState
              title="No open tenders at this time"
              copy="There are no procurement notices available for publication."
            />
          ) : (
            <div className="space-y-4" style={{ marginTop: 32 }}>
              {tenders.map((tender) => (
                <article
                  key={tender.id}
                  style={{
                    border: "1px solid var(--line-light, #e2e8f0)",
                    padding: "24px 28px",
                    background: "#fff",
                  }}
                >
                  <div className="mono" style={{ color: "var(--gold)", fontSize: 12, marginBottom: 8 }}>
                    {tender.tender_no} · {tender.procurement_type}
                  </div>
                  <h3 style={{ margin: "0 0 10px", fontSize: 22 }}>{tender.title}</h3>
                  <p style={{ margin: "0 0 16px", color: "var(--muted-light, #64748b)", fontSize: 15 }}>
                    Closing: {formatClosing(tender.closing_date)}
                    {tender.bid_bond_amount != null
                      ? ` · Bid bond: ${tender.bid_bond_amount.toLocaleString()} ${tender.bid_bond_currency}`
                      : ""}
                  </p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {tender.tor_document_url ? (
                      <a
                        className="button button-primary"
                        href={tender.tor_document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Download TOR</span> <span>↗</span>
                      </a>
                    ) : null}
                    <Link className="button button-outline" href="/contact?subject=procurement">
                      <span>Procurement inquiry</span> <span>↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageFrame>
  );
}
