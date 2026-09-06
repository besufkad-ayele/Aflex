export interface CampusFacility {
  id: string;
  zone: string;
  category: "Academic & Training" | "Executive Lodging" | "Dining & Hospitality" | "Recreation & Wellness" | "Administration & Protocol";
  name: string;
  shortName: string;
  description: string;
  capacity: string;
  levels: string;
  features: string[];
  specs: { label: string; value: string }[];
  navigation: string;
  coords: { x: number; y: number; width?: number; height?: number };
  badge?: string;
  iconName: string;
}

export interface ArrivalEssential {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  details: string[];
}

export const CAMPUS_METADATA = {
  name: "African Leadership Excellence Academy (AFLEX) - Sululta Main Campus",
  tagline: "Highland Sanctuary for Transformative African Leadership",
  elevation: "2,450m – 2,600m above sea level",
  location: "Sululta, Oromia Special Zone, Ethiopia (~25km North of Addis Ababa)",
  coordinates: {
    lat: 9.10841,
    lng: 38.72522,
    formatted: "9°06'30.3\"N 38°43'30.8\"E"
  },
  phones: {
    campusDirect: "+251 118 931 257",
    headOffice: "+251 118 932 655",
    emergency: "+251 118 931 999"
  },
  email: "facilities@aflex.gov.et",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=9.10841,38.72522"
};

