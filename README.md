# Route One V2 — Multi-Page Funnel

A clean, multi-page intent-based engagement funnel for Route One Advisory.

## Architecture

**5 main pages:**
- `/` — The Hook (headline + CTA)
- `/quiz` — 6-question diagnostic quiz
- `/results` — Personalized results page
- `/solution` — The Route One model explained
- `/talk` — Team + cost comparison + CTA

**Supporting pages:**
- `/partner` — For referral partners
- `/not-ready` — Soft exit with lead capture

## Why Multi-Page?

V1 used scroll-locking CSS patterns that broke across browsers, especially in WhatsApp WebView (our primary distribution channel). V2 uses natural browser navigation — each page is self-contained, no scroll hacks needed.

## Tech Stack

- **Astro 5** — Static pages with React islands
- **React 19** — Quiz component only
- **Tailwind CSS 4** — Utility-first styling
- **Vercel** — Hosting

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Push to GitHub, connect to Vercel. Done.

---

Built by Raize The Vibe • February 2026
