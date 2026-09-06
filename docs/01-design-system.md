# AFLEX Academy — Design System
### African Leadership Excellence Academy · aflexacademy.gov.et redesign
Version 1.0 · Prepared for Urji Technology Solution PLC

---

## 1. Design Thesis

AFLEX is a federal Ethiopian institution (Council of Ministers mandate) training heads of state, ministers, regional presidents, and senior public servants at a purpose-built campus in Sululta. The current site reads as a generic WordPress leadership-consulting template — stock hero, default testimonial slider, no visual identity of its own. It undersells an institution whose actual context is: government gravitas, African renaissance ambition, and a physical highland campus meant for reflection.

**The redesign should feel like a state institution's charter, not a corporate training vendor's landing page.** Every visual decision should trace back to one of three ideas:

1. **Institutional authority** — this is a federal academy, not a private academy. Typography and layout should read as considered and permanent, the way a national archive or a constitution reads, not "book a demo."
2. **African leadership renaissance** — the academy's own language ("Africa's renaissance," "regain the lost structure of true African wisdom"). This licenses one real, restrained decorative signature drawn from African geometric textile/pattern traditions (see §5) — not a stock Africa map or acacia-tree silhouette.
3. **The Sululta campus as a place** — serene highland environment, "conducive environment for learning," courtyard, sport facilities. The site should use real photography of the physical campus as its emotional register, not abstract corporate photography of handshakes.

**Do not default to:** cream-background/terracotta-serif startup look, near-black + neon-accent SaaS look, or a stock "Africa-themed" orange/green/red flag palette. Those are the generic answers to this brief; see the token system below instead.

---

## 2. Design Tokens

The implementation standards that govern language, contrast, bilingual content, accessibility, and frontend code are documented in [03-language-accessibility.md](03-language-accessibility.md) and [04-code-practice.md](04-code-practice.md). Those documents are normative: when a page spec and an implementation detail conflict, the accessible, content-parity-safe option wins.

### 2.1 Color

| Token | Hex | Role |
|---|---|---|
| `--gold-600` | `#9e8c39` | Golden accent — buttons, button labels/text, navigation highlights, and "important area" accents. The single accent color in the system; no second accent hue. |
| `--blue-600` | `#1e73be` | Background 1 — one of the three alternating full-bleed section backgrounds. |
| `--white` | `#FFFFFF` | Background 2 — alternating section background; also body text set on black or blue. |
| `--black` | `#000000` | Background 3 — alternating section background; also body text set on white. |

**Surface system.** Large sections use a deliberate rhythm of **campus photography → white → black → gold CTA**, with each surface paired to a contrasting text color. Blue is a supporting color for short components, focus states, metadata, map diagrams, and selected rules; it is not used as a hero surface or as a dominant full-bleed page band. The same type scale, weights, and tracking are used everywhere (captions, body, headers all share one type language per §2.2); only the approved surface relationship changes:

- **On blue supporting components** (`--blue-600`) → white text/UI. Contrast 4.94:1 (passes AA normal text). Do not set black text on blue — only 4.25:1, AA-large only. Keep these components visually short and purposeful.
- **On white** (`--white`) → black text/UI. 21:1 (AAA).
- **On black** (`--black`) → white text/UI. 21:1 (AAA).
- **Gold** (`--gold-600`) reads strongest on **black** — 6.27:1 with black text/icons on gold, or gold on black, both pass AA normal text. This is why gold is specified for nav buttons and "important areas" on black. On white or blue, gold drops to 3.35:1 / ~2.3:1 — restrict gold-on-white or gold-on-blue to large text (≥24px), icons, borders, and underlines only; never body copy or small labels there.

**Muted / supporting tints.** No separate neutral-gray token — captions, metadata, and hairline borders are derived from the four core colors via opacity so the palette stays to exactly four hues:
- Muted text on white → `black @ 60%` (≈5.7:1, passes AA body text)
- Muted text on black or blue → `white @ 65%` (≥4.5:1 on both)
- Hairline borders/dividers → `black @ 12%` on white sections, `white @ 15%` on black or blue sections