export const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: "01",
    zone: "Zone A · Core Academic",
    category: "Academic & Training",
    name: "Grand Leadership Convention & Plenary Hall",
    shortName: "Convention Hall",
    description: "The primary assembly auditorium hosting national forums, continental summits, high-level policy deliberative sessions, and inaugural cohort convocations.",
    capacity: "500 Delegates",
    levels: "Ground & Mezzanine Gallery",
    features: [
      "Simultaneous Interpretation (4 Languages)",
      "Tiered Acoustic Amphitheater Seating",
      "4K Broadcast & Telepresence Wall",
      "VIP Diplomatic Holding Lounge"
    ],
    specs: [
      { label: "Main Auditorium", value: "500 seats (Tiered)" },
      { label: "Interpretation Booths", value: "En, Fr, Ar, Am" },
      { label: "AV Production", value: "Live Satellite / Web Stream" },
      { label: "Accessibility", value: "Ramp & Stage Lift Access" }
    ],
    navigation: "Directly opposite the Ceremonial Plaza, 150m from the Main Accreditation Gate.",
    coords: { x: 380, y: 190, width: 140, height: 90 },
    badge: "Plenary Summit",
    iconName: "landmark"
  },
  {
    id: "02",
    zone: "Zone A · Academic Wing",
    category: "Academic & Training",
    name: "Syndicate Learning Pods & Executive Seminar Rooms",
    shortName: "Syndicate Pods",
    description: "Multi-functional seminar wings designed for Chatham House rule breakout deliberations, strategic policy simulations, and intensive syndicate working groups.",
    capacity: "12 Pods (15–35 seats each)",
    levels: "2 Floors (East & West Wings)",
    features: [
      "Interactive Digital Podiums",
      "Soundproof Deliberation Partitions",
      "Collaborative Whiteboard Walls",
      "High-speed Dedicated Gigabit Fiber"
    ],
    specs: [
      { label: "Breakout Rooms", value: "12 Executive Syndicate Rooms" },
      { label: "Cohort Capacity", value: "240 Trainees simultaneously" },
      { label: "Displays", value: "Dual 85\" Touch Annotation Screens" },
      { label: "Power & Data", value: "In-desk AC + RJ45 at every seat" }
    ],
    navigation: "Adjoins the Main Plenary Hall via the covered glass atrium walkway.",
    coords: { x: 560, y: 180, width: 110, height: 80 },
    badge: "Breakout & Syndicate",
    iconName: "users"
  },
  {
    id: "03",
    zone: "Zone A · Knowledge Center",
    category: "Academic & Training",
    name: "Digital Resource Center & Continental Policy Library",
    shortName: "Library & Archives",
    description: "Quiet intellectual sanctuary housing state governance archives, African Union treatises, digital databases, private study carrels, and e-learning terminals.",
    capacity: "120 Researchers",
    levels: "Ground & 1st Floor",
    features: [
      "African Governance & Policy Collection",
      "High-speed E-Library Research Terminals",
      "Individual Executive Carrels",
      "Rare Document & Gazette Archives"
    ],
    specs: [
      { label: "Physical Volumes", value: "15,000+ Titles" },
      { label: "Digital Databases", value: "JSTOR, EBSCO, African Portal" },
      { label: "Private Carrels", value: "24 Soundproof Study Pods" },
      { label: "Hours", value: "06:00 – 23:00 Daily" }
    ],
    navigation: "North side of the Academic Courtyard, overlooking the pine grove.",
    coords: { x: 260, y: 150, width: 90, height: 75 },
    badge: "Research & Archive",
    iconName: "book-open"
  },
  {
    id: "04",
    zone: "Zone B · Executive Living",
    category: "Executive Lodging",
    name: "VIP Presidential & Ministerial Guest Suites",
    shortName: "Presidential Suites",
    description: "Exclusive residential lodging reserved for visiting heads of state, cabinet ministers, continental ambassadors, and keynote international faculty.",
    capacity: "24 VIP Suites",
    levels: "Private 2-Story Villa Complex",
    features: [
      "Private Security Perimeter & Protocol Gate",
      "En-suite Ministerial Study & Teleconference Desk",
      "Sululta Mountain View Terraces",
      "24/7 Dedicated Butler & Concierge Service"
    ],
    specs: [
      { label: "Suite Types", value: "Executive Master & Diplomatic Junior" },
      { label: "Connectivity", value: "Encrypted Secure Wi-Fi 6" },
      { label: "Amenities", value: "Private Dining Lounge & Fireplace" },
      { label: "Access", value: "Restricted Biometric / Protocol Pass" }
    ],
    navigation: "Northwest hill sector, accessed via the dedicated VIP security gate route.",
    coords: { x: 180, y: 310, width: 95, height: 85 },
    badge: "Diplomatic VIP",
    iconName: "shield"
  },
  {
    id: "05",
    zone: "Zone B · Cohort Living",
    category: "Executive Lodging",
    name: "Cohort Residential Residences (Blocks A–D)",
    shortName: "Cohort Residences",
    description: "Modern, quiet executive suites crafted for deep focus, restorative rest, and peer reflection during multi-week and immersive modular leadership programs.",
    capacity: "160 Private En-Suite Rooms",
    levels: "Four 3-Story Pavilions (A, B, C, D)",
    features: [
      "Ergonomic Study Workstations",
      "Highland Insulated Double Glazing",
      "Private Balconies with Forest Vistas",
      "Floor-level Communal Reflection Lounges"
    ],
    specs: [
      { label: "Room Count", value: "160 Single En-suite Bedrooms" },
      { label: "Bed Type", value: "King & Queen Orthopedic" },
      { label: "Services", value: "Daily Housekeeping & Laundry" },
      { label: "Environment", value: "Quiet Zone (No Noise after 22:00)" }
    ],
    navigation: "Western residential ridge, 3-minute landscaped walkway to the Dining Pavilion.",
    coords: { x: 150, y: 440, width: 130, height: 100 },
    badge: "Trainee Housing",
    iconName: "home"
  },
  {
    id: "06",
    zone: "Zone C · Hospitality",
    category: "Dining & Hospitality",
    name: "Central Dining Pavilion & African Heritage Courtyard",
    shortName: "Dining Pavilion",
    description: "Culinary center serving nutritious Ethiopian gourmet cuisine, continental dishes, and providing a vibrant setting for informal cohort networking.",
    capacity: "350 Guests",
    levels: "Main Banquet Hall & Open Terrace",
    features: [
      "Traditional Ethiopian Coffee Ceremony Terrace",
      "Organic Farm-to-Table Highland Produce",
      "Customized Dietary & Halal Options",
      "Executive Private Dining Salon"
    ],
    specs: [
      { label: "Seating", value: "350 Indoor + 100 Terrace" },
      { label: "Meal Service", value: "Buffet & Plated Service" },
      { label: "Coffee Zone", value: "Fresh Ethiopian Arabica Roastery" },
      { label: "Meal Times", value: "Breakfast 06:30 | Lunch 12:30 | Dinner 19:00" }
    ],
    navigation: "Central campus hub, equidistant between Academic Halls and Residential Blocks.",
    coords: { x: 380, y: 350, width: 120, height: 80 },
    badge: "Culinary & Dining",
    iconName: "coffee"
  },
  {
    id: "07",
    zone: "Zone D · Athletics & Health",
    category: "Recreation & Wellness",
    name: "Sports Pavilion & Pine Forest Running Trails",
    shortName: "Athletic Pavilion",
    description: "Comprehensive health and wellness facilities designed to rejuvenate leaders' physical stamina amidst the invigorating, thin Sululta highland air.",
    capacity: "Full Trainee Body",
    levels: "Indoor Complex & Outdoor Sports Fields",
    features: [
      "Indoor Gymnasium & Strength Training",
      "Floodlit Tennis & Basketball Courts",
      "3.2km Pine Forest Jogging Trail",
      "Future Standard Olympic Swimming Pool"
    ],
    specs: [
      { label: "Indoor Gym", value: "Cardio & Free Weight Zones" },
      { label: "Courts", value: "2 Tennis, 1 Basketball, 1 Futsal" },
      { label: "Trails", value: "3.2km Crushed-Bark Highland Loop" },
      { label: "Staff", value: "Certified Physical Fitness Trainers" }
    ],
    navigation: "South-eastern green perimeter, accessed along the pine tree avenue.",
    coords: { x: 620, y: 390, width: 140, height: 110 },
    badge: "Health & Fitness",
    iconName: "activity"
  },
  {
    id: "08",
    zone: "Zone E · Administration",
    category: "Administration & Protocol",
    name: "Headquarters, Governance & Executive Leadership Suite",
    shortName: "HQ & Governance",
    description: "Administrative nerve center housing the Offices of the President, Vice Presidents, Academic Deans, Institutional Partnership Liaisons, and HR.",
    capacity: "Academy Leadership & Staff",
    levels: "3-Story Administrative Block",
    features: [
      "Executive Council Boardroom",
      "Institutional Partnership Liaison",
      "Faculty & Academic Dean Offices",
      "Procurement & Finance Directorates"
    ],
    specs: [
      { label: "Council Chamber", value: "40-seat Boardroom (Encrypted AV)" },
      { label: "Offices", value: "Presidential & Directorates" },
      { label: "Hours", value: "Monday – Friday, 08:30 – 17:30" },
      { label: "Public Inquiries", value: "info@aflex.gov.et" }
    ],
    navigation: "Adjacent to the main ceremonial entrance drive.",
    coords: { x: 440, y: 70, width: 110, height: 75 },
    badge: "Academy HQ",
    iconName: "briefcase"
  },
  {
    id: "09",
    zone: "Zone E · Security & Arrival",
    category: "Administration & Protocol",
    name: "Main Accreditation Gatehouse & Security Protocol Pavilion",
    shortName: "Accreditation Gate",
    description: "Official entry point for all academy visitors, trainee cohorts, and dignitary convoys. Houses digital badging, credential scanning, and visitor reception.",
    capacity: "Primary Entryway",
    levels: "Single Story Security Pavilion",
    features: [
      "Biometric & RFID Credential Issuance",
      "Automated Vehicle Scanning & Drop-off Bay",
      "Visitor Protocol Reception Lounge",
      "24/7 Rapid Medical & Security Response Station"
    ],
    specs: [
      { label: "Gates", value: "Main Delegation Gate & Service Gate" },
      { label: "Requirements", value: "Government ID / AFLEX Cohort Letter" },
      { label: "Parking", value: "Delegation & Visitor Parking (150 spaces)" },
      { label: "Medical Station", value: "On-site Nurse & Emergency Transport" }
    ],
    navigation: "Sululta Highway entrance portal, 25km from Addis Ababa ring road.",
    coords: { x: 300, y: 30, width: 90, height: 60 },
    badge: "Campus Entry & Security",
    iconName: "check-circle"
  },
  {
    id: "10",
    zone: "Zone A · Heritage & Culture",
    category: "Academic & Training",
    name: "African Heritage Annex & Pan-African Innovation Gallery",
    shortName: "Heritage Annex",
    description: "Cultural and policy exhibition pavilion celebrating African liberation champions, philosophical statecraft traditions, and sustainable development models.",
    capacity: "100 Visitors",
    levels: "Single Story Exhibition Pavilion",
    features: [
      "African Founding Fathers & Mothers Portraiture",
      "Indigenous Governance Systems Exhibits",
      "Interactive Digital Timeline of Pan-Africanism",
      "Diplomatic Gift & Commemorative Gallery"
    ],
    specs: [
      { label: "Exhibits", value: "Rotating Pan-African Leadership Themes" },
      { label: "Curator", value: "Directorate of African Heritage" },
      { label: "Open To", value: "All Trainees, Faculty & Official Guests" },
      { label: "Guided Tours", value: "Scheduled on Opening Cohort Days" }
    ],
    navigation: "East of the Plenary Hall, facing the Grand Flag Court.",
    coords: { x: 550, y: 70, width: 95, height: 70 },
    badge: "Heritage & Policy",
    iconName: "award"
  }
];

