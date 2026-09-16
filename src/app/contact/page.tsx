import { Mail, MapPin, Phone } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { CallButton } from "@/components/location/CallButton";
import { DirectionsButton } from "@/components/location/DirectionsButton";
import { LocationCard } from "@/components/location/LocationCard";
import { StoreMap } from "@/components/location/StoreMap";
import { StoreHours } from "@/components/location/StoreHours";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  LeaveReviewButton,
  ReadReviewsButton,
} from "@/components/ui/ReviewButtons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/data/business";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Location",
  description: `Call Vapor Pulse at ${business.phone.display} or visit us at ${business.address.full}. Directions, hours and the fastest way to reach the shop.`,
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Get in touch"
        title="Call, or Come See Us"
        description="The quickest answers come from the counter. Give us a ring during opening hours, or drop in — we are on N O'Connor Rd in Irving."
        breadcrumbs={crumbs}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CallButton
            variant="primary"
            size="lg"
            showNumber
            location="contact_header"
          />
          <DirectionsButton variant="secondary" size="lg" location="contact_header" />
        </div>
      </PageHeader>

      <section className="container-vp pb-14">
        <div className="grid gap-5 lg:grid-cols-3">
          <a
            href={business.phone.href}
            className="panel panel-lit panel-hover p-6"
          >
            <span
              aria-hidden
              className="border-pulse-cyan/25 bg-pulse-cyan/10 text-pulse-cyan grid size-11 place-items-center rounded-xl border"
            >
              <Phone className="size-5" />
            </span>
            <h2 className="font-display text-fog-50 mt-4 text-lg uppercase tracking-wide">
              Phone
            </h2>
            <p className="text-fog-100 mt-1 text-sm font-semibold">
              {business.phone.display}
            </p>
            <p className="text-fog-500 mt-1 text-xs">
              Best for stock checks and quick questions.
            </p>
          </a>

          <a
            href={business.google.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="panel panel-lit panel-hover p-6"
          >
            <span
              aria-hidden
              className="border-pulse-cyan/25 bg-pulse-cyan/10 text-pulse-cyan grid size-11 place-items-center rounded-xl border"
            >
              <MapPin className="size-5" />
            </span>
            <h2 className="font-display text-fog-50 mt-4 text-lg uppercase tracking-wide">
              Address
            </h2>
            <p className="text-fog-100 mt-1 text-sm font-semibold">
              {business.address.street}
            </p>
            <p className="text-fog-500 mt-1 text-xs">
              {business.address.cityLine}
            </p>
          </a>

          <div className="panel panel-lit p-6">
            <span
              aria-hidden
              className="border-fog-400/20 bg-fog-50/5 text-fog-400 grid size-11 place-items-center rounded-xl border"
            >
              <Mail className="size-5" />
            </span>
            <h2 className="font-display text-fog-50 mt-4 text-lg uppercase tracking-wide">
              Email
            </h2>
            {business.email ? (
              <>
                <a
                  href={`mailto:${business.email}`}
                  className="text-fog-100 hover:text-pulse-cyan mt-1 block text-sm font-semibold transition-colors"
                >
                  {business.email}
                </a>
                <p className="text-fog-500 mt-1 text-xs">Send us a message</p>
              </>
            ) : (
              <p className="text-fog-400 mt-1 text-sm leading-relaxed">
                We handle enquiries by phone and in store — that way you get an
                answer the same day.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="container-vp pb-14">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <LocationCard location="contact_page" showHours={false} />
          <StoreMap className="min-h-80 lg:min-h-full" />
        </div>
      </section>

      <section className="container-vp pb-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="panel p-6 sm:p-8">
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Opening Hours
            </h2>
            <p className="text-fog-500 mt-1 text-xs">Central Time</p>
            <StoreHours className="mt-4" />
          </div>

          <div className="panel panel-lit flex flex-col p-6 sm:p-8">
            <SectionHeading
              eyebrow="Reviews"
              title="Been in Already?"
              description="Reviews genuinely help a local shop. If we got it right, telling people takes a minute."
              as="h2"
            />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ReadReviewsButton variant="secondary" location="contact_reviews" />
              <LeaveReviewButton variant="primary" location="contact_reviews" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