**Note on error/validation states (§3.5):** the strict four-color system has no red. Rather than introduce a fifth hue, error states are signaled with a black (or white, on dark sections) border + inline warning icon + bold helper text, never by color alone — consistent with the existing WCAG "never color-alone" rule below.

#### Approved color relationships

The palette is intentionally small. The modern color-circle relationship is expressed through roles and contrast, not through adding decorative hues. Use only these pairings:

| Surface | Primary content | Supporting content | Accent / interactive |
|---|---|---|---|
| `--black` | `--white` | `--white` at 65% | `--gold-600`; `--white` outline |
| `--blue-600` | `--white` | `--white` at 65% | `--gold-600` for borders, icons, and underlines only |
| `--white` | `--black` | `--black` at 60% | `--blue-600` for focus; `--gold-600` for borders and underlines only |
| `--gold-600` | `--black` | `--black` at 80% | `--black` border |

Gold is never used for body copy or small labels on white or blue. Blue is a supporting section color, focus color, and short component accent; it is not the hero surface or hero overlay. The hero uses photography with a black/white text relationship so the navigation and captions remain legible over the image.

#### Image-loading fallback rule

Every image component must reserve its final aspect ratio before the image loads. Its fallback surface must use the same approved relationship as its intended text: black with white text, blue with white text, white with black text, or gold with black text. Never show gray, browser-default alt text over an unstyled surface, or a fifth placeholder color. A fallback should include a concise label only when the image context needs it; decorative image failures remain visually quiet and retain their accessible alternative text.

### 2.2 Typography

**Typeface — "Sora"** is the AFLEX website's font choice, used across headings and body copy (variable weight, geometric-grotesk character with a bit of warmth in its curves — reads as contemporary and legible rather than a startup-default sans). One family, used with a deliberate weight range so it still carries the "institutional charter" register from §1 without a separate serif display face:

- **Headings (H1–H3, display, eyebrow labels):** Sora 600 (SemiBold), tight tracking. Sora 700 (Bold) reserved for the hero display line only.
- **Body / UI / lead paragraphs:** Sora 400 (Regular), Sora 500 (Medium) for UI labels, nav items, and button text.
- **Utility / data — "IBM Plex Mono"** stays as the dedicated face for dates, durations, program codes, tags, reference numbers, and the footer/sitemap — Sora has no monospace cut, so Plex Mono continues to signal "official record" distinctly from Sora prose, per the original rationale.

**Type scale — golden ratio (φ = 1.618).** Every step is the previous step × 1.618, anchored on a 16px body size, replacing the earlier 1.25 modular scale:

| Token | Size (desktop) | Size (mobile) | Face / weight |
|---|---|---|---|
| `--text-display` | 178px / 1.0 | 44px / 1.05 | Sora 700 |
| `--text-h1` | 110px / 1.05 | 34px / 1.1 | Sora 600 |
| `--text-h2` | 68px / 1.1 | 28px / 1.15 | Sora 600 |
| `--text-h3` | 42px / 1.2 | 22px / 1.25 | Sora 600 |
| `--text-lead` | 26px / 1.4 | 19px / 1.5 | Sora 400 |
| `--text-body` | 16px / 1.65 | 16px / 1.6 | Sora 400 |
| `--text-small` | 14px / 1.5 | 14px / 1.5 | Sora 400 |
| `--text-eyebrow` | 12px / 1.2, +0.12em tracking, uppercase | same | Plex Mono 500 |

