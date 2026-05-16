import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * robots.ts — Next.js App Router serves /robots.txt from this.
 *
 * We allow all crawlers everywhere except /api/ (server endpoints,
 * not user-facing content). The sitemap reference is auto-discovered
 * by most engines, but stating it explicitly speeds it up.
 */
export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
