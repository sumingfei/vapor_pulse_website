import Link from "next/link";

import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageFaqs } from "@/data/faqs";

export function FaqPreview() {
  return (
    <section className="border-fog-400/10 bg-ink-900/40 border-y py-20 sm:py-24">
      <div className="container-vp">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Common questions"
              title="Good to Know"
              description="The things people ask most before their first visit."
            />
            <Link
              href="/faq"
              className="btn btn-secondary mt-6 h-11 px-5 text-sm"
            >
              All questions →
            </Link>
          </div>

          <FAQAccordion faqs={homepageFaqs} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
