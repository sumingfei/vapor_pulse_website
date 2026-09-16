import { PuffMascot } from "@/components/brand/PuffMascot";
import { StoreHours } from "@/components/location/StoreHours";
import { StoreStatus } from "@/components/location/StoreStatus";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HoursSection() {
  return (
    <section id="hours" className="py-20 sm:py-24">
      <div className="container-vp">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Opening hours"
              title="When We're Open"
              description="Seven days a week. All times are Central, the same clock the shop runs on."
            />

            <div className="mt-7">
              <StoreStatus />
            </div>
          </div>

          <div className="panel panel-lit relative overflow-hidden p-6 sm:p-8">
            <PuffMascot
              variant="neon"
              decorative
              className="pointer-events-none absolute -right-6 -bottom-8 w-40 opacity-15"
            />
            <h3 className="text-fog-500 relative mb-2 text-xs font-semibold uppercase tracking-wider">
              Full week
            </h3>
            <StoreHours className="relative" />
          </div>
        </div>
      </div>
    </section>
  );
}
