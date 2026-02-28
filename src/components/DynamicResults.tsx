import { useEffect, useState, useRef, useCallback } from 'react';
import MaturityGauge from './MaturityGauge';
import InactionCalculator from './InactionCalculator';
import SectionBridge from './SectionBridge';
import DiagnosticFindings from './DiagnosticFindings';
import StickyCTA from './StickyCTA';
import { getStoredSession, isSessionExpired, clearSession } from '../lib/session';

interface DynamicResultsProps {
  firstName: string;
  score: number;
  industry: string;
  books: string;
  frustration: string;
  opportunity: string;
  time: string;
  entities: string;
  painLevel: string;
  industryLabel?: string;
}

// Check if IntersectionObserver is available (progressive enhancement)
const hasIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;

// Narrative assembly for mirror moment
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

export default function DynamicResults({
  firstName,
  score,
  industry,
  books,
  frustration,
  opportunity,
  time,
  entities,
  painLevel,
  industryLabel = 'your industry',
}: DynamicResultsProps) {
  const [showTransition, setShowTransition] = useState(true);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false); // Enhancement #26: Loading state
  
  // Progressive reveal states - default to true (visible) for no-JS/WhatsApp safety
  const [showPain, setShowPain] = useState(!hasIntersectionObserver);
  const [showBridge, setShowBridge] = useState(!hasIntersectionObserver);
  const [showCalculator, setShowCalculator] = useState(!hasIntersectionObserver);
  const [showPattern, setShowPattern] = useState(!hasIntersectionObserver);
  
  // Refs for IntersectionObserver
  const painRef = useRef<HTMLElement>(null);
  const bridgeRef = useRef<HTMLElement>(null);
  const calculatorRef = useRef<HTMLElement>(null);
  const patternRef = useRef<HTMLElement>(null);

  // Animate score count-up in transition
  useEffect(() => {
    if (showTransition) {
      const duration = 1500;
      const steps = 30;
      const increment = score / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [showTransition, score]);

  // Handle "Show Me" click - Enhancement #26: Add loading state for perceived value
  const handleShowMe = useCallback(() => {
    setIsBuilding(true);
    // Show "Building..." state for 1.5s to create perceived personalization value
    setTimeout(() => {
      setIsBuilding(false);
      setShowTransition(false);
      // Immediately show pain section when transition ends
      setShowPain(true);
    }, 1500);
  }, []);

  // IntersectionObserver for scroll-triggered reveals (progressive enhancement)
  useEffect(() => {
    if (!hasIntersectionObserver || showTransition) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1,
    };

    const observers: IntersectionObserver[] = [];

    // Bridge appears after scrolling past pain
    if (painRef.current && !showBridge) {
      const painObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // Trigger bridge when pain section is scrolled past (not intersecting from top)
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            setShowBridge(true);
          }
        });
      }, observerOptions);
      painObserver.observe(painRef.current);
      observers.push(painObserver);
    }

    // Calculator appears after bridge is visible or 2s delay
    if (bridgeRef.current && showBridge && !showCalculator) {
      const timer = setTimeout(() => setShowCalculator(true), 2000);
      
      const bridgeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowCalculator(true);
          }
        });
      }, observerOptions);
      bridgeObserver.observe(bridgeRef.current);
      observers.push(bridgeObserver);

      return () => {
        clearTimeout(timer);
        observers.forEach(o => o.disconnect());
      };
    }

    // Pattern appears after calculator
    if (calculatorRef.current && showCalculator && !showPattern) {
      const calcObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowPattern(true);
          }
        });
      }, observerOptions);
      calcObserver.observe(calculatorRef.current);
      observers.push(calcObserver);
    }

    return () => observers.forEach(o => o.disconnect());
  }, [showTransition, showPain, showBridge, showCalculator, showPattern]);

  // Fallback: if bridge is shown but no scroll happens, show calculator after 2s
  useEffect(() => {
    if (showBridge && !showCalculator && hasIntersectionObserver) {
      const timer = setTimeout(() => setShowCalculator(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [showBridge, showCalculator]);

  // Show pattern shortly after calculator
  useEffect(() => {
    if (showCalculator && !showPattern && hasIntersectionObserver) {
      const timer = setTimeout(() => setShowPattern(true), 800);
      return () => clearTimeout(timer);
    }
  }, [showCalculator, showPattern]);

  // Build personalized narrative
  const buildNarrative = () => {
    const parts = [];
    
    if (entityNarrative[entities]) {
      parts.push(entityNarrative[entities]);
    }
    if (booksNarrative[books]) {
      parts.push(booksNarrative[books]);
    }
    if (frustrationNarrative[frustration]) {
      parts.push(frustrationNarrative[frustration]);
    }

    const mainNarrative = parts.join(', ') + '.';
    const consequenceNarrative = opportunityNarrative[opportunity] || '';

    return { mainNarrative, consequenceNarrative };
  };

  const { mainNarrative, consequenceNarrative } = buildNarrative();

  // Calculate dimension scores for radar
  const dimensions = [
    {
      label: 'Data Currency',
      value: books === 'current' ? 85 : books === 'quarter' ? 55 : books === '6months' ? 25 : 15,
    },
    {
      label: 'Capital Readiness',
      value: opportunity === 'no' ? 80 : opportunity === 'worried' ? 50 : opportunity === 'maybe' ? 35 : 20,
    },
    {
      label: 'Operational Efficiency',
      value: time === 'none' ? 90 : time === 'few' ? 60 : time === 'half-day' ? 35 : 15,
    },
    {
      label: 'Structural Clarity',
      value: entities === '1' ? 85 : entities === '2-3' ? 65 : entities === '4-6' ? 40 : 25,
    },
    {
      label: 'Decision Confidence',
      value: frustration === 'start' ? 30 : frustration === 'trust' ? 20 : frustration === 'reports' ? 40 : 55,
    },
  ];

  // Days behind estimate
  const daysBehindMap: Record<string, number> = {
    current: 15,
    quarter: 90,
    '6months': 180,
    never: 365,
    unsure: 120,
  };
  const daysBehind = daysBehindMap[books] || 90;

  // Industry-specific messaging
  const industryInsights: Record<string, string[]> = {
    entertainment: [
      "Production companies often see 15-25% EBITDA compression that's actually recoverable.",
      "Your industry has unique cash flow cycles that standard accounting misses.",
      "We've helped VFX studios discover $3.4M in hidden margin — their EBITDA went from $0.6M to $4.0M.",
    ],
    professional: [
      "Professional services firms typically leave 15-20% on the table through unbilled time.",
      "Your utilization rates are probably telling a story your current reports don't show.",
      "Multi-partner practices often have hidden cash flow timing issues.",
    ],
    ecommerce: [
      "E-commerce cash flow is 3-6 months ahead of your P&L — most accounting setups miss this.",
      "Inventory timing creates blind spots that compound during growth spurts.",
      "We've seen brands discover they're profitable when they thought they were losing money.",
    ],
    multi: [
      "Multi-entity operators almost always have consolidation gaps hiding real performance.",
      "You're probably making decisions on incomplete data across your businesses.",
      "The intercompany picture is where the real story lives.",
    ],
    other: [
      "Companies at your stage typically find 3-5 margin leaks when they get visibility.",
      "The problem usually isn't the business — it's what you can't see.",
      "Most founders underestimate how much their own time costs the business.",
    ],
  };

  // Pain-specific messaging - Enhancement #24: Route One-specific stats
  const painMessages: Record<string, { headline: string; detail: string }> = {
    trust: {
      headline: "You don't trust your numbers.",
      detail: "That's not paranoia — that's your instincts telling you something is wrong. The last 3 clients who came to us with trust issues found an average of $180K in misclassified expenses within 60 days. Decisions made on bad data compound.",
    },
    reports: {
      headline: "You can't get visibility when you need it.",
      detail: "You're making decisions in the dark. Our clients typically close month-end in 5 business days. The lag between what's happening and what you can see is where money disappears.",
    },
    cost: {
      headline: "You're paying too much for too little.",
      detail: "Domestic rates for basic output. Most companies we work with cut their accounting costs by 40-60% while getting controller-level oversight they never had before. You're paying for a service that's not serving you.",
    },
    systems: {
      headline: "Your systems don't talk to each other.",
      detail: "Every disconnection is a place where data gets lost. We've cleaned up integrations in 44 client engagements — the intercompany cleanup alone often recovers $50K+ in errors.",
    },
    myself: {
      headline: "You're doing work you shouldn't be doing.",
      detail: `At your level, every hour on bookkeeping is an hour not spent on growth. The average founder we work with was spending 8 hours a week on financial admin. Within 30 days, that dropped to under 1.`,
    },
    start: {
      headline: "You don't know where to start.",
      detail: "That overwhelm isn't weakness — it's a sign the problem has grown larger than one person can solve. Most of our clients are current within 8 weeks. The first step is just having a conversation.",
    },
  };

  const currentPain = painMessages[frustration] || painMessages.reports;
  const insights = industryInsights[industry] || industryInsights.other;

  // Bridge configuration
  const bridgeOptions = [
    { label: 'Too familiar', value: 'too-familiar' },
    { label: 'Getting there', value: 'getting-there' },
    { label: 'Not really', value: 'not-really' },
  ];

  const bridgeFollowUp: Record<string, string> = {
    'too-familiar': "That recognition is worth something. Keep going.",
    'getting-there': "The earlier you see it, the less it costs.",
    'not-really': "Good — but the calculator below might change your mind.",
  };

  // ============================================
  // QUIZ TRANSITION (Mirror Moment)
  // ============================================
  if (showTransition) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-8 md:py-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-ro-gold text-sm font-medium tracking-widest uppercase mb-6">
            Your Diagnostic Results
          </p>
          
          <h1 className="text-3xl sm:text-4xl font-medium text-ro-text-bright mb-8">
            Here's what we found, {firstName}.
          </h1>

          {/* Enhanced Diagnostic Findings */}
          <div className="bg-ro-card border border-ro-card-border rounded-xl p-6 md:p-8 mb-8 text-left">
            <DiagnosticFindings
              firstName={firstName}
              industry={industry}
              books={books}
              entities={entities}
              frustration={frustration}
              opportunity={opportunity}
              score={score}
            />
          </div>

          {/* Animated Score Display */}
          <div className="mb-6">
            <div className="text-6xl sm:text-7xl font-bold text-ro-gold mb-2">
              {animatedScore}
            </div>
            <p className="text-ro-text-dim">
              Financial Operations Maturity Score
            </p>
            <p className="text-sm text-ro-text-dim mt-1">
              (out of 100 — higher is better)
            </p>
          </div>

          {/* Mini Gauge Preview */}
          <div className="bg-ro-darker rounded-xl p-6 mb-8">
            <MaturityGauge score={score} dimensions={dimensions} />
          </div>

          {/* Deeper Reflection - Enhancement #26 */}
          <p className="text-ro-text text-base mb-6 max-w-lg mx-auto">
            That combination — {entityNarrative[entities]?.toLowerCase() || 'your entity structure'} with books that {booksNarrative[books]?.replace(/^your books /, '') || 'need attention'} — puts you in a specific category. The companies below were in exactly that position. What they found surprised them.
          </p>

          {/* Reveal Button - with loading state */}
          {isBuilding ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-ro-gold">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg font-medium">Building your personalized analysis...</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleShowMe}
              className="inline-flex items-center justify-center bg-ro-green hover:bg-ro-green-light text-white text-lg font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ro-gold focus:ring-offset-2 focus:ring-offset-ro-dark"
            >
              Show Me What This Means
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============================================
  // FULL DASHBOARD
  // ============================================
  return (
    <div className="space-y-6 pb-12">
      {/* Section 1: Score & Dimensions - Always visible */}
      <section className="text-center fade-up">
        <p className="text-ro-gold text-sm font-medium tracking-widest uppercase mb-4">
          Your Financial Operations Diagnostic
        </p>
        <h1 className="text-3xl sm:text-4xl font-medium text-ro-text-bright mb-2">
          Here's what we found, {firstName}.
        </h1>
        <p className="text-ro-text-dim mb-8">
          Based on your answers, here's your Financial Operations Maturity Score.
        </p>

        <div className="bg-ro-card border border-ro-card-border rounded-xl p-8">
          <MaturityGauge score={score} dimensions={dimensions} />
        </div>
      </section>

      {/* Section 2: Pain Amplification - Progressive reveal on "Show Me" click */}
      <section 
        ref={painRef}
        className={`bg-ro-darker rounded-xl p-6 md:p-8 fade-up transition-all duration-700 ${
          showPain ? 'opacity-100 translate-y-0' : hasIntersectionObserver ? 'opacity-0 translate-y-4' : ''
        }`}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-red-400 text-sm font-medium tracking-widest uppercase mb-4">
            What This Means
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium text-ro-text-bright mb-4">
            {currentPain.headline}
          </h2>
          <p className="text-ro-text text-lg mb-4">
            {currentPain.detail}
          </p>
          <p className="text-ro-text-dim text-sm italic mt-4">
            80% of companies we work with show this exact pattern.
          </p>

          {/* Consequence callout */}
          {opportunity === 'yes' && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 mt-6">
              <p className="text-red-400 font-medium">
                You've already lost money to this problem.
              </p>
              <p className="text-ro-text-dim text-sm mt-1">
                The denied financing, the missed deal, the delayed opportunity — that's money you'll never get back. The question is how much more you'll lose.
              </p>
            </div>
          )}

          {/* Industry insights */}
          <div className="space-y-3 mt-8">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-ro-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-ro-gold text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-ro-text">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge 1: Results - Appears after scrolling past pain */}
      <section 
        ref={bridgeRef}
        className={`fade-up transition-all duration-700 ${
          showBridge ? 'opacity-100 translate-y-0' : hasIntersectionObserver ? 'opacity-0 translate-y-4' : ''
        }`}
      >
        <SectionBridge
          prompt="Does this feel familiar?"
          options={bridgeOptions}
          followUp={bridgeFollowUp}
          storageKey="results"
        />
      </section>

      {/* Section 3: Cost of Inaction Calculator - Slides up after bridge */}
      <section 
        ref={calculatorRef}
        className={`fade-up transition-all duration-700 ${
          showCalculator ? 'opacity-100 translate-y-0' : hasIntersectionObserver ? 'opacity-0 translate-y-8' : ''
        }`}
      >
        <div className="text-center mb-6">
          <p className="text-ro-gold text-sm font-medium tracking-widest uppercase mb-2">
            The Math
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium text-ro-text-bright">
            What is this actually costing you?
          </h2>
        </div>
        <InactionCalculator 
          initialDaysBehind={daysBehind}
          hadDenial={opportunity === 'yes'}
        />
      </section>

      {/* Section 4: The Pattern - Appears after calculator */}
      <section 
        ref={patternRef}
        className={`text-center py-8 fade-up transition-all duration-700 ${
          showPattern ? 'opacity-100 translate-y-0' : hasIntersectionObserver ? 'opacity-0 translate-y-4' : ''
        }`}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-ro-text mb-6">
            The pattern we see across 44 client engagements:
          </p>
          <blockquote className="text-2xl sm:text-3xl font-bold text-ro-gold italic mb-6">
            "Companies don't have visibility problems because they're doing something wrong. They have visibility problems because their systems weren't built to show them the truth."
          </blockquote>
          <p className="text-ro-text-dim">
            The good news: this is fixable. Usually faster than you'd expect.
          </p>
        </div>
      </section>

      {/* CTA with Enhanced Transition Copy - Appears with pattern */}
      <section 
        className={`text-center fade-up transition-all duration-700 ${
          showPattern ? 'opacity-100 translate-y-0' : hasIntersectionObserver ? 'opacity-0 translate-y-4' : ''
        }`}
      >
        <div className="max-w-xl mx-auto mb-6">
          <p className="text-lg text-ro-text mb-2">
            Now you've seen the problem.
          </p>
          <p className="text-lg text-ro-text-bright font-medium">
            Here's what other {industryLabel} companies did about it.
          </p>
        </div>
        
        {/* Proof-Near-CTA - Enhancement #12 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="px-3 py-1.5 bg-ro-green/10 border border-ro-green/30 rounded-full text-xs text-ro-text-dim">
            Companies in your position typically see results in <span className="text-ro-green font-medium">60 days</span>
          </span>
        </div>
        
        <a
          href={`/solution?industry=${industry}`}
          className="inline-flex items-center justify-center bg-ro-green hover:bg-ro-green-light text-white text-lg font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ro-gold focus:ring-offset-2 focus:ring-offset-ro-dark"
        >
          See How Companies Like Yours Solved This
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <p className="text-ro-text-dim text-sm mt-4">
          3 minutes. Real stories from {industryInsights[industry] ? 'your industry' : 'companies like yours'}.
        </p>
      </section>

      {/* Enhancement #17: Sticky Bottom CTA Bar */}
      <StickyCTA 
        text="Ready to see how companies like yours solved this?"
        buttonText="See Solutions"
        href={`/solution?industry=${industry}`}
      />
    </div>
  );
}
