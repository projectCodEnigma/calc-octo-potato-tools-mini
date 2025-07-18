import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
  const [annualRate, setAnnualRate] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12);

  const calculateCompoundInterest = () => {
    const r = annualRate / 100;
    const n = compoundFrequency;
    const t = years;
    
    // Future value of initial principal
    const futureValuePrincipal = principal * Math.pow(1 + r/n, n*t);
    
    // Future value of monthly contributions (annuity)
    const monthlyRate = r / 12;
    const futureValueContributions = monthlyContribution > 0 ? 
      monthlyContribution * (Math.pow(1 + monthlyRate, 12*t) - 1) / monthlyRate : 0;
    
    const totalAmount = futureValuePrincipal + futureValueContributions;
    const totalContributions = principal + (monthlyContribution * 12 * years);
    const totalInterest = totalAmount - totalContributions;
    
    return {
      totalAmount,
      totalContributions,
      totalInterest
    };
  };

  const result = calculateCompoundInterest();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Compound Interest Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Investment
          </label>
          <input
            type="number"
            value={principal || ''}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter initial amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Contribution
          </label>
          <input
            type="number"
            value={monthlyContribution || ''}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter monthly contribution"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={annualRate || ''}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="7.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Period (years)
          </label>
          <input
            type="number"
            value={years || ''}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="20"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compound Frequency
          </label>
          <select
            value={compoundFrequency}
            onChange={(e) => setCompoundFrequency(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={1}>Annually</option>
            <option value={2}>Semi-annually</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
            <option value={365}>Daily</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Investment Results:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Final Amount</p>
            <p className="text-2xl font-bold text-green-600">
              ${isNaN(result.totalAmount) ? '0.00' : result.totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Total Contributions</p>
            <p className="text-2xl font-bold text-blue-600">
              ${result.totalContributions.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Interest Earned</p>
            <p className="text-2xl font-bold text-purple-600">
              ${isNaN(result.totalInterest) ? '0.00' : result.totalInterest.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {years > 0 && annualRate > 0 && (
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Key Insights:</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• Your money will grow by {((result.totalAmount / result.totalContributions - 1) * 100).toFixed(1)}%</p>
            <p>• Interest makes up {((result.totalInterest / result.totalAmount) * 100).toFixed(1)}% of your final amount</p>
            <p>• Average annual return: {((Math.pow(result.totalAmount / principal, 1/years) - 1) * 100).toFixed(2)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompoundInterestCalculator;