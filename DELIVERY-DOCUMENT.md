# Route One Advisory — Diagnostic Funnel Delivery

**Prepared by:** Raize The Vibe  
**Date:** February 19, 2026  
**Client:** Dean @ Route One Advisory  
**Project:** Financial Operations Diagnostic Funnel

---

## What Was Built

A complete diagnostic quiz funnel that:

1. **Qualifies leads** through 6 strategic questions about their financial operations
2. **Calculates a maturity score** (0-100) based on responses
3. **Personalizes results** with industry-specific case studies
4. **Captures lead data** to Google Sheets with full attribution tracking
5. **Sends email notifications** to dean@routeoneadvisory.com for each completed quiz

---

## Live Preview

**Current URL:** https://route-one-v2.vercel.app

This is the staging/preview URL. Ready for your custom domain.

---

## What's Included

### Pages
- **Homepage** — Clear value prop, single CTA
- **/quiz** — 6-question diagnostic + contact capture
- **/results** — Personalized score breakdown with gauge visualization
- **/solution** — Next steps / what Route One offers
- **/talk** — Calendar booking integration point
- **/not-ready** — Soft exit for low-intent visitors

### Lead Capture
- All quiz completions logged to Google Sheets
- Email notification sent automatically
- Full UTM and attribution tracking (source, medium, campaign, gclid, fbclid)
- Browser/referrer data captured

### Google Sheet
- **URL:** https://docs.google.com/spreadsheets/d/1Ox5PtQ5oIAxxbojT2M-_TEb3P4RfdOgBAcaT8LozISI
- **Tab:** Leads
- **26 columns** of data per submission

---

## Testing Completed

| Test | Status |
|------|--------|
| Quiz flow (all questions) | ✅ Passed |
| Contact form submission | ✅ Passed |
| Results page scoring | ✅ Passed |
| Google Sheets webhook | ✅ Passed |
| Email notifications | ✅ Configured |
| Mobile responsive | ✅ Verified |

---

## To Go Live: DNS Setup

We need your custom domain or subdomain to point to this site.

**Option A: Subdomain (Recommended)**  
Example: `diagnostic.routeoneadvisory.com` or `quiz.routeoneadvisory.com`

**Option B: New Domain**  
Example: `routeonediagnostic.com`

### What We Need From You

Please provide ONE of the following:

1. **Subdomain you want to use** (e.g., `diagnostic.routeoneadvisory.com`)
   - We'll send you the DNS records to add

2. **Access to your DNS provider** (Cloudflare, GoDaddy, Namecheap, etc.)
   - We can add the records directly

3. **Full domain transfer**
   - If you want us to manage the domain entirely

### DNS Records (once you choose a domain)

| Type | Name | Value |
|------|------|-------|
| CNAME | [subdomain] | cname.vercel-dns.com |

OR for apex domain:
| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |

---

## Ownership & Access

### You Own
- Google Sheet with all lead data
- Apps Script webhook (in your Google account)
- All collected leads and attribution data

### We Manage
- Vercel hosting (under Enterweb Guru team)
- GitHub repository (L0v3Chrix/route-one-v2)
- Deployment and updates

### Credentials Delivered
- **Apps Script Project:** https://script.google.com/d/1or4fcJce5H-aAA191zNSLuvArhKBkvpMtoOyaoyot8lv7bkwoqN6_onH/edit
- **Webhook URL:** https://script.google.com/macros/s/AKfycbwZpDuff-0lsryB0fcbokI8cEyyPtYsNedpijL29rTdlHG7-CjM9Aioq9-ZOVvO3vfT1g/exec

---

## Next Steps

1. **Reply with your domain preference** (subdomain or new domain)
2. We'll configure DNS and SSL
3. Final review on live domain
4. Launch 🚀

---

## Support

Any issues or changes needed? Reach out to Chrix at Raize The Vibe.

---

*Built with care by Raize The Vibe — AI-powered marketing that moves calendars.*
