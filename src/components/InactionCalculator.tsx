import { useState, useEffect } from 'react';

interface InactionCalculatorProps {
  initialRevenue?: number;
  initialDaysBehind?: number;
  hadDenial?: boolean;
}

export default function InactionCalculator({ 
  initialRevenue = 5000000, 
  initialDaysBehind = 60,
  hadDenial = false 
}: InactionCalculatorProps) {
  const [revenue, setRevenue] = useState(initialRevenue);
  const [daysBehind, setDaysBehind] = useState(initialDaysBehind);
  const [deniedFinancing, setDeniedFinancing] = useState(hadDenial);
  const [animatedCost, setAnimatedCost] = useState(0);

  // Calculate cost of inaction
  const calculateCost = () => {
    // Base leakage: 2-5% of revenue depending on days behind
    const leakageRate = Math.min(0.02 + (daysBehind / 365) * 0.08, 0.10);
    let baseCost = revenue * leakageRate;

    // Financing denial multiplier
    if (deniedFinancing) {
      baseCost *= 1.5; // 50% more if they've been denied
    }

    // Add opportunity cost
    const opportunityCost = deniedFinancing ? revenue * 0.05 : 0;

    return Math.round(baseCost + opportunityCost);
  };

  const cost = calculateCost();

  // Animate the cost number
  useEffect(() => {
    const duration = 800;
    const steps = 40;
    const startValue = animatedCost;
    const endValue = cost;
    const increment = (endValue - startValue) / steps;
    let current = startValue;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setAnimatedCost(endValue);
        clearInterval(timer);
      } else {
        setAnimatedCost(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [cost]);

  const formatCurrency = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    return `$${(num / 1000).toFixed(0)}K`;
  };

  const formatFullCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="bg-ro-card border border-ro-card-border rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-semibold text-ro-text-bright mb-6 text-center">
        Cost of Inaction Estimator
      </h3>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        {/* Revenue Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-ro-text-dim text-sm">Annual Revenue</label>
            <span className="text-ro-text-bright font-mono">{formatCurrency(revenue)}</span>
          </div>
          <input
            type="range"
            min={1000000}
            max={50000000}
            step={500000}
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full h-2 bg-ro-darker rounded-lg appearance-none cursor-pointer accent-ro-green"
          />
          <div className="flex justify-between text-xs text-ro-text-dim mt-1">
            <span>$1M</span>
            <span>$50M</span>
          </div>
        </div>

        {/* Days Behind Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-ro-text-dim text-sm">Days Behind on Books</label>
            <span className="text-ro-text-bright font-mono">{daysBehind} days</span>
          </div>
          <input
            type="range"
            min={0}
            max={365}
            step={15}
            value={daysBehind}
            onChange={(e) => setDaysBehind(Number(e.target.value))}
            className="w-full h-2 bg-ro-darker rounded-lg appearance-none cursor-pointer accent-ro-green"
          />
          <div className="flex justify-between text-xs text-ro-text-dim mt-1">
            <span>Current</span>
            <span>1 year+</span>
          </div>
        </div>

        {/* Financing Denial Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-ro-text-dim text-sm">Ever denied financing due to financials?</label>
          <button
            onClick={() => setDeniedFinancing(!deniedFinancing)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              deniedFinancing ? 'bg-ro-gold' : 'bg-ro-darker'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                deniedFinancing ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Result */}
      <div className="bg-ro-darker rounded-xl p-6 text-center">
        <p className="text-ro-text-dim text-sm mb-2">Estimated Annual Margin Leakage</p>
        <div className="text-5xl md:text-6xl font-bold text-ro-gold mb-2">
          {formatCurrency(animatedCost)}
        </div>
        <p className="text-ro-text-dim text-sm">
          {formatFullCurrency(animatedCost)} per year
        </p>
        
        {/* Breakdown */}
        <div className="mt-6 pt-6 border-t border-ro-card-border text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-ro-text-dim">Visibility blindspots</span>
            <span className="text-ro-text">{formatCurrency(revenue * 0.02)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ro-text-dim">Decision delays ({daysBehind} days)</span>
            <span className="text-ro-text">{formatCurrency(revenue * (daysBehind / 365) * 0.03)}</span>
          </div>
          {deniedFinancing && (
            <div className="flex justify-between text-sm">
              <span className="text-ro-text-dim">Financing opportunity cost</span>
              <span className="text-ro-gold">{formatCurrency(revenue * 0.05)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Context */}
      <p className="text-ro-text-dim text-xs text-center mt-4">
        Based on patterns from 44 client engagements. Your actual situation may vary.
      </p>
    </div>
  );
}
