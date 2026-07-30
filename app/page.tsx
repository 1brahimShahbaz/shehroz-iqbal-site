import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import { SessionAnnouncement } from "@/components/home/SessionAnnouncement";
import { OrbEdRegistrationGuide } from "@/components/home/OrbEdRegistrationGuide";
import { HomeBelowFold } from "@/components/home/HomeBelowFold";
import { HomeFaq } from "@/components/home/HomeFaq";
import { buildMetadata } from "@/lib/seo";
import { getBlogPreviewPosts } from "@/data/posts";
import { getStudentGalleryPreview } from "@/lib/studentGallery";

export const metadata: Metadata = buildMetadata({
  title: "O & A Level Accounting Tutor in Karachi - Shehroz Iqbal",
  titleAbsolute: true,
  description:
    "Sir Shehroz Iqbal is a leading O & A Level Accounting tutor in Karachi. Live & online Accounts tuition for CAIE 9706/7707 students. Register for Oct/Nov 2026.",
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
  const extraCreditPhotos = getStudentGalleryPreview(8);
  const blogPreviewPosts = getBlogPreviewPosts(4);

  return (
    <>
      {/* Preload the hero portrait (LCP image). */}
      <link rel="preload" as="image" href="/images/aboutpage2.webp" />
      <HeroSlider />
      <SessionAnnouncement />
      <OrbEdRegistrationGuide />
      <HomeBelowFold
        extraCreditPhotos={extraCreditPhotos}
        blogPreviewPosts={blogPreviewPosts}
      />
      <HomeFaq />
    </>
  );
}
