/**
 * Store-hours engine.
 *
 * Every calculation is done in the STORE's timezone (America/Chicago), never
 * the visitor's. Intl.DateTimeFormat resolves DST for the given instant, so
 * CST/CDT transitions are handled without any manual offset math.
 */

import {
  DAY_INDEX,
  DAY_LABEL,
  DAY_ORDER,
  business,
  type DayHours,
  type DayKey,
} from "@/data/business";

const DAY_BY_INDEX: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export type StoreStatus = {
  isOpen: boolean;
  /** "Open Now" | "Closed" */
  label: string;
  /** "Closes at 8:00 PM" | "Opens tomorrow at 10:00 AM" */
  detail: string;
  /** Day currently in effect at the store. */
  today: DayKey;
  /** Minutes until the store closes (when open) or opens (when closed). */
  minutesUntilChange: number;
};

/** Wall-clock reading of `date` as seen in `timeZone`. */
function zonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  // "24" is returned for midnight by some ICU versions; normalise to 0.
  const hour = Number(get("hour")) % 24;

  return {
    dayIndex: weekdayMap[get("weekday")] ?? 0,
    minutes: hour * 60 + Number(get("minute")),
  };
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** 600 -> "10:00 AM" */
export function formatTime(hhmm: string): string {
  const total = toMinutes(hhmm);
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** "10:00 AM – 8:00 PM" or "Closed" */
export function formatDayHours(hours: DayHours): string {
  if (!hours) return "Closed";
  return `${formatTime(hours.open)} – ${formatTime(hours.close)}`;
}

export function getDayHours(day: DayKey): DayHours {
  return business.hours[day];
}

/** The day key currently in effect at the store. */
export function getStoreToday(now: Date = new Date()): DayKey {
  const { dayIndex } = zonedParts(now, business.timezone);
  return DAY_BY_INDEX[dayIndex];
}

/**
 * Open/closed status for the given instant, expressed in store-local time.
 *
 * Handles same-day ranges (10:00–20:00). Overnight ranges are not used by this
 * store; if that ever changes, `close <= open` would need a wrap-around branch.
 */
export function getStoreStatus(now: Date = new Date()): StoreStatus {
  const { dayIndex, minutes } = zonedParts(now, business.timezone);
  const today = DAY_BY_INDEX[dayIndex];
  const todayHours = business.hours[today];

  if (todayHours) {
    const open = toMinutes(todayHours.open);
    const close = toMinutes(todayHours.close);

    if (minutes >= open && minutes < close) {
      return {
        isOpen: true,
        label: "Open Now",
        detail: `Closes at ${formatTime(todayHours.close)}`,
        today,
        minutesUntilChange: close - minutes,
      };
    }

    // Before opening on a day the store trades.
    if (minutes < open) {
      return {
        isOpen: false,
        label: "Closed",
        detail: `Opens today at ${formatTime(todayHours.open)}`,
        today,
        minutesUntilChange: open - minutes,
      };
    }
  }

  // Closed for the rest of today — walk forward to the next trading day.
  for (let offset = 1; offset <= 7; offset += 1) {
    const nextKey = DAY_BY_INDEX[(dayIndex + offset) % 7];
    const nextHours = business.hours[nextKey];
    if (!nextHours) continue;

    const when =
      offset === 1 ? "tomorrow" : DAY_LABEL[nextKey];
    const minutesUntil =
      offset * 24 * 60 - minutes + toMinutes(nextHours.open);

    return {
      isOpen: false,
      label: "Closed",
      detail: `Opens ${when} at ${formatTime(nextHours.open)}`,
      today,
      minutesUntilChange: minutesUntil,
    };
  }

  return {
    isOpen: false,
    label: "Closed",
    detail: "Call for hours",
    today,
    minutesUntilChange: 0,
  };
}

/** Today's hours as a display string, e.g. "10:00 AM – 8:00 PM". */
export function getTodayHoursLabel(now: Date = new Date()): string {
  return formatDayHours(business.hours[getStoreToday(now)]);
}

/**
 * Condenses the week into ranges for compact display:
 * "Mon–Sat 10:00 AM – 8:00 PM", "Sun 12:00 PM – 8:00 PM"
 */
export function getGroupedHours(): { days: string; hours: string }[] {
  const groups: { keys: DayKey[]; hours: string }[] = [];

  for (const day of DAY_ORDER) {
    const label = formatDayHours(business.hours[day]);
    const last = groups[groups.length - 1];
    if (last && last.hours === label) {
      last.keys.push(day);
    } else {
      groups.push({ keys: [day], hours: label });
    }
  }

  return groups.map((group) => {
    const first = group.keys[0];
    const last = group.keys[group.keys.length - 1];
    const shortOf = (d: DayKey) => DAY_LABEL[d].slice(0, 3);
    const days =
      group.keys.length === 1
        ? DAY_LABEL[first]
        : `${shortOf(first)}–${shortOf(last)}`;
    return { days, hours: group.hours };
  });
}

/**
 * schema.org openingHours strings, e.g. "Mo-Sa 10:00-20:00".
 * Only trading days are emitted.
 */
export function getOpeningHoursSpecification() {
  const SCHEMA_DAY: Record<DayKey, string> = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  return DAY_ORDER.flatMap((day) => {
    const hours = business.hours[day];
    if (!hours) return [];
    return [
      {
        "@type": "OpeningHoursSpecification" as const,
        dayOfWeek: `https://schema.org/${SCHEMA_DAY[day]}`,
        opens: hours.open,
        closes: hours.close,
      },
    ];
  });
}

export { DAY_INDEX, DAY_ORDER, DAY_LABEL };
