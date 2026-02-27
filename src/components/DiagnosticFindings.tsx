interface DiagnosticFindingsProps {
  firstName: string;
  industry: string;
  books: string;
  entities: string;
  frustration: string;
  opportunity: string;
  score: number;
}

// Industry-specific case study data
const industryCaseStudies: Record<string, {
  company: string;
  situation: string;
  finding: string;
  result: string;
}> = {
  entertainment: {
    company: "a VFX studio",
    situation: "came to us ready to lay off half their team",
    finding: "Reported EBITDA was $0.6M. Actual EBITDA was $4.0M.",
    result: "They didn't need a turnaround. They needed visibility.",
  },
  professional: {
    company: "a consulting firm",
    situation: "thought they were breaking even",
    finding: "15% of their billable time was going untracked",
    result: "Same work, same clients — $180K more revenue recognized.",
  },
  ecommerce: {
    company: "a DTC brand",
    situation: "was about to cut their ad spend",
    finding: "Their inventory timing was masking 3 months of profitability",
    result: "They doubled down instead. 40% growth in 6 months.",
  },
  multi: {
    company: "a multi-entity operator",
    situation: "couldn't explain their cash position to investors",
    finding: "Intercompany transfers were hiding $2.1M in actual margin",
    result: "They closed their Series B 6 weeks later.",
  },
  other: {
    company: "a growing company",
    situation: "was making decisions on 90-day-old data",
    finding: "Three margin leaks were compounding monthly",
    result: "Same revenue, $340K more to the bottom line.",
  },
};

// Books-based delay impact
const booksImpact: Record<string, { delay: string; cost: string; insight: string }> = {
  current: {
    delay: "15 days",
    cost: "minimal",
    insight: "You're ahead of most — but 'current' doesn't mean 'optimized'. There's usually 15-20% hidden in the details.",
  },
  quarter: {
    delay: "90 days",
    cost: "$8K-25K monthly in delayed decisions",
    insight: "Every decision you've made in the last quarter was based on stale data. Some of those decisions cost you money.",
  },
  '6months': {
    delay: "180+ days",
    cost: "$15K-50K monthly in blind spots",
    insight: "You're flying blind. At 6+ months behind, you're not running a business — you're guessing.",
  },
  never: {
    delay: "365+ days",
    cost: "incalculable — every number is a guess",
    insight: "Every financial decision you've ever made was based on incomplete information. That compounds.",
  },
  unsure: {
    delay: "unknown",
    cost: "that uncertainty is the problem",
    insight: "Not knowing how far behind you are is worse than being behind. You can't fix what you can't measure.",
  },
};

// Entity complexity multipliers
const entityImpact: Record<string, string> = {
  '1': "Single entity operations still average 3-5 margin leaks we can identify.",
  '2-3': "With 2-3 entities, consolidation gaps typically hide 10-15% of actual performance.",
  '4-6': "At 4-6 entities, intercompany complexity usually masks $200K-500K annually.",
  '7+': "7+ entities means consolidation alone could free up a full-time analyst's worth of value.",
};

// Frustration-based primary finding
const frustrationFindings: Record<string, { headline: string; detail: string }> = {
  reports: {
    headline: "Visibility Gap Detected",
    detail: "You can't get reports when you need them because your systems weren't built for real-time visibility. The lag between reality and reports is where money disappears.",
  },
  cost: {
    headline: "ROI Mismatch Identified",
    detail: "You're paying domestic rates for basic output. No strategic insight. No proactive recommendations. That's not a service — it's a transaction.",
  },
  trust: {
    headline: "Confidence Gap Identified",
    detail: "You don't trust your numbers because your instincts are correct. Something is wrong. Decisions made on bad data compound into bigger problems.",
  },
  systems: {
    headline: "Integration Failure Detected",
    detail: "Disconnected systems create data gaps. Every disconnection is a place where information gets lost, duplicated, or corrupted. You're running multiple sources of truth.",
  },
  myself: {
    headline: "Time Leakage Identified",
    detail: "Every hour you spend on financial operations is an hour not spent on growth. At your level, you're paying yourself bookkeeper wages.",
  },
  start: {
    headline: "Complexity Overwhelm Detected",
    detail: "Not knowing where to start isn't weakness — it's a sign the problem has grown larger than any one person can solve. The longer you wait, the more tangled it gets.",
  },
};

export default function DiagnosticFindings({
  firstName,
  industry,
  books,
  entities,
  frustration,
  opportunity,
  score,
}: DiagnosticFindingsProps) {
  const caseStudy = industryCaseStudies[industry] || industryCaseStudies.other;
  const booksData = booksImpact[books] || booksImpact.quarter;
  const entityData = entityImpact[entities] || entityImpact['2-3'];
  const findingData = frustrationFindings[frustration] || frustrationFindings.reports;

  // Calculate estimated annual impact based on score
  const estimatedImpact = score < 40 
    ? "$150K-400K" 
    : score < 60 
    ? "$75K-200K" 
    : score < 80 
    ? "$30K-100K" 
    : "$10K-50K";

  return (
    <div className="space-y-6">
      {/* Primary Finding */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-red-400 font-semibold text-lg">{findingData.headline}</p>
            <p className="text-ro-text text-sm mt-1">{findingData.detail}</p>
          </div>
        </div>
      </div>

      {/* Books Timing Impact */}
      <div className="bg-ro-card border border-ro-card-border rounded-lg p-5">
        <div className="flex justify-between items-start mb-3">
          <p className="text-ro-gold font-medium">Data Currency</p>
          <p className="text-ro-text-dim text-sm">{booksData.delay} behind</p>
        </div>
        <p className="text-ro-text text-sm">{booksData.insight}</p>
        {booksData.cost !== "minimal" && (
          <p className="text-red-400 text-sm mt-2 font-medium">
            Estimated impact: {booksData.cost}
          </p>
        )}
      </div>

      {/* Entity Complexity */}
      <div className="bg-ro-card border border-ro-card-border rounded-lg p-5">
        <p className="text-ro-gold font-medium mb-2">Structural Complexity</p>
        <p className="text-ro-text text-sm">{entityData}</p>
      </div>

      {/* Case Study Teaser */}
      <div className="bg-gradient-to-br from-ro-green/10 to-ro-gold/5 border border-ro-green/30 rounded-lg p-5">
        <p className="text-ro-text-dim text-xs uppercase tracking-wider mb-2">From Our Files</p>
        <p className="text-ro-text text-sm mb-3">
          <span className="text-ro-text-bright font-medium">{caseStudy.company}</span> {caseStudy.situation}.
        </p>
        <p className="text-ro-gold font-medium text-sm mb-2">
          What we found: {caseStudy.finding}
        </p>
        <p className="text-ro-text-bright text-sm font-medium">
          {caseStudy.result}
        </p>
      </div>

      {/* Opportunity Cost */}
      {opportunity === 'yes' && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-5">
          <p className="text-red-400 font-medium">You've already lost money to this.</p>
          <p className="text-ro-text-dim text-sm mt-1">
            The denied financing, the missed deal, the delayed opportunity — that's gone. The question is how much more you'll lose waiting.
          </p>
        </div>
      )}

      {/* Bottom Line */}
      <div className="text-center pt-4 border-t border-ro-card-border">
        <p className="text-ro-text-dim text-sm mb-1">Based on your profile, companies like yours typically recover</p>
        <p className="text-ro-gold text-2xl font-bold">{estimatedImpact}</p>
        <p className="text-ro-text-dim text-sm">in annual margin once they get visibility</p>
      </div>
    </div>
  );
}
