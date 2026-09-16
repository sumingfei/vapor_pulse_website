import { LocationCard } from "@/components/location/LocationCard";
import { StoreMap } from "@/components/location/StoreMap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/data/business";

export function LocationSection() {
  return (
    <section
      id="location"
      className="border-fog-400/10 bg-ink-900/40 border-y py-20 sm:py-24"
    >
      <div className="container-vp">
        <SectionHeading
          eyebrow="Find the shop"
          title={`Come See Us in ${business.address.city}`}
          description={`On N O'Connor Rd, easy to reach from Las Colinas, Valley Ranch and the rest of ${business.address.city}.`}
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
          <LocationCard location="home_location" showHours={false} />
          <StoreMap className="min-h-80 lg:min-h-full" />
        </div>
      </div>
    </section>
  );
}
