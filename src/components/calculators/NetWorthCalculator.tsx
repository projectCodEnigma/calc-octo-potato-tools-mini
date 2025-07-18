import React, { useState } from 'react';
import { TrendingUp, Plus, Minus } from 'lucide-react';

const NetWorthCalculator = () => {
  const [assets, setAssets] = useState<Array<{name: string, value: number}>>([
    { name: 'Checking Account', value: 5000 },
    { name: 'Savings Account', value: 15000 },
    { name: 'Home Value', value: 300000 },
    { name: 'Car', value: 25000 },
    { name: '401(k)', value: 75000 }
  ]);
  
  const [liabilities, setLiabilities] = useState<Array<{name: string, value: number}>>([
    { name: 'Mortgage', value: 250000 },
    { name: 'Car Loan', value: 15000 },
    { name: 'Credit Cards', value: 5000 }
  ]);

  const addAsset = () => {
    setAssets([...assets, { name: '', value: 0 }]);
  };

  const removeAsset = (index: number) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  const updateAsset = (index: number, field: string, value: string | number) => {
    const newAssets = [...assets];
    newAssets[index] = { ...newAssets[index], [field]: value };
    setAssets(newAssets);
  };

  const addLiability = () => {
    setLiabilities([...liabilities, { name: '', value: 0 }]);
  };

  const removeLiability = (index: number) => {
    setLiabilities(liabilities.filter((_, i) => i !== index));
  };

  const updateLiability = (index: number, field: string, value: string | number) => {
    const newLiabilities = [...liabilities];
    newLiabilities[index] = { ...newLiabilities[index], [field]: value };
    setLiabilities(newLiabilities);
  };

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const netWorth = totalAssets - totalLiabilities;

  const getNetWorthCategory = () => {
    if (netWorth < 0) return { category: 'Negative', color: 'text-red-600' };
    if (netWorth < 10000) return { category: 'Building', color: 'text-orange-600' };
    if (netWorth < 100000) return { category: 'Growing', color: 'text-yellow-600' };
    if (netWorth < 500000) return { category: 'Strong', color: 'text-blue-600' };
    if (netWorth < 1000000) return { category: 'Excellent', color: 'text-green-600' };
    return { category: 'Millionaire', color: 'text-purple-600' };
  };

  const category = getNetWorthCategory();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Net Worth Calculator</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-700">Assets (What You Own)</h4>
            <button
              onClick={addAsset}
              className="flex items-center space-x-1 text-green-600 hover:text-green-700"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add Asset</span>
            </button>
          </div>

          <div className="space-y-2">
            {assets.map((asset, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={asset.name}
                  onChange={(e) => updateAsset(index, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Asset name"
                />
                <input
                  type="number"
                  value={asset.value || ''}
                  onChange={(e) => updateAsset(index, 'value', Number(e.target.value))}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Value"
                />
                <button
                  onClick={() => removeAsset(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Assets:</span>
              <span className="text-xl font-bold text-green-600">
                ${totalAssets.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Liabilities Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-700">Liabilities (What You Owe)</h4>
            <button
              onClick={addLiability}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add Liability</span>
            </button>
          </div>

          <div className="space-y-2">
            {liabilities.map((liability, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={liability.name}
                  onChange={(e) => updateLiability(index, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Liability name"
                />
                <input
                  type="number"
                  value={liability.value || ''}
                  onChange={(e) => updateLiability(index, 'value', Number(e.target.value))}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Amount"
                />
                <button
                  onClick={() => removeLiability(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-red-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Liabilities:</span>
              <span className="text-xl font-bold text-red-600">
                ${totalLiabilities.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Net Worth Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold mb-4 text-center">Your Net Worth</h4>
        <div className="text-center">
          <p className="text-4xl font-bold mb-2" style={{ color: netWorth >= 0 ? '#10B981' : '#EF4444' }}>
            ${netWorth.toLocaleString()}
          </p>
          <p className={`text-lg font-medium ${category.color}`}>
            {category.category}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Total Assets</p>
            <p className="text-xl font-bold text-green-600">${totalAssets.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Total Liabilities</p>
            <p className="text-xl font-bold text-red-600">${totalLiabilities.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Debt-to-Asset Ratio</p>
            <p className="text-xl font-bold text-blue-600">
              {totalAssets > 0 ? ((totalLiabilities / totalAssets) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Net Worth Building Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Track your net worth monthly to monitor progress</p>
          <p>• Focus on increasing assets and decreasing liabilities</p>
          <p>• Invest in appreciating assets (stocks, real estate, education)</p>
          <p>• Pay down high-interest debt first</p>
          <p>• Build an emergency fund before investing</p>
          <p>• Consider tax-advantaged accounts (401k, IRA, HSA)</p>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCalculator;