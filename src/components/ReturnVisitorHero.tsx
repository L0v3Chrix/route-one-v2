import { useState, useEffect } from 'react';
import { getStoredSession, hasCompletedQuiz, clearSession, isSessionExpired } from '../lib/session';
import { trackEvent } from '../lib/analytics';

export default function ReturnVisitorHero() {
  const [isReturning, setIsReturning] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const session = getStoredSession();
    
    // Check for expired session
    if (session?.savedAt && isSessionExpired(session.savedAt)) {
      clearSession();
      return;
    }
    
    if (hasCompletedQuiz()) {
      const name = session?.state?.contact?.firstName;
      if (name) {
        setFirstName(name);
        setIsReturning(true);
        trackEvent('return_visitor_detected');
      }
    }
  }, []);

  // SSR: render new visitor view
  if (!isClient) {
    return <NewVisitorHero />;
  }

  // New visitor: render standard hero
  if (!isReturning) {
    return <NewVisitorHero />;
  }

  // Return visitor view
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo / Brand */}
        <p className="text-ro-gold text-sm font-medium tracking-widest uppercase mb-8 fade-up">
          Route One Advisory
        </p>
        
        {/* Welcome Back */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ro-text-bright leading-tight mb-6 fade-up fade-up-delay-1">
          Welcome back, <span className="text-ro-gold">{firstName}</span>.
        </h1>
        
        {/* Message */}
        <p className="text-lg sm:text-xl text-ro-text-dim max-w-xl mx-auto mb-10 fade-up fade-up-delay-2">
          You've already completed the diagnostic. Ready to see what it means for your business?
        </p>
        
        {/* CTA: See Results */}
        <div className="space-y-4 fade-up fade-up-delay-3">
          <a 
            href="/results"
            className="inline-flex items-center justify-center bg-ro-green hover:bg-ro-green-light text-white text-lg font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ro-dark w-full sm:w-auto min-h-[48px]"
          >
            See Your Results
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
        
        {/* Retake option */}
        <p className="text-ro-text-dim text-sm mt-6 fade-up fade-up-delay-4">
          <button
            onClick={() => {
              clearSession();
              window.location.href = '/quiz';
            }}
            className="hover:text-ro-gold transition-colors underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold"
          >
            Retake the diagnostic →
          </button>
        </p>
      </div>
      
      {/* Partner path (subtle) */}
      <div className="absolute bottom-8 left-0 right-0 text-center fade-up fade-up-delay-4">
        <a 
          href="/partner" 
          className="text-ro-text-dim text-sm hover:text-ro-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold"
        >
          I'm a potential referral partner →
        </a>
      </div>
    </main>
  );
}

// New Visitor Hero (standard landing page)
function NewVisitorHero() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo / Brand */}
        <p className="text-ro-gold text-sm font-medium tracking-widest uppercase mb-8 fade-up">
          Route One Advisory
        </p>
        
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ro-text-bright leading-tight mb-6 fade-up fade-up-delay-1">
          Most companies don't have a profit problem.<br />
          <span className="text-ro-gold">They have a visibility problem.</span>
        </h1>
        
        {/* Subhead with NEPQ pull-back */}
        <p className="text-lg sm:text-xl text-ro-text-dim max-w-xl mx-auto mb-6 fade-up fade-up-delay-2">
          We built a 90-second diagnostic that shows you where money is entering, exiting, and getting lost in your business.
        </p>
        <p className="text-base text-ro-text-dim/80 max-w-lg mx-auto mb-10 fade-up fade-up-delay-2">
          It's not for everyone. If your books are current and your margins are clean, you probably don't need it. But if you're not sure... that's exactly who it's for.
        </p>
        
        {/* CTA */}
        <div className="fade-up fade-up-delay-3">
          <a 
            href="/quiz"
            className="inline-flex items-center justify-center bg-ro-green hover:bg-ro-green-light text-white text-lg font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ro-dark w-full sm:w-auto min-h-[48px]"
          >
            Find Out
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
        
        {/* Trust signal - Pull-back */}
        <p className="text-ro-text-dim text-sm mt-6 fade-up fade-up-delay-4">
          90 seconds. No pitch. Just clarity on what you might be missing.
        </p>
      </div>
      
      {/* Partner path (subtle) */}
      <div className="absolute bottom-8 left-0 right-0 text-center fade-up fade-up-delay-4">
        <a 
          href="/partner" 
          className="text-ro-text-dim text-sm hover:text-ro-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold"
        >
          I'm a potential referral partner →
        </a>
      </div>
    </main>
  );
}
