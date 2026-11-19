# 2. Booking and forms with Google Workspace (replacing Acuity)

The site's **Book now** buttons and **Contact** form are ready for Google: you create a booking calendar and a form in Google, paste two or three links into the site's settings, and the site switches over by itself. Until then it keeps showing Acuity, so nothing breaks along the way.

Visitors book and submit directly with Google. The website only embeds those pages and stores nothing.

Plan names and menu labels change over time; check them against Google's current help pages.

**Order of work:** Google account and BAA (step 1) → booking (2) → contact form (3) → interest forms (4) → paste the links (5) → test (6) → retire Acuity (7).

## 1. Account and HIPAA prerequisites

1. Use a **paid Google Workspace** account on the practice domain (for example `evan@mythic-counseling.com`). Free `@gmail.com` accounts can't sign a BAA.
2. As the Workspace super admin, accept the **HIPAA Business Associate Amendment**: Admin console (admin.google.com) → **Account** → **Account settings** → **Legal and compliance**.
3. Create every calendar and form below **while signed in to that Workspace account**.
4. Turn on 2-Step Verification for every account that can see client information.

Whether HIPAA formally applies depends on whether the practice is a covered entity; confirm with a compliance adviser.

## 2. Booking: one appointment schedule per service

Make two schedules: **Free Initial 30 Minute Consultation** and **60 Minute Individual Counseling Sessions**.

1. Open Google Calendar on the business account → **Create** → **Appointment schedule**.
2. **Title**: the service name exactly as above.
3. **Appointment duration**: 30 or 60 minutes.
4. **General availability**: your weekly hours (each schedule can have different hours).
5. **Scheduling window**, **Adjusted availability**, **Booked appointment settings**: minimum notice, how far ahead people can book, buffer time between appointments, and a maximum per day.
6. **Calendars checked for availability**: keep the business calendar checked and add any personal calendar whose events should block time. Any *Busy* event on those calendars removes the slot. This is what stops two people taking the same time.
7. **Booking form**: ask only for first name, last name and email. Don't ask about symptoms or reasons for seeking care. Turn on **email verification** for bookers if offered.
8. **Location**: add Google Meet for online sessions, or the office address.
9. **Reminders** (higher tiers): turn on email reminders.
10. **Payments** (optional; needs a higher tier and a Stripe account): for paid sessions only.
11. **Save**.

**Copy the embed link** for each schedule:

1. Open the schedule → **Share** → **Website embed** → **Inline booking page** → **Copy**.
2. Paste it somewhere temporary. It's a block of code; you need only the part inside `src="…"`, which looks like
   `https://calendar.google.com/calendar/appointments/schedules/AcZssZ…?gv=true`

Acuity also offers 90- and 120-minute individual sessions. The site currently books only the two above (longer sessions are "by request"). To make longer sessions bookable online, create schedules for them and ask for a tab to be added to the booking window.

## 3. The Contact page form

The Contact page keeps its own form, in the site's design. Behind the scenes, each message goes into a Google Form on your Workspace account, so you get an email for every message and a record in Google, covered by the BAA. Visitors never see Google's page.

1. In Google Forms on the business account, create a form with exactly these four questions, all **required**, and no others:
   - **First Name** (short answer)
   - **Last Name** (short answer)
   - **Email** (short answer)
   - **Message** (paragraph)
2. **Settings**:
   - **Responses → Collect email addresses**: **Do not collect**. The Email question covers it; any other setting stops the site's form from working.
   - **Responses → Requires sign in**: leave **Restrict to users in your organization** turned **off**.
3. **Responses** tab → ⋮ → **Get email notifications for new responses**. This is what sends each message to your business inbox.
4. Optional: **Responses → Link to Sheets** to keep a spreadsheet of inquiries (also covered by the BAA).
5. Get the **pre-filled link**, which tells the site where each answer goes:
   1. ⋮ (top right) → **Get pre-filled link**.
   2. Type exactly these answers, one per question: **FIRST**, **LAST**, **EMAIL** (just the word, not an email address) and **MESSAGE**.
   3. **Get link** → **Copy link**. It looks like
      `https://docs.google.com/forms/d/e/…/viewform?usp=pp_url&entry.123…=FIRST&entry.456…=LAST&entry.789…=EMAIL&entry.012…=MESSAGE`

If you paste the form's ordinary link instead (Send → 🔗), the site shows Google's own form embedded in the page. That works too, but visitors must allow Google content first, and it looks like Google rather than the site.

## 4. Interest forms (Group Counseling, IPS training)

The **Group Counseling Interest Form** and **IPS Core Training Interest Form** buttons already open Google Forms. Open each one: if it was made on a personal Gmail account, make a copy on the Workspace account (⋮ → **Make a copy**), turn on response notifications, and copy its link as in step 3.5.

## 5. Paste the links into the site

**In Pages CMS** (easiest): **Settings (email, booking, forms)** →

- *Free consultation schedule* ← the consultation `src` link
- *Individual sessions schedule* ← the individual `src` link
- *Contact page Google Form link* ← the **pre-filled** link from step 3.5

→ **Save**. For new interest forms: **Services** → Group Counseling / Intentional Peer Support → *Interest form link* → **Save**.

**Or by hand** in `content/_data/settings.yml`:

```yaml
booking:
  google:
    consultation: "https://calendar.google.com/calendar/appointments/schedules/…?gv=true"
    individual: "https://calendar.google.com/calendar/appointments/schedules/…?gv=true"

forms:
  contact: "https://docs.google.com/forms/d/e/…/viewform?usp=pp_url&entry.…=FIRST&entry.…=LAST&entry.…=EMAIL&entry.…=MESSAGE"
```

(and `form_url:` in `content/_services/group-counseling.md` and `intentional-peer-support-training.md`), then commit and push.

What changes on the site:

- **Book now** opens a window with a tab for each Google schedule. The **Book now** button on a service page opens on that service's tab.
- The Contact page form sends messages straight to your Google Form, and you get an email for each one. Until a link is set, it opens the visitor's own email app instead.
- The Acuity scheduler disappears from the site as soon as one Google link is set.

## 6. Test before cancelling anything

From a personal account, in a private browser window:

1. Book a consultation through the live site. Check that it appears on the business calendar, that both sides get a confirmation email, and that the slot disappears from the booking page.
2. Add a *Busy* event to the business calendar; check that its time disappears from booking.
3. Send a message through the Contact page. Check that you see the thank-you message, that the response appears in the Google Form's **Responses** tab, and that the notification email arrives. If the thank-you shows but no response arrives, recheck step 3.2 and that the four answers in the pre-filled link were typed exactly.
4. Submit each interest form.
5. Cancel the test booking and delete the test responses.

## 7. Retire Acuity

1. In Acuity, **stop new bookings** (block off all future availability, or turn off the scheduling page), but keep the account while existing appointments are still ahead.
2. Export upcoming appointments (**Reports → Import/Export**) and add any after the switch date to Google Calendar, so they block availability.
3. Remove the Acuity links in Settings once you no longer want a fallback: clear *Acuity booking page* and *Acuity embed link*. (With both Google links set they are already unused.)
4. When the last Acuity appointment has passed, download what you need to keep for your records, then cancel the subscription.
