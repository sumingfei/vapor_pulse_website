"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Cable,
  Cpu,
  Droplets,
  FlaskConical,
  Layers,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { CategoryIcon, ProductCategory } from "@/data/categories";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const ICONS: Record<CategoryIcon, LucideIcon> = {
  disposables: Zap,
  devices: Cpu,
  eliquids: Droplets,
  pods: Layers,
  tanks: FlaskConical,
  accessories: Cable,
};

export function ProductCategoryCard({
  category,
  href,
  className,
}: {
  category: ProductCategory;
  href?: string;
  className?: string;
}) {
  const Icon = ICONS[category.icon];
  const target = href ?? `/products#${category.slug}`;

  return (
    <Link
      href={target}
      onClick={() =>
        track("click_product_category", { category: category.slug })
      }
      className={cn(
        "panel panel-lit panel-hover group relative flex flex-col p-5 sm:p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          aria-hidden
          className="border-pulse-cyan/25 bg-pulse-cyan/10 text-pulse-cyan grid size-11 shrink-0 place-items-center rounded-xl border"
        >
          <Icon className="size-5" />
        </span>
        <ArrowUpRight
          aria-hidden
          className="text-fog-500 group-hover:text-pulse-cyan size-5 shrink-0 transition-colors"
        />
      </div>

      <h3 className="font-display text-fog-50 text-xl uppercase tracking-wide">
        {category.name}
      </h3>
      <p className="text-fog-400 mt-2 text-sm leading-relaxed">
        {category.blurb}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {category.examples.map((example) => (
          <li
            key={example}
            className="border-fog-400/15 text-fog-500 rounded-full border px-2.5 py-1 text-[11px]"
          >
            {example}
          </li>
        ))}
      </ul>
    </Link>
  );
}
