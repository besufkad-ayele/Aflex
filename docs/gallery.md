# Page Spec — Gallery / Resources
Route: `/gallery` (nav label "Gallery", currently mapped in source to `/resources`)

## Purpose
Visual proof of the campus and program life, plus a home for downloadable materials (brochures, research). Currently this nav item exists but has no distinct content in the source pages provided — full build from scratch.

## Section-by-Section Layout

1. **Page header**: breadcrumb "Home / Gallery", H1 "Gallery & Resources", dek.
2. **Album filter row**: chips — Campus / Cohorts & Events / Pan-Africanism Forum / Green Legacy Program (align to actual News categories so the taxonomy is shared, not duplicated).
3. **Pinterest-style gallery classification** — use a responsive masonry grid with intentional mixed aspect ratios (portrait 3:4, landscape 4:3, wide 16:9), while preserving each asset's natural crop and keeping captions attached to the item. Group every item by one controlled album taxonomy: `Campus`, `Cohorts & Events`, `Pan-Africanism Forum`, or `Green Legacy Program`; an item may have secondary tags for filtering, but only one primary album. The first viewport should mix the categories in a calm visual rhythm rather than create separate repetitive rows. On mobile, collapse to one column while retaining the same metadata and order.
4. **Photo/video interaction** — keyboard-navigable lightbox on click or Enter, visible captions and album label, focus returned to the triggering item on close, and reduced-motion transitions. Video items show a play glyph and open in an inline player; never autoplay.
5. **Resources sub-section** — "Downloads" list using the downloadable-document row component: title, file type icon, filesize, Plex Mono filename, download button. Populate with: program brochures, the Pan-Africanism research PDF, any annual report if it exists.
5. **Footer.**

## Components Used
Page header, filter chips, photo/video grid + lightbox, downloadable-document row, Footer.

## Assets Needed
- Full campus photo library (largest asset need on the site — request a proper photo shoot covering: exterior architecture, courtyard, training halls, accommodation, dining, sports facilities referenced in testimonials).
- Event/cohort photography from past trainings and the Pan-Africanism Forum.
- Any existing brochure/report PDFs for the Downloads section — confirm what exists with AFLEX.
