# Page Spec — Campus Locator ("Find Your Way")
Route: `/campus-locator` (nav placement: utility bar or under "About Us" as a sub-link — see note below)

## Purpose — new page idea
AFLEX's Sululta campus is a real, multi-building physical facility (training halls, accommodation, dining, sports/recreation, admin), but nothing in the current site or content helps a visiting minister, delegation, vendor, or new trainee actually find their way around it once they arrive. This page turns the campus from a description ("state-of-the-art facility... serene environment") into something a visitor can actually use on the day: where is my training hall, where do I check in, where's the dining hall from the accommodation block.

This also reinforces the design system's "campus as a place" thesis (§1) with a genuinely useful, non-decorative feature — not a gimmick map, a real wayfinding tool.

## Section-by-Section Layout

1. **Page header**: breadcrumb "Home / Campus Locator", H1 "Find Your Way Around Campus", dek: one line explaining this is for wayfinding on-site (not driving directions — that's a separate, smaller "Get Directions to Campus" CTA near the top, routing to an external maps app for the Sululta address).
2. **Interactive Campus Locator** (component §3.10): two-pane site-plan map + synced building directory.
   - Left: custom vector site plan with numbered `gold-600` building markers.
   - Right: filterable directory list — filter chips by category (Training & Academic, Accommodation, Dining, Recreation & Sport, Administration).
   - Selecting a marker or a list item highlights both and expands an inline detail card: building name, what's inside (rooms/halls/capacity), and a short "how to get there from the main gate" note.
   - Mobile: stacked, map pinch-zoomable, list is the primary scroll surface with a persistent small map toggle button.
3. **Arrival essentials strip** — 3–4 short info cards below the locator: Check-in / Registration point, Parking, Accessibility notes (step-free routes, if applicable — confirm with AFLEX facilities), Emergency/first-aid point. This is the practical content a real visitor needs and the current site has none of.
4. **Downloadable campus map** — a PDF/print version of the site plan (downloadable-document row component) for visitors without reliable on-site connectivity — a genuinely practical addition for a highland campus 25km from Addis Ababa where signal may be inconsistent.
5. **Footer.**

## Navigation Placement Note
Recommend adding this as a link in the utility bar (alongside Online Learning / Library / FAQ) rather than the main nav, since it's a practical/logistics tool used mainly by people already confirmed to attend — keeps the primary nav focused on Programs/About/News. Confirm placement preference with AFLEX; a secondary option is a persistent small "Campus Map" link in the footer's first column, next to the address block (§3.7).

## Components Used
Page header, Interactive Campus Locator (§3.10), filter chips, info card row, downloadable-document row, Footer.

## Assets Needed
- Custom vector site-plan illustration of the full Sululta campus (see design system §4) — the single asset this page depends on; needs an accurate building layout from AFLEX facilities/architecture records or a site survey.
- Building-by-building content: name, category, what's inside, capacity — **content gap, needs AFLEX facilities input**; do not estimate or invent room counts/capacities.
- Arrival essentials content: check-in point, parking notes, accessibility notes, emergency point — **content gap, confirm with AFLEX operations.**
- Print-ready PDF export of the site plan for the downloadable map.
