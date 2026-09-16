/**
 * Product catalog.
 *
 * INTENTIONALLY EMPTY. Individual products are not listed because we cannot
 * assert that any specific item is on the shelf right now — every product CTA
 * on the site routes to a phone call instead.
 *
 * This module exists as the seam for a future inventory source: point
 * `getProducts` at a real API and the product grid on /products starts
 * rendering with no component changes.
 *
 * Stock levels and prices are deliberately NOT modelled. Add those fields only
 * when there is a real system behind them — a `price` or `inStock` field with
 * hand-maintained values goes stale silently, which is worse than no field.
 */

export type Product = {
  id: string;
  name: string;
  brand: string;
  /** Must match a `slug` from src/data/categories.ts. */
  categorySlug: string;
  description: string;
  /** Path under /public, or an absolute URL from the inventory source. */
  image?: string;
};

/**
 * Local catalog entries. Anything added here is treated as real, published
 * content — do not use this for demo or filler products.
 */
export const catalog: Product[] = [];

/**
 * Single read path for product data.
 *
 * Async on purpose: when an inventory API is connected this becomes a fetch
 * (cache/revalidate as appropriate) without touching any caller.
 */
export async function getProducts(): Promise<Product[]> {
  return catalog;
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.categorySlug === categorySlug);
}
