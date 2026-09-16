import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";

import { AgeGate } from "@/components/AgeGate";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { business } from "@/data/business";
import { AGE_GATE_INLINE_SCRIPT } from "@/lib/age-gate";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";

import "./globals.css";

/** Display face for headlines — poster weight, nightlife energy. */
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

/** Body face — chosen for readability at small sizes on dark backgrounds. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.site.url),
  title: {
    default: `Vape Shop in ${business.address.city}, ${business.address.region} | ${business.shortName}`,
    template: `%s | ${business.shortName} ${business.address.city}`,
  },
  description:
    "Vapor Pulse is a local vape shop on N O'Connor Rd in Irving, TX. Large selection of disposables, devices, e-liquid, pods and coils, with staff who help you find the right fit. Stop in or call.",
  applicationName: business.site.name,
  keywords: [
    "vape shop Irving TX",
    "vape store Irving",
    "e-liquid Irving TX",
    "disposable vapes Irving TX",
    "vape supplies Irving TX",
  ],
  alternates: { canonical: business.site.url },
  openGraph: {
    type: "website",
    siteName: business.site.name,
    locale: business.site.locale,
    url: business.site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The age-gate script stamps data-age-ok on <html> before hydration, which
    // React would otherwise flag as a server/client attribute mismatch.
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable}`}
      // Tells the router we own smooth scrolling, so it can disable it during
      // route transitions instead of animating the jump to the new page.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Marks the document before first paint when this device already
            passed the age gate, so returning visitors never see it flash. */}
        <script
          dangerouslySetInnerHTML={{ __html: AGE_GATE_INLINE_SCRIPT }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="btn btn-primary sr-only z-[110] focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:h-11 focus:px-5"
        >
          Skip to content
        </a>

        <Header />

        {/* Bottom padding clears the fixed mobile action bar. */}
        <main id="main" className="pb-24 lg:pb-0">
          {children}
        </main>

        <Footer />
        <MobileActionBar />
        <AgeGate />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </body>
    </html>
  );
}
