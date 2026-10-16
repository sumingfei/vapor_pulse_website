#!/usr/bin/env python3
"""Export the poster HTML to print-ready US Letter PDFs.

WHY THIS IS NOT JUST `chrome --print-to-pdf`
--------------------------------------------
The posters use blurred glow layers, `mix-blend-mode` and a gradient headline
clipped with `background-clip:text`. Chrome renders all of that correctly on
screen, but when it writes them straight to PDF it emits transparency groups
and soft masks that macOS's own PDF engine (Preview, Quick Look, and the
print path that feeds many desktop printers) renders wrong: the gradient
headline comes out as an opaque rectangle whose edge cuts a hard horizontal
line across the line of type above it, and the glows come out as flat blocks.

So we flatten first: render the page to a 300 dpi bitmap with Chrome (which is
correct), then wrap that bitmap in a Letter-sized PDF. Every viewer and printer
then sees exactly what the browser drew. 300 dpi is standard print resolution,
and the QR survives it comfortably - roughly 17 device pixels per module.

The .html files remain the vector source of truth and still look right in any
browser; only the PDF is flattened.
"""
import pathlib, subprocess, sys

HERE = pathlib.Path(__file__).parent
OUT = HERE.parent

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# US Letter at 96 CSS px/in, and the scale that lands it on 300 dpi.
CSS_W, CSS_H = 816, 1056
SCALE = 3.125  # 816 * 3.125 = 2550 = 8.5in * 300dpi

VARIANTS = ["google-review-poster-letter", "google-review-poster-letter-light"]


def chrome(*args):
    r = subprocess.run([CHROME, "--headless", "--disable-gpu", *args],
                       capture_output=True, text=True)
    # Chrome chatters harmlessly on stderr about GPU/display on macOS.
    if r.returncode != 0:
        sys.exit(f"chrome failed ({r.returncode}):\n{r.stderr[-2000:]}")


for name in VARIANTS:
    page = OUT / f"{name}.html"
    if not page.exists():
        sys.exit(f"missing {page} - run build.py first")

    # 1. flatten to a 300 dpi bitmap
    png = OUT / f"{name}.print.png"
    chrome(f"--screenshot={png}", f"--window-size={CSS_W},{CSS_H}",
           f"--force-device-scale-factor={SCALE}",
           "--hide-scrollbars", "--virtual-time-budget=8000",
           page.resolve().as_uri())

    # 2. wrap it in a Letter page, edge to edge
    shim = OUT / f".{name}.shim.html"
    shim.write_text(
        "<!doctype html><meta charset=utf-8>"
        "<style>@page{size:letter;margin:0}"
        "html,body{margin:0;padding:0;width:8.5in;height:11in}"
        "img{display:block;width:8.5in;height:11in}</style>"
        f'<img src="{png.name}">'
    )
    pdf = OUT / f"{name}.pdf"
    chrome("--no-pdf-header-footer", f"--print-to-pdf={pdf}",
           "--virtual-time-budget=8000", shim.resolve().as_uri())

    shim.unlink()
    png.unlink()
    print(f"wrote {pdf.name} ({pdf.stat().st_size/1024/1024:.1f} MB)")
