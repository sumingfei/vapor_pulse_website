import Image from "next/image";
import { PackageSearch } from "lucide-react";

import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * A single catalog item: photo and name. Deliberately no price and no stock
 * badge — availability is always a phone call away, never implied here.
 */
export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <li className={cn("panel panel-hover flex flex-col overflow-hidden", className)}>
      <div className="relative aspect-square bg-white/[0.04] p-4">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 200px, (min-width: 768px) 25vw, 45vw"
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
      <p className="text-fog-100 px-3.5 py-3 text-sm leading-snug font-medium">
        {product.name}
      </p>
    </li>
  );
}
