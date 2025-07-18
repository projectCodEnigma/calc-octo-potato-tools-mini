import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

const InvestmentCalculator = () => {
  const [initialAmount, setInitialAmount] = useState<number>(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(0);
  const [expectedReturn, setExpectedReturn] = useState<number>(0);
  const [timePeriod, setTimePeriod] = useState<number>(0);
  const [inflationRate, setInflationRate] = useState<number>(2.5);

  const calculateInvestment = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = timePeriod * 12;
    
    // Future value of initial investment
    const futureValueInitial = initialAmount * Math.pow(1 + monthlyRate, months);
    
    // Future value of monthly investments
    const futureValueMonthly = monthlyInvestment > 0 ? 
      monthlyInvestment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate : 0;
    
    const totalValue = futureValueInitial + futureValueMonthly;
    const totalInvested = initialAmount + (monthlyInvestment * months);
    const totalGains = totalValue - totalInvested;
    
    // Inflation adjusted value
    const inflationAdjustedValue = totalValue / Math.pow(1 + inflationRate / 100, timePeriod);
    
    return {
      totalValue,
      totalInvested,
      totalGains,
      inflationAdjustedValue
    };
  };

  const result = calculateInvestment();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Investment Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Investment
          </label>
          <input
            type="number"
            value={initialAmount || ''}
            onChange={(e) => setInitialAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter initial amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Investment
          </label>
          <input
            type="number"
            value={monthlyInvestment || ''}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter monthly amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Annual Return (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={expectedReturn || ''}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="8.0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Period (years)
          </label>
          <input
            type="number"
            value={timePeriod || ''}
            onChange={(e) => setTimePeriod(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="25"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Inflation Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={inflationRate || ''}
            onChange={(e) => setInflationRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="2.5"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Investment Projection:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Future Value</p>
            <p className="text-2xl font-bold text-green-600">
              ${isNaN(result.totalValue) ? '0.00' : result.totalValue.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Total Invested</p>
            <p className="text-2xl font-bold text-blue-600">
              ${result.totalInvested.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Total Gains</p>
            <p className="text-2xl font-bold text-purple-600">
              ${isNaN(result.totalGains) ? '0.00' : result.totalGains.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Inflation-Adjusted Value</p>
            <p className="text-2xl font-bold text-orange-600">
              ${isNaN(result.inflationAdjustedValue) ? '0.00' : result.inflationAdjustedValue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {timePeriod > 0 && expectedReturn > 0 && (
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Investment Analysis:</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• Your investment will grow by {((result.totalValue / result.totalInvested - 1) * 100).toFixed(1)}%</p>
            <p>• Gains represent {((result.totalGains / result.totalValue) * 100).toFixed(1)}% of final value</p>
            <p>• Real purchasing power: ${result.inflationAdjustedValue.toFixed(2)} (today's dollars)</p>
            <p>• Monthly contributions account for {((monthlyInvestment * timePeriod * 12 / result.totalInvested) * 100).toFixed(1)}% of total invested</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentCalculator;