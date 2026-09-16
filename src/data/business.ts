/**
 * CANONICAL BUSINESS DATA — single source of truth for NAP (Name, Address, Phone).
 *
 * Every component, page, metadata object and JSON-LD block reads from here.
 * Never re-type the phone number or address anywhere else in the app: NAP
 * consistency is a direct local-SEO ranking factor.
 *
 * Fields set to `null` are NOT YET VERIFIED. The UI degrades gracefully when
 * they are null — fill them in and the corresponding feature turns itself on.
 */

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type DayHours = { open: string; close: string } | null;

/** Display order, Monday-first (how humans read a store-hours table). */
export const DAY_ORDER: readonly DayKey[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
] as const;

/** Maps a day key to the index returned by Date.getDay() (0 = Sunday). */
export const DAY_INDEX: Record<DayKey, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

export const DAY_LABEL: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export const DAY_LABEL_SHORT: Record<DayKey, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

const street = "2816 N O'Connor Rd";
const city = "Irving";
const region = "TX";
const regionName = "Texas";
const postalCode = "75062";

/** Digits only, E.164 — used for tel: links and schema. */
const phoneE164 = "+14694729104";

/**
 * Public site origin. Used for canonical URLs, sitemap, robots and JSON-LD.
 * Override with NEXT_PUBLIC_SITE_URL at build time.
 *
 * TODO(confirm): replace the fallback with the real production domain.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaporpulseirving.com"
).replace(/\/$/, "");

/**
 * Google Place ID for the Irving store, confirmed by the shop.
 *
 * Drives the "Read Google Reviews" / "Leave Us a Review" deep links, and pins
 * the map and directions to this exact listing rather than a text search.
 * Override with NEXT_PUBLIC_GOOGLE_PLACE_ID if the listing ever changes.
 */
const googlePlaceId: string | null =
  process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? "ChIJa5iB42uDToYRg7jh2Z3Xzbs";

const addressQuery = encodeURIComponent(
  `Vapor Pulse ${street}, ${city}, ${region} ${postalCode}`,
);

export const business = {
  /** Exact business name as listed on the Google Business Profile. */
  name: "Vapor Pulse - Irving",
  /** Conversational name for headings and body copy. */
  shortName: "Vapor Pulse",
  tagline: "Feel the Pulse.",
  positioning: "Your Local Vape Shop in Irving, TX",
  description:
    "A large selection, knowledgeable staff, and a relaxed local shop experience at Vapor Pulse in Irving, Texas.",

  address: {
    street,
    city,
    region,
    regionName,
    postalCode,
    country: "US",
    countryName: "United States",
    /** "2816 N O'Connor Rd, Irving, TX 75062" */
    full: `${street}, ${city}, ${region} ${postalCode}`,
    /** Second line only: "Irving, TX 75062" */
    cityLine: `${city}, ${region} ${postalCode}`,
  },

  phone: {
    display: "(469) 472-9104",
    href: `tel:${phoneE164}`,
    e164: phoneE164,
  },

  email: "vaporpulseirving@gmail.com" as string | null,

  /**
   * Latitude / longitude for the storefront, used only by the LocalBusiness
   * JSON-LD (set to null and `geo` is omitted from the schema entirely).
   *
   * Source: OpenStreetMap/Nominatim geocode of the exact street address, which
   * returned a house-number-level match for 2816 North O'Connor Road. This is
   * building-accurate but is NOT the pin from the Google Business Profile — if
   * the GBP pin differs, prefer that and replace these values.
   *
   * Directions links do not depend on this: they use the confirmed Place ID.
   */
  geo: { latitude: 32.844532, longitude: -96.951107 } as {
    latitude: number;
    longitude: number;
  } | null,

  /**
   * Store-local timezone. Open/closed status is ALWAYS computed in this zone,
   * never in the visitor's timezone. Intl handles DST automatically.
   */
  timezone: "America/Chicago",

  /** Single source of truth for hours. 24h "HH:MM", store-local. */
  hours: {
    mon: { open: "10:00", close: "20:00" },
    tue: { open: "10:00", close: "20:00" },
    wed: { open: "10:00", close: "20:00" },
    thu: { open: "10:00", close: "20:00" },
    fri: { open: "10:00", close: "20:00" },
    sat: { open: "10:00", close: "20:00" },
    sun: { open: "12:00", close: "20:00" },
  } satisfies Record<DayKey, DayHours>,

  /**
   * Google Business Profile reputation snapshot.
   * This is a manually-updated snapshot, NOT a live feed — the UI says so.
   */
  rating: {
    value: 4.8,
    count: 296,
    /** Rounded-down phrasing so the number never reads as stale//precise. */
    displayCount: "290+",
    source: "Google",
    /**
     * Google's review-snippet guidelines discourage self-serving
     * AggregateRating markup for your own LocalBusiness. Left OFF by default;
     * flip to true only if you have confirmed eligibility.
     */
    includeInStructuredData: false,
  },

  google: {
    placeId: googlePlaceId,
    /**
     * Opens turn-by-turn navigation to the storefront. The place ID makes the
     * destination exact instead of relying on address geocoding.
     */
    directionsUrl:
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${street}, ${city}, ${region} ${postalCode}`,
      )}` +
      (googlePlaceId ? `&destination_place_id=${googlePlaceId}` : ""),
    mapsUrl:
      `https://www.google.com/maps/search/?api=1&query=${addressQuery}` +
      (googlePlaceId ? `&query_place_id=${googlePlaceId}` : ""),
    reviewsUrl: googlePlaceId
      ? `https://search.google.com/local/reviews?placeid=${googlePlaceId}`
      : `https://www.google.com/maps/search/?api=1&query=${addressQuery}`,
    writeReviewUrl: googlePlaceId
      ? `https://search.google.com/local/writereview?placeid=${googlePlaceId}`
      : `https://www.google.com/maps/search/?api=1&query=${addressQuery}`,
  },

  /** Set any of these to a URL to make the icon appear in the footer. */
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
    x: null as string | null,
    yelp: null as string | null,
  },

  /** Minimum age to enter the store or the site. Configurable by jurisdiction. */
  ageRequirement: 21,

  /** Areas we genuinely serve, for local context (no fake service claims). */
  serviceArea: [
    "Irving",
    "Las Colinas",
    "Valley Ranch",
    "Coppell",
    "Grand Prairie",
    "Farmers Branch",
  ],

  site: {
    url: siteUrl,
    name: "Vapor Pulse Irving",
    locale: "en_US",
  },
} as const;

export type Business = typeof business;
