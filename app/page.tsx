import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import { SessionAnnouncement } from "@/components/home/SessionAnnouncement";
import { OrbEdRegistrationGuide } from "@/components/home/OrbEdRegistrationGuide";
import { HomeBelowFold } from "@/components/home/HomeBelowFold";
import { HomeFaq } from "@/components/home/HomeFaq";
import { buildMetadata } from "@/lib/seo";
import { getBlogPreviewPosts } from "@/data/posts";
import { getSampleNotesForHome } from "@/lib/notesLibrary";
import { getStudentGalleryPreview } from "@/lib/studentGallery";
import { HERO_BANNER_SRCS } from "@/lib/heroBanners";

export const metadata: Metadata = buildMetadata({
  title: "Best A Level Accounting Tutor in Karachi | Shehroz Iqbal",
  titleAbsolute: true,
  description:
    "Shehroz Iqbal — A Level Accounting tutor in Karachi, Pakistan. CAIE 9706 & Edexcel specialist, 13+ years experience. In-person Karachi & online across Pakistan. Register for Oct/Nov 2026.",
  path: "/",
  keywords: [
    "best a level accounting tutor karachi",
    "a level accounting teacher karachi",
    "accounting tutor karachi",
    "caie accounting 9706 karachi",
    "edexcel accounting tutor pakistan",
    "o level accounting tutor karachi",
    "as level accounting karachi",
    "a2 level accounting karachi",
    "accounting tuition karachi",
    "best accounting teacher pakistan",
    "online accounting tutor pakistan",
    "shehroz iqbal accounting",
  ],
});

export default function HomePage() {
  const sampleNotes = getSampleNotesForHome();
  const extraCreditPhotos = getStudentGalleryPreview(8);
  const blogPreviewPosts = getBlogPreviewPosts(4);

  return (
    <>
      {HERO_BANNER_SRCS.map((src) => (
        <link key={src} rel="preload" as="image" href={src} />
      ))}
      <HeroSlider />
      <SessionAnnouncement />
      <OrbEdRegistrationGuide />
      <HomeBelowFold
        sampleNotes={sampleNotes}
        extraCreditPhotos={extraCreditPhotos}
        blogPreviewPosts={blogPreviewPosts}
      />
      <HomeFaq />
    </>
  );
}
