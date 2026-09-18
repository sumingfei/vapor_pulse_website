# Vapor Pulse — Irving, TX

Marketing and catalog site for the Vapor Pulse vape shop at 2816 N O'Connor Rd,
Irving, Texas. Built to rank for local search and convert visitors into store
visits — not to sell online.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · React 19

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## The one rule

**All business information lives in [`src/data/business.ts`](src/data/business.ts).**

Name, address, phone, hours, timezone, rating, Google URLs and social links are
defined once and consumed everywhere — components, page metadata, JSON-LD and
the footer. Never retype the phone number or address in a component: NAP
(Name/Address/Phone) consistency is a direct local-SEO ranking factor, and one
stale copy undoes it.

## Editing content

| What | Where | Current state |
| --- | --- | --- |
| Address, phone, hours, rating | `src/data/business.ts` | Live |
| Product categories | `src/data/categories.ts` | 8 categories |
| Product catalog | `src/data/catalog.json` (generated) | Disposable Vapes, Vape Devices, E-Liquids, Tanks published |
| Rewards program | `src/data/rewards.ts` | Redemption tiers confirmed; earn rate still unconfirmed |
| FAQs | `src/data/faqs.ts` | 8 questions |
| About copy | `src/data/about.ts` | Live, no dates claimed |
| Navigation | `src/data/navigation.ts` | Live |

Empty data files are **deliberate**, not unfinished. Each one renders a
polished "call the shop" state instead of placeholder text, and switches to the
full UI as soon as real entries are added. Nothing about inventory, pricing
or loyalty rules is invented anywhere in this codebase.

## Product catalog

Product listings come from the shop's POS inventory export, which contains
cost, margin and stock data and therefore **must never be committed or placed
under `public/`**. The workflow keeps it private:

1. Drop the export CSV into `data/inventory/` (git-ignored).
2. Run `npm run import:inventory`.
3. Commit the regenerated `src/data/catalog.json` — it carries only product
   name, category and image path.

Product photos live under `public/products/<category-slug>/` and are
referenced by the CSV's `ImageLocation` column. Only categories listed in
`PUBLISHED_CATEGORIES` in `scripts/import-inventory.mjs` are published; add a
label there to publish another category. `PREFER_TRANSFORMED` switches to the
dark-background `-transformed` renders where they exist.

## Suggestion box

The homepage suggestion box submits through a server action
(`src/app/actions/suggestion.ts`) that delivers to `business.email`.

- **With `RESEND_API_KEY` set** the message is relayed via Resend's REST API,
  with `reply_to` set to the visitor's address when they gave one.
- **Without it** the action returns the composed message as a `mailto:` link
  and the dialog opens the visitor's own mail app — never a dead end.

Resend's free tier only delivers to the account owner's own address until a
sending domain is verified, so either verify a domain and set
`CONTACT_FROM_EMAIL`, or register the Resend account with the shop inbox.
On Cloudflare, set the key as a Worker secret: `wrangler secret put RESEND_API_KEY`.

## Store hours

`src/lib/hours.ts` is the single source of truth for open/closed logic. All
calculations run in the store's timezone (`America/Chicago`), never the
visitor's, and DST is handled by `Intl` rather than manual offsets.

Hours render on the server for crawlers; the live "Open Now / Closed" badge and
the "today" highlight are computed on the client via `useSyncExternalStore`, so
every page stays statically prerendered.

## Configuration

See [`.env.example`](.env.example). Every variable is optional — the site works
with none of them set. Before launch you should at minimum set
`NEXT_PUBLIC_SITE_URL`.

## SEO

- Unique title + meta description + canonical per route (`src/lib/seo.ts`)
- JSON-LD: `TobaccoShop` (with NAP, hours, areaServed), `WebSite`,
  `BreadcrumbList` on every interior page, `FAQPage` on `/faq` (`src/lib/schema.ts`)
- `sitemap.xml` and `robots.txt` generated from the business config
- Legal pages are `noindex`

`AggregateRating` is **off by default** (`business.rating.includeInStructuredData`).
Self-serving rating markup on your own LocalBusiness falls outside Google's
review-snippet guidelines. The 4.8 rating is still shown on-page as a
manually-updated snapshot, clearly labelled as not being a live feed.

## Analytics

`src/lib/analytics.ts` exposes `track(event)` with named local-conversion
events: `click_call`, `click_directions`, `click_google_reviews`,
`click_leave_review`, `view_hours`, `click_product_category`, `click_rewards`.

With no provider configured it is a no-op. It auto-detects `gtag` or
`dataLayer` when one is added — no component changes needed.

## Brand assets

Originals live in `assets/`. Production crops are in `public/brand/`, generated
from those originals.

`PUFF.png` is a 12-option concept sheet and `puff_neon_sign.png` is a neon-sign
product sheet, so single designs were cropped out of each rather than used
whole. The confirmed mascot is the **"Neon Glasses" PUFF** — neon-sign Design 6
(`puff-neon-sign-v2.png`) and its illustrated twin from the mascot sheet
(`puff-mascot-badge-v2.png`). Both are the same character; nothing else should be
used as PUFF. `assets/WAVE.png` is a different mascot (BLAZE), not currently
part of the brand, and is unused.

**Replacing artwork: always use a new filename.** Overwriting a file in
`public/brand/` in place leaves stale copies in Next's image cache, browser
caches and any CDN, because the URL never changed — visitors keep seeing the
old image. Ship `puff-mascot-badge-v3.png` rather than overwriting
`puff-mascot-badge-v2.png`.

Artwork sits on solid black and is composited with `mix-blend-mode: screen`.
If a mascot ever renders as a black rectangle, an ancestor has gained a
`transform`, `opacity` or `isolate` that traps the blend — see the note in
`src/components/brand/PuffMascot.tsx`.
