import { PulseWave } from "@/components/brand/PulseWave";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

/**
 * Shared masthead for interior pages. Keeps one h1 per page and a consistent
 * entry rhythm without repeating the homepage hero.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("relative overflow-hidden", className)}>
      <div
        aria-hidden
        className="glow-field -top-32 left-1/2 h-64 w-[42rem] -translate-x-1/2 opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(128,91,241,0.55) 0%, rgba(98,210,249,0.2) 50%, transparent 72%)",
        }}
      />

      <div className="container-vp relative pt-10 pb-12 sm:pt-14 sm:pb-16">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        {eyebrow && (
          <p className="eyebrow mb-3">
            <span
              aria-hidden
              className="bg-pulse-cyan inline-block h-1.5 w-1.5 rounded-full"
            />
            {eyebrow}
          </p>
        )}

        <h1 className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {description && (
          <p className="text-fog-400 mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        )}

        {children && <div className="mt-7">{children}</div>}

        <PulseWave className="mt-10 h-8 opacity-50" />
      </div>
    </header>
  );
}
