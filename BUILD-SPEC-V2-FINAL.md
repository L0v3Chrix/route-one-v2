# ROUTE ONE ADVISORY — V2 FINAL BUILD SPEC

> **Spec Version:** 2.0 — Restructured for autonomous agent execution
> **Project:** Route One Advisory Engagement Funnel
> **Tech Stack:** Astro 5 + React 19 + Tailwind CSS v4 + Vercel
> **Repo:** `route-one-v2/` — all file paths relative to repo root
> **Distribution:** WhatsApp in-app WebView (primary), direct URL (secondary)
> **Client:** Route One Advisory — white-label fractional CFO / accounting firm for $5M–$100M companies
> **Builder:** Raize the Vibe (agency)
> **Notification Email:** dean@routeoneadvisory.com
> **Google Sheet ID:** `1Ox5PtQ5oIAxxbojT2M-_TEb3P4RfdOgBAcaT8LozISI`
> **Apps Script ID:** `1or4fcJce5H-aAA191zNSLuvArhKBkvpMtoOyaoyot8lv7bkwoqN6_onH`

---

## MISSION

Finish the Route One multi-page engagement funnel. The v2 architecture (Astro multi-page, React islands, industry-routed content, maturity scoring) is sound. What's missing: the emotional engine that was stripped in the v1→v2 rewrite, the data pipeline to Google Sheets, email notifications for new leads, NEPQ copy refinements, and brand compliance.

**North star:** A data-driven diagnostic experience that makes financial operators think "this company sees my exact problem" — not "this company wants my money." Route One closes 70–80% of prospects who understand the model. This funnel creates that understanding in under 5 minutes via WhatsApp.

**Emotional arc:**
```
/ (Hero)       → Curiosity + pattern interrupt
/quiz          → Self-disclosure + micro-investment
/results       → Recognition + anxiety + "someone sees me"
/solution      → Relief + reframing + proof
/talk          → Trust + confidence + action
```

---

## CLIENT DIRECTIVES (override all prior assumptions)

- **D1:** Remove all costing/pricing from funnel. "It's pretty bespoke." — Remove `SavingsCalculator` from `/talk`.
- **D2:** Brand palette: Primary `#0F383C`, Secondary `#A7BCB2`, Font color `#E5EBE8`.
- **D3:** Font: Graphik Trial — Headings Medium (500), Body Regular (400). Fall back to Inter if font files unavailable.
- **D4:** Notification email: `dean@routeoneadvisory.com`.
- **D5:** Google Sheet and Apps Script are both BLANK — build everything from scratch.

---

## CODEBASE MAP

### Pages (`src/pages/`)

| File | Role | Current State |
|------|------|---------------|
| `index.astro` | Hero landing — "visibility problem" hook | Working. Needs: copy tweaks, return visitor detection |
| `quiz.astro` | Quiz wrapper → `Quiz.tsx` island | Working. Needs: analytics hook |
| `results.astro` | Dashboard → `DynamicResults.tsx` | Working. Needs: QuizTransition, bridge, progressive reveal |
| `solution.astro` | Industry proof → `DynamicSolution.tsx` | Working. Needs: NEPQ copy, bridge, transition copy |
| `talk.astro` | Team + booking CTA | Needs: remove calculator, calendar embed, WhatsApp CTA, bridge, Sheets form |
| `not-ready.astro` | Exit path / lead magnet | Needs: form wiring to Sheets |
| `partner.astro` | Referral partner flow | Low priority — leave as-is |

### Components (`src/components/`)

| File | Role | State |
|------|------|-------|
| `Quiz.tsx` | 6-question quiz + email gate + localStorage | Working. Wire to Sheets + analytics |
| `DynamicResults.tsx` | Maturity gauge + pain + inaction calculator | Working. Add QuizTransition + bridge + progressive reveal |
| `MaturityGauge.tsx` | Animated SVG radial gauge | Complete — no changes |
| `InactionCalculator.tsx` | Cost sliders + animated output | Complete — no changes |
| `DynamicSolution.tsx` | Misdiagnosis + model + case study + timeline | Working. NEPQ copy + bridge |
| `SavingsCalculator.tsx` | Staff/salary comparison | **REMOVE FROM PAGES** — keep file, delete imports |

### Libraries (`src/lib/`)

