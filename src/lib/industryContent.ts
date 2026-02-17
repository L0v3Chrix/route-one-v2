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
      story: `A VFX studio came to us ready to lay off half their team. Their EBITDA had compressed from 22% to 4%. They were convinced the business was dying.

We spent three weeks in their data. What we found: **Reported EBITDA was $0.6M. Actual EBITDA was $4.0M.**

The $3.4M gap? Strategic investments coded as expenses. Pricing discipline erosion nobody was tracking. Productivity leaks across 84 FTEs. One-time costs mixed into operating expenses.

They didn't need a turnaround. They needed **visibility**.`,
      keyInsight: "Every 1% discount they gave was costing them $300K annually. They were throwing around 5% discounts like it was nothing.",
    },
    
    caseStudy: {
      company: "Project Apex VFX",
      industry: "Visual Effects Studio",
      challenge: "EBITDA compressed from 22% to 4%, leadership considering major layoffs",
      metrics: [
        { label: "Reported EBITDA", before: "$0.6M", after: "$4.0M (adjusted)" },
        { label: "Valuation", before: "$9M (status quo)", after: "$36M (optimized)" },
        { label: "Hidden Margin", before: "Unknown", after: "$3.4M identified" },
        { label: "Pricing Leakage", before: "49% discount rate", after: "Identified $789K annual impact" },
      ],
      quote: "We thought we needed to cut. They showed us we needed to see.",
      quoteName: "Studio Principal",
      quoteRole: "VFX Studio",
      outcome: "Company pivoted from planning layoffs to planning expansion. The only thing that changed was what they could see.",
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
      "Multi-partner practices have hidden cash flow timing issues that surface during growth or transition.",
    ],
    hiddenCostHeadline: "You're billing for hours but missing the margins.",
    hiddenCostDetail: "Professional services profitability lives in the details: utilization rates, realization rates, practice area margins, partner allocations. Most firms track revenue but not the profitability drivers underneath.",
    
    misdiagnosis: {
      thinkHeadline: "You think you need more clients.",
      actuallyHeadline: "Actually, you need better visibility into the clients you have.",
      story: `A CPA practice with 20+ entities and 100+ accounts was drowning in work but couldn't explain why profits weren't keeping pace with revenue.

We found the problem wasn't volume — it was margin erosion. Low-value clients consuming high-value staff time. Realization rates varying wildly across practice areas. Partner time leaking into administrative work.

Within 90 days, we helped them identify which clients were profitable and which were destroying value. They didn't need more work. They needed to **see which work mattered**.`,
      keyInsight: "They reduced hands-on bookkeeping time by 70-80% while actually improving accuracy.",
    },
    
    caseStudy: {
      company: "Regional CPA Practice",
      industry: "Accounting & Advisory",
      challenge: "Managing 20+ entities and 100+ accounts with no consolidated view",
      metrics: [
        { label: "Hands-on Time", before: "100%", after: "20-30% (70-80% reduction)" },
        { label: "Entities Managed", before: "20+", after: "20+ (same, but visible)" },
        { label: "Accounts Reconciled", before: "100+", after: "100+ (automated)" },
        { label: "Partner Admin Time", before: "15+ hrs/week", after: "2-3 hrs/week" },
      ],
      quote: "We finally know which clients make us money and which ones cost us.",
      quoteName: "Managing Partner",
      quoteRole: "CPA Practice",
      outcome: "Partners reclaimed strategic time. The practice grew 30% the following year by focusing on profitable work.",
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
      "Multi-channel selling (Shopify + Amazon + TikTok + Walmart) fragments your financial picture.",
      "We've seen brands discover they're profitable when they thought they were losing money — and vice versa.",
    ],
    hiddenCostHeadline: "Your P&L is lying to you.",
    hiddenCostDetail: "E-commerce accounting is uniquely broken. You buy inventory months before you sell it. Platform fees hit at different times. Returns mess up your numbers. COGS is a guess. By the time your books close, the moment has passed.",
    
    misdiagnosis: {
      thinkHeadline: "You think you have a cash flow problem.",
      actuallyHeadline: "Actually, you have a timing visibility problem.",
      story: `An apparel brand scaling from $6M to $50M thought they were bleeding cash. Every growth push felt like a crisis. They were considering slowing down.

We rebuilt their financial picture around cash flow timing, not GAAP accounting. What we found: they were actually **more profitable** during growth phases, but the cash lag from 6-month China lead times made it invisible.

They didn't have a profitability problem. They had a **visibility problem** that was making them afraid of their own success.`,
      keyInsight: "They cut financial operations cost by 50% while scaling 8x. The constraint was never money — it was sight.",
    },
    
    caseStudy: {
      company: "DTC Apparel Brand",
      industry: "E-commerce / Consumer Goods",
      challenge: "Scaling from $6M to $50M+ with no visibility into true profitability",
      metrics: [
        { label: "Revenue", before: "$6M", after: "$50M+" },
        { label: "Finance Ops Cost", before: "100%", after: "50% (half the cost)" },
        { label: "Cash Flow Visibility", before: "30 days", after: "180 days forward" },
        { label: "Decision Confidence", before: "Guessing", after: "Data-driven" },
      ],
      quote: "We were afraid to grow because we couldn't see where the money was going. Now we can see everything.",
      quoteName: "Founder",
      quoteRole: "DTC Brand",
      outcome: "Brand scaled 8x in three years. Every growth decision backed by real-time financial intelligence.",
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
      story: `A multi-business operator with 5 entities — restaurants, production, real estate, a grip company, and retail — couldn't figure out why cash was always tight despite "profitable" businesses.

We consolidated everything. What we found: the restaurant had been subsidizing the production company through informal intercompany loans that never got tracked. The "profitable" production company was actually burning cash. The real estate entity was throwing off cash that disappeared into operational entities.

They didn't need to sell anything. They needed to **see everything in one place** and stop the invisible bleeding.`,
      keyInsight: "Hidden intercompany subsidies were masking a $400K annual loss in what they thought was their strongest business.",
    },
    
    caseStudy: {
      company: "Multi-Business Portfolio",
      industry: "Diversified Holdings",
      challenge: "5+ entities with no consolidated financial picture",
      metrics: [
        { label: "Entities", before: "5+ (siloed)", after: "5+ (consolidated)" },
        { label: "Intercompany Visibility", before: "None", after: "Real-time" },
        { label: "Hidden Subsidies Found", before: "Unknown", after: "$400K+ annually" },
        { label: "Decision Quality", before: "Entity-by-entity", after: "Portfolio-wide" },
      ],
      quote: "I thought I knew my businesses. I was wrong.",
      quoteName: "Portfolio Operator",
      quoteRole: "Multi-Entity Holdings",
      outcome: "Restructured the portfolio based on actual performance. Profitable entities got investment. Unprofitable ones got fixed or sold.",
    },
    
    speedContext: "We've consolidated messier portfolios than yours. Usually faster than you'd expect.",
    
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
