import React, { useState } from 'react';
import { Target } from 'lucide-react';

const ConversionRateCalculator = () => {
  const [visitors, setVisitors] = useState<number>(0);
  const [conversions, setConversions] = useState<number>(0);
  const [funnelStages, setFunnelStages] = useState<Array<{name: string, visitors: number}>>([
    { name: 'Website Visitors', visitors: 10000 },
    { name: 'Product Page Views', visitors: 3000 },
    { name: 'Add to Cart', visitors: 800 },
    { name: 'Checkout Started', visitors: 400 },
    { name: 'Purchase Completed', visitors: 200 }
  ]);

  const conversionRate = visitors > 0 ? (conversions / visitors) * 100 : 0;

  const addStage = () => {
    setFunnelStages([...funnelStages, { name: '', visitors: 0 }]);
  };

  const removeStage = (index: number) => {
    if (funnelStages.length > 2) {
      setFunnelStages(funnelStages.filter((_, i) => i !== index));
    }
  };

  const updateStage = (index: number, field: string, value: string | number) => {
    const newStages = [...funnelStages];
    newStages[index] = { ...newStages[index], [field]: value };
    setFunnelStages(newStages);
  };

  const calculateFunnelRates = () => {
    return funnelStages.map((stage, index) => {
      if (index === 0) {
        return { ...stage, conversionRate: 100, dropOffRate: 0 };
      }
      const previousStage = funnelStages[index - 1];
      const conversionRate = previousStage.visitors > 0 ? (stage.visitors / previousStage.visitors) * 100 : 0;
      const dropOffRate = 100 - conversionRate;
      return { ...stage, conversionRate, dropOffRate };
    });
  };

  const funnelData = calculateFunnelRates();
  const overallConversionRate = funnelStages.length > 1 && funnelStages[0].visitors > 0 ? 
    (funnelStages[funnelStages.length - 1].visitors / funnelStages[0].visitors) * 100 : 0;

  const getConversionBenchmarks = () => {
    return [
      { industry: 'E-commerce', rate: '2-3%', color: 'text-blue-600' },
      { industry: 'SaaS', rate: '3-5%', color: 'text-green-600' },
      { industry: 'Lead Generation', rate: '5-15%', color: 'text-purple-600' },
      { industry: 'B2B Services', rate: '2-5%', color: 'text-orange-600' }
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Target className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Conversion Rate Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Visitors
          </label>
          <input
            type="number"
            value={visitors || ''}
            onChange={(e) => setVisitors(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conversions
          </label>
          <input
            type="number"
            value={conversions || ''}
            onChange={(e) => setConversions(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="250"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Basic Conversion Rate:</h4>
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-4xl font-bold text-blue-600 mb-2">
            {conversionRate.toFixed(2)}%
          </p>
          <p className="text-sm text-gray-600">
            {conversions.toLocaleString()} conversions from {visitors.toLocaleString()} visitors
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-700">Conversion Funnel Analysis</h4>
          <button
            onClick={addStage}
            className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm"
          >
            Add Stage
          </button>
        </div>

        <div className="space-y-3">
          {funnelStages.map((stage, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={stage.name}
                onChange={(e) => updateStage(index, 'name', e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Stage name"
              />
              <input
                type="number"
                value={stage.visitors || ''}
                onChange={(e) => updateStage(index, 'visitors', Number(e.target.value))}
                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Visitors"
              />
              {index > 0 && (
                <button
                  onClick={() => removeStage(index)}
                  className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Funnel Performance:</h4>
        <div className="space-y-2">
          {funnelData.map((stage, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
              <span className="font-medium">{stage.name}</span>
              <div className="text-right">
                <div className="text-sm">
                  {stage.visitors.toLocaleString()} visitors
                  {index > 0 && (
                    <span className="ml-2 text-blue-600">
                      ({stage.conversionRate.toFixed(1)}% conversion)
                    </span>
                  )}
                </div>
                {index > 0 && stage.dropOffRate > 0 && (
                  <div className="text-xs text-red-600">
                    {stage.dropOffRate.toFixed(1)}% drop-off
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-white rounded-lg border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Overall Conversion Rate:</span>
            <span className="text-xl font-bold text-blue-600">
              {overallConversionRate.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Industry Benchmarks:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {getConversionBenchmarks().map((benchmark, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-sm">{benchmark.industry}:</span>
              <span className={`font-medium ${benchmark.color}`}>{benchmark.rate}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Optimization Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• A/B test different headlines, CTAs, and page layouts</p>
          <p>• Reduce friction in your conversion process</p>
          <p>• Use social proof and testimonials</p>
          <p>• Optimize page loading speed</p>
          <p>• Ensure mobile responsiveness</p>
          <p>• Analyze where users drop off in your funnel</p>
        </div>
      </div>
    </div>
  );
};

export default ConversionRateCalculator;