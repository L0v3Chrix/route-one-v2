# NEW QUESTIONS PROPOSAL — Route One V2

> **Purpose:** Enhance the diagnostic with 3-5 additional lead-in questions  
> **Context:** Current quiz has 6 questions focusing on industry, entities, books status, frustration, opportunity cost, and personal time  
> **Goal:** Deepen personalization and reveal actionable insights

---

## Proposed New Questions

### Question A: Growth Stage
**Where are you in your growth journey?**

| Answer | Tag | What It Reveals |
|--------|-----|-----------------|
| Pre-revenue / early stage | `stage:early` | Needs systems setup, not cleanup |
| $1M–$5M | `stage:emerging` | Outgrowing founder-led finance |
| $5M–$25M | `stage:growth` | Prime Route One target — complexity hitting |
| $25M–$100M | `stage:scale` | Enterprise needs, possible carve-out candidate |
| $100M+ | `stage:enterprise` | Strategic CFO + full team placement |

**How it improves personalization:**
- Calibrates case study selection (early stage sees different stories than $50M operators)
- Adjusts inaction calculator baseline assumptions
- Routes to appropriate messaging (setup vs. cleanup vs. optimization)
- Helps Dean prioritize leads by fit

**Placement:** After industry, before entities

---

### Question B: Decision Timeline
**What's driving your timeline for fixing this?**

| Answer | Tag | What It Reveals |
|--------|-----|-----------------|
| Actively looking for a solution right now | `timeline:urgent` | Hot lead — expedite |
| Planning to address it this quarter | `timeline:quarter` | Warm lead — nurture quickly |
| Exploring options for later this year | `timeline:year` | Longer sales cycle — drip content |
| Just gathering information | `timeline:research` | Cold lead — add to list, don't chase |
| A specific event is forcing this (audit, investor, sale) | `timeline:event-driven` | Very hot — mention in email to Dean |

**How it improves personalization:**
- Allows Dean to prioritize callbacks
- Triggers urgency messaging for event-driven prospects
- Filters tire-kickers from serious inquiries
- Adjusts CTA tone (immediate action vs. gentle follow-up)

**Placement:** After opportunity, before personal time (or as final question before email gate)

---

### Question C: Current Team Structure
**Who handles your finance operations today?**

| Answer | Tag | What It Reveals |
|--------|-----|-----------------|
| I do it all myself | `team:founder-only` | Founder liberation story resonates |
| Part-time bookkeeper | `team:part-time` | Scaling conversation needed |
| Full-time accountant or bookkeeper | `team:ft-accountant` | Replacement/augmentation angle |
| Controller or accounting manager | `team:controller` | Strategic upgrade pitch |
| Outsourced firm or CPA | `team:outsourced` | Competitive displacement opportunity |
| Some combination of the above | `team:mixed` | Consolidation value prop |

**How it improves personalization:**
- Tailors the "full department for less than one hire" messaging
- Identifies competitive situations (displacing existing providers)
- Calibrates expected savings/value messaging
- Adjusts case study selection (founder → founder story, etc.)

**Placement:** After books status, before frustration

---

### Question D: Capital Activity
**Are you actively raising capital, planning an exit, or preparing for audit?**

| Answer | Tag | What It Reveals |
|--------|-----|-----------------|
| Yes, actively | `capital:active` | High urgency, audit-ready messaging |
| Planning in the next 12 months | `capital:planning` | Preparation urgency |
| Possibly, but not certain | `capital:maybe` | Education opportunity |
| No, focused on operations | `capital:operations` | Operational efficiency angle |

**How it improves personalization:**
- Triggers capital-readiness messaging in results
- Adjusts case study priority (Series B close, acquisition support)
- Identifies high-value deals (capital events = larger engagement potential)
- Adds context for Dean's qualification call

**Placement:** After opportunity (replace or enhance the "cost you an opportunity" question)

---

### Question E: Decision Authority
**When you decide to make a change, how does that typically happen?**

| Answer | Tag | What It Reveals |
|--------|-----|-----------------|
| I make the call | `decision:solo` | Direct sales conversation |
| I recommend, someone else approves | `decision:influencer` | May need stakeholder messaging |
| Committee or board decision | `decision:committee` | Enterprise sales process |
| Partner/spouse involved | `decision:partner` | B2B-adjacent dynamics |

**How it improves personalization:**
- Adjusts CTA (book solo call vs. "send this to your CFO")
- Identifies enterprise sales cycles early
- Helps Dean prepare for the right conversation
- Could trigger "share this report" functionality

**Placement:** Final question before email gate

---

## Recommended Implementation Priority

| Priority | Question | Impact | Effort |
|----------|----------|--------|--------|
| 1 | Growth Stage (A) | High — calibrates entire experience | Low |
| 2 | Current Team (C) | High — tailors value prop | Low |
| 3 | Decision Timeline (B) | Medium — improves lead scoring | Low |
| 4 | Capital Activity (D) | Medium — identifies high-value leads | Low |
| 5 | Decision Authority (E) | Low — enterprise edge case | Medium |

---

## Implementation Notes

1. **Quiz Length Consideration:** Current 6 questions + email gate takes ~90 seconds. Adding 2 questions keeps it under 2 minutes. Adding all 5 pushes to ~2.5 minutes — may reduce completion rates.

2. **Recommended First Pass:** Add Questions A (Growth Stage) and C (Current Team) — highest personalization impact for minimal length increase.

3. **Routing Logic Updates:** New tags would need to be integrated into:
   - `quizRouting.ts` — maturity score calculation
   - `industryContent.ts` — case study selection
   - `DynamicResults.tsx` — narrative assembly
   - `sheets.ts` — data capture schema

4. **Email Notification Enhancement:** New fields would improve Dean's context:
   ```
   Revenue Stage: $5M–$25M
   Current Team: Controller
   Timeline: Planning this quarter
   ```

5. **A/B Testing Opportunity:** Could test 6-question vs. 8-question version to measure completion rate impact.

---

## Questions NOT Recommended

| Question | Reason to Avoid |
|----------|-----------------|
| "What's your budget?" | Against NEPQ principles; makes it feel salesy |
| "What software do you use?" | Too granular; save for discovery call |
| "What's your biggest goal?" | Too abstract; current questions reveal this |
| "How did you hear about us?" | Save for attribution (UTM captures this) |

---

*Proposal ready for client review. Implementation requires ~2-4 hours of routing logic updates per question added.*
