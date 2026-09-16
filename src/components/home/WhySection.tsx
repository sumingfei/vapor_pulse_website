import { PuffMascot } from "@/components/brand/PuffMascot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviewThemes } from "@/data/reviews";
import { ReviewThemeCard } from "@/components/ui/ReviewCard";

/**
 * "More Than a Vape Shop" — the in-store experience, told through the themes
 * customers raise most often. PUFF appears here as the shop's personality.
 */
export function WhySection() {
  return (
    <section className="border-fog-400/10 bg-ink-900/40 relative overflow-hidden border-y py-20 sm:py-24">
      <div
        aria-hidden
        className="glow-field top-1/3 -left-32 h-80 w-80 opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(224,55,246,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="container-vp relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The shop experience"
              title="More Than a Vape Shop"
              description="You can buy a device anywhere. What you get here is someone who will ask what you are running, what you did not like about it, and hand you something that actually fits."
            />

            <div className="relative mt-10 hidden lg:block">
              <PuffMascot
                variant="badge"
                float
                glow="violet"
                className="w-64"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reviewThemes.map((theme) => (
              <ReviewThemeCard key={theme.title} theme={theme} />
            ))}
          </div>
        </div>

        <div className="mt-10 lg:hidden">
          <PuffMascot
            variant="badge"
            glow="violet"
            className="mx-auto w-48"
          />
        </div>
      </div>
    </section>
  );
}
