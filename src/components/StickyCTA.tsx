import { useState, useEffect } from 'react';

interface StickyCTAProps {
  text?: string;
  buttonText?: string;
  href?: string;
  showAfterScrollPercent?: number;
}

/**
 * Enhancement #17: Sticky Bottom CTA Bar
 * 
 * Appears after scrolling past a threshold, captures high-intent prospects
 * at the moment they're ready, not when you're ready.
 */
export default function StickyCTA({
  text = "Ready to talk?",
  buttonText = "Book Your Call",
  href = "/talk",
  showAfterScrollPercent = 25,
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    try {
      if (sessionStorage.getItem('ro_sticky_cta_dismissed') === 'true') {
        setIsDismissed(true);
        return;
      }
    } catch {
      // sessionStorage not available
    }

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent > showAfterScrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScrollPercent]);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('ro_sticky_cta_dismissed', 'true');
    } catch {
      // sessionStorage not available
    }
  };

  if (isDismissed) return null;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-ro-darker/95 backdrop-blur-sm border-t border-ro-card-border
        transform transition-transform duration-300 ease-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}
      role="complementary"
      aria-label="Book a call"
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-ro-text text-sm sm:text-base hidden sm:block">
          {text}
        </p>
        
        <div className="flex items-center gap-3 flex-1 sm:flex-initial justify-end">
          <a
            href={href}
            className="inline-flex items-center justify-center bg-ro-green hover:bg-ro-green-light text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ro-darker min-h-[44px]"
          >
            {buttonText}
            <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          
          <button
            onClick={handleDismiss}
            className="p-2 text-ro-text-dim hover:text-ro-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