| File | Role | State |
|------|------|-------|
| `quizData.ts` | Questions, tags, QuizState type, INDUSTRY_LABELS | Complete |
| `quizRouting.ts` | buildRoutingProfile(), calculateMaturityScore(), buildQueryString() | Complete |
| `industryContent.ts` | 5 industry content variants | Complete |

### Layout & Styles

| File | Role | State |
|------|------|-------|
| `src/layouts/Layout.astro` | HTML shell, OG meta, font loading | Needs: rebrand font swap, UTM capture, per-page meta |
| `src/styles/global.css` | Tailwind v4 @theme, animations | Needs: new color values, @font-face |

---

## PHASE 0: REBRAND + CLEANUP

**Goal:** Update brand colors, font, and remove pricing calculator. Every subsequent phase renders correctly.

### Task 0.1 — Replace Color Palette in `global.css`

**Keep the CSS variable NAMES as-is** (e.g., `--color-ro-green`). Only change the HEX VALUES. This avoids a find-and-replace across every component.

| Variable Name (keep) | Old Value (replace) | New Value |
|----------------------|-------------------|-----------|
| `--color-ro-green` | `#2D5A3D` | `#0F383C` |
| `--color-ro-green-light` | `#3D7A53` | `#1A4F54` |
| `--color-ro-dark` | `#0F172A` | `#0A0F0F` |
| `--color-ro-darker` | `#0A0F1C` | `#060B0B` |
| `--color-ro-gold` | `#C9985A` | `#C9985A` (KEEP) |
| `--color-ro-gold-light` | `#D9B07A` | `#D9B07A` (KEEP) |
| `--color-ro-text` | `#E5E7EB` | `#E5EBE8` |
| `--color-ro-text-bright` | `#F9FAFB` | `#F5F9F7` |
| `--color-ro-text-dim` | `#9CA3AF` | `#8A9B93` |
| `--color-ro-card` | `#1E293B` | `#132828` |
| `--color-ro-card-border` | `#334155` | `#1F3F3F` |

Also add the secondary color as a new token:
```css
--color-ro-secondary: #A7BCB2;
--color-ro-secondary-light: #BFD0C7;
```

**Acceptance:** All pages render with teal-green tones, not blue-gray. Gold accent unchanged.

### Task 0.2 — Add Graphik Trial Font

1. Check if `/public/fonts/Graphik-Regular.woff2` and `/public/fonts/Graphik-Medium.woff2` exist.
2. If YES: Add `@font-face` declarations in `global.css`, update font-family in @theme, remove Inter link from `Layout.astro`.
3. If NO: Add `@font-face` declarations with fallback to Inter. Add `/* TODO: Add Graphik Trial font files to /public/fonts/ */` comment. Structure so swapping is one-line.

