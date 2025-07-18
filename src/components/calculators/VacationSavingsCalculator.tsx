import React, { useState } from 'react';
import { Plane } from 'lucide-react';

const VacationSavingsCalculator = () => {
  const [vacationCost, setVacationCost] = useState<number>(0);
  const [targetDate, setTargetDate] = useState<string>('');
  const [currentSavings, setCurrentSavings] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(2.5);
  const [expenses, setExpenses] = useState<{
    flights: number;
    accommodation: number;
    food: number;
    activities: number;
    transportation: number;
    shopping: number;
    miscellaneous: number;
  }>({
    flights: 800,
    accommodation: 1200,
    food: 600,
    activities: 400,
    transportation: 200,
    shopping: 300,
    miscellaneous: 200
  });

  const calculateMonthsToTarget = () => {
    if (!targetDate) return 0;
    const target = new Date(targetDate);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    return Math.max(0, diffMonths);
  };

  const totalExpenses = Object.values(expenses).reduce((sum, cost) => sum + cost, 0);
  const totalCost = vacationCost || totalExpenses;
  const monthsToTarget = calculateMonthsToTarget();
  const amountNeeded = Math.max(0, totalCost - currentSavings);
  
  // Calculate with compound interest
  const monthlyRate = interestRate / 100 / 12;
  const monthlyRequired = monthsToTarget > 0 && monthlyRate > 0 ? 
    (amountNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, monthsToTarget) - 1) :
    monthsToTarget > 0 ? amountNeeded / monthsToTarget : 0;

  const updateExpense = (key: string, value: number) => {
    setExpenses(prev => ({ ...prev, [key]: value }));
  };

  const getVacationTips = () => {
    const tips = [
      'Book flights 6-8 weeks in advance for best prices',
      'Consider traveling during off-peak seasons',
      'Use travel rewards credit cards for points',
      'Look for package deals that include flights and hotels',
      'Set up automatic transfers to a dedicated vacation fund',
      'Use apps to track flight prices and get alerts',
      'Consider alternative accommodations like Airbnb',
      'Plan free activities like hiking, beaches, or museums'
    ];
    return tips.slice(0, 4);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Plane className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Vacation Savings Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Vacation Date
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Savings ($)
          </label>
          <input
            type="number"
            value={currentSavings || ''}
            onChange={(e) => setCurrentSavings(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Vacation Cost ($)
          </label>
          <input
            type="number"
            value={vacationCost || ''}
            onChange={(e) => setVacationCost(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Leave blank to use breakdown below"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Savings Account Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={interestRate || ''}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2.5"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Vacation Cost Breakdown</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flights ($)
            </label>
            <input
              type="number"
              value={expenses.flights || ''}
              onChange={(e) => updateExpense('flights', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accommodation ($)
            </label>
            <input
              type="number"
              value={expenses.accommodation || ''}
              onChange={(e) => updateExpense('accommodation', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food & Dining ($)
            </label>
            <input
              type="number"
              value={expenses.food || ''}
              onChange={(e) => updateExpense('food', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activities & Tours ($)
            </label>
            <input
              type="number"
              value={expenses.activities || ''}
              onChange={(e) => updateExpense('activities', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Local Transportation ($)
            </label>
            <input
              type="number"
              value={expenses.transportation || ''}
              onChange={(e) => updateExpense('transportation', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shopping & Souvenirs ($)
            </label>
            <input
              type="number"
              value={expenses.shopping || ''}
              onChange={(e) => updateExpense('shopping', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="300"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Vacation Savings Plan:</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total Vacation Cost:</span>
            <span className="font-medium">${totalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Current Savings:</span>
            <span className="font-medium">${currentSavings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount Still Needed:</span>
            <span className="font-medium text-red-600">${amountNeeded.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Months Until Vacation:</span>
            <span className="font-medium">{monthsToTarget}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Monthly Savings Required:</span>
            <span className="font-semibold text-blue-600">
              ${monthlyRequired.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Money-Saving Travel Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          {getVacationTips().map((tip, index) => (
            <p key={index}>• {tip}</p>
          ))}
        </div>
      </div>

      {monthsToTarget > 0 && (
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Savings Strategy:</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• Set up automatic transfers of ${monthlyRequired.toFixed(2)} per month</p>
            <p>• Use a high-yield savings account to earn {interestRate}% interest</p>
            <p>• Consider a vacation fund challenge (save loose change, etc.)</p>
            <p>• Track your progress monthly to stay motivated</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacationSavingsCalculator;