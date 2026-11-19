# 4. Newsletter and free offer

The site has email signup forms ready on the blog page, at the end of every post, and on a `/newsletter/` landing page. They stay hidden until a newsletter service is connected. The website stores no email addresses: the form sends them straight to the newsletter service, which handles confirmation emails, unsubscribes and sending.

## 1. Choose a newsletter service

Pick one that offers all of these:

- **Embeddable HTML signup forms**, which is how the site connects.
- **Double opt-in**, where a confirmation email is sent before someone is added. This is best practice under GDPR and keeps the list clean.
- **An automated welcome email with a file or link**, to deliver your free offer.
- **RSS-to-email**, which emails subscribers automatically when a new blog post appears in the site's feed.

Good fits for a small practice (plans and prices change, so check each one's current free tier for the features above):

| Service | Notes |
| --- | --- |
| **MailerLite** | Generous free tier, EU-based company, strong GDPR tools, RSS campaigns and automations. |
| **Kit** (formerly ConvertKit) | Built around "incentive emails" for free offers; free tier for a starting list. |
| **Buttondown** | Simple and privacy-focused; write emails in Markdown. |

The list holds only email addresses, not health information, so a HIPAA BAA isn't needed. Don't import client email addresses into it, though: being on the list would reveal who is a client.

## 2. Set it up in the service

1. Create the account using the practice email.
2. **Sender details:** U.S. law (CAN-SPAM) requires a valid **postal address** in every newsletter footer. A P.O. box or virtual mailbox works if you'd rather not publish an office address.
3. Turn on **double opt-in**.
4. Create a **signup form** of the "embedded" or "HTML" type with just an email field.

## 3. Connect it to the site

1. Open the form's **embed / HTML code** and find:
   - the form's `action="…"` URL;
   - the `name="…"` of the email input;
   - any `<input type="hidden" …>` lines.

   They usually look something like this (yours will differ):

   | Service | action | email field |
   | --- | --- | --- |
   | MailerLite | `https://assets.mailerlite.com/jsonp/…/forms/…/subscribe` | `fields[email]` (plus hidden `ml-submit` = `1`) |
   | Kit | `https://app.kit.com/forms/…/subscriptions` | `email_address` |
   | Buttondown | `https://buttondown.com/api/emails/embed-subscribe/…` | `email` |

2. Paste them into **Pages CMS → Settings → Newsletter service**, or into `content/_data/settings.yml`:

   ```yaml
   newsletter:
     action: "https://…"
     email_field: "email"
     hidden_fields:
       - { name: "ml-submit", value: "1" }   # only if the embed code has hidden inputs
   ```

3. Save. The signup forms, the `/newsletter/` page and a **Newsletter** footer link appear on the next publish.
4. Name the service in the **Privacy Policy** (`content/_legal/privacy-policy.md`, "When you subscribe to the newsletter" and "Who processes your information").
5. Test it: subscribe with a personal address, confirm, and check that you arrive on the list.

## 4. Your free offer

When the offer is ready:

1. Make it: a PDF guide, a short audio reflection, a worksheet, a mini email course, or anything else.
2. Upload it to the newsletter service (not the website) and set up the **welcome / incentive email** that delivers it after someone confirms.
3. Describe it on the site: **Pages CMS → Page copy → Newsletter signup → Free offer** (`newsletter.offer` in `copy.yml`). It appears above the form on the blog page and the `/newsletter/` page. You may also want to change the heading and button, for example "Send me the guide".

The Terms and Conditions already say a free resource is for personal use only.

## 5. Emails when a new post is published

Set up an **RSS-to-email** (sometimes called "RSS campaign" or "RSS automation") in the service, using the site's feed:

```
https://mythic-counseling.github.io/Website/feed.xml
```

Once the domain points at GitHub, this becomes `https://mythic-counseling.com/feed.xml`; update it in the service then. Choose how often it checks (for example weekly) and whether to send the full post or a summary with a link. Each post's **summary** field becomes the teaser.
