"use client";

import { Navigation } from "lucide-react";

import { business } from "@/data/business";
import { track } from "@/lib/analytics";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/Button";

type DirectionsButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label?: string;
  location?: string;
};

/** Primary conversion action across the whole site. */
export function DirectionsButton({
  variant = "primary",
  size = "md",
  className,
  label = "Get Directions",
  location = "unknown",
}: DirectionsButtonProps) {
  return (
    <a
      href={business.google.directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("click_directions", { location })}
      className={buttonClasses({ variant, size, className })}
    >
      <Navigation className="size-4 shrink-0" aria-hidden />
      <span>{label}</span>
    </a>
  );
}
