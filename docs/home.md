# Page Spec — Home
Route: `/` (`/en`, `/am`)

## Purpose
First impression that establishes AFLEX as a serious federal leadership institution, routes three audiences (prospective trainees, media, partners) to the right next step, and surfaces live content (news) so the site never looks dormant.

## Section-by-Section Layout

1. **Header** (component 3.1) — transparent over hero, sticky.
2. **Hero**
   - Full-bleed campus photograph (21:9 desktop crop, real Sululta campus — see design system §4).
   - Eyebrow (Plex Mono): "FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA · COUNCIL OF MINISTERS"
   - H1 (Fraunces, `--text-display`): "Where African Leadership Is Refined" (placeholder headline — confirm final copy with AFLEX comms; must not just restate the mission paragraph verbatim)
   - Sub-lead (Public Sans `--text-lead`, 1 sentence): mission-derived, e.g. "A premier academy for Africa's public, private, and civic leaders — training, research, and reflection at our Sululta campus."
   - CTA row: Primary "Explore Programs" (→ Programs), Secondary "Apply for Training" (→ Programs application anchor)
   - The Weave (§5) traced along the bottom edge of the hero image.
3. **Live news strip** — 3 most recent News & Events cards (component 3.3 News card) in a row, "View All News →" text link. Replaces the current dead "NEWS" heading with no content.
4. **Programs overview** — section eyebrow "PROGRAMS", H2 "Three Paths to Leadership Excellence" (placeholder), 3 Program cards (Leadership Development Training / Project WILD / PSLE), each with duration tag + 2-line description + Read More.
5. **Research & Policy teaser** — 1 featured card (Pan-Africanism study) with a pull-quote from the research intro, "Explore Research →" link to Programs#research.
6. **Campus / "Why Sululta"** — 2-column: photography left, short copy right (serene environment, courtyard, training halls, accommodation) — pulls the campus story currently buried in About Us copy into a first-class homepage moment.
7. **Testimonials** — grid of 5 quote cards (component 3.3), real names/titles as provided by AFLEX (Dr. Nagesh Wagesho, H.E Melese Alemu, Fisha Yitagesu, Dr. Seleshi Bekele, Selamawit Kassa). No carousel.
8. **Stat band** — 3–4 stat cards. **Blocked on real numbers from AFLEX** (see PRD §8.1); render as "Coming Soon" or omit at launch rather than fabricate.
9. **Partners** — static logo grid (replaces empty "PARTNERS" heading in current site). **Content gap: partner logos not present in source content, request from AFLEX.**
10. **Footer** (component 3.7).

## Components Used
Header, Hero, News card, Program card, Featured research card, Testimonial card grid, Stat card, Partner logo grid, Footer, The Weave divider (×3, between sections 3/4, 6/7, 8/9 — not every boundary).

## Assets Needed
- Hero photography: 1× wide campus shot, min 2400×1000px, both a bright day-lit and golden-hour option for A/B.
- 3 latest news thumbnails (from CMS, ongoing — not static assets).
- Campus "why Sululta" photo set: 3–4 images of courtyard/halls/accommodation.
- Testimonial subject photos (optional headshots) — not in current source content, nice-to-have.
- Partner/institutional logos (SVG, transparent bg) — **gap, request from AFLEX.**
- Real stat figures — **gap, request from AFLEX.**
