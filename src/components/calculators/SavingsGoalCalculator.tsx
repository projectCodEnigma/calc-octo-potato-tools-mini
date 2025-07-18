import React, { useState } from 'react';
import { Target } from 'lucide-react';

const SavingsGoalCalculator = () => {
  const [goal, setGoal] = useState<number>(0);
  const [currentSavings, setCurrentSavings] = useState<number>(0);
  const [timeline, setTimeline] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);

  const remaining = goal - currentSavings;
  const monthlyRate = interestRate / 100 / 12;
  const months = timeline * 12;

  // Calculate monthly savings needed with compound interest
  const monthlyRequired = monthlyRate > 0 ? 
    (remaining * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1) :
    remaining / months;

  const totalContributions = monthlyRequired * months;
  const interestEarned = remaining - totalContributions;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Target className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Savings Goal Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Savings Goal
          </label>
          <input
            type="number"
            value={goal || ''}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your savings goal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Savings
          </label>
          <input
            type="number"
            value={currentSavings || ''}
            onChange={(e) => setCurrentSavings(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter current savings"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeline (years)
          </label>
          <input
            type="number"
            value={timeline || ''}
            onChange={(e) => setTimeline(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Years to reach goal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={interestRate || ''}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="2.5"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Savings Plan:</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Amount Still Needed:</span>
            <span className="text-red-600">${remaining.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Monthly Savings Required:</span>
            <span className="text-green-600 font-bold text-lg">
              ${isNaN(monthlyRequired) ? '0.00' : monthlyRequired.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Contributions:</span>
            <span className="text-blue-600">
              ${isNaN(totalContributions) ? '0.00' : totalContributions.toFixed(2)}
            </span>
          </div>
          {interestRate > 0 && (
            <div className="flex justify-between">
              <span className="font-medium">Interest Earned:</span>
              <span className="text-purple-600">
                ${isNaN(interestEarned) ? '0.00' : interestEarned.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>

      {goal > 0 && timeline > 0 && (
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Tips for Success:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Set up automatic transfers to make saving easier</li>
            <li>• Consider high-yield savings accounts for better returns</li>
            <li>• Review and adjust your goal periodically</li>
            <li>• Track your progress monthly to stay motivated</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SavingsGoalCalculator;