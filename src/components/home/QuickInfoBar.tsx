import { Clock, MapPin, Phone, Star } from "lucide-react";

import { StoreStatus } from "@/components/location/StoreStatus";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { business } from "@/data/business";

/**
 * The four things a local searcher needs, immediately under the hero.
 * Every tile is a real target: map, tel, reviews, hours.
 */
export function QuickInfoBar() {
  return (
    <section aria-label="Store information at a glance" className="relative">
      <div className="container-vp">
        <div className="panel panel-lit grid divide-y divide-fog-400/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          <a
            href="#hours"
            className="hover:bg-fog-50/[0.03] group flex items-center gap-3.5 p-5 transition-colors"
          >
            <span
              aria-hidden
              className="border-fog-400/15 bg-fog-50/5 text-pulse-cyan grid size-10 shrink-0 place-items-center rounded-xl border"
            >
              <Clock className="size-4.5" />
            </span>
            <span className="min-w-0">
              <span className="text-fog-500 block text-[11px] font-semibold uppercase tracking-wider">
                Today
              </span>
              <StoreStatus variant="inline" className="mt-0.5 text-sm" />
            </span>
          </a>

          <TrackedLink
            href={business.google.mapsUrl}
            event="click_directions"
            location="quick_info"
            external
            className="hover:bg-fog-50/[0.03] group flex items-center gap-3.5 p-5 transition-colors"
          >
            <span
              aria-hidden
              className="border-fog-400/15 bg-fog-50/5 text-pulse-cyan grid size-10 shrink-0 place-items-center rounded-xl border"
            >
              <MapPin className="size-4.5" />
            </span>
            <span className="min-w-0">
              <span className="text-fog-500 block text-[11px] font-semibold uppercase tracking-wider">
                Find us
              </span>
              <span className="text-fog-100 group-hover:text-fog-50 mt-0.5 block truncate text-sm font-semibold">
                {business.address.street}
              </span>
              <span className="text-fog-500 block text-xs">
                {business.address.cityLine}
              </span>
            </span>
          </TrackedLink>

          <TrackedLink
            href={business.google.reviewsUrl}
            event="click_google_reviews"
            location="quick_info"
            external
            className="hover:bg-fog-50/[0.03] group flex items-center gap-3.5 p-5 transition-colors"
          >
            <span
              aria-hidden
              className="border-fog-400/15 bg-fog-50/5 grid size-10 shrink-0 place-items-center rounded-xl border text-amber-400"
            >
              <Star className="size-4.5" />
            </span>
            <span className="min-w-0">
              <span className="text-fog-500 block text-[11px] font-semibold uppercase tracking-wider">
                Reputation
              </span>
              <span className="text-fog-100 group-hover:text-fog-50 mt-0.5 block text-sm font-semibold">
                {business.rating.value} ★ on {business.rating.source}
              </span>
              <span className="text-fog-500 block text-xs">
                {business.rating.displayCount} reviews
              </span>
            </span>
          </TrackedLink>

          <TrackedLink
            href={business.phone.href}
            event="click_call"
            location="quick_info"
            className="hover:bg-fog-50/[0.03] group flex items-center gap-3.5 p-5 transition-colors"
          >
            <span
              aria-hidden
              className="border-pulse-cyan/30 bg-pulse-cyan/10 text-pulse-cyan grid size-10 shrink-0 place-items-center rounded-xl border"
            >
              <Phone className="size-4.5" />
            </span>
            <span className="min-w-0">
              <span className="text-fog-500 block text-[11px] font-semibold uppercase tracking-wider">
                Ask us anything
              </span>
              <span className="text-fog-100 group-hover:text-pulse-cyan mt-0.5 block text-sm font-semibold transition-colors">
                {business.phone.display}
              </span>
            </span>
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
