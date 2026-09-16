"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MapPin, Phone, X } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { CallButton } from "@/components/location/CallButton";
import { DirectionsButton } from "@/components/location/DirectionsButton";
import { StoreStatus } from "@/components/location/StoreStatus";
import { business } from "@/data/business";
import { legalNav, mainNav } from "@/data/navigation";
import { useDialog } from "@/lib/use-dialog";
import { cn } from "@/lib/utils";

export function MobileNavigation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const dialogRef = useDialog<HTMLDivElement>({ open, onClose });

  // Close the drawer when navigation completes.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[90] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      // `inert` removes the closed drawer from both the tab order and the
      // accessibility tree, so nothing inside is reachable while hidden.
      inert={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "bg-ink-950/80 absolute inset-0 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal={open}
        aria-label="Menu"
        className={cn(
          "bg-ink-900 border-fog-400/10 absolute inset-y-0 right-0 flex w-[min(20rem,88vw)] flex-col border-l shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="border-fog-400/10 flex h-16 shrink-0 items-center justify-between border-b px-5">
          <Logo variant="wordmark" decorative className="h-8" sizes="140px" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="border-fog-400/20 text-fog-200 hover:text-fog-50 grid size-9 place-items-center rounded-lg border transition-colors"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          <StoreStatus className="w-full justify-center" />

          <nav aria-label="Mobile" className="mt-5">
            <ul className="space-y-0.5">
              {mainNav.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-pulse-cyan/10 text-fog-50"
                          : "text-fog-300 hover:bg-fog-50/5 hover:text-fog-50",
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span
                          aria-hidden
                          className="bg-pulse-cyan size-1.5 rounded-full"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-fog-400/10 mt-6 space-y-3 border-t pt-5">
            <a
              href={business.google.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fog-400 hover:text-fog-50 flex items-start gap-2.5 text-sm transition-colors"
            >
              <MapPin className="text-pulse-cyan mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                {business.address.street}
                <br />
                {business.address.cityLine}
              </span>
            </a>
            <a
              href={business.phone.href}
              className="text-fog-400 hover:text-fog-50 flex items-center gap-2.5 text-sm transition-colors"
            >
              <Phone className="text-pulse-cyan size-4 shrink-0" aria-hidden />
              {business.phone.display}
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="text-fog-500 hover:text-fog-200 text-xs transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-fog-400/10 grid shrink-0 grid-cols-2 gap-2.5 border-t p-5">
          <DirectionsButton
            className="w-full"
            size="md"
            label="Directions"
            location="mobile_drawer"
          />
          <CallButton className="w-full" size="md" label="Call" location="mobile_drawer" />
        </div>
      </div>
    </div>
  );
}
