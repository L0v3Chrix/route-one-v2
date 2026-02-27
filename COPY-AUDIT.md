# COPY AUDIT — Route One V2

> **Audit Date:** 2025-02-27  
> **Auditor:** RTV Enhancement Sprint  
> **Purpose:** Grammar, uniformity, and enhancement pass

---

## Summary of Changes

### 1. DiagnosticFindings.tsx
**Issue:** Malformed JSX — empty Framer Motion props left behind after refactor  
**Lines affected:** Multiple `<div>` elements with orphaned `transition={{ delay: x.x }}` props  
**Fix:** Remove orphaned motion props, clean up JSX structure  
**Status:** ✅ Fixed

### 2. InactionCalculator.tsx  
**Issue:** "blindspots" should be "blind spots" (two words per AP style)  
**Line:** 89  
**Original:** `Visibility blindspots`  
**Fixed:** `Visibility blind spots`  
**Status:** ✅ Fixed

### 3. industryContent.ts
**Issue:** Minor inconsistency in case study company naming conventions  
**Lines:** Various  
**Notes:** All company names reviewed — consistent with pattern "Project Apex VFX", "Regional CPA Practice", etc.  
**Status:** ✅ Verified — no changes needed

### 4. DynamicResults.tsx
**Review findings:**
- Narrative copy is personalized and consistent ✓
- NEPQ-aligned (asking, not telling) ✓
- Pain messages appropriately urgent without being pushy ✓
- Industry insights well-sourced ✓
**Status:** ✅ Verified — no changes needed

### 5. DynamicSolution.tsx
**Review findings:**
- Three pillars copy is clear and scannable ✓
- Case study metrics display correctly ✓
- Bridge prompts aligned with spec ✓
- Timeline copy is actionable ✓
**Status:** ✅ Verified — no changes needed

### 6. Quiz.tsx
**Review findings:**
- Question copy is conversational ✓
- Micro-copy adds human touch ✓
- Email gate copy is benefit-focused ✓
**Status:** ✅ Verified — no changes needed

### 7. ReturnVisitorHero.tsx
**Review findings:**
- Return visitor greeting is warm ✓
- CTA is clear ✓
- Retake option is non-judgmental ✓
**Status:** ✅ Verified — no changes needed

### 8. SectionBridge.tsx
**Review findings:**
- Component properly renders prompts ✓
- Follow-up messages are appropriate ✓
**Status:** ✅ Verified — no changes needed

### 9. talk.astro
**Review findings:**
- Team bios are punchy and differentiated ✓
- Credential badges are compelling ✓
- CTA headline aligned with NEPQ principles ✓
- WhatsApp fallback implemented ✓
**Status:** ✅ Verified — no changes needed

### 10. not-ready.astro
**Review findings:**
- Exit path is warm, not guilt-inducing ✓
- Lead magnet offer is valuable ✓
- "When you're ready, we'll be here" is perfect closer ✓
**Status:** ✅ Verified — no changes needed

### 11. quizData.ts
**Review findings:**
- Question flow is logical ✓
- Answer options cover key scenarios ✓
- Tags map correctly to routing ✓
- Micro-copy adds personality without being sarcastic ✓
**Status:** ✅ Verified — no changes needed

---

## Brand Voice Consistency Check

| Element | Requirement | Status |
|---------|-------------|--------|
| Tone | Professional but human | ✅ |
| NEPQ Alignment | Questions > Statements | ✅ |
| No "no pressure" copy | Removed per client | ✅ |
| No pricing mentions | Bespoke messaging | ✅ |
| Trust signals | Credential-based, not claims | ✅ |
| Agency name | "Raize the Vibe" (never "Raised") | N/A (not present in funnel) |

---

## CTA Strength Assessment

| Page | CTA | Current | Assessment |
|------|-----|---------|------------|
| index | Find Out | Direct, curious | ✅ Strong |
| quiz | Show My Results | Benefit-focused | ✅ Strong |
| results | See How Companies Like Yours Solved This | Social proof + curiosity | ✅ Strong |
| solution | Meet the Team Behind It | Human connection | ✅ Strong |
| talk | Email to Schedule / WhatsApp | Clear action paths | ✅ Strong |
| not-ready | Send Me the Checklist | Value exchange | ✅ Strong |

---

## Technical Cleanup

1. **DiagnosticFindings.tsx** — Removed orphaned Framer Motion transition props
2. **InactionCalculator.tsx** — Fixed "blindspots" → "blind spots"

---

## Recommendations for Future Iterations

1. Consider adding "44 client engagements" context earlier in funnel
2. Industry badges on results page could reinforce personalization
3. WhatsApp pre-fill could include score for Dean's context

---

## Known Build Warnings (Non-blocking)

**Font Files:** Graphik-Regular.woff2 and Graphik-Medium.woff2 not present in `/public/fonts/`. This is expected — font falls back to Inter. To resolve, client needs to provide licensed Graphik Trial font files.

---

## Funnel Flow Validation

| Step | Page | Status |
|------|------|--------|
| 1 | `/` (Hero) | ✅ New visitor + Return visitor paths work |
| 2 | `/quiz` | ✅ 6 questions + email gate |
| 3 | `/results` | ✅ QuizTransition → Dashboard flow |
| 4 | `/solution` | ✅ Misdiagnosis → Model → Case Study |
| 5 | `/talk` | ✅ Team → Bridge → CTA → Calendar/WhatsApp |
| 6 | `/not-ready` | ✅ Exit path with lead magnet |

---

*Audit complete. All copy verified for grammar, uniformity, and brand alignment.*
*Build passes. Pushed to Vercel.*
