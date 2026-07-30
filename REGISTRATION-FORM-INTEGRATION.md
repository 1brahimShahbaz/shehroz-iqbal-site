# Registration Form Integration Guide

Use this guide when adding the same registration form to a new tutor website (e.g. Economics, Maths, Accounts, Psychology). The form works on **static Next.js exports** — no backend server required. Submissions go to a **Google Sheet** via **Google Apps Script**, with an optional email notification.

---

## How it works

```
Student fills form on /register
        ↓
RegistrationForm.tsx (client-side validation)
        ↓
POST → Google Apps Script Web App URL
        ↓
Google Sheet row + optional email alert
```

| Layer | File / service | Role |
|-------|----------------|------|
| UI | `components/register/RegistrationForm.tsx` | Form fields, validation, submit, success/error states |
| Config | `lib/constants.ts` | Grade/subject options, endpoint URL |
| Page | `app/register/page.tsx` | Register page layout and metadata |
| Backend | `scripts/google-registration-form.gs` | Receives JSON, writes to Sheet, sends email |
| Env | `.env.local` | `NEXT_PUBLIC_REGISTRATION_ENDPOINT` (baked in at build time) |

**Important:** Because the site is statically exported, the endpoint URL must be set in `.env.local` **before** `npm run build`. It is not read at runtime from the server.

---

## Files to copy into a new project

Copy these from an existing site (e.g. `shehroz-iqbal-site`):

```
components/register/RegistrationForm.tsx
app/register/page.tsx
scripts/google-registration-form.gs
```

Also ensure the new project already has (or add):

```
lib/constants.ts          → REGISTRATION_ENDPOINT, REGISTER_GRADES, REGISTER_SUBJECTS
lib/analytics.ts          → trackEvent("register_submit", …)  [optional but recommended]
lib/utils.ts              → cn() helper used by the form
lib/seo.ts                → buildMetadata() for the register page
components/shared/AnimateSection.tsx
components/shared/AnimateIn.tsx
components/shared/SectionEyebrow.tsx
.env.local.example        → document the env var
```

### npm dependencies

The form uses:

```json
"react-hook-form": "^7.75.0",
"@hookform/resolvers": "^5.2.2",
"zod": "^4.4.3",
"lucide-react": "^1.16.0"
```

Install if missing:

```bash
npm install react-hook-form @hookform/resolvers zod lucide-react
```

### CSS classes the form expects

These are defined in the site’s global/Tailwind setup:

- `input-field`, `label-mini`
- `btn-primary`, `btn-secondary`
- `shadow-card-rest`, colour tokens (`navy-900`, `gold-500`, `cream-50`, etc.)

If you replicate the full site template, these already exist. For a minimal setup, copy the form-related styles from the source project’s `globals.css` / Tailwind config.

---

## Form fields (current version)

| Field | Required | Sent to Google Sheet as |
|-------|----------|-------------------------|
| First name | Yes | `firstName` |
| Last name | Yes | `lastName` |
| Subject | Yes | `subject` |
| Grade | Yes | `grade` |
| Phone | Yes | `phone` |
| Email | Yes | `email` |
| Honeypot (`botcheck`) | No | Not sent (spam trap) |

### Subject dropdown options

Defined in `lib/constants.ts` as `REGISTER_SUBJECTS`:

- O/A Level Economics
- O/A Level Maths
- O/A Level Accounts
- O/A Level Psychology

### Grade dropdown options

Defined in `lib/constants.ts` as `REGISTER_GRADES` (edit per subject/site):

```ts
export const REGISTER_GRADES = [
  "O Level (7707)",
  "AS Level (9706)",
  "A2 Level (9706)",
] as const;
```

Use the correct CAIE syllabus codes for each teacher (e.g. Economics `9708`, Maths `9709`, etc.).

---

## Google Sheet + Apps Script setup (one time per website)

