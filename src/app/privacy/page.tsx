import { FileWarning } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { business } from "@/data/business";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Vapor Pulse in Irving, TX handles information collected through this website.",
  path: "/privacy",
  index: false,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy", path: "/privacy" },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="What this website collects, and what it does not."
        breadcrumbs={crumbs}
      />

      <section className="container-vp pb-16">
        <div
          role="note"
          className="border-amber-400/25 bg-amber-400/[0.06] mb-6 flex items-start gap-3 rounded-xl border p-4"
        >
          <FileWarning className="mt-0.5 size-5 shrink-0 text-amber-400" aria-hidden />
          <p className="text-fog-300 text-sm leading-relaxed">
            <span className="text-fog-50 font-semibold">
              Placeholder — needs legal review.
            </span>{" "}
            The statements below describe how this website is currently built.
            They are not a substitute for a privacy policy reviewed against
            Texas and federal requirements for your business. Replace this
            notice once counsel has signed off.
          </p>
        </div>

        <div className="panel space-y-8 p-7 sm:p-10">
          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              What this site collects
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              This website has no accounts, no shopping cart and no payment
              processing. We do not ask for your name, address or payment
              details anywhere on it.
            </p>
          </div>

          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Age confirmation
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              When you confirm you are {business.ageRequirement} or older, that
              answer is saved in your own browser&rsquo;s local storage so you
              are not asked again for 30 days. It stays on your device and is
              not transmitted to us.
            </p>
          </div>

          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Analytics
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              The site is built to support privacy-respecting analytics for
              aggregate measurements such as how many visitors tapped
              &ldquo;call&rdquo; or &ldquo;directions&rdquo;. If and when an
              analytics provider is enabled, this section should name the
              provider, what it stores and how long it retains it.
            </p>
          </div>

          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Third-party embeds
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              Our location pages embed a Google map, and our review links point
              to Google. Those services receive your request and apply their own
              privacy policies when you interact with them.
            </p>
          </div>

          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Contact
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              Questions about this policy can go to {business.name},{" "}
              {business.address.full}, or {business.phone.display}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