export const ARRIVAL_ESSENTIALS: ArrivalEssential[] = [
  {
    number: "01",
    title: "Accreditation & Check-in",
    subtitle: "Security Gatehouse Pavilion",
    description: "Every visitor and trainee must present a valid government-issued photo ID (Passport, National ID, or Diplomatic Card) along with their official AFLEX Admission Letter.",
    actionLabel: "View Protocol Guidelines",
    actionHref: "/contact",
    details: [
      "Badge issuance takes ~3 minutes per attendee at the Gate Pavilion.",
      "RFID credentials grant access to assigned residential blocks and syndicate wings.",
      "Diplomatic escorts must coordinate in advance with the Protocol Office."
    ]
  },
  {
    number: "02",
    title: "Dedicated Campus Shuttles",
    subtitle: "From Bole Airport & Addis Ababa Points",
    description: "AFLEX provides scheduled, comfortable shuttle bus services connecting Addis Ababa's central hubs and Bole International Airport directly to the Sululta campus on opening and graduation days.",
    actionLabel: "Contact Transport Coordinator",
    actionHref: "/contact",
    details: [
      "Bole International Airport (Terminal 2 VIP exit) on cohort arrival dates.",
      "Central Addis Ababa pickup point: Federal Civil Service Commission / Meskel Square.",
      "Transit time: ~45 to 60 minutes depending on highland traffic flow."
    ]
  },
  {
    number: "03",
    title: "Highland Climate & Wardrobe",
    subtitle: "Elevation 2,450m – 2,600m",
    description: "Sululta is positioned significantly higher than Addis Ababa, resulting in brisk morning and evening temperatures (often 8°C – 18°C) with bright midday sun.",
    details: [
      "Academic Sessions: Business formal or formal national attire.",
      "Evenings & Reflection: Warm layers, jackets, or traditional Ethiopian Gabi/Netela recommended.",
      "Athletics: Comfortable sports gear and running shoes for highland trails."
    ]
  },
  {
    number: "04",
    title: "First-Aid, Health & Accessibility",
    subtitle: "24/7 On-Campus Medical Unit",
    description: "The academy maintains a fully-staffed medical station for basic health needs, altitude acclimatization assistance, and emergency stabilization with on-call transport.",
    actionLabel: "Medical Helpdesk: +251 118 931 999",
    actionHref: "tel:+251118931999",
    details: [
      "All major lecture halls and dining facilities feature step-free ramp access.",
      "Dedicated accessibility transport carts available upon request.",
      "Emergency defibrillator & oxygen support stationed at the main clinic."
    ]
  }
];
