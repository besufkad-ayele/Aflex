export interface NewsItem {
  slug: string;
  title: string;
  category: "ACADEMY" | "CAMPUS" | "INSIGHT" | "RESEARCH" | "PRESS";
  date: string;
  readTime: string;
  image: string;
  author: string;
  authorRole: string;
  excerpt: string;
  content: string[];
  keyTakeaways?: string[];
  pressContact?: string;
  featured?: boolean;
}

export const newsArticles: NewsItem[] = [
  {
    slug: "green-legacy-program-expanded",
    title: "Green Legacy Program must be expanded widely: HE. Demeke Mekonen",
    category: "PRESS",
    date: "20.02.23",
    readTime: "4 MIN READ",
    image: "/images/news1.jpg",
    author: "Strategic Communications",
    authorRole: "AFLEX Media Desk",
    featured: true,
    excerpt:
      "The FDRE Deputy Prime Minister and Foreign Affairs Minister, Mr. Demeke Mekonen, stated that the Green Legacy Program should be widely continued for its continental and international benefits.",
    keyTakeaways: [
      "Deputy Prime Minister Demeke Mekonen called for the Green Legacy Program to be expanded widely.",
      "The program delivers continental and international environmental and diplomatic benefits.",
      "Remarks were delivered at AFLEX during the first Pan-Africanism Forum.",
    ],
    content: [
      "The Green Legacy Program has great continental and international benefits. The FDRE Deputy Prime Minister and Foreign Affairs Minister, Mr. Demeke Mekonen, stated that the Green Legacy Program should be widely continued.",
      "The Deputy Prime Minister, who attended the first Pan-Africanism Forum held at the African Leadership Excellence Academy, said Pan-Africanism in the 21st century must be grounded in shared responsibility for the continent’s ecological future as well as its political and economic destiny.",
      "Speaking at the AFLEX campus during the forum, H.E. Demeke Mekonen underscored that tree-planting and environmental stewardship are not only national priorities for Ethiopia, but also instruments of continental solidarity—visible in joint planting ceremonies that bring African states together under a common green agenda.",
      "AFLEX continues to host high-level dialogue that connects leadership development with continental challenges, including climate resilience, public diplomacy, and the renewal of Pan-African thought.",
    ],
  },
  {
    slug: "first-pan-africanism-forum",
    title: "AFLEX Launches First Pan-Africanism Forum",
    category: "ACADEMY",
    date: "20.02.23",
    readTime: "5 MIN READ",
    image: "/images/news2.png",
    author: "Strategic Communications",
    authorRole: "AFLEX Media Desk",
    featured: true,
    excerpt:
      "“Reinvigorating and recalibrating Pan-Africanism requires us to disrupt the status quo and leap into the future” — Prime Minister Abiy Ahmed, speaking at the AFLEX Pan-Africanism Forum on the occasion of the AU Summit.",
    keyTakeaways: [
      "AFLEX launched its first Pan-Africanism Forum in February 2023 during the AU Summit.",
      "Prime Minister Abiy Ahmed called for reinvigorating Pan-Africanism as a living idea.",
      "The forum convened senior African leaders to rethink unity for the 21st century.",
    ],
    content: [
      "“Reinvigorating and recalibrating Pan-Africanism requires us to disrupt the status quo and leap into the future,” said Prime Minister Abiy Ahmed.",
      "The Prime Minister attended the Pan-Africanism Forum prepared by the African Leadership Excellence Academy (AFLEX) on the occasion of the AU Summit. He stressed the need for Pan-Africanism to flourish as an idea of shared destiny—one that must be renewed for contemporary challenges of security, prosperity, and continental integration.",
      "Held at the AFLEX campus, the inaugural forum brought together heads of government, diplomats, and scholars to examine how Pan-African philosophy can guide policy and leadership practice in a changing world.",
      "The Academy framed the gathering as both a scholarly and practical convening: reconnecting liberation-era ideals with the institutional work of building capable African states and a more coherent continental agenda.",
    ],
  },
  {
    slug: "leadership-learning-work-ahead",
    title: "Leadership, learning, and the work ahead",
    category: "ACADEMY",
    date: "07.06.24",
    readTime: "5 MIN READ",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85",
    author: "Mohammedrafie Abaraya",
    authorRole: "Chief Executive Officer (CEO) · AFLEX",
    excerpt: "Exploring the intersection of leadership development and practical governance in modern Africa.",
    keyTakeaways: [
      "African public executives must balance technical operational competence with deep philosophical grounding.",
      "Traditional administrative paradigms must give way to agile, sovereign statecraft tailored for global economic volatility.",
      "Sululta's residential environment fosters cross-border coalitions and peer accountability among senior ministers."
    ],
    content: [
      "The challenges confronting African governance today cannot be solved by inherited administrative blueprints alone. At AFLEX, we understand that true statecraft requires leaders who possess both technical precision and deep philosophical grounding in African realities.",
      "From macroeconomic volatility and continental economic integration under the AfCFTA to climate resilience and institutional reform, public executives carry an immense moral obligation to the citizens they serve.",
      "Our curriculum at the Sululta highland campus is designed specifically to test judgment under simulated crisis, encourage cross-sector coalitions, and cultivate leadership rooted in service."
    ]
  },
  {
    slug: "place-for-reflection",
    title: "A place built for serious reflection",
    category: "CAMPUS",
    date: "29.05.24",
    readTime: "4 MIN READ",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85",
    author: "Campus Planning Directorate",
    authorRole: "AFLEX Infrastructure Board",
    excerpt: "How the Sululta campus architecture supports deep learning and meaningful dialogue.",
    keyTakeaways: [
      "Purpose-built 2,600m highland campus designed to eliminate metropolitan distractions for senior decision-makers.",
      "Facilities include acoustic executive amphitheatres, simulation caucus chambers, and quiet contemplation courtyards.",
      "Sustainable green architectural standards integrated with indigenous Ethiopian stone and timber masonry."
    ],
    content: [
      "Located in the serene highlands of Sululta, AFLEX's main campus was intentionally built away from the clamor of metropolitan distractions. At 2,600 meters altitude, the cool air and expansive horizons provide an unmatched psychological sanctuary for rigorous intellectual work.",
      "The physical spaces—from high-tech amphitheatres and residential suites to quiet contemplation courtyards—are engineered to serve as an active partner in the learning process.",
      "Leaders who step onto the campus enter an environment designed for honesty, intellectual rigor, and the long view of history."
    ]
  },
  {
    slug: "rethinking-public-service",
    title: "Rethinking the architecture of public service",
    category: "INSIGHT",
    date: "16.05.24",
    readTime: "6 MIN READ",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85",
    author: "Dr. Melese",
    authorRole: "Public Administration Faculty Lead · AFLEX",
    excerpt: "New frameworks for building institutions that serve the public good effectively.",
    keyTakeaways: [
      "Civil service effectiveness directly determines investor confidence and democratic stability.",
      "Overcoming bureaucratic inertia requires aligning civil servant incentives with measurable citizen delivery metrics.",
      "Anti-corruption efforts must be built into automated digital workflows rather than manual post-hoc audits."
    ],
    content: [
      "Public service is the nervous system of any sovereign nation. When institutions falter, society loses its anchor. Rebuilding bureaucratic integrity requires more than digitizing paperwork—it demands a profound renewal of public ethos.",
      "The Public Service Leadership Excellence (PSLE) program at AFLEX brings senior permanent secretaries together to analyze institutional friction points, streamline public procurement, and establish merit-based accountability structures."
    ]
  },
  {
    slug: "african-wisdom-leadership",
    title: "African wisdom in contemporary leadership",
    category: "RESEARCH",
    date: "08.04.24",
    readTime: "7 MIN READ",
    image: "https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?auto=format&fit=crop&w=1200&q=85",
    author: "AFLEX Policy Lab",
    authorRole: "Continental Research Network",
    excerpt: "Drawing from indigenous knowledge systems to inform modern governance practices.",
    keyTakeaways: [
      "Africa's pre-colonial governance systems pioneered separation of powers and generational transfers of authority.",
      "Gadaa principles of consensus-building and rotational tenure offer modern solutions for constitutional stability.",
      "AFLEX's policy monographs bridge ancient ethical traditions with contemporary multilateral negotiation techniques."
    ],
    content: [
      "For centuries before modern constitutional theory was codified in the West, African societies practiced complex systems of separation of powers, generational term limits, and participatory consensus.",
      "Our latest research white paper maps traditional and contemporary governance models to provide African policy-makers with homegrown alternatives to donor-imposed reform models."
    ]
  },
  {
    slug: "project-wild-graduation",
    title: "Project WILD celebrates first cohort graduation",
    category: "ACADEMY",
    date: "22.03.24",
    readTime: "4 MIN READ",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=85",
    author: "Mrs. Selam",
    authorRole: "Director of Women in Leadership · AFLEX",
    excerpt: "Women leaders complete intensive leadership development program with distinction.",
    keyTakeaways: [
      "Senior women directors, judges, and state ministers successfully graduated from the intensive WILD fellowship.",
      "Fellows spearheaded high-impact institutional transformation projects across public administration.",
      "Alumni network established to mentor emerging women leaders across public administration and diplomatic corps."
    ],
    content: [
      "AFLEX celebrated the graduation of the inaugural cohort of Project WILD (Women Integrated Leadership Development) at the Sululta highland campus.",
      "Over intensive executive retreats, one-on-one mentorship, and applied institutional transformation projects, these leaders demonstrated the immense power of inclusive African governance."
    ]
  },
  {
    slug: "research-center-opens",
    title: "New research center opens at Sululta",
    category: "CAMPUS",
    date: "14.03.24",
    readTime: "5 MIN READ",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=85",
    author: "Strategic Communications",
    authorRole: "AFLEX Media Desk",
    excerpt: "State-of-the-art facility will support policy research and leadership studies.",
    keyTakeaways: [
      "Dedicated economic simulation chambers allow real-time modeling of continental trade pacts and supply shocks.",
      "Digital policy databank provides open access to pan-African governance indices and case study repositories.",
      "Facility hosts visiting scholars, former heads of state, and policy fellows from across the African Union."
    ],
    content: [
      "With dedicated simulation chambers and digital policy databanks, the new AFLEX Policy Lab provides scholars and ministers with real-time economic modeling tools to analyze the impacts of continental trade pacts and energy infrastructure investments."
    ]
  }
];

export const featuredNews = newsArticles.filter((item) => item.featured);
