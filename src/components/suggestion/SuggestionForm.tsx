"use client";

import { useActionState, useEffect, useId } from "react";
import { CheckCircle2, Send } from "lucide-react";

import { sendSuggestion, type SuggestionState } from "@/app/actions/suggestion";
import { business } from "@/data/business";
import { cn } from "@/lib/utils";

const INITIAL: SuggestionState = { status: "idle" };

/**
 * The suggestion form itself — heading, fields and the sent confirmation.
 *
 * Shared by the modal (`SuggestionDialog`) and the standalone `/suggest`
 * page, so the two can never drift apart. `onClose` is what the modal passes
 * to get a Cancel/Done button; the page leaves it out and renders neither.
 */
export function SuggestionForm({
  headingId,
  onClose,
  className,
}: {
  /** Set by the dialog so it can point aria-labelledby at the heading. */
  headingId?: string;
  onClose?: () => void;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(sendSuggestion, INITIAL);
  const id = useId();
  const titleId = headingId ?? `${id}-title`;

  // No provider configured: hand the composed message to the visitor's mail app.
  useEffect(() => {
    if (state.status === "unconfigured") window.location.href = state.mailto;
  }, [state]);

  const kept = (field: "suggestion" | "name" | "contact") =>
    state.status === "invalid" || state.status === "unconfigured"
      ? state.values[field]
      : undefined;

  const fieldClass = (error?: boolean) =>
    cn(
      "bg-ink-950/60 text-fog-50 placeholder:text-fog-500 w-full rounded-xl border px-4 py-3 text-sm transition-colors",
      "focus:border-pulse-cyan/60 focus:outline-none",
      error ? "border-amber-400/60" : "border-fog-400/20",
    );

  if (state.status === "sent") {
    return (
      <div className={cn("py-6 text-center", className)}>
        <CheckCircle2 className="mx-auto size-12 text-emerald-400" aria-hidden />
        <h2
          id={titleId}
          className="font-display mt-4 text-3xl uppercase leading-[0.95] tracking-tight"
        >
          Thanks — got it
        </h2>
        <p className="text-fog-400 mt-3 text-sm leading-relaxed">
          Your suggestion is in the shop inbox. We read every one.
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary mt-6 h-11 px-6 text-sm"
          >
            Done
          </button>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className={cn("space-y-5", className)}>
      <div>
        <h2
          id={titleId}
          className="font-display text-3xl uppercase leading-[0.95] tracking-tight"
        >
          Suggestion box
        </h2>
        <p className="text-fog-400 mt-2 text-sm">
          A product we should stock, something we could do better — anything.
          Goes straight to the shop.
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
        <label
          htmlFor={`${id}-suggestion`}
          className="text-fog-200 mb-1.5 block text-sm font-medium"
        >
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
          <label
            htmlFor={`${id}-name`}
            className="text-fog-200 mb-1.5 block text-sm font-medium"
          >
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
          <label
            htmlFor={`${id}-contact`}
            className="text-fog-200 mb-1.5 block text-sm font-medium"
          >
            Email or phone{" "}
            <span className="text-fog-500 font-normal">(optional)</span>
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
          Opening your mail app with the suggestion filled in. If nothing
          happened,{" "}
          <a
            href={state.mailto}
            className="text-pulse-cyan underline underline-offset-2"
          >
            tap here to send it
          </a>{" "}
          or email {business.email} directly.
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost h-11 px-5 text-sm"
          >
            Cancel
          </button>
        )}
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
  );
}
