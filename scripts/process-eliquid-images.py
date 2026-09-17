from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

ROOT = Path(__file__).resolve().parents[1] / "public/products/e-liquids"


def background(size):
    w, h = size
    y, x = np.mgrid[0:h, 0:w]
    base = np.zeros((h, w, 3), dtype=np.float32)
    t = y / max(h - 1, 1)
    base[:] = (5, 7, 14)
    base += t[..., None] * np.array([8, 11, 18])
    for cx, color, strength in [(-0.05*w, (180, 0, 255), 0.32), (1.05*w, (0, 180, 255), 0.30)]:
        d = ((x-cx)/(0.52*w))**2 + ((y-0.55*h)/(0.72*h))**2
        glow = np.exp(-3*d)[..., None] * np.array(color) * strength
        base += glow
    floor = np.clip((t-0.72)/0.28, 0, 1)[..., None]
    base += floor * np.array([5, 7, 11])
    return Image.fromarray(np.uint8(np.clip(base, 0, 255)))


def process(path):
    src = Image.open(path).convert("RGB")
    w, h = src.size
    # Flood-fill only the white backdrop connected to the canvas edges, preserving
    # white labels and caps enclosed by the product silhouette.
    seed = src.copy()
    mask = Image.new("L", (w, h), 0)
    pix = np.asarray(src)
    white = np.uint8(np.where((pix.min(2) > 225) & ((pix.max(2)-pix.min(2)) < 28), 255, 0))
    white_im = Image.fromarray(white)
    seen = Image.new("L", (w, h), 0)
    for corner in [(0,0),(w-1,0),(0,h-1),(w-1,h-1)]:
        if white_im.getpixel(corner) > 0:
            ImageDraw.floodfill(white_im, corner, 128, thresh=20)
    bgmask = white_im.point(lambda v: 255 if v == 128 else 0).filter(ImageFilter.GaussianBlur(max(1, w//500)))
    alpha = Image.eval(bgmask, lambda v: 255-v)
    out = background((w, h)).convert("RGBA")
    subject = src.convert("RGBA")
    subject.putalpha(alpha)
    out.alpha_composite(subject)
    out = out.convert("RGB").resize((1254, 1254), Image.Resampling.LANCZOS)
    out.save(path.with_name(path.stem + "-transformed.webp"), "WEBP", quality=92, method=6)


for source in sorted(ROOT.glob("*.webp")):
    if not source.stem.endswith("-transformed") and not source.with_name(source.stem + "-transformed.webp").exists():
        process(source)
