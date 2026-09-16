import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * PUFF — the shop mascot, and a secondary brand element.
 *
 * One character, two treatments — both the "Neon Glasses" PUFF confirmed by
 * the shop (neon-sign Design 6, and its illustrated twin in the mascot sheet):
 *   badge  the illustrated mascot badge (welcome, rewards, about, 404)
 *   neon   the neon-sign treatment (hero, footer, location, promos)
 *
 * The source art sits on solid black, so the image is composited with
 * `mix-blend-mode: screen` to drop that black into the page background.
 *
 * Important: the blend only reaches the page if no ancestor creates a stacking
 * context, which is why the float animation and the blend live on the <img>
 * itself rather than on the wrapper. A `transform` or `isolate` on the wrapper
 * would trap the blend and the artwork would show as a black rectangle.
 */
const VARIANTS = {
  badge: {
    src: "/brand/puff-mascot-badge-v2.png",
    width: 626,
    height: 836,
    alt: "PUFF, the Vapor Pulse mascot",
  },
  neon: {
    src: "/brand/puff-neon-sign-v2.png",
    width: 548,
    height: 632,
    alt: "PUFF neon sign at Vapor Pulse",
  },
} as const;

type PuffMascotProps = {
  variant?: keyof typeof VARIANTS;
  className?: string;
  /** Decorative placements get an empty alt so screen readers skip them. */
  decorative?: boolean;
  priority?: boolean;
  /** Slow vertical drift. Disabled automatically under reduced-motion. */
  float?: boolean;
  /** One-shot neon flicker as it comes in. */
  flicker?: boolean;
  /** Radial brand light behind the mascot. */
  glow?: "none" | "violet" | "cyan";
  /**
   * `neon` only: play the smoking animation. Visitors with reduced-motion
   * enabled get the static sign instead — the swap happens in a <picture>
   * media query, so no JS and no layout change.
   */
  animated?: boolean;
};

/** Animated twin of the neon sign — same pixel dimensions as the static file. */
const NEON_ANIMATED_SRC = "/brand/puff-neon-smoking-v2.webp";

const GLOW_COLOR = {
  violet:
    "radial-gradient(circle, rgba(128,91,241,0.55) 0%, rgba(224,55,246,0.22) 45%, transparent 70%)",
  cyan: "radial-gradient(circle, rgba(98,210,249,0.5) 0%, rgba(50,112,219,0.2) 45%, transparent 70%)",
} as const;

export function PuffMascot({
  variant = "badge",
  className,
  decorative = false,
  priority = false,
  float = false,
  flicker = false,
  glow = "none",
  animated = false,
}: PuffMascotProps) {
  const asset = VARIANTS[variant];
  const imgClass = cn(
    "blend-screen relative z-10 h-auto w-full select-none",
    float && "animate-float",
    flicker && "animate-neon-in",
  );

  return (
    <div className={cn("relative", className)}>
      {glow !== "none" && (
        <div
          aria-hidden
          className="animate-glow-breathe glow-field inset-[10%] z-0"
          style={{ background: GLOW_COLOR[glow] }}
        />
      )}
      {animated && variant === "neon" ? (
        // Animated files bypass the image optimizer anyway, so a plain
        // <picture> costs nothing and lets the media query pick the source.
        <picture>
          <source
            srcSet={NEON_ANIMATED_SRC}
            type="image/webp"
            media="(prefers-reduced-motion: no-preference)"
          />
          <img
            src={asset.src}
            width={asset.width}
            height={asset.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            alt={decorative ? "" : asset.alt}
            aria-hidden={decorative || undefined}
            className={imgClass}
          />
        </picture>
      ) : (
        <Image
          src={asset.src}
          width={asset.width}
          height={asset.height}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          alt={decorative ? "" : asset.alt}
          aria-hidden={decorative || undefined}
          className={imgClass}
        />
      )}
    </div>
  );
}
