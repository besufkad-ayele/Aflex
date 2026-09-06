# AFLEX Academy Website Redesign — Product Requirements Document
### aflexacademy.gov.et
Version 1.0 · Owner: Urji Technology Solution PLC

---

## 1. Background & Problem Statement

African Leadership Excellence Academy (AFLEX) is a federal institution under the Council of Ministers of the FDRE, successor to the Meles Zenawi Leadership Academy, training senior national and (eventually) continental leaders at a purpose-built campus in Sululta. Its current website (aflexacademy.gov.et):

- Uses an unstyled default WordPress theme with no distinct visual identity.
- Has an empty/placeholder homepage hero and news marquee.
- Presents leadership bios (board, executive team) with no photography.
- Lists programs (On-Demand Training, Project WILD, PSLE) only as short teaser blurbs with dead-feeling "Read More" links.
- Duplicates the "Leadership Development Program" content verbatim across About Us and Programs.
- Has no visible bilingual (English/Amharic) support despite being a federal Ethiopian institution.
- Has weak information scent for high-intent audiences: prospective trainees don't know how to apply, job seekers can't find real listings, vendors can't find procurement terms.

**Goal:** Redesign and rebuild the site so it reads as a credible, modern, government-caliber institution — matching the seriousness of its actual mandate (training heads of state and ministers) — while remaining fast, accessible, bilingual, and easy for AFLEX staff to maintain without a developer.

---

## 2. Objectives & Success Metrics

| Objective | Metric |
|---|---|
| Establish a credible, distinct visual identity | Qualitative stakeholder sign-off; no shared components with default WP/Elementor themes |
| Improve program discoverability & lead capture | Increase in "Apply/Inquire" form submissions per program; reduced bounce rate on `/programs` |
| Make news & events actually functional | News listing with working pagination/filtering, replacing the current empty marquee |
| Support bilingual audience | 100% of page templates support EN + Amharic content; language toggle used measurably in analytics |
| Reduce reliance on developer for content updates | AFLEX comms staff can publish a News post, Vacancy, or Procurement notice via CMS without code changes |
| Meet government accessibility/performance bar | WCAG 2.1 AA audit pass; Lighthouse Performance ≥ 90, Accessibility ≥ 95 |

---

## 3. Users & Personas

1. **Senior public official (trainee/participant)** — a minister, regional president, or ambassador (per the existing testimonials) checking program details, dates, and facility quality before attending or sending staff. Needs credibility signals fast.
2. **Institutional partner / researcher** — reads Research & Policy Advisory content (Pan-Africanism study, thematic areas), may want to download publications.
3. **Prospective Project WILD applicant** — a woman leader in the public sector evaluating the 12–18 month program; needs eligibility, timeline, and an application path — currently entirely missing from the site.
4. **Job seeker** — checks Vacancy; currently a near-empty page.
5. **Vendor/supplier** — checks Procurement for open tenders; currently not represented in the delivered content at all and must be scoped.
6. **Journalist / media** — checks News & Events for recent activity and press assets.
7. **AFLEX communications/HR staff (internal, admin)** — needs to publish news, vacancies, procurement notices, and event listings regularly without engineering support.

---

## 4. Information Architecture / Sitemap

```
Home
├─ About Us
│   ├─ Message from the Chief of Academy
│   ├─ Our Story (reestablishment, mandate)
│   ├─ Vision / Mission / Values
│   ├─ Pillars (Innovate / Integrate / Impact)
│   ├─ Board Members
│   └─ Senior Executive Team
├─ Programs
│   ├─ Leadership Development Training (short-term)
│   ├─ Project WILD (long-term)
│   ├─ Public Service Leadership Excellence (PSLE)
│   └─ Research & Policy Advisory
│       └─ Pan-Africanism Research (+ future thematic publications)
├─ News & Events
│   ├─ News listing (paginated, filterable by category)
│   ├─ Article detail
│   └─ Upcoming Events (calendar/list)
├─ Gallery / Resources
│   ├─ Photo/video gallery (campus, cohorts, events)
│   └─ Resource downloads (brochures, research PDFs)
├─ Vacancy
│   ├─ Open positions listing
│   └─ Position detail + apply flow
├─ Catalog
│   └─ Course/training catalog (filterable by duration, modality, audience)
├─ Procurement (footer-linked, currently empty — new build)
│   └─ Open tenders / bid documents
├─ Scholarship (footer-linked, currently empty — new build)
│   └─ Scholarship/fellowship opportunities tied to programs
├─ Contact Us
├─ Campus Locator ("Find Your Way") — new page, utility-bar or footer placement
├─ Online Learning (existing utility-bar link — LMS portal)
├─ Library (existing utility-bar link)
├─ FAQ (existing utility-bar link)
└─ Privacy Policy / Accessibility Statement
```

