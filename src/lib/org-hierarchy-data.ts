/**
 * AFLEX institutional hierarchy — bilingual role directory.
 * `youtubeUrl` / `speechUrl` are optional; when set, the UI links to the speech.
 */

export type OrgTier =
  | "apex"
  | "office"
  | "oversight"
  | "leadership-development"
  | "research-ideation"
  | "strategy-change"
  | "enablers"
  | "operations";

export interface OrgRole {
  /** Display order from the official roster (1–24). */
  order: number;
  id: string;
  /** Amharic official title */
  titleAm: string;
  /** English title */
  titleEn: string;
  /** Short unit label for badges */
  unit: string;
  tier: OrgTier;
  /** Parent role id — null for apex */
  reportsTo: string | null;
  level: "chief" | "lead" | "executive" | "deputy";
  summary: string;
  responsibilities: string[];
  /** Optional named appointee when published */
  incumbent?: string;
  /** YouTube or other public speech / address */
  youtubeUrl?: string;
  /** External biography / official profile */
  profileUrl?: string;
  email?: string;
}

export const ORG_TIERS: { id: OrgTier; label: string; labelAm: string; blurb: string }[] = [
  {
    id: "apex",
    label: "Chief Executive Office",
    labelAm: "የዋና ሥራ አስፈፃሚ ጽ/ቤት",
    blurb: "Overall command of the Academy’s mandate, alliances, and continental agenda.",
  },
  {
    id: "office",
    label: "Office of the President / CEO",
    labelAm: "የፕሬዝዳንት ጽ/ቤት",
    blurb: "Executive coordination, protocol, and direct support to the Chief Executive.",
  },
  {
    id: "oversight",
    label: "Integrity & Oversight",
    labelAm: "ኦዲትና ስነ ምግባር",
    blurb: "Independent assurance on audit, ethics, and institutional accountability.",
  },
  {
    id: "leadership-development",
    label: "Leadership Development",
    labelAm: "የአመራር ልማት",
    blurb: "General and specialized leadership programs, recognition, and quality assurance.",
  },
  {
    id: "research-ideation",
    label: "Research & Ideation",
    labelAm: "ጥናት፣ ምርምርና ሀሳብ ማመንጨት",
    blurb: "Applied research, policy insight, and idea generation for African leadership.",
  },
  {
    id: "strategy-change",
    label: "Strategy & Institutional Change",
    labelAm: "ስትራቴጂና ተቋማዊ ለውጥ",
    blurb: "Strategic affairs and transformation agendas across the Academy.",
  },
  {
    id: "enablers",
    label: "Institutional Enablers",
    labelAm: "ድጋፍ ሰጪ አገልግሎቶች",
    blurb: "Technology, communications, inclusion, and knowledge services.",
  },
  {
    id: "operations",
    label: "Campus & Corporate Services",
    labelAm: "ካምፓስና ኮርፖሬት አገልግሎቶች",
    blurb: "Hospitality, people, finance, facilities, and engineering services.",
  },
];

