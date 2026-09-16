import {
  Boxes,
  GraduationCap,
  Handshake,
  Lightbulb,
  Sofa,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import type { ReviewTheme } from "@/data/reviews";
import { cn } from "@/lib/utils";

const THEME_ICONS: Record<ReviewTheme["icon"], LucideIcon> = {
  selection: Boxes,
  staff: Lightbulb,
  recommendations: Handshake,
  atmosphere: Sofa,
  regulars: UserCheck,
  beginners: GraduationCap,
};

/**
 * What customers consistently mention, written in our own voice.
 * These are summaries of recurring themes — deliberately NOT quotations.
 */
export function ReviewThemeCard({
  theme,
  className,
}: {
  theme: ReviewTheme;
  className?: string;
}) {
  const Icon = THEME_ICONS[theme.icon];

  return (
    <div className={cn("panel panel-hover flex gap-4 p-5", className)}>
      <span
        aria-hidden
        className="border-pulse-magenta/25 bg-pulse-magenta/10 grid size-10 shrink-0 place-items-center rounded-xl border text-[#f7a6ff]"
      >
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="text-fog-50 text-sm font-semibold">{theme.title}</h3>
        <p className="text-fog-400 mt-1.5 text-sm leading-relaxed">
          {theme.description}
        </p>
      </div>
    </div>
  );
}
