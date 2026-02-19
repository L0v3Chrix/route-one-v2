// Session management utilities for Route One V2
// Handles return visitor detection, session expiry, and localStorage hydration

const STORAGE_KEY = 'ro_quiz_v2';
const EXPIRY_DAYS = 30;
const EXPIRY_MS = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

export interface StoredSession {
  state: {
    answers: {
      industry: string;
      entityCount: string;
      booksStatus: string;
      frustration: string;
      opportunity: string;
      personalTime: string;
    };
    contact: {
      firstName: string;
      email: string;
      company: string;
    };
    tags: string[];
    currentStep: number;
  };
  savedAt: number;
}

export interface SessionData {
  firstName: string;
  score: number;
  industry: string;
  books: string;
  frustration: string;
  opportunity: string;
  time: string;
  entities: string;
  painLevel: string;
  tier: string;
  industryLabel: string;
  hasCompletedQuiz: boolean;
}

/**
 * Check if stored session is expired (older than 30 days)
 */
export function isSessionExpired(savedAt: number): boolean {
  return Date.now() - savedAt > EXPIRY_MS;
}

/**
 * Get stored session from localStorage, clearing if expired
 */
export function getStoredSession(): StoredSession | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored) as StoredSession;
    
    // Check expiry
    if (data.savedAt && isSessionExpired(data.savedAt)) {
      clearSession();
      return null;
    }
    
    return data;
  } catch {
    return null;
  }
}

/**
 * Check if visitor has completed the quiz
 */
export function hasCompletedQuiz(): boolean {
  const session = getStoredSession();
  if (!session) return false;
  
  // Quiz is complete when all answers are filled AND contact info exists
  const { answers, contact } = session.state || {};
  const hasAllAnswers = answers && 
    answers.industry && 
    answers.entityCount && 
    answers.booksStatus && 
    answers.frustration && 
    answers.opportunity && 
    answers.personalTime;
  
  const hasContact = contact && contact.firstName && contact.email;
  
  return Boolean(hasAllAnswers && hasContact);
}

/**
 * Clear stored session
 */
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('ro_bridge_responses');
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Get first name of returning visitor
 */
export function getReturnVisitorName(): string | null {
  const session = getStoredSession();
  return session?.state?.contact?.firstName || null;
}

/**
 * Build query string from stored session data (for hydration)
 */
export function buildQueryStringFromSession(): string | null {
  const session = getStoredSession();
  if (!session?.state) return null;
  
  const { answers, contact } = session.state;
  if (!answers || !contact) return null;
  
  // Import routing functions dynamically to calculate scores
  // For now, return basic params - full calculation happens in the component
  const params = new URLSearchParams();
  
  params.set('firstName', contact.firstName || '');
  params.set('industry', answers.industry || 'other');
  params.set('books', answers.booksStatus || '');
  params.set('frustration', answers.frustration || '');
  params.set('opportunity', answers.opportunity || '');
  params.set('time', answers.personalTime || '');
  params.set('entities', answers.entityCount || '');
  
  return params.toString();
}

/**
 * Hydrate page data from localStorage if URL params are missing
 * Returns merged params object
 */
export function hydrateFromSession(urlParams: URLSearchParams): Record<string, string> {
  const result: Record<string, string> = {};
  
  // First, grab all URL params
  urlParams.forEach((value, key) => {
    result[key] = value;
  });
  
  // If we have firstName in URL, we have everything needed
  if (result.firstName && result.firstName !== 'there') {
    return result;
  }
  
  // Try to hydrate from localStorage
  const session = getStoredSession();
  if (!session?.state) return result;
  
  const { answers, contact } = session.state;
  
  // Fill in missing values from session
  if (!result.firstName && contact?.firstName) {
    result.firstName = contact.firstName;
  }
  if (!result.industry && answers?.industry) {
    result.industry = answers.industry;
  }
  if (!result.books && answers?.booksStatus) {
    result.books = answers.booksStatus;
  }
  if (!result.frustration && answers?.frustration) {
    result.frustration = answers.frustration;
  }
  if (!result.opportunity && answers?.opportunity) {
    result.opportunity = answers.opportunity;
  }
  if (!result.time && answers?.personalTime) {
    result.time = answers.personalTime;
  }
  if (!result.entities && answers?.entityCount) {
    result.entities = answers.entityCount;
  }
  
  return result;
}
