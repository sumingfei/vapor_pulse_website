import { FileWarning } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { business } from "@/data/business";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "Terms governing the use of the Vapor Pulse Irving website.",
  path: "/terms",
  index: false,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Terms", path: "/terms" },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        description="The ground rules for using this website."
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
            This is a structural outline only. Have counsel draft the operative
            terms before launch, particularly around age-restricted products.
          </p>
        </div>

        <div className="panel space-y-8 p-7 sm:p-10">
          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Age requirement
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              This website is intended only for adults {business.ageRequirement}{" "}
              and over. By using it you confirm you meet that requirement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Informational use only
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              This site describes the categories of product carried at{" "}
              {business.name}. It is not an offer to sell, and it does not
              reflect live inventory. Product availability, pricing and any
              promotions are confirmed in store.
            </p>
          </div>

          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              No online ordering
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              No sale, reservation or shipment can be made through this website.
              All transactions take place in person at our Irving store.
            </p>
          </div>

          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Accuracy
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              We work to keep hours, contact details and descriptions current,
              but they can change without notice. Call {business.phone.display}{" "}
              if something needs confirming.
            </p>
          </div>

          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Contact
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              {business.name}, {business.address.full}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
