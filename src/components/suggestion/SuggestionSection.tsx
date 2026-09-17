import { MessageSquarePlus } from "lucide-react";

import { PuffMascot } from "@/components/brand/PuffMascot";
import { SuggestionDialog } from "@/components/suggestion/SuggestionDialog";
import { cn } from "@/lib/utils";

/** Suggestion box — same panel treatment as the rewards section. */
export function SuggestionSection({ className }: { className?: string }) {
  return (
    <section className={cn("py-20 sm:py-24", className)}>
      <div className="container-vp">
        <div className="panel panel-lit relative overflow-hidden">
          <div
            aria-hidden
            className="glow-field top-1/2 left-0 h-72 w-72 -translate-y-1/2 opacity-35"
            style={{
              background:
                "radial-gradient(circle, rgba(128,91,241,0.5) 0%, rgba(98,210,249,0.2) 50%, transparent 72%)",
            }}
          />

          <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:p-12">
            <div className="order-last justify-self-center lg:order-first">
              <PuffMascot
                variant="badge"
                decorative
                float
                glow="violet"
                className="w-48 sm:w-56 lg:w-full lg:max-w-[15rem]"
              />
            </div>

            <div>
              <p className="eyebrow">
                <MessageSquarePlus className="size-3.5" aria-hidden />
                Suggestion box
              </p>

              <h2 className="font-display mt-3 text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl">
                Got an idea?
                <br />
                <span className="text-neon-cyan">Tell PUFF</span>
              </h2>

              <p className="text-fog-400 mt-4 max-w-lg text-base leading-relaxed">
                A flavor we should bring in, a brand you cannot find, something
                we could do better — the shop is shaped by the people who come
                in, so say the word.
              </p>

              <div className="mt-7">
                <SuggestionDialog />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
