import type { MetadataRoute } from "next";

import { business } from "@/data/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/privacy", "/terms"],
    },
    sitemap: `${business.site.url}/sitemap.xml`,
    host: business.site.url,
  };
}
