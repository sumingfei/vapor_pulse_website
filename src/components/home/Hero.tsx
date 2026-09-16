import Link from "next/link";

import { PuffMascot } from "@/components/brand/PuffMascot";
import { PuffQuote } from "@/components/brand/PuffQuote";
import { PulseWave } from "@/components/brand/PulseWave";
import { CallButton } from "@/components/location/CallButton";
import { DirectionsButton } from "@/components/location/DirectionsButton";
import { StoreStatus } from "@/components/location/StoreStatus";
import { RatingBadge } from "@/components/ui/RatingBadge";
import { business } from "@/data/business";

/**
 * The hero answers three questions before the visitor scrolls: where is this
 * place, why should I go, and how do I get there.
 *
 * On phones the directions and call buttons come first, then the PUFF neon
 * sign and today's quote. On desktop the sign is a focal point in its own
 * column.
 */
export function Hero() {
  return (
    <section className="grain relative overflow-hidden">
      {/* Brand light. Two fields only — restraint keeps the neon meaningful. */}
      <div
        aria-hidden
        className="glow-field -top-24 -left-24 h-[26rem] w-[26rem] opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(128,91,241,0.5) 0%, rgba(50,112,219,0.2) 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="glow-field top-10 right-0 h-[30rem] w-[30rem] opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(224,55,246,0.35) 0%, rgba(98,210,249,0.18) 48%, transparent 72%)",
        }}
      />

      <div className="container-vp relative pt-10 pb-14 sm:pt-14 lg:pt-20 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative">
            <p className="eyebrow relative">
              <span
                aria-hidden
                className="bg-pulse-cyan inline-block h-1.5 w-1.5 rounded-full"
              />
              {business.address.city}, {business.address.regionName} ·{" "}
              {business.address.street}
            </p>

            <h1 className="font-display relative mt-4 text-[3.25rem] leading-[0.88] uppercase tracking-tight sm:text-7xl lg:text-8xl">
              Feel the
              <br />
              <span className="text-neon-cyan">Pulse</span>
            </h1>

            <p className="font-display text-fog-100 relative mt-5 text-xl uppercase tracking-wide sm:text-2xl">
              Your Local Vape Shop in {business.address.city},{" "}
              {business.address.region}
            </p>

            <p className="text-fog-400 relative mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
              A big selection of vape products and a local team that will help
              you find what you are actually looking for. Come in, tell us what
              you run, and we will take it from there.
            </p>

            <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <DirectionsButton size="lg" className="w-full sm:w-auto" location="hero" />
              <CallButton
                size="lg"
                className="w-full sm:w-auto"
                label="Call Vapor Pulse"
                location="hero"
              />
              <Link
                href="/products"
                className="btn btn-ghost h-13 px-2 text-base sm:px-4"
              >
                Explore Products →
              </Link>
            </div>

            <div className="relative mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <RatingBadge location="hero" />
              <span aria-hidden className="bg-fog-400/20 hidden h-4 w-px sm:block" />
              <StoreStatus variant="inline" className="text-sm" />
            </div>
          </div>

          {/* Stacks under the status row on phones; its own column on desktop. */}
          <div className="flex flex-col items-center gap-6">
            <PuffMascot
              variant="neon"
              animated
              decorative
              priority
              float
              glow="violet"
              className="w-56 sm:w-64 lg:w-[clamp(20rem,26vw,26rem)]"
            />

            {/* PUFF's line for today, sitting under the sign. */}
            <PuffQuote />
          </div>
        </div>
      </div>

      <PulseWave className="relative -mb-px h-10 opacity-70" />
    </section>
  );
}
