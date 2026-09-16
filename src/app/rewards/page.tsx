import { Gift, MessageCircle, Store } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { PuffMascot } from "@/components/brand/PuffMascot";
import { CallButton } from "@/components/location/CallButton";
import { DirectionsButton } from "@/components/location/DirectionsButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { business } from "@/data/business";
import { hasRewardDetails, rewards } from "@/data/rewards";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vapor Pulse Rewards",
  description:
    "Ask about Vapor Pulse Rewards at our Irving, TX shop. Stop in on N O'Connor Rd or call the store and the team will walk you through the current program.",
  path: "/rewards",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Rewards", path: "/rewards" },
];

const numericTiers = rewards.tiers.filter(
  (tier): tier is { points: number; reward: string } => typeof tier.points === "number",
);
const firstTier = numericTiers[0];
const lastTier = numericTiers[numericTiers.length - 1];

/**
 * Redemption tiers are confirmed and listed below. How points are EARNED is
 * not, so these steps describe how to find out rather than stating a rate.
 */
const STEPS = [
  {
    icon: Store,
    title: "Ask at the counter",
    description:
      "Mention rewards on your next visit and the team will tell you what is currently offered.",
  },
  {
    icon: Gift,
    title: "Cash in your points",
    description: `From ${firstTier.reward.toLowerCase()} at ${firstTier.points} points up to ${lastTier.reward.toLowerCase()} at ${lastTier.points.toLocaleString("en-US")} — the full ladder is below.`,
  },
  {
    icon: MessageCircle,
    title: "Or call ahead",
    description:
      "Ring the shop during opening hours and we will answer what we can over the phone.",
  },
];

export default function RewardsPage() {
  const hasSignup = Boolean(rewards.signupUrl);

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow={rewards.programName}
        title="Rewards for Regulars"
        description="Come in often enough and we will know your name and what you pick up. Rewards is the formal version of that — points on every visit, cashed in for real perks."
        breadcrumbs={crumbs}
      >
        {hasSignup ? (
          <TrackedLink
            href={rewards.signupUrl as string}
            event="click_rewards"
            location="rewards_header"
            external
            className="btn btn-primary h-12 px-6 text-base"
          >
            Join {rewards.programName}
          </TrackedLink>
        ) : (
          <CallButton
            variant="primary"
            size="lg"
            label="Ask About Rewards"
            showNumber
            location="rewards_header"
          />
        )}
      </PageHeader>

      <section className="container-vp pb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.title} className="panel panel-lit p-6">
              <span
                aria-hidden
                className="border-pulse-cyan/25 bg-pulse-cyan/10 text-pulse-cyan grid size-11 place-items-center rounded-xl border"
              >
                <step.icon className="size-5" />
              </span>
              <h2 className="font-display text-fog-50 mt-4 text-lg uppercase tracking-wide">
                {step.title}
              </h2>
              <p className="text-fog-400 mt-2 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {rewards.tiers.length > 0 && (
        <section className="container-vp pb-12">
          <div className="panel panel-lit p-6 sm:p-8">
            <SectionHeading
              eyebrow="Current rewards"
              title="What Your Points Get You"
              description="Rack up points on your visits and cash them in at the counter. The higher you climb, the better it gets."
            />

            <ol className="divide-fog-400/10 mt-8 divide-y">
              {rewards.tiers.map((tier) => {
                // Teased tiers (no point cost yet) get the magenta treatment.
                const teaser = typeof tier.points !== "number";
                return (
                  <li
                    key={String(tier.points)}
                    className="flex items-center gap-5 py-4 sm:gap-8"
                  >
                    <span
                      className={cn(
                        "font-display w-24 shrink-0 text-2xl leading-none tabular-nums sm:w-32 sm:text-3xl",
                        teaser ? "text-neon-magenta" : "text-neon-cyan",
                      )}
                    >
                      {tier.points}
                      <span className="text-fog-500 ml-1 text-xs font-sans font-semibold uppercase tracking-wider">
                        pts
                      </span>
                    </span>
                    <span
                      className={cn(
                        "text-base sm:text-lg",
                        teaser ? "text-fog-50 font-semibold" : "text-fog-200",
                      )}
                    >
                      {tier.reward}
                    </span>
                  </li>
                );
              })}
            </ol>

            <p className="text-fog-500 mt-6 text-xs leading-relaxed">
              Rewards are redeemed in store and may change. Ask at the counter
              for how points are earned and for anything not listed here.
            </p>
          </div>
        </section>
      )}

      <section className="container-vp pb-16">
        <div className="panel panel-lit relative overflow-hidden">
          <div
            aria-hidden
            className="glow-field top-1/2 left-0 h-72 w-72 -translate-y-1/2 opacity-35"
            style={{
              background:
                "radial-gradient(circle, rgba(128,91,241,0.5) 0%, transparent 70%)",
            }}
          />

          <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[0.75fr_1.25fr]">
            <PuffMascot
              variant="badge"
              decorative
              float
              glow="violet"
              className="mx-auto w-44 sm:w-52 lg:w-full lg:max-w-[15rem]"
            />

            <div>
              <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl">
                Get signed up
                <br />
                <span className="text-neon-cyan">at the counter</span>
              </h2>

              <p className="text-fog-400 mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
                Mention rewards on your next visit and we will get you on the
                program. The staff can also tell you exactly how points are
                earned and check your balance any time you ask.
              </p>

              {hasRewardDetails && (rewards.earnRate || rewards.redemptionRate || rewards.perks.length > 0) ? (
                <dl className="mt-6 space-y-4">
                  {rewards.earnRate && (
                    <div>
                      <dt className="text-fog-500 text-xs font-semibold uppercase tracking-wider">
                        Earning
                      </dt>
                      <dd className="text-fog-100 mt-1 text-sm">
                        {rewards.earnRate}
                      </dd>
                    </div>
                  )}
                  {rewards.redemptionRate && (
                    <div>
                      <dt className="text-fog-500 text-xs font-semibold uppercase tracking-wider">
                        Redeeming
                      </dt>
                      <dd className="text-fog-100 mt-1 text-sm">
                        {rewards.redemptionRate}
                      </dd>
                    </div>
                  )}
                  {rewards.perks.length > 0 && (
                    <div>
                      <dt className="text-fog-500 text-xs font-semibold uppercase tracking-wider">
                        Perks
                      </dt>
                      <dd className="mt-2">
                        <ul className="text-fog-300 space-y-2 text-sm">
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
                      </dd>
                    </div>
                  )}
                </dl>
              ) : null}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <CallButton
                  variant="primary"
                  size="lg"
                  label="Call and Ask"
                  showNumber
                  location="rewards_details"
                />
                <DirectionsButton
                  variant="secondary"
                  size="lg"
                  label="Visit the Shop"
                  location="rewards_details"
                />
              </div>

              <p className="text-fog-500 mt-5 text-xs leading-relaxed">
                {business.name} · {business.address.full}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
