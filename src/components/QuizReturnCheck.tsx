import { useState, useEffect } from 'react';
import { getStoredSession, hasCompletedQuiz, clearSession, isSessionExpired } from '../lib/session';
import { trackEvent } from '../lib/analytics';
import Quiz from './Quiz';

export default function QuizReturnCheck() {
  const [isReturning, setIsReturning] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const session = getStoredSession();
    
    // Check for expired session
    if (session?.savedAt && isSessionExpired(session.savedAt)) {
      clearSession();
      setShowQuiz(true);
      return;
    }
    
    if (hasCompletedQuiz()) {
      const name = session?.state?.contact?.firstName;
      if (name) {
        setFirstName(name);
        setIsReturning(true);
        trackEvent('return_visitor_detected');
      } else {
        setShowQuiz(true);
      }
    } else {
      setShowQuiz(true);
    }
  }, []);

  const handleRetake = () => {
    clearSession();
    setIsReturning(false);
    setShowQuiz(true);
  };

  // SSR: show loading state
  if (!isClient) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-ro-text-dim">Loading...</div>
      </div>
    );
  }

  // Show quiz for new visitors or retakes
  if (showQuiz && !isReturning) {
    return <Quiz />;
  }

  // Return visitor: show message
  if (isReturning) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-xl mx-auto text-center">
          {/* Progress dots (showing completed) */}
          <div className="flex items-center justify-center gap-2 mb-8" role="progressbar" aria-valuenow={7} aria-valuemin={1} aria-valuemax={7}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                role="presentation"
                aria-label={`Question ${i + 1} of 6 completed`}
                className="w-2.5 h-2.5 rounded-full bg-ro-green"
              />
            ))}
            <div className="w-px h-4 bg-ro-card-border mx-1" aria-hidden="true" />
            <div
              role="presentation"
              aria-label="Contact information completed"
              className="w-2.5 h-2.5 rounded-full bg-ro-green"
            />
          </div>

          <div className="bg-ro-card border border-ro-card-border rounded-xl p-8 mb-8">
            <div className="w-16 h-16 bg-ro-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-ro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-ro-text-bright mb-3">
              You've already completed this, {firstName}.
            </h2>
            
            <p className="text-ro-text-dim mb-8">
              Your diagnostic results are ready. Want to see what they reveal about your business?
            </p>
            
            {/* CTA: See Results */}
            <a 
              href="/results"
              className="inline-flex items-center justify-center bg-ro-green hover:bg-ro-green-light text-white text-lg font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ro-dark w-full min-h-[48px]"
            >
              See Your Results
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
          
          {/* Retake option */}
          <button
            onClick={handleRetake}
            className="text-ro-text-dim hover:text-ro-gold transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold underline underline-offset-2"
          >
            Retake the diagnostic with different answers →
          </button>
        </div>
      </div>
    );
  }

  // Fallback loading
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="text-ro-text-dim">Loading...</div>
    </div>
  );
}
