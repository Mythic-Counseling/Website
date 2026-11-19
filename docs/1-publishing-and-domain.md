# 1. Publishing and the domain

The site is live on GitHub Pages at **https://mythic-counseling.github.io/Website/**, published from the `main` branch of [github.com/Mythic-Counseling/Website](https://github.com/Mythic-Counseling/Website).

## Where you can make changes

Every one of these ends with a commit to the `main` branch, and GitHub then republishes the site in about two minutes.

| Where | Good for | How it goes live |
| --- | --- | --- |
| **Pages CMS** (app.pagescms.org) | Blog posts, wording, settings, images, in forms; works on a phone | **Save** |
| **GitHub website** (github.com/Mythic-Counseling/Website) | Quick fixes to any file, no tools | Open the file → pencil icon → edit → **Commit changes** |
| **VS Code on your computer** | Seeing changes in a live preview (`preview.cmd`) before publishing; bigger edits | **Source Control → Commit → Sync Changes** |
| **Your computer** (Obsidian or GitHub Desktop) | Writing offline | Commit, then **Push** (GitHub Desktop) or **Commit-and-sync** (Obsidian) |

Setup for each is in [guide 3](3-editing-tools.md). If you use more than one, get the latest first (**Pull** / **Fetch origin**) so they don't conflict.

### Checking that it went live

1. Open the repository → **Actions** tab. The newest run of **Deploy site** is at the top.
2. Yellow dot: still working (about a minute). **Green tick:** live. Reload the site (on a phone, pull down to refresh).
3. **Red cross:** the change was **not** published, and the previous version stays up. Click the run → the red step → the first red line names the file and line, usually a missing quote or `---` in the settings at the top of a file. Fix it the same way you made the change; the next commit publishes again.

### Undoing a change

On GitHub: **Commits** (the clock icon above the file list) shows every change with its ID. Easiest: in GitHub Desktop: **History** → right-click the change → **Revert changes in commit** → **Push origin**. On the command line: `git revert <ID>` then `git push`. The site goes back, and the history keeps both versions. Pages CMS edits can also simply be edited back.

## Make GitHub use the image-compressing deploy (one-time fix)

Right now GitHub publishes the site **twice** after every change: once with its built-in builder ("pages build and deployment") and once with this repository's **Deploy site** workflow. Only **Deploy site** shrinks and compresses uploaded images and publishes scheduled posts on their date, and whichever finishes last is what visitors see. Switch Pages to the workflow alone:

1. Sign in to GitHub as **Mythic-Counseling** (the account that owns the repository; collaborators can't change this).
2. Open github.com/Mythic-Counseling/Website → **Settings** (top right of the repository, the gear) → **Pages** (left sidebar, under "Code and automation").
3. Under **Build and deployment → Source**, change **Deploy from a branch** to **GitHub Actions**. It saves immediately. Ignore the suggested workflows that appear; this repository already has one (`.github/workflows/deploy.yml`).
4. **Actions** tab → **Deploy site** (left sidebar) → **Run workflow** → **Run workflow**, to publish once with it now.
5. Check: when it's green, open the run → **build** → **Compress uploaded images**. It lists each image in `assets/images/uploads/` with its size before and after (nothing is listed while the folder is empty). From now on the Actions tab shows only **Deploy site** runs, not "pages build and deployment".

## Connect the domain

Moving mythic-counseling.com from Squarespace to this site takes about half an hour of work, plus up to an hour of waiting for the security certificate. Do it at a quiet time: the site may show a certificate warning for part of that hour.

The domain's DNS (its public address book) is managed in **Cloudflare**: [dash.cloudflare.com](https://dash.cloudflare.com) → **mythic-counseling.com** → **DNS → Records**. [Guide 6](6-email-and-dns.md) explains what the records are.

### 1. Protect the domain on GitHub

This stops anyone else pointing your domain at their GitHub site.

1. Signed in as Mythic-Counseling: profile picture → **Settings** → **Pages** (the account's settings, not the repository's) → **Add a domain** → `mythic-counseling.com`.
2. GitHub shows a **TXT record**. In Cloudflare: **Add record** → type **TXT**, with the name and content GitHub shows → **Save**. Wait a few minutes, then click **Verify** on GitHub.

### 2. Tell GitHub and the site about the domain

1. Repository **Settings → Pages → Custom domain** → `mythic-counseling.com` → **Save**. The DNS check fails for now; that's expected. (The github.io address starts redirecting to the domain, which still shows the Squarespace site until step 3.)
2. In `_config.yml`, change the address the site expects, then commit and push:

   ```yaml
   url: "https://mythic-counseling.com"
   baseurl: ""
   ```

### 3. Change the DNS records

1. **Screenshot the whole records list first.**
2. **Don't touch the email records:** the **MX** record (`smtp.google.com`), and the **TXT** records for `@` (`v=spf1 …`), `google._domainkey` and `_dmarc`, if present. They make the practice's Google Workspace email work.
3. Delete only the **website** records: the **A** and **AAAA** records named `mythic-counseling.com` (or `@`), and the record named `www` (usually a CNAME to `ext-squarespace.com`).
4. **Add record** for each of these, with **Proxy status: DNS only** (grey cloud), so GitHub can see its own addresses and issue the HTTPS certificate:

   | Type | Name | Content |
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

### 4. Turn on HTTPS and check

1. Back in repository **Settings → Pages**, the DNS check passes within a few minutes. When the certificate is ready (up to an hour), tick **Enforce HTTPS**. If it's greyed out, wait and reload.
2. Visit `https://mythic-counseling.com` and `https://www.mythic-counseling.com`. If you still see the old site, your computer is remembering the old address: try a phone on mobile data.
3. Send yourself an email at the practice address from another account, to confirm email is untouched.

### 5. Afterwards

1. **Search engines:** follow [guide 5](5-getting-found.md), starting with Google Search Console and the sitemap.
2. Old Squarespace addresses (such as `/appointments` and the old service pages) already redirect to their new pages.
3. **Cancel the Squarespace website plan.** First check where the domain is **registered** (Cloudflare: **Domain Registration**; otherwise probably Squarespace Domains) and make sure that registration stays active and on auto-renew. Website and domain are billed separately.
4. If a newsletter service is connected, change its RSS feed to `https://mythic-counseling.com/feed.xml` ([guide 4](4-newsletter.md)).
5. Cancel Acuity only once Google booking works ([guide 2](2-booking-and-forms.md)).
