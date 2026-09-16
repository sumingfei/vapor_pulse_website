"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]",
].join(",");

/** Real tab stops only: skips tabindex="-1" and anything display:none. */
function focusablesIn(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.tabIndex >= 0 && el.offsetParent !== null,
  );
}

/**
 * Modal plumbing shared by the age gate and the mobile nav drawer:
 * focus moves in on open, Tab is trapped inside, Escape closes, background
 * scrolling is locked, and focus returns to the trigger on close.
 */
export function useDialog<T extends HTMLElement>({
  open,
  onClose,
  /** The age gate cannot be dismissed with Escape. */
  closeOnEscape = true,
}: {
  open: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
}) {
  const containerRef = useRef<T>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    focusablesIn(containerRef.current)[0]?.focus();

    const { overflow, paddingRight } = document.body.style;
    // Compensate for the removed scrollbar so the page does not shift.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusablesIn(containerRef.current);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose, closeOnEscape]);

  return containerRef;
}
