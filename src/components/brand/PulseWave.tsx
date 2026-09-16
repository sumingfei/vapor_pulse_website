import { cn } from "@/lib/utils";

/**
 * The heartbeat line from the Vapor Pulse logo, reused as a section divider
 * and accent. Draws itself once on mount, then holds still.
 */
export function PulseWave({
  className,
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1200 60"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
      className={cn("h-10 w-full", className)}
    >
      <defs>
        <linearGradient id="pulse-stroke" x1="0" y1="0" x2="1200" y2="0"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#62d2f9" stopOpacity="0" />
          <stop offset="0.18" stopColor="#62d2f9" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#e037f6" />
          <stop offset="0.82" stopColor="#805bf1" stopOpacity="0.9" />
          <stop offset="1" stopColor="#805bf1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 30 H420 l16 -20 l14 40 l13 -46 l16 52 l14 -26 h34 l12 -14 l13 28 l12 -18 h56 l14 -22 l13 44 l14 -50 l15 56 l13 -28 h503"
        stroke="url(#pulse-stroke)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "animate-trace" : undefined}
        style={{ "--trace-length": 1400 } as React.CSSProperties}
      />
    </svg>
  );
}
