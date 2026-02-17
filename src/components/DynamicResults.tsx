import { useEffect, useState } from 'react';
import MaturityGauge from './MaturityGauge';
import InactionCalculator from './InactionCalculator';

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
}

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
}: DynamicResultsProps) {
  const [showCalculator, setShowCalculator] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    // Progressive reveal
    const timer = setTimeout(() => setShowCalculator(true), 2000);
    return () => clearTimeout(timer);
  }, []);

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

  // Pain-specific messaging
  const painMessages: Record<string, { headline: string; detail: string }> = {
    trust: {
      headline: "You don't trust your numbers.",
      detail: "That's not paranoia — that's your instincts telling you something is wrong. Decisions made on bad data compound. Every month you operate without confidence is a month of accumulated risk.",
    },
    reports: {
      headline: "You can't get visibility when you need it.",
      detail: "You're making decisions in the dark. The lag between what's happening and what you can see is where money disappears. By the time you see the problem, it's already cost you.",
    },
    cost: {
      headline: "You're paying too much for too little.",
      detail: "Domestic rates for basic output. No strategic insight. No one telling you what the numbers mean. You're paying for a service that's not actually serving you.",
    },
    systems: {
      headline: "Your systems don't talk to each other.",
      detail: "Every disconnection is a place where data gets lost, duplicated, or corrupted. You're running multiple sources of truth — which means you have no source of truth.",
    },
    myself: {
      headline: "You're doing work you shouldn't be doing.",
      detail: `At your level, every hour on bookkeeping is an hour not spent on growth. ${time === 'second-job' ? "You said it yourself — it's basically a second job." : "Those hours add up to weeks per year."} You're paying yourself bookkeeper wages.`,
    },
    start: {
      headline: "You don't know where to start.",
      detail: "That overwhelm isn't weakness — it's a sign the problem has grown larger than one person can solve. The longer you wait to address it, the more tangled it gets.",
    },
  };

  const currentPain = painMessages[frustration] || painMessages.reports;
  const insights = industryInsights[industry] || industryInsights.other;

  return (
    <div className="space-y-12">
      {/* Section 1: Score & Dimensions */}
      <section className="text-center">
        <p className="text-ro-gold text-sm font-medium tracking-widest uppercase mb-4">
          Your Financial Operations Diagnostic
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ro-text-bright mb-2">
          Here's what we found, {firstName}.
        </h1>
        <p className="text-ro-text-dim mb-8">
          Based on your answers, here's your Financial Operations Maturity Score.
        </p>

        <div className="bg-ro-card border border-ro-card-border rounded-xl p-8">
          <MaturityGauge score={score} dimensions={dimensions} />
        </div>
      </section>

      {/* Section 2: Pain Amplification */}
      <section className="bg-ro-darker rounded-xl p-6 md:p-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-400 text-sm font-medium tracking-widest uppercase mb-4">
            What This Means
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ro-text-bright mb-4">
            {currentPain.headline}
          </h2>
          <p className="text-ro-text text-lg mb-6">
            {currentPain.detail}
          </p>

          {/* Consequence callout */}
          {opportunity === 'yes' && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
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

      {/* Section 3: Cost of Inaction Calculator */}
      <section className={`transition-opacity duration-700 ${showCalculator ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-6">
          <p className="text-ro-gold text-sm font-medium tracking-widest uppercase mb-2">
            The Math
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ro-text-bright">
            What is this actually costing you?
          </h2>
        </div>
        <InactionCalculator 
          initialDaysBehind={daysBehind}
          hadDenial={opportunity === 'yes'}
        />
      </section>

      {/* Section 4: The Pattern */}
      <section className="text-center py-8">
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

      {/* CTA */}
      <section className="text-center">
        <a
          href={`/solution?industry=${industry}`}
          className="inline-flex items-center justify-center bg-ro-green hover:bg-ro-green-light text-white text-lg font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ro-gold focus:ring-offset-2 focus:ring-offset-ro-dark"
        >
          See How We Solve This
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <p className="text-ro-text-dim text-sm mt-4">
          3 minutes. Real stories from {industryInsights[industry] ? 'your industry' : 'companies like yours'}.
        </p>
      </section>
    </div>
  );
}
