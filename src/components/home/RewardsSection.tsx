import { Gift } from "lucide-react";

import { PuffMascot } from "@/components/brand/PuffMascot";
import { TrackedLink, TrackedNavLink } from "@/components/ui/TrackedLink";
import { business } from "@/data/business";
import { rewards } from "@/data/rewards";

/**
 * Rewards teaser, and PUFF's main moment on the homepage.
 *
 * With a confirmed signup URL a "Join" button appears; otherwise the only CTA
 * is the rewards page — we never imply a signup flow that does not exist.
 */
export function RewardsSection() {
  const hasSignup = Boolean(rewards.signupUrl);

  return (
    <section className="py-20 sm:py-24">
      <div className="container-vp">
        <div className="panel panel-lit relative overflow-hidden">
          <div
            aria-hidden
            className="glow-field top-1/2 right-0 h-72 w-72 -translate-y-1/2 opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(98,210,249,0.45) 0%, rgba(224,55,246,0.2) 50%, transparent 72%)",
            }}
          />

          <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 lg:p-12">
            <div>
              <p className="eyebrow">
                <Gift className="size-3.5" aria-hidden />
                {rewards.programName}
              </p>

              <h2 className="font-display mt-3 text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl">
                Regulars get
                <br />
                <span className="text-neon-magenta">looked after</span>
              </h2>

              <p className="text-fog-400 mt-4 max-w-lg text-base leading-relaxed">
                {hasSignup
                  ? "Join Vapor Pulse Rewards and start earning on what you already pick up."
                  : "Ask about rewards on your next visit and we will get you set up at the counter."}
              </p>

              {rewards.perks.length > 0 && (
                <ul className="text-fog-300 mt-5 space-y-2 text-sm">
                  {rewards.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <span
                        aria-hidden
                        className="bg-pulse-cyan mt-1.5 size-1.5 shrink-0 rounded-full"
                      />
                      {perk}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {hasSignup ? (
                  <TrackedLink
                    href={rewards.signupUrl as string}
                    event="click_rewards"
                    location="home_rewards"
                    external
                    className="btn btn-primary h-12 px-6 text-base"
                  >
                    Join {rewards.programName}
                  </TrackedLink>
                ) : null}

                <TrackedNavLink
                  href="/rewards"
                  event="click_rewards"
                  location="home_rewards_learn"
                  className={hasSignup ? "btn btn-secondary h-12 px-6 text-base" : "btn btn-primary h-12 px-6 text-base"}
                >
                  How it works
                </TrackedNavLink>
              </div>

              <p className="text-fog-500 mt-5 text-xs">
                Program details are confirmed in store — call{" "}
                <a
                  href={business.phone.href}
                  className="text-fog-300 hover:text-pulse-cyan underline underline-offset-2 transition-colors"
                >
                  {business.phone.display}
                </a>{" "}
                if you want the current details before you visit.
              </p>
            </div>

            <div className="justify-self-center">
              <PuffMascot
                variant="neon"
                decorative
                float
                glow="cyan"
                className="w-56 sm:w-64 lg:w-full lg:max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
