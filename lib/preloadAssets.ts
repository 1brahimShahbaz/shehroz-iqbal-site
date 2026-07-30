import { REGISTRATION_BANNER } from "@/lib/marketingImages";
import { getBlogPreviewPosts } from "@/data/posts";
import { getStudentGalleryPreview } from "@/lib/studentGallery";

/** Images warmed on first paint — header, hero, affiliations, about teasers. */
const STATIC_IMAGES = [
  "/images/logo.webp",
  "/images/aboutpage2.webp",
  REGISTRATION_BANNER.src,
  "/images/orbed.webp",
  "/images/avatar.webp",
  "/images/aboutpage2.webp",
  "/images/alpha-college.webp",
  "/images/kashans-academy.webp",
] as const;

/** Homepage videos — preloaded during the opening loader. */
const HOME_VIDEOS: readonly string[] = [];

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
