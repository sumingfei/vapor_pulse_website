import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level — keeps the document outline correct per page. */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="eyebrow mb-3">
          <span
            aria-hidden
            className="bg-pulse-cyan inline-block h-1.5 w-1.5 rounded-full"
          />
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "font-display uppercase leading-[0.95] tracking-tight",
          Tag === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-[2.75rem]",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className="text-fog-400 mt-4 text-base leading-relaxed sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
