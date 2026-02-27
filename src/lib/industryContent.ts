// Industry-specific content for the entire funnel journey

export interface IndustryContent {
  label: string;
  tagline: string;
  
  // Results page
  insights: string[];
  hiddenCostHeadline: string;
  hiddenCostDetail: string;
  
  // Misdiagnosis
  misdiagnosis: {
    thinkHeadline: string;
    actuallyHeadline: string;
    story: string;
    keyInsight: string;
  };
  
  // Case Study
  caseStudy: {
    company: string;
    industry: string;
    challenge: string;
    metrics: { label: string; before: string; after: string; }[];
    quote: string;
    quoteName: string;
    quoteRole: string;
    outcome: string;
  };
  
  // Speed/Timeline customization
  speedContext: string;
  
  // CTA customization
  ctaHeadline: string;
  ctaSubtext: string;
}

export const INDUSTRY_CONTENT: Record<string, IndustryContent> = {
  entertainment: {
    label: 'Entertainment & Media',
    tagline: 'Production companies, studios, VFX houses, talent management',
    
    insights: [
      "Production companies often see 15-25% EBITDA compression that's actually recoverable margin, not lost revenue.",
      "Your project-based cash flow creates blind spots that standard accounting completely misses.",
      "We've helped VFX studios discover $3.4M in hidden margin — their reported EBITDA was $0.6M, actual was $4.0M.",
      "Union compliance, production accounting, and multi-project tracking require specialized financial operations.",
    ],
    hiddenCostHeadline: "Your EBITDA isn't what you think it is.",
    hiddenCostDetail: "Entertainment companies routinely misclassify strategic investments as operating expenses, compress margins during growth phases, and lose visibility across multiple productions. The result: you think you're struggling when you're actually healthy.",
    
    misdiagnosis: {
      thinkHeadline: "You think you need to downscale.",
      actuallyHeadline: "Actually, you have a leakage problem.",
      story: `A ~$15M VFX studio came to us ready to lay off half their team. Their EBITDA had compressed from 22% to 4%. They were convinced the business was dying.

We spent three weeks in their QuickBooks, Harvest time-tracking, and Salesforce data. What we found: **Reported EBITDA was $0.6M. Actual EBITDA was $4.0M.**

The $3.4M gap? Strategic investments coded as expenses. Pricing discipline erosion — discount rates widening from 47% to 49%. Productivity leaks across 84 FTEs showing a -9% decline. One-time costs mixed into operating expenses.

They didn't need a turnaround. They needed **visibility**.`,
      keyInsight: "That 2-point erosion in discount rates? It was costing them $789K annually. They were throwing around 5% discounts like it was nothing.",
    },
    
    caseStudy: {
      company: "Apex VFX",
      industry: "Visual Effects Studio (~$15M revenue)",
      challenge: "EBITDA compressed from 22% to 4%, leadership considering major layoffs across 84 FTEs",
      metrics: [
        { label: "Reported EBITDA", before: "$0.6M", after: "$4.0M (normalized)" },
        { label: "Enterprise Value", before: "$9M (status quo)", after: "$36M (optimized)" },
        { label: "Pricing Leakage", before: "49% discount rate", after: "$789K/yr identified" },
        { label: "Productivity Gap", before: "-9% across 84 FTEs", after: "$1.1M/yr recoverable" },
      ],
      quote: "We thought we needed to cut. They showed us we needed to see.",
      quoteName: "Studio Principal",
      quoteRole: "VFX Studio",
      outcome: "Company pivoted from planning layoffs to planning expansion. Path to $50M+ valuation identified. The only thing that changed was what they could see.",
    },
    
    speedContext: "Production schedules wait for no one. We know how to move fast without disrupting active projects.",
    
    ctaHeadline: "Let's find what's hiding in your production numbers.",
    ctaSubtext: "15 minutes. We'll show you what your current setup isn't showing you.",
  },
  
  professional: {
    label: 'Professional Services',
    tagline: 'Law firms, consulting, accounting practices, agencies',
    
    insights: [
      "Professional services firms typically leave 15-20% on the table through unbilled time and poor utilization tracking.",
      "Your utilization rates are telling a story your current reports don't show.",
      "Partner distributions and compensation structures often mask true profitability by practice area.",
      "Most solo CPAs and small firms don't struggle with tax expertise — they struggle with time.",
    ],
    hiddenCostHeadline: "You're billing for hours but missing the margins.",
    hiddenCostDetail: "Professional services profitability lives in the details: utilization rates, realization rates, practice area margins, partner allocations. Most firms track revenue but not the profitability drivers underneath.",
    
    misdiagnosis: {
      thinkHeadline: "You think you need more staff.",
      actuallyHeadline: "Actually, you need a backend that handles execution while you keep control.",
      story: `A sole practitioner CPA with 10+ years in practice had a growing tax business — but no backend support. As client volume increased, bookkeeping execution became the constraint on everything.

Time-intensive reconciliations. Inconsistent QBO and QBD files. Significant uncategorized transactions. Peak-season bottlenecks during tax deadlines. The practitioner was trapped doing $15/hour work instead of advisory.

We took over execution across **20+ entities and 100+ accounts** as a white-label backend partner. AI-assisted GL coding with human review. Standardized intake SOPs. The CPA stayed in control while we handled the work.`,
      keyInsight: "Backend bookkeeping shifted from a bottleneck to a scalable support function. Same clients, 70-80% less of the practitioner's time.",
    },
    
    caseStudy: {
      company: "High-Volume CPA Practice",
      industry: "Tax & Advisory (10+ year practitioner)",
      challenge: "Bookkeeping bottleneck limiting capacity and creating peak-season pressure",
      metrics: [
        { label: "CPA Time Spent", before: "100%", after: "20-30% (70-80% reduction)" },
        { label: "Entities Managed", before: "Overwhelmed", after: "20+ (stabilized)" },
        { label: "Accounts Reconciled", before: "Backlogged", after: "100+ (current)" },
        { label: "Onboarding", before: "Ad-hoc", after: "Standardized SOPs" },
      ],
      quote: "I finally stepped out of day-to-day bookkeeping while keeping oversight of everything.",
      quoteName: "Sole Practitioner",
      quoteRole: "CPA Practice",
      outcome: "Created capacity for additional clients, payroll services, and advisory expansion. The practice scales without the practitioner working more hours.",
    },
    
    speedContext: "We understand billable hours. We won't waste yours.",
    
    ctaHeadline: "Let's find the margin hiding in your practice.",
    ctaSubtext: "15 minutes. Partner to partner.",
  },
  
  ecommerce: {
    label: 'E-commerce & DTC',
    tagline: 'Shopify, Amazon, DTC brands, multi-channel retail',
    
    insights: [
      "E-commerce cash flow runs 3-6 months ahead of your P&L — most accounting setups completely miss this.",
      "Inventory timing creates blind spots that compound during growth spurts and seasonal peaks.",
      "Multi-channel selling (Shopify + Amazon + TikTok + Walmart) fragments your financial picture into four different realities.",
      "We've seen brands discover they're profitable when they thought they were losing money — and vice versa.",
    ],
    hiddenCostHeadline: "Your P&L is lying to you.",
    hiddenCostDetail: "E-commerce accounting is uniquely broken. You buy inventory months before you sell it. Platform fees hit at different times. Returns mess up your numbers. COGS is a guess. By the time your books close, the moment has passed.",
    
    misdiagnosis: {
      thinkHeadline: "You think you have a cash flow problem.",
      actuallyHeadline: "Actually, you have a timing visibility problem.",
      story: `An apparel brand scaling from $6M to $50M+ thought they were bleeding cash. They were selling across Shopify, Amazon, TikTok Shop, and Walmart — four channels, four different data sources, no unified picture.

Every growth push felt like a crisis. The 6-month lead times from China meant cash was always behind inventory. They were considering slowing down — cutting ad spend, delaying expansion.

We rebuilt their financial picture around cash flow timing, not GAAP accounting. What we found: they were actually **more profitable** during growth phases, but the cash lag made it invisible.

They didn't have a profitability problem. They had a **visibility problem** that was making them afraid of their own success.`,
      keyInsight: "They cut financial operations cost by 50% while scaling 8x. The constraint was never money — it was sight.",
    },
    
    caseStudy: {
      company: "Multi-Channel Apparel Brand",
      industry: "E-commerce / DTC (Shopify + Amazon + TikTok + Walmart)",
      challenge: "Scaling from $6M to $50M+ across 4 channels with 6-month inventory lead times",
      metrics: [
        { label: "Revenue", before: "$6M", after: "$50M+" },
        { label: "Finance Ops Cost", before: "100%", after: "50% (half the cost)" },
        { label: "Cash Flow Visibility", before: "30 days", after: "180 days forward" },
        { label: "Channel Consolidation", before: "4 silos", after: "1 unified picture" },
      ],
      quote: "We were afraid to grow because we couldn't see where the money was going. Now we can see everything.",
      quoteName: "Founder",
      quoteRole: "DTC Brand",
      outcome: "Brand scaled 8x in three years. Every growth decision backed by real-time financial intelligence. Doubled down on ad spend instead of cutting it.",
    },
    
    speedContext: "Peak season waits for no one. We can be live before your next inventory buy.",
    
    ctaHeadline: "Let's find what's hiding in your channels.",
    ctaSubtext: "15 minutes. We'll show you what Shopify and Amazon aren't telling you.",
  },
  
  multi: {
    label: 'Multi-Entity Operations',
    tagline: 'Holding companies, portfolio operators, serial entrepreneurs',
    
    insights: [
      "Multi-entity operators almost always have consolidation gaps hiding real performance across the portfolio.",
      "You're probably making investment decisions on incomplete data — each entity's books don't tell the whole story.",
      "Intercompany transactions, shared services allocation, and entity-level cash flow are where the real story lives.",
      "The complexity tax of managing multiple books often exceeds the cost of doing it right.",
    ],
    hiddenCostHeadline: "You can't see the forest for the trees.",
    hiddenCostDetail: "Each entity has its own books, its own accountant, its own rhythm. But nobody's watching the consolidated picture. Cash moves between entities without tracking. Profitable businesses subsidize struggling ones invisibly. You're running a portfolio blind.",
    
    misdiagnosis: {
      thinkHeadline: "You think Entity C is your problem.",
      actuallyHeadline: "Actually, Entity A has been hiding losses in intercompany transactions.",
      story: `A multi-business operator with 5 entities — restaurants, production company, real estate, a grip company, and an impact AV business ($4-6.5M in market assets) — couldn't explain their cash position to investors.

They suspected fraud in a recent restaurant acquisition. Multiple previous bookkeepers had been incompetent or dishonest. Nobody could see the consolidated picture.

We consolidated everything. What we found: intercompany transfers were hiding **$2.1M in actual margin**. The "profitable" production company was being subsidized by real estate cash flows. Informal loans between entities never got tracked.

They didn't need to sell anything. They needed to **see everything in one place**.`,
      keyInsight: "Hidden intercompany subsidies were masking true performance. Once visible, they closed their Series B six weeks later.",
    },
    
    caseStudy: {
      company: "Diversified Holdings Portfolio",
      industry: "Multi-Entity Operator (5+ businesses)",
      challenge: "Couldn't explain cash position to investors, suspected fraud in acquisitions",
      metrics: [
        { label: "Entities", before: "5+ (siloed)", after: "5+ (consolidated)" },
        { label: "Hidden Margin Found", before: "Unknown", after: "$2.1M identified" },
        { label: "Intercompany Visibility", before: "None", after: "Real-time tracking" },
        { label: "Investor Readiness", before: "Couldn't explain", after: "Series B closed" },
      ],
      quote: "I thought I knew my businesses. I was wrong.",
      quoteName: "Portfolio Operator",
      quoteRole: "Multi-Entity Holdings",
      outcome: "Closed Series B financing six weeks after getting consolidated visibility. Restructured portfolio based on actual performance.",
    },
    
    speedContext: "We've consolidated messier portfolios than yours. Faster than you'd expect.",
    
    ctaHeadline: "Let's see what your entities are hiding from each other.",
    ctaSubtext: "15 minutes. We'll show you the consolidated picture.",
  },
  
  other: {
    label: 'Growth Companies',
    tagline: 'Scaling businesses across industries',
    
    insights: [
      "Companies at your stage typically find 3-5 margin leaks when they finally get visibility.",
      "The problem usually isn't the business — it's that your financial infrastructure hasn't kept up with growth.",
      "Most founders underestimate how much their own time costs the business (usually $200-500/hr in opportunity cost).",
      "The gap between 'good enough' accounting and 'growth-ready' accounting is where money disappears.",
    ],
    hiddenCostHeadline: "Your accounting grew up, but your infrastructure didn't.",
    hiddenCostDetail: "You started with QuickBooks and a part-time bookkeeper. Now you're a real company, but you're still running on startup infrastructure. The gap is where money, time, and opportunity disappear.",
    
    misdiagnosis: {
      thinkHeadline: "You think you need to hire a controller.",
      actuallyHeadline: "Actually, you need a full department — for less than what you'd pay that controller.",
      story: `A $70M production company was spending $15K/month on a controller who was drowning. Balls were dropping. Reports were late. The founder was back to doing bookkeeping at midnight.

We replaced the solo controller with a full team: controller, accounting manager, senior accountant, staff accountant, and clerk. All managed. All guaranteed.

The cost? Less than they were paying before. The coverage? Five people instead of one overwhelmed hire.`,
      keyInsight: "They went from -5% EBITDA to +8% EBITDA. $12M in liability reduction. And the founder stopped doing bookkeeping.",
    },
    
    caseStudy: {
      company: "Production Company",
      industry: "Media Production",
      challenge: "$70M company with controller drowning, founder doing bookkeeping",
      metrics: [
        { label: "EBITDA", before: "-5%", after: "+8%" },
        { label: "Liabilities Reduced", before: "Baseline", after: "$12M reduction" },
        { label: "Founder Time on Finance", before: "10+ hrs/week", after: "0 hrs/week" },
        { label: "Team Coverage", before: "1 controller", after: "Full 5-person department" },
      ],
      quote: "I got my nights back. And my margins.",
      quoteName: "CEO",
      quoteRole: "Production Company",
      outcome: "Company went from near-crisis to healthy growth. The founder focused on deals instead of books.",
    },
    
    speedContext: "We move fast because we've done this before. A lot.",
    
    ctaHeadline: "Let's see what a real finance department could do for you.",
    ctaSubtext: "15 minutes. No pitch. Just clarity.",
  },
};

export function getIndustryContent(industry: string): IndustryContent {
  return INDUSTRY_CONTENT[industry] || INDUSTRY_CONTENT.other;
}
