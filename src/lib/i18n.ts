export const locales = ["en", "am", "om", "so", "ti", "sw", "ha", "yo"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  am: "አማርኛ",
  om: "Afaan Oromoo",
  so: "Soomaali",
  ti: "ትግርኛ",
  sw: "Kiswahili",
  ha: "Hausa",
  yo: "Yorùbá"
};

export interface LocaleCopy {
  nav: string[];
  utility: string[];
  home: {
    eyebrow: string;
    title: string;
    accent: string;
    lead: string;
    explore: string;
    apply: string;
    programs: string;
    programsTitle: string;
    programsCopy: string;
    campus: string;
    campusTitle: string;
    campusCopy: string;
    voices: string;
    voicesTitle: string;
    close: string;
    closeTitle: string;
  };
  about: {
    crumb: string;
    title: string;
    intro: string;
    message: string;
    story: string;
    storyTitle: string;
    vision: string;
    mission: string;
    values: string;
    pillars: string;
    governance: string;
    team: string;
  };
  programs: {
    eyebrow: string;
    title: string;
    lead: string;
    offerEyebrow: string;
    offerTitle: string;
    offerCopy: string;
    apply: string;
    catalog: string;
    consult: string;
    pedagogyEyebrow: string;
    pedagogyTitle: string;
    pedagogyLead: string;
  };
  news: {
    eyebrow: string;
    title: string;
    lead: string;
    all: string;
    viewAll: string;
    readMore: string;
    featured: string;
    dispatches: string;
  };
  campus: {
    eyebrow: string;
    title: string;
    lead: string;
    locationLabel: string;
    locationValue: string;
    elevationLabel: string;
    elevationValue: string;
    coordinatesLabel: string;
    directions: string;
    printMap: string;
  };
}

export const copy: Record<Locale, LocaleCopy> = {
  en: {
    nav: ["Home", "About AFLEX", "Programs", "News & Events", "Media", "Contact"],
    utility: ["Online Learning", "Library", "FAQ", "Campus Locator", "Vacancies"],
    home: {
      eyebrow: "AFRICAN LEADERSHIP EXCELLENCE ACADEMY · AFLEX",
      title: "Where African",
      accent: "leadership is refined.",
      lead: "A premier academy for Africa's public, private, and civic leaders, grounded in rigorous learning and reflection at our Sululta campus.",
      explore: "Explore programs",
      apply: "Apply for training",
      programs: "THE ACADEMY",
      programsTitle: "Three paths to leadership excellence.",
      programsCopy: "Learning designed for people carrying the weight of public decisions.",
      campus: "WHY SULULTA",
      campusTitle: "Sululta is the future for Africa's solutions.",
      campusCopy: "From leadership and governance to energy, trade, and continental diplomacy — Sululta is where Africa shapes answers that work in every aspect of public life.",
      voices: "VOICES OF THE ACADEMY",
      voicesTitle: "Leadership is a practice we share.",
      close: "BEGIN HERE",
      closeTitle: "The next chapter needs leaders."
    },
    about: {
      crumb: "ABOUT AFLEX",
      title: "About AFLEX.",
      intro: "We are a federal academy for the people entrusted with Africa's most consequential decisions.",
      message: "Shaping the future leaders of Africa",
      story: "OUR STORY",
      storyTitle: "A young institution with a long memory.",
      vision: "VISION",
      mission: "MISSION",
      values: "WHAT GUIDES US",
      pillars: "THE THREE PILLARS",
      governance: "GOVERNANCE",
      team: "People entrusted with the work."
    },
    programs: {
      eyebrow: "ACADEMY PROGRAMS",
      title: "Programs & Research.",
      lead: "Leadership development, Project WILD, PSLE, and Pan-Africanism policy research at AFLEX Academy.",
      offerEyebrow: "THE OFFER",
      offerTitle: "Learning for the moment we are in.",
      offerCopy: "AFLEX is committed to changing the organizational and leadership culture of our continent. Through engaging curricula—classroom, eLearning, and immersive technology—leaders expand strategic thinking and business acumen.",
      apply: "Inquire / Apply",
      catalog: "View Training Catalog",
      consult: "Consult with Faculty",
      pedagogyEyebrow: "HOW WE TEACH · THE METHOD",
      pedagogyTitle: "Training built for self-authorship.",
      pedagogyLead: "Programs emphasize longitudinal learning and capacity for reflection—delivered through in-person, e-learning, and digital modalities grounded in adult learning methodology."
    },
    news: {
      eyebrow: "LATEST UPDATES",
      title: "Academy News & Dispatches.",
      lead: "Strategic perspectives, institutional announcements, and dispatches from Sululta.",
      all: "ALL",
      viewAll: "View all updates",
      readMore: "Read more",
      featured: "Featured",
      dispatches: "Insights from the Academy."
    },
    campus: {
      eyebrow: "WAYFINDING & FACILITIES",
      title: "Sululta Highland Campus.",
      lead: "A comprehensive interactive wayfinding guide to the facilities, plenary halls, executive residences, and arrival logistics of AFLEX.",
      locationLabel: "LOCATION:",
      locationValue: "Sululta, Oromia (~25km North of Addis Ababa)",
      elevationLabel: "ELEVATION:",
      elevationValue: "2,450m – 2,600m ASL",
      coordinatesLabel: "COORDINATES:",
      directions: "Get Directions",
      printMap: "Print Map / Blueprint"
    }
  },

  am: {
    nav: ["መነሻ", "ስለ AFLEX", "ፕሮግራሞች", "ዜና እና ዝግጅቶች", "ጋለሪ", "ያግኙን"],
    utility: ["የመስመር ላይ ትምህርት", "ቤተ መጻሕፍት", "FAQ", "የካምፓስ ካርታ", "ቦታዎች"],
    home: {
      eyebrow: "የአፍሪካ የአመራር ልህቀት አካዳሚ · AFLEX",
      title: "የአፍሪካ",
      accent: "አመራርን ማጎልበት።",
      lead: "ለአፍሪካ የህዝብ፣ የግል እና የሲቪክ መሪዎች የተቋቋመ የአመራር አካዳሚ። በሱሉልታ ካምፓስ ጥልቅ ትምህርትና ምልከታ ይሰጣል።",
      explore: "ፕሮግራሞችን ይመልከቱ",
      apply: "ለስልጠና ያመልክቱ",
      programs: "አካዳሚው",
      programsTitle: "ለአመራር ልቀት ሶስት መንገዶች።",
      programsCopy: "ለህዝብ ውሳኔዎች ኃላፊነት ለሚሸከሙ ሰዎች የተዘጋጀ ትምህርት።",
      campus: "ለምን ሱሉልታ",
      campusTitle: "ለማሰብ ሰፊ ቦታ ያለው ካምፓስ።",
      campusCopy: "በሱሉልታ ደጋማ ጸጥታ፣ አካዳሚው ለትምህርትና ለምልከታ ተስማሚ ቦታ ይሰጣል። ከአመራር እና አስተዳደር እስከ ኢነርጂና አህጉራዊ ዲፕሎማሲ።",
      voices: "የአካዳሚው ድምጾች",
      voicesTitle: "አመራር አብረን የምንለማመደው ስራ ነው።",
      close: "ከዚህ ይጀምሩ",
      closeTitle: "ቀጣዩ ምዕራፍ መሪዎችን ይፈልጋል።"
    },
    about: {
      crumb: "ስለ AFLEX",
      title: "ስለ AFLEX።",
      intro: "ለአፍሪካ ወሳኝ ውሳኔዎች ኃላፊነት ለሚሸከሙ ሰዎች የተቋቋመ ፌዴራል አካዳሚ ነን።",
      message: "የአመራር ስራ ለምናገለግላቸው ሰዎች የሚቻለውን ማስፋት ነው።",
      story: "ታሪካችን",
      storyTitle: "ወጣት ተቋም፣ ረጅም ትውስታ።",
      vision: "ራዕይ",
      mission: "ተልዕኮ",
      values: "የሚመሩን እሴቶች",
      pillars: "ሶስቱ መሰረቶች",
      governance: "አስተዳደር",
      team: "ስራውን የተረከቡ ሰዎች።"
    },
    programs: {
      eyebrow: "የስልጠና ፕሮግራሞች",
      title: "የአመራር ልቀት ፕሮግራሞች እና ጥናት።",
      lead: "የአመራር ልማት ስልጠና፣ ፕሮጀክት ዋይልድ (WILD)፣ የህዝብ አገልግሎት አመራር እና የፓን-አፍሪካኒዝም ፖሊሲ ጥናት።",
      offerEyebrow: "የአካዳሚው ስልጠናዎች",
      offerTitle: "ለወቅቱ ጥያቄ የሚመጥን የአመራር ስልጠና።",
      offerCopy: "AFLEX የአህጉራችንን የተቋማትና የአመራር ባህል ለመለወጥ ቁርጠኛ ነው። በመማሪያ ክፍል፣ በኢ-ትምህርት እና በዘመናዊ ቴክኖሎጂዎች መሪዎች ስትራቴጂካዊ አስተሳሰብን ያጎለብታሉ።",
      apply: "ያመልክቱ / ይመዝገቡ",
      catalog: "የስልጠና ካታሎግ ይመልከቱ",
      consult: "ከአካዳሚው ባለሙያዎች ጋር ይወያዩ",
      pedagogyEyebrow: "የማስተማር ፍልስፍናችን",
      pedagogyTitle: "ለራስ-ተነሳሽነት እና ተግባራዊ አመራር የተገነባ ስልጠና።",
      pedagogyLead: "ስልጠናዎቻችን በረጅም ጊዜ ልማት እና ራስን በማየት ላይ ያተኩራሉ—በአካል፣ በኦንላይን እና በዲጂታል አማራጮች የሚሰጡ።"
    },
    news: {
      eyebrow: "የቅርብ ጊዜ መረጃዎች",
      title: "የአካዳሚው ዜና እና መረጃዎች።",
      lead: "ስትራቴጂካዊ እይታዎች፣ የተቋም ማስታወቂያዎች እና የሱሉልታ ካምፓስ ሁነቶች።",
      all: "ሁሉም",
      viewAll: "ሁሉንም መረጃዎች ይመልከቱ",
      readMore: "ሙሉውን ያንብቡ",
      featured: "ዋና ዜና",
      dispatches: "ከአካዳሚው የተገኙ ግንዛቤዎች።"
    },
    campus: {
      eyebrow: "የካምፓስ መመሪያ እና አገልግሎቶች",
      title: "የሱሉልታ ደጋማ ካምፓስ።",
      lead: "የAFLEX ዋና ካምፓስ፣ አዳራሾች፣ የመኖሪያ ቪላዎች እና የጉዞ መረጃዎች አጠቃላይ መመሪያ።",
      locationLabel: "ቦታ፡",
      locationValue: "ሱሉልታ፣ ኦሮሚያ (ከአዲስ አበባ በስተሰሜን ~25 ኪ.ሜ)",
      elevationLabel: "ከፍታ፡",
      elevationValue: "2,450ሜ – 2,600ሜ ከባህር ጠለል በላይ",
      coordinatesLabel: "መጋጠሚያዎች፡",
      directions: "አቅጣጫ አሳይ",
      printMap: "ካርታውን አትም"
    }
  },

  om: {
    nav: ["Fuula Jalqabaa", "Waa'ee AFLEX", "Sagantaalee", "Oduu fi Taateewwan", "Gaalarii", "Nu Qunnamaa"],
    utility: ["Barnoota Sarara", "Mana Kitaabaa", "FAQ", "Kaampaasii", "Carraawwan Hojii"],
    home: {
      eyebrow: "AKKAADAAMII OLAANUMMAA HOGGANSAA AFRIKAA · AFLEX",
      title: "Bakka hoggansi",
      accent: "Afrikaa itti qophaa'u.",
      lead: "Akkaadaamii hoggansa uummataa, dhuunfaa fi siiviikii Afrikaa, barumsa cimaa fi xiinxala Kaampaasii Sulultaa irratti hundaa'e.",
      explore: "Sagantaalee ilaali",
      apply: "Leenjii irratti galmaa'i",
      programs: "AKKAADAAMII",
      programsTitle: "Daandii sadii gara dandeettii hoggansaatti.",
      programsCopy: "Barumsa namoota murtii uummataa baatanif qophaa'e.",
      campus: "MAALIIF SULULTA",
      campusTitle: "Kaampaasii yaaduuf iddoo qabu.",
      campusCopy: "Tasgabbii gaara Sulultaa keessatti, akkaadaamiin barumsaaf naannoo mijataa kenna. Hoggansa irraa kaasee hanga dippilomaasii ardii.",
      voices: "SAGALEE AKKAADAAMII",
      voicesTitle: "Hoggansi hojii waliin shaakalluudha.",
      close: "ASIRAA JALQABI",
      closeTitle: "Boqonnaan itti aanu hoggantoota barbaada."
    },
    about: {
      crumb: "WAA'EE AFLEX",
      title: "Waa'ee AFLEX.",
      intro: "Namoota murtiiwwan Afrikaa murteessoo ta'an itti gaafatamummaa qabanif akkaadaamii federaalaa ti.",
      message: "Hojii hoggansaa waan namoota tajaajilluuf danda'amu bal'isuudha.",
      story: "SEENAA KEENYA",
      storyTitle: "Dhaabbata dargaggoo, yaadannoo dheeraa qabu.",
      vision: "MUL'ATA",
      mission: "ERGAMA",
      values: "GATIIWWAN NU QAJELCHAN",
      pillars: "UTUBAWWAN SADAN",
      governance: "BULCHIINSA",
      team: "Namoota hojii kana itti gaafatamummaa qaban."
    },
    programs: {
      eyebrow: "SAGANTAALEE AKKAADAAMII",
      title: "Sagantaalee fi Qorannoo Hoggansaa.",
      lead: "Guddina hoggansaa, Pirojektii WILD, PSLE fi qorannoo imaammata Paan-Afrikaanizimii AFLEX keessatti.",
      offerEyebrow: "KENNAA AKKAADAAMII",
      offerTitle: "Barumsa yeroon amma barbaadu.",
      offerCopy: "AFLEX aadaa hoggansaa fi ijaarsa dhaabbilee ardii keenyaa jijjiiruuf kutannoodhaan hojjeta. Kilaasii, e-learning fi teeknooloojiidhaan yaada tarsiimawaa babal'isa.",
      apply: "Iyyadhaa / Galmaa'aa",
      catalog: "Kataloogii Leenjii Ilaalaa",
      consult: "Barsiisota waliin mari'adhaa",
      pedagogyEyebrow: "AKKAATAA NUTI BARSIISNU",
      pedagogyTitle: "Leenjii of-danda'uu fi jijjiiramaaf ijaarame.",
      pedagogyLead: "Sagantaaleen keenya barumsa yeroo dheeraa fi dandeettii xiinxalaarratti xiyyeeffatu—kallattiin, sararaan fi teeknooloojiin kennamu."
    },
    news: {
      eyebrow: "ODUUWWAN HAARAA",
      title: "Oduu fi Ibsa Akkaadaamii.",
      lead: "Ilaalcha tarsiimawaa, beeksisawwan dhaabbataa fi gabaasawwan Kaampaasii Sulultaa.",
      all: "HUNDA",
      viewAll: "Oduu hunda ilaali",
      readMore: "Dabalataan dubbisaa",
      featured: "Oduu Ijoo",
      dispatches: "Hubannoowwan Akkaadaamii irraa."
    },
    campus: {
      eyebrow: "QAJEELCHA KAAMPAASII",
      title: "Kaampaasii Sulultaa.",
      lead: "Qajeelcha kaampaasii AFLEX, galmawwan walga'ii, manneen bultii hoggantootaa fi geejjiba.",
      locationLabel: "BAKKA:",
      locationValue: "Sululta, Oromiyaa (Finfinnee irraa Kaabaan ~25km)",
      elevationLabel: "OLKA'IINSA:",
      elevationValue: "2,450m – 2,600m baha galaanaa irraa",
      coordinatesLabel: "KOORDINATOOTA:",
      directions: "Kallattii Agarsiisi",
      printMap: "Kaartaa Maxxansaa"
    }
  },

  so: {
    nav: ["Bogga Hore", "Ku Saabsan AFLEX", "Barnaamijyada", "Wararka iyo Dhacdooyinka", "Media", "Nala Soo Xiriir"],
    utility: ["Waxbarashada Online-ka", "Maktabadda", "FAQ", "Khariidadda Xarunta", "Shaqooyin"],
    home: {
      eyebrow: "AKADEMIGA HAGAAGGA HOGAAMINTA AFRIKA · AFLEX",
      title: "Halka hoggaanka Afrika",
      accent: "lagu kobciyo.",
      lead: "Akadeemiyad heer sare ah oo loogu talagalay hoggaamiyeyaasha Afrika, kuna dhisan waxbarasho iyo milicsi xarunta Sululta.",
      explore: "Eeg barnaamijyada",
      apply: "Codso tababarka",
      programs: "AKADEEMIYADDA",
      programsTitle: "Saddex waddo oo heer sare hoggaamineed.",
      programsCopy: "Waxbarasho loogu talagalay dadka qaada masuuliyadda go'aannada dadweynaha.",
      campus: "MAXAA SULULTA",
      campusTitle: "Xarun aad ku fikirto.",
      campusCopy: "Degganaanshaha buuraha Sululta wuxuu bixiyaa jawi ku habboon waxbarasho iyo fikir.",
      voices: "CODADKA AKADEEMIYADDA",
      voicesTitle: "Hoggaanku waa dhaqan aan wadaagno.",
      close: "HALKAN KA BILOW",
      closeTitle: "Cutubka xiga wuxuu u baahan yahay hoggaamiyeyaal."
    },
    about: {
      crumb: "KU SAABSAN AFLEX",
      title: "Ku saabsan AFLEX.",
      intro: "Waxaan nahay akadeemiyad federaal ah oo loogu talagalay dadka masuulka ka ah go'aamada ugu muhiimsan Afrika.",
      message: "Shaqada hoggaanku waa in la ballaariyo waxa u suurtogala dadka aan u adeegno.",
      story: "TAARIIKHDEENNA",
      storyTitle: "Hay'ad yar oo leh xusuus dheer.",
      vision: "ARAGTI",
      mission: "HIMILO",
      values: "QIIMAYAASHA NA HAGAYA",
      pillars: "SADDEXDA TIIR",
      governance: "MAAMUL",
      team: "Dadka loo igmaday shaqada."
    },
    programs: {
      eyebrow: "BARNAAMIJYADA AKADEEMIYADDA",
      title: "Barnaamijyada & Cilmi-baarista.",
      lead: "Hoggaan-horumarinta, Mashruuca WILD, PSLE iyo cilmi-baarista siyaasadda ee AFLEX.",
      offerEyebrow: "WAXA AAN BIXINNO",
      offerTitle: "Waxbarasho ku habboon xilligan.",
      offerCopy: "AFLEX waxaa ka go'an in ay beddesho dhaqanka hay'adaha iyo hoggaanka qaaraddayada.",
      apply: "Codso / Isdiiwaangeli",
      catalog: "Eeg Buug-yaraha Tababarka",
      consult: "La tasho Macallimiinta",
      pedagogyEyebrow: "SIDA AAN WAX U BARNO",
      pedagogyTitle: "Tababar loogu talagalay is-maamul.",
      pedagogyLead: "Barnaamijyadu waxay xoojiyaan barashada joogtada ah iyo awoodda milicsiga."
    },
    news: {
      eyebrow: "WARARKII UGU DAMBEEYAY",
      title: "Wararka Akadeemiyadda & Fariimaha.",
      lead: "Aragtiyo istiraatiiji ah iyo ogeysiisyada xarunta Sululta.",
      all: "DHAMAAN",
      viewAll: "Eeg dhammaan wararka",
      readMore: "Faahfaahin dheeraad ah",
      featured: "Muuqaalka Sare",
      dispatches: "Aragtiyaha Akadeemiyadda."
    },
    campus: {
      eyebrow: "HAGIDDA XARUNTA",
      title: "Xarunta Buuraleyda Sululta.",
      lead: "Hagaha xarumaha, hoolalka shirarka, iyo deegaanka xarunta AFLEX.",
      locationLabel: "GOOBTA:",
      locationValue: "Sululta, Oromia (~25km Waqooyiga Addis Ababa)",
      elevationLabel: "HEERKA BUURTA:",
      elevationValue: "2,450m – 2,600m heerkul badda ka sarreeya",
      coordinatesLabel: "ISKU-DUWNAANTA:",
      directions: "Hel Tilmaamaha",
      printMap: "Daabac Khariidadda"
    }
  },

  ti: {
    nav: ["መበገሲ ገጽ", "ብዛዕባ AFLEX", "መደባት", "ዜናን ፍጻመታትን", "ጋለሪ", "ርኸቡና"],
    utility: ["ኦንላይን ትምህርቲ", "ቤተ መጻሕፍቲ", "FAQ", "ካምፓስ", "ስራታት"],
    home: {
      eyebrow: "ኣካዳሚ ልዑላውነት መራሕነት ኣፍሪቃ · AFLEX",
      title: "ኣብ ዝተሓደሰሉ",
      accent: "ኣመራር ኣፍሪቃ።",
      lead: "ንህዝባዊ፣ ንግልን ሲቪክን መራሕቲ ኣፍሪቃ ዝተዳለወ ኣካዳሚ።",
      explore: "መደባት ርአ",
      apply: "ንስልጠና ኣመልክት",
      programs: "ኣካዳሚ",
      programsTitle: "ሰለስተ መንገድታት ናብ ልቀት ኣመራር።",
      programsCopy: "ንህዝባዊ ውሳነታት ሓላፍነት ዝስከሙ ሰባት ዝተዳለወ ትምህርቲ።",
      campus: "ስለምንታይ ሱሉልታ",
      campusTitle: "ንምሕሳብ ቦታ ዘለዎ ካምፓስ።",
      campusCopy: "ኣብ ልዑል ቦታ ሱሉልታ ንትምህርትን ንምስትንታንን ምቹእ ቦታ ኣሎ።",
      voices: "ድምጺ ኣካዳሚ",
      voicesTitle: "ኣመራር ብሓባር እንለማመዶ ስራሕ እዩ።",
      close: "ኣብዚ ጀምር",
      closeTitle: "ዝመጽእ ምዕራፍ መራሕቲ ይደሊ።"
    },
    about: {
      crumb: "ብዛዕባ AFLEX",
      title: "ብዛዕባ AFLEX።",
      intro: "ንወሳኒ ውሳነታት ኣፍሪቃ ሓላፍነት ንዝስከሙ ሰባት ዝተመስረተ ፌደራላዊ ኣካዳሚ ኢና።",
      message: "ስራሕ ኣመራር ነቲ ንህዝቢ እንገብሮ ዝከኣል ምስፋሕ እዩ።",
      story: "ታሪኽና",
      storyTitle: "ሓድሽ ትካል፣ ነዊሕ ዝኽሪ።",
      vision: "ራእይ",
      mission: "ተልእኾ",
      values: "እሴታትና",
      pillars: "ሰለስተ ምሰሶታት",
      governance: "ምሕደራ",
      team: "ነዚ ስራሕ ዝተወከሉ ሰባት።"
    },
    programs: {
      eyebrow: "መደባት ስልጠና",
      title: "መደባት ልቀት ኣመራርሓን ምርምርን።",
      lead: "ስልጠና ኣመራርሓ፣ ፕሮጀክት ዋይልድ (WILD)፣ ኣገልግሎት ህዝብን ምርምር ፖሊሲን።",
      offerEyebrow: "ናይ ኣካዳሚና ስልጠናታት",
      offerTitle: "ንናይ ሕጂ እዋን ዝምጥን ስልጠና።",
      offerCopy: "AFLEX ባህሊ ኣመራርሓ ኣህጉርና ንምቕያር ዝተበገሰ እዩ።",
      apply: "ኣመልክት / ተመዝገብ",
      catalog: "ካታሎግ ስልጠናታት ርአ",
      consult: "ምስ መማህራን ተማኸር",
      pedagogyEyebrow: "ኣገባብ ኣመሃህራና",
      pedagogyTitle: "ንተግባራዊ ኣመራርሓ ዝተዳለወ ስልጠና።",
      pedagogyLead: "ስልጠናታትና ኣብ ቀጻሊ ምዕባለን ምስትንታንን ዘተኮሩ እዮም።"
    },
    news: {
      eyebrow: "ሓደሽቲ ዜናታት",
      title: "ዜናታትን ሓበሬታታትን ኣካዳሚ።",
      lead: "ስትራተጅያዊ ርእይቶታትን መግለጺታትን ካብ ካምፓስ ሱሉልታ።",
      all: "ኩሉ",
      viewAll: "ኩሉ ሓበሬታ ርአ",
      readMore: "ተወሳኺ ኣንብብ",
      featured: "ቀንዲ ዜና",
      dispatches: "ካብ ኣካዳሚ ዝወጹ ሓሳባት።"
    },
    campus: {
      eyebrow: "ካርታን መምርሕን ካምፓስ",
      title: "ካምፓስ ደጋ ሱሉልታ።",
      lead: "መደላድላት፣ ኣዳራሻት፣ ናይ መኖሪ ቪላታትን መምርሒ መገዲ ሱሉልታን።",
      locationLabel: "ቦታ፡",
      locationValue: "ሱሉልታ፣ ኦሮሚያ (ካብ ኣዲስ ኣበባ ~25 ኪ.ሜ)",
      elevationLabel: "ቁመት፡",
      elevationValue: "2,450ሜ – 2,600ሜ ልዕሊ ጽፍሒ ባሕሪ",
      coordinatesLabel: "መተሓላለፊታት፡",
      directions: "ኣንፈት ርኸብ",
      printMap: "ካርታ ኣሕትም"
    }
  },

  sw: {
    nav: ["Mwanzo", "Kuhusu AFLEX", "Programu", "Habari na Matukio", "Matunzio", "Wasiliana Nasi"],
    utility: ["Mafunzo Mtandaoni", "Maktaba", "FAQ", "Ramani ya Kampasi", "Nafasi za Kazi"],
    home: {
      eyebrow: "CHUO CHA UBORA WA UONGOZI WA AFRIKA · AFLEX",
      title: "Ambapo uongozi wa Afrika",
      accent: "unakomazwa.",
      lead: "Chuo cha kiwango cha juu kwa viongozi wa umma, binafsi na kiraia wa Afrika, katika mazingira ya kujifunza na kutafakari katika kampasi yetu ya Sululta.",
      explore: "Gundua programu",
      apply: "Omba mafunzo",
      programs: "CHUO",
      programsTitle: "Njia tatu za ubora wa uongozi.",
      programsCopy: "Mafunzo yaliyoundwa kwa watu wanaobeba maamuzi ya umma.",
      campus: "KWA NINI SULULTA",
      campusTitle: "Kampasi yenye nafasi ya kufikiri.",
      campusCopy: "Utulivu wa nyanda za juu za Sululta hutoa mazingira bora kwa kujifunza na tafakari.",
      voices: "SAUTI ZA CHUO",
      voicesTitle: "Uongozi ni mazoezi tunayoshiriki.",
      close: "ANZA HAPA",
      closeTitle: "Sura inayofuata inahitaji viongozi."
    },
    about: {
      crumb: "KUHUSU AFLEX",
      title: "Kuhusu AFLEX.",
      intro: "Sisi ni chuo cha shirikisho kwa watu waliopewa jukumu la maamuzi muhimu zaidi ya Afrika.",
      message: "Kazi ya uongozi ni kupanua kile kinachowezekana kwa watu tunaowahudumia.",
      story: "HISTORIA YETU",
      storyTitle: "Taasisi changa yenye kumbukumbu ndefu.",
      vision: "DIRA",
      mission: "DHAMIRA",
      values: "MISINGI YETU",
      pillars: "NGUZO TATU",
      governance: "UTAWALA",
      team: "Watu walioaminiwa kazi hii."
    },
    programs: {
      eyebrow: "PROGRAMU ZA CHUO",
      title: "Programu & Utafiti.",
      lead: "Maendeleo ya uongozi, Mradi wa WILD, PSLE na utafiti wa sera za Pan-Africanism katika AFLEX.",
      offerEyebrow: "OFISI YETU",
      offerTitle: "Mafunzo kwa wakati tulionao.",
      offerCopy: "AFLEX imejitolea kubadilisha utamaduni wa uongozi wa bara letu kupitia mitaala bora.",
      apply: "Uliza / Omba Nafasi",
      catalog: "Tazama Katalogi ya Mafunzo",
      consult: "Wasiliana na Wahadhiri",
      pedagogyEyebrow: "JINSI TUNAVYOFUNDISHA",
      pedagogyTitle: "Mafunzo ya uongozi wa vitendo.",
      pedagogyLead: "Programu zetu zinatilia mkazo kujifunza kwa kina na uwezo wa kutafakari."
    },
    news: {
      eyebrow: "HABARI MPYA",
      title: "Habari za Chuo na Matangazo.",
      lead: "Mitazamo ya kimkakati na matangazo kutoka kampasi ya Sululta.",
      all: "ZOTE",
      viewAll: "Tazama habari zote",
      readMore: "Soma zaidi",
      featured: "Habari Kuu",
      dispatches: "Maarifa kutoka Chuoni."
    },
    campus: {
      eyebrow: "MWONGOZO WA KAMPASI",
      title: "Kampasi ya Nyanda za Juu ya Sululta.",
      lead: "Mwongozo shirikishi wa kumbi za mikutano, makazi ya viongozi, na usafiri wa kufika AFLEX.",
      locationLabel: "MAHALI:",
      locationValue: "Sululta, Oromia (~km 25 Kaskazini mwa Addis Ababa)",
      elevationLabel: "KIMO:",
      elevationValue: "Mita 2,450 – 2,600 juu ya usawa wa bahari",
      coordinatesLabel: "VIRATIBU:",
      directions: "Pata Maelekezo",
      printMap: "Chapa Ramani"
    }
  },

  ha: {
    nav: ["Gida", "Game da AFLEX", "Shirye-shirye", "Labarai da Abubuwan da suka faru", "Gidan Hoto", "Tuntube Mu"],
    utility: ["Koyon Kan Layi", "Dakin Karatu", "FAQ", "Taswirar Harabar", "Ayyuka"],
    home: {
      eyebrow: "KWALEJIN FIFIKON SHUGABANCI NA AFIRKA · AFLEX",
      title: "Inda jagorancin Afirka",
      accent: "ake inganta.",
      lead: "Cibiyar kwarewa ga shugabannin jama'a, masu zaman kansu da na al'umma na Afirka a harabar Sululta.",
      explore: "Duba shirye-shirye",
      apply: "Nemi horo",
      programs: "CIBIYAR",
      programsTitle: "Hanyoyi uku zuwa kwarewar jagoranci.",
      programsCopy: "Koyo ga mutanen da ke dauke da nauyin yanke shawarar jama'a.",
      campus: "ME YA SA SULULTA",
      campusTitle: "Harabar da ke ba da damar tunani.",
      campusCopy: "Natsuwar tsaunukan Sululta na samar da yanayi mai kyau don koyo da tunani.",
      voices: "MURYAR CIBIYA",
      voicesTitle: "Jagoranci aiki ne da muke yi tare.",
      close: "FARA A NAN",
      closeTitle: "Babi na gaba na bukatar shugabanni."
    },
    about: {
      crumb: "GAME DA AFLEX",
      title: "Game da AFLEX.",
      intro: "Mu cibiyar tarayya ce ga mutanen da aka damka wa manyan shawarwarin Afirka.",
      message: "Aikin jagoranci shi ne fadada abin da zai yiwu ga mutanen da muke yi wa hidima.",
      story: "TARIHINMU",
      storyTitle: "Cibiya matashiya mai dogon tarihi.",
      vision: "HANGEN NESA",
      mission: "MANUFA",
      values: "ABIN DA KE JAGORANTAR MU",
      pillars: "GINSHIKAI UKU",
      governance: "MULKI",
      team: "Mutanen da aka damka wa wannan aiki."
    },
    programs: {
      eyebrow: "SHIRYE-SHIRYEN CIBIYA",
      title: "Shirye-shirye & Bincike.",
      lead: "Kwarewar jagoranci, Aikin WILD, PSLE da binciken manufofin Pan-Africanism.",
      offerEyebrow: "ABIN DA MUKE BAYARWA",
      offerTitle: "Koyo don wannan lokaci.",
      offerCopy: "AFLEX ta kuduri aniyar canza al'adun shugabanci a nahiyarmu ta hanyar manhajoji na musamman.",
      apply: "Nemi / Yi Rajista",
      catalog: "Duba Kundin Horarwa",
      consult: "Tattauna da Masana",
      pedagogyEyebrow: "HANYAR KOYARWA",
      pedagogyTitle: "Horarwa don jagorancin gaskiya.",
      pedagogyLead: "Shirye-shiryenmu suna jaddada ci gaba mai dorewa da nazari mai zurfi."
    },
    news: {
      eyebrow: "SABABBIN LABARAI",
      title: "Labaran Cibiya & Sanarwa.",
      lead: "Mahimman ra'ayoyi da sanarwa daga harabar Sululta.",
      all: "DUKA",
      viewAll: "Duba dukkan labarai",
      readMore: "Kara karantawa",
      featured: "Babban Labari",
      dispatches: "Hikimomin Cibiyar."
    },
    campus: {
      eyebrow: "JAGORAN HARABA",
      title: "Harabar Tsaunukan Sululta.",
      lead: "Cikakken jagora kan wuraren taro, masaukan shugabanni da hanyoyin shiga AFLEX.",
      locationLabel: "WURI:",
      locationValue: "Sululta, Oromia (~km 25 Arewa da Addis Ababa)",
      elevationLabel: "TSAWON DAGA TEKU:",
      elevationValue: "Mita 2,450 – 2,600 saman teku",
      coordinatesLabel: "GURARE:",
      directions: "Nemi Hanyar Zuwa",
      printMap: "Buga Taswira"
    }
  },

  yo: {
    nav: ["Ile", "Nipa AFLEX", "Awọn Eto", "Awọn Iroyin ati Awọn Iṣẹlẹ", "Àwòrán", "Kan si Wa"],
    utility: ["Ẹkọ lori Ayelujara", "Ile-ikawe", "FAQ", "Maapu Ile-ẹkọ", "Awọn Iṣẹ"],
    home: {
      eyebrow: "ILÉ-Ẹ̀KỌ́ GÍGA TI ÌDARÍ Ẹ̀KỌ́ AFIRIKA · AFLEX",
      title: "Ibi ti a ti n ṣe atunṣe",
      accent: "olori Afirika.",
      lead: "Ile-ẹkọ giga fun awọn olori ilu, aladani ati awujọ Afirika ni Sululta.",
      explore: "Wo awọn eto",
      apply: "Beere fun ikẹkọ",
      programs: "ILE ẸKỌ",
      programsTitle: "Awọn ọna mẹta si didara olori.",
      programsCopy: "Ẹkọ ti a ṣe fun awọn ti o gbe ẹrù ipinnu gbogbo eniyan.",
      campus: "IDI SULULTA",
      campusTitle: "Ile-ẹkọ ti o ni aye lati ronu.",
      campusCopy: "Idakẹjẹ awọn oke Sululta n pese ayika to dara fun ẹkọ ati ironu.",
      voices: "OHÙN ILE ẸKỌ",
      voicesTitle: "Olori jẹ iṣe ti a pin papọ.",
      close: "BẸ̀RẸ̀ NÍBÍ",
      closeTitle: "Abala to n bọ nilo awọn olori."
    },
    about: {
      crumb: "NIPA AFLEX",
      title: "Nipa AFLEX.",
      intro: "A jẹ ile-ẹkọ ijọba fun awọn eniyan ti a fi awọn ipinnu pataki Afirika le lọwọ.",
      message: "Iṣẹ olori ni lati faagun ohun ti o ṣee ṣe fun awọn eniyan ti a n sin.",
      story: "ITAN WA",
      storyTitle: "Ile-ẹkọ tuntun pẹlu iranti gigun.",
      vision: "ÌRÍ",
      mission: "ÀṢẸ",
      values: "OHUN TI O N DARÍ WA",
      pillars: "ÀWỌN Ọ̀WỌ̀N MÉTA",
      governance: "ÌṢÀKÓSO",
      team: "Awọn eniyan ti a fi iṣẹ naa le lọwọ."
    },
    programs: {
      eyebrow: "AWỌN ETO ILE-ẸKỌ",
      title: "Awọn Eto & Iwadi Olori.",
      lead: "Idagbasoke olori, Project WILD, PSLE ati iwadii imulo Pan-Africanism ni AFLEX.",
      offerEyebrow: "Ẹ̀BÙN WA",
      offerTitle: "Ẹkọ fun akoko ti a wa.",
      offerCopy: "AFLEX ti pinnu lati yi aṣa olori ti ilẹ Afirika pada pẹlu awọn eto ikẹkọ pataki.",
      apply: "Beere / Forukọsilẹ",
      catalog: "Wo Iwe Eto Ikẹkọ",
      consult: "Ba Awọn Olukọ Sọrọ",
      pedagogyEyebrow: "BÍ A ṢE N KỌ́NI",
      pedagogyTitle: "Ikẹkọ ti a ṣe fun aṣeyọri gidi.",
      pedagogyLead: "Awọn eto wa tẹnumọ ẹkọ ti o jinlẹ ati agbara lati ronu jinlẹ."
    },
    news: {
      eyebrow: "AWỌN IROYIN TUNTUN",
      title: "Awọn Iroyin Ile-ẹkọ & Awọn Ikede.",
      lead: "Awọn iwoye ilana ati awọn ikede lati ogba Sululta.",
      all: "GBOGBO",
      viewAll: "Wo gbogbo iroyin",
      readMore: "Ka siwaju",
      featured: "Iroyin Pataki",
      dispatches: "Awọn oye lati Ile-ẹkọ."
    },
    campus: {
      eyebrow: "ITỌSỌNA OGBA",
      title: "Ogba Sululta Highland.",
      lead: "Itọsọna ibaraenisepo si awọn gbongan ipade, awọn ibugbe adari, ati gbigbe si AFLEX.",
      locationLabel: "IBI:",
      locationValue: "Sululta, Oromia (~25km Ariwa ti Addis Ababa)",
      elevationLabel: "GIGA LORI OMI:",
      elevationValue: "2,450m – 2,600m loke ipele okun",
      coordinatesLabel: "AWỌN IṢẸPỌ:",
      directions: "Gba Awọn Itọsọna",
      printMap: "Tẹ Maapu Jade"
    }
  }
};

export function getLocale(value?: string): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : "en";
}
