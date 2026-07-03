/**
 * Media for the Extra Credit gallery page.
 * Extend these lists as you add files under `public/videos/` and `public/images/`.
 */

export type GalleryVideoClip = {
  id: string;
  src: string;
  caption?: string;
};

/** Quick classroom clips — same sources as home “glimpses”; add more anytime. */
export const galleryClassroomClips: GalleryVideoClip[] = [
  { id: "c1", src: "/videos/glimpse1.mp4", caption: "Classroom glimpse" },
  { id: "c2", src: "/videos/glimpse2.mp4", caption: "Classroom glimpse" },
  { id: "c3", src: "/videos/glimpse3.mp4", caption: "Classroom glimpse" },
  { id: "c4", src: "/videos/glimpse4.mp4", caption: "Classroom glimpse" },
  { id: "c5", src: "/videos/glimpse5.mp4", caption: "Classroom glimpse" },
];

/** Student testimonials on video — same sources as About page carousel. */
export const galleryRecommendationClips: GalleryVideoClip[] = [
  { id: "r1", src: "/videos/recommendations/reco1.mp4", caption: "Student recommendation" },
  { id: "r2", src: "/videos/recommendations/reco2.mp4", caption: "Student recommendation" },
  { id: "r3", src: "/videos/recommendations/reco3.mp4", caption: "Student recommendation" },
  { id: "r4", src: "/videos/recommendations/reco4.mp4", caption: "Student recommendation" },
  { id: "r5", src: "/videos/recommendations/reco5.mp4", caption: "Student recommendation" },
];
