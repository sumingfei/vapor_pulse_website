import Image from "next/image";
import { PackageSearch } from "lucide-react";

import { CallButton } from "@/components/location/CallButton";
import { getCategory } from "@/data/categories";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * A single catalog item.
 *
 * The CTA is always "Call for Availability" — never "Buy Now" and never a
 * stock badge. Nothing here implies live inventory, because there is none
 * behind it yet.
 */
export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const category = getCategory(product.categorySlug);

  return (
    <article className={cn("panel panel-lit panel-hover flex flex-col", className)}>
      <div className="bg-ink-800/60 relative aspect-4/3 overflow-hidden rounded-t-2xl">
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-contain p-4"
          />
        ) : (
          <div
            aria-hidden
            className="text-fog-500 grid h-full w-full place-items-center"
          >
            <PackageSearch className="size-8" />
          </div>
        )}
      </div>

      <div className="flex grow flex-col p-5">
        <p className="text-pulse-cyan text-[11px] font-semibold uppercase tracking-wider">
          {product.brand}
        </p>
        <h3 className="font-display text-fog-50 mt-1.5 text-lg uppercase leading-tight tracking-wide">
          {product.name}
        </h3>
        {category && (
          <p className="text-fog-500 mt-1 text-xs">{category.name}</p>
        )}
        <p className="text-fog-400 mt-3 grow text-sm leading-relaxed">
          {product.description}
        </p>
        <div className="mt-5">
          <CallButton
            size="sm"
            label="Call for Availability"
            location={`product_${product.id}`}
          />
        </div>
      </div>
    </article>
  );
}
