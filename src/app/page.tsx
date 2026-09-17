import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HoursSection } from "@/components/home/HoursSection";
import { LocationSection } from "@/components/home/LocationSection";
import { QuickInfoBar } from "@/components/home/QuickInfoBar";
import { RewardsSection } from "@/components/home/RewardsSection";
import { SuggestionSection } from "@/components/home/SuggestionSection";
import { WhySection } from "@/components/home/WhySection";
import { business } from "@/data/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Vape Shop in ${business.address.city}, ${business.address.region} | ${business.shortName}`,
  description:
    "Vapor Pulse is a local vape shop on N O'Connor Rd in Irving, TX. A large selection of disposables, devices, e-liquid, pods and coils, with staff who help you find the right fit. Get directions or call the store.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickInfoBar />
      <CategoriesSection />
      <WhySection />
      <RewardsSection />
      <LocationSection />
      <HoursSection />
      <FaqPreview />
      <SuggestionSection />
      <FinalCta />
    </>
  );
}
