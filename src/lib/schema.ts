/**
 * JSON-LD builders.
 *
 * Only verified data reaches structured data. Unverified fields (geo, social
 * profiles, aggregate rating) are omitted entirely rather than guessed —
 * inaccurate markup is a liability, not an SEO win.
 */

import { business } from "@/data/business";
import type { Faq } from "@/data/faqs";
import { getOpeningHoursSpecification } from "@/lib/hours";

const LOGO_URL = `${business.site.url}/brand/vapor-pulse-logo.png`;

/**
 * TobaccoShop is the most accurate schema.org Store subtype for a vape
 * retailer, and inherits everything LocalBusiness needs.
 */
export function localBusinessSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TobaccoShop",
    "@id": `${business.site.url}/#store`,
    name: business.name,
    description: business.description,
    url: business.site.url,
    telephone: business.phone.e164,
    image: LOGO_URL,
    logo: LOGO_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: getOpeningHoursSpecification(),
    areaServed: business.serviceArea.map((name) => ({
      "@type": "City",
      name,
    })),
  };

  if (business.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    };
  }

  const sameAs = Object.values(business.social).filter(
    (url): url is string => typeof url === "string" && url.length > 0,
  );
  if (sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  // Off by default: self-serving AggregateRating on your own LocalBusiness is
  // outside Google's review-snippet guidelines. Enable only when eligible.
  if (business.rating.includeInStructuredData) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${business.site.url}/#website`,
    name: business.site.name,
    url: business.site.url,
    publisher: { "@id": `${business.site.url}/#store` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${business.site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
