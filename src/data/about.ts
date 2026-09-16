/**
 * About-page content.
 *
 * Deliberately free of founding dates, store counts and award claims — none of
 * that is verified. The only historical context used is that the brand has
 * roots in the Dallas–Fort Worth area and expanded into Irving, stated without
 * dates. Add confirmed facts to `confirmedMilestones` and they will render.
 */

export type Milestone = {
  /** Confirmed year or period. */
  period: string;
  title: string;
  description: string;
};

export const aboutStory = {
  heading: "A local shop, run like one",
  intro:
    "Vapor Pulse grew out of the Dallas–Fort Worth vape scene and opened its doors in Irving on N O'Connor Rd. The idea was simple: carry a deep selection, hire people who actually know the products, and give the neighborhood somewhere to go that does not feel like a gas station counter.",
  body: [
    "Most of what we do happens in conversation. Someone comes in switching over from cigarettes and needs a device that is not overwhelming. A regular cracks the glass on a tank and needs the exact replacement. Someone wants a flavor they had two years ago and cannot remember the name of. That is the job, and the staff is good at it.",
    "Because we are a physical shop, we can do things a website cannot — hand you the device, talk through the trade-offs, and get you out the door with something that fits. If you are not sure what you need, that is the best reason to come in rather than guess online.",
  ],
  values: [
    {
      title: "Deep selection",
      description:
        "Across disposables, devices, e-liquid, pods, coils, tanks and accessories — so a trip here is usually one trip.",
    },
    {
      title: "Staff who know the gear",
      description:
        "Real recommendations based on how you actually vape, not whatever is nearest the register.",
    },
    {
      title: "Time for your questions",
      description:
        "Beginners and long-time vapers get the same patience at the counter.",
    },
    {
      title: "Part of Irving",
      description:
        "Regulars, familiar faces, and a shop that remembers what you pick up.",
    },
  ],
};

/** Add only dates and facts the shop has confirmed. */
export const confirmedMilestones: Milestone[] = [];
