import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/brand/Logo";
import { PuffMascot } from "@/components/brand/PuffMascot";
import { CallButton } from "@/components/location/CallButton";
import { DirectionsButton } from "@/components/location/DirectionsButton";
import { RatingBadge } from "@/components/ui/RatingBadge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutStory, confirmedMilestones } from "@/data/about";
import { business } from "@/data/business";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Vapor Pulse",
  description:
    "Vapor Pulse is a local vape shop on N O'Connor Rd in Irving, Texas — deep selection, staff who know the products, and time for your questions.",
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="About the shop"
        title={aboutStory.heading}
        description={aboutStory.intro}
        breadcrumbs={crumbs}
      >
        <RatingBadge size="lg" location="about_header" />
      </PageHeader>

      <section className="container-vp pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-5">
            {aboutStory.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-fog-300 text-base leading-relaxed sm:text-lg"
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <DirectionsButton location="about_body" />
              <CallButton showNumber location="about_body" />
            </div>
          </div>

          <div className="panel panel-lit relative overflow-hidden p-8">
            <div
              aria-hidden
              className="glow-field top-0 right-0 h-56 w-56 opacity-35"
              style={{
                background:
                  "radial-gradient(circle, rgba(128,91,241,0.55) 0%, transparent 70%)",
              }}
            />
            <Logo variant="badge" className="relative mx-auto w-40" />
            <p className="text-fog-400 relative mt-6 text-center text-sm leading-relaxed">
              {business.name}
              <br />
              {business.address.street}
              <br />
              {business.address.cityLine}
            </p>
          </div>
        </div>
      </section>

      <section className="border-fog-400/10 bg-ink-900/40 border-y py-16 sm:py-20">
        <div className="container-vp">
          <SectionHeading
            eyebrow="What matters here"
            title="How We Run the Shop"
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {aboutStory.values.map((value) => (
              <div key={value.title} className="panel panel-hover p-6">
                <h3 className="font-display text-fog-50 text-lg uppercase tracking-wide">
                  {value.title}
                </h3>
                <p className="text-fog-400 mt-2 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {confirmedMilestones.length > 0 && (
            <ol className="mt-10 space-y-4">
              {confirmedMilestones.map((milestone) => (
                <li key={milestone.period} className="panel flex gap-5 p-6">
                  <span className="font-display text-pulse-cyan shrink-0 text-xl">
                    {milestone.period}
                  </span>
                  <span>
                    <h3 className="text-fog-50 text-base font-semibold">
                      {milestone.title}
                    </h3>
                    <p className="text-fog-400 mt-1 text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <section className="container-vp py-16">
        <div className="panel panel-lit relative overflow-hidden">
          <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl">
                Meet PUFF
              </h2>
              <p className="text-fog-400 mt-4 max-w-lg text-sm leading-relaxed sm:text-base">
                Our mascot, and the face of the Vapor Pulse brand. PUFF is
                shorthand for how the shop runs: know the products, keep it
                relaxed, and look after the people who keep coming back.
              </p>
              <div className="mt-7">
                <DirectionsButton size="lg" label="Come Say Hi" location="about_puff" />
              </div>
            </div>

            <PuffMascot
              variant="badge"
              float
              glow="violet"
              className="mx-auto w-48 sm:w-56 lg:w-full lg:max-w-[16rem]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
