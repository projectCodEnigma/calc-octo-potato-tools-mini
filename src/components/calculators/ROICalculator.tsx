import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const ROICalculator = () => {
  const [investment, setInvestment] = useState<number>(0);
  const [returns, setReturns] = useState<number>(0);
  const [timeframe, setTimeframe] = useState<string>('monthly');

  const roi = investment > 0 ? ((returns - investment) / investment) * 100 : 0;
  const profit = returns - investment;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">ROI Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Amount
          </label>
          <input
            type="number"
            value={investment || ''}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter investment amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Returns/Revenue
          </label>
          <input
            type="number"
            value={returns || ''}
            onChange={(e) => setReturns(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter returns"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeframe
          </label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">ROI Results:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">ROI Percentage</p>
            <p className={`text-3xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {roi.toFixed(2)}%
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Profit/Loss</p>
            <p className={`text-3xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${profit.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {investment > 0 && returns > 0 && (
        <div className={`rounded-lg p-4 ${roi >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <h4 className="font-semibold mb-2">Analysis:</h4>
          <div className="text-sm text-gray-700">
            {roi >= 0 ? (
              <>
                <p>✅ Positive ROI! Your investment is profitable.</p>
                <p>For every $1 invested, you're getting ${(returns/investment).toFixed(2)} back.</p>
              </>
            ) : (
              <>
                <p>⚠️ Negative ROI. Your investment is losing money.</p>
                <p>Consider reviewing your strategy or cutting losses.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ROICalculator;