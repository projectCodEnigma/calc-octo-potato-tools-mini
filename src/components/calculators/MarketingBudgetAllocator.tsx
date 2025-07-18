import React, { useState } from 'react';
import { PieChart, Plus, Minus } from 'lucide-react';

const MarketingBudgetAllocator = () => {
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [channels, setChannels] = useState<Array<{name: string, percentage: number, cost: number}>>([
    { name: 'Google Ads', percentage: 30, cost: 0 },
    { name: 'Facebook Ads', percentage: 25, cost: 0 },
    { name: 'Content Marketing', percentage: 20, cost: 0 },
    { name: 'Email Marketing', percentage: 15, cost: 0 },
    { name: 'SEO', percentage: 10, cost: 0 }
  ]);

  const addChannel = () => {
    setChannels([...channels, { name: '', percentage: 0, cost: 0 }]);
  };

  const removeChannel = (index: number) => {
    if (channels.length > 1) {
      setChannels(channels.filter((_, i) => i !== index));
    }
  };

  const updateChannel = (index: number, field: string, value: string | number) => {
    const newChannels = [...channels];
    newChannels[index] = { ...newChannels[index], [field]: value };
    
    // Calculate cost based on percentage
    if (field === 'percentage') {
      newChannels[index].cost = (totalBudget * (value as number)) / 100;
    }
    
    setChannels(newChannels);
  };

  const normalizePercentages = () => {
    const totalPercentage = channels.reduce((sum, channel) => sum + channel.percentage, 0);
    if (totalPercentage !== 100 && totalPercentage > 0) {
      const normalizedChannels = channels.map(channel => ({
        ...channel,
        percentage: (channel.percentage / totalPercentage) * 100,
        cost: (totalBudget * channel.percentage / totalPercentage)
      }));
      setChannels(normalizedChannels);
    }
  };

  // Update costs when total budget changes
  React.useEffect(() => {
    const updatedChannels = channels.map(channel => ({
      ...channel,
      cost: (totalBudget * channel.percentage) / 100
    }));
    setChannels(updatedChannels);
  }, [totalBudget]);

  const totalPercentage = channels.reduce((sum, channel) => sum + channel.percentage, 0);
  const totalAllocated = channels.reduce((sum, channel) => sum + channel.cost, 0);
  const remaining = totalBudget - totalAllocated;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <PieChart className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Marketing Budget Allocator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Marketing Budget ($)
          </label>
          <input
            type="number"
            value={totalBudget || ''}
            onChange={(e) => setTotalBudget(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10000"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={normalizePercentages}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm"
          >
            Normalize to 100%
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-700">Marketing Channels</h4>
          <button
            onClick={addChannel}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Channel</span>
          </button>
        </div>

        <div className="space-y-3">
          {channels.map((channel, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={channel.name}
                onChange={(e) => updateChannel(index, 'name', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Channel name"
              />
              <input
                type="number"
                value={channel.percentage || ''}
                onChange={(e) => updateChannel(index, 'percentage', Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Percentage"
              />
              <div className="px-2 py-1 bg-white rounded text-sm font-medium text-green-600">
                ${channel.cost.toFixed(2)}
              </div>
              <button
                onClick={() => removeChannel(index)}
                className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded text-sm"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Budget Summary:</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total Budget:</span>
            <span className="font-medium">${totalBudget.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Allocated:</span>
            <span className="font-medium">${totalAllocated.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Percentage:</span>
            <span className={`font-medium ${totalPercentage === 100 ? 'text-green-600' : 'text-orange-600'}`}>
              {totalPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Remaining:</span>
            <span className={`font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${remaining.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Channel Breakdown:</h4>
        <div className="space-y-2">
          {channels.map((channel, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
              <span className="font-medium">{channel.name || `Channel ${index + 1}`}</span>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">${channel.cost.toFixed(2)}</span>
                <span className="text-sm text-gray-500 ml-2">({channel.percentage.toFixed(1)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Budget Allocation Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Allocate 40-60% to proven high-performing channels</p>
          <p>• Reserve 20-30% for testing new channels</p>
          <p>• Keep 10-20% for seasonal campaigns and opportunities</p>
          <p>• Track ROI for each channel and adjust monthly</p>
          <p>• Consider customer acquisition cost vs lifetime value</p>
        </div>
      </div>
    </div>
  );
};

export default MarketingBudgetAllocator;