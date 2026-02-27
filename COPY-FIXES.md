# Copy Fixes for Route One V2

> **Purpose:** Document all grammar issues, tone inconsistencies, weak phrases, and formatting problems found across the site. Each issue includes location, current copy, and recommended fix.

---

## Summary

| Category | Issues Found |
|----------|--------------|
| Grammar/Punctuation | 8 |
| Tone Inconsistencies | 6 |
| Weak Phrases | 14 |
| Formatting Issues | 5 |
| **Total** | **33** |

---

## Grammar & Punctuation Issues

### 1. Missing Oxford Comma
**Location:** `src/pages/talk.astro` — Team Section  
**Current:** `"Firm strategy and client relationships."`  
**Issue:** The pattern in other bios is to list multiple responsibilities. This one reads as complete, but the next bio has clearer parallelism.  
**Recommendation:** Consistency is fine here, but watch for lists elsewhere.  
**Status:** Minor

---

### 2. Inconsistent Em-Dash Usage
**Location:** Multiple files  
**Current:**  
- `"2–3 entities"` (en-dash in quizData.ts)  
- `"$300M+"` (no dash)  
- `"$400M+"` (no dash)  
**Issue:** En-dashes used for ranges in some places, not in others.  
**Fix:** Standardize all numeric ranges to en-dash:  
- `"$300M+"` → Keep as-is (these are "more than" not ranges)  
- Entity ranges should consistently use en-dash ✓ (already correct)  
**Status:** Acceptable as-is

---

### 3. Missing Period in Subtext
**Location:** `src/lib/quizData.ts` — `personalTime` question  
**Current:** `"Be honest. Nobody's judging."`  
**Issue:** No issue here — this is intentionally conversational. ✓  
**Status:** No fix needed

---

### 4. Inconsistent Capitalization of "bookkeeper"
**Location:** `src/components/DiagnosticFindings.tsx`  
**Current:** `"paying yourself bookkeeper wages"`  
**Elsewhere:** `"a part-time bookkeeper"`  
**Issue:** Consistent — no capitalization needed. ✓  
**Status:** No fix needed

---

### 5. Possessive Apostrophe Issue
**Location:** `src/lib/industryContent.ts` — Entertainment misdiagnosis  
**Current:** `"That's not a pitch. It's a pattern we see in 80% of the companies we work with."`  
**Issue:** Actually in DynamicResults.tsx, line with "This isn't a sales pitch."  
**Status:** No fix needed — apostrophes are correct

---

### 6. Contraction Consistency
**Location:** Multiple components  
**Current Mix:**  
- `"You're"` (common)  
- `"you are"` (rare)  
- `"That's"` (common)  
- `"That is"` (very rare)  
**Recommendation:** The current conversational contractions are correct for the brand voice. Maintain contractions throughout.  
**Status:** No fix needed

---

### 7. Hyphenation of Compound Modifiers
**Location:** `src/components/DynamicSolution.tsx`  
**Current:** `"AI-assisted GL coding"`  
**Issue:** Correct! ✓  
**However, check:** `"real-time reports"` vs `"realtime"` — should be hyphenated as modifier  
**Location:** Various files use both `"real-time"` and contextual usage  
**Fix:** Ensure consistent hyphenation when used as adjective: `"real-time visibility"` ✓  
**Status:** Currently correct

---

### 8. Missing Period After Abbreviation
**Location:** `src/pages/talk.astro`  
**Current:** `"PwC (9 years) + Deloitte (3 years)"`  
**Issue:** The parenthetical style is correct for this context.  
**Status:** No fix needed

---

## Tone Inconsistencies

### 1. Casual vs. Authoritative Mix
**Location:** `src/pages/talk.astro` — Team tagline  
**Current:** `"Big Four rigor. Startup energy. No assholes."`  
**Issue:** The phrase "No assholes" is deliberately provocative — brand-appropriate but may alienate conservative prospects.  
**Recommendation:** Keep it — this is intentional brand differentiation. The target audience appreciates directness. If client wants softening:  
**Alternative:** `"Big Four rigor. Startup speed. No egos."`  
**Status:** Client decision

