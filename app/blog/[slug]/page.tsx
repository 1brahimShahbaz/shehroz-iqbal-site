import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Lightbulb } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { ShareRail } from "@/components/blog/ShareRail";
import { TOC } from "@/components/blog/TOC";
import { RegistrationBanner } from "@/components/home/RegistrationBanner";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateStagger, AnimateStaggerItem } from "@/components/shared/AnimateStagger";
import { posts } from "@/data/posts";
import { blogSeoTitle, buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type BlogPageParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: BlogPageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return buildMetadata({ title: "Post not found" });
  return buildMetadata({
    title: blogSeoTitle(post.slug, post.title),
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover,
    keywords: [
      "Shehroz Iqbal",
      "Shehroz Iqbal Accounting blog",
      ...(post.keywords ?? []),
    ],
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: BlogPageParams;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const headings = post.body
    .filter((b) => b.type === "h2")
    .map((b) => ({ id: slugify(b.text), text: b.text }));

  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category)
        return -1;
      if (b.category === post.category && a.category !== post.category)
        return 1;
      return 0;
    })
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    author: { "@type": "Person", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <AnimateSection index={0} instant className="bg-grid-white pt-12 lg:pt-20">
        <article>
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_minmax(0,720px)_240px] lg:gap-12">
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <TOC headings={headings} />
              </div>
            </div>

            <main className="min-w-0">
              <span className="inline-flex items-center rounded-full bg-gold-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider2 text-navy-900">
                {post.category}
              </span>
              <h1 className="mt-5 font-fraunces text-[36px] font-semibold italic leading-[1.1] tracking-[-0.01em] text-navy-900 sm:text-[48px]">
                {post.title}
              </h1>
              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold-500/30">
                  <Image
                    src="/images/avatar.png"
                    alt="Sir Shehroz Iqbal, CAIE Accounting tutor"
                    width={48}
                    height={48}
                    loading="lazy"
                    sizes="48px"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-inter text-base font-semibold text-navy-900">
                    Sir Shehroz Iqbal
                  </p>
                  <p className="text-[13px] text-gray-500">
                    {post.date} · {post.readingTime}
                  </p>
                </div>
              </div>

              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-card-rest">
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={1200}
                  height={675}
                  priority
                  loading="eager"
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="mt-10 space-y-6 font-inter text-[17px] leading-[1.8] text-ink-900">
                {post.body.map((block, i) => {
                  if (block.type === "p")
                    return <p key={i}>{block.text}</p>;
                  if (block.type === "h2")
                    return (
                      <h2
                        key={i}
                        id={slugify(block.text)}
                        className="!mt-12 font-fraunces text-[28px] font-semibold leading-tight text-navy-900"
                      >
                        {block.text}
                      </h2>
                    );
                  if (block.type === "quote")
                    return (
                      <blockquote
                        key={i}
                        className="border-l-[3px] border-gold-500 pl-6 font-fraunces text-[22px] italic text-navy-900"
                      >
                        {block.text}
                      </blockquote>
                    );
                  if (block.type === "callout")
                    return (
                      <div
                        key={i}
                        className="flex gap-4 rounded-xl border-l-[3px] border-gold-500 bg-cream-50 p-5"
                      >
                        <Lightbulb
                          className="h-5 w-5 flex-none text-navy-900"
                          strokeWidth={1.75}
                        />
                        <p className="text-[15px] leading-relaxed text-navy-900">
                          {block.text}
                        </p>
                      </div>
                    );
                  return null;
                })}
              </div>
            </main>

            <aside className="space-y-8 lg:max-w-[240px]">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card-rest">
                <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full ring-2 ring-gold-500/30">
                  <Image
                    src="/images/avatar.png"
                    alt="Sir Shehroz Iqbal, CAIE Accounting tutor"
                    width={64}
                    height={64}
                    loading="lazy"
                    sizes="64px"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-center font-fraunces text-[18px] font-semibold text-navy-900">
                  Sir Shehroz Iqbal
                </p>
                <p className="mt-1 text-center text-[12px] text-gray-500">
                  Accounting tutor · CAIE & Edexcel
                </p>
                <p className="mt-3 text-center text-[13px] leading-relaxed text-gray-500">
                  13+ years of teaching. 1,250+ students.
                </p>
                <Link
                  href="/courses/as-level"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-gold-500 hover:text-white"
                >
                  View courses
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
              </div>
              <div className="lg:sticky lg:top-28">
                <ShareRail title={post.title} slug={post.slug} />
              </div>
            </aside>
          </div>
        </div>
        </article>
      </AnimateSection>

      <AnimateSection index={1} className="bg-grid-white pb-20 pt-12">
        <div className="container-x">
          <div className="mx-auto h-0.5 w-20 bg-gold-500" />
          <h3 className="mt-10 text-center font-fraunces text-[26px] font-semibold text-navy-900">
            Read next.
          </h3>
          <AnimateStagger className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((p) => (
              <AnimateStaggerItem key={p.slug} className="h-full">
                <BlogCard post={p} />
              </AnimateStaggerItem>
            ))}
          </AnimateStagger>
        </div>
      </AnimateSection>

      <RegistrationBanner
        title="Liked this? Learn directly with me."
        subtitle="Register for the Oct/Nov 2026 session — live classes, recorded backups, full notes pack."
        source="blog_post_cta"
        registerHref={SITE.orbedDashboard}
      />
    </>
  );
}
