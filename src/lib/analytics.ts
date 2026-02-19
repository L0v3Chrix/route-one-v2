/**
 * Route One Funnel — Analytics Tracking
 * 
 * Lightweight wrapper around gtag for funnel-specific events.
 * Logs to console in dev mode regardless of gtag availability.
 */

type FunnelEvent =
  | 'page_view'
  | 'quiz_start'
  | 'quiz_answer'
  | 'quiz_email_view'
  | 'quiz_complete'
  | 'quiz_abandon'
  | 'quiz_back'
  | 'results_view'
  | 'results_transition_view'
  | 'results_calculator_interact'
  | 'solution_view'
  | 'solution_misdiagnosis_view'
  | 'solution_case_study_view'
  | 'talk_view'
  | 'cta_click_primary'
  | 'cta_click_booking'
  | 'cta_click_whatsapp'
  | 'bridge_response'
  | 'exit_pdf_request'
  | 'partner_path_enter'
  | 'return_visitor_detected';

/**
 * Track a funnel event.
 * Sends to Google Analytics if gtag is available.
 * Always logs to console in dev mode.
 * 
 * @param event - The event name
 * @param params - Optional event parameters
 */
export function trackEvent(
  event: FunnelEvent,
  params?: Record<string, string | number | boolean>
): void {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', event, {
      event_category: 'funnel',
      ...params,
    });
  }

  // Log in dev mode for debugging
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${event}`, params || '');
  }
}

/**
 * Track a page view with optional additional parameters.
 */
export function trackPageView(pageName: string, params?: Record<string, string | number>): void {
  trackEvent('page_view', { page_name: pageName, ...params });
}

/**
 * Track quiz-specific events with consistent structure.
 */
export function trackQuizEvent(
  action: 'quiz_start' | 'quiz_answer' | 'quiz_email_view' | 'quiz_complete' | 'quiz_abandon' | 'quiz_back',
  params?: { question?: string; answer?: string; industry?: string; score?: number }
): void {
  trackEvent(action, params);
}

/**
 * Track CTA clicks with destination info.
 */
export function trackCtaClick(
  ctaType: 'cta_click_primary' | 'cta_click_booking' | 'cta_click_whatsapp',
  destination?: string
): void {
  trackEvent(ctaType, destination ? { destination } : undefined);
}
