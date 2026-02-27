import { useEffect, useState, useRef } from 'react';
import { getIndustryContent, type IndustryContent } from '../lib/industryContent';
import SectionBridge from './SectionBridge';
import StickyCTA from './StickyCTA';

interface DynamicSolutionProps {
  industry: string;
}

// Check if IntersectionObserver is available (progressive enhancement)
const hasIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;

export default function DynamicSolution({ industry: initialIndustry }: DynamicSolutionProps) {
  const [content, setContent] = useState<IndustryContent | null>(null);
  // Default to all visible for no-JS/WhatsApp safety
  const [visibleMetrics, setVisibleMetrics] = useState<number[]>(!hasIntersectionObserver ? [0, 1, 2, 3] : []);
  const [showQuote, setShowQuote] = useState(!hasIntersectionObserver);
  const [showOutcome, setShowOutcome] = useState(!hasIntersectionObserver);
  const [industry, setIndustry] = useState(initialIndustry);
  const [hasAnimated, setHasAnimated] = useState(!hasIntersectionObserver);
  
  // Ref for IntersectionObserver
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check localStorage for industry if we got 'other' from URL
    if (initialIndustry === 'other') {
      try {
        const stored = localStorage.getItem('ro_quiz_v2');
        if (stored) {
          const data = JSON.parse(stored);
          const storedIndustry = data?.state?.answers?.industry;
          if (storedIndustry && storedIndustry !== 'other') {
            setIndustry(storedIndustry);
            return;
          }
        }
      } catch (e) {
        // Ignore localStorage errors
      }
    }
    setIndustry(initialIndustry);
  }, [initialIndustry]);

  useEffect(() => {
    setContent(getIndustryContent(industry));
    // Only reset for animation if IntersectionObserver exists
    if (hasIntersectionObserver) {
      setVisibleMetrics([]);
      setShowQuote(false);
      setShowOutcome(false);
      setHasAnimated(false);
    }
  }, [industry]);

  // IntersectionObserver to trigger stagger animation when metrics section is in view
  useEffect(() => {
    if (!hasIntersectionObserver || !content || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Stagger metric reveals
            content.caseStudy.metrics.forEach((_, i) => {
              setTimeout(() => {
                setVisibleMetrics(prev => [...prev, i]);
              }, 300 + i * 250);
            });
            
            // Show quote after all metrics
            const totalMetricTime = 300 + content.caseStudy.metrics.length * 250;
            setTimeout(() => setShowQuote(true), totalMetricTime + 400);
            
            // Show outcome after quote
            setTimeout(() => setShowOutcome(true), totalMetricTime + 800);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, [content, hasAnimated]);

  // Bridge 2 configuration
  const bridgeOptions = [
    { label: 'Exactly this', value: 'exactly-this' },
    { label: 'Something similar', value: 'something-similar' },
    { label: 'Need to think about it', value: 'need-to-think' },
  ];

  const bridgeFollowUp: Record<string, string> = {
    'exactly-this': "Then let's talk about how fast we can get you there.",
    'something-similar': "Every engagement is custom. We'll show you what yours looks like.",
    'need-to-think': "Take your time. The math doesn't change.",
  };

  if (!content) return null;

  return (
    <div className="space-y-0">
      {/* Industry Badge */}
      {industry !== 'other' && (
        <div className="bg-ro-green/10 border-b border-ro-green/20 px-6 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-sm">
            <span className="text-ro-green">✓</span>
            <span className="text-ro-text-dim">Customized for</span>
            <span className="text-ro-green font-medium">{content.label}</span>
          </div>
        </div>
      )}

      {/* Section: The Misdiagnosis */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-ro-green text-sm font-medium tracking-widest uppercase mb-4">
            The Misdiagnosis
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ro-text-bright leading-tight mb-2">
            {content.misdiagnosis.thinkHeadline}
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ro-gold leading-tight mb-8">
            {content.misdiagnosis.actuallyHeadline}
          </h2>
          
          <div className="prose prose-invert max-w-none">
            {content.misdiagnosis.story.split('\n\n').map((paragraph, i) => (
              <p 
                key={i} 
                className="text-lg text-ro-text mb-4"
                dangerouslySetInnerHTML={{ 
                  __html: paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<span class="text-ro-gold font-semibold">$1</span>')
                }}
              />
            ))}
          </div>
          
          {/* Key Insight Callout */}
          <div className="mt-8 bg-ro-gold/10 border border-ro-gold/30 rounded-xl p-6">
            <p className="text-ro-gold font-medium mb-2">The Key Insight:</p>
            <p className="text-ro-text">{content.misdiagnosis.keyInsight}</p>
          </div>
        </div>
      </section>

      {/* Section: The Model */}
      <section className="px-6 py-16 md:py-24 bg-ro-darker">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-ro-green text-sm font-medium tracking-widest uppercase mb-4">
              The Route One Model
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-ro-text-bright mb-4">
              What if you could replace your entire accounting headcount<br />
              with a managed department — for less?
            </h2>
            <p className="text-lg text-ro-text-dim max-w-2xl mx-auto">
              That's not a pitch. It's the math. Here's how it works.
            </p>
          </div>
          
          {/* Enhancement #14: Industry-Specific Trust Badges */}
          {content.trustBadges && content.trustBadges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {content.trustBadges.map((badge, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-ro-gold/10 border border-ro-gold/30 rounded-full text-sm text-ro-gold"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
          
          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-ro-card border border-ro-card-border rounded-xl p-6">
              <div className="w-12 h-12 bg-ro-green/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-ro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-ro-text-bright mb-2">Core Accounting</h3>
              <p className="text-ro-text-dim text-sm">
                AP/AR, reconciliations, journal entries, month-end close. The foundation that keeps everything running.
              </p>
            </div>
            
            <div className="bg-ro-card border border-ro-card-border rounded-xl p-6">
              <div className="w-12 h-12 bg-ro-green/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-ro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-ro-text-bright mb-2">Controllership</h3>
              <p className="text-ro-text-dim text-sm">
                Financial oversight, internal controls, audit readiness, reporting & performance insights.
              </p>
            </div>
            
            <div className="bg-ro-card border border-ro-card-border rounded-xl p-6">
              <div className="w-12 h-12 bg-ro-green/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-ro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-ro-text-bright mb-2">Strategic Finance</h3>
              <p className="text-ro-text-dim text-sm">
                Fractional CFO services, FP&A modeling, capital raise support, board-ready reporting.
              </p>
            </div>
          </div>
          
          {/* Team Structure */}
          <div className="bg-ro-card border border-ro-card-border rounded-xl p-6 md:p-8">
            <h3 className="text-lg font-semibold text-ro-text-bright mb-6 text-center">Your Full Department</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-ro-green/20 text-ro-green rounded-full text-sm font-medium">Controller</span>
              <span className="text-ro-text-dim hidden sm:block">→</span>
              <span className="px-4 py-2 bg-ro-card-border/50 text-ro-text rounded-full text-sm">Accounting Manager</span>
              <span className="text-ro-text-dim hidden sm:block">→</span>
              <span className="px-4 py-2 bg-ro-card-border/50 text-ro-text rounded-full text-sm">Sr. Accountant</span>
              <span className="text-ro-text-dim hidden sm:block">→</span>
              <span className="px-4 py-2 bg-ro-card-border/50 text-ro-text rounded-full text-sm">Staff + Clerk</span>
            </div>
            <p className="text-ro-text-dim text-sm text-center mt-6">
              All managed. All guaranteed. All for less than you'd pay a single domestic hire.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Case Study */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-ro-green text-sm font-medium tracking-widest uppercase mb-4">
              Companies Like Yours
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-ro-text-bright mb-4">
              {content.caseStudy.company}
            </h2>
            <p className="text-lg text-ro-text-dim">
              {content.caseStudy.industry} • {content.caseStudy.challenge}
            </p>
          </div>
          
          {/* What changed label */}
          <p className="text-ro-text-dim text-sm text-center mb-6">What changed:</p>
          
          {/* Metrics Grid - with IntersectionObserver trigger */}
          <div ref={metricsRef} className="grid sm:grid-cols-2 gap-4 mb-8">
            {content.caseStudy.metrics.map((metric, i) => (
              <div 
                key={metric.label}
                className={`bg-ro-card border border-ro-card-border rounded-xl p-6 transition-all duration-500 ${
                  visibleMetrics.includes(i) 
                    ? 'opacity-100 translate-y-0' 
                    : hasIntersectionObserver 
                      ? 'opacity-0 translate-y-4' 
                      : ''
                }`}
              >
                <p className="text-ro-text-dim text-sm mb-3">{metric.label}</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-red-400 font-mono line-through text-lg">{metric.before}</p>
                  </div>
                  <svg className="w-5 h-5 text-ro-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="flex-1 text-right">
                    <p className="text-ro-green font-mono font-bold text-lg">{metric.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quote - stagger reveal after metrics */}
          <div className={`bg-ro-darker rounded-xl p-8 text-center transition-all duration-500 ${
            showQuote 
              ? 'opacity-100 translate-y-0' 
              : hasIntersectionObserver 
                ? 'opacity-0 translate-y-4' 
                : ''
          }`}>
            <blockquote className="text-xl sm:text-2xl text-ro-text-bright italic mb-4">
              "{content.caseStudy.quote}"
            </blockquote>
            <p className="text-ro-text-dim">
              — {content.caseStudy.quoteName}, {content.caseStudy.quoteRole}
            </p>
          </div>
          
          {/* Outcome - revealed after quote */}
          <p className={`text-ro-text text-center mt-8 max-w-2xl mx-auto transition-all duration-500 ${
            showOutcome 
              ? 'opacity-100' 
              : hasIntersectionObserver 
                ? 'opacity-0' 
                : ''
          }`}>
            {content.caseStudy.outcome}
          </p>
        </div>
      </section>

      {/* Bridge 2: Solution */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto">
          <SectionBridge
            prompt="Is this the kind of outcome you're looking for?"
            options={bridgeOptions}
            followUp={bridgeFollowUp}
            storageKey="solution"
          />
        </div>
      </section>

      {/* Section: Speed */}
      <section className="px-6 py-16 md:py-24 bg-ro-darker">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-ro-green text-sm font-medium tracking-widest uppercase mb-4">
              How Fast We Move
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-ro-text-bright mb-4">
              Most clients are current within weeks, not months.
            </h2>
            <p className="text-ro-text-dim">{content.speedContext}</p>
          </div>
          
          {/* Timeline */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-ro-green rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <div>
                <h3 className="text-lg font-semibold text-ro-text-bright">Rapid Onboarding</h3>
                <p className="text-ro-text-dim">Get you current. Clean up the backlog. Establish baseline visibility.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-ro-green/80 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              <div>
                <h3 className="text-lg font-semibold text-ro-text-bright">Scale Operations</h3>
                <p className="text-ro-text-dim">Build out your team structure. Implement SOPs. Create repeatable processes.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-ro-green/60 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              <div>
                <h3 className="text-lg font-semibold text-ro-text-bright">Process Improvements</h3>
                <p className="text-ro-text-dim">AI-assisted GL coding. Automation. Continuous optimization.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-ro-green/40 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
              <div>
                <h3 className="text-lg font-semibold text-ro-text-bright">Enablement</h3>
                <p className="text-ro-text-dim">You step back. We run it. You get reports, not problems.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA with Enhanced Transition Copy */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-ro-text mb-2">
            The model works. You've seen the proof.
          </p>
          <p className="text-lg text-ro-text-bright font-medium mb-6">
            The only question is who's behind it.
          </p>
          
          {/* Proof-Near-CTA - Enhancement #12 */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-3 py-1.5 bg-ro-green/10 border border-ro-green/30 rounded-full text-xs text-ro-text-dim">
              <span className="text-ro-green font-medium">$300M+</span> exits advised
            </span>
            <span className="px-3 py-1.5 bg-ro-green/10 border border-ro-green/30 rounded-full text-xs text-ro-text-dim">
              <span className="text-ro-green font-medium">100%</span> retention
            </span>
          </div>
          
          <a 
            href="/talk"
            className="inline-flex items-center justify-center bg-ro-green hover:bg-ro-green-light text-white text-lg font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ro-gold focus:ring-offset-2 focus:ring-offset-ro-dark"
          >
            Meet the Team Behind It
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Enhancement #17: Sticky Bottom CTA Bar */}
      <StickyCTA 
        text="Ready to meet the team?"
        buttonText="Book a Call"
        href="/talk"
      />
    </div>
  );
}
