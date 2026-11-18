#!/usr/bin/env bash
# Shrinks images in assets/images/uploads/ in place: at most 1600 px on the
# long side, rotated upright, metadata removed (including phone GPS location),
# and recompressed. File names stay the same, so links in posts keep working.
#
# Runs automatically in .github/workflows/deploy.yml on every deploy, on a copy
# of the repository, so the originals you upload stay untouched in GitHub.
# To run locally: brew install imagemagick pngquant
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/assets/images/uploads"
MAX=1600

if command -v magick >/dev/null; then MOGRIFY=(magick mogrify); else MOGRIFY=(mogrify); fi

shopt -s nullglob nocaseglob
for f in "$DIR"/*.{jpg,jpeg,png,webp}; do
  before=$(wc -c < "$f")
  ext=$(echo "${f##*.}" | tr '[:upper:]' '[:lower:]')
  case "$ext" in
    png)
      "${MOGRIFY[@]}" -auto-orient -resize "${MAX}x${MAX}>" -strip "$f"
      pngquant --quality 65-90 --skip-if-larger --force --output "$f" -- "$f" || true
      ;;
    webp)
      "${MOGRIFY[@]}" -auto-orient -resize "${MAX}x${MAX}>" -strip -quality 80 "$f"
      ;;
    *)
      "${MOGRIFY[@]}" -auto-orient -resize "${MAX}x${MAX}>" -strip -sampling-factor 4:2:0 -interlace JPEG -quality 82 "$f"
      ;;
  esac
  after=$(wc -c < "$f")
  echo "$(basename "$f"): $((before / 1024)) KB -> $((after / 1024)) KB"
done
