import { useState, useCallback, useEffect } from 'react';
import { QUIZ_QUESTIONS, createInitialState, type QuizState, INDUSTRY_LABELS } from '../lib/quizData';
import { buildRoutingProfile, buildQueryString } from '../lib/quizRouting';

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

  const totalQuestions = QUIZ_QUESTIONS.length;
  const isOnQuestions = state.currentStep < totalQuestions;
  const isOnEmailGate = state.currentStep === totalQuestions;
  
  const currentQuestion = isOnQuestions ? QUIZ_QUESTIONS[state.currentStep] : null;

  // Handle answer selection
  const handleAnswer = useCallback((value: string, tag: string, microCopy?: string) => {
    if (microCopy) {
      setShowMicroCopy(microCopy);
      // Delay before advancing
      setTimeout(() => {
        setShowMicroCopy(null);
        setState(prev => {
          const questionId = QUIZ_QUESTIONS[prev.currentStep].id;
          const newState = {
            ...prev,
            currentStep: prev.currentStep + 1,
            answers: { ...prev.answers, [questionId]: value },
            tags: [...prev.tags, tag],
          };
          saveState(newState);
          return newState;
        });
      }, 1500);
    } else {
      setState(prev => {
        const questionId = QUIZ_QUESTIONS[prev.currentStep].id;
        const newState = {
          ...prev,
          currentStep: prev.currentStep + 1,
          answers: { ...prev.answers, [questionId]: value },
          tags: [...prev.tags, tag],
        };
        saveState(newState);
        return newState;
      });
    }
  }, []);

  // Handle back navigation
  const handleBack = useCallback(() => {
    if (state.currentStep <= 0) return;
    
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
    
    // Optional: Send to Google Sheets here
    // await submitToSheets(state, profile);
    
    // Redirect to results
    window.location.href = `/results?${queryString}`;
  }, [state]);

  // Progress dots
  const renderProgress = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalQuestions }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            i < state.currentStep
              ? 'bg-ro-green'
              : i === state.currentStep
              ? 'bg-ro-gold'
              : 'bg-ro-card-border'
          }`}
        />
      ))}
      <div className="w-px h-4 bg-ro-card-border mx-1" />
      <div
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
        <h2 className="text-2xl sm:text-3xl font-bold text-ro-text-bright text-center mb-3">
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
              className="w-full text-left px-5 py-4 bg-ro-card border border-ro-card-border rounded-lg hover:border-ro-green hover:bg-ro-card/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ro-gold disabled:opacity-50"
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
              className="text-ro-text-dim hover:text-ro-text transition-colors text-sm"
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
        <h2 className="text-2xl sm:text-3xl font-bold text-ro-text-bright text-center mb-3">
          Let's see what this means.
        </h2>
        <p className="text-ro-text-dim text-center mb-8">
          See how companies in <span className="text-ro-gold">{industryLabel}</span> are solving exactly this.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div>
            <input
              type="text"
              placeholder="First name"
              required
              value={state.contact.firstName}
              onChange={(e) => handleContactChange('firstName', e.target.value)}
              className="w-full px-4 py-3 bg-ro-card border border-ro-card-border rounded-lg text-ro-text-bright placeholder:text-ro-text-dim focus:outline-none focus:ring-2 focus:ring-ro-gold focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Work email"
              required
              value={state.contact.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-ro-card border border-ro-card-border rounded-lg text-ro-text-bright placeholder:text-ro-text-dim focus:outline-none focus:ring-2 focus:ring-ro-gold focus:border-transparent"
            />
          </div>
          <div>
            <input
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
            className="text-ro-text-dim hover:text-ro-text transition-colors text-sm"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        {renderProgress()}
        {isOnQuestions ? renderQuestion() : renderEmailGate()}
      </div>
    </div>
  );
}
