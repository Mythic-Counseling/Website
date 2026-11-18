# Mythic Counseling of Florida — website

The site for mythic-counseling.com. Every word on it lives in the **`content/`** folder; everything else is the design and machinery that turns those words into pages.

> **Two designs.** This is the `redesign` branch, built on top of `main`, which holds the original design and is what gets published. Switch with `git switch main` / `git switch redesign` (restart a running local preview afterwards). To publish this design, merge it into `main`: see [guide 1](docs/1-put-the-site-on-github.md#1-choose-which-design-to-publish).

## What to edit (and what to leave alone)

```
content/                  ← EDIT: everything you write
  _posts/                   blog posts, one file each
  _drafts/                  unpublished posts (never appear on the site)
  _services/                one file per service (page, card, menu, prices)
  _specialties/             one file per specialty on the About page
  _data/copy.yml            all other page wording (home, about, contact…)
  _data/settings.yml        email, booking calendars, form links
  _data/pages.yml           page titles and search descriptions
  _data/navigation.yml      the menu
  _data/images.yml          image descriptions (alt text)
assets/images/uploads/    ← your uploaded photos (compressed automatically)

docs/                     guides (start with the numbered ones)
theme/                    ✕ page templates, header, footer, SEO files
assets/css, assets/js     ✕ styles and scripts
_config.yml               ✕ technical settings
.github/, .pages.yml      ✕ publishing and editor setup
```

Anything marked ✕ only needs changing to alter the design or how the site works. Changing words never requires touching it.

Two conventions inside `content/`:

- Text between the `---` lines at the top of a file is **settings** (title, price, summary…); everything below is the **body**, written in Markdown (`**bold**`, `*italic*`, `[link](https://…)`, `## Heading`, a blank line for a new paragraph).
- In services and specialties, the text **above a `<!--more-->` line** is the short summary shown on cards and before "Read more".

## How to edit

| Tool | Best for | Needs |
| --- | --- | --- |
| **Pages CMS** (recommended) | Everyday edits and blog posts, in forms, from any browser or phone | A browser |
| **Obsidian** | Writing longer posts in a calm, distraction-free editor | The Obsidian app and git |
| **VS Code** | Bigger changes, previewing locally before publishing, design changes | VS Code, git and Jekyll |

You don't need VS Code to run the site. Details and setup for each: [docs/3-editing-tools.md](docs/3-editing-tools.md).

## Publishing changes

Every change that reaches the `main` branch on GitHub is published automatically, usually within two minutes:

- **Pages CMS:** each **Save** is published. Nothing else to do.
- **Obsidian / VS Code:** commit your change and **push** it. Always **pull** first if you also edit in Pages CMS, so the two never conflict.

To check progress, open the repository on GitHub → **Actions** tab. A green tick means the change is live. A red cross means the site was **not** updated (the previous version stays up); open the run to see which file has a problem, usually a missing quote or `---` in the settings at the top of a file.

## Writing a blog post

- **Pages CMS:** Blog posts → **Add an entry** → title, summary, post → **Save**. Turn **Published** off to keep it as a draft.
- **By hand:** copy `content/_drafts/example-post.md` (it shows every formatting option) into `content/_posts/` as `YYYY-MM-DD-short-title.md`, lowercase with hyphens. The date is the publish date; the rest becomes the address, `/blog/short-title/`.

Each post automatically gets its own page, a card on `/blog/`, a place in the RSS feed and sitemap, and search-engine markup. The **Blog** menu link appears once the first post is published.

**Images** go in `assets/images/uploads/` (Pages CMS and Obsidian put them there for you). They are resized to 1600 px and compressed when the site is published, and phone location data is removed. Use JPG or PNG; iPhone HEIC photos must be exported as JPG first. For a post's top image you can also name one of the site's emblems, such as `image: olive-cairn-emblem` (see `content/_data/images.yml`).

## Guides

1. [Put the site on GitHub and your domain](docs/1-put-the-site-on-github.md) — one-time setup
2. [Booking and forms with Google Workspace](docs/2-booking-and-forms.md) — replacing Acuity
3. [Editing tools: Pages CMS, Obsidian, VS Code](docs/3-editing-tools.md)

Also: [content ideas and gaps](docs/content-recommendations.md), [prompts for new artwork](docs/image-prompts.md), and [developer notes](docs/developer-notes.md) for changing the design.
