# Route One V2 — Deployment Instructions

> **Last Updated:** 2026-02-19
> **Status:** Ready to deploy

---

## Pre-Deploy Checklist

- [ ] Step 1: Set up Google Sheet
- [ ] Step 2: Deploy Apps Script webhook
- [ ] Step 3: Set environment variable
- [ ] Step 4: (Optional) Add Graphik fonts
- [ ] Step 5: Deploy to Vercel
- [ ] Step 6: Test the full flow
- [ ] Step 7: (Later) Add calendar URL and WhatsApp number

---

## Step 1: Set Up Google Sheet

**Sheet ID:** `1Ox5PtQ5oIAxxbojT2M-_TEb3P4RfdOgBAcaT8LozISI`

1. Open: https://docs.google.com/spreadsheets/d/1Ox5PtQ5oIAxxbojT2M-_TEb3P4RfdOgBAcaT8LozISI
2. Create a tab called **`Leads`** (if it doesn't exist)
3. In Row 1, add these column headers (A through Z):

```
timestamp | submissionType | firstName | email | company | industry | entityCount | booksStatus | frustration | opportunity | personalTime | tier | painLevel | urgency | maturityScore | caseStudyRoute | industryLabel | bridgeResponses | utmSource | utmMedium | utmCampaign | utmContent | gclid | fbclid | userAgent | referrer
```

That's it for the sheet.

---

## Step 2: Deploy Apps Script Webhook

**Script ID:** `1or4fcJce5H-aAA191zNSLuvArhKBkvpMtoOyaoyot8lv7bkwoqN6_onH`

1. Open: https://script.google.com/d/1or4fcJce5H-aAA191zNSLuvArhKBkvpMtoOyaoyot8lv7bkwoqN6_onH/edit

2. Delete any existing code and paste the contents of:
   ```
   ~/clawd/clients/route-one-v2/scripts/apps-script-webhook.js
   ```
   
3. Save (Ctrl/Cmd + S)

4. Click **Deploy** → **New deployment**

5. Configure:
   - **Type:** Web app
   - **Execute as:** Me
   - **Who has access:** Anyone

6. Click **Deploy**

7. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

8. **Test it:** In the Apps Script editor, run `testDoPost()` 
   - Check the Sheet — a test row should appear
   - Check dean@routeoneadvisory.com — notification email should arrive

---

## Step 3: Set Environment Variable

You need to add the webhook URL to Vercel.

**Option A: Via Vercel Dashboard**
1. Go to: https://vercel.com (your Route One V2 project)
2. Settings → Environment Variables
3. Add:
   - **Name:** `PUBLIC_SHEETS_WEBHOOK_URL`
   - **Value:** (paste the Web App URL from Step 2)
   - **Environment:** Production, Preview, Development

**Option B: Via .env.local (for local dev)**
1. Create `.env.local` in the project root:
   ```
   PUBLIC_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## Step 4: (Optional) Add Graphik Fonts

The site will fall back to Inter if fonts aren't added. To use Graphik:

1. Get the font files:
   - `Graphik-Regular.woff2`
   - `Graphik-Medium.woff2`

2. Add them to:
   ```
   ~/clawd/clients/route-one-v2/public/fonts/
   ```

If you don't have the files, the site works fine with the Inter fallback.

---

## Step 5: Deploy to Vercel

From the project directory:

```bash
cd ~/clawd/clients/route-one-v2
npx vercel --prod
```

Or push to the connected Git repo and let Vercel auto-deploy.

---

## Step 6: Test the Full Flow

1. **New visitor flow:**
   - Visit `/` → Click CTA → Complete quiz → See results → Solution → Talk
   - Verify data appears in Google Sheet
   - Verify notification email sent to dean@routeoneadvisory.com

2. **Return visitor flow:**
   - Visit `/` again → Should see "Welcome back, {name}"
   - Click "See Your Results" → Should go directly to results

3. **Mobile test:**
   - Test on phone or at 375px width
   - All buttons tappable, no horizontal scroll

4. **WhatsApp WebView test:**
   - Send yourself the link via WhatsApp
   - Open in WhatsApp's in-app browser
   - Verify everything works (no fixed positioning issues)

---

## Step 7: (Later) Add Calendar URL and WhatsApp Number

When A.J. provides these:

**Calendar URL:**
1. Edit `src/pages/talk.astro`
2. Find the `data-calendar-url=""` attribute
3. Add the calendar embed URL (Calendly, Cal.com, etc.)

**WhatsApp Number:**
1. Edit `src/pages/talk.astro`
2. Find the WhatsApp CTA script
3. Update `wa.href = \`https://wa.me/PHONE_NUMBER?text=...\``

---

## Troubleshooting

**Sheets not receiving data:**
- Check `PUBLIC_SHEETS_WEBHOOK_URL` is set in Vercel
- Check Apps Script is deployed as "Anyone" access
- Check browser console for errors

**Email not sending:**
- Apps Script quota: 100 emails/day for free accounts
- Check spam folder
- Verify `NOTIFICATION_EMAIL` in the script

**Fonts not loading:**
- Check files exist in `/public/fonts/`
- Check browser Network tab for 404s
- Falls back to Inter automatically

---

## Key URLs

| Resource | URL |
|----------|-----|
| Google Sheet | https://docs.google.com/spreadsheets/d/1Ox5PtQ5oIAxxbojT2M-_TEb3P4RfdOgBAcaT8LozISI |
| Apps Script | https://script.google.com/d/1or4fcJce5H-aAA191zNSLuvArhKBkvpMtoOyaoyot8lv7bkwoqN6_onH/edit |
| Vercel Project | (check your Vercel dashboard) |

---

*Ship it.* 🚀