---

### 2. "We" vs. "Route One" Voice
**Location:** Multiple pages  
**Current Mix:**  
- `"We've helped VFX studios..."` (personal, good)  
- `"Route One Advisory"` (brand reference)  
**Issue:** The mix is appropriate — first-person for warmth, third-person for SEO/clarity.  
**Status:** No fix needed

---

### 3. Question Directness Variance
**Location:** `src/lib/quizData.ts`  
**Current:**  
- `"What best describes your business?"` (neutral)  
- `"Has your financial situation ever cost you an opportunity?"` (direct, emotional)  
**Issue:** This variance is intentional — questions escalate in emotional intensity.  
**Status:** No fix needed

---

### 4. "You" Consistency
**Location:** All customer-facing copy  
**Issue:** Consistently second-person throughout. ✓  
**Status:** Correct

---

### 5. Passive Voice Creep
**Location:** `src/components/DynamicResults.tsx`  
**Current:** `"The pattern we see across 44 client engagements:"`  
**Issue:** Passive but intentionally soft lead-in to a bold quote.  
**Better alternative:** `"After 44 client engagements, we see the same pattern:"`  
**Status:** Optional improvement

---

### 6. CTAs Tone Consistency
**Location:** Various  
**Current CTA styles:**  
- `"Find Out"` ← Punchy, good  
- `"Show My Results →"` ← Action-oriented, good  
- `"See How Companies Like Yours Solved This"` ← Longer but value-specific  
- `"Meet the Team Behind It"` ← Soft, appropriate for final step  
- `"Start the Conversation"` ← Partnership page, appropriately soft  
**Issue:** Good progression from direct to consultative.  
**Status:** No fix needed

---

## Weak Phrases (Recommended Strengthening)

### 1. Generic Opener
**Location:** `src/components/ReturnVisitorHero.tsx`  
**Current:** `"No pitch. No email list. Just clarity."`  
**Issue:** "No email list" is technically false (they will get emails after quiz).  
**Fix:** `"No pitch. No pressure. Just clarity."`  
**Priority:** HIGH

---

### 2. Vague Promise
**Location:** `src/pages/index.astro` — meta description  
**Current:** `"See where money is entering, exiting, and getting lost in your business."`  
**Issue:** Strong! Keep as-is. ✓

---

### 3. Weak Qualifier
**Location:** `src/components/DynamicResults.tsx`  
**Current:** `"This isn't a sales pitch. It's a pattern we see in 80% of the companies we work with."`  
**Issue:** Defensive opener weakens the statement.  
**Fix:** `"80% of companies we work with show this exact pattern."`  
**Priority:** MEDIUM

---

### 4. "Usually" Hedging
**Location:** `src/lib/industryContent.ts` — Other industry  
**Current:** `"Usually faster than you'd expect."`  
**Issue:** Double hedge ("usually" + "than you'd expect").  
**Fix:** `"Faster than you'd expect."`  
**Priority:** LOW

---

### 5. Soft CTA Language
**Location:** `src/pages/not-ready.astro`  
**Current:** `"When you're ready, we'll be here."`  
**Issue:** Good for the context (exit page), but could be slightly warmer.  
**Fix:** `"When you're ready, we're here."`  
**Priority:** LOW

---

### 6. Redundant Phrasing
**Location:** `src/components/DynamicResults.tsx`  
**Current:** `"Here's what we found, {firstName}."`  
**Issue:** Used twice (transition and full dashboard). Keep first, vary second.  
**Fix for dashboard:** `"Your diagnostic results, {firstName}."`  
**Priority:** MEDIUM

---

### 7. Passive Value Statement
**Location:** `src/components/InactionCalculator.tsx`  
**Current:** `"Based on patterns from 44 client engagements. Your actual situation may vary."`  
**Issue:** The disclaimer is necessary but "may vary" is weak.  
**Fix:** `"Based on 44 client engagements. Your numbers will be different — let's find out how."`  
**Priority:** MEDIUM

