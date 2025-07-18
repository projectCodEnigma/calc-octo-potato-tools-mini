import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

const FreelancerRateCalculator = () => {
  const [desiredAnnualIncome, setDesiredAnnualIncome] = useState<number>(0);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(30);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(50);
  const [businessExpenses, setBusinessExpenses] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(25);
  const [profitMargin, setProfitMargin] = useState<number>(20);

  const totalBillableHours = billableHoursPerWeek * weeksPerYear;
  const grossIncomeNeeded = desiredAnnualIncome / (1 - taxRate / 100);
  const totalExpenses = businessExpenses + (grossIncomeNeeded * profitMargin / 100);
  const totalRevenue = grossIncomeNeeded + totalExpenses;
  const hourlyRate = totalBillableHours > 0 ? totalRevenue / totalBillableHours : 0;
  const dailyRate = hourlyRate * 8;
  const weeklyRate = hourlyRate * billableHoursPerWeek;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Freelancer Rate Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Desired Annual Income ($)
          </label>
          <input
            type="number"
            value={desiredAnnualIncome || ''}
            onChange={(e) => setDesiredAnnualIncome(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="75000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Billable Hours per Week
          </label>
          <input
            type="number"
            value={billableHoursPerWeek || ''}
            onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Working Weeks per Year
          </label>
          <input
            type="number"
            value={weeksPerYear || ''}
            onChange={(e) => setWeeksPerYear(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Business Expenses ($)
          </label>
          <input
            type="number"
            value={businessExpenses || ''}
            onChange={(e) => setBusinessExpenses(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Rate (%)
          </label>
          <input
            type="number"
            value={taxRate || ''}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="25"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profit Margin (%)
          </label>
          <input
            type="number"
            value={profitMargin || ''}
            onChange={(e) => setProfitMargin(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="20"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Recommended Rates:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Hourly Rate</p>
            <p className="text-2xl font-bold text-green-600">
              ${hourlyRate.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Daily Rate</p>
            <p className="text-2xl font-bold text-blue-600">
              ${dailyRate.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Weekly Rate</p>
            <p className="text-2xl font-bold text-purple-600">
              ${weeklyRate.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Rate Breakdown:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Total billable hours per year: {totalBillableHours}</p>
          <p>• Gross income needed (after taxes): ${grossIncomeNeeded.toFixed(2)}</p>
          <p>• Total revenue required: ${totalRevenue.toFixed(2)}</p>
          <p>• Business expenses: ${businessExpenses.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default FreelancerRateCalculator;