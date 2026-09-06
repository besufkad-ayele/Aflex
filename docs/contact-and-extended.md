# Page Specs — Contact Us, Procurement, Scholarship
These three pages are grouped because each currently exists only as a footer link with no delivered page content — all three need to be scoped with AFLEX before full build, but here is the target spec for each.

---

## Contact Us — Route: `/contact`

### Layout
1. Page header: breadcrumb, H1 "Contact Us", dek.
2. 2-column: left = address block (Sululta campus address, phone, email, office hours) + embedded map (static map image or interactive embed — prefer a lightweight static map with a marker for performance, per design system perf goals); right = general inquiry form (component 3.5: name, email, subject, message).
3. Optional: "Department Directory" mini-list if AFLEX wants routed inquiries (Training, Research, Procurement, HR) rather than one inbox — flag as a scope question.
4. Confirmation panel on submit with reference number, consistent with Vacancy pattern.
5. Footer.

### Assets Needed
- Confirmed campus address + any Addis Ababa liaison office address.
- Map coordinates.

---

## Procurement — Route: `/procurement`
**Status: not present in delivered source content — new page, scope to confirm with AFLEX finance/legal before build.**

### Layout
1. Page header: breadcrumb, H1 "Procurement", dek explaining AFLEX's procurement process briefly.
2. Standard disclosure text (government procurement framework/legal boilerplate) — **content gap, must come from AFLEX legal/finance, do not draft this as generic filler for a government tender process.**
3. Open tenders listing: title, reference number (Plex Mono), closing date, downloadable bid document (downloadable-document row component).
4. Empty state: "No open tenders at this time."
5. Footer.

### Assets Needed
- Procurement policy/legal text (from AFLEX).
- Any active tender documents (PDF).

---

## Scholarship — Route: `/scholarship`
**Status: not present in delivered source content — new page, confirm with AFLEX whether this program is currently active.**

### Layout
1. Page header: breadcrumb, H1 "Scholarships & Fellowships", dek.
2. If active: eligibility, tracks (e.g. tied to Project WILD sponsorship), application window, CTA to apply (reuse application form pattern).
3. If inactive: honest "Not currently accepting applications — sign up to be notified" state rather than a placeholder page pretending a program exists.
4. Footer.

### Assets Needed
- Confirmation from AFLEX of program status and eligibility criteria before any content is written.