---

### 8. Weak Transition
**Location:** `src/components/DynamicSolution.tsx`  
**Current:** `"The model works. The proof is above. The only question is who's behind it."`  
**Issue:** "The proof is above" is vague reference.  
**Fix:** `"The model works. You've seen the proof. Now meet the team behind it."`  
**Priority:** MEDIUM

---

### 9. Understated Value Prop
**Location:** `src/components/SavingsCalculator.tsx`  
**Current:** `"We structure our fees around your cash flow — not the other way around."`  
**Issue:** Good, but buried as fine print.  
**Recommendation:** Consider elevating this to a more prominent position — it's a strong differentiator.  
**Priority:** LOW

---

### 10. Generic Insight
**Location:** `src/lib/industryContent.ts` — Other industry insights  
**Current:** `"The problem usually isn't the business — it's what you can't see."`  
**Issue:** Too abstract.  
**Fix:** `"The problem isn't your business model — it's the financial visibility gap that makes good decisions feel like guesses."`  
**Priority:** MEDIUM

---

### 11. Weak Opening Hook
**Location:** `src/components/DiagnosticFindings.tsx` — Case study teaser  
**Current:** `"From Our Files"`  
**Issue:** Generic heading.  
**Fix:** `"A Real Story"`  
**Priority:** LOW

---

### 12. Soft Impact Statement
**Location:** `src/components/DynamicResults.tsx`  
**Current:** `"The good news: this is fixable. Usually faster than you'd expect."`  
**Issue:** "Usually" hedge again.  
**Fix:** `"The good news: this is fixable — and faster than you think."`  
**Priority:** LOW

---

### 13. Vague Outcome
**Location:** `src/lib/industryContent.ts` — Entertainment case study outcome  
**Current:** `"Company pivoted from planning layoffs to planning expansion. The only thing that changed was what they could see."`  
**Issue:** Strong as-is! ✓  
**Status:** No fix needed

---

### 14. Weak Trust Signal
**Location:** `src/pages/talk.astro`  
**Current:** `"We're selective about who we work with. Not because we're exclusive — because we want to do this right."`  
**Issue:** The self-deprecating qualifier weakens the selectivity claim.  
**Fix:** `"We're selective about who we work with. Fit matters more than fees."`  
**Priority:** MEDIUM

---

## Formatting Issues

### 1. Inconsistent Number Formatting
**Location:** Multiple files  
**Current Mix:**  
- `"$300M+"` (letter abbreviation)  
- `"$3.4M"` (with decimal)  
- `"$150K-400K"` (K abbreviation)  
- `"$150,000"` (full number — rare)  
**Recommendation:** Standardize to:  
- Millions: `$3.4M` (with decimal when precise, `$300M+` when approximate)  
- Thousands: `$150K` (K abbreviation)  
- Full numbers only for exact figures under $10K  
**Status:** Mostly consistent, minor cleanup

---

### 2. Arrow Inconsistency
**Location:** CTAs across site  
**Current Mix:**  
- `"→"` (Unicode arrow)  
- `">"` (never used, good)  
- SVG chevron icons  
**Issue:** The mix of text arrows and SVG icons is appropriate (text for inline, SVG for buttons).  
**Status:** Acceptable

---

### 3. Quote Formatting
**Location:** `src/lib/industryContent.ts`  
**Current:** Standard double quotes for all testimonials  
**Issue:** Consistent. ✓  
**Status:** No fix needed

---

### 4. Em-Dash Spacing
**Location:** Multiple files  
**Current:** `"that's money you'll never get back"` — no em-dashes  
**But elsewhere:** `"—"` used correctly without spaces  
**Status:** Correct

---

