# Route One Funnel — Google Sheet Schema

**Sheet ID:** `1Ox5PtQ5oIAxxbojT2M-_TEb3P4RfdOgBAcaT8LozISI`
**Tab Name:** `Leads`

## Column Definitions

| Col | Header | Source | Type | Notes |
|-----|--------|--------|------|-------|
| A | `timestamp` | Server-generated in Apps Script | ISO datetime | Auto-generated on insert |
| B | `submissionType` | Funnel payload | string | `quiz_complete` / `exit_pdf` / `partner_inquiry` |
| C | `firstName` | Quiz email gate | string | Required for quiz_complete |
| D | `email` | Quiz email gate | string | Required for quiz_complete |
| E | `company` | Quiz email gate | string | Required for quiz_complete |
| F | `industry` | Quiz Q1 | string | `entertainment` / `professional` / `ecommerce` / `multi` / `other` |
| G | `entityCount` | Quiz Q2 | string | `1` / `2-3` / `4-6` / `7+` |
| H | `booksStatus` | Quiz Q3 | string | `current` / `quarter` / `6months` / `never` / `unsure` |
| I | `frustration` | Quiz Q4 | string | `reports` / `cost` / `trust` / `systems` / `myself` / `start` |
| J | `opportunity` | Quiz Q5 | string | `yes` / `maybe` / `worried` / `no` |
| K | `personalTime` | Quiz Q6 | string | `none` / `few` / `half-day` / `second-job` |
| L | `tier` | Routing engine | string | `a` / `b` / `c` |
| M | `painLevel` | Routing engine | string | `high` / `medium` / `low` |
| N | `urgency` | Routing engine | string | `high` / `medium` / `low` |
| O | `maturityScore` | Routing engine | number | 0–100 |
| P | `caseStudyRoute` | Routing engine | string | `vfx` / `cpa` / `apparel` / `production` |
| Q | `industryLabel` | Routing engine | string | Human-readable label |
| R | `bridgeResponses` | SectionBridge interactions | JSON string | Stored bridge responses |
| S | `utmSource` | URL params | string | utm_source |
| T | `utmMedium` | URL params | string | utm_medium |
| U | `utmCampaign` | URL params | string | utm_campaign |
| V | `utmContent` | URL params | string | utm_content |
| W | `gclid` | URL params | string | Google Click ID |
| X | `fbclid` | URL params | string | Facebook Click ID |
| Y | `userAgent` | Browser | string | navigator.userAgent |
| Z | `referrer` | document.referrer | string | Page referrer |

## Setup Instructions

1. Open the Google Sheet: https://docs.google.com/spreadsheets/d/1Ox5PtQ5oIAxxbojT2M-_TEb3P4RfdOgBAcaT8LozISI
2. Create a tab named `Leads` (if not already present)
3. Add the headers from Column A-Z in Row 1 (exactly as listed above)
4. Freeze Row 1 for easier viewing

## Notes

- The Apps Script webhook automatically adds the timestamp
- `bridgeResponses` is stored as a JSON string for flexibility
- All fields except timestamp are populated from the funnel POST payload
