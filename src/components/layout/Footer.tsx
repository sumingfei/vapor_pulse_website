import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Star } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { PuffMascot } from "@/components/brand/PuffMascot";
import { business } from "@/data/business";
import { footerNav, legalNav } from "@/data/navigation";
import { getGroupedHours } from "@/lib/hours";

const SOCIAL_LABELS: Record<keyof typeof business.social, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  x: "X",
  yelp: "Yelp",
};

export function Footer() {
  const groupedHours = getGroupedHours();

  /** Only profiles that have actually been configured are shown. */
  const socials = (
    Object.entries(business.social) as [
      keyof typeof business.social,
      string | null,
    ][]
  ).filter((entry): entry is [keyof typeof business.social, string] =>
    Boolean(entry[1]),
  );

  return (
    <footer className="border-fog-400/10 relative mt-24 overflow-hidden border-t">
      {/* PUFF neon sign glowing from the corner of the footer. */}
      <PuffMascot
        variant="neon"
        decorative
        className="pointer-events-none absolute -top-6 right-0 hidden w-52 opacity-[0.18] lg:block"
      />

      <div className="container-vp relative pt-14 pb-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" aria-label={`${business.name} — home`}>
              <Logo variant="wordmark" className="h-11" sizes="200px" />
            </Link>
            <p className="text-fog-400 mt-4 max-w-xs text-sm leading-relaxed">
              {business.description}
            </p>

            {socials.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {socials.map(([key, href]) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-fog-400/20 text-fog-400 hover:border-pulse-cyan/50 hover:text-pulse-cyan inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                    >
                      {SOCIAL_LABELS[key]}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                      <span className="sr-only">
                        ({business.shortName} on {SOCIAL_LABELS[key]}, opens in a
                        new tab)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-fog-50 text-sm font-semibold">Visit</h2>
            <address className="mt-4 space-y-3 not-italic">
              <a
                href={business.google.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fog-400 hover:text-fog-50 flex items-start gap-2.5 text-sm leading-relaxed transition-colors"
              >
                <MapPin className="text-pulse-cyan mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  {business.address.street}
                  <br />
                  {business.address.cityLine}
                </span>
              </a>
              <a
                href={business.phone.href}
                className="text-fog-400 hover:text-fog-50 flex items-center gap-2.5 text-sm transition-colors"
              >
                <Phone className="text-pulse-cyan size-4 shrink-0" aria-hidden />
                {business.phone.display}
              </a>
              <a
                href={business.google.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fog-400 hover:text-fog-50 flex items-center gap-2.5 text-sm transition-colors"
              >
                <Star className="size-4 shrink-0 fill-amber-400 text-amber-400" aria-hidden />
                {business.rating.value} on {business.rating.source}
              </a>
            </address>
          </div>

          <div>
            <h2 className="text-fog-50 text-sm font-semibold">Hours</h2>
            <dl className="mt-4 space-y-2">
              {groupedHours.map((group) => (
                <div key={group.days} className="text-sm">
                  <dt className="text-fog-200">{group.days}</dt>
                  <dd className="text-fog-500">{group.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="text-fog-500 mt-3 text-xs">Central Time</p>
          </div>

          <div>
            <h2 className="text-fog-50 text-sm font-semibold">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1">
              {footerNav.map((link) => (
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
          </div>
        </div>
      </div>

      <div className="container-vp flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-fog-500 text-xs">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {legalNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-fog-500 hover:text-fog-200 text-xs transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
