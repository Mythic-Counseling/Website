# Developer notes

How the site is put together, for changing the design or behaviour. For editing words, see the [README](../README.md).

## Stack

- **Jekyll**, built by GitHub's `actions/jekyll-build-pages` (Jekyll 3.10, safe mode, no custom plugins). It also builds with Jekyll 4 locally.
- **Deploy:** `.github/workflows/deploy.yml` runs on every push to `main`, daily at 10:00 UTC (so future-dated posts appear), and on demand. It compresses `assets/images/uploads/` with `theme/scripts/compress-uploads.sh` (ImageMagick + pngquant: max 1600 px, EXIF stripped, same file names) on the runner's copy only, then builds and publishes. The originals stay in git. GitHub pauses scheduled workflows after 60 days without commits; any push re-enables them.
- **Editor:** `.pages.yml` (Pages CMS). Every key in `content/_data/copy.yml`, `settings.yml` and `pages.yml`, and every front-matter key used in `content/_services/`, is declared there. Add new keys to it too, so a CMS save can't drop them.
- **Obsidian:** `.obsidian/app.json` and `templates.json` are committed; per-user workspace files are ignored.

## Layout

| Path | Purpose |
| --- | --- |
| `_config.yml` | `url`/`baseurl`, timezone, and the folder mapping: `collections_dir: content`, `data_dir: content/_data`, `layouts_dir: theme/_layouts`, `includes_dir: theme/_includes` |
| `content/` | Collections (`_posts`, `_drafts`, `_services`, `_specialties`) and data. `_templates/` holds the Obsidian post template and is not built |
| `content/_data/settings.yml` | Practice details, booking and form links (`site.data.settings.*`) |
| `content/_data/pages.yml` | Title, `seo_title` and description for each main page, looked up by the page's `page_key` in `theme/_includes/head.html` |
| `theme/pages/` | Home, Services, About, Contact, Blog and 404 templates (each sets its `permalink`) |
| `theme/_layouts/` | `default`, `service`, `post`, `redirect` |
| `theme/_includes/` | Header (with the reading-progress boulder), footer, booking dialog, cards, picture, SEO head and JSON-LD |
| `theme/seo/` | `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, `feed.xml`, `site.webmanifest`, all generated from content |
| `theme/redirects/` | Old Squarespace URLs and `/appointments/` → new pages |
| `theme/scripts/` | `optimize-images.sh` (artwork → responsive WebP/PNG), `compress-uploads.sh`, `extract-logo-art.py` |
| `assets/css/main.css` | All styles. Colours and fonts are tokens at the top; breakpoints at 700, 900 and 1100 px |
| `assets/js/main.js` | Menu, booking dialog and tabs, contact-form fallback, specialty animation, reading progress |
| `assets/images/original/` | Master artwork (not deployed) |
| `docs/reference/squarespace-export/` | The original saved Squarespace pages, for checking wording |

## Conventions

- Templates contain no copy: all wording comes from `content/`. Labels added during the redesign are marked `NEW` in `copy.yml`.
- Service and specialty bodies are split on a `<!--more-->` line (summary above, rest below), done in Liquid rather than with Jekyll excerpts.
- Empty settings may arrive as `""` or `null` from the CMS, so test with `x and x != ""`. Liquid's `blank` doesn't work in plain Jekyll.
- A post's `image` is either a key in `content/_data/images.yml` or a path such as `/assets/images/uploads/x.jpg`. `post.html` also rewrites the relative `src="assets/…"` paths that Obsidian writes.
- The Blog menu item (`requires: posts`) and `/blog/` indexing (`noindex_when_empty`) switch on with the first post. The newsletter signup, `/newsletter/` (`noindex_unless_newsletter`) and its footer link switch on when `settings.newsletter.action` is set.
- **Consent:** no third-party request is made on page load (fonts are self-hosted in `assets/fonts/`). Google iframes use `data-consent-src` (forms) or `data-src` (booking dialog) and load only after consent. `main.js` keeps the choice in `localStorage` (`mc-consent`), shows `cookie-notice.html` until answered, and swaps `consent-gate.html` prompts for the iframes. Any new third-party embed should follow the same pattern.
- Includes share Liquid variables with the page that includes them, so includes used inside page content use prefixed names (`gate_copy`, `nl_copy`), not `copy`.

## Artwork

Add a PNG to `assets/images/original/`, run `theme/scripts/optimize-images.sh` (needs `brew install webp`; uses macOS `sips`), add its entry to `content/_data/images.yml`, and reference its key. `theme/scripts/extract-logo-art.py` regenerates the transparent Sisyphus and boulder cut-outs from the logo. Prompts for new emblems: [image-prompts.md](image-prompts.md).

## Local preview and checks

```sh
JEKYLL_NO_BUNDLER_REQUIRE=true jekyll serve --livereload --drafts
```

The `Gemfile` pins the `github-pages` gem set for anyone who prefers `bundle exec jekyll serve`.