```css
@font-face {
  font-family: 'Graphik';
  src: url('/fonts/Graphik-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Graphik';
  src: url('/fonts/Graphik-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

Update `Layout.astro`: Remove the Google Fonts `<link>` for Inter.

**Acceptance:** No Inter font references in HTML output. Font loads correctly or falls back cleanly.

### Task 0.3 — Remove SavingsCalculator from `/talk`

1. Delete the entire "Section: The Math" block from `talk.astro` (the `<section>` containing `SavingsCalculator`).
2. Delete the `import SavingsCalculator` line.
3. Do NOT delete `SavingsCalculator.tsx` — just remove it from the page.
4. Page flow becomes: Team → CTA.

**Acceptance:** `/talk` has no calculator. `SavingsCalculator.tsx` exists but is unused.

### PHASE 0 GATE

Run `npm run build`. Zero errors. Navigate all pages — brand colors correct, no calculator on `/talk`, no Inter font references.

---

## PHASE 1: DATA PIPELINE (Google Sheets + Apps Script + Email)

**Goal:** Build the complete data capture pipeline from funnel → Sheet → email notification.

### Task 1.1 — Design and Create Google Sheet Schema

**Sheet:** `Route-One-Funnel` (ID: `1Ox5PtQ5oIAxxbojT2M-_TEb3P4RfdOgBAcaT8LozISI`)

The Sheet is currently BLANK. Create a tab called `Leads` with these column headers in Row 1:

| Col | Header | Source | Type |
|-----|--------|--------|------|
| A | `timestamp` | Server-generated in Apps Script | ISO datetime |
| B | `submissionType` | Funnel payload | quiz_complete / exit_pdf / partner_inquiry |
| C | `firstName` | Quiz email gate | string |
| D | `email` | Quiz email gate | string |
| E | `company` | Quiz email gate | string |
| F | `industry` | Quiz Q1 | entertainment / professional / ecommerce / multi / other |
| G | `entityCount` | Quiz Q2 | 1 / 2-3 / 4-6 / 7+ |
| H | `booksStatus` | Quiz Q3 | current / quarter / 6months / never / unsure |
| I | `frustration` | Quiz Q4 | reports / cost / trust / systems / myself / start |
| J | `opportunity` | Quiz Q5 | yes / maybe / worried / no |
| K | `personalTime` | Quiz Q6 | none / few / half-day / second-job |
| L | `tier` | Routing engine | a / b / c |
| M | `painLevel` | Routing engine | high / medium / low |
| N | `urgency` | Routing engine | high / medium / low |
| O | `maturityScore` | Routing engine | 0–100 |
| P | `caseStudyRoute` | Routing engine | vfx / cpa / apparel / production |
| Q | `industryLabel` | Routing engine | Human-readable label |
| R | `bridgeResponses` | SectionBridge interactions | JSON string |
| S | `utmSource` | URL params | string |
| T | `utmMedium` | URL params | string |
| U | `utmCampaign` | URL params | string |
| V | `utmContent` | URL params | string |
| W | `gclid` | URL params | string |
| X | `fbclid` | URL params | string |
| Y | `userAgent` | Browser | string |
| Z | `referrer` | document.referrer | string |

**Implementation:** The Apps Script `doPost()` handler will write to this sheet. The funnel's `sheets.ts` module POSTs JSON matching these columns.

### Task 1.2 — Write Apps Script Webhook + Email Notification

**Script:** `Route-one-Funnel` (ID: `1or4fcJce5H-aAA191zNSLuvArhKBkvpMtoOyaoyot8lv7bkwoqN6_onH`)

The script is currently BLANK. Write the full Apps Script code:

```javascript
// === Route One Funnel — Apps Script Webhook ===
// Deployed as Web App: Execute as Me, Access: Anyone

const SHEET_NAME = 'Leads';
const NOTIFICATION_EMAIL = 'dean@routeoneadvisory.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ error: 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Append row matching schema
    sheet.appendRow([
      new Date().toISOString(),                    // A: timestamp
      data.submissionType || 'quiz_complete',       // B: submissionType
      data.firstName || '',                         // C: firstName
      data.email || '',                             // D: email
      data.company || '',                           // E: company
      data.industry || '',                          // F: industry
      data.entityCount || '',                       // G: entityCount
      data.booksStatus || '',                       // H: booksStatus
      data.frustration || '',                       // I: frustration
      data.opportunity || '',                       // J: opportunity
      data.personalTime || '',                      // K: personalTime
      data.tier || '',                              // L: tier
      data.painLevel || '',                         // M: painLevel
      data.urgency || '',                           // N: urgency
      data.maturityScore || '',                     // O: maturityScore
      data.caseStudyRoute || '',                    // P: caseStudyRoute
      data.industryLabel || '',                     // Q: industryLabel
      JSON.stringify(data.bridgeResponses || {}),   // R: bridgeResponses
      data.utmSource || '',                         // S: utmSource
      data.utmMedium || '',                         // T: utmMedium
      data.utmCampaign || '',                       // U: utmCampaign
      data.utmContent || '',                        // V: utmContent
      data.gclid || '',                             // W: gclid
      data.fbclid || '',                            // X: fbclid
      data.userAgent || '',                         // Y: userAgent
      data.referrer || '',                          // Z: referrer
    ]);

    // Send email notification for quiz completions
    if (data.submissionType === 'quiz_complete' && data.email) {
      sendNotification(data);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotification(data) {
  const score = data.maturityScore || 'N/A';
  const pain = data.painLevel || 'unknown';
  const urgency = data.urgency || 'unknown';

  const subject = `New Route One Lead: ${data.firstName} @ ${data.company} (Score: ${score})`;

  const body = [
    `New lead from the Route One diagnostic funnel:`,
    ``,
    `Name: ${data.firstName}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Industry: ${data.industryLabel || data.industry}`,
    ``,
    `--- Diagnostic Results ---`,
    `Maturity Score: ${score}/100`,
    `Pain Level: ${pain}`,
    `Urgency: ${urgency}`,
    `Tier: ${data.tier}`,
    ``,
    `--- Quiz Answers ---`,
    `Entities: ${data.entityCount}`,
    `Books Status: ${data.booksStatus}`,
    `Biggest Frustration: ${data.frustration}`,
    `Lost Money to This: ${data.opportunity}`,
    `Personal Time on Finance: ${data.personalTime}`,
    ``,
    `--- Attribution ---`,
    `Source: ${data.utmSource || 'direct'}`,
    `Medium: ${data.utmMedium || 'none'}`,
    `Campaign: ${data.utmCampaign || 'none'}`,
    ``,
    `View all leads: https://docs.google.com/spreadsheets/d/1Ox5PtQ5oIAxxbojT2M-_TEb3P4RfdOgBAcaT8LozISI`,
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: body,
  });
}

