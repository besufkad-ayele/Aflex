export interface EventScheduleItem {
  time: string;
  session: string;
  description: string;
  speaker?: string;
}

export interface AcademyEvent {
  id: string;
  day: string;
  month: string;
  year: string;
  dateRange: string;
  title: string;
  type: string;
  category: "summit" | "workshop" | "forum" | "cohort";
  location: string;
  venue: string;
  time: string;
  description: string;
  overview: string[];
  featuredSpeakers: string[];
  targetAudience: string[];
  keyThemes: string[];
  schedule: EventScheduleItem[];
  seats: string;
  registrationDeadline: string;
  contactEmail: string;
  status: "Open for Application" | "Invitation Only" | "Filling Fast";
  slug: string;
}

export const academyEvents: AcademyEvent[] = [
  {
    id: "executive-leadership-intensive",
    day: "12–16",
    month: "SEP",
    year: "2024",
    dateRange: "SEP 12-16, 2024",
    title: "Executive Leadership Intensive",
    type: "Training Program",
    category: "cohort",
    location: "Sululta Campus",
    venue: "Executive Deliberation Suites",
    time: "08:30 AM – 05:30 PM EAT",
    description: "High-altitude residential intensive testing strategic judgment under simulated crisis, cross-sector coalitions, and statecraft mastery.",
    overview: [
      "The Executive Leadership Intensive is AFLEX's cornerstone residential program designed for public and private sector leaders navigating complex institutional transformations.",
      "Conducted in the serene highlands of Sululta, participants analyze authentic African case studies, take part in crisis simulations, and build enduring peer networks."
    ],
    featuredSpeakers: ["H.E. Zadig Abreha", "AFLEX Senior Faculty", "Guest Policy Envoys"],
    targetAudience: ["Ministers & State Ministers", "Permanent Secretaries", "Public Agency Chief Executives"],
    keyThemes: ["Strategic Judgment in Ambiguity", "Institutional Transformation", "Ethical Governance"],
    schedule: [
      { time: "Day 1 · 09:00 AM", session: "Strategic Diagnostic & Leadership Ethos", description: "Baseline institutional assessments and personal leadership goals." },
      { time: "Day 3 · 02:00 PM", session: "Macroeconomic Crisis Simulation", description: "War-room decision-making under multi-variable supply and fiscal shocks." }
    ],
    seats: "35 Leaders",
    registrationDeadline: "September 01, 2024",
    contactEmail: "executive@aflexacademy.gov.et",
    status: "Open for Application",
    slug: "executive-leadership-intensive"
  },
  {
    id: "african-governance-forum",
    day: "05",
    month: "OCT",
    year: "2024",
    dateRange: "OCT 05, 2024",
    title: "African Governance Forum",
    type: "Conference",
    category: "forum",
    location: "Main Hall",
    venue: "Main Executive Auditorium",
    time: "09:00 AM – 05:00 PM EAT",
    description: "High-level pan-African forum examining sovereign institutional design, regional trade integration under AfCFTA, and sustainable public financing.",
    overview: [
      "The African Governance Forum convenes policy architects, continental diplomats, and scholars to discuss the future of democratic institutions and economic autonomy across the continent."
    ],
    featuredSpeakers: ["Senior AU Commissioners", "ECA Economic Specialists", "Institutional Design Fellows"],
    targetAudience: ["Policy Researchers", "Diplomatic Corps", "Public Administration Directors"],
    keyThemes: ["AfCFTA Implementation", "Sovereign Debt & Fiscal Autonomy", "Institutional Trust"],
    schedule: [
      { time: "09:30 AM", session: "Opening Keynote: Rethinking African Statecraft", description: "High-level panel on governance autonomy." },
      { time: "02:00 PM", session: "Plenary: Cross-Border Regulatory Harmonisation", description: "Interactive session on removing trade bottlenecks." }
    ],
    seats: "120 Delegates",
    registrationDeadline: "September 25, 2024",
    contactEmail: "forum@aflexacademy.gov.et",
    status: "Filling Fast",
    slug: "african-governance-forum"
  },
  {
    id: "women-leadership-summit",
    day: "22–24",
    month: "OCT",
    year: "2024",
    dateRange: "OCT 22-24, 2024",
    title: "Women in Leadership Summit",
    type: "Summit",
    category: "summit",
    location: "Sululta Campus",
    venue: "Executive Amphitheatre",
    time: "09:00 AM – 06:00 PM EAT",
    description: "Convening Africa's leading women in government, judiciary, and civic institutions to exchange statecraft insights and foster executive mentorship.",
    overview: [
      "Hosted under the auspices of Project WILD (Women Integrated Leadership Development), this 3-day summit celebrates achievements and addresses systemic hurdles in executive governance."
    ],
    featuredSpeakers: ["Mrs. Selam", "Supreme Court Justices", "State Ministers & Regional Governors"],
    targetAudience: ["Senior Women Public Executives", "Judicial Officers", "Diplomats & Civic Leaders"],
    keyThemes: ["Executive Negotiation", "Public Sector Turnaround", "Mentorship Pipelines"],
    schedule: [
      { time: "Day 1 · 09:00 AM", session: "Keynote: Sovereign Grace & Transformative Authority", description: "Opening address by distinguished African women statesmen." },
      { time: "Day 2 · 02:30 PM", session: "Institutional Reform Project Showcase", description: "Presentation of applied capstone initiatives." }
    ],
    seats: "80 Leaders",
    registrationDeadline: "October 10, 2024",
    contactEmail: "wild@aflexacademy.gov.et",
    status: "Open for Application",
    slug: "women-leadership-summit"
  },
  {
    id: "public-service-excellence-workshop",
    day: "08",
    month: "NOV",
    year: "2024",
    dateRange: "NOV 08, 2024",
    title: "Public Service Excellence Workshop",
    type: "Workshop",
    category: "workshop",
    location: "Training Center",
    venue: "Public Administration Policy Lab",
    time: "09:00 AM – 04:30 PM EAT",
    description: "Action-oriented workshop on de-bottlenecking government services, civil service digitization, and anti-corruption compliance.",
    overview: [
      "Designed for department heads and regional bureau directors, this hands-on workshop equips civil servants with frameworks to eliminate bureaucratic inertia and accelerate service delivery."
    ],
    featuredSpeakers: ["Dr. Melese", "Civil Service Commissioners", "Digital Public Infrastructure Experts"],
    targetAudience: ["Ministry Department Heads", "Regional Bureau Chiefs", "Public Sector Innovation Leads"],
    keyThemes: ["Process Optimization", "Digital Public Service", "Integrity & Accountability"],
    schedule: [
      { time: "09:00 AM", session: "Diagnostic: Identifying Civil Service Friction Points", description: "Mapping citizen pain points and bureaucratic delays." },
      { time: "01:30 PM", session: "Rapid Results Initiatives (RRI) Design", description: "Drafting 100-day execution milestones." }
    ],
    seats: "50 Directors",
    registrationDeadline: "October 28, 2024",
    contactEmail: "psle@aflexacademy.gov.et",
    status: "Open for Application",
    slug: "public-service-excellence-workshop"
  },
  {
    id: "annual-leadership-symposium",
    day: "15",
    month: "DEC",
    year: "2024",
    dateRange: "DEC 15, 2024",
    title: "Annual Leadership Symposium",
    type: "Symposium",
    category: "summit",
    location: "Main Hall",
    venue: "Continental Dialogue Chambers",
    time: "09:00 AM – 06:30 PM EAT",
    description: "Year-end flagship convening reflecting on African leadership milestones, institutional resilience, and strategic outlook for 2025.",
    overview: [
      "The Annual Leadership Symposium brings together AFLEX alumni, council members, and international partners for a day of high-level reflection and thought leadership."
    ],
    featuredSpeakers: ["H.E. Zadig Abreha", "Dr. Eng. Seleshi Bekele", "Visiting African Statesmen"],
    targetAudience: ["AFLEX Alumni", "Government Executives", "International Development Partners"],
    keyThemes: ["Continental Statecraft Trends", "Institutional Memory", "2025 Strategic Priorities"],
    schedule: [
      { time: "09:30 AM", session: "State of African Leadership 2024", description: "Comprehensive retrospective on governance breakthroughs and challenges." },
      { time: "03:30 PM", session: "AFLEX Vanguard Awards & Alumni Commendation", description: "Honoring outstanding public service initiatives." }
    ],
    seats: "150 Delegates",
    registrationDeadline: "November 30, 2024",
    contactEmail: "symposium@aflexacademy.gov.et",
    status: "Open for Application",
    slug: "annual-leadership-symposium"
  }
];
