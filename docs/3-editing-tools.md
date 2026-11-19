# 3. Editing tools: Pages CMS, Obsidian, VS Code

**Short answer:** use **Pages CMS** for almost everything, and add **Obsidian** if you enjoy writing long posts there. Use **VS Code** with the **`preview.cmd`** live preview when you want to see changes before they're published, or to change the design.

All three edit the same files in the same GitHub repository, so you can mix them. One rule keeps them in step: **pull before you start, push when you finish** (Pages CMS does both for you).

| | Pages CMS | Obsidian | VS Code |
| --- | --- | --- | --- |
| Runs in | Any browser, including a phone | Mac/Windows app | Mac/Windows app |
| Edits | Forms for every setting; a word-processor-style editor for posts | Markdown with a live preview | Raw files |
| Publishing | Automatic on **Save** | Commit and push (Git plugin) | Commit and push (built in) |
| Preview before publishing | No, check the live site ~2 min later | Yes, with `preview.cmd` | Yes, with `preview.cmd` |
| Can break the site? | Hard to: fields are checked | Rarely: only the settings block between `---` lines | Yes, if you edit `theme/` |

## Pages CMS (recommended)

**One-time setup**

1. Go to [app.pagescms.org](https://app.pagescms.org) → **Sign in with GitHub**.
2. When asked, install the **Pages CMS** GitHub app → **Only select repositories** → `mythic-counseling` → **Install**.
3. Open the repository and the `main` branch. Bookmark this page.

**Using it.** The sidebar matches the `content/` folder:

- **Blog posts**: write, schedule (set a future publish date) or keep as a draft (**Published** off).
- **Settings**: email, booking calendar links, contact form link.
- **Page titles and search descriptions**: what Google shows for each main page.
- **Services**, **Specialties**, **Page copy**: all other wording.
- **Media**: uploaded images.

Every **Save** is published automatically within about two minutes.

Note that drafts are saved to the public repository: hidden from the site, but not secret.

## Obsidian (optional, for writing)

Obsidian is an excellent Markdown writing app, and the site's posts are plain Markdown files, so it works well. The repository already includes Obsidian settings that:

- create new notes in `content/_drafts/`, so nothing publishes by accident;
- save pasted or dragged-in images to `assets/images/uploads/`;
- write standard Markdown links (the website can't read Obsidian's `[[wikilinks]]`);
- dim the code folders (`theme/`, styles, scripts) and keep them out of search.

**One-time setup**

1. Get the files onto your computer with [GitHub Desktop](https://desktop.github.com): **File → Clone repository** → `Mythic-Counseling/Website`.
2. Obsidian → **Open folder as vault** → choose the cloned folder.
3. Install the git plugin: **Settings → Community plugins → Turn on community plugins → Browse** → search **Git** (by Vinzent) → **Install** → **Enable**.
4. In the Git plugin's settings, turn on **Pull on startup**.
5. Check that **Settings → Core plugins → Templates** is on.

**Writing a post**

1. **⌘N** for a new note (it lands in `content/_drafts/`) and give it the post's title.
2. **⌘P** → *Templates: Insert template* → **Blog post**. This adds the settings block (shown as **Properties**). Fill in **description**, the one-to-two-sentence summary.
3. Write. Drag images in; they go to the uploads folder automatically.
4. **To publish:** rename the file to `YYYY-MM-DD-short-title.md` (lowercase, hyphens, e.g. `2026-12-01-rethinking-symptoms.md`) and drag it from `_drafts` into `content/_posts`.
5. **⌘P** (Ctrl+P on Windows) → *Git: Commit-and-sync*. It's live in about two minutes.

Linking to another page: `[individual counseling](/services/individual-counseling/)`.

Obsidian on a phone can't easily push to GitHub; on a phone, use Pages CMS.

## VS Code and the live preview (Windows)

**One-time setup**

1. Install [VS Code](https://code.visualstudio.com) and [GitHub Desktop](https://desktop.github.com).
2. GitHub Desktop: sign in as Mythic-Counseling → **File → Clone repository** → `Mythic-Counseling/Website` → **Clone**. By default the folder is `Documents\GitHub\Website`.
3. GitHub Desktop: **Repository → Open in Visual Studio Code**. Accept the suggested **YAML** extension; it underlines mistakes in `.yml` files before they break a publish.

**The live preview: `preview.cmd`**

Double-click **`preview.cmd`** in the site's folder (in File Explorer, or right-click it in VS Code's file list → **Reveal in File Explorer**). Or type `.\preview.cmd` in VS Code's **Terminal**.

- Your browser opens **http://localhost:4000**: the site exactly as it will look, including drafts from `content/_drafts/`.
- Every time you save a file, the page rebuilds and refreshes by itself.
- To stop, close the preview's window (or press **Ctrl+C** in it).
- **First run only:** it installs Ruby and Jekyll, the tools that build the site, using Windows' own installer. It takes about 10 minutes; approve any prompt that appears. After that it starts in a few seconds.
- After editing `_config.yml`, stop and start it again.

Why not the **Live Server** extension or VS Code's built-in preview? They show files exactly as they are on disk, and this site's files are templates and Markdown that Jekyll assembles into pages, so they would show raw code.

On a Mac, run the preview by hand instead: see the [developer notes](developer-notes.md#local-preview-and-checks).

**Everyday use**

1. **Source Control** panel (the branch icon) → **⋯ → Pull**, to get changes made in Pages CMS.
2. Start `preview.cmd`, edit files in `content/`, and check them in the browser.
3. **Source Control** → type a short message → **Commit** → **Sync Changes**. Live in about two minutes.

## If something goes wrong

- **The preview window shows an error and closes, or "jekyll is not recognized":** run `preview.cmd` again (the first install sometimes needs a second try after Windows finishes setting up Ruby). If it still fails, copy the message from the window.
- **The change didn't appear:** check the repository's **Actions** tab. If the run is still going, wait. If it's red, open it: the first red line names the file and line. Fix it and push again. The previous version of the site stays up meanwhile.
- **Git reports a conflict:** the same file was changed in two places, usually Pages CMS and your computer. In VS Code, open the file, choose **Accept Current**, **Accept Incoming** or **Accept Both** for each highlighted block, then commit and sync. Pulling before you start avoids this.
- **The settings block at the top of a file:** it must start and end with a line of exactly `---`, and text containing a colon (`:`) must be in quotes.
