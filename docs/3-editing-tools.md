# 3. Editing tools: Pages CMS, Obsidian, VS Code

**Short answer:** use **Pages CMS** for almost everything, and add **Obsidian** if you enjoy writing long posts there. Use **VS Code with a Codespace** when you want to see changes before they're published, or to change the design.

All three edit the same files in the same GitHub repository, so you can mix them. One rule keeps them in step: **pull before you start, push when you finish** (Pages CMS does both for you).

| | Pages CMS | Obsidian | VS Code |
| --- | --- | --- | --- |
| Runs in | Any browser, including a phone | Mac/Windows app | Mac/Windows app |
| Edits | Forms for every setting; a word-processor-style editor for posts | Markdown with a live preview | Raw files |
| Publishing | Automatic on **Save** | Commit and push (Git plugin) | Commit and push (built in) |
| Preview before publishing | No, check the live site ~2 min later | No | Yes, in a Codespace |
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

## Live preview in VS Code (Codespaces)

**Why not Live Server or VS Code's built-in preview?** Those show files exactly as they are on disk. This site's files are templates and Markdown that a program called Jekyll assembles into pages, so a plain file server shows raw code. Running Jekyll normally means installing Ruby. A **GitHub Codespace** avoids that: it's a computer in the cloud, already set up for this site (`.devcontainer/`), that VS Code connects to. Nothing is installed on your own computer, and it works the same on Windows and Mac.

Codespaces is free for the Mythic-Counseling account up to a monthly allowance (enough for many hours of editing a month). A Codespace stops on its own after 30 minutes idle, and you can delete it any time; your work is safe once it's committed.

**One-time setup**

1. Install [VS Code](https://code.visualstudio.com).
2. In VS Code: **Extensions** (the four squares) → search **GitHub Codespaces** → **Install**. Sign in with the Mythic-Counseling GitHub account when asked.

(No VS Code at all? On github.com/Mythic-Counseling/Website: **Code → Codespaces → Create codespace on main** opens the same thing in the browser.)

**Start the preview**

1. In VS Code, press **F1** (or Ctrl+Shift+P / ⇧⌘P) → **Codespaces: Create New Codespace** → `Mythic-Counseling/Website` → branch `main`. The first time takes a few minutes while it installs the site's tools.

   Next time: **F1 → Codespaces: Connect to Codespace** and pick the existing one (much faster).
2. The preview starts by itself and opens in a pane inside VS Code. To open it in your browser instead: **Ports** tab → port **4000** → globe icon.
3. Edit files in `content/` and save. Jekyll rebuilds within a second or two; **refresh** the preview to see the change. Drafts in `content/_drafts/` show up here but not on the live site.
4. If the preview stopped (for example after reconnecting): **Terminal → New Terminal** and run
   ```sh
   bundle exec jekyll serve --drafts --baseurl ''
   ```

**Publishing from the Codespace**

1. **Source Control** panel (the branch icon) → type a short message → **Commit**.
2. **Sync Changes**. The site updates in about two minutes.

Changes you haven't committed stay in the Codespace only, so commit before deleting it. If you also edit in Pages CMS, use **⋯ → Pull** in Source Control before starting.

## If something goes wrong

- **The change didn't appear:** check the repository's **Actions** tab. If the run is still going, wait. If it's red, open it: the first red line names the file and line. Fix it and push again. The previous version of the site stays up meanwhile.
- **Git reports a conflict:** the same file was changed in two places, usually Pages CMS and your computer. In VS Code, open the file, choose **Accept Current**, **Accept Incoming** or **Accept Both** for each highlighted block, then commit and sync. Pulling before you start avoids this.
- **The settings block at the top of a file:** it must start and end with a line of exactly `---`, and text containing a colon (`:`) must be in quotes.
