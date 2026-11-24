#!/usr/bin/env python3
"""Build the US Letter "Loyalty Mystery Giveaway" posters (dark + light).

Reads the point cost from src/data/rewards.ts so the poster fails loudly
instead of advertising a stale price if the mystery box tier moves.
"""
import base64, pathlib, re, sys

REPO = pathlib.Path(__file__).resolve().parents[3]
HERE = pathlib.Path(__file__).parent
OUT = REPO / "assets" / "print"

rewards = (REPO / "src" / "data" / "rewards.ts").read_text()
m = re.search(r'points:\s*(\d+),\s*reward:\s*"Free mystery box"', rewards)
if not m:
    sys.exit("rewards.ts has no 'Free mystery box' tier any more")
if m.group(1) != "388":
    sys.exit(f"mystery box now costs {m.group(1)} points - update template-mystery.html")


def b64(p):
    return base64.b64encode(pathlib.Path(p).read_bytes()).decode()


subs = {
    "__ANTON__": b64(HERE / "anton.woff2"),
    "__INTER__": b64(HERE / "inter.woff2"),
    "__QR__": b64(HERE / "qr-rewards.svg"),
    # First frame of public/rewards/mystery-box-cube-animated.gif, upscaled 3x.
    "__BOX__": b64(HERE / "mystery-box.png"),
    "__WORDMARK__": b64(REPO / "public/brand/vapor-pulse-wordmark.png"),
    "__PUFF__": b64(REPO / "public/brand/puff-mascot-badge-v2.png"),
}

VARIANTS = [
    ("template-mystery.html", "mystery-giveaway-poster-letter.html"),
    ("template-mystery-light.html", "mystery-giveaway-poster-letter-light.html"),
]

for tpl, out_name in VARIANTS:
    html = (HERE / tpl).read_text()
    for k, v in subs.items():
        html = html.replace(k, v)
    leftover = set(re.findall(r"__[A-Z_]+__", html))
    if leftover:
        sys.exit(f"{tpl}: unsubstituted placeholders: {leftover}")
    dest = OUT / out_name
    dest.write_text(html)
    print("wrote", dest, f"({dest.stat().st_size/1024:.0f} KB)")