---

## 5. Functional Requirements by Page

### 5.1 Home
- Hero: full-bleed campus photography, institutional headline + one-line mission, primary CTA ("Explore Programs") + secondary CTA ("Apply for Training").
- Live news strip (replace current empty "NEWS" marquee) pulling latest 3 posts from CMS.
- Programs overview (3 program cards linking to Programs page sections).
- Research & Policy teaser (1 featured study, e.g. Pan-Africanism).
- Testimonial grid (real quotes, already provided — Dr. Nagesh Wagesho, H.E Melese Alemu, Fisha Yitagesu, Dr. Seleshi Bekele, Selamawit Kassa).
- Partner logos (static grid, not marquee).
- Stat band (alumni trained, cohorts completed, partner institutions) — **content gap: must be sourced from AFLEX before build**, do not fabricate numbers.

### 5.2 About Us
- Message from the President/Chief of Academy (Zadig Abreha) with portrait.
- Reestablishment history (June 2021, Council of Ministers, prior identity as Meles Zenawi Leadership Academy).
- Vision, Mission, Values (6 values as icon grid), Pillars (3, as icon grid).
- Board Members grid (7 members) — **content gap: needs photography**, currently text-only.
- Senior Executive Team grid (3 members) — same gap.
- Campus section: Sululta facility description + photography (currently only mentioned in passing).

