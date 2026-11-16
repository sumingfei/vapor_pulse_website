#!/usr/bin/env python3
"""Build the A4 "leave us a Google review" poster.

Every piece of business data is pulled straight out of src/data/business.ts so
the poster can never drift from the canonical NAP. If a field moves, this
script fails loudly rather than printing a stale address.
"""
import base64, pathlib, re, sys

REPO = pathlib.Path(__file__).resolve().parents[3]
HERE = pathlib.Path(__file__).parent
OUT = REPO / "assets" / "print"

src = (REPO / "src" / "data" / "business.ts").read_text()


def grab(pattern):
    m = re.search(pattern, src)
    if not m:
        sys.exit(f"business.ts no longer matches: {pattern}")
    return m.group(1)


place_id = grab(r'\?\?\s*"(ChIJ[^"]+)"')

review_url = f"https://search.google.com/local/writereview?placeid={place_id}"
# The QR in src/qr.svg is prebuilt, so this is the check that it still matches
# the Place ID in business.ts. If this URL changes, re-run src/gen.js.
print("review url:", review_url)


def b64(p):
    return base64.b64encode(pathlib.Path(p).read_bytes()).decode()


def star(fill):
    return (
        f'<svg viewBox="0 0 24 24" fill="{fill}" xmlns="http://www.w3.org/2000/svg">'
        '<path d="M12 1.6l3.09 6.26 6.91 1.01-5 4.87 1.18 6.88L12 17.37l-6.18 3.25'
        'L7 13.74l-5-4.87 6.91-1.01L12 1.6z"/></svg>'
    )


common = {
    "__ANTON__": b64(HERE / "anton.woff2"),
    "__INTER__": b64(HERE / "inter.woff2"),
    "__QR__": b64(HERE / "qr.svg"),
    "__WORDMARK__": b64(REPO / "public/brand/vapor-pulse-wordmark.png"),
    "__PUFF__": b64(REPO / "public/brand/puff-mascot-badge-v2.png"),
}

# The two variants differ only in star fill: the neon amber that glows on black
# is too pale to read as a star on white paper.
VARIANTS = [
    ("template.html", "google-review-poster-letter.html", "#FFC83C"),
    ("template-light.html", "google-review-poster-letter-light.html", "#E0A008"),
]

OUT.mkdir(parents=True, exist_ok=True)

for tpl, out_name, star_fill in VARIANTS:
    html = (HERE / tpl).read_text()
    subs = dict(common, __STARS__=star(star_fill) * 5)
    for k, v in subs.items():
        # Not every template uses every asset (the light one drops the mascot).
        if k in html:
            html = html.replace(k, v)
    leftover = set(re.findall(r"__[A-Z_]+__", html))
    if leftover:
        sys.exit(f"{tpl}: unsubstituted placeholders: {leftover}")
    dest = OUT / out_name
    dest.write_text(html)
    print("wrote", dest, f"({dest.stat().st_size/1024:.0f} KB)")
