/**
 * Library & Digital Repository resources.
 *
 * Extracted from the library page so the dynamic site search can index these
 * documents alongside every other content source. The library page imports
 * `libraryResources` from here instead of defining the array inline.
 */
export interface LibraryResource {
  id: string;
  title: string;
  category: "Policy Brief" | "Historical Archive" | "Executive Monograph" | "Applied Thesis";
  author: string;
  year: string;
  pages: string;
  abstract: string;
  keywords: string[];
}

export const libraryResources: LibraryResource[] = [
  {
    id: "res-01",
    title: "Institutional Capability & State Transformation in 21st-Century Africa",
    category: "Policy Brief",
    author: "AFLEX Policy Advisory Working Group",
    year: "2025",
    pages: "48 pp.",
    abstract:
      "A synthesis of institutional reform models across 14 African nations, evaluating civil service professionalization, performance compacts, and meritocratic promotion systems.",
    keywords: ["Governance", "Civil Service Reform", "State Capacity", "Pan-Africanism"],
  },
  {
    id: "res-02",
    title: "Speeches & Declarations of the Organization of African Unity (1963–2002)",
    category: "Historical Archive",
    author: "Pan-African Diplomatic Archives Collection",
    year: "Historical Compilation (Ed. 2024)",
    pages: "312 pp.",
    abstract:
      "Declassified plenary addresses, founding charters, and summit communiqués chronicling continental liberation, non-alignment, and the evolution toward the African Union.",
    keywords: ["OAU", "African Union", "Diplomacy", "Decolonization", "Founding Fathers"],
  },
  {
    id: "res-03",
    title: "Leadership in Crisis: Decision-Making Under Extreme Fiscal & Geopolitical Shocks",
    category: "Executive Monograph",
    author: "Prof. Mamadou Diouf & Dr. Seleshi Bekele (Eds.)",
    year: "2024",
    pages: "186 pp.",
    abstract:
      "Case studies drawn from African heads of state and finance ministers navigating debt restructuring, pandemic mitigation, and strategic resource negotiations.",
    keywords: ["Crisis Leadership", "Strategic Negotiation", "Macroeconomics", "Statecraft"],
  },
  {
    id: "res-04",
    title: "Digital Sovereignty & AI Governance Strategies for African Public Administration",
    category: "Policy Brief",
    author: "AFLEX Digital Governance Center",
    year: "2026",
    pages: "64 pp.",
    abstract:
      "Roadmap for national digital identity, sovereign data infrastructure, and ethical artificial intelligence deployment across African ministerial ecosystems.",
    keywords: ["Digital Governance", "AI Policy", "Data Sovereignty", "Public Tech"],
  },
  {
    id: "res-05",
    title: "Transformative Women Leaders in African Public Sector Governance",
    category: "Applied Thesis",
    author: "Project WILD Senior Fellowship Cohort",
    year: "2025",
    pages: "128 pp.",
    abstract:
      "Empirical evaluation of women executive leadership pathways, institutional mentorship frameworks, and policy outcomes in East and Southern Africa.",
    keywords: ["Women Leadership", "Project WILD", "Inclusivity", "Executive Cohorts"],
  },
  {
    id: "res-06",
    title: "Regional Economic Integration & the AfCFTA: Infrastructure & Customs Harmony",
    category: "Policy Brief",
    author: "UNECA & AFLEX Joint Policy Clinic",
    year: "2025",
    pages: "92 pp.",
    abstract:
      "Strategic policy handbook addressing non-tariff barriers, multi-modal transport corridors, and regional payment settlement systems.",
    keywords: ["AfCFTA", "Economic Integration", "Trade Policy", "Infrastructure"],
  },
];
