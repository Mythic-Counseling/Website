# 3. Editing the original design

In the original design, page wording is written directly into each page's file, between HTML tags such as `<p>…</p>` and `<h2>…</h2>`. To change words, open the page's file and change only the text between the tags.

The browser editor (Pages CMS), the blog and the `content/` folder are part of the **redesign** (the `redesign` branch). If you plan to edit often, publishing the redesign is the easier route; see [guide 1](1-put-the-site-on-github.md#1-choose-which-design-to-publish).

## Where the words are

| Page | File |
| --- | --- |
| Home | `index.html` |
| About | `about/index.html` |
| Contact | `contact/index.html` |
| Appointments | `appointments/index.html` |
| Each service | `services/<service>/index.html` |
| Email, booking calendars, form links | `_config.yml` |
| Prices and service names for search engines | `_data/services.yml` |
| Menu | `_data/navigation.yml` |
| Image descriptions (alt text) | `_data/images.yml` |

The lines between `---` at the top of each page are its title and search description.

## Which tool

- **Small fixes, no installs:** edit on github.com. Open the file, click the **pencil** icon, change the words, then **Commit changes**. It's live in about two minutes.
- **Regular editing: VS Code.** It highlights the HTML so the words stand out from the tags, and can preview the site before publishing.
- **Obsidian** is designed for Markdown, not HTML pages, so it isn't a good fit for this design. It works well with the redesign.

## VS Code

**One-time setup**

1. Get the files onto your computer:
   ```sh
   gh auth login && gh auth setup-git      # once per computer
   gh repo clone USERNAME/mythic-counseling ~/Documents/mythic-counseling
   ```
   (Or GitHub Desktop → **File → Clone repository**.)
2. Install [VS Code](https://code.visualstudio.com), then **File → Open Folder** → that folder.
3. For the local preview, install Ruby and Jekyll once in **Terminal**:
   ```sh
   brew install ruby
   echo 'export PATH="/opt/homebrew/opt/ruby/bin:$(gem environment gemdir)/bin:$PATH"' >> ~/.zshrc
   exec zsh
   gem install jekyll webrick
   ```

**Everyday use**

1. **Source Control** panel (the branch icon) → **⋯ → Pull**.
2. Edit the words.
3. Preview: **Terminal → New Terminal**, run
   ```sh
   JEKYLL_NO_BUNDLER_REQUIRE=true jekyll serve --livereload
   ```
   and open http://localhost:4000. Restart it after changing `_config.yml`.
4. **Source Control** → type a short message → **Commit** → **Sync Changes**. Live in about two minutes.

## If something goes wrong

- **The change didn't appear:** check the repository's **Actions** tab. If it's red, open the run: the first red line names the file and line. Fix it and push again. The previous version of the site stays up meanwhile.
- **Git reports a conflict:** the same file was changed in two places. In VS Code, open the file, choose **Accept Current**, **Accept Incoming** or **Accept Both** for each highlighted block, then commit and sync.
- **A page looks broken after an edit:** a tag was probably deleted along with the words. Undo the change (⌘Z in VS Code, or revert the commit on GitHub) and try again, changing only text between `>` and `<`.