Do this **once per site** so each teacher gets their own Sheet and notifications.

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name it e.g. `Shehroz Iqbal — Registrations`.
3. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```

### 2. Add the Apps Script

1. In the Sheet: **Extensions → Apps Script**.
2. Delete any default code and paste the contents of `scripts/google-registration-form.gs`.
3. Update these constants at the top of the script:

   ```js
   const SPREADSHEET_ID = "your-spreadsheet-id";
   const SHEET_NAME = "Registrations";           // tab name; created if missing
   const NOTIFY_EMAIL = "teacher@gmail.com";     // set "" to disable emails
   ```

4. **Save** the project (e.g. name it `Registration Form Handler`).

### 3. Deploy as Web App

1. **Deploy → New deployment**.
2. Type: **Web app**.
3. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy** and authorise when prompted.
5. Copy the **Web app URL**. It must end in `/exec`:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### 4. Sheet columns

On the **first submission**, the script creates headers automatically:

| Timestamp | First Name | Last Name | Subject | Grade | Phone | Email |

If you already had an older sheet **without** the Subject column, either:

- Add a **Subject** column manually between Last Name and Grade, or
- Clear the sheet (keep the file) so new headers are written on the next row.

### 5. Redeploy after script changes

Whenever you edit `google-registration-form.gs`:

1. Save in Apps Script.
2. **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**.

The Web app URL stays the same; you do not need to change `.env.local` unless you create a **new** deployment.

---

## Website configuration

### 1. Environment variable

Create or edit `.env.local` in the project root:

```env
NEXT_PUBLIC_REGISTRATION_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Copy from `.env.local.example` if present. **Never commit `.env.local`** (it is gitignored).

### 2. Constants (`lib/constants.ts`)

Ensure these exports exist:

```ts
export const REGISTRATION_ENDPOINT =
  process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT || "";

export const REGISTER_GRADES = [ /* … */ ] as const;

export const REGISTER_SUBJECTS = [ /* … */ ] as const;
```

If a site is **single-subject only** (e.g. Zarak Mushtaq — Economics only), you can remove the subject field from the form and script instead of showing a dropdown with one option. See [Per-site customisation](#per-site-customisation) below.

### 3. Register page

The page at `app/register/page.tsx` renders `<RegistrationForm />` and optional sidebar CTAs (Orb-Ed, WhatsApp, contact). Update:

- Page `title` and `description` in `buildMetadata()`
- Perks copy (“Sir …’s team”)
- Links to Orb-Ed / contact as needed

### 4. Link the form across the site

Add or verify links to `/register` in:

| Location | File |
|----------|------|
| Header CTA | `components/layout/Header.tsx` |
| Mobile nav | `components/layout/MobileStaggeredNav.tsx` |
| Footer | `components/layout/Footer.tsx` |
| Home / about CTAs | `components/about/AboutCTA.tsx`, `components/home/OrbEdRegistrationGuide.tsx` |
| Sitemap | `app/sitemap.ts` |

Header enroll button typically uses `CTA_LABELS.enrollInterestHeader` from constants.

### 5. Build and deploy

```bash
npm run build
```

Upload the `out/` folder to your host (static hosting). The endpoint URL is embedded at build time from `.env.local`.

For local testing:

```bash
npm run dev
```

Open `http://localhost:3000/register`.

---

## Per-site customisation

### Multi-subject hub (e.g. shared registration for several teachers)

Keep **Subject** + **Grade** dropdowns. Point all sites at the **same** Sheet/script, or use one Sheet per hub with the same subject list.

Edit `REGISTER_SUBJECTS` and `REGISTER_GRADES` in `lib/constants.ts`.

### Single-subject site (e.g. Economics only)

1. Remove `REGISTER_SUBJECTS` and the Subject field from `RegistrationForm.tsx`.
2. Remove `subject` from the Zod schema and from the `fetch` JSON body.
3. Remove the Subject column from `google-registration-form.gs` (header + `appendRow` + email body).
4. Update grade codes to match that subject’s syllabi.

### Branding text inside the form

In `RegistrationForm.tsx`, update:

- Success message (“Thank you for registering. Sir …’s team…”)
- Footer privacy line under the submit button

### Analytics (optional)

On successful submit, the form fires:

```ts
trackEvent("register_submit", { level: values.grade, subject: values.subject });
```

Requires GA setup in `lib/analytics.ts` and `NEXT_PUBLIC_GA_ID` in `.env.local`.

---

## Submission payload (reference)

The form POSTs this JSON (as plain text body):

```json
{
  "firstName": "Ahmed",
  "lastName": "Khan",
  "subject": "O/A Level Accounts",
  "grade": "AS Level (9706)",
  "phone": "+92 300 1234567",
  "email": "ahmed@example.com"
}
```

### Why `no-cors` and `text/plain`?

Google Apps Script web apps do not return CORS headers for browser requests. The form uses:

```ts
fetch(REGISTRATION_ENDPOINT, {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-Type": "text/plain;charset=utf-8" },
  body: JSON.stringify({ … }),
});
```

- **`no-cors`:** avoids a CORS preflight failure.
- **`text/plain`:** keeps the request “simple” so the browser does not send a preflight OPTIONS request.
- **Trade-off:** the response is opaque; a resolved `fetch` is treated as success even if the script failed. Verify submissions in the Sheet when testing.

---

## Testing checklist

- [ ] `.env.local` has a valid `/exec` URL
- [ ] `npm run dev` → open `/register`
- [ ] Submit with all fields → success UI appears
- [ ] New row appears in Google Sheet with correct columns
- [ ] Notification email received (if `NOTIFY_EMAIL` is set)
- [ ] Submit with empty fields → inline validation errors
- [ ] Build with `npm run build` and test the exported `/register` page if you deploy statically
- [ ] Honeypot left empty (normal users); form still works

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| “The form isn't fully configured yet…” | Missing `NEXT_PUBLIC_REGISTRATION_ENDPOINT` | Add to `.env.local`, restart dev server or rebuild |
| Success UI but no Sheet row | Wrong `SPREADSHEET_ID`, script error, or permissions | Check Apps Script **Executions** log; redeploy web app |
| 401 / authorisation errors | Web app not deployed as “Anyone” | Redeploy with **Who has access: Anyone** |
| Old rows missing Subject | Sheet created before Subject column was added | Add column manually or clear sheet for fresh headers |
| Changes to script not applied | Old deployment version | Deploy **New version** in Manage deployments |
| Works locally, fails in production | Built without `.env.local` | Set env var on build machine / CI, then rebuild |

---

## Quick copy checklist for a new website

1. Copy `RegistrationForm.tsx`, `app/register/page.tsx`, `google-registration-form.gs`.
2. Add `REGISTRATION_ENDPOINT`, `REGISTER_GRADES`, `REGISTER_SUBJECTS` to `lib/constants.ts`.
3. Create a **new** Google Sheet + Apps Script deployment for that teacher.
4. Set `NEXT_PUBLIC_REGISTRATION_ENDPOINT` in `.env.local`.
5. Customise grades, subjects, and on-page copy.
6. Link `/register` from header, footer, and CTAs.
7. `npm run build` → deploy `out/`.

---

## Related files (reference)

| Path | Purpose |
|------|---------|
| `components/register/RegistrationForm.tsx` | Form UI and submit logic |
| `app/register/page.tsx` | Register route |
| `lib/constants.ts` | Endpoint + dropdown options |
| `scripts/google-registration-form.gs` | Google Sheet backend |
| `.env.local.example` | Env var template |
| `lib/analytics.ts` | GA event on submit |

For the contact/feedback form (separate Sheet), see `scripts/google-feedback-form.gs` and `NEXT_PUBLIC_FEEDBACK_ENDPOINT`.
