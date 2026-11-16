/**
 * The open role, transcribed from the shop's job posting.
 *
 * Nothing here is invented — pay, hours and requirements are exactly as
 * written in the posting. When the role is filled, set `open: false` and the
 * /careers page switches to a "no openings right now" state and drops its
 * JobPosting structured data.
 */

export type JobPosting = {
  open: boolean;
  title: string;
  /** Short line under the title; also the meta description seed. */
  summary: string;
  employmentType: string;
  hoursPerWeek: string;
  minimumAge: number;
  pay: { min: number; max: number; unit: "HOUR"; display: string; note: string };
  /**
   * ISO date the posting went live. Google requires datePosted on a
   * JobPosting, and a stale date hurts ranking — update it when you repost.
   */
  datePosted: string;
  intro: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  /** Pre-fills the subject line of the application email. */
  applySubject: string;
  applyAsk: string;
};

export const job: JobPosting = {
  open: true,
  title: "Vape Store Associate",
  summary:
    "Friendly, reliable retail sales associate for our Irving shop. Flexible hours, part-time or seasonal, training provided.",
  employmentType: "Part-Time / Seasonal / Flexible Hours",
  hoursPerWeek: "20–35 hrs/week",
  minimumAge: 21,
  pay: {
    min: 11,
    max: 13,
    unit: "HOUR",
    display: "$11–$13/hour",
    note: "depending on experience",
  },
  datePosted: "2026-11-16",
  intro: [
    "Vapor Pulse is looking for a friendly, reliable, and outgoing Retail Sales Associate to join our team!",
    "Whether you're a college student looking for extra income, someone seeking a seasonal gig, or just looking for a laid-back retail environment, we'd love to hear from you.",
    "No vape shop experience? No problem! We're happy to train the right person. But general knowledge of electronic cigarettes, hemp products, glassware are a must, can be from personal use.",
  ],
  responsibilities: [
    "Greet customers and provide friendly, helpful service",
    "Assist customers with product questions and purchases",
    "Operate the register and handle cash/card transactions",
    "Restock shelves and keep the store clean and organized",
    "Help manage inventory and daily store operations",
    "Follow age-verification procedures and store policies",
  ],
  requirements: [
    "Must be 21 years of age or older",
    "Friendly, dependable, and comfortable talking to customers",
    "Honest, responsible, and able to work independently",
    "Retail or customer service experience is a plus",
    "Experience working with point-of-sales registers",
    "Familiarity with vape products",
  ],
  benefits: [
    "Flexible scheduling — great for students!",
    "Part-time and seasonal opportunities",
    "Relaxed, friendly work environment",
    "On-the-job training provided",
    "Opportunity to gain retail and customer service experience",
    "Potential for longer term full-time employment",
  ],
  applySubject: "Application — Vape Store Associate",
  applyAsk:
    "Send us an introduction about yourself, your availability, and your resume (required).",
};
