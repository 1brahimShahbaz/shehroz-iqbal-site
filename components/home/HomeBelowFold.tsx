import { BlogPreview } from "@/components/home/BlogPreview";
import { ExtraCreditPreview } from "@/components/home/ExtraCreditPreview";
import { ReelsCarousel } from "@/components/home/ReelsCarousel";
import { RegistrationBanner } from "@/components/home/RegistrationBanner";
import { SampleLectures } from "@/components/home/SampleLectures";
import { SampleNotes } from "@/components/home/SampleNotes";
import type { BlogPost } from "@/data/posts";
import type { NoteResource } from "@/data/notes";
import type { StudentPhoto } from "@/lib/studentTypes";

type Props = {
  sampleNotes: NoteResource[];
  extraCreditPhotos: StudentPhoto[];
  blogPreviewPosts: BlogPost[];
};

export function HomeBelowFold({
  sampleNotes,
  extraCreditPhotos,
  blogPreviewPosts,
}: Props) {
  return (
    <>
      <SampleLectures />
      <SampleNotes notes={sampleNotes} />
      <ReelsCarousel />
      <ExtraCreditPreview photos={extraCreditPhotos} />
      <BlogPreview posts={blogPreviewPosts} />
      <RegistrationBanner source="home_footer_cta" />
    </>
  );
}
