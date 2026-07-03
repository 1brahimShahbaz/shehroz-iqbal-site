import { posts } from "./postsContent";

export type {
  BlogBodyBlock,
  BlogCategory,
  BlogPost,
} from "@/lib/blogTypes";

import type { BlogPost } from "@/lib/blogTypes";

export { posts };

export const featuredPost = posts.find((p) => p.featured) ?? posts[0];
export const otherPosts = posts.filter((p) => !p.featured);

/** Recent posts for the home page preview (featured first, then newest). */
export function getBlogPreviewPosts(limit = 4): BlogPost[] {
  const byDate = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = byDate.find((p) => p.featured);
  if (!featured) return byDate.slice(0, limit);
  const rest = byDate.filter((p) => p.slug !== featured.slug);
  return [featured, ...rest].slice(0, limit);
}
