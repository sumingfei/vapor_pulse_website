/**
 * Product categories the shop typically carries.
 *
 * These describe TYPES of products, not live inventory. Copy deliberately
 * avoids stock guarantees — availability always points the visitor to a phone
 * call.
 */

export type CategoryIcon =
  | "disposables"
  | "devices"
  | "eliquids"
  | "pods"
  | "tanks"
  | "accessories";

export type ProductCategory = {
  slug: string;
  name: string;
  /** One-line summary used on cards. */
  blurb: string;
  /** Longer copy for the category page. */
  description: string;
  icon: CategoryIcon;
  /** Common things people walk in asking for in this category. */
  examples: string[];
};

export const categories: ProductCategory[] = [
  {
    slug: "disposable-vapes",
    name: "Disposable Vapes",
    blurb: "Grab-and-go options in a wide range of flavors and puff counts.",
    description:
      "Single-use devices that come charged and filled. If you are after a specific flavor or brand, give us a call before you drive over and we will check the shelf for you.",
    icon: "disposables",
    examples: ["Rechargeable disposables", "High puff-count", "Assorted flavors"],
  },
  {
    slug: "vape-devices",
    name: "Vape Devices",
    blurb: "Starter kits, pod systems and box mods for every experience level.",
    description:
      "From simple pod systems for someone switching over, to adjustable-wattage mods for people who want more control. Tell us how you vape now and we will point you at the right tier.",
    icon: "devices",
    examples: ["Starter kits", "Pod systems", "Box mods"],
  },
  {
    slug: "e-liquids",
    name: "E-Liquids",
    blurb: "Freebase and salt nicotine juice across a broad flavor range.",
    description:
      "Fruit, dessert, menthol, tobacco and everything in between, in a range of nicotine strengths. Not sure what strength you need? That is a conversation worth having at the counter.",
    icon: "eliquids",
    examples: ["Salt nicotine", "Freebase", "60ml & 100ml bottles"],
  },
  {
    slug: "pods-and-coils",
    name: "Pods & Coils",
    blurb: "Replacement pods and coils for common device families.",
    description:
      "The part people usually need in a hurry. Bring your device or take a photo of the coil you are running and we will match it if we have it in stock.",
    icon: "pods",
    examples: ["Replacement pods", "Mesh coils", "Multi-packs"],
  },
  {
    slug: "tanks",
    name: "Tanks",
    blurb: "Sub-ohm and MTL tanks, plus the glass to replace a cracked one.",
    description:
      "Tanks for every draw style, along with replacement glass and seals. Cracked your glass? Bring the tank in so we can match the exact size.",
    icon: "tanks",
    examples: ["Sub-ohm tanks", "MTL tanks", "Replacement glass"],
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Batteries, chargers, cotton, wire and the small stuff you forget.",
    description:
      "External batteries, chargers, drip tips, cases, cotton and building supplies. The things that turn a frustrating night into a five-minute fix.",
    icon: "accessories",
    examples: ["Batteries & chargers", "Drip tips", "Build supplies"],
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
