import { useState, useEffect } from 'react';

interface SavingsCalculatorProps {
  initialStaffCount?: number;
  initialFounderHours?: number;
}

export default function SavingsCalculator({
  initialStaffCount = 2,
  initialFounderHours = 10,
}: SavingsCalculatorProps) {
  const [staffCount, setStaffCount] = useState(initialStaffCount);
  const [avgSalary, setAvgSalary] = useState(65000);
  const [founderHours, setFounderHours] = useState(initialFounderHours);
  const [animatedSavings, setAnimatedSavings] = useState(0);

  // Route One pricing (monthly)
  const routeOneTiers = {
    core: 21600,
    controller: 27600,
    complex: 34200,
  };

  // Calculate costs
  const founderHourlyValue = 250; // $250/hr opportunity cost
  const currentStaffCost = staffCount * avgSalary;
  const currentFounderCost = founderHours * 52 * founderHourlyValue;
  const currentTotal = currentStaffCost + currentFounderCost;

  // Recommend tier based on staff count
  const recommendedTier = staffCount >= 4 ? 'complex' : staffCount >= 2 ? 'controller' : 'core';
  const routeOneCost = routeOneTiers[recommendedTier] * 12;

  const savings = currentTotal - routeOneCost;
  const savingsPercent = Math.round((savings / currentTotal) * 100);

  // Animate savings
  useEffect(() => {
    const duration = 800;
    const steps = 40;
    const startValue = animatedSavings;
    const endValue = savings;
    const increment = (endValue - startValue) / steps;
    let current = startValue;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setAnimatedSavings(endValue);
        clearInterval(timer);
      } else {
        setAnimatedSavings(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [savings]);

  const formatCurrency = (num: number) => {
    if (Math.abs(num) >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    return `$${(num / 1000).toFixed(0)}K`;
  };

  const tierLabels = {
    core: 'Core Accounting',
    controller: 'Controller-Level',
    complex: 'Complex Finance',
  };

  return (
    <div className="bg-ro-card border border-ro-card-border rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-semibold text-ro-text-bright mb-6 text-center">
        What Does Your Current Setup Actually Cost?
      </h3>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        {/* Staff Count */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-ro-text-dim text-sm">In-house accounting staff</label>
            <span className="text-ro-text-bright font-mono">{staffCount} people</span>
          </div>
          <input
            type="range"
            min={0}
            max={8}
            step={1}
            value={staffCount}
            onChange={(e) => setStaffCount(Number(e.target.value))}
            className="w-full h-2 bg-ro-darker rounded-lg appearance-none cursor-pointer accent-ro-green"
          />
        </div>

        {/* Average Salary */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-ro-text-dim text-sm">Average salary per person</label>
            <span className="text-ro-text-bright font-mono">{formatCurrency(avgSalary)}</span>
          </div>
          <input
            type="range"
            min={40000}
            max={150000}
            step={5000}
            value={avgSalary}
            onChange={(e) => setAvgSalary(Number(e.target.value))}
            className="w-full h-2 bg-ro-darker rounded-lg appearance-none cursor-pointer accent-ro-green"
          />
        </div>

        {/* Founder Hours */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-ro-text-dim text-sm">Your hours/week on finance</label>
            <span className="text-ro-text-bright font-mono">{founderHours} hrs</span>
          </div>
          <input
            type="range"
            min={0}
            max={30}
            step={1}
            value={founderHours}
            onChange={(e) => setFounderHours(Number(e.target.value))}
            className="w-full h-2 bg-ro-darker rounded-lg appearance-none cursor-pointer accent-ro-green"
          />
          <p className="text-ro-text-dim text-xs mt-1">Valued at $250/hr opportunity cost</p>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Current Cost */}
        <div className="bg-ro-darker rounded-xl p-5">
          <p className="text-ro-text-dim text-sm mb-2">Your Current Annual Cost</p>
          <div className="text-3xl font-bold text-red-400 mb-3">
            {formatCurrency(currentTotal)}
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-ro-text-dim">
              <span>Staff ({staffCount})</span>
              <span>{formatCurrency(currentStaffCost)}</span>
            </div>
            <div className="flex justify-between text-ro-text-dim">
              <span>Your time</span>
              <span>{formatCurrency(currentFounderCost)}</span>
            </div>
          </div>
        </div>

        {/* Route One Cost */}
        <div className="bg-ro-darker rounded-xl p-5 border border-ro-green/30">
          <p className="text-ro-text-dim text-sm mb-2">Route One ({tierLabels[recommendedTier]})</p>
          <div className="text-3xl font-bold text-ro-green mb-3">
            {formatCurrency(routeOneCost)}
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-ro-text-dim">
              <span>Controller</span>
              <span className="text-ro-green">✓</span>
            </div>
            <div className="flex justify-between text-ro-text-dim">
              <span>Full team</span>
              <span className="text-ro-green">✓</span>
            </div>
            <div className="flex justify-between text-ro-text-dim">
              <span>Your time back</span>
              <span className="text-ro-green">✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Result */}
      {savings > 0 ? (
        <div className="bg-ro-green/10 border border-ro-green/30 rounded-xl p-6 text-center">
          <p className="text-ro-green text-sm mb-1">Potential Annual Savings</p>
          <div className="text-4xl font-bold text-ro-green mb-1">
            {formatCurrency(animatedSavings)}
          </div>
          <p className="text-ro-text-dim text-sm">
            That's {savingsPercent}% less — plus better coverage
          </p>
        </div>
      ) : (
        <div className="bg-ro-gold/10 border border-ro-gold/30 rounded-xl p-6 text-center">
          <p className="text-ro-gold text-sm mb-1">Investment Comparison</p>
          <div className="text-4xl font-bold text-ro-gold mb-1">
            +{formatCurrency(Math.abs(animatedSavings))}
          </div>
          <p className="text-ro-text-dim text-sm">
            But you get a full department, not a single hire
          </p>
        </div>
      )}

      <p className="text-ro-text-dim text-xs text-center mt-4">
        "We structure our fees around your cash flow — not the other way around."
      </p>
    </div>
  );
}
