"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

import { DAY_LABEL, DAY_ORDER, business, type DayKey } from "@/data/business";
import { track } from "@/lib/analytics";
import { formatDayHours, getStoreToday } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** getStoreToday returns a stable string, so it is safe as a snapshot. */
function getTodaySnapshot(): DayKey {
  return getStoreToday();
}

/** The day only rolls over at midnight; an hourly check is plenty. */
function subscribeToday(onChange: () => void) {
  const id = window.setInterval(onChange, 60 * 60 * 1000);
  return () => window.clearInterval(id);
}

/**
 * The full seven-day hours table.
 *
 * All rows render on the server so the hours are in the HTML for crawlers.
 * Only the "today" highlight waits for hydration, since the current day
 * depends on the store's clock rather than build time.
 */
export function StoreHours({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  // Which day is "today" depends on the store's clock, not build time, so it
  // is read on the client after hydration.
  const today = useSyncExternalStore(subscribeToday, getTodaySnapshot, () => null);
  const ref = useRef<HTMLDListElement>(null);

  // Fire once the hours are actually on screen — mounting far below the fold
  // is not the same as someone reading them.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        track("view_hours", { surface: compact ? "compact" : "table" });
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [compact]);

  return (
    <dl ref={ref} className={cn("divide-fog-400/10 divide-y", className)}>
      {DAY_ORDER.map((day) => {
        const isToday = today === day;
        return (
          <div
            key={day}
            className={cn(
              "flex items-baseline justify-between gap-4 transition-colors",
              compact ? "py-1.5 text-sm" : "py-2.5",
              isToday && "text-fog-50",
            )}
          >
            <dt
              className={cn(
                "flex items-center gap-2",
                isToday ? "text-fog-50 font-semibold" : "text-fog-400",
              )}
            >
              {isToday && (
                <span
                  aria-hidden
                  className="bg-pulse-cyan size-1.5 shrink-0 rounded-full"
                />
              )}
              {DAY_LABEL[day]}
              {isToday && <span className="sr-only">(today)</span>}
            </dt>
            <dd
              className={cn(
                "tabular-nums",
                isToday ? "text-fog-50 font-semibold" : "text-fog-200",
              )}
            >
              {formatDayHours(business.hours[day])}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
