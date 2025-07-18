import React, { useState } from 'react';
import { Shield } from 'lucide-react';

const EmergencyFundCalculator = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
  const [currentSavings, setCurrentSavings] = useState<number>(0);
  const [targetMonths, setTargetMonths] = useState<number>(6);
  const [monthlySavings, setMonthlySavings] = useState<number>(0);
  const [employmentStability, setEmploymentStability] = useState<string>('stable');

  const recommendedMonths = () => {
    switch (employmentStability) {
      case 'very_stable': return 3;
      case 'stable': return 6;
      case 'unstable': return 9;
      case 'freelancer': return 12;
      default: return 6;
    }
  };

  const targetAmount = monthlyExpenses * targetMonths;
  const recommendedAmount = monthlyExpenses * recommendedMonths();
  const amountNeeded = Math.max(0, targetAmount - currentSavings);
  const monthsToGoal = monthlySavings > 0 ? Math.ceil(amountNeeded / monthlySavings) : 0;
  const progressPercentage = targetAmount > 0 ? (currentSavings / targetAmount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Emergency Fund Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Expenses ($)
          </label>
          <input
            type="number"
            value={monthlyExpenses || ''}
            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="4000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Emergency Savings ($)
          </label>
          <input
            type="number"
            value={currentSavings || ''}
            onChange={(e) => setCurrentSavings(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Months of Expenses
          </label>
          <select
            value={targetMonths}
            onChange={(e) => setTargetMonths(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={9}>9 months</option>
            <option value={12}>12 months</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Savings Contribution ($)
          </label>
          <input
            type="number"
            value={monthlySavings || ''}
            onChange={(e) => setMonthlySavings(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employment Stability
          </label>
          <select
            value={employmentStability}
            onChange={(e) => setEmploymentStability(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="very_stable">Very Stable (Government, Tenured)</option>
            <option value="stable">Stable (Regular Employment)</option>
            <option value="unstable">Unstable (Contract, Commission)</option>
            <option value="freelancer">Freelancer/Self-Employed</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Emergency Fund Status:</h4>
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress to Goal</span>
              <span className="text-sm font-medium">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Target Amount</p>
              <p className="text-2xl font-bold text-green-600">${targetAmount.toFixed(2)}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Amount Needed</p>
              <p className="text-2xl font-bold text-orange-600">${amountNeeded.toFixed(2)}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Months to Goal</p>
              <p className="text-2xl font-bold text-blue-600">
                {monthsToGoal > 0 ? monthsToGoal : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Recommendation for Your Situation:</h4>
        <div className="text-sm text-gray-700 space-y-2">
          <p>Based on your employment stability, we recommend saving <strong>{recommendedMonths()} months</strong> of expenses.</p>
          <p>Recommended emergency fund: <strong>${recommendedAmount.toFixed(2)}</strong></p>
          {recommendedAmount !== targetAmount && (
            <p className="text-orange-600">
              Your target differs from our recommendation. Consider adjusting based on your risk tolerance.
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Emergency Fund Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Keep emergency funds in a high-yield savings account</p>
          <p>• Don't invest emergency funds in stocks or risky assets</p>
          <p>• Start with $1,000 if you have debt, then build to full amount</p>
          <p>• Automate transfers to build the fund consistently</p>
          <p>• Only use for true emergencies (job loss, medical bills, major repairs)</p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyFundCalculator;