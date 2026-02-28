import { useState, useCallback, useEffect } from 'react';
import { QUIZ_QUESTIONS, createInitialState, type QuizState, INDUSTRY_LABELS } from '../lib/quizData';
import { buildRoutingProfile, buildQueryString } from '../lib/quizRouting';
import { submitToSheets } from '../lib/sheets';
import { getUtm, getClickIds } from '../lib/utm';
import { trackEvent } from '../lib/analytics';
import { clearSession } from '../lib/session';

const STORAGE_KEY = 'ro_quiz_v2';

// Email validation regex - stricter than RFC, requires:
// - Valid local part (before @)
// - Domain with at least one dot
// - TLD of 2+ characters (no single-letter TLDs)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

// Disposable/temporary email domains to block
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', 'tempmail.net', 'guerrillamail.com', 'guerrillamail.org',
  '10minutemail.com', 'throwaway.email', 'fakeinbox.com', 'trashmail.com', 'trashmail.net',
  'mailnesia.com', 'mailcatch.com', 'yopmail.com', 'yopmail.fr', 'sharklasers.com',
  'dispostable.com', 'mintemail.com', 'temp-mail.org', 'temp-mail.io', 'tempinbox.com',
  'mohmal.com', 'getnada.com', 'emailondeck.com', 'fakemailgenerator.com', 'throwawaymail.com',
  'maildrop.cc', 'mailsac.com', 'harakirimail.com', 'discard.email', 'spamgourmet.com',
  'mytemp.email', 'tempr.email', 'dropmail.me', 'inboxkitten.com', 'mailnull.com',
  'spamex.com', 'spam4.me', 'binkmail.com', 'safetymail.info', 'anonymbox.net',
  'jetable.org', 'spamfree24.org', 'spam.la', 'mytrashmail.com', 'mt2009.com',
  'thankyou2010.com', 'trash2009.com', 'mt2014.com', 'tempail.com', 'tempomail.fr',
  'temporarymail.net', 'tempsky.com', 'thrma.com', 'tmpmail.net', 'tmpmail.org'
]);

// Common email typos and their corrections
const EMAIL_TYPO_CORRECTIONS: Record<string, string> = {
  'gmial.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gamil.com': 'gmail.com', 
  'gnail.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmaill.com': 'gmail.com',
  'gmailcom': 'gmail.com', 'gmail.cm': 'gmail.com', 'gmai.com': 'gmail.com',
  'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com', 'yhaoo.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com', 'yahoocom': 'yahoo.com', 'yhoo.com': 'yahoo.com',
  'hotmal.com': 'hotmail.com', 'hotmai.com': 'hotmail.com', 'hotmial.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com', 'hotmailcom': 'hotmail.com', 'hotnail.com': 'hotmail.com',
  'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com', 'outlook.co': 'outlook.com',
  'outlookcom': 'outlook.com', 'outllook.com': 'outlook.com',
  'icloud.co': 'icloud.com', 'icloudcom': 'icloud.com', 'icould.com': 'icloud.com',
  'aol.co': 'aol.com', 'aolcom': 'aol.com',
};

function isValidEmail(email: string): boolean {
  if (!email) return false;
  if (email.length > 254) return false; // Max email length per RFC
  return EMAIL_REGEX.test(email);
}

function isDisposableEmail(email: string): boolean {
  const domain = email.toLowerCase().split('@')[1];
  return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
}

function getEmailTypoSuggestion(email: string): string | null {
  const domain = email.toLowerCase().split('@')[1];
  if (domain && EMAIL_TYPO_CORRECTIONS[domain]) {
    const localPart = email.split('@')[0];
    return `${localPart}@${EMAIL_TYPO_CORRECTIONS[domain]}`;
  }
  return null;
}

// Client-side rate limiting
const RATE_LIMIT_KEY = 'ro_submit_timestamps';
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_SUBMISSIONS = 2; // Max 2 submissions per minute

function isRateLimited(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const now = Date.now();
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const timestamps: number[] = stored ? JSON.parse(stored) : [];
    
    // Filter to only timestamps within the window
    const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    
    return recentTimestamps.length >= RATE_LIMIT_MAX_SUBMISSIONS;
  } catch {
    return false;
  }
}

function recordSubmission(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const now = Date.now();
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const timestamps: number[] = stored ? JSON.parse(stored) : [];
    
    // Keep only recent timestamps + new one
    const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    recentTimestamps.push(now);
    
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentTimestamps));
  } catch {
    // Ignore localStorage errors
  }
}

function saveState(state: QuizState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, savedAt: Date.now() }));
  } catch {
    // localStorage may be unavailable
  }
}

export default function Quiz() {
  const [state, setState] = useState<QuizState>(createInitialState);
  const [showMicroCopy, setShowMicroCopy] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const totalQuestions = QUIZ_QUESTIONS.length;
  const isOnQuestions = state.currentStep < totalQuestions;
  const isOnEmailGate = state.currentStep === totalQuestions;
  
  const currentQuestion = isOnQuestions ? QUIZ_QUESTIONS[state.currentStep] : null;

  // Track quiz start on first render
  useEffect(() => {
    if (!hasTrackedStart) {
      trackEvent('quiz_start');
      setHasTrackedStart(true);
    }
  }, [hasTrackedStart]);

  // Track when email gate is shown
  useEffect(() => {
    if (isOnEmailGate) {
      trackEvent('quiz_email_view');
    }
  }, [isOnEmailGate]);

  // Handle answer selection
  const handleAnswer = useCallback((value: string, tag: string, microCopy?: string) => {
    const questionId = QUIZ_QUESTIONS[state.currentStep]?.id;
    
    // Track the answer
    trackEvent('quiz_answer', { question: questionId, answer: value });

    if (microCopy) {
      setShowMicroCopy(microCopy);
      // Delay before advancing
      setTimeout(() => {
        setShowMicroCopy(null);
        setState(prev => {
          const qId = QUIZ_QUESTIONS[prev.currentStep].id;
          const newState = {
            ...prev,
            currentStep: prev.currentStep + 1,
            answers: { ...prev.answers, [qId]: value },
            tags: [...prev.tags, tag],
          };
          saveState(newState);
          return newState;
        });
      }, 1500);
    } else {
      setState(prev => {
        const qId = QUIZ_QUESTIONS[prev.currentStep].id;
        const newState = {
          ...prev,
          currentStep: prev.currentStep + 1,
          answers: { ...prev.answers, [qId]: value },
          tags: [...prev.tags, tag],
        };
        saveState(newState);
        return newState;
      });
    }
  }, [state.currentStep]);

  // Handle back navigation
  const handleBack = useCallback(() => {
    if (state.currentStep <= 0) return;
    
    trackEvent('quiz_back');
    
    setState(prev => {
      const prevQuestionId = QUIZ_QUESTIONS[prev.currentStep - 1]?.id;
      const prevAnswer = prev.answers[prevQuestionId];
      const prevTag = QUIZ_QUESTIONS[prev.currentStep - 1]?.answers.find(a => a.value === prevAnswer)?.tag;
      
      return {
        ...prev,
        currentStep: prev.currentStep - 1,
        answers: prevQuestionId ? { ...prev.answers, [prevQuestionId]: '' } : prev.answers,
        tags: prevTag ? prev.tags.filter(t => t !== prevTag) : prev.tags,
      };
    });
  }, [state.currentStep]);

  // Validate email with all checks
  const validateEmail = useCallback((email: string): string | null => {
    if (!email) return 'Email is required';
    if (!isValidEmail(email)) return 'Please enter a valid email address';
    if (isDisposableEmail(email)) return 'Please use a permanent email address';
    return null;
  }, []);

  // Handle contact form changes
  const handleContactChange = useCallback((field: keyof QuizState['contact'], value: string) => {
    setState(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
    
    // Validate email on change if already touched
    if (field === 'email' && emailTouched) {
      const error = validateEmail(value);
      setEmailError(error);
      
      // Check for typo suggestion
      if (!error) {
        const suggestion = getEmailTypoSuggestion(value);
        setEmailSuggestion(suggestion);
      } else {
        setEmailSuggestion(null);
      }
    }
  }, [emailTouched, validateEmail]);

  // Handle email blur for validation
  const handleEmailBlur = useCallback(() => {
    setEmailTouched(true);
    const email = state.contact.email;
    const error = validateEmail(email);
    setEmailError(error);
    
    // Check for typo suggestion
    if (!error) {
      const suggestion = getEmailTypoSuggestion(email);
      setEmailSuggestion(suggestion);
    } else {
      setEmailSuggestion(null);
    }
  }, [state.contact.email, validateEmail]);

  // Apply email suggestion
  const applySuggestion = useCallback(() => {
    if (emailSuggestion) {
      setState(prev => ({
        ...prev,
        contact: { ...prev.contact, email: emailSuggestion },
      }));
      setEmailSuggestion(null);
    }
  }, [emailSuggestion]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Honeypot check - if filled, silently reject (bot detected)
    if (honeypot) {
      // Fake success for bots
      await new Promise(r => setTimeout(r, 1500));
      window.location.href = '/results?bot=true';
      return;
    }
    
    // Rate limit check
    if (isRateLimited()) {
      setSubmitError('Please wait a moment before submitting again.');
      return;
    }
    
    // Trim all inputs
    const trimmedFirstName = state.contact.firstName.trim();
    const trimmedEmail = state.contact.email.trim().toLowerCase();
    const trimmedCompany = state.contact.company.trim();
    
    // Validate email before submission
    const emailValidationError = validateEmail(trimmedEmail);
    if (emailValidationError) {
      setEmailTouched(true);
      setEmailError(emailValidationError);
      return;
    }
    
    setIsSubmitting(true);
    
    // Update state with trimmed/normalized values
    const normalizedState = {
      ...state,
      contact: {
        firstName: trimmedFirstName,
        email: trimmedEmail,
        company: trimmedCompany,
      },
    };
    
    const profile = buildRoutingProfile(normalizedState);
    const queryString = buildQueryString(normalizedState, profile);
    
    // Save final state
    saveState(normalizedState);
    
    // Get UTM and click ID attribution
    const utm = getUtm();
    const clicks = getClickIds();
    
    // Get bridge responses from localStorage
    let bridgeResponses: Record<string, string> = {};
    try {
      bridgeResponses = JSON.parse(localStorage.getItem('ro_bridge_responses') || '{}');
    } catch {
      // localStorage may be unavailable or invalid
    }
    
    // Submit to Google Sheets with error handling
    try {
      await submitToSheets({
        submissionType: 'quiz_complete',
        firstName: trimmedFirstName,
        email: trimmedEmail,
        company: trimmedCompany,
        industry: normalizedState.answers.industry,
        entityCount: normalizedState.answers.entityCount,
        booksStatus: normalizedState.answers.booksStatus,
        frustration: normalizedState.answers.frustration,
        opportunity: normalizedState.answers.opportunity,
        personalTime: normalizedState.answers.personalTime,
        tier: profile.tier,
        painLevel: profile.painLevel,
        urgency: profile.urgency,
        maturityScore: profile.maturityScore,
        caseStudyRoute: profile.caseStudyRoute,
        industryLabel: INDUSTRY_LABELS[normalizedState.answers.industry] || 'your industry',
        bridgeResponses,
        utmSource: utm.utm_source,
        utmMedium: utm.utm_medium,
        utmCampaign: utm.utm_campaign,
        utmContent: utm.utm_content,
        gclid: clicks.gclid,
        fbclid: clicks.fbclid,
      });
      
      // Track completion
      trackEvent('quiz_complete', { 
        industry: normalizedState.answers.industry, 
        score: profile.maturityScore 
      });
      
      // Record submission for rate limiting
      recordSubmission();
      
      // Clear session so next visit is fresh (no return visitor detection)
      clearSession();
      
      // Redirect to results
      window.location.href = `/results?${queryString}`;
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError('Something went wrong. Please try again.');
      trackEvent('quiz_submit_error');
    }
  }, [state, honeypot, validateEmail]);

  // Progress dots
  const renderProgress = () => (
    <div className="flex items-center justify-center gap-2 mb-8" role="progressbar" aria-valuenow={state.currentStep + 1} aria-valuemin={1} aria-valuemax={totalQuestions + 1}>
      {Array.from({ length: totalQuestions }).map((_, i) => (
        <div
          key={i}
          role="presentation"
          aria-label={`Question ${i + 1} of ${totalQuestions}${i < state.currentStep ? ' (completed)' : i === state.currentStep ? ' (current)' : ''}`}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            i < state.currentStep
              ? 'bg-ro-green'
              : i === state.currentStep
              ? 'bg-ro-gold'
              : 'bg-ro-card-border'
          }`}
        />
      ))}
      <div className="w-px h-4 bg-ro-card-border mx-1" aria-hidden="true" />
      <div
        role="presentation"
        aria-label={`Contact information${isOnEmailGate ? ' (current)' : ''}`}
        className={`w-2.5 h-2.5 rounded-full ${
          isOnEmailGate ? 'bg-ro-gold' : 'bg-ro-card-border'
        }`}
      />
    </div>
  );

  // Render question
  const renderQuestion = () => {
    if (!currentQuestion) return null;

    return (
      <div className="animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-medium text-ro-text-bright text-center mb-3">
          {currentQuestion.question}
        </h2>
        {currentQuestion.subtext && (
          <p className="text-ro-text-dim text-center mb-8">
            {currentQuestion.subtext}
          </p>
        )}
        
        <div className="space-y-3 max-w-md mx-auto">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.value}
              onClick={() => handleAnswer(answer.value, answer.tag, answer.microCopy)}
              disabled={!!showMicroCopy}
              className="w-full text-left px-5 py-4 min-h-[48px] bg-ro-card border border-ro-card-border rounded-lg hover:border-ro-green hover:bg-ro-card/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ro-dark disabled:opacity-50"
            >
              <span className="text-ro-text-bright">{answer.label}</span>
            </button>
          ))}
        </div>

        {/* Micro-copy feedback */}
        {showMicroCopy && (
          <div className="mt-6 text-center animate-fade-in">
            <p className="text-ro-gold italic">{showMicroCopy}</p>
          </div>
        )}

        {/* Back button */}
        {state.currentStep > 0 && !showMicroCopy && (
          <div className="mt-8 text-center">
            <button
              onClick={handleBack}
              className="text-ro-text-dim hover:text-ro-text transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ro-dark"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    );
  };

  // Render email gate
  const renderEmailGate = () => {
    const industryLabel = INDUSTRY_LABELS[state.answers.industry] || 'your industry';
    
    return (
      <div className="animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-medium text-ro-text-bright text-center mb-3">
          Let's see what this means.
        </h2>
        <p className="text-ro-text-dim text-center mb-8">
          See how companies in <span className="text-ro-gold">{industryLabel}</span> are solving exactly this.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div>
            <label htmlFor="firstName" className="sr-only">First name</label>
            <input
              id="firstName"
              type="text"
              placeholder="First name"
              required
              value={state.contact.firstName}
              onChange={(e) => handleContactChange('firstName', e.target.value)}
              className="w-full px-4 py-3 bg-ro-card border border-ro-card-border rounded-lg text-ro-text-bright placeholder:text-ro-text-dim focus:outline-none focus:ring-2 focus:ring-ro-gold focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Work email</label>
            <input
              id="email"
              type="email"
              placeholder="Work email"
              required
              value={state.contact.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              onBlur={handleEmailBlur}
              aria-invalid={emailError ? 'true' : 'false'}
              aria-describedby={emailError ? 'email-error' : emailSuggestion ? 'email-suggestion' : undefined}
              className={`w-full px-4 py-3 bg-ro-card border rounded-lg text-ro-text-bright placeholder:text-ro-text-dim focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                emailError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-ro-card-border focus:ring-ro-gold'
              }`}
            />
            {emailError && (
              <p id="email-error" className="mt-2 text-sm text-red-400" role="alert">
                {emailError}
              </p>
            )}
            {emailSuggestion && !emailError && (
              <p id="email-suggestion" className="mt-2 text-sm text-ro-gold">
                Did you mean{' '}
                <button
                  type="button"
                  onClick={applySuggestion}
                  className="underline hover:text-ro-text-bright focus:outline-none focus:ring-1 focus:ring-ro-gold"
                >
                  {emailSuggestion}
                </button>
                ?
              </p>
            )}
          </div>
          
          {/* Honeypot field - hidden from humans, catches bots */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="company" className="sr-only">Company name</label>
            <input
              id="company"
              type="text"
              placeholder="Company name"
              required
              value={state.contact.company}
              onChange={(e) => handleContactChange('company', e.target.value)}
              className="w-full px-4 py-3 bg-ro-card border border-ro-card-border rounded-lg text-ro-text-bright placeholder:text-ro-text-dim focus:outline-none focus:ring-2 focus:ring-ro-gold focus:border-transparent"
            />
          </div>
          
          {submitError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg" role="alert">
              <p className="text-sm text-red-400">{submitError}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ro-green hover:bg-ro-green-light text-white font-semibold py-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ro-gold focus:ring-offset-2 focus:ring-offset-ro-dark disabled:opacity-50"
          >
            {isSubmitting ? 'Loading...' : submitError ? 'Try Again →' : 'Show My Results →'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={handleBack}
            className="text-ro-text-dim hover:text-ro-text transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ro-dark"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-8 md:py-12">
      <div className="w-full max-w-xl">
        {renderProgress()}
        {isOnQuestions ? renderQuestion() : renderEmailGate()}
      </div>
    </div>
  );
}
