"use client";

import { PenLine, Star } from "lucide-react";

import { business } from "@/data/business";
import { track } from "@/lib/analytics";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/Button";

type ReviewButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  location?: string;
};

export function ReadReviewsButton({
  variant = "secondary",
  size = "md",
  className,
  location = "unknown",
}: ReviewButtonProps) {
  return (
    <a
      href={business.google.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("click_google_reviews", { location })}
      className={buttonClasses({ variant, size, className })}
    >
      <Star className="size-4 shrink-0" aria-hidden />
      Read Google Reviews
    </a>
  );
}

export function LeaveReviewButton({
  variant = "ghost",
  size = "md",
  className,
  location = "unknown",
}: ReviewButtonProps) {
  return (
    <a
      href={business.google.writeReviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("click_leave_review", { location })}
      className={buttonClasses({ variant, size, className })}
    >
      <PenLine className="size-4 shrink-0" aria-hidden />
      Leave Us a Review
    </a>
  );
}
