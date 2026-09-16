import { JsonLd } from "@/components/JsonLd";
import { CallButton } from "@/components/location/CallButton";
import { DirectionsButton } from "@/components/location/DirectionsButton";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PageHeader } from "@/components/ui/PageHeader";
import { faqs } from "@/data/faqs";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Hours, location, what we carry, age requirements and how to check stock at Vapor Pulse, the vape shop on N O'Connor Rd in Irving, TX.",
  path: "/faq",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {/* Answers here are the exact text rendered on the page. */}
      <JsonLd data={faqSchema(faqs)} />

      <PageHeader
        eyebrow="Questions"
        title="Frequently Asked"
        description="The things people ask most before their first visit. If yours is not here, calling the shop is the fastest way to get a straight answer."
        breadcrumbs={crumbs}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CallButton variant="primary" showNumber location="faq_header" />
          <DirectionsButton variant="secondary" location="faq_header" />
        </div>
      </PageHeader>

      <section className="container-vp pb-16">
        <div className="panel px-6 py-2 sm:px-8">
          <FAQAccordion faqs={faqs} defaultOpen={0} headingLevel="h2" />
        </div>
      </section>
    </>
  );
}
