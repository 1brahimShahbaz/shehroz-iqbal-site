import type { Metadata } from "next";
import { ExtraCreditGallery } from "@/components/gallery/ExtraCreditGallery";
import { getGalleryMasonryItems } from "@/lib/galleryMasonry";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Extra Credit — Class Photos",
  description:
    "Photo highlights from Sir Shehroz Iqbal’s Accounting classes — moments from sessions past and present.",
  path: "/extra-credit",
});

export default function ExtraCreditPage() {
  const masonryItems = getGalleryMasonryItems();

  return <ExtraCreditGallery masonryItems={masonryItems} />;
}
