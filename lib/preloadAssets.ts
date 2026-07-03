import { HERO_BANNER_SRCS } from "@/lib/heroBanners";
import { REGISTRATION_BANNER } from "@/lib/marketingImages";
import { getBlogPreviewPosts } from "@/data/posts";
import { getStudentGalleryPreview } from "@/lib/studentGallery";

/** Images warmed on first paint — header, hero, affiliations, about teasers. */
const STATIC_IMAGES = [
  "/images/logo.png",
  REGISTRATION_BANNER.src,
  ...HERO_BANNER_SRCS,
  "/images/thumbnail.png",
  "/images/orbed.png",
  "/images/avatar.png",
  "/images/teacher-about.jpeg",
  "/images/aboutpage2.png",
  "/images/mentoring.png",
  "/images/behindsllybus.png",
  "/images/alpha-college.png",
  "/images/kashans-academy.png",
] as const;

/** Homepage videos — preloaded during the opening loader. */
const HOME_VIDEOS = [
  "/videos/glimpse1.mp4",
  "/videos/glimpse2.mp4",
  "/videos/glimpse3.mp4",
  "/videos/glimpse4.mp4",
  "/videos/glimpse5.mp4",
] as const;

export type PreloadManifest = {
  images: string[];
  videos: string[];
};

/** Build-time / request-time list of homepage assets for the site preloader. */
export function getHomePreloadManifest(): PreloadManifest {
  const blogCovers = getBlogPreviewPosts(4)
    .map((p) => p.cover)
    .filter(Boolean);
  const gallery = getStudentGalleryPreview(8).map((p) => p.src);

  const images = [
    ...new Set([...STATIC_IMAGES, ...blogCovers, ...gallery]),
  ] as string[];

  return {
    images,
    videos: [...HOME_VIDEOS],
  };
}
