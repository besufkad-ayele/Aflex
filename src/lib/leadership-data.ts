export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  category: "board" | "executive";
  image: string;
  badge: string;
  bio: string;
  responsibilities?: string[];
  externalUrl?: string;
}

export const seniorExecutives: LeaderProfile[] = [
  {
    id: "mohammedrafie-abaraya",
    name: "Mohammedrafie Abaraya",
    role: "Chief Executive Officer (CEO)",
    category: "executive",
    image: "/Mohammedrafie.jpg",
    badge: "CHIEF EXECUTIVE OFFICER",
    bio: "Mohammedrafie Abaraya (ሙሐመድራፊዕ አባራያ) leads the African Leadership Excellence Academy with a clear conviction: leadership is a science as much as it is an art — and AFLEX is where these two meet. Under his leadership, the Academy incubates, empowers, and elevates the next generation of African leaders while supporting current leaders across the public, private, and civic sectors.",
    responsibilities: [
      "Institutional Strategy & Overall Command",
      "Continental Alliances & Ministerial Partnerships",
      "Curricula Direction & Statecraft Flagships"
    ]
  },
  {
    id: "meseret-desta",
    name: "Mrs. Meseret Desta",
    role: "Vice Chief of Academy, Leadership Development",
    category: "executive",
    image: "/about/meseret desta vice chief of acadamy leadership development.jpg",
    badge: "VICE CHIEF · LEADERSHIP DEVELOPMENT",
    bio: "Mrs. Meseret Desta directs the Academy's flagship leadership development programs, executive cohorts, and women's leadership initiatives (Project WILD). She oversees pedagogical innovation, participant mentorship, and transformational leadership tracks tailored to senior decision-makers.",
    responsibilities: [
      "Leadership Development & Executive Cohorts",
      "Project WILD (Women in Leadership)",
      "Pedagogy, Faculty & Participant Experience"
    ]
  },
  {
    id: "wondeye-legesse",
    name: "Wondeye Legesse (PhD)",
    role: "Vice Chief of Academy, Operations",
    category: "executive",
    image: "/about/wondeye legese vice chief of acadaymy operation.png",
    badge: "VICE CHIEF · OPERATIONS",
    externalUrl: "https://aflexacademy.gov.et/aflex/vice-president-and-operational-sector/",
    bio: "Dr. Wondeye Legesse leads operational excellence, residential infrastructure, campus technology, and institutional finance at AFLEX. He ensures the Sululta highland campus operates at globally competitive standards for executive deliberation and continuous learning.",
    responsibilities: [
      "Campus Operations & Residential Logistics",
      "Institutional Technology, LMS & Infrastructure",
      "Finance, Administration & Procurement Standards"
    ]
  }
];

export const boardMembers: LeaderProfile[] = [
  {
    id: "tagese-chafo",
    name: "H.E Tagesse Chafo",
    role: "Chairperson of the Board",
    category: "board",
    image: "/about/he tages chafo chaire person.png",
    badge: "GOVERNING BOARD CHAIR",
    bio: "Speaker of the House of Peoples' Representatives of the Federal Democratic Republic of Ethiopia. H.E Tagesse Chafo presides over the AFLEX Governing Board, stewarding its legislative mandate and strategic alignment with national and continental leadership transformation.",
    responsibilities: [
      "Speaker of the House of Peoples' Representatives (FDRE)",
      "Chairperson · AFLEX Board of Governors",
      "Parliamentary Governance & National Policy Direction"
    ]
  },
  {
    id: "binalf-andualem",
    name: "H.E Binalf Andualem",
    role: "Board Member",
    category: "board",
    image: "/about/he binalf andualem.jpg",
    badge: "MINISTERIAL GOVERNOR",
    bio: "Minister of Peace of the Federal Democratic Republic of Ethiopia. H.E Binalf Andualem guides institutional consensus, state-building leadership curriculums, and national cohesion initiatives within the Academy.",
    responsibilities: [
      "Minister of Peace (FDRE)",
      "Governing Board Member · AFLEX",
      "State-Building & Civic Leadership Stewardship"
    ]
  },
  {
    id: "gedion-timotheos",
    name: "H.E Gedion Timotheos (PhD)",
    role: "Board Member",
    category: "board",
    image: "/about/he gedion timotheos.jpg",
    badge: "LEGAL & STRATEGIC ADVISOR",
    bio: "Minister of Foreign Affairs (and former Minister of Justice & Attorney General). Dr. Gedion Timotheos provides strategic counsel on continental legal frameworks, diplomatic statecraft, and multilateral cooperation for AFLEX programs.",
    responsibilities: [
      "Minister of Foreign Affairs (FDRE)",
      "Governing Board Member · AFLEX",
      "Constitutional Law & International Statecraft"
    ]
  },
  {
    id: "tesfaye-daba",
    name: "H.E Tesfaye Daba",
    role: "Board Member",
    category: "board",
    image: "/about/h.e tesfaye daba memener.png",
    badge: "GOVERNANCE & POLICY MEMBER",
    bio: "Senior Government Executive and Member of Parliament. H.E Tesfaye Daba champions institutional performance, executive public service accountability, and policy implementation excellence.",
    responsibilities: [
      "Member of Parliament & Senior Statesman",
      "Governing Board Member · AFLEX",
      "Public Sector Execution & Legislative Oversight"
    ]
  },
  {
    id: "muferihat-kamil",
    name: "H.E Muferihat Kamil",
    role: "Board Member",
    category: "board",
    image: "/about/he muferihat kamil memeber.jpg",
    badge: "HUMAN CAPITAL & LABOUR",
    bio: "Minister of Labour and Skills of the Federal Democratic Republic of Ethiopia. H.E Muferihat Kamil directs strategic focus on continental workforce readiness, human capital development, and executive mentorship flagships.",
    responsibilities: [
      "Minister of Labour and Skills (FDRE)",
      "Governing Board Member · AFLEX",
      "Human Capital Strategy & Executive Skill Transformation"
    ]
  },
  {
    id: "david-valle",
    name: "David Valle",
    role: "Board Member",
    category: "board",
    image: "/about/david valle memner.png",
    badge: "INTERNATIONAL STRATEGY",
    bio: "Global executive and international leadership strategist serving on the AFLEX Governing Board to foster global institutional linkages, executive mentorship exchanges, and cross-border research alliances.",
    responsibilities: [
      "International Governance & Development Strategist",
      "Governing Board Member · AFLEX",
      "Cross-Border Alliances & Institutional Innovation"
    ]
  },
  {
    id: "mohammedrafie-board-sec",
    name: "Mohammedrafie Abaraya",
    role: "Secretary to the Board",
    category: "board",
    image: "/Mohammedrafie.jpg",
    badge: "BOARD SECRETARY & CEO",
    bio: "Chief Executive Officer and Secretary to the Governing Board. Leads the executive design and day-to-day execution of the Academy's continental mandate, coordinating between the Governing Board and academy faculties.",
    responsibilities: [
      "Chief Executive Officer (CEO) · AFLEX",
      "Secretary to the Governing Board",
      "Executive Directorate Leadership"
    ]
  }
];

