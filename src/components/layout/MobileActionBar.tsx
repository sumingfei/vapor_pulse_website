"use client";

import { useState } from "react";
import { Clock, Navigation, Phone, X } from "lucide-react";

import { StoreHours } from "@/components/location/StoreHours";
import { StoreStatus } from "@/components/location/StoreStatus";
import { business } from "@/data/business";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Persistent mobile conversion bar: the three things a local searcher on a
 * phone actually wants. Fixed to the bottom, safe-area aware, and paired with
 * bottom padding on <main> so it never covers content.
 */
export function MobileActionBar() {
  const [hoursOpen, setHoursOpen] = useState(false);

  return (
    <>
      {hoursOpen && (
        <div className="fixed inset-0 z-[79] lg:hidden">
          <div
            className="bg-ink-950/70 absolute inset-0 backdrop-blur-sm"
            onClick={() => setHoursOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Store hours"
            className="panel panel-lit animate-fade-up absolute inset-x-3 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
                  Store Hours
                </h2>
                <p className="text-fog-500 mt-1 text-xs">Central Time</p>
              </div>
              <button
                type="button"
                onClick={() => setHoursOpen(false)}
                aria-label="Close hours"
                className="border-fog-400/20 text-fog-300 grid size-8 shrink-0 place-items-center rounded-lg border"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <StoreStatus className="mt-4 w-full justify-center" />
            <StoreHours className="mt-3" compact />
          </div>
        </div>
      )}

      <div
        className={cn(
          "border-fog-400/12 bg-ink-950/92 fixed inset-x-0 bottom-0 z-80 border-t backdrop-blur-xl lg:hidden",
          "pb-[env(safe-area-inset-bottom)]",
        )}
      >
        <div className="grid grid-cols-3 gap-1 px-2 py-2">
          <a
            href={business.google.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("click_directions", { location: "mobile_bar" })}
            className="btn btn-primary h-12 flex-col gap-0.5 text-[11px] font-semibold"
          >
            <Navigation className="size-4" aria-hidden />
            Directions
          </a>

          <a
            href={business.phone.href}
            onClick={() => track("click_call", { location: "mobile_bar" })}
            className="btn btn-secondary h-12 flex-col gap-0.5 text-[11px] font-semibold"
          >
            <Phone className="size-4" aria-hidden />
            Call
          </a>

          <button
            type="button"
            onClick={() => {
              setHoursOpen((open) => !open);
              track("view_hours", { surface: "mobile_bar" });
            }}
            aria-expanded={hoursOpen}
            className="btn btn-secondary h-12 flex-col gap-0.5 text-[11px] font-semibold"
          >
            <Clock className="size-4" aria-hidden />
            Hours
          </button>
        </div>
      </div>
    </>
  );
}
