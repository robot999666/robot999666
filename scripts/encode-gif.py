"""Encode original rendered frames using one shared palette for stable colors.

Usage: python scripts/encode-gif.py
Requires Pillow. Uses only local SVG-rendered PNG frames.
"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
FRAMES = sorted((ROOT / "output" / "frames").glob("*.png"))
if len(FRAMES) != 40:
    raise SystemExit(f"Expected 40 frames from render-assets.mjs; found {len(FRAMES)}")
images = [Image.open(path).convert("RGB") for path in FRAMES]

# Quantize the whole animation once; each frame then uses the same 256 colors.
# This prevents the flicker caused by a independently quantized frame palette.
palette_source = Image.new("RGB", (560 * 5, 168 * 8), "#FAF8F0")
for index, frame in enumerate(images):
    palette_source.paste(frame.resize((560, 168)), ((index % 5) * 560, (index // 5) * 168))
palette = palette_source.quantize(colors=256, method=Image.Quantize.MEDIANCUT)
indexed = [frame.quantize(palette=palette, dither=Image.Dither.NONE) for frame in images]
target = ROOT / "assets" / "window-garden.gif"
indexed[0].save(target, save_all=True, append_images=indexed[1:], duration=200,
                loop=0, optimize=False, disposal=1)

sheet = Image.new("RGB", (1120, 336 * 4 + 32 * 4), "#FAF8F0")
draw = ImageDraw.Draw(sheet)
for row, index in enumerate((0, 10, 20, 30)):
    offset = row * (336 + 32)
    sheet.paste(images[index], (0, offset))
    draw.text((18, offset + 341), f"Frame {index:02d} | {index * 0.2:.1f}s", fill="#5B705E")
sheet.save(ROOT / "output" / "animation-contact-sheet.png")
with Image.open(target) as result:
    durations = []
    for index in range(result.n_frames):
        result.seek(index)
        durations.append(result.info.get("duration", 0))
    print(f"{target}: {result.size[0]}x{result.size[1]}, {result.n_frames} frames, "
          f"{sum(durations) / 1000:.1f}s, infinite loop, {target.stat().st_size:,} bytes")
