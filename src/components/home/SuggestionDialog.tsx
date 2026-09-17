"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { CheckCircle2, Lightbulb, Send, X } from "lucide-react";

import { sendSuggestion, type SuggestionState } from "@/app/actions/suggestion";
import { business } from "@/data/business";
import { useDialog } from "@/lib/use-dialog";
import { cn } from "@/lib/utils";

const INITIAL: SuggestionState = { status: "idle" };

/** "Give a Suggestion" button plus the modal form it opens. */
export function SuggestionDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(sendSuggestion, INITIAL);
  const id = useId();

  const dialogRef = useDialog<HTMLDivElement>({ open, onClose: () => setOpen(false) });

  // No provider configured: hand the composed message to the visitor's mail app.
  useEffect(() => {
    if (state.status === "unconfigured") window.location.href = state.mailto;
  }, [state]);

  const kept = (field: "suggestion" | "name" | "contact") =>
    state.status === "invalid" || state.status === "unconfigured" ? state.values[field] : undefined;

  const fieldClass = (error?: boolean) =>
    cn(
      "bg-ink-950/60 text-fog-50 placeholder:text-fog-500 w-full rounded-xl border px-4 py-3 text-sm transition-colors",
      "focus:border-pulse-cyan/60 focus:outline-none",
      error ? "border-amber-400/60" : "border-fog-400/20",
    );

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
            {state.status === "sent" ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto size-12 text-emerald-400" aria-hidden />
                <h2
                  id={`${id}-title`}
                  className="font-display mt-4 text-3xl uppercase leading-[0.95] tracking-tight"
                >
                  Thanks — got it
                </h2>
                <p className="text-fog-400 mt-3 text-sm leading-relaxed">
                  Your suggestion is in the shop inbox. We read every one.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn btn-secondary mt-6 h-11 px-6 text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form action={formAction} className="space-y-5">
                <div>
                  <h2
                    id={`${id}-title`}
                    className="font-display text-3xl uppercase leading-[0.95] tracking-tight"
                  >
                    Suggestion box
                  </h2>
                  <p className="text-fog-400 mt-2 text-sm">
                    A product we should stock, something we could do better —
                    anything. Goes straight to the shop.
                  </p>
                </div>

                {/* Honeypot — hidden from people, irresistible to bots. */}
                <div className="hidden" aria-hidden>
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div>
                  <label htmlFor={`${id}-suggestion`} className="text-fog-200 mb-1.5 block text-sm font-medium">
                    Your suggestion
                  </label>
                  <textarea
                    id={`${id}-suggestion`}
                    name="suggestion"
                    rows={5}
                    required
                    maxLength={2000}
                    defaultValue={kept("suggestion")}
                    aria-invalid={state.status === "invalid"}
                    aria-describedby={state.status === "invalid" ? `${id}-error` : undefined}
                    className={cn(fieldClass(state.status === "invalid"), "resize-y")}
                  />
                  {state.status === "invalid" && (
                    <p id={`${id}-error`} className="mt-1.5 text-xs text-amber-300">
                      {state.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${id}-name`} className="text-fog-200 mb-1.5 block text-sm font-medium">
                      Name <span className="text-fog-500 font-normal">(optional)</span>
                    </label>
                    <input
                      id={`${id}-name`}
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={80}
                      defaultValue={kept("name")}
                      className={fieldClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${id}-contact`} className="text-fog-200 mb-1.5 block text-sm font-medium">
                      Email or phone <span className="text-fog-500 font-normal">(optional)</span>
                    </label>
                    <input
                      id={`${id}-contact`}
                      name="contact"
                      type="text"
                      autoComplete="email"
                      maxLength={120}
                      defaultValue={kept("contact")}
                      className={fieldClass()}
                    />
                  </div>
                </div>

                {state.status === "error" && (
                  <p role="alert" className="text-sm text-amber-300">
                    {state.message}
                  </p>
                )}

                {state.status === "unconfigured" && (
                  <p role="status" className="text-fog-300 text-sm leading-relaxed">
                    Opening your mail app with the suggestion filled in. If
                    nothing happened,{" "}
                    <a href={state.mailto} className="text-pulse-cyan underline underline-offset-2">
                      tap here to send it
                    </a>{" "}
                    or email {business.email} directly.
                  </p>
                )}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="btn btn-ghost h-11 px-5 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={pending}
                    className="btn btn-primary h-11 px-6 text-sm disabled:opacity-60"
                  >
                    <Send className="size-4" aria-hidden />
                    {pending ? "Sending…" : "Submit"}
                  </button>
                </div>
              </form>
            )}

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
