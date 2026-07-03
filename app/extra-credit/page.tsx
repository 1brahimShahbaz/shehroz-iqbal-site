import type { Metadata } from "next";
import { ExtraCreditGallery } from "@/components/gallery/ExtraCreditGallery";
import {
  galleryClassroomClips,
  galleryRecommendationClips,
} from "@/data/gallery";
import { getGalleryMasonryItems } from "@/lib/galleryMasonry";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Extra Credit — Photos & Class Clips",
  description:
    "Short clips from live Accounting lessons, recommendation videos from students, and photo highlights from Sir Shehroz Iqbal’s classes.",
  path: "/extra-credit",
});

export default function ExtraCreditPage() {
  const masonryItems = getGalleryMasonryItems();

  return (
    <ExtraCreditGallery
      classroom={galleryClassroomClips}
      recommendations={galleryRecommendationClips}
      masonryItems={masonryItems}
    />
  );
}
