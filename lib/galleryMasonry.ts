import fs from "fs";
import path from "path";
import type { MasonryItem } from "@/components/shared/Masonry";
import { getStudentGalleryPhotos } from "@/lib/studentGallery";

const IMAGES_ROOT = path.join(process.cwd(), "public", "images");

/** Varied tile heights for a natural masonry rhythm. */
const PHOTO_HEIGHTS = [460, 380, 520, 400, 440, 360];
const BANNER_HEIGHT = 300;

import { HERO_BANNER_FILES } from "@/lib/heroBanners";

function fileExists(name: string): boolean {
  return fs.existsSync(path.join(IMAGES_ROOT, name));
}

/**
 * Photos + hero banners for the Extra Credit masonry gallery.
 * Uses whatever student shots and banners exist under `public/images/`.
 */
export function getGalleryMasonryItems(): MasonryItem[] {
  const items: MasonryItem[] = [];
  let heightIndex = 0;

  for (const photo of getStudentGalleryPhotos()) {
    items.push({
      id: photo.id,
      img: photo.src,
      height: PHOTO_HEIGHTS[heightIndex % PHOTO_HEIGHTS.length]!,
      alt: photo.alt,
    });
    heightIndex += 1;
  }

  for (const name of HERO_BANNER_FILES) {
    if (!fileExists(name)) continue;
    items.push({
      id: `banner-${name.replace(/\.[^.]+$/, "")}`,
      img: `/images/${encodeURIComponent(name)}`,
      height: BANNER_HEIGHT,
      alt: "Sir Shehroz Iqbal — Accounting classes",
    });
  }

  return items;
}
