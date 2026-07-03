"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/posts";
import { MotionCard } from "@/components/shared/MotionCard";
import SpotlightCard from "@/components/shared/SpotlightCard";

const SPOTLIGHT_LIGHT = "rgba(220, 38, 38, 0.12)";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <MotionCard as="article" className="h-full">
      <SpotlightCard
        spotlightColor={SPOTLIGHT_LIGHT}
        className="h-full overflow-hidden rounded-2xl border border-gray-200/80 glass-card"
      >
        <Link
          href={`/blog/${post.slug}`}
          className="group flex h-full min-h-0 flex-col"
        >
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            width={1200}
            height={675}
            loading="lazy"
            sizes="(min-width: 1024px) 400px, 100vw"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy-900/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="inline-flex w-fit rounded-full bg-gold-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider2 text-navy-900">
            {post.category}
          </span>
          <h3 className="mt-3 line-clamp-3 min-h-[4.75rem] font-fraunces text-[19px] font-semibold leading-snug text-navy-900 transition-colors group-hover:text-gold-500">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-[14px] leading-relaxed text-gray-500">
            {post.excerpt}
          </p>
          <p className="mt-auto pt-4 text-[13px] text-gray-500">
            {post.date} · {post.readingTime}
          </p>
        </div>
      </Link>
      </SpotlightCard>
    </MotionCard>
  );
}
