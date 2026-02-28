import type { QuizState } from './quizData';
import { INDUSTRY_LABELS } from './quizData';

export interface RoutingProfile {
  tier: 'a' | 'b' | 'c';
  painLevel: 'high' | 'medium' | 'low';
  urgency: 'high' | 'medium' | 'low';
  caseStudyRoute: 'vfx' | 'cpa' | 'apparel' | 'production';
  industryLabel: string;
  maturityScore: number;
}

export function buildRoutingProfile(state: QuizState): RoutingProfile {
  const { answers, tags } = state;
  
  // Determine tier based on entity count and pain signals
  let tier: 'a' | 'b' | 'c' = 'c';
  if (tags.includes('entities:many') || tags.includes('entities:several')) {
    tier = 'a';
  } else if (tags.includes('entities:few') && (tags.includes('pain:trust') || tags.includes('pain:visibility'))) {
    tier = 'b';
  }
  
  // Determine pain level
  let painLevel: 'high' | 'medium' | 'low' = 'low';
  const highPainTags = ['books:far-behind', 'books:never', 'pain:trust', 'consequence:direct', 'time:excessive'];
  const medPainTags = ['books:behind', 'books:unsure', 'pain:founder-time', 'consequence:indirect', 'time:significant'];
  
  const highPainCount = tags.filter(t => highPainTags.includes(t)).length;
  const medPainCount = tags.filter(t => medPainTags.includes(t)).length;
  
  if (highPainCount >= 2) painLevel = 'high';
  else if (highPainCount >= 1 || medPainCount >= 2) painLevel = 'medium';
  
  // Determine urgency
  let urgency: 'high' | 'medium' | 'low' = 'low';
  if (tags.includes('consequence:direct') || (tags.includes('books:far-behind') && tags.includes('pain:trust'))) {
    urgency = 'high';
  } else if (tags.includes('consequence:indirect') || tags.includes('consequence:worried')) {
    urgency = 'medium';
  }
  
  // Route to case study based on industry
  let caseStudyRoute: 'vfx' | 'cpa' | 'apparel' | 'production' = 'production';
  if (answers.industry === 'entertainment') {
    caseStudyRoute = 'vfx';
  } else if (answers.industry === 'multi' || tags.includes('entities:many')) {
    caseStudyRoute = 'cpa';
  } else if (answers.industry === 'ecommerce') {
    caseStudyRoute = 'apparel';
  }
  
  // Industry label for personalization
  const industryLabel = INDUSTRY_LABELS[answers.industry] || 'your industry';
  
  // Calculate maturity score (0-100)
  const maturityScore = calculateMaturityScore(tags);
  
  return {
    tier,
    painLevel,
    urgency,
    caseStudyRoute,
    industryLabel,
    maturityScore,
  };
}

function calculateMaturityScore(tags: string[]): number {
  let score = 60; // Start slightly above midpoint - assume baseline competence
  
  // Books status (MAJOR factor - biggest swing)
  if (tags.includes('books:current')) score += 30;
  else if (tags.includes('books:behind')) score -= 15;
  else if (tags.includes('books:far-behind')) score -= 30;
  else if (tags.includes('books:never')) score -= 40;
  else if (tags.includes('books:unsure')) score -= 25;
  
  // Entity complexity (significant factor)
  if (tags.includes('entities:single')) score += 15;
  else if (tags.includes('entities:few')) score += 5;
  else if (tags.includes('entities:several')) score -= 15;
  else if (tags.includes('entities:many')) score -= 25;
  
  // Pain signals (additive - multiple pains stack)
  if (tags.includes('pain:trust')) score -= 20;
  if (tags.includes('pain:visibility')) score -= 15;
  if (tags.includes('pain:founder-time')) score -= 15;
  if (tags.includes('pain:overwhelm')) score -= 20;
  if (tags.includes('pain:cost')) score -= 5;
  if (tags.includes('pain:systems')) score -= 10;
  
  // Consequences (major impact)
  if (tags.includes('consequence:direct')) score -= 20;
  else if (tags.includes('consequence:indirect')) score -= 10;
  else if (tags.includes('consequence:worried')) score -= 5;
  else if (tags.includes('consequence:none')) score += 10;
  
  // Time spent (reflects operational health)
  if (tags.includes('time:delegated')) score += 20;
  else if (tags.includes('time:some')) score -= 5;
  else if (tags.includes('time:significant')) score -= 15;
  else if (tags.includes('time:excessive')) score -= 25;
  
  // Clamp to 5-95 (never show perfect 0 or 100)
  return Math.max(5, Math.min(95, score));
}

export function buildQueryString(state: QuizState, profile: RoutingProfile): string {
  const params = new URLSearchParams({
    industry: state.answers.industry || '',
    entities: state.answers.entityCount || '',
    books: state.answers.booksStatus || '',
    frustration: state.answers.frustration || '',
    opportunity: state.answers.opportunity || '',
    time: state.answers.personalTime || '',
    firstName: state.contact.firstName,
    email: state.contact.email,
    company: state.contact.company,
    tier: profile.tier,
    pain: profile.painLevel,
    urgency: profile.urgency,
    caseStudy: profile.caseStudyRoute,
    score: profile.maturityScore.toString(),
  });
  
  return params.toString();
}
