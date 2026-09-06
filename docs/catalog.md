# Page Spec — Catalog
Route: `/catalog`

## Purpose
A structured, filterable course/training catalog distinct in purpose from the Programs page (Programs = "what we offer and why," Catalog = "browse and pick a specific training instance/date"). Current site has this as a nav item with no distinguishable content from Programs — this spec exists to resolve that ambiguity.

## Section-by-Section Layout

1. **Page header**: breadcrumb "Home / Catalog", H1 "Training Catalog", dek clarifying the distinction from Programs (e.g. "Browse all current and upcoming training offerings").
2. **Filter sidebar (desktop) / filter drawer (mobile)**:
   - Duration: Short-term (3–10 days) / Long-term (12–18 months) / Modular
   - Modality: In-person / Hybrid
   - Audience: Senior Executive / Emerging Leader / Women Leaders (public sector)
3. **Catalog grid** — Program cards (component 3.3) with an added Plex Mono "Next Cohort: [date]" line where scheduling data exists; each links through to the corresponding Programs detail anchor rather than duplicating full description text.
4. **Empty/no-match state** for filter combinations with zero results.
5. **Footer.**

## Components Used
Page header, filter sidebar/drawer, Program card (catalog variant with cohort-date line), empty state, Footer.

## Assets Needed
- Cohort scheduling data (next intake dates per program) — **content gap, needs AFLEX academic calendar input**; without it, launch this page without the "Next Cohort" line rather than fabricating dates.
- No new photography beyond Program card imagery already specified in Programs page.
