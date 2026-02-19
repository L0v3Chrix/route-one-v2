/**
 * Route One Funnel — Google Sheets Integration
 * 
 * Submits lead data to Google Sheets via Apps Script webhook.
 * The webhook URL is set via environment variable after deployment.
 */

// Webhook URL from Apps Script deployment
// After deploying the Apps Script, set this in .env:
// PUBLIC_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
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

/**
 * Submit lead data to Google Sheets via Apps Script webhook.
 * Uses no-cors mode since Apps Script doesn't support CORS headers.
 * 
 * @param data - The lead data to submit
 * @returns true if submission attempted, false if webhook not configured
 */
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
      mode: 'no-cors', // Apps Script doesn't support CORS
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

/**
 * Minimal submission for exit/lead magnet forms.
 * Only requires email.
 */
export async function submitExitForm(email: string, firstName = ''): Promise<boolean> {
  return submitToSheets({
    submissionType: 'exit_pdf',
    firstName,
    email,
    company: '',
    industry: '',
    entityCount: '',
    booksStatus: '',
    frustration: '',
    opportunity: '',
    personalTime: '',
    tier: '',
    painLevel: '',
    urgency: '',
    maturityScore: 0,
    caseStudyRoute: '',
    industryLabel: '',
  });
}
