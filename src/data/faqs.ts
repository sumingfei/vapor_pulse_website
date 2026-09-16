import { business } from "./business";
import { getGroupedHours } from "@/lib/hours";

export type Faq = {
  question: string;
  /** Plain text — also used verbatim for FAQPage structured data. */
  answer: string;
};

const hoursSentence = getGroupedHours()
  .map((group) => `${group.days}: ${group.hours}`)
  .join(". ");

/**
 * Answers stay deliberately non-committal about stock. We describe what the
 * shop carries as categories, and route specific availability to a phone call.
 */
export const faqs: Faq[] = [
  {
    question: "Where is Vapor Pulse in Irving?",
    answer: `Vapor Pulse is at ${business.address.full}. We are easy to reach from Las Colinas, Valley Ranch and the rest of the ${business.address.city} area.`,
  },
  {
    question: "What are your hours?",
    answer: `${hoursSentence}. Hours on this site are shown in Central Time. If you are heading over near closing, call ${business.phone.display} and we will let you know.`,
  },
  {
    question: "Do you carry disposable vapes?",
    answer:
      "Yes, disposable vapes are one of the main categories we stock, in a range of flavors and puff counts. Selection changes as new products come in, so call ahead if you are after something specific.",
  },
  {
    question: "Do you carry vape juice and e-liquid?",
    answer:
      "We carry both salt nicotine and freebase e-liquid across a broad flavor range and several nicotine strengths. If you are not sure which strength suits you, the staff can walk you through the differences in person.",
  },
  {
    question: "Do you carry replacement pods and coils?",
    answer:
      "Pods and coils for common device families are a regular part of what we stock. Bring your device in, or take a photo of the coil you currently use, and we can match it if it is on the shelf.",
  },
  {
    question: "Can I call to check whether something is in stock?",
    answer: `Absolutely — that is the fastest way. Call ${business.phone.display} during store hours and someone will check the shelf before you make the drive.`,
  },
  {
    question: "Do you have a rewards program?",
    answer:
      "Ask us in store about current rewards and loyalty offerings. Program details can change, so the staff at the counter will always have the most accurate information.",
  },
  {
    question: `What age do I need to be to enter or purchase products?`,
    answer: `You must be ${business.ageRequirement} or older to enter Vapor Pulse or purchase any product we sell. Please bring a valid government-issued photo ID — we card, every time, regardless of age.`,
  },
];

/** The shorter set shown in the homepage FAQ preview. */
export const homepageFaqs = faqs.slice(0, 4);
