# Page Spec — News & Events
Route: `/news`, article detail `/news/[slug]`, events `/news/events` or a tab

## Purpose
Prove the institution is active. Current site has a "NEWS" heading with 3 title-only links and no real listing, and an "upcoming eventS" heading with literally no content underneath — the biggest functional gap on the whole site.

## Section-by-Section Layout

1. **Page header**: breadcrumb "Home / News & Events", H1, dek.
2. **Tabs or segmented control**: "News" | "Events" (URL-addressable, e.g. `?tab=events`).
3. **News tab**:
   - Filter bar: category chips (News / Press / Feature), Plex Mono search input.
   - Grid of News cards (component 3.3), 6–9 per page.
   - Pagination component at bottom (numbered, Plex Mono style, not infinite scroll — better for a slow-connection government audience and for deep-linking to older press).
4. **Events tab**:
   - List view (not a complex calendar widget — simpler to build and maintain): each row = date block (Plex Mono day/month) + event title + location + short description + "Details" link.
   - Empty state: "No upcoming events scheduled — check back soon" (styled per design system empty-state pattern), not a blank heading.
5. **Article detail template** (`/news/[slug]`):
   - Breadcrumb, category tag, H1, byline (AFLEX Communications) + Plex Mono date.
   - Hero image (16:9).
   - Body copy (rich text from CMS).
   - Related articles (3-card row) at bottom.
6. **Footer.**

## Components Used
Page header, tab/segmented control, filter chips, News card grid, pagination, event list row, empty state, article detail template, related-articles row, Footer.

## Assets Needed
- Photography for each existing headline (Green Legacy Program, Pan-Africanism Forum launch, Reform/Scaling Up/Transformation) — currently these are title-only links with no images or body content in the source; full articles need to be written/sourced from AFLEX comms.
- Ongoing: event photography and press photography as a recurring content pipeline (not one-time assets) — recommend AFLEX comms team is given the CMS training to upload these directly (see PRD §6 content management requirement).