// Test function — run manually to verify setup
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        submissionType: 'quiz_complete',
        firstName: 'Test',
        email: 'test@example.com',
        company: 'Test Co',
        industry: 'entertainment',
        entityCount: '4-6',
        booksStatus: '6months',
        frustration: 'trust',
        opportunity: 'yes',
        personalTime: 'half-day',
        tier: 'a',
        painLevel: 'high',
        urgency: 'high',
        maturityScore: 28,
        caseStudyRoute: 'vfx',
        industryLabel: 'Entertainment & Media',
        bridgeResponses: { results: 'Too familiar', solution: 'Exactly this' },
        utmSource: 'whatsapp',
        utmMedium: 'social',
        utmCampaign: 'launch-v2',
      })
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
```

**Deployment instructions** (for the dev agent or Chrix to follow):
1. Open the Apps Script editor (Script ID above)
2. Paste the code
3. Deploy → New deployment → Web App
4. Execute as: Me
5. Who has access: Anyone
6. Copy the deployment URL — this is the `SHEETS_WEBHOOK_URL`
7. Run `testDoPost()` to verify it writes a row and sends an email

### Task 1.3 — Create `src/lib/sheets.ts`

```typescript
// Webhook URL from Apps Script deployment
// After deploying the Apps Script, paste the URL here
const SHEETS_WEBHOOK_URL = import.meta.env.PUBLIC_SHEETS_WEBHOOK_URL || '';

export const NOTIFICATION_EMAIL = 'dean@routeoneadvisory.com';

export interface SheetSubmission {
  submissionType: 'quiz_complete' | 'exit_pdf' | 'partner_inquiry';
  firstName: string;
  email: string;
  company: string;
  industry: string;
  entityCount: string;
  booksStatus: string;
  frustration: string;
  opportunity: string;
  personalTime: string;
  tier: string;
  painLevel: string;
  urgency: string;
  maturityScore: number;
  caseStudyRoute: string;
  industryLabel: string;
  bridgeResponses?: Record<string, string>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  userAgent?: string;
  referrer?: string;
}

export async function submitToSheets(data: SheetSubmission): Promise<boolean> {
  if (!SHEETS_WEBHOOK_URL) {
    if (import.meta.env.DEV) {
      console.log('[Route One] Sheets webhook not configured. Payload:', data);
    }
    return false;
  }

  try {
    await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
      }),
    });
    return true;
  } catch (error) {
    console.error('[Route One] Sheet submission failed:', error);
    return false;
  }
}
```

**Acceptance:** File exists, types are clean, exports `submitToSheets` and `SheetSubmission`.

### Task 1.4 — Create `src/lib/analytics.ts`

```typescript
type FunnelEvent =
  | 'page_view'
  | 'quiz_start' | 'quiz_answer' | 'quiz_email_view' | 'quiz_complete' | 'quiz_abandon' | 'quiz_back'
  | 'results_view' | 'results_transition_view' | 'results_calculator_interact'
  | 'solution_view' | 'solution_misdiagnosis_view' | 'solution_case_study_view'
  | 'talk_view'
  | 'cta_click_primary' | 'cta_click_booking' | 'cta_click_whatsapp'
  | 'bridge_response'
  | 'exit_pdf_request'
  | 'partner_path_enter'
  | 'return_visitor_detected';

export function trackEvent(event: FunnelEvent, params?: Record<string, string | number | boolean>): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, { event_category: 'funnel', ...params });
  }
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${event}`, params);
  }
}
```

### Task 1.5 — Create `src/lib/utm.ts`

```typescript
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const CLICK_ID_KEYS = ['gclid', 'fbclid', 'msclkid', 'ttclid'] as const;

export function captureUtmParams(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);

  const utm: Record<string, string> = {};
  UTM_KEYS.forEach(k => { const v = params.get(k); if (v) utm[k] = v; });
  if (Object.keys(utm).length) sessionStorage.setItem('ro_utm', JSON.stringify(utm));

  const clicks: Record<string, string> = {};
  CLICK_ID_KEYS.forEach(k => { const v = params.get(k); if (v) clicks[k] = v; });
  if (Object.keys(clicks).length) sessionStorage.setItem('ro_clicks', JSON.stringify(clicks));
}

export function getUtm(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem('ro_utm') || '{}'); } catch { return {}; }
}

export function getClickIds(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem('ro_clicks') || '{}'); } catch { return {}; }
}
```

### Task 1.6 — Wire UTM Capture to Layout

Add to `Layout.astro` before `</body>`:
```html
<script>
  import { captureUtmParams } from '../lib/utm';
  captureUtmParams();
</script>
```

### Task 1.7 — Wire Quiz Submission to Sheets

In `Quiz.tsx` `handleSubmit`:
1. Import `submitToSheets` from `../lib/sheets`
2. Import `getUtm`, `getClickIds` from `../lib/utm`
3. Import `trackEvent` from `../lib/analytics`
4. Before the redirect to `/results`, call:
```typescript
const utm = getUtm();
const clicks = getClickIds();
await submitToSheets({
  submissionType: 'quiz_complete',
  firstName: state.contact.firstName,
  email: state.contact.email,
  company: state.contact.company,
  industry: state.answers.industry,
  entityCount: state.answers.entityCount,
  booksStatus: state.answers.booksStatus,
  frustration: state.answers.frustration,
  opportunity: state.answers.opportunity,
  personalTime: state.answers.personalTime,
  tier: profile.tier,
  painLevel: profile.painLevel,
  urgency: profile.urgency,
  maturityScore: profile.maturityScore,
  caseStudyRoute: profile.caseStudyRoute,
  industryLabel: INDUSTRY_LABELS[state.answers.industry] || 'your industry',
  utmSource: utm.utm_source,
  utmMedium: utm.utm_medium,
  utmCampaign: utm.utm_campaign,
  utmContent: utm.utm_content,
  gclid: clicks.gclid,
  fbclid: clicks.fbclid,
});
trackEvent('quiz_complete', { industry: state.answers.industry, score: profile.maturityScore });
```

5. Also add `trackEvent('quiz_start')` when the quiz first renders, `trackEvent('quiz_answer', { question: questionId, answer: value })` on each answer.

### Task 1.8 — Wire Not-Ready Form to Sheets

In `not-ready.astro`, convert the email form to work:
1. Add an inline `<script>` or React island that intercepts form submit
2. POST to Sheets via `submitToSheets({ submissionType: 'exit_pdf', email, firstName: '', company: '', ... })` with whatever fields are captured
3. Show success message: "Check your email — we'll send the checklist shortly."
4. Track `exit_pdf_request` event

### PHASE 1 GATE

- `npm run build` passes
- All 3 new lib files exist with clean TypeScript
- Quiz submission calls `submitToSheets()` before redirect
- UTM params captured on every page load
- Not-ready form submits to Sheets
- (Manual test after deploy: run `testDoPost()` in Apps Script → row appears + email sent)

---

## PHASE 2: EMOTIONAL ARC RESTORATION

**Goal:** Restore the engagement mechanics lost in v1→v2 rewrite.

### Task 2.1 — Build QuizTransition into `DynamicResults.tsx`

Add a `showTransition` state that renders BEFORE the dashboard. This is the "mirror moment."

**Flow:**
1. Page loads → `showTransition = true`
2. User sees personalized narrative paragraph + MaturityGauge with count-up animation
3. User clicks "Show Me What This Means →" → `showTransition = false` → full dashboard renders

**Narrative assembly** (concatenate based on quiz params):

