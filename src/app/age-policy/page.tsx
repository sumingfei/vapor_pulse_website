import { JsonLd } from "@/components/JsonLd";
import { CallButton } from "@/components/location/CallButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { business } from "@/data/business";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Age Policy",
  description: `You must be ${business.ageRequirement} or older to enter Vapor Pulse in Irving, TX or purchase any product we sell. Valid government-issued photo ID is required.`,
  path: "/age-policy",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Age Policy", path: "/age-policy" },
];

export default function AgePolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Compliance"
        title={`${business.ageRequirement}+ Only`}
        description={`Vapor Pulse sells age-restricted products. You must be ${business.ageRequirement} or older to enter the store, to purchase, or to use this website.`}
        breadcrumbs={crumbs}
      />

      <section className="container-vp pb-16">
        <div className="panel space-y-8 p-7 sm:p-10">
          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Identification
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              A valid, unexpired government-issued photo ID is required for
              every purchase of an age-restricted product, regardless of how old
              a customer appears. Staff are expected to check identification on
              every such sale. If you are not carrying ID, we will not be able
              to complete the sale.
            </p>
          </div>

          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Entering this website
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              This site asks you to confirm you are {business.ageRequirement} or
              older before showing product information. That confirmation is
              stored in your browser so you are not asked on every visit. It is
              a self-declaration and not a substitute for identity verification.
            </p>
          </div>

          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              No online sales
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              This website is an information and catalog site for our physical
              shop. We do not sell or ship products through it. All purchases
              happen in person at {business.address.full}, where identification
              is verified at the point of sale.
            </p>
          </div>

          <div>
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Never for minors
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed sm:text-base">
              We do not sell to anyone under {business.ageRequirement}, and we do
              not sell to adults who we believe are purchasing on behalf of a
              minor. Our marketing is intended for adults only.
            </p>
          </div>

          <div className="border-fog-400/10 border-t pt-7">
            <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
              Questions
            </h2>
            <p className="text-fog-400 mt-3 text-sm leading-relaxed">
              Call the shop and we will talk it through.
            </p>
            <div className="mt-5">
              <CallButton showNumber location="age_policy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
