import Image from "next/image";

import { business } from "@/data/business";
import { cn } from "@/lib/utils";

/**
 * The supplied logo files are square-ish artwork on a solid black background.
 * `blend-screen` drops that black into the page background so the logo reads as
 * lit artwork rather than a pasted tile. Aspect ratios are preserved exactly —
 * the logo is never stretched.
 */
const VARIANTS = {
  /** Wide crop of the wordmark. The legible option at small sizes. */
  wordmark: {
    src: "/brand/vapor-pulse-wordmark.png",
    width: 700,
    height: 365,
  },
  /** Full square logo with the smoke field. For hero / large placements. */
  full: {
    src: "/brand/vapor-pulse-logo.png",
    width: 640,
    height: 629,
  },
  /** Graffiti badge with crown and device. */
  badge: {
    src: "/brand/vapor-pulse-badge.png",
    width: 640,
    height: 653,
  },
} as const;

type LogoProps = {
  variant?: keyof typeof VARIANTS;
  className?: string;
  priority?: boolean;
  /** Set when the logo is purely decorative next to a visible brand name. */
  decorative?: boolean;
  sizes?: string;
};

export function Logo({
  variant = "wordmark",
  className,
  priority = false,
  decorative = false,
  sizes,
}: LogoProps) {
  const asset = VARIANTS[variant];

  return (
    <Image
      src={asset.src}
      width={asset.width}
      height={asset.height}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      sizes={sizes}
      alt={decorative ? "" : `${business.name} logo`}
      aria-hidden={decorative || undefined}
      className={cn("blend-screen h-auto w-auto select-none", className)}
    />
  );
}
