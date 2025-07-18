import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const LTVCACCalculator = () => {
  const [averageOrderValue, setAverageOrderValue] = useState<number>(0);
  const [purchaseFrequency, setPurchaseFrequency] = useState<number>(0);
  const [customerLifespan, setCustomerLifespan] = useState<number>(0);
  const [acquisitionCost, setAcquisitionCost] = useState<number>(0);
  const [grossMargin, setGrossMargin] = useState<number>(20);

  const ltv = averageOrderValue * purchaseFrequency * customerLifespan * (grossMargin / 100);
  const ltvCacRatio = acquisitionCost > 0 ? ltv / acquisitionCost : 0;

  const getRatioStatus = () => {
    if (ltvCacRatio >= 3) return { status: 'Excellent', color: 'text-green-600' };
    if (ltvCacRatio >= 2) return { status: 'Good', color: 'text-blue-600' };
    if (ltvCacRatio >= 1) return { status: 'Break Even', color: 'text-yellow-600' };
    return { status: 'Poor', color: 'text-red-600' };
  };

  const ratioStatus = getRatioStatus();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">LTV/CAC Ratio Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Order Value ($)
          </label>
          <input
            type="number"
            value={averageOrderValue || ''}
            onChange={(e) => setAverageOrderValue(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purchase Frequency (per year)
          </label>
          <input
            type="number"
            value={purchaseFrequency || ''}
            onChange={(e) => setPurchaseFrequency(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Lifespan (years)
          </label>
          <input
            type="number"
            step="0.1"
            value={customerLifespan || ''}
            onChange={(e) => setCustomerLifespan(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Acquisition Cost ($)
          </label>
          <input
            type="number"
            value={acquisitionCost || ''}
            onChange={(e) => setAcquisitionCost(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="50"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gross Margin (%)
          </label>
          <input
            type="number"
            value={grossMargin || ''}
            onChange={(e) => setGrossMargin(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="20"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">LTV/CAC Analysis:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Customer LTV</p>
            <p className="text-2xl font-bold text-green-600">${ltv.toFixed(2)}</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Customer CAC</p>
            <p className="text-2xl font-bold text-red-600">${acquisitionCost.toFixed(2)}</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">LTV/CAC Ratio</p>
            <p className={`text-2xl font-bold ${ratioStatus.color}`}>
              {ltvCacRatio.toFixed(2)}:1
            </p>
            <p className={`text-sm font-medium ${ratioStatus.color}`}>
              {ratioStatus.status}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Ratio Interpretation:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• <span className="text-green-600 font-medium">3:1 or higher</span> - Excellent, sustainable growth</p>
          <p>• <span className="text-blue-600 font-medium">2:1 to 3:1</span> - Good, healthy business model</p>
          <p>• <span className="text-yellow-600 font-medium">1:1 to 2:1</span> - Break even, needs improvement</p>
          <p>• <span className="text-red-600 font-medium">Below 1:1</span> - Poor, losing money on customers</p>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Improvement Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Increase average order value through upselling</p>
          <p>• Improve customer retention to extend lifespan</p>
          <p>• Optimize marketing channels to reduce CAC</p>
          <p>• Focus on high-value customer segments</p>
          <p>• Implement referral programs to lower acquisition costs</p>
        </div>
      </div>
    </div>
  );
};

export default LTVCACCalculator;