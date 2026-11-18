#!/usr/bin/env bash
# Regenerates the responsive images in assets/images/ from the master PNGs in
# assets/images/original/. Requires cwebp (brew install webp) and macOS sips.
# Output per image: WebP at 640/1024/1536 px wide (capped at the source width)
# plus one 1024 px PNG fallback for browsers without WebP support.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/assets/images/original"
OUT="$ROOT/assets/images"
WIDTHS=(640 1024 1536)

for png in "$SRC"/*.png; do
  name="$(basename "$png" .png)"
  src_w="$(sips -g pixelWidth "$png" | awk '/pixelWidth/ {print $2}')"
  for w in "${WIDTHS[@]}"; do
    (( w > src_w )) && w="$src_w"
    cwebp -quiet -q 78 -m 6 -resize "$w" 0 "$png" -o "$OUT/$name-$w.webp"
  done
  fallback_w=$(( src_w < 1024 ? src_w : 1024 ))
  sips --resampleWidth "$fallback_w" "$png" --out "$OUT/$name-$fallback_w.png" >/dev/null
done

# Social sharing card (1200x630) and favicons.
sips --resampleHeight 630 "$SRC/mythic-sisyphus-emblem.png" --out "$OUT/og-mythic-counseling.png" >/dev/null
sips --padToHeightWidth 630 1200 --padColor F1DFC0 "$OUT/og-mythic-counseling.png" >/dev/null
sips -s format jpeg -s formatOptions 82 "$OUT/og-mythic-counseling.png" --out "$OUT/og-mythic-counseling.jpg" >/dev/null
rm "$OUT/og-mythic-counseling.png"

ICONS="$ROOT/assets/icons"
mkdir -p "$ICONS"
sips --cropToHeightWidth 1199 1199 "$SRC/tree-of-life-medallion.png" --out "$ICONS/icon-master.png" >/dev/null
for s in 32 180 192 512; do
  sips -z "$s" "$s" "$ICONS/icon-master.png" --out "$ICONS/icon-$s.png" >/dev/null
done
rm "$ICONS/icon-master.png"
