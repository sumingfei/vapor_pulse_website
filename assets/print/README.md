# Print assets

## Google review poster (US Letter)

Two US Letter pages (8.5 × 11 in / 215.9 × 279.4 mm), same message, same QR —
pick by printer:

| File | Use |
| --- | --- |
| `google-review-poster-letter.pdf` | Full neon artwork on black. Best from a print shop or a borderless printer. ~68% ink coverage. |
| `google-review-poster-letter-light.pdf` | White background, dark type. For the office printer — ~13% ink coverage, roughly a fifth of the dark version. |

The light variant shares its background and borders with
`suggestion-poster-letter-light` so the two read as a set: the same three brand
glows dialled down to a faint pastel wash on white, the same violet hairline
frame inset 7 mm from the trim, and the same violet QR card border with a cyan
ring. It sets the wordmark and the Puff badge on small dark panels (both pieces
of artwork are neon-on-black and cannot sit on white) and outlines the step
markers instead of filling them. Its accent gradient and star fill use darkened
brand equivalents, because the screen cyan and amber are too pale to read as ink
on paper. The dark variant already uses that same frame and glow language in its
neon form.

The `.html` next to each PDF is the same artwork as a self-contained file
(fonts, logos and QR are all embedded as base64, so it renders identically
offline and on any machine).

The QR encodes the canonical write-a-review deep link, built from the Place ID
confirmed by the shop:

```
https://search.google.com/local/writereview?placeid=ChIJa5iB42uDToYRg7jh2Z3Xzbs
```

That is the same URL behind the site's "Leave Us a Review" button, so the
poster and the website always point at one listing.

The page size is set in CSS (`@page{ size:letter }`) in both templates, and the
vertical rhythm is tuned to the 279.4 mm height — switching back to A4 means
re-checking that the footer still lands on the page.

### Printing

Print at **100% / "Actual size"** on both — do *not* use "Fit to page", which
shrinks the QR's quiet zone.

The dark version is full-bleed black, so a borderless printer or a print shop
gives the best result; an office printer will leave its usual white margin,
which is harmless. The light version is designed around that margin and needs
no special handling.

### Regenerating

The poster carries no address, phone or shop name - it hangs in the shop, so
the only thing it needs to say is how to leave the review. `build.py` still
reads the Place ID out of `src/data/business.ts` and prints the review URL, so
a changed listing shows up as a mismatch with the prebuilt QR. To rebuild:

```bash
cd assets/print && python3 src/build.py
```

That rebuilds both variants from `src/template.html` and
`src/template-light.html`. Then re-export the PDFs:

```bash
cd assets/print && python3 src/export.py
```

### Why the PDFs are flattened

Do **not** replace `src/export.py` with a plain `chrome --print-to-pdf`. The
posters use blurred glow layers, `mix-blend-mode` and a gradient headline
clipped with `background-clip:text`. Chrome draws all of that correctly on
screen, but writing it straight to PDF emits transparency groups and soft masks
that macOS's own PDF engine (Preview, Quick Look, and the print path behind
many desktop printers) gets wrong: the gradient headline came out as an opaque
rectangle whose top edge cut a hard horizontal line across "LEAVE US A", and
the glows came out as flat blocks.

`export.py` therefore renders each page to a 300 dpi bitmap with Chrome first
and wraps that in a Letter-sized PDF, so every viewer and printer gets exactly
what the browser drew. The QR is unaffected - about 17 device pixels per
module, and it still decodes from the exported PDF.

The `.html` files stay the vector source and still look right in any browser;
only the PDFs are flattened.

`src/gen.js` regenerates `src/qr.svg` (needs `npm i qrcode`) and is only needed
if the Place ID changes. The QR is error-correction level H, so it still scans
with a logo sticker or a scuff over ~30% of it.

## Loyalty Mystery Giveaway poster (US Letter)

Two variants, same split as the posters above:

| File | Use |
| --- | --- |
| `mystery-giveaway-poster-letter.pdf` | Full neon artwork on black, for a print shop or borderless printer. |
| `mystery-giveaway-poster-letter-light.pdf` | White page for the office printer. The box art, wordmark and Puff sit on dark tiles (they are neon-on-black art); everything else is outlines and print-safe type. |

Both advertise the 388-point
mystery box tier, the prize ladder from the shop's "Mystery Gifts" sheet
(grand prizes TV and PlayStation down to a squishy or any 3 snacks), and a QR
to `https://vaporpulseshop.com/rewards`. It deliberately prints no odds or
counts, since the prize sheet and the gift sequence don't agree on totals.

The box art (`src/mystery-box.png`) is the first frame of
`public/rewards/mystery-box-cube-animated.gif`, upscaled 3x. The source is
only 356 px, so the box prints a little soft; swap in higher-res art if it
exists.

```bash
cd assets/print && python3 src/build_mystery.py
cd assets/print && python3 src/export.py mystery-giveaway-poster-letter mystery-giveaway-poster-letter-light
```

`build_mystery.py` fails if the mystery box tier in `src/data/rewards.ts` no
longer costs 388 points. `src/gen-rewards-qr.js` regenerates the QR.
