"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { ShieldCheck } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { PuffMascot } from "@/components/brand/PuffMascot";
import { business } from "@/data/business";
import {
  AGE_GATE_TTL_DAYS,
  getAgeVerificationServerSnapshot,
  getAgeVerificationSnapshot,
  subscribeAgeVerification,
  writeAgeVerification,
} from "@/lib/age-gate";
import { useDialog } from "@/lib/use-dialog";

/**
 * Age verification gate.
 *
 * Rendered in the server HTML and hidden pre-paint by CSS for devices that
 * have already verified (see AGE_GATE_INLINE_SCRIPT), so there is no flash in
 * either direction.
 *
 * This is a marketing/catalog site for a physical shop. This modal is a site
 * entry check — it is NOT age verification for online nicotine sales, which
 * requires real identity verification at point of purchase.
 */
export function AgeGate() {
  const verified = useSyncExternalStore(
    subscribeAgeVerification,
    getAgeVerificationSnapshot,
    getAgeVerificationServerSnapshot,
  );
  const [denied, setDenied] = useState(false);

  const handleConfirm = useCallback(() => {
    writeAgeVerification();
  }, []);

  // Escape must not dismiss an age gate.
  const dialogRef = useDialog<HTMLDivElement>({
    open: !verified,
    onClose: () => {},
    closeOnEscape: false,
  });

  if (verified) return null;

  return (
    <div
      // Hidden before hydration when the device already verified.
      className="age-gate bg-ink-950/95 fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-description"
    >
      <div
        aria-hidden
        className="glow-field top-1/4 left-1/2 h-72 w-[34rem] -translate-x-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(128,91,241,0.6) 0%, rgba(224,55,246,0.25) 45%, transparent 70%)",
        }}
      />

      <div
        ref={dialogRef}
        className="panel panel-lit relative my-auto w-full max-w-md p-6 text-center sm:p-8"
      >
        {!denied ? (
          <>
            <Logo
              variant="wordmark"
              className="mx-auto max-h-14 w-auto"
              priority
            />

            {/* h2, not h1: the page underneath owns the document's single h1. */}
            <h2
              id="age-gate-title"
              className="font-display mt-6 text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl"
            >
              Are you {business.ageRequirement} or older?
            </h2>

            <p
              id="age-gate-description"
              className="text-fog-400 mt-4 text-sm leading-relaxed"
            >
              You must be {business.ageRequirement} or older to enter this site.{" "}
              {business.shortName} sells age-restricted products and we card
              every customer, every time.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleConfirm}
                className="btn btn-primary h-12 w-full text-base"
              >
                Yes, I am {business.ageRequirement}+ — Enter
              </button>
              <button
                type="button"
                onClick={() => setDenied(true)}
                className="btn btn-secondary h-12 w-full text-base"
              >
                No, exit
              </button>
            </div>

            <p className="text-fog-500 mt-6 text-xs leading-relaxed">
              WARNING: This product contains nicotine. Nicotine is an addictive
              chemical.
            </p>
          </>
        ) : (
          <>
            <PuffMascot
              variant="neon"
              decorative
              className="mx-auto w-36"
            />
            <h2
              id="age-gate-title"
              className="font-display mt-5 text-3xl uppercase leading-[0.95] tracking-tight"
            >
              Come back when you&rsquo;re {business.ageRequirement}
            </h2>
            <p
              id="age-gate-description"
              className="text-fog-400 mt-4 text-sm leading-relaxed"
            >
              We can only sell to adults {business.ageRequirement} and over, and
              we would rather get this right than get your business.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <a
                href="https://www.google.com"
                className="btn btn-secondary h-12 w-full text-base"
              >
                Leave this site
              </a>
              <button
                type="button"
                onClick={() => setDenied(false)}
                className="btn btn-ghost h-10 w-full text-sm"
              >
                Go back
              </button>
            </div>
          </>
        )}

        <p className="text-fog-500/70 mt-6 flex items-center justify-center gap-1.5 text-[11px]">
          <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
          We remember your answer on this device for {AGE_GATE_TTL_DAYS} days.
        </p>
      </div>
    </div>
  );
}
