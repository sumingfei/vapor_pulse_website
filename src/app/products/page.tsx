import { JsonLd } from "@/components/JsonLd";
import { CallButton } from "@/components/location/CallButton";
import { DirectionsButton } from "@/components/location/DirectionsButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCategoryCard } from "@/components/ui/ProductCategoryCard";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/data/business";
import { categories } from "@/data/categories";
import { getProducts } from "@/data/products";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vape Products & Supplies",
  description:
    "Disposables, devices, e-liquid, pods, coils, tanks, hemp and kratom, glassware and smoke accessories at Vapor Pulse in Irving, TX. Browse what we typically carry, then call to check current availability.",
  path: "/products",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

export default async function ProductsPage() {
  // Categories with no imported products simply show their description; the
  // product grid appears only where the catalog actually has entries.
  const products = await getProducts();
  const byCategory = new Map<string, typeof products>();
  for (const product of products) {
    const list = byCategory.get(product.categorySlug) ?? [];
    list.push(product);
    byCategory.set(product.categorySlug, list);
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="What we carry"
        title="Vape Products & Supplies"
        description="Here is the shape of what sits on our shelves. Stock moves, so treat this as the categories we carry rather than a live inventory list — a quick phone call is always the fastest way to confirm."
        breadcrumbs={crumbs}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CallButton
            variant="primary"
            label="Call for Availability"
            showNumber
            location="products_header"
          />
          <DirectionsButton variant="secondary" location="products_header" />
        </div>
      </PageHeader>

      <section aria-labelledby="category-index" className="container-vp pb-8">
        <h2 id="category-index" className="sr-only">
          Product categories
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <ProductCategoryCard
              key={category.slug}
              category={category}
              href={`#${category.slug}`}
            />
          ))}
        </div>
      </section>

      <section className="container-vp py-12">
        <div className="space-y-4">
          {categories.map((category) => {
            const items = byCategory.get(category.slug) ?? [];
            return (
            <article
              key={category.slug}
              id={category.slug}
              className="panel panel-lit scroll-mt-28 p-6 sm:p-8"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="font-display text-fog-50 text-2xl uppercase tracking-wide sm:text-3xl">
                    {category.name}
                  </h2>
                  <p className="text-fog-400 mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
                    {category.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {category.examples.map((example) => (
                      <li
                        key={example}
                        className="border-fog-400/15 text-fog-400 rounded-full border px-3 py-1 text-xs"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
                <CallButton
                  label="Ask About Availability"
                  className="shrink-0"
                  location={`products_${category.slug}`}
                />
              </div>

              {items.length > 0 && (
                <ul
                  aria-label={`${category.name} we carry`}
                  className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
                >
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </ul>
              )}
            </article>
            );
          })}
        </div>
      </section>

      <section className="container-vp pb-16">
        <div className="panel grid gap-6 p-7 sm:p-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Not sure what you need?"
              title="Come Talk to Us"
              description={`Bring the device you are running, or a photo of the coil you need. We will match it if it is on the shelf and tell you straight if it is not. ${business.address.street}, ${business.address.cityLine}.`}
            />
          </div>
          <div className="flex flex-col gap-3">
            <DirectionsButton size="lg" location="products_footer" />
            <CallButton size="lg" showNumber location="products_footer" />
          </div>
        </div>
      </section>
    </>
  );
}
