# 1. Publishing and the domain

The site is live on GitHub Pages at **https://mythic-counseling.github.io/Website/**, published from the `main` branch of [github.com/Mythic-Counseling/Website](https://github.com/Mythic-Counseling/Website).

## How changes go live

Anything that reaches `main` is published, usually within two minutes:

- **Pages CMS:** each **Save** commits to `main`.
- **Your computer** (Obsidian, VS Code or the command line):

  ```sh
  git pull                   # get changes made in Pages CMS first
  # …edit files…
  git add -A
  git commit -m "Describe the change"
  git push                   # live in about two minutes
  ```

Check the repository's **Actions** tab. A green tick means the change is live. A red cross means it was **not** published and the previous version stays up: open the run, read the first red error line (it names the file and line), fix it and push again. To catch errors before pushing, run the **Check site builds** task in VS Code ([guide 3](3-editing-tools.md#vs-code-optional-for-previewing-and-bigger-changes)).

**Trying a bigger change safely:** work on a branch (`git switch -c new-idea`) and preview it locally. Only `main` is published; when it's ready, `git switch main && git merge new-idea && git push`.

**Undoing a change that's live:** on GitHub, open **Commits**, find the change and copy its ID, then `git revert <ID> && git push`. The site goes back, and the history keeps both versions.

## Finish the GitHub setup (once)

Pages is currently set to **Deploy from a branch**, so GitHub builds the site twice on every change: once with its built-in builder and once with this repository's **Deploy site** workflow. Only the workflow compresses uploaded images and publishes scheduled posts on their date. To use it alone:

1. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions** (needs an admin of the Mythic-Counseling account).
2. **Actions → Deploy site → Run workflow** to publish once with it.

## Connect the domain

When you're ready to move mythic-counseling.com from Squarespace to this site. The old site stays up until step 3.

### 1. Protect the domain on GitHub

This stops anyone else pointing your domain at their GitHub site.

1. Signed in as Mythic-Counseling: profile picture → **Settings** → **Pages** (the account's settings, not the repository's) → **Add a domain** → `mythic-counseling.com`.
2. GitHub shows a **TXT record**. Add it at your DNS provider (next step), wait a few minutes, then click **Verify**.

### 2. Change the DNS records

Find where the domain's DNS is managed. If it was bought through Squarespace (or Google Domains, which moved to Squarespace), it's at **Squarespace → Domains → mythic-counseling.com → DNS**.

1. **Screenshot every existing record first.**
2. **Don't touch the email records:** anything of type **MX**, and **TXT** records containing `spf`, `google-site-verification` or `DKIM`. Changing those breaks the practice's email.
3. Delete the records that point the website at Squarespace (in Squarespace's DNS, the **Squarespace Defaults** preset: the `@` A records and the `www` CNAME).
4. Add:

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
   | CNAME | www | mythic-counseling.github.io |

### 3. Switch the site over

1. In `_config.yml`, change the address the site expects, then commit and push:

   ```yaml
   url: "https://mythic-counseling.com"
   baseurl: ""
   ```

2. Repository **Settings → Pages → Custom domain** → `mythic-counseling.com` → **Save**. The DNS check can take from minutes to a few hours.
3. When it passes, tick **Enforce HTTPS** (if it's greyed out, wait up to an hour and reload).
4. Visit `https://mythic-counseling.com` and `https://www.mythic-counseling.com`. If you still see the old site, your computer is remembering the old address: try a phone on mobile data.

### 4. Afterwards

1. **Google Search Console** (search.google.com/search-console): add the domain, then **Sitemaps** → submit `https://mythic-counseling.com/sitemap.xml`. Bing Webmaster Tools can import it from Google.
2. Old Squarespace addresses (such as `/appointments` and the old service pages) already redirect to their new pages.
3. **Cancel the Squarespace website plan**, but keep the **domain** registration active and on auto-renew; they're billed separately.
4. If a newsletter service is connected, change its RSS feed to `https://mythic-counseling.com/feed.xml` ([guide 4](4-newsletter.md)).
5. Cancel Acuity only once Google booking works ([guide 2](2-booking-and-forms.md)).