Notes on applying φ in practice:
- Desktop sizes above `--text-body` are the pure 16 × 1.618ⁿ chain (25.9→26, 41.9→42, 67.8→68, 109.7→110, 177.5→178), rounded to whole pixels.
- `--text-small` and `--text-eyebrow` sit *below* the 16px base as fixed practical floors rather than continuing the ratio downward (16 ÷ 1.618 ≈ 9.9px), since sub-12px text fails legibility and WCAG guidance — this is an intentional, documented deviation from strict φ at the bottom of the scale only.
- The desktop `--text-display`/`--text-h1` values (178px/110px) are correct φ math but large for direct use on small viewports — implement with `clamp()` (e.g. `clamp(2.75rem, 5vw + 1rem, 11.125rem)` for H1) so the ratio holds at desktop width and scales fluidly down to the mobile figures in the table, rather than hard-switching at a breakpoint.

### 2.3 Spacing & Grid

- Base unit **8px**. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Desktop container: max-width **1280px**, 24px side gutters, **12-column grid**, 24px gutters.
- Tablet: 8-column grid, 20px gutters. Mobile: 4-column, 16px gutters.
- Section vertical rhythm: 96px between major sections desktop, 56px mobile.
- Corner radius: **4px on cards/inputs, 2px on buttons/tags, 0px on the hero image and full-bleed panels.** Avoid the generic 16–24px "soft SaaS" radius everywhere — a government site should feel more precise/less bubbly.

### 2.4 Elevation & Border Language

Government-institutional restraint: prefer **1px hairline borders** (`black @ 12%` on white/blue sections, `white @ 15%` on black sections — see §2.1) over drop shadows for card separation. Reserve shadow only for floating/overlay UI (mobile nav drawer, modals, search overlay): `0 12px 32px rgba(0,0,0,0.16)`.

---

## 3. Core Components

For each component: purpose, anatomy, states, and usage rules.

### 3.1 Site Header / Navigation
**Anatomy:** Left — AFLEX wordmark + small seal mark. Center-right — primary nav (Home, About, Programs, News & Events, Gallery, Vacancy, Catalog). Far right — language toggle (EN / አማ), search icon, and a solid `gold-600` fill "Apply / Enroll" button with black text (6.27:1 contrast, see §2.1).
**Behavior:** Transparent over hero image (white text) on load; solidifies to `black` background with a 1px `gold-600` bottom hairline on scroll (this hairline is the recurring "seal" cue used across the site — see §5; gold reads strongest against black, per §2.1).
**Utility bar (above main nav, `black` background, 32px tall):** small links for Online Learning, Library, FAQ, in white text — matches the current site's existing utility-bar pattern, keep it, restyle it.
**Mobile:** hamburger → full-height drawer, `black` background, nav items in Sora 600 24px white, gold active/selected state, language toggle pinned to bottom.

### 3.2 Buttons
- **Primary:** `gold-600` fill, black Sora 500 text (6.27:1 contrast — see §2.1), 2px radius, 14px/28px padding. Hover: darkens fill slightly + 1px black bottom border appears (200ms). This is the one place gold is used as a fill, by design (§2.1) — everywhere else it stays a mark, not a background.
- **Secondary (on white):** transparent fill, 1.5px black border, black text. Hover: fills black, text turns white.
- **Secondary (on black or blue):** transparent fill, 1.5px white border, white text. Hover: border and text turn `gold-600`.
- **Text link / "Read More":** black text on white sections (white text on black/blue sections), underline offset 4px in `gold-600`, arrow glyph (→) that shifts 4px right on hover.
- Keep gold to buttons, nav highlights, underlines, and icons — never as a full section background (see alternating system, §2.1).

