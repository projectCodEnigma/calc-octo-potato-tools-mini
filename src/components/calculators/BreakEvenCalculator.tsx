import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

const BreakEvenCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState<number>(0);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(0);
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<number>(0);
  const [targetProfit, setTargetProfit] = useState<number>(0);

  const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
  const contributionMarginRatio = sellingPricePerUnit > 0 ? (contributionMargin / sellingPricePerUnit) * 100 : 0;
  
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit;
  
  const unitsForTargetProfit = contributionMargin > 0 ? Math.ceil((fixedCosts + targetProfit) / contributionMargin) : 0;
  const revenueForTargetProfit = unitsForTargetProfit * sellingPricePerUnit;

  const marginOfSafety = (units: number) => {
    if (breakEvenUnits === 0) return 0;
    return Math.max(0, ((units - breakEvenUnits) / units) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Break-Even Point Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fixed Costs ($)
          </label>
          <input
            type="number"
            value={fixedCosts || ''}
            onChange={(e) => setFixedCosts(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10000"
          />
          <p className="text-xs text-gray-500 mt-1">Rent, salaries, insurance, etc.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Variable Cost per Unit ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={variableCostPerUnit || ''}
            onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="15.00"
          />
          <p className="text-xs text-gray-500 mt-1">Materials, labor per unit, etc.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selling Price per Unit ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={sellingPricePerUnit || ''}
            onChange={(e) => setSellingPricePerUnit(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="25.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Profit ($)
          </label>
          <input
            type="number"
            value={targetProfit || ''}
            onChange={(e) => setTargetProfit(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="5000"
          />
          <p className="text-xs text-gray-500 mt-1">Optional: desired profit amount</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Break-Even Analysis:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Break-Even Point</p>
            <p className="text-2xl font-bold text-blue-600">{breakEvenUnits.toLocaleString()}</p>
            <p className="text-sm text-gray-500">units</p>
            <p className="text-lg font-medium text-green-600">${breakEvenRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500">revenue</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Contribution Margin</p>
            <p className="text-2xl font-bold text-green-600">${contributionMargin.toFixed(2)}</p>
            <p className="text-sm text-gray-500">per unit</p>
            <p className="text-lg font-medium text-purple-600">{contributionMarginRatio.toFixed(1)}%</p>
            <p className="text-sm text-gray-500">ratio</p>
          </div>
        </div>
      </div>

      {targetProfit > 0 && (
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Target Profit Analysis:</h4>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Units for Target Profit</p>
            <p className="text-2xl font-bold text-green-600">{unitsForTargetProfit.toLocaleString()}</p>
            <p className="text-sm text-gray-500">units needed</p>
            <p className="text-lg font-medium text-blue-600">${revenueForTargetProfit.toLocaleString()}</p>
            <p className="text-sm text-gray-500">revenue needed</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Key Insights:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• You need to sell {breakEvenUnits.toLocaleString()} units to cover all costs</p>
          <p>• Each unit sold contributes ${contributionMargin.toFixed(2)} toward fixed costs and profit</p>
          <p>• Your contribution margin ratio is {contributionMarginRatio.toFixed(1)}%</p>
          {targetProfit > 0 && (
            <p>• You need {(unitsForTargetProfit - breakEvenUnits).toLocaleString()} additional units beyond break-even to reach your profit target</p>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Business Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Lower break-even point = less risk and faster profitability</p>
          <p>• Increase selling price or reduce costs to improve contribution margin</p>
          <p>• Monitor actual sales vs break-even point regularly</p>
          <p>• Consider volume discounts or bulk pricing strategies</p>
          <p>• Track margin of safety: (Actual Sales - Break-even) / Actual Sales</p>
        </div>
      </div>
    </div>
  );
};

export default BreakEvenCalculator;