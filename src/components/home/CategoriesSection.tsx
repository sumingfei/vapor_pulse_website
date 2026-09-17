import Link from "next/link";

import { CallButton } from "@/components/location/CallButton";
import { ProductCategoryCard } from "@/components/ui/ProductCategoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";

export function CategoriesSection() {
  return (
    <section id="products" className="py-20 sm:py-24">
      <div className="container-vp">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we carry"
            title={
              <>
                What You&rsquo;ll Find
                <br className="hidden sm:block" /> at Vapor Pulse
              </>
            }
            description="Browse the types of products we typically carry. Selection changes as new products land, so contact the store for current availability."
          />
          <Link
            href="/products"
            className="btn btn-secondary h-11 shrink-0 px-5 text-sm"
          >
            See all categories →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <ProductCategoryCard key={category.slug} category={category} />
          ))}
        </div>

        <div className="panel mt-4 flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
          <p className="text-fog-300 text-sm leading-relaxed">
            <span className="text-fog-50 font-semibold">
              Looking for something specific?
            </span>{" "}
            Call before you drive over and we will check the shelf for you.
          </p>
          <CallButton
            label="Call for Availability"
            className="shrink-0"
            location="categories"
          />
        </div>
      </div>
    </section>
  );
}