### 3.3 Cards
- **Program card:** white surface, 1px `black @ 12%` border, 4px radius. Top: Plex Mono eyebrow tag (e.g. "SHORT-TERM · 3–10 DAYS") in `gold-600` (large/bold weight so it stays legible at gold-on-white contrast, per §2.1). Sora 600 22px title in black. 2-line Sora 400 description, truncated. "Read More →" text link. Hover: border becomes `gold-600`, subtle 2px lift (translateY(-2px)), no shadow.
- **News/Event card:** image (4:3, real photography only — no stock), Plex Mono date stamp overlaid bottom-left on the image in a small `black` chip with white text, headline below in Sora 600 20px black.
- **Testimonial card:** NOT a slider/carousel by default (current site's weak point) — render as a **masonry/grid of quote cards** on the About/Home page so all voices are visible without interaction, each with name, title/role, and organization in Plex Mono small caps beneath a Sora 400 italic pull-quote (24–28px), a thin `gold-600` quotation mark glyph as the only decoration.
- **Stat/impact card:** big Sora 700 numeral (e.g. "500+"), Plex Mono label beneath. Used sparingly — only for real, sourced numbers (alumni count, cohorts, partner institutions), never invented.

### 3.4 Section Divider — "The Weave" (see §5 for full spec)
A thin horizontal pattern band (12–16px tall) used between major page sections instead of a plain hairline, built from a repeating geometric unit inspired by Ethiopian tibeb/handwoven-border motifs, rendered in a single stroke color (`gold-600` at 60% opacity on white or blue sections, `white @ 40%` on black sections). Used **max once per section boundary** — this is the site's one ornamental signature; it must not appear on every rule or button.

### 3.5 Forms (Contact, Vacancy application, Procurement inquiry, Scholarship inquiry)
- Label above field, Sora 500 14px, black.
- Input: white fill, 1px `black @ 12%` border, 4px radius, 14px padding, Sora 400 16px. Focus: border becomes `blue-600` + 2px `blue-600` outline offset 2px (visible keyboard focus, WCAG-required — government site must meet WCAG 2.1 AA; blue as the dedicated focus color keeps it distinct from gold's CTA/button meaning).
- Error state: since the palette has no red (§2.1), signal errors with a 1.5px black border + inline warning icon + bold black helper text — never color-alone, and no fifth hue introduced.
- File upload (CVs, tender documents): dashed 1.5px `black @ 12%` box, drag-active state turns `blue-600`.
- Submit button: primary button style (gold fill, black text); on submit show inline confirmation panel (not a modal) with a reference/tracking number in Plex Mono — important for a government process (job/tender applicants expect a receipt).

### 3.6 Breadcrumb / Page Header (interior pages)
Every interior page (About, Programs, single News article, Vacancy detail, Catalog item) opens with: Plex Mono breadcrumb trail (`Home / Programs / Project WILD`), then Sora 600 H1, then a 1-line Sora 400 dek. This replaces the current site's abrupt jump straight into body copy with no page framing.

### 3.7 Footer
`black` background, white text, `gold-600` for link hover states and the seal mark accent. 4-column layout: (1) AFLEX seal + one-line mission + physical address (Sululta) + map pin icon; (2) Sitemap column (mirrors primary nav) in Plex Mono uppercase small; (3) Sitemap column 2 (Vacancy, Procurement, Scholarship, Contact); (4) Newsletter/subscribe field + social icons (Instagram, LinkedIn, YouTube for training footage). Bottom bar: copyright, Privacy Policy, and — required for a `.gov.et` domain — an accessibility statement link.

### 3.8 Language Toggle
`EN` / `አማ` pill toggle in the header. Design must budget for Amharic (Ethiopic script) rendering: Sora has no Ethiopic glyphs, so define a fallback pairing — **Noto Sans Ethiopic** for both Amharic headings and body (matched in weight to Sora 600/400 respectively) — matched in x-height/weight to Sora as closely as possible so the two language versions feel like the same institution, not a bolted-on translation.

### 3.9 Search Overlay
Full-screen `black` overlay (not a dropdown) triggered from the header search icon — large Sora 600 white input with `gold-600` cursor/underline accent, live results grouped by type (Programs / News / Pages / Downloads).

### 3.10 Interactive Campus Locator ("Find Your Way")
Supports the new Campus Locator page (see `pages/campus-locator.md`). A two-pane layout: left pane is a simplified vector site plan of the Sululta campus (custom-illustrated, not a satellite screenshot — consistent with the "no stock photography" direction in §4) with numbered/labeled building markers in `gold-600`; right pane is a synced, filterable building directory list. Selecting a building in the list highlights its marker on the map (and vice versa); each entry expands inline to show what's inside it (e.g. "Training Hall A — 3 seminar rooms, 120-seat auditorium") rather than navigating away. Mobile: map and list stack vertically, map pinch-zoomable, directory becomes the primary scroll surface with a small persistent map toggle. A "Get Directions to Campus" button separately routes to an external maps app for arrival — the locator itself is for wayfinding *within* the grounds, not driving directions.

---

## 4. Imagery & Asset Direction

The single biggest quality gap in the current site is imagery — mismatched stock-feeling headshots and an empty hero. Direction for the redesign:

- **Hero & campus photography:** real photography of the Sululta facility (exterior architecture, courtyard, training halls, accommodation) shot in early-morning or late-afternoon highland light (the site already claims "serene environment" — the photography should prove it, not just say it). Wide 21:9 crops for hero, 4:3 for cards.
- **Leadership portraits:** Board members and executive team currently have no photos at all in the source content — commission consistent studio portraits (white seamless background, same lighting rig throughout) for the Chairperson, board, and senior executive team grid, so the whole grid can sit cleanly on either a white or black section per §2.1.
- **Iconography:** single-weight line icons (1.5px stroke, 24px grid) for the six values (Civility, Optimity, Magnanimity, Integrity, Novelty, Glocality) and the three pillars (Innovate, Integrate, Impact) — commission as a custom 9-icon set rather than a generic icon library, so they read as belonging to AFLEX specifically.
- **The seal/wordmark mark:** a simplified geometric emblem (not a photographic crest) usable at favicon size, derived from the pattern unit in §5.
- **Campus site-plan illustration:** a custom, simplified top-down vector illustration of the Sululta campus layout (building footprints, pathways, courtyard, parking) for the Campus Locator (§3.10) — commissioned once from an accurate site survey/blueprint, not a satellite-image crop, so it stays legible as a wayfinding diagram rather than a map screenshot.
- **Do not use:** generic Africa-continent silhouettes, stock handshake/boardroom photography, flag-color gradients, acacia-tree clipart.

---

## 5. Signature Element — "The Weave"

Per the design process, spend the site's one real ornamental risk in a single, restrained, recurring device:

A **single-stroke geometric line pattern** built from one repeating unit — a diamond-and-chevron motif drawn from Ethiopian handwoven textile borders (tibeb) — rendered not as a busy printed textile but reduced to a minimal vector line (like a wax-seal border or a currency guilloché), so it reads as "official/ceremonial" as much as "cultural." Uses:

1. A thin horizontal band between major sections (§3.4).
2. Traced once, subtly, along the bottom edge of the hero image on Home.
3. As the enclosing ring around the AFLEX seal mark in the footer/favicon.
4. As a loading/transition accent — never as a repeating all-over background pattern, never behind body text.

This is the element that should make a screenshot of this site recognizable as AFLEX specifically and not a generic African-institution template.

---

## 6. Elevating Beyond the Template Look

The current site's core problem isn't any single element — it's that every section is a centered, default-width Elementor block (headline, paragraph, 3-up icon row, repeat), which reads as templated no matter what colors or fonts sit on top of it. These are the specific structural moves that make a screenshot look like a built product, not a theme:

- **Break the centered-column habit.** Elementor/WordPress defaults to everything centered in a single max-width column. Use the 12-column grid (§2.3) asymmetrically instead — e.g. a 7/5 split for the hero (headline left, campus photo bleeding to the right edge), an offset 4/8 split for the Chief's message (portrait small and left-aligned, not centered above the quote). Centering should be a deliberate choice for 1–2 moments (e.g. a closing CTA), not the default for every section.
- **Real content-driven imagery, not icon-and-headline stacks.** The current Values/Pillars sections are icon + headline + one line — the generic "feature grid" every template ships with. Keep the icon grid (§4) but pair it with one full-width photographic break between sections so the page has visual rhythm (image, then grid, then image) instead of six stacked identical card rows.
- **One orchestrated hero moment, not a static banner.** On load: the hero photo is present immediately (no blank flash), the headline and CTA fade+rise in on a 400ms stagger (§7), and the Weave (§5) draws itself along the photo's bottom edge once. This single sequence is worth more than scattering small hover animations everywhere else.
- **Purposeful negative space.** Government/institutional sites read as credible partly through restraint — increase the standard section padding from a template's typical 60px to the 96px desktop rhythm already specified (§2.3), and let the Program/News cards breathe in a 3-column grid with real gutters rather than a cramped 4-up template row.
- **A real 404 and empty-state design**, not the theme default. Use the Weave motif and the same empty-state language as Vacancy/News (see each page spec) — a missed page should still feel like AFLEX, not like WordPress's stock "Page Not Found."
- **No stock plugin widgets.** Testimonial carousels, Elementor's default accordion FAQ, and marquee logo sliders are the clearest "template" tells on the current site — every one of them is replaced in this system with a static, fully-visible alternative (testimonial grid §3.3, static partner grid §9 checklist) that's also more accessible.
- **Consistent interaction language.** Every clickable element uses the same hover physics: 2px lift + border-color shift for cards, underline-offset shift for text links, fill-invert for outlined buttons (§3.2–3.3) — a template shows five different hover styles across five different page-builder widgets; a built product shows one consistent language everywhere.

---

## 7. Motion

Restrained and purposeful, matching the institutional register:
- Page load: header and hero content fade+rise 12px over 400ms, staggered 60ms per element. No parallax gimmicks.
- Scroll reveal: cards/sections fade+rise 8px once, 300ms, `translateY` only, respecting `prefers-reduced-motion` (disable entirely).
- The Weave divider (§5) may "draw on" (stroke-dashoffset animation) once per section on first scroll into view — this is the one animated flourish permitted.
- No auto-playing testimonial carousels, no infinite marquees for partner logos (use a static wrapped grid instead — better for accessibility and for a government audience skimming on a slow connection).

---

## 8. Accessibility & Government-Site Standards

Because this is a `.gov.et` institutional site:
- WCAG 2.1 AA minimum across all text/background pairings (see §2.1 contrast notes).
- Full keyboard navigation with visible focus rings (§3.5) on every interactive element, not just form fields.
- All imagery requires descriptive alt text; video (training footage) requires captions.
- Bilingual EN/Amharic parity — every page template must have an Amharic content slot, not just the homepage.
- Reduced-motion support (§7).
- Minimum tap target 44×44px on mobile nav and buttons.
- Skip-to-content link (the current site already has one — preserve and restyle it, don't remove it).

---

## 9. Component Inventory Checklist

Use this as the build checklist against the PRD:

- [ ] Header/nav (sticky, transparent→solid, mobile drawer)
- [ ] Utility bar
- [ ] Language toggle (EN/AM)
- [ ] Search overlay
- [ ] Hero (full-bleed photo + Weave edge)
- [ ] Primary / secondary / text-link buttons
- [ ] Program card
- [ ] News/event card
- [ ] Testimonial quote card (grid, not carousel)
- [ ] Stat/impact card
- [ ] Section divider ("The Weave")
- [ ] Page header / breadcrumb block
- [ ] Form fields + validation + confirmation panel
- [ ] Leadership portrait grid + bio modal/expand
- [ ] Values/pillars icon grid (9 custom icons)
- [ ] Footer (4-column + accessibility statement)
- [ ] Tag/badge component (program type, research theme)
- [ ] Downloadable-document row (PDF icon, filesize, Plex Mono filename) — for Catalog/Resources/Procurement
- [ ] Pagination component (News, Vacancy, Catalog listings)
- [ ] Empty-state pattern (no open vacancies, no results in search)
- [ ] Interactive Campus Locator (site-plan map + synced building directory, §3.10)
- [ ] Custom 404 page (Weave motif, not theme default)