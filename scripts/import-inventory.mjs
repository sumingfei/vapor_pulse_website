#!/usr/bin/env node
/**
 * Builds the public product catalog from the shop's inventory export.
 *
 *   npm run import:inventory
 *
 * Reads every CSV in data/inventory/ (git-ignored — those exports contain
 * cost, margin and stock counts) and writes src/data/catalog.json containing
 * ONLY what the website is allowed to show: product name, category and image.
 * Nothing about price, cost, margin or quantity ever leaves this script.
 *
 * Expected columns: Item, Category, ImageLocation (others are ignored).
 * ImageLocation is a path under /public, e.g. /products/disposable-vapes/x.webp
 * Rows with an empty ImageLocation are not published.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const INVENTORY_DIR = join(ROOT, "data", "inventory");
const PUBLIC_DIR = join(ROOT, "public");
const OUT_FILE = join(ROOT, "src", "data", "catalog.json");

/** CSV category label → site category slug (src/data/categories.ts). */
const CATEGORY_SLUGS = {
  "Disposable Vapes": "disposable-vapes",
  "Vape Devices": "vape-devices",
  "E-Liquids": "e-liquids",
  "Pods & Coils": "pods-and-coils",
  Tanks: "tanks",
  "Herbal Wellness": "herbal-wellness",
  "Smokers Corner": "smokers-corner",
  Accessories: "accessories",
};

/**
 * Categories published on the site. Add a label here to start showing that
 * category's products; everything else in the export is skipped.
 */
const PUBLISHED_CATEGORIES = new Set(["Disposable Vapes", "Vape Devices", "E-Liquids", "Tanks", "Herbal Wellness", "Pods & Coils"]);

/**
 * When true, and a "<name>-transformed.<ext>" file exists next to the image the
 * CSV names, use it instead. Those are the dark-background renders that suit
 * the site's theme; the CSV itself keeps pointing at the white originals.
 */
const PREFER_TRANSFORMED = true;

/** Minimal RFC 4180 parser — handles quoted fields with commas and "" escapes. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

if (!existsSync(INVENTORY_DIR)) {
  console.error(`No inventory directory at ${INVENTORY_DIR}`);
  process.exit(1);
}

const csvFiles = readdirSync(INVENTORY_DIR).filter((f) => f.toLowerCase().endsWith(".csv"));
if (csvFiles.length === 0) {
  console.error(`No CSV files found in ${INVENTORY_DIR}`);
  process.exit(1);
}

const products = [];
const seenIds = new Set();
const skipped = { unpublished: 0, unknownCategory: [], noImageLocation: [], missingImage: [], duplicate: [] };

for (const file of csvFiles) {
  const text = readFileSync(join(INVENTORY_DIR, file), "utf8").replace(/^\uFEFF/, "");
  const [header, ...lines] = parseCsv(text);
  const col = Object.fromEntries(header.map((h, i) => [h.trim(), i]));

  for (const needed of ["Item", "Category", "ImageLocation"]) {
    if (!(needed in col)) {
      console.error(`${file}: missing required column "${needed}"`);
      process.exit(1);
    }
  }

  for (const line of lines) {
    // Collapse runs of whitespace — POS exports often carry double spaces.
    const name = (line[col.Item] ?? "").trim().replace(/\s+/g, " ");
    const category = (line[col.Category] ?? "").trim();
    const imagePath = (line[col.ImageLocation] ?? "").trim();
    if (!name) continue;

    if (!(category in CATEGORY_SLUGS)) {
      skipped.unknownCategory.push(`${name} (${category})`);
      continue;
    }
    if (!PUBLISHED_CATEGORIES.has(category)) {
      skipped.unpublished += 1;
      continue;
    }
    // Rows with no photo assigned in the POS are left off the site entirely.
    if (!imagePath) {
      skipped.noImageLocation.push(name);
      continue;
    }

    const id = slugify(name);
    if (seenIds.has(id)) {
      skipped.duplicate.push(name);
      continue;
    }
    seenIds.add(id);

    let image = null;
    const transformed = imagePath.replace(/(\.[a-z0-9]+)$/i, "-transformed$1");
    if (PREFER_TRANSFORMED && existsSync(join(PUBLIC_DIR, transformed))) {
      image = transformed;
    } else if (existsSync(join(PUBLIC_DIR, imagePath))) {
      image = imagePath;
    } else {
      skipped.missingImage.push(`${name} → ${imagePath}`);
    }

    products.push({ id, name, categorySlug: CATEGORY_SLUGS[category], image });
  }
}

products.sort((a, b) => a.name.localeCompare(b.name, "en"));

writeFileSync(OUT_FILE, `${JSON.stringify({ generatedAt: new Date().toISOString(), products }, null, 2)}\n`);

console.log(`Wrote ${products.length} products to src/data/catalog.json`);
console.log(`  published categories: ${[...PUBLISHED_CATEGORIES].join(", ")}`);
console.log(`  skipped (category not published): ${skipped.unpublished}`);
if (skipped.unknownCategory.length) {
  console.log(`  skipped (unknown category): ${skipped.unknownCategory.length}`);
  skipped.unknownCategory.slice(0, 10).forEach((s) => console.log(`    - ${s}`));
}
if (skipped.duplicate.length) {
  console.log(`  skipped (duplicate name): ${skipped.duplicate.length}`);
  skipped.duplicate.forEach((s) => console.log(`    - ${s}`));
}
if (skipped.noImageLocation.length) {
  console.log(`  skipped (no ImageLocation): ${skipped.noImageLocation.length}`);
  skipped.noImageLocation.forEach((s) => console.log(`    - ${s}`));
}
if (skipped.missingImage.length) {
  console.log(`  published WITHOUT image (file not found; placeholder shown): ${skipped.missingImage.length}`);
  skipped.missingImage.forEach((s) => console.log(`    - ${s}`));
}
