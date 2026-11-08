/**
 * AFLEX institutional story timeline and CEO succession history.
 * Speech / YouTube URLs can be filled as official addresses are published.
 */

export interface HistoryMilestone {
  id: string;
  year: string;
  era: string;
  title: string;
  titleAm?: string;
  summary: string;
  highlights?: string[];
}

export interface CeoTenure {
  id: string;
  name: string;
  nameAm?: string;
  title: string;
  period: string;
  status: "current" | "former" | "founding-era";
  summary: string;
  focus?: string[];
  /** Public address / speech on YouTube or official channel */
  youtubeUrl?: string;
  image?: string;
}

export const aflexStoryMilestones: HistoryMilestone[] = [
  {
    id: "mzla-era",
    year: "Pre-2021",
    era: "PREDECESSOR INSTITUTION",
    title: "Meles Zenawi Leadership Academy",
    titleAm: "የመለስ ዜናዊ የአመራር አካዳሚ",
    summary:
      "Before AFLEX, the institution operated as the Meles Zenawi Leadership Academy, delivering learning opportunities for national government leaders and laying the foundation for highland executive education at Sululta.",
    highlights: [
      "National leadership learning mandate",
      "Sululta highland campus foundations",
      "Public-sector executive cohorts",
    ],
  },
  {
    id: "reestablishment",
    year: "June 2021",
    era: "FEDERAL REESTABLISHMENT",
    title: "AFLEX reestablished by Council of Ministers",
    titleAm: "በሚኒስትሮች ምክር ቤት ዳግም መቋቋም",
    summary:
      "The African Leadership Excellence Academy (AFLEX) was reestablished by the Council of Ministers of the Federal Democratic Republic of Ethiopia with a renewed continental mandate for leadership development, research, and policy advisory.",
    highlights: [
      "Federal Council of Ministers mandate",
      "Three pillars: Leadership, Research, Policy Advisory",
      "Pan-African gathering place for leaders and thinkers",
    ],
  },
  {
    id: "reform-season",
    year: "2021–Present",
    era: "INSTITUTIONAL REFORM",
    title: "Internal reform and senior national cohorts",
    summary:
      "AFLEX focused on training senior national leaders while completing internal reform works — strengthening curriculum, campus operations, and institutional culture under the COMING values framework.",
    highlights: [
      "Senior national leadership training",
      "Internal reform and quality systems",
      "Stakeholder feedback and program iteration",
    ],
  },
  {
    id: "continental-agenda",
    year: "Next season",
    era: "PAN-AFRICAN AGENDA",
    title: "Opening doors to the continental agenda",
    summary:
      "The Academy is preparing a broader Pan-African program of workshops, trainings, and high-level deliberations — including landmark side events aligned with continental summits — from its state-of-the-art Sululta facility.",
    highlights: [
      "Continental workshops and dialogues",
      "AU-aligned convenings",
      "Africa’s renaissance leadership pipeline",
    ],
  },
];

export const ceoHistory: CeoTenure[] = [
  {
    id: "mohammedrafie-abaraya",
    name: "Mohammedrafie Abaraya",
    nameAm: "ሙሐመድራፊዕ አባራያ",
    title: "Chief Executive Officer (CEO)",
    period: "Current",
    status: "current",
    summary:
      "Leads AFLEX with the conviction that leadership is a science as much as it is an art. Under his stewardship the Academy incubates, empowers, and elevates African leaders while advancing institutional reform and the coming continental agenda.",
    focus: [
      "Inter-generational wisdom transfer",
      "Senior national leadership training",
      "Pan-African agenda preparation",
    ],
    image: "/Mohammedrafie.jpg",
    youtubeUrl: undefined,
  },
  {
    id: "predecessor-era",
    name: "Predecessor leadership era",
    nameAm: "የቀድሞ አመራር ዘመን",
    title: "Meles Zenawi Leadership Academy leadership",
    period: "Pre-2021",
    status: "founding-era",
    summary:
      "Prior to reestablishment as AFLEX, the Academy’s predecessor institution was led under the Meles Zenawi Leadership Academy mandate, serving national government leaders. Named succession details for that era can be published here as archival records are confirmed.",
    focus: [
      "National government leadership learning",
      "Institutional foundation at Sululta",
    ],
    youtubeUrl: undefined,
  },
];
