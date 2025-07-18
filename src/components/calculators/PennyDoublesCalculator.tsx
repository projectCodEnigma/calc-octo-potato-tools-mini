import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const PennyDoublesCalculator = () => {
  const [days, setDays] = useState<number>(30);

  const calculatePennyDoubles = () => {
    if (days <= 0) return 0;
    // Start with $0.01 and double each day
    return 0.01 * Math.pow(2, days);
  };

  const finalAmount = calculatePennyDoubles();
  
  // Calculate some interesting milestones
  const getMilestones = () => {
    const milestones = [];
    for (let day = 1; day <= Math.min(days, 50); day++) {
      const amount = 0.01 * Math.pow(2, day);
      if (day <= 10 || day % 5 === 0 || amount >= 1000000) {
        milestones.push({ day, amount });
      }
    }
    return milestones.slice(0, 10); // Show max 10 milestones
  };

  const milestones = getMilestones();

  const formatCurrency = (amount: number) => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(2)} trillion`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)} billion`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(2)} million`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(2)} thousand`;
    return `$${amount.toFixed(2)}`;
  };

  const getInsights = () => {
    const insights = [];
    
    if (days >= 10) {
      insights.push(`After 10 days, your penny becomes $${(0.01 * Math.pow(2, 10)).toFixed(2)}`);
    }
    
    if (days >= 20) {
      insights.push(`After 20 days, you'd have over $${(0.01 * Math.pow(2, 20) / 1000).toFixed(0)}k`);
    }
    
    if (days >= 30) {
      insights.push(`After 30 days, you'd have over $${(0.01 * Math.pow(2, 30) / 1000000).toFixed(1)} million!`);
    }
    
    if (days >= 40) {
      insights.push(`After 40 days, you'd have over $${(0.01 * Math.pow(2, 40) / 1000000000).toFixed(1)} billion!`);
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Penny Doubles Daily Calculator</h3>
      </div>

      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-2">The Magic of Exponential Growth</h4>
        <p className="text-sm text-green-700">
          Start with just $0.01 and watch it double every single day. This demonstrates the incredible power 
          of exponential growth and compound interest!
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Days
        </label>
        <input
          type="number"
          min="1"
          max="50"
          value={days || ''}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter number of days (max 50)"
        />
        <p className="text-xs text-gray-500 mt-1">
          Limited to 50 days due to astronomical numbers beyond that point
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Result After {days} Days:</h4>
        <div className="text-center p-6 bg-white rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Starting with $0.01, after {days} days you'd have:</p>
          <p className="text-4xl font-bold text-green-600 mb-2">
            {formatCurrency(finalAmount)}
          </p>
          <p className="text-sm text-gray-500">
            That's {(finalAmount / 0.01).toLocaleString()} times your original penny!
          </p>
        </div>
      </div>

      {milestones.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Daily Growth Milestones:</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {milestones.map((milestone) => (
              <div key={milestone.day} className="flex justify-between items-center p-2 bg-white rounded">
                <span className="font-medium">Day {milestone.day}:</span>
                <span className="text-blue-600 font-bold">
                  {formatCurrency(milestone.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {insights.length > 0 && (
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Mind-Blowing Facts:</h4>
          <div className="text-sm text-gray-700 space-y-1">
            {insights.map((insight, index) => (
              <p key={index}>• {insight}</p>
            ))}
          </div>
        </div>
      )}

      <div className="bg-purple-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Understanding Exponential Growth:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Day 1: $0.01 → Day 2: $0.02 → Day 3: $0.04 → Day 4: $0.08</p>
          <p>• The growth starts slow but accelerates dramatically</p>
          <p>• This is why compound interest is called the "8th wonder of the world"</p>
          <p>• Real investments don't double daily, but the principle applies</p>
          <p>• Even small, consistent investments can grow substantially over time</p>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Real-World Applications:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Stock market averages ~10% annual returns (not daily!)</p>
          <p>• High-yield savings accounts: 4-5% annually</p>
          <p>• The key is starting early and being consistent</p>
          <p>• Time is your greatest asset in building wealth</p>
          <p>• Small amounts invested regularly can become substantial</p>
        </div>
      </div>

      {days > 40 && (
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">⚠️ Reality Check:</h4>
          <p className="text-sm text-red-700">
            These numbers become astronomical quickly! No real investment doubles daily. 
            This calculator demonstrates mathematical exponential growth, not realistic investment returns. 
            Use it to understand the power of compound growth over time.
          </p>
        </div>
      )}
    </div>
  );
};

export default PennyDoublesCalculator;