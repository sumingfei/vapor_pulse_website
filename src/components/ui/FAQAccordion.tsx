"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

import type { Faq } from "@/data/faqs";
import { cn } from "@/lib/utils";

/**
 * Accessible FAQ accordion.
 *
 * Answers stay in the DOM (hidden with `hidden`) so the text is crawlable and
 * findable with in-page search. Each trigger is a real button with
 * aria-expanded / aria-controls.
 */
export function FAQAccordion({
  faqs,
  className,
  defaultOpen,
  headingLevel: Heading = "h3",
}: {
  faqs: Faq[];
  className?: string;
  /** Index of the item open on first render. */
  defaultOpen?: number;
  /**
   * Keeps the document outline correct: "h2" when the accordion sits directly
   * under the page h1, "h3" when it is nested inside a section heading.
   */
  headingLevel?: "h2" | "h3";
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);
  const baseId = useId();

  return (
    <div className={cn("divide-fog-400/10 divide-y", className)}>
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={faq.question}>
            <Heading>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-4 py-5 text-left"
              >
                <span
                  className={cn(
                    "text-base font-semibold transition-colors sm:text-lg",
                    isOpen
                      ? "text-fog-50"
                      : "text-fog-200 group-hover:text-fog-50",
                  )}
                >
                  {faq.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "border-fog-400/20 text-fog-400 mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-200",
                    isOpen &&
                      "border-pulse-cyan/40 text-pulse-cyan rotate-45",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="pb-5"
            >
              <p className="text-fog-400 max-w-3xl text-sm leading-relaxed sm:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
