# 1. Put the site on GitHub and your domain

One-time setup, about an hour plus waiting for DNS. The old Squarespace site stays live until step 6, so nothing breaks while you work.

Throughout, replace `USERNAME` with the GitHub account name and `mythic-counseling` with the repository name if you choose a different one.

## Before you start

- **Who owns it.** Create the GitHub account (or a free GitHub *organization*) for the practice, using the practice email, so the site doesn't depend on one person's personal account. Add others as collaborators later.
- **Public or private.** GitHub Pages is free for **public** repositories; a private one needs a paid plan (GitHub Pro or Team). Public is normal for a website, but it means everything in the repository is readable, including drafts and unpublished posts. Never put client information in it.
- **Tools on your computer:** git (included with macOS: run `git --version`) and the GitHub CLI (`brew install gh`). [GitHub Desktop](https://desktop.github.com) works too if you prefer buttons.
- **Which domain.** The site is set up for `https://mythic-counseling.com`. If the real domain differs, change `url:` in `_config.yml`.

## 1. Merge the redesign into `main`

All the work so far is on the `redesign` branch. `main` is what gets published.

```sh
cd ~/Downloads/Mythic-counseling
git status                 # should say "nothing to commit"
git switch main
git merge redesign         # a fast-forward: main catches up with redesign
```

## 2. Create the repository and upload it

```sh
gh auth login              # choose GitHub.com → HTTPS → log in with a browser
gh repo create mythic-counseling --public --source . --remote origin --push
git push -u origin main redesign
```

Or on github.com: **New repository** → name `mythic-counseling`, public, *no* README → then run the two commands GitHub shows under "push an existing repository".

## 3. Turn on publishing

1. On GitHub, open the repository → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**. (Not "Deploy from a branch": the Actions workflow is what compresses uploaded images.)
3. Open the **Actions** tab. If the **Deploy site** run failed or didn't start, click **Deploy site** → **Run workflow** → **Run workflow**.
4. When it shows a green tick, the site is live at `https://USERNAME.github.io/mythic-counseling/`.

## 4. Preview before switching the domain

At that GitHub address the site lives in a sub-folder, so its styles and links won't load until you tell it so. For the preview only, edit `_config.yml`:

```yaml
url: "https://USERNAME.github.io"
baseurl: "/mythic-counseling"
```

Commit and push (`git commit -am "Preview on GitHub" && git push`). After the green tick, click through every page on a phone and a computer, and try **Book now** and the contact form.

When you're happy, set them back so the site is ready for the real domain:

```yaml
url: "https://mythic-counseling.com"
baseurl: ""
```

and commit and push again.

## 5. Protect the domain on GitHub

This stops anyone else from pointing your domain at their GitHub site.

1. Click your profile picture → **Settings** → **Pages** (in the account settings, not the repository's) → **Add a domain** → `mythic-counseling.com`.
2. GitHub shows a **TXT record**. Add it at your domain's DNS provider (see step 6 for where), wait a few minutes, then click **Verify**.

## 6. Point the domain at GitHub (the switch-over)

Find where the domain's DNS is managed. If it was bought through Squarespace (or Google Domains, which moved to Squarespace), it's at **Squarespace → Domains → mythic-counseling.com → DNS**.

1. **Write down or screenshot every existing record first.**
2. **Do not touch the email records**: anything of type **MX**, and **TXT** records containing `spf`, `google-site-verification` or `DKIM`. Changing those breaks the practice's email.
3. Remove the records that point the website at Squarespace: under Squarespace's DNS, delete the **Squarespace Defaults** preset (the `@` A records and the `www` CNAME to `ext-squarespace.com`).
4. Add these records:

   | Type | Host | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | AAAA | @ | 2606:50c0:8000::153 |
   | AAAA | @ | 2606:50c0:8001::153 |
   | AAAA | @ | 2606:50c0:8002::153 |
   | AAAA | @ | 2606:50c0:8003::153 |
   | CNAME | www | USERNAME.github.io |

5. In the repository: **Settings → Pages → Custom domain** → `mythic-counseling.com` → **Save**. GitHub checks the DNS; this can take from minutes to a few hours.
6. When the check passes, tick **Enforce HTTPS** (the certificate can take up to an hour to appear; if the box is greyed out, wait and reload).
7. Visit `https://mythic-counseling.com` and `https://www.mythic-counseling.com`. Both should show the new site. If you still see the old one, your computer is remembering the old address: try your phone on mobile data.

## 7. After the switch

1. **Google Search Console** (search.google.com/search-console): add the domain, then **Sitemaps** → submit `https://mythic-counseling.com/sitemap.xml`. Do the same in Bing Webmaster Tools (it can import from Google).
2. Old Squarespace addresses (such as `/appointments` and the old service pages) already redirect to their new pages.
3. **Cancel the Squarespace website plan**, but make sure the **domain** registration stays active and on auto-renew; they are billed separately.
4. Cancel Acuity only after Google booking works (see [guide 2](2-booking-and-forms.md)).
5. Set up the editor: [guide 3](3-editing-tools.md).

## From now on: publishing changes

You never need to repeat the steps above. Any change that reaches `main` is published:

```sh
git pull                   # get changes made in Pages CMS first
# …edit files…
git add -A
git commit -m "Describe the change"
git push                   # live in about two minutes
```

Check the **Actions** tab for the green tick. If a run fails, the previous version of the site stays up; open the failed run, read the first red error line (it names the file), fix it and push again.

**Trying a bigger change safely:** work on a branch (`git switch -c new-idea`), push it, and preview it locally (see [guide 3](3-editing-tools.md#vs-code)). Only `main` is published; merge when ready with `git switch main && git merge new-idea && git push`.

**Undoing a change** that's already live: on GitHub, open **Commits**, find the change, copy its ID, then `git revert <ID> && git push`. The site goes back; the history keeps both.