export const orgHierarchy: OrgRole[] = [
  {
    order: 1,
    id: "ceo",
    titleAm: "ዋና ሥራ አስፈፃሚ (CEO)",
    titleEn: "Chief Executive Officer",
    unit: "CEO",
    tier: "apex",
    reportsTo: null,
    level: "chief",
    incumbent: "Mohammedrafie Abaraya",
    summary:
      "Leads AFLEX’s continental mandate — incubating, empowering, and elevating African leaders across public, private, and civic sectors.",
    responsibilities: [
      "Institutional strategy and overall command",
      "Continental alliances and ministerial partnerships",
      "Curriculum direction and statecraft flagships",
    ],
    youtubeUrl: undefined,
    profileUrl: undefined,
    email: "ceo@aflex.gov.et",
  },
  {
    order: 2,
    id: "presidents-office-chief",
    titleAm: "የፕሬዝዳንት ጽ/ቤት ኃላፊ",
    titleEn: "Head of the President’s Office",
    unit: "CEO Office",
    tier: "office",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Runs the Chief Executive’s office — scheduling, protocol, executive correspondence, and cross-directorate coordination.",
    responsibilities: [
      "Executive protocol and diary management",
      "Board and ministerial liaison support",
      "Priority tracking for CEO directives",
    ],
  },
  {
    order: 3,
    id: "audit-executive",
    titleAm: "ኦዲት ስራ አስፈፃሚ",
    titleEn: "Audit Executive",
    unit: "Audit",
    tier: "oversight",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Provides independent internal audit assurance on governance, risk, and control across Academy operations.",
    responsibilities: [
      "Internal audit planning and assurance",
      "Risk and control recommendations",
      "Reporting to the CEO and Governing Board as required",
    ],
  },
  {
    order: 4,
    id: "ethics-executive",
    titleAm: "ስነ ምግባር ስራ አስፈፃሚ",
    titleEn: "Ethics Executive",
    unit: "Ethics",
    tier: "oversight",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Stewards institutional ethics, integrity standards, and conflict-of-interest frameworks for staff and programs.",
    responsibilities: [
      "Ethics policy and awareness",
      "Integrity case handling pathways",
      "Values alignment with the COMING framework",
    ],
  },
  {
    order: 5,
    id: "institutional-change-executive",
    titleAm: "ተቋማዊ ለውጥ ስራ አስፈፃሚ",
    titleEn: "Institutional Change Executive",
    unit: "Change",
    tier: "strategy-change",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Drives reform programs, organizational redesign, and continuous improvement across AFLEX directorates.",
    responsibilities: [
      "Change portfolio design and delivery",
      "Process and culture transformation",
      "Reform monitoring with strategic affairs",
    ],
  },
  {
    order: 14,
    id: "general-leadership-lead",
    titleAm: "የአጠቃላይ አመራር መሪ ስራ አስፈፃሚ",
    titleEn: "Lead Executive — General Leadership",
    unit: "General Leadership",
    tier: "leadership-development",
    reportsTo: "ceo",
    level: "lead",
    summary:
      "Leads general leadership development pathways for senior and emerging public leaders.",
    responsibilities: [
      "General leadership curricula and cohorts",
      "Faculty and facilitator quality",
      "Participant outcomes and alumni pathways",
    ],
  },
  {
    order: 6,
    id: "deputy-general-leadership",
    titleAm: "ከአጠቃላይ አመራር መሪ ስራ አስፈፃሚ",
    titleEn: "Deputy Lead Executive — General Leadership",
    unit: "General Leadership",
    tier: "leadership-development",
    reportsTo: "general-leadership-lead",
    level: "deputy",
    summary:
      "Supports the General Leadership Lead in cohort delivery, operations, and program excellence.",
    responsibilities: [
      "Day-to-day cohort operations",
      "Faculty coordination support",
      "Program logistics and participant care",
    ],
  },
  {
    order: 15,
    id: "specialized-leadership-lead",
    titleAm: "የስፔሻላይዝ አመራር ልማት መሪ ስራ አስፈፃሚ",
    titleEn: "Lead Executive — Specialized Leadership Development",
    unit: "Specialized Leadership",
    tier: "leadership-development",
    reportsTo: "ceo",
    level: "lead",
    summary:
      "Directs specialized leadership tracks — sectoral, thematic, and advanced statecraft programs.",
    responsibilities: [
      "Specialized and sector leadership programs",
      "Advanced modules and executive clinics",
      "Partnership delivery with ministries and agencies",
    ],
  },
  {
    order: 19,
    id: "deputy-specialized-leadership",
    titleAm: "ከስፔሻላይዝ አመራር ልማት መሪ ስራ አስፈፃሚ",
    titleEn: "Deputy Lead Executive — Specialized Leadership Development",
    unit: "Specialized Leadership",
    tier: "leadership-development",
    reportsTo: "specialized-leadership-lead",
    level: "deputy",
    summary:
      "Deputizes the Specialized Leadership Lead on program design, facilitation, and cohort execution.",
    responsibilities: [
      "Specialized cohort execution",
      "Module quality support",
      "Cross-program coordination",
    ],
  },
  {
    order: 12,
    id: "recognition-awards-lead",
    titleAm: "የአመራር እውቅና እና ሽልማት መሪ ሥራ አስፈፃሚ",
    titleEn: "Lead Executive — Leadership Recognition & Awards",
    unit: "Recognition & Awards",
    tier: "leadership-development",
    reportsTo: "ceo",
    level: "lead",
    summary:
      "Designs and runs leadership recognition, awards, and excellence celebration frameworks.",
    responsibilities: [
      "Awards criteria and ceremonies",
      "Recognition of alumni and institutional partners",
      "Public celebration of ethical leadership",
    ],
  },
  {
    order: 13,
    id: "quality-assurance-lead",
    titleAm: "የአግባብነትና ጥራት ማረጋገጫ መሪ ሥራ አስፈፃሚ",
    titleEn: "Lead Executive — Relevance & Quality Assurance",
    unit: "Quality Assurance",
    tier: "leadership-development",
    reportsTo: "ceo",
    level: "lead",
    summary:
      "Assures program relevance, pedagogical quality, and continuous improvement across learning offerings.",
    responsibilities: [
      "Curriculum relevance reviews",
      "Quality standards and evaluation",
      "Accreditation and assurance pathways",
    ],
  },
  {
    order: 16,
    id: "research-lead",
    titleAm: "የጥናትና ምርምር መሪ ሥራ አስፈፃሚ",
    titleEn: "Lead Executive — Research & Studies",
    unit: "Research",
    tier: "research-ideation",
    reportsTo: "ceo",
    level: "lead",
    summary:
      "Leads AFLEX’s research agenda on governance, leadership, and continental policy questions.",
    responsibilities: [
      "Research strategy and publications",
      "Policy clinics and evidence briefs",
      "Academic and think-tank partnerships",
    ],
  },
  {
    order: 20,
    id: "deputy-research",
    titleAm: "ከጥናትና ምርምር መሪ ሥራ አስፈፃሚ",
    titleEn: "Deputy Lead Executive — Research & Studies",
    unit: "Research",
    tier: "research-ideation",
    reportsTo: "research-lead",
    level: "deputy",
    summary:
      "Supports research portfolio delivery, fieldwork coordination, and publication pipelines.",
    responsibilities: [
      "Research project coordination",
      "Data and fieldwork support",
      "Briefing and publication assistance",
    ],
  },
  {
    order: 17,
    id: "ideation-dissemination-lead",
    titleAm: "የሀሳብ ማመንጨትና ሥርፀት መሪ ሥራ አስፈፃሚ",
    titleEn: "Lead Executive — Ideation & Dissemination",
    unit: "Ideation",
    tier: "research-ideation",
    reportsTo: "ceo",
    level: "lead",
    summary:
      "Cultivates idea generation forums and disseminates leadership knowledge across African networks.",
    responsibilities: [
      "Ideation labs and dialogue platforms",
      "Knowledge dissemination and media",
      "Community of practice activation",
    ],
  },
  {
    order: 10,
    id: "strategic-affairs-executive",
    titleAm: "ስትራቴጂክ ጉዳዮች ስራ አስፈፃሚ",
    titleEn: "Strategic Affairs Executive",
    unit: "Strategy",
    tier: "strategy-change",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Owns strategic planning, institutional KPIs, and alignment of directorates to the Academy mandate.",
    responsibilities: [
      "Strategic plan and scorecards",
      "Policy alignment and foresight",
      "Executive briefings for leadership",
    ],
  },
  {
    order: 7,
    id: "it-executive",
    titleAm: "የኢንፎርሜሽን ቴክኖሎጂ ሥራ አስፈፃሚ",
    titleEn: "Information Technology Executive",
    unit: "ICT",
    tier: "enablers",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Leads campus ICT, LMS infrastructure, cybersecurity, and digital enablement for learning.",
    responsibilities: [
      "ICT systems and infrastructure",
      "LMS and digital learning support",
      "Cybersecurity and service reliability",
    ],
  },
  {
    order: 8,
    id: "pr-executive",
    titleAm: "ህዝብ ግንኙነት ስራ አስፈፃሚ",
    titleEn: "Public Relations Executive",
    unit: "Public Relations",
    tier: "enablers",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Manages institutional reputation, media relations, and public storytelling for AFLEX.",
    responsibilities: [
      "Media and press relations",
      "Public messaging and campaigns",
      "Speech and event communications support",
    ],
  },
  {
    order: 9,
    id: "women-youth-executive",
    titleAm: "ሴቶችና ወጣቶች አካቶ ትግበራ ስራ አስፈፃሚ",
    titleEn: "Women & Youth Inclusive Implementation Executive",
    unit: "Inclusion",
    tier: "enablers",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Ensures women and youth inclusion across programs, including pathways linked to Project WILD.",
    responsibilities: [
      "Gender and youth inclusion strategies",
      "Program accessibility and outreach",
      "Partnerships for inclusive leadership",
    ],
  },
  {
    order: 11,
    id: "library-executive",
    titleAm: "ቤተ መጽሐፍት አገልግሎት ስራ አስፈፃሚ",
    titleEn: "Library Services Executive",
    unit: "Library",
    tier: "enablers",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Runs the Academy library and digital repository serving researchers, cohorts, and partners.",
    responsibilities: [
      "Library collections and access",
      "Digital repository services",
      "Research support for cohorts and faculty",
    ],
  },
  {
    order: 18,
    id: "hospitality-executive",
    titleAm: "የሆስፒታሊቲ አገልግሎት ሥራ አስፈፃሚ",
    titleEn: "Hospitality Services Executive",
    unit: "Hospitality",
    tier: "operations",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Delivers executive hospitality, residential comfort, and guest services on the Sululta campus.",
    responsibilities: [
      "Residential and guest hospitality",
      "Catering and protocol hosting",
      "Cohort comfort and service standards",
    ],
  },
  {
    order: 21,
    id: "hr-executive",
    titleAm: "የብቃትና ሰው ሀብት አስተዳደር ሥራ አስፈፃሚ",
    titleEn: "Competency & Human Resource Administration Executive",
    unit: "HR & Competency",
    tier: "operations",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Leads people strategy, competency frameworks, and human resource administration for AFLEX staff.",
    responsibilities: [
      "HR administration and staffing",
      "Competency and performance systems",
      "Staff development and welfare",
    ],
  },
  {
    order: 22,
    id: "finance-procurement-executive",
    titleAm: "የግዥና ፋይናንስ ሥራ አስፈፃሚ",
    titleEn: "Procurement & Finance Executive",
    unit: "Finance & Procurement",
    tier: "operations",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Stewards procurement integrity, budgeting, and financial administration for Academy operations.",
    responsibilities: [
      "Budgeting and financial controls",
      "Procurement compliance",
      "Supplier and payment administration",
    ],
  },
  {
    order: 23,
    id: "basic-services-executive",
    titleAm: "የመሠረታዊ አገልግሎት ሥራ አስፈፃሚ",
    titleEn: "Basic Services Executive",
    unit: "Basic Services",
    tier: "operations",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Coordinates essential campus support services that keep daily Academy life running smoothly.",
    responsibilities: [
      "Essential campus service delivery",
      "Utility and support coordination",
      "Service-level monitoring",
    ],
  },
  {
    order: 24,
    id: "engineering-maintenance-executive",
    titleAm: "የምህንድስና እና ጥገና አገልግሎት ሥራ አስፈፃሚ",
    titleEn: "Engineering & Maintenance Services Executive",
    unit: "Engineering",
    tier: "operations",
    reportsTo: "ceo",
    level: "executive",
    summary:
      "Maintains campus engineering systems, facilities upkeep, and technical reliability at Sululta.",
    responsibilities: [
      "Facilities engineering and maintenance",
      "Technical asset reliability",
      "Campus infrastructure projects support",
    ],
  },
];

export function getOrgRole(id: string): OrgRole | undefined {
  return orgHierarchy.find((role) => role.id === id);
}

export function getDirectReports(id: string): OrgRole[] {
  return orgHierarchy
    .filter((role) => role.reportsTo === id)
    .sort((a, b) => a.order - b.order);
}

export function getRolesByTier(tier: OrgTier): OrgRole[] {
  return orgHierarchy
    .filter((role) => role.tier === tier)
    .sort((a, b) => {
      // Leads before deputies within a tier
      const levelRank = { chief: 0, lead: 1, executive: 2, deputy: 3 };
      const lr = levelRank[a.level] - levelRank[b.level];
      return lr !== 0 ? lr : a.order - b.order;
    });
}
