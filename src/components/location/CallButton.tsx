"use client";

import { Phone } from "lucide-react";

import { business } from "@/data/business";
import { track } from "@/lib/analytics";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/Button";

type CallButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Defaults to "Call Store". */
  label?: string;
  /** Append the phone number after the label. */
  showNumber?: boolean;
  /** Where the click happened, for analytics segmentation. */
  location?: string;
};

export function CallButton({
  variant = "secondary",
  size = "md",
  className,
  label = "Call Store",
  showNumber = false,
  location = "unknown",
}: CallButtonProps) {
  return (
    <a
      href={business.phone.href}
      onClick={() => track("click_call", { location })}
      className={buttonClasses({ variant, size, className })}
    >
      <Phone className="size-4 shrink-0" aria-hidden />
      <span>
        {label}
        {showNumber && (
          <span className="hidden sm:inline"> · {business.phone.display}</span>
        )}
      </span>
    </a>
  );
}
