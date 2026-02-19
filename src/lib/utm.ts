/**
 * Route One Funnel — UTM & Click ID Capture
 * 
 * Captures UTM parameters and click IDs from URL on page load.
 * Stores in sessionStorage for inclusion in lead submissions.
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const CLICK_ID_KEYS = ['gclid', 'fbclid', 'msclkid', 'ttclid'] as const;

const UTM_STORAGE_KEY = 'ro_utm';
const CLICKS_STORAGE_KEY = 'ro_clicks';

/**
 * Capture UTM parameters and click IDs from the current URL.
 * Should be called once on page load (in Layout.astro).
 * 
 * Only stores if parameters are present — doesn't overwrite existing.
 */
export function captureUtmParams(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);

  // Capture UTM parameters
  const utm: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });

  // Only store if we found UTM params (don't overwrite with empty)
  if (Object.keys(utm).length > 0) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
    } catch {
      // sessionStorage may be unavailable
    }
  }

  // Capture click IDs (gclid, fbclid, etc.)
  const clicks: Record<string, string> = {};
  CLICK_ID_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) clicks[key] = value;
  });

  // Only store if we found click IDs
  if (Object.keys(clicks).length > 0) {
    try {
      sessionStorage.setItem(CLICKS_STORAGE_KEY, JSON.stringify(clicks));
    } catch {
      // sessionStorage may be unavailable
    }
  }
}

/**
 * Get captured UTM parameters.
 * Returns empty object if none captured or storage unavailable.
 */
export function getUtm(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Get captured click IDs (gclid, fbclid, etc.).
 * Returns empty object if none captured or storage unavailable.
 */
export function getClickIds(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const stored = sessionStorage.getItem(CLICKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Get all attribution data (UTM + click IDs) formatted for sheet submission.
 */
export function getAttribution(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
} {
  const utm = getUtm();
  const clicks = getClickIds();

  return {
    utmSource: utm.utm_source,
    utmMedium: utm.utm_medium,
    utmCampaign: utm.utm_campaign,
    utmContent: utm.utm_content,
    gclid: clicks.gclid,
    fbclid: clicks.fbclid,
  };
}
