# Content recommendations

The redesign keeps every sentence of the original site. This list covers gaps visitors will notice, and places where more writing would help readers and search engines. It is ordered by impact.

## 1. Fix before launch

| Where | Issue | File |
| --- | --- | --- |
| About intro | Stops mid-sentence: "My own mental health journey began much earlier than I" | `content/_data/copy.yml` → `about.body` |
| About → Complex/Chronic Illness | Heading with no text (shown as a dashed placeholder card) | `content/_specialties/complex-chronic-illness.md` |
| Group counseling | The old home page said "…in order to **thrive** within a neurotypical world"; the group page said "**live**". Both now come from one file, which uses "live". | `content/_services/group-counseling.md` |
| Crisis information | Done: a 988/911 line is now in the footer on every page (`footer.crisis` in `content/_data/copy.yml`). Consider adding it to the Contact page too. | `content/_data/copy.yml` |

## Legal pages

The Privacy Policy, Terms and Conditions and Disclaimers (`content/_legal/`) are original drafts. They follow the structure of the Storycraft Counseling pages, are written for this site's actual setup, and fill gaps those pages leave for a clinical practice (crisis line, no counselor–client relationship, HIPAA separation, telehealth location, cookie consent). Before launch:

- [ ] Have an attorney review all three (and update `updated:` in each file).
- [ ] Confirm the licensure wording in Disclaimers ("physically located in Florida at the time of each session").
- [ ] Confirm the retention periods in the Privacy Policy (two years for non-client inquiries).
- [ ] Name the newsletter service in the Privacy Policy once chosen ([guide 4](4-newsletter.md)).
- [ ] Remove "Acuity Scheduling" from the Privacy Policy once Acuity is retired.
- [ ] Add the legal business name (for example "Mythic Counseling of Florida, LLC") if there is one.
- [ ] Make sure the clinical Notice of Privacy Practices exists; the Privacy Policy refers to it.

## 2. Trust and credentials (high impact for readers and for Google's E-E-A-T)

- **Who you are:** full name, a photo, license type and number (for example LMHC or Registered Mental Health Counselor Intern), education, and IPS certification. Check whether Florida rules require license details in advertising.
- **Replace the Contact page photo.** `contact-illustration.png` is a Squarespace stock image of a surgeon washing her hands. A photo of you, or of the space where sessions happen, would serve the page far better.
- **Where and how sessions happen:** in-person address or telehealth only, which Florida areas you serve, and typical hours. This is the single biggest local-SEO gap.

## 3. Practical details people look for before booking

- **Fees and payment:** private pay only or insurance; superbills; sliding scale; cancellation policy. Self-pay clients must also be given a **Good Faith Estimate** under the No Surprises Act, so a one-line notice is worth adding.
- **Session lengths:** your Acuity account also offers 90-minute ($195) and 120-minute ($260) individual sessions, which the site only covers as "Longer sessions are available by request." Consider listing them on the individual counseling page.
- **What to expect:** a short paragraph per service on the first session, what the "personalized wellness roadmap" contains, and how often people usually meet.
- **Groups:** format (online or in-person), size, schedule, and how members are matched to a group.
- **IPS training:** a plain-language paragraph on what Intentional Peer Support is, who the Core Training is for, its length, and the cost range.

## 4. Story and theme (where the "Mythic" brand can do more work)

- **Why "Mythic"?** One or two paragraphs on the name and on Sisyphus: the boulder as ongoing effort and dignity rather than futility, Camus' "one must imagine Sisyphus happy," and how myth and story shape your existential, meaning-centered approach. This fits on the About page between the intro and the specialties, or on the home page under "My Philosophy."
- **Finish the journey story** on the About page. It is the most-read page on most counseling sites, and right now it is one sentence long.
- **FAQ** (a good fit for the expandable panels already on the site, and well suited to AI answers): Do you take insurance? Is it confidential? Online or in person? What happens in the free consultation? How is this different from traditional therapy? What does "non-pathologizing" mean?

## 5. Ongoing (SEO and AI visibility)

- **Articles:** a short essay series on themes you already write about, for example "Rethinking symptoms as human responses," "Living with treatment resistant depression," "ADHD burnout in a neurotypical world," "Chronic illness and meaning," and "What Intentional Peer Support is." Each one becomes a page that search engines and AI assistants can cite.
- **Privacy notice:** what happens to contact-form and booking data, and the Google Workspace BAA.
- **Testimonials:** most counseling ethics codes discourage soliciting testimonials from current clients, so check your code before adding any.

## New copy added in the redesign

These short labels are marked `NEW` in `content/_data/copy.yml`. Keep, rewrite or delete each one:

- Camus quotation on the home page (`home.philosophy.quote`)
- Services table headings: "Service", "Length", "Investment", "How to begin"
- "Details" (service card link), "Read more" / "Show less" (specialties)
- "All Services" (menu, in `content/_data/navigation.yml`) and "Email" (Contact page card)
