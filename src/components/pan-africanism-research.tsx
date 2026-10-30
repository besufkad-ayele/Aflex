import Link from "next/link";
import Image from "next/image";

const researchAims = [
  "Refocus Africa’s agenda amid global security and pandemic aftershocks",
  "Guide Ethiopia’s moral and intellectual leadership on continental priorities",
  "Connect diaspora philosophy to contemporary stability and prosperity",
];

export function PanAfricanismResearch() {
  return (
    <section className="pan-africanism-section" id="pan-africanism">
      <div className="pan-africanism-banner">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          style={{ objectFit: "cover" }}
          priority
          src="/images/pan1.jpg"
          alt="Historical photograph of founding Pan-African leaders, including Emperor Haile Selassie I and Jomo Kenyatta, at an early African unity summit."
          className="pan-africanism-banner-image"
        />
        <div className="pan-africanism-banner-shade" />
        <div className="container pan-africanism-banner-copy">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>
            FEATURED RESEARCH PROJECT
          </span>
          <h2>
            Pan-Africanism Now:
            <br />
            <em>Pan-Africanism for a Changing World</em>
          </h2>
          <p className="pan-africanism-commission">
            A research project commissioned by the African Leadership Excellence
            Academy (AFLEX)
          </p>
        </div>
      </div>

      <div className="container pan-africanism-body">
        <div className="pan-africanism-grid">
          <div className="pan-africanism-narrative">
            <p className="pan-africanism-lead">
              Pan-Africanism evolved as a key intellectual and political movement
              among the global African diaspora in the late 19th and 20th
              centuries. Its objectives included the collective liberation,
              unification, independence, self-reliance, and development of Africa
              and people of African descent.
            </p>
            <p>
              As a philosophy and a political movement, Pan-Africanism has
              galvanized Africans and the greater African diaspora in the fight
              for justice, equality, and freedom. It spurred decolonization in
              Africa and the US civil rights movement in the 1960s. It can be
              seen as the contemporary struggle of Black people for justice and
              equality in Africa and beyond.
            </p>
            <p>
              AFLEX is studying Pan-Africanism and its significance in the
              contemporary struggle for stability, security, and prosperity. The
              analysis provides input on how to refocus and reprioritize
              Africa’s agenda in light of current events—especially deepening
              global security challenges—and shows directions in which Ethiopia
              can deploy its moral and intellectual leadership in the promotion
              of national and continental objectives, with implications for the
              rest of the world.
            </p>
          </div>

          <aside className="pan-africanism-aside">
            <span className="mono pan-africanism-aside-label">
              INQUIRY AIMS
            </span>
            <ul>
              {researchAims.map((aim) => (
                <li key={aim}>{aim}</li>
              ))}
            </ul>
            <div className="pan-africanism-aside-meta">
              <span className="mono">THEMATIC AREA</span>
              <strong>Pan-Africanism</strong>
              <span className="mono">COMMISSIONED BY</span>
              <strong>AFLEX Policy &amp; Research</strong>
            </div>
            <Link className="button button-outline" href="/contact?program=research">
              <span>Request the brief</span>
              <span>↗</span>
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
