import { BlogPreview } from "@/components/home/BlogPreview";
import { ExtraCreditPreview } from "@/components/home/ExtraCreditPreview";
import { RegistrationBanner } from "@/components/home/RegistrationBanner";
import { SampleLectures } from "@/components/home/SampleLectures";
import type { BlogPost } from "@/data/posts";
import type { StudentPhoto } from "@/lib/studentTypes";

type Props = {
  extraCreditPhotos: StudentPhoto[];
  blogPreviewPosts: BlogPost[];
};

export function HomeBelowFold({
  extraCreditPhotos,
  blogPreviewPosts,
}: Props) {
  return (
    <>
      <SampleLectures />
      <ExtraCreditPreview photos={extraCreditPhotos} />
      <BlogPreview posts={blogPreviewPosts} />
      <RegistrationBanner
        source="home_footer_cta"
        title="Secure your place for Oct/Nov 2026"
        subtitle="Learn with one of the trusted accounts teachers in Karachi through live online classes, recorded lectures, comprehensive notes, weekly support sessions, and regular past paper practice."
      />
    </>
  );
}
