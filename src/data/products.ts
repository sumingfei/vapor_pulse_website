/**
 * Product catalog.
 *
 * `catalog.json` is GENERATED — do not edit it by hand. It is produced from the
 * shop's inventory export by `npm run import:inventory`, which keeps only the
 * fields the site may show (name, category, image). Prices, costs and stock
 * levels never reach this file, so nothing here can go stale or leak.
 *
 * To refresh: drop the latest export into data/inventory/ and re-run the
 * import. To publish another category, add it to PUBLISHED_CATEGORIES in
 * scripts/import-inventory.mjs.
 */

import catalog from "./catalog.json";

export type Product = {
  id: string;
  name: string;
  /** Matches a `slug` from src/data/categories.ts. */
  categorySlug: string;
  /** Path under /public, or null when the export had no image. */
  image: string | null;
};

const products: Product[] = catalog.products;

/**
 * Async on purpose: swapping this for a live inventory API later is a change
 * to this function only.
 */
export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  return products.filter((product) => product.categorySlug === categorySlug);
}
