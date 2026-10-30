import Link from "next/link";
import Image from "next/image";

export function ProgramsHeroSection() {
  return (
    <section className="programs-hero" aria-label="Programs and research">
      <div className="programs-hero-media" aria-hidden="true">
        <Image
          fill
          sizes="100vw"
          priority
          style={{ objectFit: "cover" }}
          src="/images/pan1.jpg"
          alt=""
          className="programs-hero-image"
        />
        <div className="programs-hero-overlay" />
      </div>

      <div className="container programs-hero-content">
        <span className="mono programs-hero-breadcrumb">
          HOME <b>/</b> PROGRAMS
        </span>
        <p className="programs-hero-brand">AFLEX</p>
        <h1>
          Programs &amp;<br />
          <em>Research</em>
        </h1>
        <p className="programs-hero-lead">
          Transformative curricula, policy research, and consulting that reshape
          African organizational and leadership culture.
        </p>
        <div className="button-row">
          <Link className="button button-primary" href="#offer">
            Explore training <span>↗</span>
          </Link>
          <Link className="button button-outline light" href="#pan-africanism">
            Pan-Africanism research <span>↗</span>
          </Link>
        </div>
      </div>

      <div className="programs-hero-caption mono">
        RESEARCH PROJECT · PAN-AFRICANISM
        <br />
        FOUNDING SUMMIT ARCHIVE
      </div>
    </section>
  );
}
