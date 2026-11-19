# 6. How email and DNS work (for mythic-counseling.com)

A reference for what the domain's records do, using the practice's actual setup.

## The pieces

| Thing | What it is | For mythic-counseling.com |
| --- | --- | --- |
| **Domain registrar** | The company you rent the name from each year | Check Cloudflare → **Domain Registration**; otherwise Squarespace Domains |
| **DNS host** | The servers that answer questions about the name: "where is the website?", "where does mail go?" | **Cloudflare** (`dave.ns.cloudflare.com`, `lilyana.ns.cloudflare.com`) |
| **Website host** | The servers that send the pages | Squarespace today; GitHub Pages after the switch |
| **Mail host** | The servers that receive, store and send the practice's email | **Google Workspace** |

They are independent. The registrar says which DNS host is in charge, and the DNS host's records point the website and the email at their hosts. That is why the website can move from Squarespace to GitHub without touching email.

## DNS records

DNS is a distributed lookup table: a name plus a record type gives an answer. Answers are cached for the record's **TTL** (time to live), which is why changes take minutes to hours to reach everyone.

| Type | Answers | Your records today |
| --- | --- | --- |
| **NS** (name server) | "Who is in charge of this domain's records?" Set at the registrar. | Cloudflare's two name servers |
| **A** / **AAAA** | "What is the IPv4 / IPv6 address of this name?" Used for websites. | The website, via Cloudflare's proxy to Squarespace (GitHub's addresses after the switch) |
| **CNAME** | "This name is an alias of that other name; look that one up instead." | `www`; after the switch → `mythic-counseling.github.io` |
| **MX** (mail exchanger) | "Which server accepts email for addresses @this domain?" The number is a priority; lower is tried first. | `1 smtp.google.com` |
| **TXT** | Free text that services read. Used for email security and for proving you own the domain. | SPF, DKIM, and later the GitHub, Search Console and newsletter verification records |

A **CNAME** replaces every other record for that exact name, so a name with a CNAME can't also have MX or TXT records. That's why the bare domain (`mythic-counseling.com`, written `@`), which needs MX and TXT for email, uses **A/AAAA** records for the website, while `www`, which handles only web traffic, can use a CNAME.

Cloudflare's orange-cloud **proxy** puts Cloudflare's servers in front of the website (the A records then show Cloudflare's addresses). It applies only to web records, never to MX.

## How a message reaches the inbox

Say someone at gmail.com writes to evan@mythic-counseling.com:

1. **Sending.** Their mail app hands the message to *their* provider's outgoing server using **SMTP** (Simple Mail Transfer Protocol), signed in, usually on port 587.
2. **Finding you.** That server asks DNS for the **MX** record of `mythic-counseling.com` and gets `smtp.google.com`.
3. **Delivery.** It connects to `smtp.google.com` (SMTP again, server to server, port 25) and hands over the message.
4. **Checks.** Google checks the sender's SPF, DKIM and DMARC (below) and scans for spam and malware.
5. **Storage.** The message is stored in the evan@ **mailbox** on Google's servers, replicated across Google's data centers. That mailbox *is* the inbox: a database on the mail host, not anything in the DNS and not on your computer.
6. **Reading.** Your devices fetch it from Google:
   - **Gmail (web or app):** Google's own connection. This is most likely what you use.
   - **IMAP** (Apple Mail, Outlook, Thunderbird…): keeps a synced copy; mail, folders and read status stay on the server, so every device sees the same thing. Recommended for any non-Gmail app.
   - **POP3:** downloads messages to one device and usually removes them from the server. Outdated, and risky for practice records; avoid it.

Sending from evan@ works the same way in reverse: your app hands the message to Google's outgoing server by SMTP, and Google looks up the *recipient's* MX.

So "set up with SMTP" only describes **sending**. Reading is Gmail, IMAP or POP. With an MX record of `smtp.google.com`, the mailbox is Google Workspace, and the practice's mail is held by Google under the Workspace BAA ([guide 2](2-booking-and-forms.md)).

## Email security records (TXT)

Email was designed without proof of who sent a message. These records add it:

| Record | Name | Purpose | Status |
| --- | --- | --- | --- |
| **SPF** | `@` | Lists the servers allowed to send mail *as* @mythic-counseling.com | ✓ `v=spf1 include:_spf.google.com ~all` (Google may send for you) |
| **DKIM** | `google._domainkey` | A public key. Google signs each outgoing message; receivers check the signature with this key, proving the message wasn't forged or altered. | ✓ Set |
| **DMARC** | `_dmarc` | Tells receivers what to do when SPF and DKIM fail (nothing / spam folder / reject), and where to send reports | ✗ Missing |

**Recommended:** add a DMARC record. Gmail and Yahoo now expect one, it makes spoofing your address harder, and the newsletter will need it. In Cloudflare: **DNS → Records → Add record**:

- Type **TXT**, name **`_dmarc`**
- Content `v=DMARC1; p=none; rua=mailto:evan@mythic-counseling.com`

`p=none` only collects reports, so nothing changes for delivery. The reports are machine-readable files; free services such as Cloudflare's **DMARC Management** (in the same dashboard) summarize them. After a month or so with no legitimate mail failing, change `p=none` to `p=quarantine`.

When you set up a **newsletter service** ([guide 4](4-newsletter.md)), it will ask you to add its own DKIM records (usually CNAME or TXT records with names like `xyz._domainkey`) and may ask to update SPF. Add them in Cloudflare exactly as given, so newsletters arrive as coming from @mythic-counseling.com rather than landing in spam.

## Safe-change checklist

- Website changes touch only **A**, **AAAA** and the **`www`** record.
- Email depends on **MX**, the SPF **TXT** on `@`, and the **`_domainkey`** and **`_dmarc`** records. Leave them unless an email provider tells you otherwise.
- Screenshot the records before any change; Cloudflare also keeps an audit log (**Manage Account → Audit Log**).
