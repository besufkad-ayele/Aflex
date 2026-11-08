export type GalleryMediaType = "photo" | "video";

export interface GalleryItem {
  id: number;
  album: string;
  title: string;
  shape: "tall" | "wide" | "standard";
  type: GalleryMediaType;
  /** Image src for photos, or poster frame for videos */
  image: string;
  /** Video source — only for type video */
  video?: string;
}

export interface AboutHeroSlide {
  id: number;
  album: string;
  title: string;
  image: string;
}

export interface GalleryHeroSlide {
  id: number;
  type: GalleryMediaType;
  title: string;
  album: string;
  src: string;
  poster?: string;
}

/** Slides for the About page hero collage */
export const aboutHeroSlides: AboutHeroSlide[] = [
  {
    id: 1,
    album: "Leadership",
    title: "Mohammedrafie Abaraya — Chief Executive Officer",
    image: "/Mohammedrafie.jpg",
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
    image: "/images/aflex-logo.jpg",
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

/** Gallery page hero — photos and videos, auto-advance every 2s */
export const galleryHeroSlides: GalleryHeroSlide[] = [
  {
    id: 1,
    type: "photo",
    title: "Founding Pan-African leaders",
    album: "Pan-Africanism Forum",
    src: "/images/pan1.jpg",
  },
  {
    id: 2,
    type: "video",
    title: "Sululta campus cinematic",
    album: "Campus",
    src: "/videos/home_hero_video.mp4",
    poster: "/images/pan1.jpg",
  },
  {
    id: 3,
    type: "photo",
    title: "Green Legacy planting ceremony",
    album: "Green Legacy Program",
    src: "/images/news1.jpg",
  },
  {
    id: 4,
    type: "video",
    title: "Campus spaces in motion",
    album: "Campus",
    src: "/videos/continue_to_the_second_set.mp4",
    poster: "/images/news1.jpg",
  },
  {
    id: 5,
    type: "photo",
    title: "First Pan-Africanism Forum",
    album: "Pan-Africanism Forum",
    src: "/images/news2.png",
  },
  {
    id: 6,
    type: "video",
    title: "Academy life on campus",
    album: "Cohorts & Events",
    src: "/videos/generate_another_video_use_all.mp4",
    poster: "/images/news2.png",
  },
  {
    id: 7,
    type: "photo",
    title: "Mohammedrafie Abaraya — Chief Executive Officer",
    album: "Leadership",
    src: "/Mohammedrafie.jpg",
  },
  {
    id: 8,
    type: "video",
    title: "Learning spaces walkthrough",
    album: "Campus",
    src: "/videos/Use_the_provided_room_view_pho%20(1).mp4",
    poster: "/about/aflex workees.jpg",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    album: "Campus",
    title: "Sululta highland campus at sunrise",
    shape: "tall",
    type: "photo",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    album: "Cohorts & Events",
    title: "Executive seminar cohort in deliberation",
    shape: "wide",
    type: "photo",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    album: "Pan-Africanism Forum",
    title: "Pan-African policy roundtable & delegates",
    shape: "standard",
    type: "photo",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    album: "Green Legacy Program",
    title: "Environmental stewardship on campus grounds",
    shape: "tall",
    type: "photo",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    album: "Campus",
    title: "Central courtyard and quiet study pavilion",
    shape: "standard",
    type: "photo",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    album: "Cohorts & Events",
    title: "Graduation ceremony & cohort celebration",
    shape: "wide",
    type: "photo",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 7,
    album: "AFLEX Team",
    title: "Faculty, researchers & staff at Sululta campus",
    shape: "wide",
    type: "photo",
    image: "/about/aflex workees.jpg",
  },
  {
    id: 8,
    album: "Pan-Africanism Forum",
    title: "Founding Pan-African leaders archive",
    shape: "wide",
    type: "photo",
    image: "/images/pan1.jpg",
  },
  {
    id: 9,
    album: "Green Legacy Program",
    title: "Green Legacy planting with African leaders",
    shape: "tall",
    type: "photo",
    image: "/images/news1.jpg",
  },
  {
    id: 10,
    album: "Pan-Africanism Forum",
    title: "First Pan-Africanism Forum — dignitaries",
    shape: "standard",
    type: "photo",
    image: "/images/news2.png",
  },
  {
    id: 11,
    album: "Leadership",
    title: "Mohammedrafie Abaraya — Chief Executive Officer",
    shape: "tall",
    type: "photo",
    image: "/Mohammedrafie.jpg",
  },
  {
    id: 12,
    album: "Campus",
    title: "Sululta campus cinematic",
    shape: "wide",
    type: "video",
    image: "/images/pan1.jpg",
    video: "/videos/home_hero_video.mp4",
  },
  {
    id: 13,
    album: "Campus",
    title: "Campus spaces in motion",
    shape: "tall",
    type: "video",
    image: "/images/news1.jpg",
    video: "/videos/continue_to_the_second_set.mp4",
  },
  {
    id: 14,
    album: "Cohorts & Events",
    title: "Academy life on campus",
    shape: "standard",
    type: "video",
    image: "/images/news2.png",
    video: "/videos/generate_another_video_use_all.mp4",
  },
  {
    id: 15,
    album: "Campus",
    title: "Learning spaces walkthrough",
    shape: "wide",
    type: "video",
    image: "/about/aflex workees.jpg",
    video: "/videos/Use_the_provided_room_view_pho%20(1).mp4",
  },
];

export const galleryAlbums = [
  "All albums",
  "Campus",
  "Cohorts & Events",
  "Pan-Africanism Forum",
  "Green Legacy Program",
  "AFLEX Team",
  "Leadership",
];
