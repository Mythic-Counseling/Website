# New artwork: prompts and placement

The site has 10 illustrations, and several now appear twice (the tree of life medallion, profile head and olive column each serve a service **and** another section). Four new emblems in the same style would give every section its own image. The service metaphors stay as they are: the cairn (consultation), the head with a tree (individual), the tree of life (group) and the column (peer support).

## Matching the style

Every emblem on the site shares these traits. Keep them in every prompt:

- 3:2 landscape (1536 × 1024), subject centred with generous margins
- Aged parchment background (warm tan, about `#F2CFA1`) with a subtle paper texture and a faint vignette
- Vintage sepia, hand-drawn engraving look with soft painterly shading; browns and ochres, with **muted olive green** only on leaves
- A thin **golden-brown circular arc** framing the subject, open at the bottom
- **Olive branches with olives** curving up from the bottom, or around the sides
- No text, no people's faces in close-up, no modern objects, no harsh black outlines

**Best results:** use an image model that accepts reference images (for example Gemini "Nano Banana", GPT-Image with image input, or Midjourney `--sref`). Attach two existing emblems, such as `olive-cairn-emblem.png` and `moon-laurel-crest.png` from `assets/images/original/`, and say "match the style of the reference images exactly." Text-only prompts drift noticeably.

### Shared style text (append to each prompt)

> Vintage sepia engraving-style illustration on aged parchment paper, warm tan background with subtle paper texture and soft vignette, hand-drawn with soft painterly shading in browns and ochre, muted olive-green leaves, the subject centred inside a thin golden-brown circular arc that is open at the bottom, framed by curving olive branches with small olives, classical Greek mythology emblem, calm and timeless, generous empty margins, no text, no border, 3:2 landscape.

## The four images

| # | File name | Subject (prompt start) | Replaces the duplicate in | Set in |
| --- | --- | --- | --- | --- |
| 1 | `oil-lamp-emblem.png` | "An ancient Greek clay oil lamp with a single steady flame, resting on an open scroll" — reflection and well-being as an art | Home → My Philosophy (currently the profile head) | `content/_data/copy.yml` → `home.philosophy.image` |
| 2 | `mountain-path-emblem.png` | "A winding stone path climbing a gentle mountain toward a small classical temple at the summit, a rising sun behind" — the journey of counseling | Services page → approach (currently the tree of life medallion) | `content/_data/copy.yml` → `approach.image` |
| 3 | `labyrinth-thread-emblem.png` | "A circular classical labyrinth seen from above, with a single golden thread (Ariadne's thread) tracing a path from the entrance toward the centre" — finding a way through difficult experiences | About → My Specialties (currently the olive column) | `content/_data/copy.yml` → `about.specialties_image` |
| 4 | `open-doorway-emblem.png` | "An open classical stone archway with two steps, warm light spilling through, an olive vine growing up one side" — beginning, an invitation | Contact page (currently the stock photo of a surgeon) | `content/_data/copy.yml` → `contact.image` |

Optional fifth image: `two-cups-emblem.png`, "two simple clay cups side by side on a low table" (a conversation), to replace the stock interior photo behind the closing "Begin Your Mythic Journey" band.

## Adding an image to the site

1. Save the PNG (1536 × 1024) into `assets/images/original/` using the file name above.
2. Run `theme/scripts/optimize-images.sh`.
3. Add an entry to `content/_data/images.yml`, copying an existing emblem's entry and changing the alt text:

   ```yaml
   oil-lamp-emblem:
     width: 1536
     height: 1024
     widths: [640, 1024, 1536]
     fallback: 1024
     alt: "Ancient oil lamp with a steady flame resting on an open scroll"
   ```

4. Put the key (`oil-lamp-emblem`) in the matching `image:` field in `content/_data/copy.yml`.
