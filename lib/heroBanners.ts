/** Hero slider banner files under `public/images/`. */
export const HERO_BANNER_ASSETS = [
  {
    src: "/images/shehroz-sir-website-banner.webp",
    width: 1920,
    height: 640,
  },
] as const;

export const HERO_BANNER_SRCS = HERO_BANNER_ASSETS.map((b) => b.src);
