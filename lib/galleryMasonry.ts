import type { MasonryItem } from "@/components/shared/Masonry";
import { getStudentGalleryPhotos } from "@/lib/studentGallery";

/** Varied tile heights for a natural masonry rhythm. */
const PHOTO_HEIGHTS = [460, 380, 520, 400, 440, 360];

/** Student photos for the Extra Credit masonry gallery. */
export function getGalleryMasonryItems(): MasonryItem[] {
  return getStudentGalleryPhotos().map((photo, i) => ({
    id: photo.id,
    img: photo.src,
    height: PHOTO_HEIGHTS[i % PHOTO_HEIGHTS.length]!,
    alt: photo.alt,
  }));
}
