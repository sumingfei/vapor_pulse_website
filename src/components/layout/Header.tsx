"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin, Menu, Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { DirectionsButton } from "@/components/location/DirectionsButton";
import { StoreStatus } from "@/components/location/StoreStatus";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { business } from "@/data/business";
import { mainNav } from "@/data/navigation";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Local info strip — the shop's status, address and number above
          everything else. Scrolls away with the page. */}
      <div className="border-fog-400/10 bg-ink-900/60 hidden border-b lg:block">
        <div className="container-vp flex h-10 items-center justify-between gap-6 text-xs">
          <StoreStatus variant="inline" />
          <div className="flex items-center gap-5">
            <a
              href={business.google.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fog-400 hover:text-fog-50 flex items-center gap-1.5 transition-colors"
            >
              <MapPin className="size-3.5" aria-hidden />
              {business.address.full}
            </a>
            <a
              href={business.phone.href}
              onClick={() => track("click_call", { location: "header_strip" })}
              className="text-fog-400 hover:text-pulse-cyan flex items-center gap-1.5 font-semibold transition-colors"
            >
              <Phone className="size-3.5" aria-hidden />
              {business.phone.display}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-fog-400/10 bg-ink-950/85 border-b backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="container-vp flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            aria-label={`${business.name} — home`}
            className="shrink-0"
          >
            <Logo
              variant="wordmark"
              priority
              className="h-9 max-w-none sm:h-10"
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-fog-50"
                          : "text-fog-400 hover:text-fog-50",
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span
                          aria-hidden
                          className="bg-pulse-cyan absolute inset-x-3 -bottom-0.5 h-px"
                          style={{
                            boxShadow: "0 0 10px 1px rgba(98,210,249,0.8)",
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={business.phone.href}
              aria-label={`Call ${business.name} at ${business.phone.display}`}
              onClick={() => track("click_call", { location: "header" })}
              className="border-fog-400/20 text-fog-200 hover:border-pulse-cyan/50 hover:text-pulse-cyan grid size-10 place-items-center rounded-xl border transition-colors lg:size-11"
            >
              <Phone className="size-4" aria-hidden />
            </a>

            <DirectionsButton
              className="hidden sm:inline-flex"
              location="header"
            />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="border-fog-400/20 text-fog-200 hover:border-pulse-cyan/50 hover:text-pulse-cyan grid size-10 place-items-center rounded-xl border transition-colors lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
