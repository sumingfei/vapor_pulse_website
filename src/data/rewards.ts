/**
 * Vapor Pulse Rewards configuration.
 *
 * Redemption tiers are confirmed by the shop. How points are EARNED is not
 * yet confirmed, so `earnRate` stays null rather than invented. The rewards
 * page reads whatever is filled in and hides the rest.
 *
 * Set `signupUrl` to a real URL and the CTA everywhere changes from
 * "Ask About Rewards" to "Join Vapor Pulse Rewards" automatically.
 */

export type RewardTier = {
  /** Point cost, or "???" for a teased tier that is not live yet. */
  points: number | "???";
  reward: string;
};

export type RewardsConfig = {
  programName: string;
  /** Confirmed redemption tiers, lowest first. */
  tiers: RewardTier[];
  /** Confirmed signup URL. Null = ask in store. */
  signupUrl: string | null;
  /** e.g. "1 point per $1 spent" — leave null until confirmed. */
  earnRate: string | null;
  /** e.g. "100 points = $5 off" — leave null until confirmed. */
  redemptionRate: string | null;
  /** Confirmed perks. Empty until the shop verifies the list. */
  perks: string[];
  /** Shown when the specifics above are unavailable. */
  fallbackNote: string;
};

export const rewards: RewardsConfig = {
  programName: "Vapor Pulse Rewards",
  tiers: [
    { points: 50, reward: "Free beverage or snack" },
    { points: 150, reward: "15% off any item" },
    { points: 225, reward: "Buy one, get one 50% off any item" },
    { points: 320, reward: "25% off your entire purchase" },
    { points: 500, reward: "Free anime pillow" },
    { points: 750, reward: "$15 in store credit" },
    { points: 1000, reward: "Free starter kit POD system" },
    { points: "???", reward: "Free mystery box (COMING SOON)" },
  ],
  signupUrl: null,
  earnRate: null,
  redemptionRate: null,
  perks: [],
  fallbackNote:
    "Program details are confirmed at the counter — ask us on your next visit and we will get you set up.",
};

/** True once the shop has confirmed the actual program mechanics. */
export const hasRewardDetails =
  rewards.tiers.length > 0 ||
  Boolean(rewards.earnRate) ||
  Boolean(rewards.redemptionRate) ||
  rewards.perks.length > 0;
