"use client";

import { Star } from "lucide-react";

import { business } from "@/data/business";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Google reputation snapshot. Deliberately phrased as a static figure
 * ("290+ reviews") rather than implying a live feed — there is no Places API
 * integration behind it.
 */
export function RatingBadge({
  className,
  size = "md",
  asLink = true,
  showCount = true,
  location = "unknown",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
  showCount?: boolean;
  location?: string;
}) {
  const { rating } = business;

  const text = (
    <>
      <span className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              size === "sm" ? "size-3.5" : "size-4",
              i < Math.floor(rating.value)
                ? "fill-amber-400 text-amber-400"
                : "fill-amber-400/40 text-amber-400/40",
            )}
          />
        ))}
      </span>
      <span className="text-fog-50 font-semibold">{rating.value}</span>
      <span className="text-fog-400">
        on {rating.source}
        {showCount && ` · ${rating.displayCount} reviews`}
      </span>
    </>
  );

  const classes = cn(
    "inline-flex items-center gap-2",
    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
    className,
  );

  if (!asLink) {
    return (
      <span className={classes}>
        <span className="sr-only">
          Rated {rating.value} out of 5 on {rating.source} from{" "}
          {rating.displayCount} reviews.
        </span>
        {text}
      </span>
    );
  }

  return (
    <a
      href={business.google.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("click_google_reviews", { location })}
      className={cn(classes, "hover:text-fog-50 transition-colors")}
    >
      <span className="sr-only">
        Read our {rating.value} star {rating.source} reviews ({rating.displayCount}{" "}
        reviews)
      </span>
      {text}
    </a>
  );
}
