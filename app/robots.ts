import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/** Required for `output: 'export'` — robots must be generated at build time. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/studio/",
          // Raw PDF library paths (preview-only assets under public/notes/)
          "/notes/A2",
          "/notes/As",
          "/notes/olevel",
        ],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
