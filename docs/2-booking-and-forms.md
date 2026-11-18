# 2. Booking and forms with Google Workspace (replacing Acuity)

The site's **Appointments** page and inquiry forms are ready for Google: you create booking calendars and forms in Google, paste the links into `_config.yml`, and the site switches over by itself. Until then the Appointments page keeps showing Acuity, so nothing breaks along the way.

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

Acuity also offers 90- and 120-minute individual sessions. The site currently books only the two above (longer sessions are "by request"). To make longer sessions bookable online, create schedules for them and ask for a tab to be added to the Appointments page.

## 3. The inquiry forms

The site has two: **Contact** (Contact page, button "SEND") and **Begin Your Mythic Journey** (on each service page, button "Submit"). One Google Form can serve both, or make two.

1. In Google Forms on the business account, create a form with these questions, all required:
   - **First Name** (short answer)
   - **Last Name** (short answer)
   - **Email** (short answer → ⋮ → Response validation → Text → Email)
   - **Message** (paragraph)
2. **Settings**:
   - **Responses → Collect email addresses**: *Do not collect* (the Email question covers it).
   - **Presentation → Confirmation message**: `Thank you!`
3. **Responses** tab → ⋮ → **Get email notifications for new responses**.
4. Optional: **Responses → Link to Sheets** to keep a spreadsheet of inquiries (also covered by the BAA).
5. **Send** → link icon 🔗 → **Copy**. It looks like `https://docs.google.com/forms/d/e/…/viewform`.

## 4. Interest forms (Group Counseling, IPS training)

The **Group Counseling Interest Form** and **IPS Core Training Interest Form** buttons already open Google Forms. Open each one: if it was made on a personal Gmail account, make a copy on the Workspace account (⋮ → **Make a copy**), turn on response notifications, and copy its link as in step 3.5.

## 5. Paste the links into the site

Open `_config.yml` (on github.com: open the file → pencil icon) and fill in:

```yaml
booking:
  google:
    consultation: "https://calendar.google.com/calendar/appointments/schedules/…?gv=true"
    individual: "https://calendar.google.com/calendar/appointments/schedules/…?gv=true"

forms:
  contact: "https://docs.google.com/forms/d/e/…/viewform"
  journey: "https://docs.google.com/forms/d/e/…/viewform"   # can be the same form
  ips_training: "…"        # only if you made new interest forms
  group_counseling: "…"
```

Commit the change (and push, if editing on your computer). What changes on the site:

- The **Appointments** page shows a tab for each Google schedule. The booking buttons on the home and service pages open the right tab.
- The Contact page and the "Begin Your Mythic Journey" sections show the Google Form in place of the email fallback.
- The Acuity scheduler disappears as soon as one Google link is set.

## 6. Test before cancelling anything

From a personal account, in a private browser window:

1. Book a consultation through the live site. Check that it appears on the business calendar, that both sides get a confirmation email, and that the slot disappears from the booking page.
2. Add a *Busy* event to the business calendar; check that its time disappears from booking.
3. Send a message through the Contact page and a service page's form; check that the notification emails arrive.
4. Submit each interest form.
5. Cancel the test booking and delete the test responses.

## 7. Retire Acuity

1. In Acuity, **stop new bookings** (block off all future availability, or turn off the scheduling page), but keep the account while existing appointments are still ahead.
2. Export upcoming appointments (**Reports → Import/Export**) and add any after the switch date to Google Calendar, so they block availability.
3. Once you no longer want a fallback, you can clear `acuity_url` and `acuity_embed_url` in `_config.yml`. (With a Google link set they are already unused.)
4. When the last Acuity appointment has passed, download what you need to keep for your records, then cancel the subscription.
