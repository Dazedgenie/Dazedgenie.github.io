# Separate the logo's eyes into: an eye-opening mask, an eye image with the iris painted out, and an iris layer.
import sys, json
from PIL import Image, ImageFilter, ImageChops, ImageDraw
import numpy as np
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
a = np.asarray(im).astype(int)
R, G, B = a[..., 0], a[..., 1], a[..., 2]
EYES = {"left": (500, 236, 585, 282), "right": (590, 255, 645, 295)}
CENTRES = {"left": (540, 251), "right": (612.5, 273)}  # set by eye from a zoomed crop
meta = {}
for name, (x0, y0, x1, y1) in EYES.items():
    r, g, b = R[y0:y1, x0:x1], G[y0:y1, x0:x1], B[y0:y1, x0:x1]
    eye = (r > b + 25) & (r > 120)                       # pink/red sclera + iris, not blue skin
    iris = eye & (g < 90) & (r > 150) & (r - g > 110)     # saturated dark red
    # keep the largest iris blob near the centre of mass
    ys, xs = np.nonzero(iris)
    cy, cx = np.median(ys), np.median(xs)
    iris &= ((np.indices(iris.shape)[0] - cy) ** 2 + (np.indices(iris.shape)[1] - cx) ** 2) < 16 ** 2
    cx, cy = CENTRES[name][0] - x0, CENTRES[name][1] - y0
    rad = 11
    print(name, "eye px", eye.sum(), "iris centre", x0 + cx, y0 + cy, "r", rad)
    w, h = x1 - x0, y1 - y0
    yy, xx = np.indices(eye.shape)
    eye = eye | (((yy - cy) ** 2 + (xx - cx) ** 2) < (rad - 1) ** 2)
    m = Image.fromarray((eye * 255).astype("uint8")).filter(ImageFilter.MaxFilter(3))
    # fill enclosed holes: flood the background from a padded border, everything unreached is eye
    pad = Image.new("L", (w + 2, h + 2), 0); pad.paste(m, (1, 1))
    ImageDraw.floodfill(pad, (0, 0), 128)
    m = Image.fromarray(((np.asarray(pad) != 128) * 255).astype("uint8")[1:-1, 1:-1])
    m = m.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7))
    # iris layer: a soft disc of original pixels
    disc = Image.new("L", (w, h), 0)
    ImageDraw.Draw(disc).ellipse((cx - rad, cy - rad, cx + rad, cy + rad), fill=255)
    disc = disc.filter(ImageFilter.GaussianBlur(1.2))
    crop = im.crop((x0, y0, x1, y1))
    iris_img = crop.convert("RGBA"); iris_img.putalpha(disc)
    # sclera patch: paint the iris out with the surrounding sclera colour
    sclera = eye & ~iris
    col = tuple(int(np.median(c[sclera & (r > 200)])) for c in (r, g, b))
    plate = crop.copy()
    fill = Image.new("RGB", (w, h), col)
    grow = disc.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(2))
    plate = Image.composite(fill, plate, grow)
    plate = plate.convert("RGBA"); plate.putalpha(m)
    m.save(f"{out}/eye-{name}-mask.png"); plate.save(f"{out}/eye-{name}-plate.png"); iris_img.save(f"{out}/eye-{name}-iris.png")
    meta[name] = {"x": x0, "y": y0, "w": w, "h": h, "cx": round(x0 + cx, 1), "cy": round(y0 + cy, 1), "sclera": col}
print(json.dumps(meta))
