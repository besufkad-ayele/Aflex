# Page Spec — Vacancy
Route: `/vacancy`, detail `/vacancy/[slug]`

## Purpose
Functional job listing with a real application path and a receipt/confirmation — current site's "Vacancy" nav item leads to a near-empty page with no listings or apply mechanism.

## Section-by-Section Layout

1. **Page header**: breadcrumb "Home / Vacancy", H1 "Careers at AFLEX", dek (one line on why to work at AFLEX — mission-linked, e.g. contributing to Africa's leadership renaissance).
2. **Filter bar**: department chips (Academic/Training, Operations, Administration, Facilities), Plex Mono search.
3. **Listing grid/list**: each row = title, department tag, location (Sululta/Addis Ababa), employment type, closing date (Plex Mono), "View & Apply" link.
4. **Empty state** (when no open roles): centered message "No open positions at this time. Check back soon, or send us an open application." + link to Contact — replaces the current genuinely blank page.
5. **Position detail template** (`/vacancy/[slug]`):
   - Breadcrumb, title, department/location/type tags, closing date.
   - Full description, responsibilities, requirements (rich text from CMS).
   - Application form (component 3.5): name, email, phone, cover note, CV upload (file-upload component, PDF/doc, size-limited).
   - On submit: inline confirmation panel with a Plex Mono reference number (e.g. `AFLEX-VAC-2026-0143`) and "we'll contact you by [email]" copy — critical for government-process trust, avoids leaving applicants unsure their application went through.
6. **Footer.**

## Components Used
Page header, filter bar, listing row, empty state, position detail template, application form + file upload, confirmation panel, Footer.

## Assets Needed
- No new photography required; icon set for department tags can reuse the pillar/value icon family style.
- Backend requirement: reference-number generation + email notification (see PRD §7 recommended NestJS approach) — this is a functional/technical asset, not visual, but critical to spec with engineering.
