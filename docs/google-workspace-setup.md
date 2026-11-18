# Google Workspace setup: booking and forms

The site uses Google Calendar **appointment schedules** for booking and **Google Forms** for the contact forms. Nothing is stored on GitHub Pages: visitors book and submit directly with Google, and the site only embeds those pages.

Plan names, feature tiers and menu labels change over time. Check them against Google's current help pages.

## 1. Account and HIPAA prerequisites

1. Use a **paid Google Workspace** account on the practice domain (for example `evan@mythic-counseling.com`). Consumer `@gmail.com` accounts are not eligible for a BAA.
2. As a Workspace super admin, review and accept the **HIPAA Business Associate Amendment** under Admin console → Account → Account settings → Legal and compliance.
3. Create every calendar and form below while signed in to that Workspace account.
4. Recommended: turn on 2-Step Verification for every account that can see client information.

Whether HIPAA formally applies depends on whether the practice is a covered entity. Confirm with a compliance adviser.

## 2. Booking with appointment schedules

Do this once per bookable service: one schedule for the **Free Initial 30 Minute Consultation** and one for **60 Minute Individual Counseling Sessions**.

1. Open Google Calendar on the business account → **Create** → **Appointment schedule**.
2. **Title**: use the service name exactly as it appears above.
3. **Appointment duration**: 30 minutes or 60 minutes.
4. **General availability**: set your weekly hours. You can set different hours for each schedule.
5. **Scheduling window**, **Adjusted availability** and **Booked appointment settings**: set the minimum notice before a booking, the maximum days ahead, buffer time between appointments, and a maximum number of bookings per day.
6. **Calendars checked for availability**: keep the business calendar checked, and add any other calendar whose events should block time. Any event marked *Busy* on those calendars removes the slot. That is what stops two people booking the same time, and it also blocks personal appointments.
7. **Booking form**: collect only first name, last name and email. Don't add questions about symptoms or reasons for seeking care. Turn on **email verification** for bookers if your plan offers it, to reduce spam bookings.
8. **Video conferencing**: add Google Meet if sessions are virtual. Otherwise set a location.
9. **Reminders** (higher Workspace tiers): enable email reminders.
10. **Payments** (optional; needs a paid tier and Stripe): only for paid sessions, not the free consultation.
11. **Save**.

### Get the embed link

1. Open the schedule → **Share** → **Website embed** → **Inline booking page** → copy the code.
2. In that code, copy only the `src="…"` value. It looks like
   `https://calendar.google.com/calendar/appointments/schedules/AcZssZ…?gv=true`
3. Paste it into `_config.yml`:

```yaml
booking:
  google:
    consultation: "https://calendar.google.com/calendar/appointments/schedules/…?gv=true"
    individual:   "https://calendar.google.com/calendar/appointments/schedules/…?gv=true"
```

When at least one link is set, the Appointments page shows the Google calendar(s), with tabs if both are set. The Acuity scheduler is no longer used and can be cancelled after you confirm Google booking works. The "Book" buttons on the home page and service pages open `/appointments/#consultation` or `/appointments/#individual`, which pre-selects the right tab.

### Test it

1. From a personal account in a private browser window, book a slot.
2. Confirm that the event appears on the business calendar, that both sides receive confirmation emails, and that the slot no longer appears on the booking page.
3. Add a *Busy* event to the business calendar and confirm that its time disappears from the booking page.
4. Cancel the test booking.

## 3. Contact forms with Google Forms

The site has two inquiry forms: **Contact** (Contact page, button "SEND") and **Begin Your Mythic Journey** (each service page, button "Submit"). You can use one Google Form for both, or two separate forms.

1. In Google Forms on the business account, create a form with these fields, all required, matching the current site:
   - **First Name** (short answer)
   - **Last Name** (short answer)
   - **Email** (short answer, with response validation set to email)
   - **Message** (paragraph)
2. Settings:
   - **Responses → Collect email addresses**: *Do not collect* (the Email question already covers it), or *Verified* if you want only signed-in Google users.
   - **Presentation → Confirmation message**: `Thank you!` (the original site's message).
   - Turn on response notifications: Responses tab → ⋮ → **Get email notifications for new responses**.
3. Optional: Responses → **Link to Sheets** to keep responses in a Sheet, also covered by the BAA.
4. Click **Send** → link icon → copy the link (`https://docs.google.com/forms/d/e/…/viewform`).
5. Paste it into `_config.yml`:

```yaml
forms:
  contact: "https://docs.google.com/forms/d/e/…/viewform"
  journey: "https://docs.google.com/forms/d/e/…/viewform"
```

The site adds `?embedded=true` automatically. While a link is empty, that form falls back to opening the visitor's email app addressed to the practice email.

## 4. Interest forms

The **Group Counseling Interest Form** and **IPS Core Training Interest Form** links in `_config.yml` (`forms.group_counseling`, `forms.ips_training`) already point to Google Forms. If those forms were created on a personal Gmail account, recreate them on the Workspace account and update the links.

## 5. Publish

Commit and push the `_config.yml` change. GitHub Pages rebuilds the site automatically.
