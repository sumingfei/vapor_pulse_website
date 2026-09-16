"use client";

import Link from "next/link";

import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Anchor that records a conversion event. Lets surrounding sections stay
 * server components while still tracking the clicks that matter.
 */
export function TrackedLink({
  href,
  event,
  location,
  external = false,
  className,
  children,
  ...rest
}: {
  href: string;
  event: AnalyticsEvent;
  location: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event, { location })}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * Same idea for internal routes — keeps client-side navigation while still
 * recording the event.
 */
export function TrackedNavLink({
  href,
  event,
  location,
  className,
  children,
}: {
  href: string;
  event: AnalyticsEvent;
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track(event, { location })}
    >
      {children}
    </Link>
  );
}
