/** Hero slider banner files under `public/images/`. */
export const HERO_BANNER_ASSETS = [
  {
    src: "/images/banner1.png",
    width: 959,
    height: 960,
  },
  {
    src: "/images/banner2.jpg",
    width: 2048,
    height: 1368,
  },
  {
    src: "/images/banner3.jpg",
    width: 2048,
    height: 1368,
  },
] as const;

export const HERO_BANNER_SRCS = HERO_BANNER_ASSETS.map((b) => b.src);

/** Basenames for gallery masonry (same files as hero). */
export const HERO_BANNER_FILES = [
  "banner1.png",
  "banner2.jpg",
  "banner3.jpg",
] as const;