```typescript
const entityNarrative: Record<string, string> = {
  '1': "You're running a single entity",
  '2-3': "You're managing 2–3 entities",
  '4-6': "You're juggling 4–6 entities — that's a lot of moving parts",
  '7+': "You're operating 7+ entities — consolidation alone is a full-time job",
};

const booksNarrative: Record<string, string> = {
  'current': "your books are current — that's better than most",
  'quarter': "your books are a quarter behind — you're making decisions on stale data",
  '6months': "your books haven't been closed in over six months — you've been flying blind",
  'never': "your books have never been fully current — every number you've looked at is a guess",
  'unsure': "you're not sure when your books were last current — and that uncertainty is the problem",
};

const frustrationNarrative: Record<string, string> = {
  'reports': "you can't get clear reports when you need them",
  'cost': "you're spending too much for what you're getting",
  'trust': "you don't fully trust your numbers — and that changes every decision you make",
  'systems': "your systems don't talk to each other",
  'myself': "you're doing too much of the financial work yourself",
  'start': "you don't even know where to start fixing this",
};

const opportunityNarrative: Record<string, string> = {
  'yes': "You've already lost money to this — a denied loan, a missed deal, an investor who walked.",
  'maybe': "You suspect this has cost you, even if you can't point to the exact moment.",
  'worried': "You haven't lost an opportunity yet, but you feel it coming.",
};
// 'no' → omit
```

**Assembled example:** "You're juggling 4–6 entities, your books haven't been closed in over six months, and you don't fully trust your numbers. You've already lost money to this — a denied loan, a missed deal, an investor who walked."

**Acceptance:** Results page shows transition before dashboard. Narrative is personalized. Button reveals full dashboard.

### Task 2.2 — Create `src/components/SectionBridge.tsx`

Reusable micro-commitment prompt component.

```typescript
interface SectionBridgeProps {
  prompt: string;
  options: { label: string; value: string }[];
  followUp?: Record<string, string>;
  storageKey: string;  // key within ro_bridge_responses localStorage
  onSelect?: (value: string) => void;
}
```

**Behavior:**
- Renders prompt + pill-shaped option buttons
- On selection: highlight chosen option (primary border), fade in follow-up message
- Store response in localStorage `ro_bridge_responses` (JSON object keyed by storageKey)
- Compact design — natural pause, not a new section

### Task 2.3 — Place Bridges in Funnel

**Bridge 1 — `/results` (in DynamicResults, after Pain Amplification, before Inaction Calculator):**
- storageKey: `results`
- Prompt: "Does this feel familiar?"
- Options: "Too familiar" / "Getting there" / "Not really"
- Follow-ups: "Too familiar" → "That recognition is worth something. Keep going." | "Getting there" → "The earlier you see it, the less it costs." | "Not really" → "Good — but the calculator below might change your mind."

**Bridge 2 — `/solution` (in DynamicSolution, after Case Study, before Timeline):**
- storageKey: `solution`
- Prompt: "Is this the kind of outcome you're looking for?"
- Options: "Exactly this" / "Something similar" / "Need to think about it"
- Follow-ups: "Exactly this" → "Then let's talk about how fast we can get you there." | "Something similar" → "Every engagement is custom. We'll show you what yours looks like." | "Need to think about it" → "Take your time. The math doesn't change."

**Bridge 3 — `/talk` (after Team section, before CTA):**
- storageKey: `talk`
- Prompt: "What would you do with that time back?"
- Options: "Focus on deals" / "Actually take a vacation" / "Grow the business"
- Follow-ups: "Focus on deals" → "That's where you should be." | "Actually take a vacation" → "You've earned it." | "Grow the business" → "Hard to do when you're closing the books."

### Task 2.4 — Enhance Page Transition Copy

**`/results` → `/solution` CTA (in DynamicResults):**
Replace current "See How We Solve This →" with:
```
Now you've seen the problem.
Here's what other {industryLabel} companies did about it.
[See How Companies Like Yours Solved This →]
```

**`/solution` → `/talk` CTA (in DynamicSolution):**
Replace current "Meet the Team →" with:
```
The model works. The proof is above.
The only question is who's behind it.
[Meet the Team Behind It →]
```

### PHASE 2 GATE

- QuizTransition renders on results page with personalized narrative
- All 3 bridges render, accept input, store to localStorage, show follow-up
- Transition copy updated between pages
- `npm run build` passes

