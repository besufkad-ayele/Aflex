export interface Vacancy {
  id: string;
  title: string;
  department: string;
  category: "Academic" | "Operations" | "Digital Systems" | "Leadership & Executive" | "Strategic Relations";
  type: "Full-time" | "Contract / Rolling" | "Visiting Fellowship" | "Part-time";
  location: string;
  gradeLevel: string;
  deadline: string;
  closingDateISO: string;
  salaryRange: string;
  summary: string;
  overview: string;
  keyResponsibilities: string[];
  requiredQualifications: {
    education: string;
    experience: string;
    languages: string[];
  };
  preferredExperience: string[];
  competencies: string[];
  benefits: string[];
  referenceNumber: string;
}

export const vacancies: Vacancy[] = [
  {
    id: "senior-fellow-policy",
    title: "Senior Research Fellow — Pan-African Governance & Statecraft",
    department: "Academic & Research Directorate",
    category: "Academic",
    type: "Full-time",
    location: "Sululta Campus, Oromia (with periodic continental travel)",
    gradeLevel: "Executive Senior Fellow (Grade P5 / D1 Equivalent)",
    deadline: "April 30, 2026",
    closingDateISO: "2026-04-30",
    salaryRange: "Competitive Federal Executive Scale + Residential Villa & Research Allowance",
    referenceNumber: "AFX-HR-2026-ACAD-01",
    summary: "Lead rigorous policy advisory studies, synthesize continental statecraft frameworks, and facilitate high-level executive seminar modules for African ministers and institutional heads.",
    overview: "The African Leadership Excellence Academy (AFLEX) invites applications from distinguished African scholars and statecraft practitioners for the position of Senior Research Fellow in Pan-African Governance. Operating at our world-class Sululta Campus, the Fellow will head strategic policy advisory research, author high-impact policy briefs for the Council of Ministers and African Union organs, and design transformative pedagogical models for senior executive cohorts.",
    keyResponsibilities: [
      "Author cutting-edge policy monographs and applied white papers on African institutional capability, regional economic integration, and peace architecture.",
      "Facilitate high-level deliberation modules and executive simulation clinics for visiting ministers, state executives, and permanent secretaries.",
      "Supervise applied research projects and policy laboratory deliverables submitted by senior fellowship cohorts.",
      "Build institutional research alliances with the African Union Commission, UNECA, AfDB, and premier Pan-African think tanks.",
      "Convene the Annual Pan-African Governance Symposium and edit the AFLEX Leadership & Policy Review Journal."
    ],
    requiredQualifications: {
      education: "Ph.D. in Public Policy, International Relations, Political Economy, Statecraft, or related social science disciplines from an accredited university.",
      experience: "Minimum 10 years of post-doctoral research, policy advisory, or senior public sector experience across African governance institutions.",
      languages: ["English (Proficient / Working)", "Amharic (Advantageous)", "French or Arabic (Added Advantage)"]
    },
    preferredExperience: [
      "Demonstrated track record of advising African governments, regional economic communities (RECs), or international multilateral bodies.",
      "Proven publication record in peer-reviewed governance journals and strategic policy outlets.",
      "Experience with executive leadership coaching and active adult-learning pedagogical methodologies."
    ],
    competencies: [
      "Strategic Statecraft & Institutional Analysis",
      "Executive Facilitation & Oratory Excellence",
      "Pan-African Geopolitical Acumen",
      "High-Level Policy Drafting & Consensus Building"
    ],
    benefits: [
      "Furnished executive residence on Sululta Academy campus grounds",
      "Comprehensive federal diplomatic health and life insurance cover",
      "Annual international research & conference travel grant ($15,000 USD equivalent)",
      "Dedicated graduate research assistant and policy clinic workspace",
      "Generous institutional pension and sabbatical provisions"
    ]
  },
  {
    id: "executive-education-coordinator",
    title: "Executive Education Program Coordinator",
    department: "Academic Operations & Cohort Management",
    category: "Operations",
    type: "Full-time",
    location: "Sululta Campus & Addis Ababa Liaison Office",
    gradeLevel: "Professional Grade 4 (P4 Equivalent)",
    deadline: "May 15, 2026",
    closingDateISO: "2026-05-15",
    salaryRange: "Attractive Public Service Scale + Performance Bonus & Commuter Allowance",
    referenceNumber: "AFX-HR-2026-OPS-04",
    summary: "Manage high-impact participant journeys, cohort logistics, curriculum delivery schedules, and institutional sponsor liaisons for executive government cohorts.",
    overview: "We are seeking a high-energy, meticulous Executive Education Program Coordinator to orchestrate end-to-end delivery of AFLEX's flagship leadership programs. The incumbent will ensure that every minister, director general, and corporate leader enrolled at AFLEX receives a seamless educational, residential, and networking experience.",
    keyResponsibilities: [
      "Direct the operational lifecycle of assigned executive cohorts from nomination onboarding to graduation conferment.",
      "Coordinate with world-class faculty, visiting guest speakers, and executive coaches to guarantee syllabus delivery adherence.",
      "Oversee residential hospitality, protocol requirements, syndicate room preparation, and simultaneous interpretation equipment.",
      "Administer program evaluation diagnostics, participant sentiment surveys, and post-cohort impact tracking reports.",
      "Manage communication channels with sponsoring ministries, regional cabinets, and private enterprise sponsors."
    ],
    requiredQualifications: {
      education: "Master's Degree in Business Administration (MBA), Public Administration, Education Management, or Project Management.",
      experience: "Minimum 5 years of successful program management in executive education, corporate universities, or top-tier hospitality management.",
      languages: ["English (Fluent)", "Amharic (Fluent)", "Afaan Oromoo or other Ethiopian national languages (Valued)"]
    },
    preferredExperience: [
      "Experience working in multinational corporate academies, diplomatic training institutes, or tier-1 universities.",
      "Familiarity with digital cohort management tools, Canvas/Moodle LMS, and executive CRM systems.",
      "Proven protocol experience managing high-profile government officials and foreign dignitaries."
    ],
    competencies: [
      "Flawless Cohort Logistics & Event Execution",
      "Executive Client Relationship Management",
      "Problem-Solving Under Tight Deliberation Deadlines",
      "Digital Program Management & Reporting"
    ],
    benefits: [
      "Official campus shuttle transportation from Addis Ababa to Sululta",
      "Duty meals at the Executive Academy Dining Hall during active cohorts",
      "Continuous professional development sponsorships (CAPM/PMP/Executive Leadership)",
      "Comprehensive medical insurance coverage"
    ]
  },
  {
    id: "lead-digital-learning-architect",
    title: "Lead Instructional Designer & LMS Architect",
    department: "Digital Innovation & E-Learning Center",
    category: "Digital Systems",
    type: "Full-time",
    location: "Sululta Campus (Hybrid Flexibility: 3 days on campus / 2 days remote)",
    gradeLevel: "Senior Technical Lead (Grade T5)",
    deadline: "May 20, 2026",
    closingDateISO: "2026-05-20",
    salaryRange: "Competitive Tech Band + Innovation Bonus + Device Allowance",
    referenceNumber: "AFX-HR-2026-TECH-02",
    summary: "Design modern asynchronous micro-learning modules, maintain AFLEX LMS ecosystems (including Project WILD portal), and lead multimedia courseware production.",
    overview: "AFLEX is modernizing its digital delivery to reach thousands of public servants across Ethiopia and the wider African continent. As Lead Instructional Designer & LMS Architect, you will spearhead our hybrid learning architecture, integrating statecraft simulations, video masterclasses, and mobile-first e-learning platforms.",
    keyResponsibilities: [
      "Architect and administer the AFLEX Multi-Portal Learning Management System (LMS) serving executive, standard, and Project WILD portals.",
      "Collaborate with senior faculty to translate complex policy and statecraft topics into interactive digital micro-learning units.",
      "Direct the Academy's multimedia studio team in capturing high-definition video masterclasses, podcasts, and digital case studies.",
      "Integrate AI-assisted learning analytics to evaluate student engagement, completion rates, and cohort mastery.",
      "Ensure compliance with WCAG 2.1 accessibility standards and multi-language localized delivery (English, Amharic, Afaan Oromoo)."
    ],
    requiredQualifications: {
      education: "Master's or Bachelor's in Instructional Design, Educational Technology, Computer Science, or Human-Computer Interaction.",
      experience: "Minimum 6 years leading instructional design, LMS architecture (Moodle/Open edX/Canvas), and SCORM/xAPI compliant course authoring.",
      languages: ["English (Proficient)", "Amharic (Working Knowledge)"]
    },
    preferredExperience: [
      "Experience with Articulate 360, Adobe Captivate, and studio video editing workflows (Premiere/DaVinci).",
      "Demonstrated experience designing high-retention corporate or government executive e-learning programs.",
      "Knowledge of cloud infrastructure (AWS/Azure) and LMS database administration."
    ],
    competencies: [
      "Advanced LMS Architecture & Data Analytics",
      "Interactive Curriculum Pedagogical Design",
      "Multimedia Production Direction",
      "User Experience & Digital Accessibility"
    ],
    benefits: [
      "Modern high-performance workstation and multimedia software licenses",
      "Subsidized high-speed home fiber connectivity allowance",
      "Quarterly innovation incentives and conference travel grant",
      "Full health and life insurance plan"
    ]
  },
  {
    id: "director-institutional-partnerships",
    title: "Director of Institutional Partnerships & Alliances",
    department: "Office of the President / Strategic Relations",
    category: "Strategic Relations",
    type: "Full-time",
    location: "Sululta Campus & Addis Ababa Diplomatic Quarter",
    gradeLevel: "Executive Directorate Level (Grade D1)",
    deadline: "June 05, 2026",
    closingDateISO: "2026-06-05",
    salaryRange: "Executive Grade Scale + Diplomatic Representation Allowance",
    referenceNumber: "AFX-HR-2026-STRAT-03",
    summary: "Cultivate bilateral partnerships with African Union organs, United Nations agencies, multilateral development banks, and continental academies.",
    overview: "The Director of Institutional Partnerships will lead AFLEX's external diplomatic and strategic positioning across the African continent and globally. Reporting directly to the President/CEO, the Director will secure multi-year institutional partnerships, endowment funding, and collaborative training memoranda of understanding (MoUs).",
    keyResponsibilities: [
      "Design and execute the Academy's 5-year Continental Partnership Strategy across AU Member States.",
      "Negotiate and execute bilateral MoUs with regional economic communities (ECOWAS, EAC, SADC, IGAD) and national public service colleges.",
      "Secure grant funding, technical assistance, and scholarship endowments from multilateral partners (UNDP, AfDB, World Bank, bilateral agencies).",
      "Represent AFLEX at continental diplomatic forums, international leadership summits, and ministerial roundtables.",
      "Manage high-level partner delegations visiting the Sululta Campus."
    ],
    requiredQualifications: {
      education: "Master's or Ph.D. in International Relations, Public Administration, Law, Economics, or Strategic Studies.",
      experience: "Minimum 12 years of executive experience in international diplomacy, multilateral development organizations, or foreign service leadership.",
      languages: ["English (Fluent)", "French (Fluent / Highly Valued)", "Amharic (Working)"]
    },
    preferredExperience: [
      "Prior service within the African Union Commission, UNECA, regional economic communities, or foreign ministries.",
      "Proven record in raising major development finance grants ($5M+ USD portfolio).",
      "Extensive network of contacts across African public sector leadership."
    ],
    competencies: [
      "High-Stakes Diplomatic Negotiation",
      "Multilateral Resource Mobilization",
      "Cross-Cultural Executive Stakeholder Relations",
      "Pan-African Policy Advocacy"
    ],
    benefits: [
      "Diplomatic vehicle assignment and representation allowance",
      "Executive housing allowance or Sululta villa accommodation",
      "International mission per-diem and travel coverage",
      "Executive comprehensive health package"
    ]
  },
  {
    id: "chief-facilities-hospitality-manager",
    title: "Head of Campus Hospitality & Executive Logistics",
    department: "Facilities & Operations Directorate",
    category: "Operations",
    type: "Full-time",
    location: "Sululta Campus",
    gradeLevel: "Senior Management (Grade M3)",
    deadline: "May 30, 2026",
    closingDateISO: "2026-05-30",
    salaryRange: "Senior Management Scale + Campus Housing + Performance Bonus",
    referenceNumber: "AFX-HR-2026-FAC-05",
    summary: "Supervise the 5-star executive lodging villas, banquet catering services, recreational centers, and physical security across the 50+ hectare Sululta compound.",
    overview: "AFLEX's Sululta campus provides world-class residential and conference facilities accommodating hundreds of high-ranking delegates simultaneously. The Head of Hospitality will maintain international 5-star hotel operational standards across all presidential villas, syndicate wings, dining halls, and wellness facilities.",
    keyResponsibilities: [
      "Manage daily operations of 500+ resident executive rooms, VIP suites, dining halls, and auditorium conference centers.",
      "Direct culinary standards, nutritional quality, and VIP banquet catering in coordination with executive chefs.",
      "Ensure pristine estate maintenance, landscape preservation, and green sustainability initiatives across campus acreage.",
      "Coordinate with federal VIP security details to enforce discreet, bulletproof physical campus security and access control.",
      "Lead a hospitality and facility team of 80+ permanent and contracted personnel."
    ],
    requiredQualifications: {
      education: "Degree in Hospitality Management, Estate Management, Business Administration, or Hotel Administration.",
      experience: "Minimum 8 years of general management experience in 5-star international hotels, luxury resorts, or high-security governmental guest residences.",
      languages: ["English (Proficient)", "Amharic (Fluent)", "Afaan Oromoo (Valued)"]
    },
    preferredExperience: [
      "Experience managing state protocol dining and diplomatic lodging.",
      "Certified in HACCP / Food Safety Management and ISO 9001 quality frameworks.",
      "Proven leadership of large multidisciplinary operations teams."
    ],
    competencies: [
      "5-Star Hospitality Operations & Standards",
      "Estate & Asset Facility Lifecycle Management",
      "Protocol & VIP Security Coordination",
      "Vendor & Service Level Agreement (SLA) Management"
    ],
    benefits: [
      "Dedicated management villa on campus grounds",
      "Full family medical coverage",
      "Operational vehicle and fuel allowance",
      "Annual performance incentive"
    ]
  }
];

export function getVacancyById(id: string): Vacancy | undefined {
  return vacancies.find((v) => v.id === id);
}

/** Open roles shown on the utility-bar Vacancies badge */
export const openVacancyCount = vacancies.length;
