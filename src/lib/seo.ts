import type { Metadata } from "next";

import { business } from "@/data/business";

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/products". Use "/" for the homepage. */
  path: string;
  /** Set false for utility pages that should stay out of the index. */
  index?: boolean;
};

/**
 * Builds per-page metadata with a canonical URL. Every route defines its own
 * title and description — no duplicated meta across the site.
 */
export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetaInput): Metadata {
  const url = path === "/" ? business.site.url : `${business.site.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? undefined
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: business.site.name,
      locale: business.site.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
