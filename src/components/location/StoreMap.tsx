import { business } from "@/data/business";
import { cn } from "@/lib/utils";

/**
 * Map embed with a graceful no-key path.
 *
 * With NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY set we use the official Maps
 * Embed API. Without a key we fall back to the keyless embed, so the map works
 * out of the box with zero configuration.
 *
 * The iframe is lazy-loaded and sits below the fold, so it costs nothing at
 * LCP.
 */
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY;

const query = encodeURIComponent(`${business.name}, ${business.address.full}`);

/** With a key, the place ID pins the exact listing rather than geocoding text. */
const keyedQuery = business.google.placeId
  ? `place_id:${business.google.placeId}`
  : query;

const embedSrc = apiKey
  ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${keyedQuery}&zoom=16`
  : `https://maps.google.com/maps?q=${query}&z=16&output=embed`;

export function StoreMap({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-fog-400/15 relative overflow-hidden rounded-2xl border",
        className,
      )}
    >
      <iframe
        src={embedSrc}
        title={`Map showing ${business.name} at ${business.address.full}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full min-h-72 w-full border-0 grayscale-[0.35] contrast-[1.1]"
      />
    </div>
  );
}
