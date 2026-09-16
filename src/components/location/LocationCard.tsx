import { MapPin, Phone } from "lucide-react";

import { CallButton } from "@/components/location/CallButton";
import { DirectionsButton } from "@/components/location/DirectionsButton";
import { StoreHours } from "@/components/location/StoreHours";
import { StoreStatus } from "@/components/location/StoreStatus";
import { business } from "@/data/business";
import { cn } from "@/lib/utils";

/**
 * Canonical NAP block. Every value comes from `business` — the address and
 * phone number are never typed by hand anywhere in the UI.
 */
export function LocationCard({
  className,
  showHours = true,
  location = "location_card",
}: {
  className?: string;
  showHours?: boolean;
  location?: string;
}) {
  return (
    <div className={cn("panel panel-lit p-6 sm:p-8", className)}>
      <StoreStatus />

      <h3 className="font-display text-fog-50 mt-5 text-2xl uppercase tracking-wide sm:text-3xl">
        {business.name}
      </h3>

      <address className="mt-4 space-y-3 not-italic">
        <a
          href={business.google.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-3"
        >
          <MapPin className="text-pulse-cyan mt-0.5 size-4 shrink-0" aria-hidden />
          <span className="text-fog-200 group-hover:text-fog-50 text-sm leading-relaxed transition-colors">
            {business.address.street}
            <br />
            {business.address.cityLine}
          </span>
        </a>

        <a href={business.phone.href} className="group flex items-center gap-3">
          <Phone className="text-pulse-cyan size-4 shrink-0" aria-hidden />
          <span className="text-fog-200 group-hover:text-fog-50 text-sm transition-colors">
            {business.phone.display}
          </span>
        </a>
      </address>

      {showHours && (
        <div className="border-fog-400/10 mt-6 border-t pt-5">
          <h4 className="text-fog-500 mb-2 text-xs font-semibold uppercase tracking-wider">
            Store Hours
          </h4>
          <StoreHours compact />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <DirectionsButton className="w-full sm:w-auto" location={location} />
        <CallButton className="w-full sm:w-auto" location={location} />
      </div>
    </div>
  );
}
