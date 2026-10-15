"use client";

import { useId, useState } from "react";
import { Lightbulb, X } from "lucide-react";

import { SuggestionForm } from "@/components/suggestion/SuggestionForm";
import { useDialog } from "@/lib/use-dialog";

/**
 * "Give a Suggestion" button plus the modal form it opens.
 *
 * The form lives in `SuggestionForm`, shared with the standalone `/suggest`
 * page so the modal and the page stay identical.
 */
export function SuggestionDialog() {
  const [open, setOpen] = useState(false);
  const id = useId();

  const dialogRef = useDialog<HTMLDivElement>({ open, onClose: () => setOpen(false) });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-primary h-12 px-6 text-base"
      >
        <Lightbulb className="size-4" aria-hidden />
        Give a Suggestion
      </button>

      {open && (
        <div
          className="bg-ink-950/85 fixed inset-0 z-[95] flex items-center justify-center overflow-y-auto p-4 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            className="panel panel-lit relative my-auto w-full max-w-lg p-6 sm:p-8"
          >
            <SuggestionForm
              headingId={`${id}-title`}
              onClose={() => setOpen(false)}
            />

            {/* Last in DOM order (but pinned top-right) so the textarea, not
                this button, receives focus when the dialog opens. */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="border-fog-400/20 text-fog-300 hover:text-fog-50 absolute top-4 right-4 grid size-9 place-items-center rounded-lg border transition-colors"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
