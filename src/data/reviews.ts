/**
 * Themes that come up repeatedly in the shop's Google reviews.
 *
 * These are summaries written in our own voice — deliberately NOT customer
 * quotations. We never publish a quote a customer did not actually write.
 */

export type ReviewTheme = {
  title: string;
  description: string;
  icon: "selection" | "staff" | "recommendations" | "atmosphere" | "regulars" | "beginners";
};

export const reviewThemes: ReviewTheme[] = [
  {
    title: "A genuinely large selection",
    description:
      "The thing people mention first: there is a lot on the shelves, across every category.",
    icon: "selection",
  },
  {
    title: "Staff who know the products",
    description:
      "Questions get real answers, not a shrug and a point at the wall.",
    icon: "staff",
  },
  {
    title: "Recommendations that fit",
    description:
      "Tell the counter what you are running now and what you want to change, and you will get a suggestion that matches.",
    icon: "recommendations",
  },
  {
    title: "A relaxed place to shop",
    description:
      "No pressure, no rush. Take your time and look around.",
    icon: "atmosphere",
  },
  {
    title: "Regulars get remembered",
    description:
      "Come in a few times and the staff will know what you pick up.",
    icon: "regulars",
  },
  {
    title: "Beginners welcome",
    description:
      "First device or tenth, the conversation starts wherever you are.",
    icon: "beginners",
  },
];
