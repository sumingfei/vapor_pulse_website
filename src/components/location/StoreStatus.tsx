"use client";

import { useSyncExternalStore } from "react";

import {
  getGroupedHours,
  getStoreStatus,
  type StoreStatus as Status,
} from "@/lib/hours";
import { cn } from "@/lib/utils";

/**
 * Live open/closed badge.
 *
 * Computed entirely on the client so the surrounding pages stay statically
 * rendered — a build-time status would be stale the moment it shipped. The
 * calculation always runs in the store's timezone, never the visitor's.
 *
 * Before hydration we render the store's standard hours at identical
 * dimensions, so there is no layout shift and no hydration mismatch.
 */
const FALLBACK = getGroupedHours()[0]?.hours ?? "";

/**
 * Snapshot is cached and only replaced when the rendered text actually
 * changes, so useSyncExternalStore sees a stable reference between ticks.
 */
let cachedStatus: Status | null = null;
let cachedKey = "";

function getSnapshot(): Status {
  const next = getStoreStatus();
  const key = `${next.isOpen}|${next.label}|${next.detail}`;
  if (key !== cachedKey) {
    cachedKey = key;
    cachedStatus = next;
  }
  return cachedStatus as Status;
}

function getServerSnapshot(): Status | null {
  return null;
}

/** Re-check every minute so the badge flips at opening and closing time. */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

type StoreStatusProps = {
  className?: string;
  /** `pill` for chips and bars, `inline` for body text. */
  variant?: "pill" | "inline";
};

export function StoreStatus({ className, variant = "pill" }: StoreStatusProps) {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isOpen = status?.isOpen ?? false;
  const dotColor = status
    ? isOpen
      ? "bg-emerald-400"
      : "bg-amber-400"
    : "bg-fog-500";

  const label = status ? status.label : "Today";
  const detail = status ? status.detail : FALLBACK;

  const dot = (
    <span className="relative flex size-2.5 shrink-0">
      {status && isOpen && (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      )}
      <span className={cn("relative inline-flex size-2.5 rounded-full", dotColor)} />
    </span>
  );

  if (variant === "inline") {
    return (
      <span className={cn("inline-flex items-center gap-2", className)}>
        {dot}
        <span
          className={cn(
            "font-semibold",
            status && isOpen ? "text-emerald-300" : "text-fog-100",
          )}
        >
          {label}
        </span>
        <span className="text-fog-400">· {detail}</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-sm",
        status && isOpen
          ? "border-emerald-400/30 bg-emerald-400/10"
          : "border-fog-400/20 bg-fog-50/5",
        className,
      )}
    >
      {dot}
      <span
        className={cn(
          "font-semibold",
          status && isOpen ? "text-emerald-300" : "text-fog-100",
        )}
      >
        {label}
      </span>
      {/* Always shown: "Closed" on its own does not tell anyone when to come. */}
      <span className="text-fog-400">· {detail}</span>
    </span>
  );
}