---

## PHASE 3: COPY & MESSAGING (NEPQ)

**Goal:** Shift copy from telling to asking. NEPQ Mode 3: Dialogue, not assertions.

### Task 3.1 — Hero Page (`index.astro`)

| Element | Current | Replace With |
|---------|---------|-------------|
| Subhead | "We built a 90-second diagnostic that shows you exactly where the money is hiding." | "Take the 90-second diagnostic. See what your current setup isn't showing you." |
| Trust signal | "No pitch. Just a diagnostic." | "No pitch. No email list. Just clarity." |

### Task 3.2 — Results Page Pain Copy (`DynamicResults.tsx`)

After each pain detail paragraph, add a softener:
```html
<p class="text-ro-text-dim text-sm italic mt-4">
  This isn't a sales pitch. It's a pattern we see in 80% of the companies we work with.
</p>
```

### Task 3.3 — Solution Page Model Copy (`DynamicSolution.tsx`)

| Element | Current | Replace With |
|---------|---------|-------------|
| Model headline | "We don't rent you employees. We run your finance department." | "What if you could replace your entire accounting headcount with a managed department — for less?" |
| Model subtext | "One team. Full coverage. Guaranteed results." | "That's not a pitch. It's the math. Here's how it works." |

### Task 3.4 — Talk Page CTA Copy (`talk.astro`)

| Element | Current | Replace With |
|---------|---------|-------------|
| CTA headline | "Let's see what's hiding in your numbers." | "You've seen the diagnostic. You've seen the proof. There's one step left." |
| CTA subtext | "15 minutes. No pitch. Just a diagnostic." | "15 minutes with the team above. We'll show you what Route One looks like for your business." |

### PHASE 3 GATE

- All copy changes applied. No remnants of old copy.
- `npm run build` passes.

---

## PHASE 4: CONVERSION MECHANICS

### Task 4.1 — Calendar Integration (`talk.astro`)

Replace the "Calendar integration coming soon" placeholder with a configurable embed:

```html
<div id="calendar-embed" class="bg-ro-darker rounded-lg overflow-hidden" style="min-height: 500px;">
  <div data-calendar-url="" id="calendar-container">
    <!-- Script checks data-calendar-url. If set, creates iframe. If empty, shows mailto fallback. -->
  </div>
</div>
```

Add inline script:
```javascript
const container = document.getElementById('calendar-container');
const url = container?.getAttribute('data-calendar-url');
if (url) {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.cssText = 'width:100%;height:500px;border:none;';
  iframe.loading = 'lazy';
  container.replaceWith(iframe);
}
// Otherwise: mailto fallback already in HTML
```

### Task 4.2 — WhatsApp CTA on `/talk`

Below the calendar section, add:
```html
<div class="text-center mt-6">
  <p class="text-ro-text-dim text-sm mb-2">Prefer a quick message?</p>
  <a id="whatsapp-cta" href="#" target="_blank"
     class="text-ro-green hover:text-ro-green-light transition-colors text-sm font-medium">
    Message us on WhatsApp →
  </a>
</div>
```

