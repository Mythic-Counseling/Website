# Mythic Counseling of Florida — website

**Live at https://mythic-counseling.github.io/Website/** (the mythic-counseling.com domain isn't pointed here yet: see [guide 1](docs/1-publishing-and-domain.md#connect-the-domain)).

Every word on the site lives in the **`content/`** folder; everything else is the design and machinery that turns those words into pages. Anything pushed to the `main` branch is published automatically.

## What to edit (and what to leave alone)

```
content/                  ← EDIT: everything you write
  _posts/                   blog posts, one file each
  _drafts/                  unpublished posts (never appear on the site)
  _services/                one file per service (page, card, menu, prices)
  _specialties/             one file per specialty on the About page
  _legal/                   Privacy Policy, Terms and Conditions, Disclaimers
  _data/copy.yml            all other page wording (home, about, contact, cookie notice…)
  _data/settings.yml        email, booking calendars, form links, newsletter service
  _data/pages.yml           page titles and search descriptions
  _data/navigation.yml      the menu
  _data/images.yml          image descriptions (alt text)
assets/images/uploads/    ← your uploaded photos (compressed automatically)

docs/                     guides (start with the numbered ones)
dev.cmd                   Windows: double-click to open the site in VS Code with a live preview
theme/                    ✕ page templates, header, footer, SEO files
assets/css, assets/js     ✕ styles and scripts
_config.yml               ✕ technical settings (_config.dev.yml: local preview only)
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
| **VS Code** | Previewing on your computer before publishing, bigger changes | VS Code, git, Ruby and Jekyll |

Setup and everyday steps for each: [guide 3](docs/3-editing-tools.md). On Windows, `dev.cmd` opens VS Code and starts the live preview at http://localhost:4000.

## Publishing changes

- **Pages CMS:** each **Save** is published within about two minutes.
- **Obsidian / VS Code:** **pull** first, then commit and **push** to `main`.

Check the repository's **Actions** tab: a green tick means the change is live. A red cross means the site was **not** updated and the previous version stays up; open the run to see which file has a problem (usually a missing quote or `---` in the settings at the top of a file). More, including how to undo a change: [guide 1](docs/1-publishing-and-domain.md).

## Writing a blog post

- **Pages CMS:** Blog posts → **Add an entry** → title, summary, post → **Save**. Turn **Published** off to keep it as a draft, or set a future date to schedule it.
- **By hand:** copy `content/_drafts/example-post.md` (it shows every formatting option) into `content/_posts/` as `YYYY-MM-DD-short-title.md`, lowercase with hyphens. The date is the publish date; the rest becomes the address, `/blog/short-title/`.

Each post automatically gets its own page, a card on `/blog/`, a place in the RSS feed and sitemap, and search-engine markup. The **Blog** menu link appears once the first post is published.

**Images** go in `assets/images/uploads/` (Pages CMS and Obsidian put them there for you). They are resized to 1600 px and compressed when the site is published, and phone location data is removed. Use JPG or PNG; iPhone HEIC photos must be exported as JPG first. For a post's top image you can also name one of the site's emblems, such as `image: olive-cairn-emblem` (see `content/_data/images.yml`).

## Privacy

The site sets no cookies of its own, has no analytics, and serves its own fonts. Google's booking calendar and forms load only after a visitor allows them (the cookie notice, or the prompt shown in their place). The legal pages are drafts awaiting review: see the [checklist](docs/content-recommendations.md#legal-pages).

## Guides

1. [Publishing and the domain](docs/1-publishing-and-domain.md): how changes go live, undoing one, finishing the GitHub setup, connecting mythic-counseling.com
2. [Booking and forms with Google Workspace](docs/2-booking-and-forms.md): replacing Acuity
3. [Editing tools: Pages CMS, Obsidian, VS Code](docs/3-editing-tools.md), including the live preview on Windows and Mac
4. [Newsletter and free offer](docs/4-newsletter.md)

Also: [content ideas, gaps and the legal checklist](docs/content-recommendations.md), [prompts for new artwork](docs/image-prompts.md), and [developer notes](docs/developer-notes.md) for changing the design.
