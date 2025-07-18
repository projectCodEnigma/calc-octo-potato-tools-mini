import React, { useState } from 'react';
import { MousePointer } from 'lucide-react';

const CPMCalculator = () => {
  const [cost, setCost] = useState<number>(0);
  const [impressions, setImpressions] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);

  const cpm = impressions > 0 ? (cost / impressions) * 1000 : 0;
  const cpc = clicks > 0 ? cost / clicks : 0;
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <MousePointer className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">CPM/CPC Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Cost
          </label>
          <input
            type="number"
            value={cost || ''}
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter total cost"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Impressions
          </label>
          <input
            type="number"
            value={impressions || ''}
            onChange={(e) => setImpressions(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter impressions"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Clicks
          </label>
          <input
            type="number"
            value={clicks || ''}
            onChange={(e) => setClicks(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter clicks"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Campaign Metrics:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">CPM</p>
            <p className="text-2xl font-bold text-blue-600">
              ${cpm.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">Cost per 1,000 impressions</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">CPC</p>
            <p className="text-2xl font-bold text-green-600">
              ${cpc.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">Cost per click</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">CTR</p>
            <p className="text-2xl font-bold text-purple-600">
              {ctr.toFixed(2)}%
            </p>
            <p className="text-xs text-gray-500">Click-through rate</p>
          </div>
        </div>
      </div>

      {cost > 0 && impressions > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Campaign Analysis:</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• Average CTR for display ads: 0.5-1%</p>
            <p>• Average CTR for search ads: 2-5%</p>
            <p>• CPM typically ranges from $1-$20 depending on industry</p>
            {ctr > 0 && (
              <p className={`font-medium ${ctr >= 1 ? 'text-green-600' : 'text-orange-600'}`}>
                Your CTR is {ctr >= 1 ? 'above' : 'below'} average
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CPMCalculator;