# 03 — Dashboard Routes, Screens & UI Specifications

**Module:** AFLEX CMS User Interface  
**Route Group:** `src/app/(admin)/admin/*`  
**Design Tokens:** AFLEX Sovereign System (`globals.css`)  

---

## 1. Routing Topology

The administrative workspace is isolated from public pages under the `(admin)` route group to prevent bundle contamination and ensure that public routes retain static rendering optimization:

```
src/app/(admin)/
├── layout.tsx                # Global Admin Shell: Sidebar, Top Bar, Session Watchdog
├── admin/
│   ├── page.tsx              # Executive Dashboard Overview & KPI Metrics
│   ├── login/
│   │   └── page.tsx          # Staff SSO & Credentials Sign-In
│   ├── news/
│   │   ├── page.tsx          # Filterable Articles Table
│   │   ├── new/page.tsx      # Multilingual Article Composer
│   │   └── [id]/edit/page.tsx# Article Revision & Editorial Review Screen
│   ├── programs/
│   │   ├── page.tsx          # Programs List & Cohort Scheduler
│   │   └── [id]/edit/page.tsx# Curriculum & Outcomes Editor
│   ├── vacancies/
│   │   ├── page.tsx          # Career Postings & Applicant Counter
│   │   └── new/page.tsx      # Job Posting Composer
│   ├── procurement/
│   │   ├── page.tsx          # Public Tenders & Bid Document Ledger
│   │   └── new/page.tsx      # Tender Publication Composer
│   ├── media/
│   │   └── page.tsx          # Asset Library, Alt-Text Inspector & Uploader
│   ├── audit/
│   │   └── page.tsx          # Searchable Regulatory Audit Log
│   └── settings/
│       └── page.tsx          # Emergency Alert Banner & Staff Role Roster
```

---

## 2. Shell Layout (`layout.tsx`)

### Visual Structure
- **Sidebar (Left, Fixed 260px):**
  - Institutional Seal & Gold Wordmark: `AFLEX / GOVERNANCE CONSOLE`
  - Navigation Sections:
    - **Overview:** Executive Dashboard
    - **Content:** News & Dispatches, Programs & Curricula, Media Archive
    - **Operations:** Vacancies & Careers, Procurement Tenders
    - **Governance:** Audit Trail, Emergency Banners, User Accounts
  - Bottom Identity Card: Current staff user's name, role badge (`comms_officer`, `academic_director`, etc.), and Sign Out button.
- **Top Utility Header (Sticky):**
  - Active Route Breadcrumb (`Admin / News / New Article`)
  - Fast Search (`⌕ Jump to record...` with shortcut `Cmd/Ctrl + K`)
  - Live Edge Status Indicator (`● Edge Cache In Sync`)
  - Public Portal Shortcut (`↗ View Live Portal`)

---

## 3. Screen Specifications

### 3.1. Executive Dashboard (`/admin`)
- **KPI Summary Grid (4 Tiles):**
  1. **Published News:** Count of active dispatches + breakdown by language.
  2. **Active Programs:** Running cohorts + next intake countdown.
  3. **Open Vacancies:** Active job postings + days remaining.
  4. **Active Tenders:** Open procurement bids + closing deadlines.
- **Editorial Attention Queue:**
  - Dedicated table highlighting all records currently in `in_review` status awaiting sign-off from an `editorial_reviewer`.
- **System Health & Audit Strip:**
  - Live feed of the last 10 administrative actions performed across the platform.

---

### 3.2. Multilingual Article Composer (`/admin/news/new`)

Because AFLEX content must support multiple languages, the article composer uses a unified multi-tab interface sharing common assets:

```
+---------------------------------------------------------------------------------------+
|  [ English (Default) ]    [ አማርኛ (Amharic) ]    [ Afaan Oromoo ]    [ + Add Language ]  |
+---------------------------------------------------------------------------------------+
| Title: [ Where African Leadership is Refined                                       ] |
| Slug:  [ where-african-leadership-refined     ]  (Auto-generated from title)         |
| Excerpt: [ A focused overview of ministerial deliberations at Sululta...         ] |
+---------------------------------------------------------------------------------------+
|  Hero Image: [ Drop high-res image here / Browse Library ]                            |
|  Alt Text (Mandatory): [ Ministers deliberating in Plenary Hall                    ] |
+---------------------------------------------------------------------------------------+
|  Rich Text Body (TipTap Editor):                                                      |
|  [ Bold ] [ Italic ] [ H2 ] [ H3 ] [ Quote ] [ Tibeb Callout ] [ Table ]              |
|                                                                                       |
|  Deliberations convened on Thursday morning at the Sululta Highland Campus...         |
|                                                                                       |
+---------------------------------------------------------------------------------------+
|  Category: [ ACADEMY v ]     Featured: [x] Yes                                        |
|  Actions:  [ Save as Draft ]  [ Submit for Editorial Review ]  [ Publish to Live ]    |
+---------------------------------------------------------------------------------------+
```

#### TipTap Custom Block Extensions:
- **`TibebCallout`:** Renders an executive gold-accented callout with traditional Ethiopian geometric borders for key ministerial takeaways.
- **`EditorialPullQuote`:** High-contrast quote block for quotes from Academy leadership.

---

### 3.3. Academic Curriculum Manager (`/admin/programs/[id]/edit`)
- **Master Details:** Code (`01 / SHORT-TERM · 3–10 DAYS`), Title, Target Cohort, Format.
- **Module Sequence Builder:** Drag-and-drop ordered list of syllabus modules.
- **Transformative Outcomes List:** Check-list of tangible capabilities acquired by participants.
- **Cohort Schedule Matrix:** Intake window, residential check-in dates, and plenary hall assignments.

---

### 3.4. Vacancies & Appointments Manager (`/admin/vacancies/new`)
- **Role Specs:** Title, Department (`Academic`, `Operations`, `Digital Systems`), Duty Station (`Sululta Campus`).
- **5-Stage Recruitment Timeline:** Customize dates for Dossier Review, Technical Panel, and Campus Onboarding.
- **Job Requirements & Competencies:** Structured bullet fields for academic criteria.
- **Submission Mode:** Email submission link or direct PDF dossier upload gateway.

---

### 3.5. Public Procurement & Tenders (`/admin/procurement/new`)
- **Reference Number:** e.g., `AFLEX/NCB/WORKS/02/2026`.
- **Tender Title & Scope of Work:** Plain text overview.
- **Procurement Category:** Works, Goods, Consultancy, Non-Consultancy.
- **Bid Bond & Purchase Price:** Currency input in Ethiopian Birr (`ETB`) and foreign currency equivalent.
- **TOR PDF Uploader:** Direct-to-Supabase Storage uploader with automated integrity hash calculation.
- **Submission Deadline Picker:** Precise date and time countdown.

---

### 3.6. Media Asset Library (`/admin/media`)
- **Masonry Visual Browser:** Real-time thumbnail preview of all photos and video assets.
- **Enforced Metadata Inspection:** Uploading an asset requires entering mandatory `alt_text` for accessibility before the asset is saved.
- **Resolution & Size Optimization:** Displays file dimensions, format, and size in KB/MB.
- **Copy Direct URL:** One-click button to copy CDN URL for embedding in articles.

---

### 3.7. Regulatory Audit Trail (`/admin/audit`)
- **Search & Filter:** By Staff Email, Role, Entity (`News`, `Tender`, `Vacancy`), Action (`PUBLISH`, `RETRACT`), and Date Range.
- **Change Diff Inspector:** Modal showing a visual before-and-after diff of updated JSON fields.
- **Export to CSV/PDF:** Generates an official report for federal ethics and compliance auditors.

