/**
 * Lightweight analytics layer.
 *
 * The site works with no analytics provider configured — `track` becomes a
 * no-op. When GA4 (or any gtag/dataLayer-compatible tool) is added later,
 * these events start flowing without touching a single component.
 */

export type AnalyticsEvent =
  | "click_call"
  | "click_directions"
  | "click_google_reviews"
  | "click_leave_review"
  | "view_hours"
  | "click_product_category"
  | "click_rewards";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & {
  gtag?: (command: "event", event: string, params?: AnalyticsPayload) => void;
  dataLayer?: unknown[];
};

/**
 * Record a conversion event. Safe to call from anywhere, including during SSR
 * (where it does nothing).
 */
export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const w = window as GtagWindow;

  if (typeof w.gtag === "function") {
    w.gtag("event", event, payload);
    return;
  }

  // Queue for a tag manager that may load after interaction.
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...payload });
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${event}`, payload);
  }
}
