# New Questions Proposal for Route One V2 Quiz

> **Purpose:** Deepen the diagnostic with 5 additional qualifying questions that improve personalization, targeting, and the power of findings.
> 
> **Source Data:** 
> - 44 Route One sales conversation transcripts
> - Apex VFX case study ($15M studio, $3.4M hidden EBITDA discovered)
> - CPA case study (20+ entities, 70-80% time reduction)
> - NEPQ sales psychology framework
> - Sales Intelligence Review (12 pain points, 7 objection patterns, 6 close triggers)

---

## Summary: Questions Aligned to Real Pain Points

| Question | Pain Point Surfaced | Frequency in Sales Calls |
|----------|---------------------|--------------------------|
| Trust & Past Experience | "Suspected fraud / financial trust deficit" | ~15% of prospects |
| Current Team Structure | "Bloated/expensive accounting team" | Tier A conversations |
| Capital Activity | "Can't get financing because books are late" | #2 door-opener |
| System Experience | "Failed system implementations" | New discovery |
| Decision Timeline | "I need to think about it" objection | ~15% objection rate |

---

## Question 1: Trust & Past Experience

**The Question:**
Have you ever had a bad experience with an accountant or bookkeeper?

**Answer Options:**
- Option A: Yes — incompetent or dishonest work that cost us
- Option B: Yes — they just didn't deliver what we needed
- Option C: Not really — but I'm not fully confident in my current setup
- Option D: No — my current setup works fine

**What This Reveals:**

