"use client";

import { useSyncExternalStore } from "react";

import { getPuffQuoteOfTheDay } from "@/data/puff-quotes";
import { cn } from "@/lib/utils";

/**
 * PUFF's line for today.
 *
 * Pages are statically prerendered, so the day cannot be baked in at build
 * time — the quote resolves on the client in the store's timezone, like the
 * open/closed badge. The server renders a same-height placeholder so nothing
 * shifts when it appears.
 */
function subscribe(onChange: () => void) {
  // The day only rolls over at midnight; an hourly check is plenty.
  const id = window.setInterval(onChange, 60 * 60 * 1000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  return getPuffQuoteOfTheDay();
}

function getServerSnapshot(): string | null {
  return null;
}

export function PuffQuote({ className }: { className?: string }) {
  const quote = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <figure
      className={cn("min-h-[5.5rem] max-w-sm text-center", className)}
      aria-live="polite"
    >
      {quote && (
        <>
          <blockquote className="text-fog-300 text-sm leading-relaxed italic sm:text-base">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <figcaption className="eyebrow mt-3 justify-center">
            &mdash; PUFF
          </figcaption>
        </>
      )}
    </figure>
  );
}
