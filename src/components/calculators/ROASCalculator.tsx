import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

const ROASCalculator = () => {
  const [adSpend, setAdSpend] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [orders, setOrders] = useState<number>(0);
  const [costOfGoods, setCostOfGoods] = useState<number>(0);
  const [timeframe, setTimeframe] = useState<string>('monthly');

  const roas = adSpend > 0 ? revenue / adSpend : 0;
  const averageOrderValue = orders > 0 ? revenue / orders : 0;
  const costPerAcquisition = orders > 0 ? adSpend / orders : 0;
  const grossProfit = revenue - costOfGoods;
  const netROAS = adSpend > 0 ? grossProfit / adSpend : 0;
  const profitMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;

  const getROASStatus = () => {
    if (roas >= 4) return { status: 'Excellent', color: 'text-green-600' };
    if (roas >= 3) return { status: 'Good', color: 'text-blue-600' };
    if (roas >= 2) return { status: 'Break Even', color: 'text-yellow-600' };
    if (roas >= 1) return { status: 'Poor', color: 'text-orange-600' };
    return { status: 'Losing Money', color: 'text-red-600' };
  };

  const roasStatus = getROASStatus();

  const getBreakEvenROAS = () => {
    if (profitMargin <= 0) return 0;
    return 100 / profitMargin;
  };

  const breakEvenROAS = getBreakEvenROAS();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">ROAS Calculator (eCommerce)</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ad Spend ($)
          </label>
          <input
            type="number"
            value={adSpend || ''}
            onChange={(e) => setAdSpend(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Revenue Generated ($)
          </label>
          <input
            type="number"
            value={revenue || ''}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="4000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Orders
          </label>
          <input
            type="number"
            value={orders || ''}
            onChange={(e) => setOrders(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cost of Goods Sold ($)
          </label>
          <input
            type="number"
            value={costOfGoods || ''}
            onChange={(e) => setCostOfGoods(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="2000"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeframe
          </label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">ROAS Analysis:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">ROAS (Revenue)</p>
            <p className={`text-3xl font-bold ${roasStatus.color}`}>
              {roas.toFixed(2)}:1
            </p>
            <p className={`text-sm font-medium ${roasStatus.color}`}>
              {roasStatus.status}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Net ROAS (Profit)</p>
            <p className="text-3xl font-bold text-blue-600">
              {netROAS.toFixed(2)}:1
            </p>
            <p className="text-sm text-gray-500">After COGS</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Key Metrics:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Average Order Value:</span>
              <span className="font-medium">${averageOrderValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Cost Per Acquisition:</span>
              <span className="font-medium">${costPerAcquisition.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Gross Profit:</span>
              <span className="font-medium">${grossProfit.toFixed(2)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Profit Margin:</span>
              <span className="font-medium">{profitMargin.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Break-even ROAS:</span>
              <span className="font-medium">{breakEvenROAS.toFixed(2)}:1</span>
            </div>
            <div className="flex justify-between">
              <span>Conversion Rate:</span>
              <span className="font-medium">
                {adSpend > 0 ? ((orders / (adSpend / 10)) * 100).toFixed(2) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">ROAS Benchmarks by Industry:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• <span className="font-medium">Retail/Fashion:</span> 4:1 - 6:1</p>
          <p>• <span className="font-medium">Electronics:</span> 3:1 - 5:1</p>
          <p>• <span className="font-medium">Home & Garden:</span> 4:1 - 7:1</p>
          <p>• <span className="font-medium">Beauty/Cosmetics:</span> 4:1 - 8:1</p>
          <p>• <span className="font-medium">Sports & Fitness:</span> 3:1 - 5:1</p>
          <p>• <span className="font-medium">Food & Beverage:</span> 3:1 - 6:1</p>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Optimization Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Target high-intent keywords to improve conversion rates</p>
          <p>• Optimize product pages and checkout process</p>
          <p>• Use retargeting campaigns for cart abandoners</p>
          <p>• Test different ad creatives and audiences</p>
          <p>• Focus on customer lifetime value, not just first purchase</p>
          <p>• Implement proper attribution tracking</p>
        </div>
      </div>

      {roas > 0 && (
        <div className={`rounded-lg p-4 ${roas >= breakEvenROAS ? 'bg-green-50' : 'bg-red-50'}`}>
          <h4 className="font-semibold mb-2">Performance Summary:</h4>
          <div className="text-sm text-gray-700">
            {roas >= breakEvenROAS ? (
              <p className="text-green-700">
                ✅ Your ROAS of {roas.toFixed(2)}:1 is above your break-even point of {breakEvenROAS.toFixed(2)}:1. 
                You're generating ${(roas - 1).toFixed(2)} in revenue for every $1 spent on ads.
              </p>
            ) : (
              <p className="text-red-700">
                ⚠️ Your ROAS of {roas.toFixed(2)}:1 is below your break-even point of {breakEvenROAS.toFixed(2)}:1. 
                You need to improve performance to become profitable.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ROASCalculator;