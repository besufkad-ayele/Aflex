export interface GalleryItem {
  id: number;
  album: string;
  title: string;
  shape: "tall" | "wide" | "standard";
  image: string;
}

export interface AboutHeroSlide {
  id: number;
  album: string;
  title: string;
  image: string;
}

/** Slides for the About page hero collage */
export const aboutHeroSlides: AboutHeroSlide[] = [
  {
    id: 1,
    album: "Leadership",
    title: "H.E. Zadig Abreha — Chief of the Academy",
    image: "/images/zadig abereha.webp",
  },
  {
    id: 2,
    album: "AFLEX Team",
    title: "Faculty, researchers & staff at Sululta campus",
    image: "/about/aflex workees.jpg",
  },
  {
    id: 3,
    album: "Leadership",
    title: "Seleshi — AFLEX leadership",
    image: "/images/seleshi.jpg",
  },
  {
    id: 4,
    album: "Leadership",
    title: "Selam — AFLEX leadership",
    image: "/images/selam.jpg",
  },
  {
    id: 5,
    album: "Leadership",
    title: "Negash — AFLEX leadership",
    image: "/images/negash image.jpg",
  },
  {
    id: 6,
    album: "Leadership",
    title: "Melese — AFLEX leadership",
    image: "/images/melese.jpg",
  },
  {
    id: 7,
    album: "Leadership",
    title: "Fisha — AFLEX leadership",
    image: "/images/fisha.jpg",
  },
  {
    id: 8,
    album: "AFLEX",
    title: "African Leadership Excellence Academy",
    image: "/images/aflex-logo.png",
  },
  {
    id: 9,
    album: "Campus",
    title: "Sululta highland campus at sunrise",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 10,
    album: "Cohorts & Events",
    title: "Executive seminar cohort in deliberation",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 11,
    album: "Pan-Africanism Forum",
    title: "Pan-African policy roundtable & delegates",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 12,
    album: "Green Legacy Program",
    title: "Environmental stewardship on campus grounds",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 13,
    album: "Campus",
    title: "Central courtyard and quiet study pavilion",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 14,
    album: "Cohorts & Events",
    title: "Graduation ceremony & cohort celebration",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    album: "Campus",
    title: "Sululta highland campus at sunrise",
    shape: "tall",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    album: "Cohorts & Events",
    title: "Executive seminar cohort in deliberation",
    shape: "wide",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    album: "Pan-Africanism Forum",
    title: "Pan-African policy roundtable & delegates",
    shape: "standard",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    album: "Green Legacy Program",
    title: "Environmental stewardship on campus grounds",
    shape: "tall",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    album: "Campus",
    title: "Central courtyard and quiet study pavilion",
    shape: "standard",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    album: "Cohorts & Events",
    title: "Graduation ceremony & cohort celebration",
    shape: "wide",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 7,
    album: "AFLEX Team",
    title: "Faculty, researchers & staff at Sululta campus",
    shape: "wide",
    image: "/about/aflex workees.jpg",
  },
];
