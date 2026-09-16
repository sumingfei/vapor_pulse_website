import type { Metadata } from "next";
import Link from "next/link";

import { PuffMascot } from "@/components/brand/PuffMascot";
import { CallButton } from "@/components/location/CallButton";
import { DirectionsButton } from "@/components/location/DirectionsButton";
import { mainNav } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="glow-field top-0 left-1/2 h-80 w-[38rem] -translate-x-1/2 opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(128,91,241,0.5) 0%, rgba(224,55,246,0.2) 48%, transparent 72%)",
        }}
      />

      <div className="container-vp relative flex flex-col items-center py-20 text-center sm:py-28">
        <PuffMascot
          variant="neon"
          decorative
          float
          className="w-40 sm:w-52"
        />

        <p className="eyebrow mt-8">Error 404</p>

        <h1 className="font-display mt-3 text-4xl uppercase leading-[0.92] tracking-tight sm:text-6xl">
          PUFF can&rsquo;t find
          <br />
          <span className="text-neon-cyan">that one</span>
        </h1>

        <p className="text-fog-400 mt-5 max-w-md text-base leading-relaxed">
          The page you were after has moved or never existed. The shop, however,
          is exactly where it has always been.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <DirectionsButton size="lg" location="404" />
          <CallButton size="lg" showNumber location="404" />
        </div>

        <nav aria-label="Site" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-fog-400 hover:text-pulse-cyan text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
