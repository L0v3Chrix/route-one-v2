import { useState, useEffect } from 'react';

export interface SectionBridgeProps {
  prompt: string;
  options: { label: string; value: string }[];
  followUp?: Record<string, string>;
  storageKey: string;
  onSelect?: (value: string) => void;
}

export default function SectionBridge({
  prompt,
  options,
  followUp = {},
  storageKey,
  onSelect,
}: SectionBridgeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFollowUp, setShowFollowUp] = useState(false);

  // Load existing response from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ro_bridge_responses');
      if (stored) {
        const responses = JSON.parse(stored);
        if (responses[storageKey]) {
          setSelected(responses[storageKey]);
          setShowFollowUp(true);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [storageKey]);

  const handleSelect = (value: string) => {
    setSelected(value);
    
    // Store in localStorage
    try {
      const stored = localStorage.getItem('ro_bridge_responses');
      const responses = stored ? JSON.parse(stored) : {};
      responses[storageKey] = value;
      localStorage.setItem('ro_bridge_responses', JSON.stringify(responses));
    } catch {
      // Ignore localStorage errors
    }

    // Trigger callback
    onSelect?.(value);

    // Show follow-up after brief delay
    setTimeout(() => setShowFollowUp(true), 300);
  };

  const followUpMessage = selected ? followUp[selected] : null;

  return (
    <div className="py-8 border-t border-b border-ro-card-border">
      <p className="text-center text-lg text-ro-text-bright mb-6">
        {prompt}
      </p>
      
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`
              px-5 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-ro-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ro-dark
              ${selected === option.value
                ? 'bg-ro-green text-white border-2 border-ro-green'
                : selected
                  ? 'bg-ro-card text-ro-text-dim border-2 border-transparent opacity-60'
                  : 'bg-ro-card text-ro-text border-2 border-ro-card-border hover:border-ro-green hover:text-ro-green'
              }
            `}
            disabled={selected !== null && selected !== option.value}
            aria-pressed={selected === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Follow-up message */}
      <div 
        className={`
          text-center transition-all duration-500 ease-out
          ${showFollowUp && followUpMessage 
            ? 'opacity-100 max-h-20 mt-4' 
            : 'opacity-0 max-h-0 overflow-hidden'
          }
        `}
      >
        <p className="text-ro-gold text-sm italic">
          {followUpMessage}
        </p>
      </div>
    </div>
  );
}
