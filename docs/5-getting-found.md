# 5. Getting found

How people find the practice, roughly in order of impact for a solo practice. Everything until the last section is free or close to it. Prices and plans change, so check current terms.

## 1. Your own domain

Most of what follows works better once the site lives at **mythic-counseling.com** rather than the github.io address: search engines, directories and people remember and trust a real domain. See [guide 1](1-publishing-and-domain.md#connect-the-domain).

## 2. Google Business Profile

When someone searches "therapist near me" or "ADHD counselor Florida", Google shows map listings before the regular results. Those come from Google Business Profiles.

1. Go to [business.google.com](https://business.google.com) signed in as the practice account → **Add business** → **Mythic Counseling of Florida**.
2. Category: **Counselor** (add **Mental health service** as a secondary category).
3. If sessions are online only, or you'd rather not publish an address, choose **I deliver goods and services to my customers**, list the Florida areas you serve, and **hide the address**. Google still asks you to verify the business (by video, phone or postcard).
4. Add the website, the practice email, hours, a short description that uses the words people search for ("person-centered", "treatment-resistant depression", "ADHD and autism", "telehealth across Florida" if true), and a few photos (the emblems work well).
5. Post an update from the profile when a new blog post goes up; it helps the profile stay active.

Most ethics codes discourage asking clients for reviews, so don't solicit them. A profile without reviews still shows up.

## 3. Search Console and Bing Webmaster Tools

These show which searches your site appears for, how often, and how often people click: real search data, with no tracking on the site.

1. [Google Search Console](https://search.google.com/search-console) → **Add property**.
   - With the domain connected: choose **Domain**, enter `mythic-counseling.com`, and add the TXT record it shows in Cloudflare (**DNS → Records → Add record**).
   - Before then: choose **URL prefix** and enter `https://mythic-counseling.github.io/Website/`.
2. **Sitemaps** → submit `sitemap.xml` (the full address is the site address + `sitemap.xml`).
3. [Bing Webmaster Tools](https://www.bing.com/webmasters) → **Import from Google Search Console**. Bing also feeds ChatGPT search and DuckDuckGo.
4. Once a month, look at **Performance → Search results**. **Queries** shows the words people used to find you, so write blog posts for the queries you nearly rank for.

## 4. Therapist directories

For many private practices these bring in more clients than search does, because people go there ready to choose a therapist.

| Directory | Notes |
| --- | --- |
| **Psychology Today** | The largest; about $30/month, first months often free. Fill every section and choose specialties carefully. |
| **TherapyDen** | Free; good filters for identity-affirming care. |
| **Inclusive Therapists** | Focused on culturally responsive, identity-affirming care. |
| **Neurodiversity-affirming directories** | Search "neurodivergent affirming therapist directory"; a strong fit for your ADHD and autism work. |
| **Open Path Collective** | Only if you offer reduced-fee spots. |

Use the same name, email and website everywhere, and link each profile to the site.

## 5. Writing for the people you serve

Each blog post is another door into the site, for search engines and AI assistants alike. Your specialties have far less competition than "therapist Florida": treatment-resistant depression, suicidality from lived experience, adult ADHD and autism, chronic illness, men's mental health, and Intentional Peer Support training.

- Write for one question a person might type into Google, and answer it in your voice.
- Link each post to the matching service page.
- Ideas: [content recommendations](content-recommendations.md) (section 5).
- Every post can go out to newsletter subscribers automatically ([guide 4](4-newsletter.md)).

## 6. Referrals and community

Doctors and psychiatrists (especially for treatment-resistant depression), local NAMI chapters, peer-support networks from your IPS work, ADHD and autism groups, chronic illness communities. A short introductory email with a link to the relevant service page goes a long way.

## 7. Measuring what works

Three sources together tell you everything you need, without tracking anyone:

1. **"How did you hear about me?"** on the contact form, collected in your Google Form. Edit the choices in Pages CMS → **Page copy → Contact page**. Ask the same question in the free consultation.
2. **Cloudflare Web Analytics**: visits per page, where visitors came from, and devices. No cookies and no personal data, so it doesn't need consent. To turn it on:
   1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Analytics & Logs → Web Analytics** (or search "Web Analytics") → **Add a site**.
   2. Enter the site's address (the github.io address for now; add the domain later) and choose the **JavaScript snippet** option.
   3. Copy the value after `"token": ` in the snippet (the letters and numbers inside the quotes).
   4. Pages CMS → **Settings → Visitor analytics → Cloudflare Web Analytics token** → paste → **Save**. Counting starts on the next publish. Your own local previews aren't counted.
3. **Search Console** (section 3): what people searched before they arrived.

Look at them together once a month. People finding you but not getting in touch? Improve the pages: credentials, fees, what to expect. Few people finding you? Write more, or try a small ad campaign.

## 8. Google Ads, carefully

Ads can work for therapists, but health care brings limits:

- **Search ads only.** Your ad appears when someone searches for something you offer. Google doesn't allow targeting people by health condition, so "remarketing" (following site visitors around the web with ads) is off the table.
- **No tracking pixels on the site.** Ad platforms' conversion pixels on a health website can disclose sensitive information. U.S. regulators have taken action over this: the FTC fined BetterHelp $7.8M, and HHS has HIPAA guidance on online tracking. The site's cookie notice and Privacy Policy also promise no advertising trackers. Measure results with the "How did you hear about me?" answers and the number of booked consultations instead.
- **Setup:**
  - Campaign type **Search**, location **Florida** (people *in* Florida, not "interested in").
  - Keywords narrow and specific, in phrase or exact match: "therapist for treatment resistant depression", "ADHD counselor Florida", "intentional peer support training".
  - Negative keywords: free, jobs, salary, careers, degree, hotline, crisis.
  - Send each ad to the matching service page.
  - Start around $10–20 a day and review after a month.
- **Check the rules.** Florida's rules for licensed counselors (chapter 491 and the Board's advertising rules) may require your license type or number in advertising; most ethics codes forbid testimonials and misleading claims.
- **Google Ad Grants** (free ads) are for registered nonprofits only.

Suggested order: sections 1–5 first, measure for two or three months, then decide whether ads are worth testing.
