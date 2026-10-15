import { JsonLd } from "@/components/JsonLd";
import { CallButton } from "@/components/location/CallButton";
import { PuffMascot } from "@/components/brand/PuffMascot";
import { SuggestionForm } from "@/components/suggestion/SuggestionForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { business } from "@/data/business";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Suggestion Box",
  description:
    "Tell Vapor Pulse in Irving what to stock next. A flavor, a brand we do not carry, or something we could do better — it goes straight to the shop inbox.",
  path: "/suggest",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Suggestion Box", path: "/suggest" },
];

export default function SuggestPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Suggestion box"
        title="Tell PUFF"
        description="A flavor we should bring in, a brand you cannot find, something we could do better — the shop is shaped by the people who come in, so say the word."
        breadcrumbs={crumbs}
      >
        <CallButton variant="secondary" showNumber location="suggest_header" />
      </PageHeader>

      <section className="container-vp pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="panel panel-lit p-6 sm:p-8">
            <SuggestionForm />
          </div>

          <div className="order-first justify-self-center lg:order-last lg:pt-6">
            <PuffMascot
              variant="badge"
              decorative
              float
              glow="violet"
              className="w-44 sm:w-52 lg:w-full lg:max-w-[16rem]"
            />
            <p className="text-fog-500 mt-6 max-w-xs text-center text-sm leading-relaxed">
              Prefer to say it in person? Ask for us at the counter, or call{" "}
              <a
                href={business.phone.href}
                className="text-fog-300 hover:text-pulse-cyan transition-colors"
              >
                {business.phone.display}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