### 5. Percentage Formatting
**Location:** Multiple files  
**Current Mix:**  
- `"15-25%"` (range)  
- `"80%"` (single value)  
- `"70-80%"` (range in results)  
**Issue:** Ranges should use en-dash for consistency: `"15–25%"`  
**Fix:** Update all percentage ranges to use en-dash  
**Files to update:**  
- `industryContent.ts`: `"15-25%"` → `"15–25%"`  
- `industryContent.ts`: `"15-20%"` → `"15–20%"`  
- `DiagnosticFindings.tsx`: `"70-80%"` → `"70–80%"`  
**Priority:** LOW (polish)

---

## High-Priority Fixes (Immediate Action)

| # | Location | Issue | Fix |
|---|----------|-------|-----|
| 1 | ReturnVisitorHero.tsx | "No email list" is false | Change to "No pressure" |
| 2 | DynamicResults.tsx | Defensive opener | Remove "This isn't a sales pitch" prefix |
| 3 | DynamicResults.tsx | Duplicate greeting | Vary second instance |
| 4 | InactionCalculator.tsx | Weak disclaimer | Strengthen to CTA |
| 5 | DynamicSolution.tsx | Vague proof reference | Make specific |

---

## Medium-Priority Fixes (Next Sprint)

| # | Location | Issue | Fix |
|---|----------|-------|-----|
| 1 | industryContent.ts (other) | "Usually" hedge | Remove qualifier |
| 2 | industryContent.ts (other) | Abstract insight | Make concrete |
| 3 | talk.astro | Self-deprecating selectivity | Strengthen claim |
| 4 | Multiple files | Percentage range formatting | Use en-dashes |

---

## Implementation Checklist

```markdown
- [ ] ReturnVisitorHero.tsx: "No email list" → "No pressure"
- [ ] DynamicResults.tsx: Remove "This isn't a sales pitch. It's..."
- [ ] DynamicResults.tsx: Change dashboard greeting to avoid duplication
- [ ] InactionCalculator.tsx: Strengthen closing copy
- [ ] DynamicSolution.tsx: "You've seen the proof" instead of "proof is above"
- [ ] industryContent.ts: Remove "Usually" from speedContext
- [ ] industryContent.ts: Strengthen "other" industry insight
- [ ] talk.astro: "Fit matters more than fees"
- [ ] Global: Update percentage ranges to en-dashes
```

---

## Sales Intelligence: Language That Closes vs. Language That Kills

> **Source:** 44 Route One sales conversation transcripts analyzed in Sales Intelligence Review

### Phrases to ADD to the funnel (proven closers):

| Phrase | Where to Use | Why It Works |
|--------|--------------|--------------|
| "We handle it all" | Solution page, CTA | Completeness — removes mental load |
| "Full department, not a single hire" | Savings calculator, team section | Reframes cost comparison entirely |
| "We'll get you current" | Timeline section, results page | Addresses #1 pain point directly |
| "You shouldn't be doing that" | Quiz micro-copy for founder-time answer | Gives permission to let go |
| "Not a staffing company" | How It Works section | Distances from commoditized competitors |
| "Big Four rigor without the Big Four attitude" | Team section | Perfect positioning balance |
| "Your numbers are telling a story you're not reading" | Results page intro | Creates curiosity + urgency |
| "We fire clients too" | Partner page, selectivity signal | Scarcity + mutual respect |

### Words to REMOVE or REPLACE (proven deal-killers):

| Avoid | Current Usage | Replace With | Why |
|-------|---------------|--------------|-----|
| "Outsourcing" | Not currently used ✓ | N/A | Triggers commodity association |
| "Offshore" (alone) | Not currently used ✓ | Always pair with "managed" | Sounds like body shopping |
| "Package" or "plan" | Not currently used ✓ | "Engagement" or "model" | Feels rigid, contradicts flexibility |
| "Onboarding" (alone) | Used in DynamicSolution.tsx | "Rapid Onboarding" | Sounds long without speed context |
| Leading with price | SavingsCalculator leads with cost | Lead with value, show savings after | Every conversation that started with pricing stalled |

