/**
 * PUFF's wisdom — 31 lines, one per day of the month.
 *
 * These are brand copy in the mascot's voice. They are NOT customer reviews
 * and must never be presented as such. They deliberately make no health or
 * safety claims and never glamorise heavy use.
 */

import { business } from "./business";

export const puffQuotes: readonly string[] = [
  "Clouds pass. So does everything else. Exhale and let it.",
  "The best flavor is the one you actually finish the bottle of.",
  "You can't rush vapor. You can't rush much of anything worth having.",
  "A cracked tank is not the end of the world. Neither is most of what you're worried about.",
  "Know your coil. Know your limits. The order doesn't matter, but you need both.",
  "Everyone's chasing clouds. Only the patient ones catch them.",
  "Ask the question. The only dumb one is the one you drive home still wondering about.",
  "A good day starts slow and stays that way.",
  "Charge your battery before you need it. Same goes for you.",
  "Loud doesn't mean right. The quietest guy in the room usually knows the most about coils.",
  "Sometimes the answer is a new device. Usually the answer is a new coil. Occasionally the answer is a nap.",
  "Vapor rises. Keep your standards up there with it.",
  "You don't have to have it all figured out. You just have to walk in and start the conversation.",
  "The chair by the counter isn't going anywhere. Neither should you, for a minute.",
  "Nobody remembers the cloud. They remember who they were standing next to.",
  "Too much of a good thing is just too much. Even I put the mod down sometimes.",
  "Being a regular isn't about how often you show up. It's about how you treat people when you do.",
  "Fancy gear won't fix a bad mood. A good conversation might.",
  "There's no such thing as a wrong question. There is such a thing as the wrong wattage.",
  "Slow down. Nobody ever wished they'd rushed through the good parts.",
  "Fog rolls in, fog rolls out. Be the mountain, not the fog.",
  "Read the label. Read the room. Read a book, occasionally.",
  "Your setup says something about you. Make sure it's saying it clearly.",
  "Some days are dessert flavors. Some days are straight tobacco. Both count.",
  `If you're ${business.ageRequirement} and confused, come in. If you're not ${business.ageRequirement}, come back when you are.`,
  "Patience is a coil that lasts. Rush it and all you taste is burnt.",
  "Keep your ID on you and your word good. That's most of being an adult.",
  "Don't chase every new drop. Chase the stuff that made you say \"yeah, that's it.\"",
  "Rituals are fine. Just make sure you own them and they don't own you.",
  "Big clouds, small ego. Try it.",
  "Whatever you're carrying, set it down for a minute. The world will still be there. So will we.",
];

/**
 * The quote for a given calendar day, by day-of-month in the store's timezone
 * so every visitor sees the same line on the same day.
 */
export function getPuffQuoteOfTheDay(now: Date = new Date()): string {
  const day = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: business.timezone,
      day: "numeric",
    }).format(now),
  );
  return puffQuotes[(day - 1) % puffQuotes.length];
}
