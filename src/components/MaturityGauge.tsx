import { useEffect, useState } from 'react';

interface MaturityGaugeProps {
  score: number;
  dimensions?: {
    label: string;
    value: number;
  }[];
}

export default function MaturityGauge({ score, dimensions }: MaturityGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showDimensions, setShowDimensions] = useState(false);

  useEffect(() => {
    // Animate score counting up
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
        setTimeout(() => setShowDimensions(true), 300);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getScoreColor = (s: number) => {
    if (s >= 70) return '#22c55e'; // green
    if (s >= 50) return '#eab308'; // yellow
    if (s >= 30) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const getScoreLabel = (s: number) => {
    if (s >= 70) return 'Solid Foundation';
    if (s >= 50) return 'Room for Improvement';
    if (s >= 30) return 'Significant Gaps';
    return 'Urgent Attention Needed';
  };

  const circumference = 2 * Math.PI * 45;
  const progress = (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Circular Gauge */}
      <div className="relative w-48 h-48 mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getScoreColor(animatedScore)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-100"
          />
        </svg>
        {/* Score in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="text-5xl font-bold transition-colors"
            style={{ color: getScoreColor(animatedScore) }}
          >
            {animatedScore}
          </span>
          <span className="text-ro-text-dim text-sm">out of 100</span>
        </div>
      </div>

      {/* Score Label */}
      <p 
        className="text-xl font-semibold mb-6 transition-colors"
        style={{ color: getScoreColor(score) }}
      >
        {getScoreLabel(score)}
      </p>

      {/* Dimension Breakdown */}
      {dimensions && dimensions.length > 0 && (
        <div className={`w-full max-w-sm space-y-3 transition-opacity duration-500 ${showDimensions ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-ro-text-dim text-sm text-center mb-4">Score Breakdown</p>
          {dimensions.map((dim, i) => (
            <div key={dim.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-ro-text-dim">{dim.label}</span>
                <span className="text-ro-text">{dim.value}/100</span>
              </div>
              <div className="h-2 bg-ro-darker rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: showDimensions ? `${dim.value}%` : '0%',
                    backgroundColor: getScoreColor(dim.value),
                    transitionDelay: `${i * 150}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