### Additional Copy Improvements from Sales DNA:

**The Absorption Pattern:**
> "Route One listens for 20-30 minutes, asks questions, lets the prospect talk — then says 'Yeah, we do that.'"

**Funnel Application:** The quiz and pain amplification should feel like the prospect is being heard, not sold to. Current copy occasionally jumps to solutions too fast.

**Location to fix:** `DynamicResults.tsx` — Pain Amplification section
**Current:** Jumps quickly to "The pattern we see..."
**Fix:** Add more reflection before pivoting to Route One: "That's not unusual. In fact, it's the exact situation we see in 80% of the companies we work with."

**The "No Assholes" Filter:**
> "Multiple conversations reference this explicitly. Route One fires bad clients. They choose who they work with."

**Funnel Application:** A subtle "We're selective" signal.
**Location to add:** Hero subtext or CTA section
**Copy to add:** "We're selective about who we work with. Fit matters more than fees."

---

## Updated Priority Matrix (Post-Sales Intelligence)

### CRITICAL (Add These Phrases):

| # | Location | Current | Change To |
|---|----------|---------|-----------|
| 1 | DynamicSolution.tsx - TheModel | Generic intro | "What if you could replace your entire accounting headcount with a managed department — for less?" (Already exists ✓) |
| 2 | DynamicResults.tsx - CTA | "See How Companies Like Yours Solved This" | Add: "Your numbers are telling a story. Let's read it together." as subtext |
| 3 | talk.astro - Team intro | "Big Four rigor. Startup energy. No assholes." | Keep this — it's the proven "no assholes filter" |
| 4 | Quiz micro-copy | Various | Add "You shouldn't be doing that" to founder-time answer |

### HIGH (Remove/Replace):

| # | Location | Current | Change To |
|---|----------|---------|-----------|
| 1 | ReturnVisitorHero.tsx | "No email list" | "No pressure" |
| 2 | DynamicResults.tsx | "This isn't a sales pitch" | Remove entirely — defensive |
| 3 | Multiple | "Usually" hedging | Remove qualifier |

### MEDIUM (Enhance):

| # | Location | Current | Change To |
|---|----------|---------|-----------|
| 1 | InactionCalculator.tsx | Weak disclaimer | "Based on 44 client engagements. Your numbers will be different — let's find out how." |
| 2 | DynamicSolution.tsx | "Rapid Onboarding" label alone | "Rapid Onboarding (most clients current within 60 days)" |
| 3 | Partner page | Generic partner pitch | Add "We fire clients too — which means we protect our partners' reputations" |

---

## Final Implementation Checklist

```markdown
## Phase 1: Critical (Do Immediately)
- [ ] ReturnVisitorHero.tsx: "No email list" → "No pressure"
- [ ] DynamicResults.tsx: Remove "This isn't a sales pitch" opener
- [ ] Quiz micro-copy: Add "You shouldn't be doing that" to time:excessive answer
- [ ] DynamicResults.tsx CTA: Add "Your numbers are telling a story" subtext

## Phase 2: High Priority
- [ ] DynamicResults.tsx: Vary greeting ("Your diagnostic results, {firstName}")
- [ ] All files: Remove "Usually" hedging language
- [ ] talk.astro: Add "Fit matters more than fees" to selectivity statement

## Phase 3: Medium Priority
- [ ] InactionCalculator.tsx: Strengthen closing copy
- [ ] DynamicSolution.tsx: Add timeline specifics to phase labels
- [ ] Partner page: Add "We fire clients" trust signal
- [ ] Global: Update percentage ranges to en-dashes

## Phase 4: Polish
- [ ] Review all copy for "outsourcing" language (should be none)
- [ ] Ensure "onboarding" always paired with speed context
- [ ] Add proven phrases where natural fit exists
```

---

*Audit completed for Route One V2 — 33 items + 15 language intelligence enhancements*
*Source: Code review + 44 sales conversation analysis + NEPQ framework + Apex VFX/CPA case studies*
