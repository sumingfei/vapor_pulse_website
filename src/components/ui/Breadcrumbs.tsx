import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-xs", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-fog-400" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="text-fog-500 hover:text-pulse-cyan transition-colors"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="text-fog-500/60 size-3" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
