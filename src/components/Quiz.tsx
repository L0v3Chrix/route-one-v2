import { useState, useCallback, useEffect } from 'react';
import { QUIZ_QUESTIONS, createInitialState, type QuizState, INDUSTRY_LABELS } from '../lib/quizData';
import { buildRoutingProfile, buildQueryString } from '../lib/quizRouting';
import { submitToSheets } from '../lib/sheets';
import { getUtm, getClickIds } from '../lib/utm';
import { trackEvent } from '../lib/analytics';

const STORAGE_KEY = 'ro_quiz_v2';

function saveState(state: QuizState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, savedAt: Date.now() }));
  } catch {
    // localStorage may be unavailable
  }
}

export default function Quiz() {
  const [state, setState] = useState<QuizState>(createInitialState);
  const [showMicroCopy, setShowMicroCopy] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const isOnQuestions = state.currentStep < totalQuestions;
  const isOnEmailGate = state.currentStep === totalQuestions;
  
  const currentQuestion = isOnQuestions ? QUIZ_QUESTIONS[state.currentStep] : null;

  // Track quiz start on first render
  useEffect(() => {
    if (!hasTrackedStart) {
      trackEvent('quiz_start');
      setHasTrackedStart(true);
    }
  }, [hasTrackedStart]);

  // Track when email gate is shown
  useEffect(() => {
    if (isOnEmailGate) {
      trackEvent('quiz_email_view');
    }
  }, [isOnEmailGate]);

  // Handle answer selection
  const handleAnswer = useCallback((value: string, tag: string, microCopy?: string) => {
    const questionId = QUIZ_QUESTIONS[state.currentStep]?.id;
    
    // Track the answer
    trackEvent('quiz_answer', { question: questionId, answer: value });

    if (microCopy) {
      setShowMicroCopy(microCopy);
      // Delay before advancing
      setTimeout(() => {
        setShowMicroCopy(null);
        setState(prev => {
          const qId = QUIZ_QUESTIONS[prev.currentStep].id;
          const newState = {
            ...prev,
            currentStep: prev.currentStep + 1,
            answers: { ...prev.answers, [qId]: value },
            tags: [...prev.tags, tag],
          };
          saveState(newState);
          return newState;
        });
      }, 1500);
    } else {
      setState(prev => {
        const qId = QUIZ_QUESTIONS[prev.currentStep].id;
        const newState = {
          ...prev,
          currentStep: prev.currentStep + 1,
          answers: { ...prev.answers, [qId]: value },
          tags: [...prev.tags, tag],
        };
        saveState(newState);
        return newState;
      });
    }
  }, [state.currentStep]);

  // Handle back navigation
  const handleBack = useCallback(() => {
    if (state.currentStep <= 0) return;
    
    trackEvent('quiz_back');
    
    setState(prev => {
      const prevQuestionId = QUIZ_QUESTIONS[prev.currentStep - 1]?.id;
      const prevAnswer = prev.answers[prevQuestionId];
      const prevTag = QUIZ_QUESTIONS[prev.currentStep - 1]?.answers.find(a => a.value === prevAnswer)?.tag;
      
      return {
        ...prev,
        currentStep: prev.currentStep - 1,
        answers: prevQuestionId ? { ...prev.answers, [prevQuestionId]: '' } : prev.answers,
        tags: prevTag ? prev.tags.filter(t => t !== prevTag) : prev.tags,
      };
    });
  }, [state.currentStep]);

  // Handle contact form changes
  const handleContactChange = useCallback((field: keyof QuizState['contact'], value: string) => {
    setState(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const profile = buildRoutingProfile(state);
    const queryString = buildQueryString(state, profile);
    
    // Save final state
    saveState(state);
    
    // Get UTM and click ID attribution
    const utm = getUtm();
    const clicks = getClickIds();
    
    // Get bridge responses from localStorage
    let bridgeResponses: Record<string, string> = {};
    try {
      bridgeResponses = JSON.parse(localStorage.getItem('ro_bridge_responses') || '{}');
    } catch {
      // localStorage may be unavailable or invalid
    }
    
    // Submit to Google Sheets
    await submitToSheets({
      submissionType: 'quiz_complete',
      firstName: state.contact.firstName,
      email: state.contact.email,
      company: state.contact.company,
      industry: state.answers.industry,
      entityCount: state.answers.entityCount,
      booksStatus: state.answers.booksStatus,
      frustration: state.answers.frustration,
      opportunity: state.answers.opportunity,
      personalTime: state.answers.personalTime,
      tier: profile.tier,
      painLevel: profile.painLevel,
      urgency: profile.urgency,
      maturityScore: profile.maturityScore,
      caseStudyRoute: profile.caseStudyRoute,
      industryLabel: INDUSTRY_LABELS[state.answers.industry] || 'your industry',
      bridgeResponses,
      utmSource: utm.utm_source,
      utmMedium: utm.utm_medium,
      utmCampaign: utm.utm_campaign,
      utmContent: utm.utm_content,
      gclid: clicks.gclid,
      fbclid: clicks.fbclid,
    });
    
    // Track completion
    trackEvent('quiz_complete', { 
      industry: state.answers.industry, 
      score: profile.maturityScore 
    });
    
    // Redirect to results
    window.location.href = `/results?${queryString}`;
  }, [state]);

  // Progress dots
  const renderProgress = () => (
    <div className="flex items-center justify-center gap-2 mb-8" role="progressbar" aria-valuenow={state.currentStep + 1} aria-valuemin={1} aria-valuemax={totalQuestions + 1}>
      {Array.from({ length: totalQuestions }).map((_, i) => (
        <div
          key={i}
          role="presentation"
          aria-label={`Question ${i + 1} of ${totalQuestions}${i < state.currentStep ? ' (completed)' : i === state.currentStep ? ' (current)' : ''}`}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            i < state.currentStep
              ? 'bg-ro-green'
              : i === state.currentStep
              ? 'bg-ro-gold'
              : 'bg-ro-card-border'
          }`}
        />
      ))}
      <div className="w-px h-4 bg-ro-card-border mx-1" aria-hidden="true" />
      <div
        role="presentation"
        aria-label={`Contact information${isOnEmailGate ? ' (current)' : ''}`}
        className={`w-2.5 h-2.5 rounded-full ${
          isOnEmailGate ? 'bg-ro-gold' : 'bg-ro-card-border'
        }`}
      />
    </div>
  );

  // Render question
  const renderQuestion = () => {
    if (!currentQuestion) return null;

    return (
      <div className="animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-medium text-ro-text-bright text-center mb-3">
          {currentQuestion.question}
        </h2>
        {currentQuestion.subtext && (
          <p className="text-ro-text-dim text-center mb-8">
            {currentQuestion.subtext}
          </p>
        )}
        
        <div className="space-y-3 max-w-md mx-auto">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.value}
              onClick={() => handleAnswer(answer.value, answer.tag, answer.microCopy)}
              disabled={!!showMicroCopy}
              className="w-full text-left px-5 py-4 min-h-[48px] bg-ro-card border border-ro-card-border rounded-lg hover:border-ro-green hover:bg-ro-card/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ro-dark disabled:opacity-50"
            >
              <span className="text-ro-text-bright">{answer.label}</span>
            </button>
          ))}
        </div>

        {/* Micro-copy feedback */}
        {showMicroCopy && (
          <div className="mt-6 text-center animate-fade-in">
            <p className="text-ro-gold italic">{showMicroCopy}</p>
          </div>
        )}

        {/* Back button */}
        {state.currentStep > 0 && !showMicroCopy && (
          <div className="mt-8 text-center">
            <button
              onClick={handleBack}
              className="text-ro-text-dim hover:text-ro-text transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ro-dark"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    );
  };

  // Render email gate
  const renderEmailGate = () => {
    const industryLabel = INDUSTRY_LABELS[state.answers.industry] || 'your industry';
    
    return (
      <div className="animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-medium text-ro-text-bright text-center mb-3">
          Let's see what this means.
        </h2>
        <p className="text-ro-text-dim text-center mb-8">
          See how companies in <span className="text-ro-gold">{industryLabel}</span> are solving exactly this.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div>
            <label htmlFor="firstName" className="sr-only">First name</label>
            <input
              id="firstName"
              type="text"
              placeholder="First name"
              required
              value={state.contact.firstName}
              onChange={(e) => handleContactChange('firstName', e.target.value)}
              className="w-full px-4 py-3 bg-ro-card border border-ro-card-border rounded-lg text-ro-text-bright placeholder:text-ro-text-dim focus:outline-none focus:ring-2 focus:ring-ro-gold focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Work email</label>
            <input
              id="email"
              type="email"
              placeholder="Work email"
              required
              value={state.contact.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-ro-card border border-ro-card-border rounded-lg text-ro-text-bright placeholder:text-ro-text-dim focus:outline-none focus:ring-2 focus:ring-ro-gold focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="company" className="sr-only">Company name</label>
            <input
              id="company"
              type="text"
              placeholder="Company name"
              required
              value={state.contact.company}
              onChange={(e) => handleContactChange('company', e.target.value)}
              className="w-full px-4 py-3 bg-ro-card border border-ro-card-border rounded-lg text-ro-text-bright placeholder:text-ro-text-dim focus:outline-none focus:ring-2 focus:ring-ro-gold focus:border-transparent"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ro-green hover:bg-ro-green-light text-white font-semibold py-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ro-gold focus:ring-offset-2 focus:ring-offset-ro-dark disabled:opacity-50"
          >
            {isSubmitting ? 'Loading...' : 'Show My Results →'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={handleBack}
            className="text-ro-text-dim hover:text-ro-text transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ro-dark"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-16 md:py-24">
      <div className="w-full max-w-xl">
        {renderProgress()}
        {isOnQuestions ? renderQuestion() : renderEmailGate()}
      </div>
    </div>
  );
}
