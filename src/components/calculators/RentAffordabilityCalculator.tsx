import React, { useState } from 'react';
import { Home } from 'lucide-react';

const RentAffordabilityCalculator = () => {
  const [grossIncome, setGrossIncome] = useState<number>(0);
  const [incomeFrequency, setIncomeFrequency] = useState<string>('monthly');
  const [otherDebts, setOtherDebts] = useState<number>(0);
  const [utilities, setUtilities] = useState<number>(150);
  const [renterInsurance, setRenterInsurance] = useState<number>(25);
  const [rule, setRule] = useState<string>('30');

  const monthlyIncome = () => {
    switch (incomeFrequency) {
      case 'hourly': return grossIncome * 40 * 4.33; // 40 hours/week * 4.33 weeks/month
      case 'weekly': return grossIncome * 4.33;
      case 'biweekly': return grossIncome * 2.17;
      case 'monthly': return grossIncome;
      case 'annual': return grossIncome / 12;
      default: return grossIncome;
    }
  };

  const income = monthlyIncome();
  const rulePercentage = parseInt(rule) / 100;
  const maxRent = income * rulePercentage;
  const maxRentWithDebts = Math.max(0, maxRent - otherDebts);
  const totalHousingCost = maxRentWithDebts + utilities + renterInsurance;
  const remainingIncome = income - totalHousingCost - otherDebts;

  const getAffordabilityLevel = () => {
    const housingRatio = (totalHousingCost + otherDebts) / income;
    if (housingRatio <= 0.28) return { level: 'Excellent', color: 'text-green-600' };
    if (housingRatio <= 0.36) return { level: 'Good', color: 'text-blue-600' };
    if (housingRatio <= 0.43) return { level: 'Acceptable', color: 'text-yellow-600' };
    return { level: 'Risky', color: 'text-red-600' };
  };

  const affordability = getAffordabilityLevel();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Home className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Rent Affordability Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gross Income
          </label>
          <input
            type="number"
            value={grossIncome || ''}
            onChange={(e) => setGrossIncome(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Income Frequency
          </label>
          <select
            value={incomeFrequency}
            onChange={(e) => setIncomeFrequency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="hourly">Hourly</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Other Monthly Debts ($)
          </label>
          <input
            type="number"
            value={otherDebts || ''}
            onChange={(e) => setOtherDebts(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Affordability Rule
          </label>
          <select
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="25">25% Rule (Conservative)</option>
            <option value="30">30% Rule (Standard)</option>
            <option value="40">40% Rule (Aggressive)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Utilities ($)
          </label>
          <input
            type="number"
            value={utilities || ''}
            onChange={(e) => setUtilities(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="150"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Renter's Insurance ($)
          </label>
          <input
            type="number"
            value={renterInsurance || ''}
            onChange={(e) => setRenterInsurance(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="25"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Rent Affordability Results:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Maximum Rent</p>
            <p className="text-3xl font-bold text-blue-600">${maxRentWithDebts.toFixed(2)}</p>
            <p className="text-xs text-gray-500">per month</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Affordability Level</p>
            <p className={`text-2xl font-bold ${affordability.color}`}>{affordability.level}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Monthly Budget Breakdown:</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Monthly Income:</span>
            <span className="font-medium">${income.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Maximum Rent:</span>
            <span className="font-medium">${maxRentWithDebts.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Utilities:</span>
            <span className="font-medium">${utilities.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Renter's Insurance:</span>
            <span className="font-medium">${renterInsurance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Other Debts:</span>
            <span className="font-medium">${otherDebts.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Remaining Income:</span>
            <span className="font-semibold text-green-600">${remainingIncome.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Rental Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Most landlords require income to be 3x the monthly rent</p>
          <p>• Factor in moving costs, security deposits, and first month's rent</p>
          <p>• Consider location, commute costs, and neighborhood amenities</p>
          <p>• Don't forget about parking, pet fees, and other additional costs</p>
          <p>• Leave room in your budget for savings and unexpected expenses</p>
        </div>
      </div>
    </div>
  );
};

export default RentAffordabilityCalculator;