"use server";

import { business } from "@/data/business";

export type SuggestionValues = { suggestion: string; name: string; contact: string };

export type SuggestionState =
  | { status: "idle" }
  | { status: "sent" }
  /** Validation failed; `values` echoes the submission so the form keeps it. */
  | { status: "invalid"; message: string; values: SuggestionValues }
  /** No mail provider configured — client opens a mailto: instead. */
  | { status: "unconfigured"; mailto: string; values: SuggestionValues }
  | { status: "error"; message: string };

const LIMITS = { suggestion: 2000, name: 80, contact: 120 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

/**
 * The key comes from process.env under `next dev` / `next start`. On Cloudflare
 * Workers it is a secret on the Worker env, which OpenNext exposes through
 * getCloudflareContext — read that as a fallback so both paths work.
 */
async function getResendApiKey(): Promise<string | undefined> {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY;
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    return (env as Record<string, string | undefined>).RESEND_API_KEY;
  } catch {
    return undefined;
  }
}

function buildMailto({ suggestion, name, contact }: SuggestionValues) {
  const from = [name, contact].filter(Boolean).join(" · ");
  const body = `${suggestion}${from ? `\n\n— ${from}` : ""}`;
  return `mailto:${business.email}?subject=${encodeURIComponent(
    "Suggestion from the website",
  )}&body=${encodeURIComponent(body)}`;
}

/**
 * Delivers a suggestion-box submission to the shop inbox.
 *
 * With RESEND_API_KEY set it is relayed through Resend. Without it, the
 * composed message is returned as a mailto: link so the visitor can send it
 * from their own mail app — the box is never a dead end.
 */
export async function sendSuggestion(
  _prev: SuggestionState,
  formData: FormData,
): Promise<SuggestionState> {
  // Honeypot: real visitors never see this field; bots fill everything.
  if (clean(formData.get("website"), 10)) return { status: "sent" };

  const values: SuggestionValues = {
    suggestion: clean(formData.get("suggestion"), LIMITS.suggestion),
    name: clean(formData.get("name"), LIMITS.name),
    contact: clean(formData.get("contact"), LIMITS.contact),
  };

  if (values.suggestion.length < 10) {
    return {
      status: "invalid",
      message: "Give us a little more to go on — a sentence or two.",
      values,
    };
  }

  if (!business.email) {
    return { status: "error", message: "The suggestion box is not set up yet. Tell us in store instead." };
  }

  const apiKey = await getResendApiKey();
  if (!apiKey) {
    return { status: "unconfigured", mailto: buildMailto(values), values };
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? "Vapor Pulse Website <onboarding@resend.dev>";
  const replyTo = EMAIL_RE.test(values.contact) ? values.contact : undefined;
  const text = [
    values.suggestion,
    "",
    `From: ${values.name || "(no name given)"}`,
    `Contact: ${values.contact || "(none given)"}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [business.email],
        subject: "Suggestion from the website",
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      console.error("[suggestion] Resend rejected the message:", res.status, await res.text().catch(() => ""));
      return { status: "error", message: "We could not send that just now. Please try again later or tell us in store." };
    }
    return { status: "sent" };
  } catch (err) {
    console.error("[suggestion] send failed:", err);
    return { status: "error", message: "We could not send that just now. Please try again later or tell us in store." };
  }
}