From the Sales Intelligence Review (Pain Point #10 - New Discovery):
> *"Previous accountants who were incompetent or dishonest. The emotional charge is enormous — people who've been burned want someone they can trust. Route One's Big Four pedigree is the antidote."*

This surfaces:
- **Trust trauma** — Burned prospects are highly motivated but need more reassurance
- **Current satisfaction** — "Works fine" responses may be lower-priority
- **Emotional readiness** — Past disappointment creates urgency that logic-based questions miss

**How It Enhances The Diagnostic:**

Creates an emotional mirror moment in results: 

> "You told us you've been burned before. That's why we built Route One with Big Four training standards, 100% US-based management, and our 'no assholes' policy. We fire clients too — because trust goes both ways."

This directly addresses the **Close Trigger #3** from sales analysis: *"The Team Introduction — When Mitch, Dean, or John's credentials surface naturally — PwC, Deloitte, $150M raises, $300M exits — it creates immediate credibility."*

**Integration Point:**
Insert after `booksStatus` (Question 3), before `frustration`. By this point we know their situation; now we probe the emotional layer.

**Tag System:**
- `trust:burned-badly` → -25 score, HIGH urgency, trust-heavy copy path
- `trust:disappointed` → -10 score, medium urgency  
- `trust:uncertain` → -5 score, opportunity for reassurance
- `trust:satisfied` → +10 score, may be lower-intent

**Micro-copy:**
- "Incompetent or dishonest" → *"You're not alone. That's why we're different."*
- "Didn't deliver" → *"Let's change that."*

---

## Question 2: Current Team Structure

**The Question:**
Who handles your day-to-day accounting right now?

**Answer Options:**
- Option A: In-house controller or CFO
- Option B: In-house bookkeeper or accounting staff
- Option C: External firm or CPA
- Option D: Multiple people doing different pieces
- Option E: Mostly me, when I have time

**What This Reveals:**

This maps to multiple sales intelligence findings:

**Pain Point #3 (Confirmed):** *"Bloated / expensive accounting team — Especially in Tier A conversations. The 'paying domestic rates for bookkeeper-level output' angle lands every time."*

**Pain Point #8 (Confirmed):** *"Founders wasting their own time — Doing $15/hour bookkeeping work when they should be running the business."*

**Close Trigger #4:** *"Flexible Pricing & Payment Terms — Route One's willingness to structure fees around cash flow is a massive differentiator."*

From the CPA case study:
> "CPA Time Reduction: 70-80% — Backend bookkeeping shifted from a bottleneck to a reliable, scalable support function."

**How It Enhances The Diagnostic:**

Enables highly specific ROI messaging:

| Current Setup | Results Page Message |
|---------------|---------------------|
| Controller/CFO | "You're paying controller wages. Here's what a full managed department costs — usually less." |
| Bookkeeper | "You're paying for execution. We add oversight, strategy, and scale — often for the same cost." |
| External firm | "Your firm is doing the work. Route One manages the work and does the strategy. Different model." |
| Multiple people | "Fragmented ownership = gaps. Here's how companies like yours consolidated." |
| Mostly me | "At your level, you're paying yourself $15/hour to do bookkeeping. Let's stop that." |

This also powers the **Savings Calculator** with actual current-state context.

**Integration Point:**
Insert as Question 2 (after industry). Understanding current setup before probing pain makes subsequent questions more contextual.

**Tag System:**
- `team:controller` → +10 score, Tier A prospect, strategic upgrade pitch
- `team:bookkeeper` → neutral, scaling conversation
- `team:external` → competitor situation, displacement angle
- `team:fragmented` → -10 score, systems pain, consolidation value prop
- `team:founder` → -15 score, founder liberation story

---

## Question 3: Capital Activity

**The Question:**
Are you raising capital, planning an exit, or preparing for audit?

**Answer Options:**
- Option A: Yes — actively in that process now
- Option B: Yes — planning in the next 12 months
- Option C: Possibly — exploring options
- Option D: No — focused on running the business

**What This Reveals:**

**Pain Point #2 (Confirmed, #1 downstream):** *"Can't get financing because books are late — The downstream consequence that creates urgency. Multiple prospects mentioned banks calling lines of credit."*

**Pain Point #12 (New Discovery):** *"Cash flow timing mismatch during growth — Growing but cash is 6 months behind inventory. Factoring, alternative lending, and cash flow forecasting came up repeatedly."*

From Apex VFX case study:
> "Valuation impact: Status Quo $9M vs. Optimized $36M — a $27M gap that only became visible through proper EBITDA normalization."

**How It Enhances The Diagnostic:**

This creates maximum urgency for prospects in active capital processes:

> "You told us you're actively raising. Our last 3 clients who came to us without current books were 4-8 months away from capital readiness. We got them there in 60 days. Here's what we found hiding in their numbers."

For the "possibly" segment, it future-paces the problem:
> "When you do go for capital, here's what banks and investors will ask for — and what it costs when you can't produce it fast."

**Integration Point:**
Replace or enhance current `opportunity` question (Question 5). This is more specific and actionable.

**Tag System:**
- `capital:active` → HIGH urgency, audit-ready messaging, priority lead
- `capital:planning` → Medium urgency, preparation pitch
- `capital:exploring` → Education opportunity, case study focus
- `capital:operations` → Operational efficiency angle, different messaging

---

## Question 4: System History

**The Question:**
Have you ever had a system or software implementation go badly?

**Answer Options:**
- Option A: Yes — burned by technology promises that didn't deliver
- Option B: Yes — we're still dealing with the mess
- Option C: Some bumps, but nothing major
- Option D: No — our systems work well

**What This Reveals:**

**Pain Point #11 (New Discovery):** *"Failed system implementations — Companies burned by technology promises that didn't deliver. Route One's ERP proficiency across QBO, NetSuite, Sage Intacct, SAP is a differentiator: 'we've migrated dozens — we know what breaks.'"*

From the CPA case study:
> "Supported both QBO and QBD environments (including server-based desktop access) — QBO + QBD support signals they work with legacy systems too, not just modern cloud platforms."

**How It Enhances The Diagnostic:**

For the "burned by tech" segment:

> "You've been through a bad implementation. Route One has migrated clients across QBO, NetSuite, Sage Intacct, and SAP. We know what breaks. We've seen every failure mode. That's why we lead with process, not technology."

This addresses **Objection #2 (~30%):** *"How long will this take to implement?"* — prospects who've been through painful transitions are afraid of disruption. The response: *"Route One counters with the 4-phase model and CPA case study speed metrics."*

**Integration Point:**
Insert after `trust` question. Creates a natural sequence: trust issues → system issues → frustration.

**Tag System:**
- `systems:burned` → -15 score, needs migration-confident messaging
- `systems:dealing-with-mess` → -20 score, cleanup + migration opportunity
- `systems:minor` → neutral
- `systems:working` → +5 score, may not need migration support

**Micro-copy:**
- "Burned by technology" → *"You're not a beta tester. We only recommend what we've deployed 50+ times."*
- "Still dealing with the mess" → *"Let's clean it up — we've seen worse."*

---

## Question 5: Decision Timeline & Trigger

**The Question:**
What's driving your timeline on this?

**Answer Options:**
- Option A: A specific deadline — investor meeting, audit, or financing
- Option B: A major decision that needs better data
- Option C: It's becoming urgent — can't ignore it much longer
- Option D: Just exploring options for now
- Option E: Honestly, I've been meaning to fix this for years

**What This Reveals:**

This directly addresses **Objection #3 (~15%):** *"I need to think about it."*

The Sales Intelligence Review notes: *"Route One handles this by staying in the relationship — no push for a close, just maintaining cadence."* But the funnel can pre-segment these prospects.

From the Sales DNA analysis:
> "The Absorption Pattern — Route One listens for 20-30 minutes, asks questions, lets the prospect talk — then says 'Yeah, we do that. Here's how.' The prospect gets absorbed before any proposal is made."

**How It Enhances The Diagnostic:**

Creates urgency-appropriate follow-up:

| Timeline | CTA & Follow-Up |
|----------|-----------------|
| Specific deadline | "You have an investor meeting coming. Here's how companies prepare in [timeframe]." → Priority callback |
| Major decision | "That decision deserves real numbers. Here's what current books reveal." → Case study focus |
| Becoming urgent | "You feel it building. Here's what waiting costs." → Inaction calculator emphasis |
| Exploring | Lower-touch nurture sequence, PDF download path |
| For years | "You've known this was a problem for years. Here's what that delay has cost you." → Emotional hook, long-term cost |

The "for years" answer is powerful because it creates shame-free acknowledgment and a path forward.

**Integration Point:**
Make this the final question before the email gate. By now they're invested — asking about timeline feels natural and helps sales prioritize.

**Tag System:**
- `timeline:external-deadline` → HIGH urgency, immediate follow-up
- `timeline:decision` → Medium urgency, value-focused messaging
- `timeline:building` → Standard urgency, pain-focused
- `timeline:exploring` → Lower priority, nurture sequence
- `timeline:chronic` → Unique messaging, "years of delay" cost calculation

---

## Implementation Recommendations

### Scoring Impact Summary

| Question | Best Tag | Worst Tag | Score Range |
|----------|----------|-----------|-------------|
| Trust | `trust:satisfied` (+10) | `trust:burned-badly` (-25) | -25 to +10 |
| Team | `team:controller` (+10) | `team:founder` (-15) | -15 to +10 |
| Capital | `capital:active` (+15 urgency) | N/A | Urgency flag only |
| Systems | `systems:working` (+5) | `systems:mess` (-20) | -20 to +5 |
| Timeline | `timeline:external` (+15 urgency) | `timeline:exploring` (-5) | -5 to +15 |

### Recommended Implementation Order

**Phase 1 (Add immediately):**
1. **Team Structure** (Question 2) — Highest value for segmentation
2. **Timeline** (Question 5) — Directly filters lead priority

**Phase 2 (After Phase 1 metrics):**
3. **Capital Activity** — Replaces/enhances current `opportunity` question
4. **Trust** — Unlocks emotional messaging path

**Phase 3 (Advanced):**
5. **System History** — For prospects in the "systems pain" segment

### Quiz Length Considerations

Current quiz: 6 questions + email gate = ~90 seconds

With all 5 new questions: 11 questions + email gate = ~3 minutes

**Recommendation:** Add 2 questions maximum in Phase 1 to preserve completion rates. Monitor drop-off, then add more in phases.

### Real Language to Use

From Language Intelligence in Sales Review:

**Use these phrases in questions/answers:**
- "You shouldn't be doing that" → validates founder pain
- "Full department, not a single hire" → reframes comparison
- "We'll get you current" → addresses #1 pain directly
- "Your numbers are telling a story you're not reading" → curiosity + urgency

**Avoid:**
- "Outsourcing" → triggers commodity association
- "Package" or "plan" → feels rigid
- Leading with price → every conversation that started with pricing stalled

---

## Connection to Close Triggers

The new questions directly enable the 6 close triggers identified in sales analysis:

| Close Trigger | Question That Enables It |
|---------------|-------------------------|
| "You understand my business" | Industry + Team Structure → route to specific case study |
| Speed Promise | Timeline → show urgency-appropriate timeline |
| Team Introduction | Trust burned → emphasize Big Four pedigree |
| Flexible Pricing | Team Structure → show cost comparison |
| "Won't have to manage" | Team founder/fragmented → liberation messaging |
| Social Proof | All questions → route to matched proof points |

---

*Created for Route One V2 Quiz Enhancement — Incorporating 44 sales conversations, 12 pain points, and real prospect language*