### 5.3 Programs
- Do not duplicate About Us copy verbatim (current site's flaw) — Programs page should be the canonical detailed version; About/Home only tease it.
- Three program cards → detail sections/pages: Leadership Development Training, Project WILD, PSLE. Each needs: duration, modality (in-person/hybrid), audience, eligibility, and an "Inquire/Apply" CTA that opens the contact/application form (§3.5 of design system) — **currently none of the three programs have any application mechanism at all.**
- Research & Policy Advisory section: thematic areas list (8 areas) + featured research (Pan-Africanism study) with downloadable PDF where available.

### 5.4 News & Events
- Functional listing with pagination, category filter (News / Press / Event), and search.
- Article detail template: hero image, byline/date, body, related articles.
- Upcoming Events: list or simple calendar view with date, title, RSVP/inquiry link — **currently a placeholder heading with no content at all.**

### 5.5 Gallery / Resources
- Photo/video grid organized by album (Campus, Cohorts, Events, Pan-Africanism Forum, Green Legacy Program).
- Resource downloads section: brochures, program PDFs, past research publications, using the "downloadable-document row" component from the design system.

### 5.6 Vacancy
- Listing of open positions (title, department, location, closing date) with an empty state ("No open positions at this time — check back soon" rather than a blank page, which is the current behavior).
- Position detail page: full description, requirements, how-to-apply, closing date, and an application form or upload flow with a confirmation/reference number on submit.

### 5.7 Catalog
- Structured course/training catalog, filterable by duration (short/long-term), modality (in-person/hybrid), and audience (senior executive/emerging leader/women leaders).
- Each catalog entry links to its Program detail page — avoids the current site's ambiguity between "Programs" and "Catalog" being unclear in purpose.

### 5.8 Procurement (new)
- Open tenders/bid notices list with closing dates and downloadable bid documents (PDF).
- Standard government procurement disclosure text (framework to be confirmed with AFLEX legal/finance).

### 5.9 Scholarship (new)
- Any scholarship/fellowship tracks tied to programs (e.g. Project WILD sponsorship) — **content gap, needs AFLEX input on whether this is active.**

### 5.10 Contact Us
- Address (Sululta campus + any Addis Ababa liaison office), phone, email, embedded map, and a general inquiry form.

### 5.11 Campus Locator ("Find Your Way") — new page
- Interactive two-pane site-plan map + synced, filterable building directory (component §3.10 of the design system) — helps a visiting trainee, minister, or vendor find a specific building/hall once on the physical Sululta campus, not just view it as a photo.
- Arrival essentials (check-in point, parking, accessibility notes, emergency point) and a downloadable/printable campus map PDF for on-site use where connectivity may be inconsistent.
- **Content gap:** building-by-building layout, room counts/capacities, and arrival-essentials details all need to come from AFLEX facilities/operations — do not estimate.

---

## 6. Non-Functional Requirements

- **Bilingual:** English + Amharic content parity on every template (see design system §3.8, §7).
- **Performance:** Lighthouse Performance ≥ 90 on 4G profile; image optimization (WebP/AVIF with fallback), lazy-loading below the fold.
- **Accessibility:** WCAG 2.1 AA (see design system §7).
- **SEO:** Proper meta titles/descriptions per page, OpenGraph tags for News/Events sharing, sitemap.xml, structured data (Organization, Event schema for News & Events).
- **Security:** `.gov.et` TLS, CSP headers, admin/CMS behind authenticated access, form submissions rate-limited/spam-protected (reCAPTCHA or equivalent) — relevant given Vacancy/Procurement forms could be spam targets.
- **Content management:** Non-technical AFLEX staff must be able to independently publish/edit: News posts, Events, Vacancies, Procurement notices, Gallery items, without a developer.
- **Hosting/uptime:** Government institutional expectation of high availability; recommend CDN-fronted static/SSR hybrid rather than raw shared WordPress hosting (current setup's likely bottleneck).

---

## 7. Recommended Technical Approach

*(Recommendation, to align with your existing stack — confirm with AFLEX IT before committing.)*

- **Frontend:** Next.js (App Router) for SSR/SSG hybrid — fast public pages, good SEO, supports i18n routing (`/en`, `/am`) cleanly.
- **CMS:** Headless CMS (e.g. a Supabase-backed custom admin, or a lightweight open CMS) exposing content types for News, Events, Vacancies, Procurement notices, Programs, Board/Executive bios, Gallery albums — matches your NestJS/GraphQL/Supabase stack for a custom lightweight backend rather than adopting WordPress again.
- **Forms:** NestJS API endpoints for Contact/Application/Procurement inquiries, storing submissions in Postgres with an auto-generated reference number returned to the submitter (per design system §3.5).
- **Media:** Object storage (Supabase Storage or GCS) with a CDN in front for gallery/news images.
- **i18n:** `next-intl` or similar, content-type driven so Amharic isn't a bolt-on translation layer but a first-class content field per entry.

---

## 8. Content Gaps to Resolve With AFLEX Before Build

1. Real, sourced statistics for any "impact numbers" (alumni count, cohorts, partner institutions) — do not fabricate.
2. Professional photography: campus, board members, executive team, program cohorts.
3. Whether Procurement and Scholarship pages are currently active programs or need placeholder "coming soon" states at launch.
4. Amharic translations for all core page content (not just navigation labels).
5. Confirmation of program application/eligibility details for Project WILD and PSLE (currently teaser copy only, no criteria).
6. Legal/compliance text required for a `.gov.et` domain (privacy policy update, accessibility statement, procurement disclosure standard language).
7. Accurate Sululta campus site plan/building layout, room-level detail, and arrival essentials (check-in, parking, accessibility, emergency point) for the new Campus Locator page.

---

## 9. Phased Rollout

**Phase 1 — Foundation (design system implementation + core pages):** Home, About Us, Programs, Contact Us, new visual identity live.
**Phase 2 — Content operations:** News & Events (with working CMS), Gallery/Resources, Vacancy with real application flow.
**Phase 3 — Extended services:** Catalog, Procurement, Scholarship, Campus Locator ("Find Your Way"), bilingual Amharic rollout across all templates, search overlay.
**Phase 4 — Optimization:** Analytics review against success metrics (§2), accessibility audit remediation, performance tuning.

---

## 10. Out of Scope (this phase)

- Full LMS rebuild (Online Learning / Library remain existing linked systems unless separately scoped).
- Payment processing (no e-commerce identified in current content).
- Native mobile app.     