Script to pre-populate from localStorage:
```javascript
const wa = document.getElementById('whatsapp-cta');
if (wa) {
  try {
    const stored = JSON.parse(localStorage.getItem('ro_quiz_v2') || '{}');
    const score = stored?.state?.answers ? '(Diagnostic completed)' : '';
    const msg = encodeURIComponent(`I just went through the Route One diagnostic. ${score} I'd like to talk.`);
    wa.href = `https://wa.me/?text=${msg}`;
    // TODO: Add Route One WhatsApp number when A.J. provides it
  } catch {}
}
```

### Task 4.3 — Include Bridge Responses in Sheets Submission

Update `Quiz.tsx` (or wherever final form submission happens) to read `ro_bridge_responses` from localStorage and include in the Sheets payload as `bridgeResponses`.

### PHASE 4 GATE

- Calendar embed container works (iframe if URL set, mailto fallback if not)
- WhatsApp CTA renders with pre-populated message
- Bridge responses included in Sheets payload
- `npm run build` passes

---

## PHASE 5: PROGRESSIVE REVEAL & ANIMATION

### Task 5.1 — Results Page Progressive Reveal

In `DynamicResults.tsx`, implement scroll-triggered reveal:
1. **Immediate:** QuizTransition (mirror narrative + gauge)
2. **On "Show Me" click:** Pain amplification fades in
3. **After scrolling past pain:** Bridge appears
4. **After bridge or 2s delay:** Inaction Calculator slides up
5. **After calculator:** Pattern quote + CTA to solution

Use IntersectionObserver. Use existing `fade-up` class from `global.css`.

### Task 5.2 — Solution Page Stagger Enhancement

In `DynamicSolution.tsx`:
- Show "What changed:" label before metrics
- After all metrics stagger in → fade in quote
- After quote → fade in outcome

### Task 5.3 — WhatsApp WebView Safety

**Rules (non-negotiable):**
- All content visible without JavaScript (progressive enhancement)
- `fade-up` class is visible by default in `global.css` — animated only with `prefers-reduced-motion: no-preference`
- React progressive reveals: default `opacity-100`, only start at `opacity-0` if IntersectionObserver exists
- Never `position: fixed` for critical content
- Test: disable JS → all content readable

### PHASE 5 GATE

- Results page has staged reveal (not everything at once)
- Solution metrics stagger with quote follow
- All content visible with JS disabled
- `npm run build` passes

---

## PHASE 6: RETURN VISITOR + POLISH

### Task 6.1 — Return Visitor Detection

When `ro_quiz_v2` exists in localStorage:
- **`/` (hero):** Show "Welcome back, {firstName}" + "See Your Results →" button
- **`/quiz`:** Show "You've already completed this. See your results?" with retake option
- **`/results`, `/solution`, `/talk`:** Hydrate from localStorage if URL params missing

### Task 6.2 — Session Expiry

Add 30-day expiry check. If `savedAt` > 30 days old, clear localStorage and treat as new visitor.

### Task 6.3 — Mobile Optimization

Verify at 375px width:
- Quiz buttons: full-width, min 48px tap targets
- MaturityGauge SVG scales correctly
- Calculator sliders: thumb >= 44px
- No horizontal scroll anywhere

### Task 6.4 — Accessibility

- `focus-visible` rings on all interactive elements
- Form inputs have `aria-label` or associated `<label>`
- Verify gold (`#C9985A`) on dark (`#0A0F0F`) passes WCAG AA contrast
- Quiz progress dots: `aria-label="Question X of 6"`

### Task 6.5 — SEO & Meta

Update `Layout.astro` to accept per-page `title` and `description` props. Each page passes unique meta. Add canonical URLs. Ensure `/public/og-image.jpg` exists (or create a placeholder).

### Task 6.6 — Performance

- Use `client:visible` where possible (not `client:load`)
- Exceptions: `Quiz.tsx` and `DynamicResults.tsx` need `client:load` (above fold)
- `DynamicSolution.tsx` can use `client:visible`

### PHASE 6 GATE (FINAL)

- Return visitor flow works end-to-end
- 375px mobile: no overflow, all tappable, readable
- Accessibility verified
- Per-page meta titles
- `npm run build` passes with zero warnings
- Full flow test: `/` → `/quiz` → `/results` → `/solution` → `/talk` with data persisting

---

## HARD RULES — NEVER VIOLATE

| Rule | Reason |
|------|--------|
| Never `position: fixed` for content | WhatsApp WebView clips fixed elements |
| Never `autoFocus` on inputs | Pulls mobile viewport to the field |
| Never assume JS is available | All content must be visible without it |
| Never use "no pressure" copy | Client explicitly rejected this |
| Never write "Raised the Vibe" | Agency name is **Raize the Vibe** |
| Never `overflow: hidden` on body | Was the #1 cross-browser bug in v1 |
| Never commit `.env` or webhook URLs | Use `import.meta.env.PUBLIC_*` |
| Never add pricing/costing | Client directive: "it's pretty bespoke" |

---

## CONTEXT

Route One closes 70–80% of prospects who understand the model. The problem is getting them to understand it. Decks don't get read. This funnel — distributed via WhatsApp — creates the "aha" moment in under 5 minutes. The maturity score, industry case studies, and inaction calculator aren't gimmicks. They're the same diagnostic Route One runs in real discovery calls. The funnel IS the first meeting, compressed into self-serve.

Every line of copy should make the visitor think: "This company sees my exact problem."

That's the bar. Ship it.
