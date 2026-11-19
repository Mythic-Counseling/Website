# 3. Editing tools: Pages CMS, Obsidian, VS Code

**Short answer:** use **Pages CMS** for almost everything, and add **Obsidian** if you enjoy writing long posts there. You don't need VS Code unless you want to preview changes on your own computer before publishing, or change the design.

All three edit the same files in the same GitHub repository, so you can mix them. One rule keeps them in step: **pull before you start, push when you finish** (Pages CMS does both for you).

| | Pages CMS | Obsidian | VS Code |
| --- | --- | --- | --- |
| Runs in | Any browser, including a phone | Mac/Windows app | Mac/Windows app |
| Edits | Forms for every setting; a word-processor-style editor for posts | Markdown with a live preview | Raw files |
| Publishing | Automatic on **Save** | Commit and push (Git plugin) | Commit and push (built in) |
| Preview of the real site | No, check the live site ~2 min later | No | Yes, with a local preview |
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

1. Get the files onto your computer:
   ```sh
   gh auth login && gh auth setup-git      # once per computer
   gh repo clone USERNAME/mythic-counseling ~/Documents/mythic-counseling
   ```
   (Or GitHub Desktop → **File → Clone repository**.)
2. Obsidian → **Open folder as vault** → choose `~/Documents/mythic-counseling`.
3. Install the git plugin: **Settings → Community plugins → Turn on community plugins → Browse** → search **Git** (by Vinzent) → **Install** → **Enable**.
4. In the Git plugin's settings, turn on **Pull on startup**.
5. Check that **Settings → Core plugins → Templates** is on.

**Writing a post**

1. **⌘N** for a new note (it lands in `content/_drafts/`) and give it the post's title.
2. **⌘P** → *Templates: Insert template* → **Blog post**. This adds the settings block (shown as **Properties**). Fill in **description**, the one-to-two-sentence summary.
3. Write. Drag images in; they go to the uploads folder automatically.
4. **To publish:** rename the file to `YYYY-MM-DD-short-title.md` (lowercase, hyphens, e.g. `2026-12-01-rethinking-symptoms.md`) and drag it from `_drafts` into `content/_posts`.
5. **⌘P** → *Git: Commit-and-sync*. It's live in about two minutes.

Linking to another page: `[individual counseling](/services/individual-counseling/)`.

Obsidian on a phone can't easily push to GitHub; on a phone, use Pages CMS.

## VS Code (optional, for previewing and bigger changes)

**On Windows, the simplest preview is `preview.cmd`:** double-click it in the site's folder (or type `preview` in Command Prompt from that folder). It opens http://localhost:4000 in your browser, shows drafts, and refreshes whenever a file is saved, whichever editor you use. The first run installs Ruby and Jekyll with Windows' installer (about 10 minutes; approve any prompts); after that it starts in seconds. Close its window to stop it. The steps below are only needed on a Mac, or to run the preview by hand.

**One-time setup**

1. Install [VS Code](https://code.visualstudio.com), then **File → Open Folder** → the repository folder (clone it as in the Obsidian steps if you haven't).
2. Accept the suggested **YAML** extension; it underlines mistakes in `.yml` files before they break a publish.
3. For the local preview, install Ruby and Jekyll once in **Terminal**:
   ```sh
   brew install ruby
   echo 'export PATH="/opt/homebrew/opt/ruby/bin:$(gem environment gemdir)/bin:$PATH"' >> ~/.zshrc
   exec zsh
   gem install jekyll webrick
   ```

**Everyday use**

1. **Source Control** panel (the branch icon) → **⋯ → Pull**.
2. Edit files in `content/`.
3. Preview: **Terminal → New Terminal**, run
   ```sh
   JEKYLL_NO_BUNDLER_REQUIRE=true jekyll serve --livereload --drafts
   ```
   and open http://localhost:4000. Pages refresh as you save. `--drafts` also shows drafts, locally only. Restart it after changing `_config.yml`.
4. **Source Control** → type a short message → **Commit** → **Sync Changes**. Live in about two minutes.

## If something goes wrong

- **The change didn't appear:** check the repository's **Actions** tab. If the run is still going, wait. If it's red, open it: the first red line names the file and line. Fix it and push again. The previous version of the site stays up meanwhile.
- **Git reports a conflict:** the same file was changed in two places, usually Pages CMS and your computer. In VS Code, open the file, choose **Accept Current**, **Accept Incoming** or **Accept Both** for each highlighted block, then commit and sync. Pulling before you start avoids this.
- **The settings block at the top of a file:** it must start and end with a line of exactly `---`, and text containing a colon (`:`) must be in quotes.
