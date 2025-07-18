import React, { useState } from 'react';
import { TrendingDown, Plus, Minus } from 'lucide-react';

const FunnelDropoffCalculator = () => {
  const [funnelStages, setFunnelStages] = useState<Array<{name: string, visitors: number}>>([
    { name: 'Website Visitors', visitors: 10000 },
    { name: 'Product Page Views', visitors: 3000 },
    { name: 'Add to Cart', visitors: 800 },
    { name: 'Checkout Started', visitors: 400 },
    { name: 'Purchase Completed', visitors: 200 }
  ]);

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

  const calculateFunnelMetrics = () => {
    return funnelStages.map((stage, index) => {
      if (index === 0) {
        return { 
          ...stage, 
          conversionRate: 100, 
          dropOffRate: 0, 
          dropOffCount: 0,
          cumulativeConversion: 100
        };
      }
      
      const previousStage = funnelStages[index - 1];
      const conversionRate = previousStage.visitors > 0 ? (stage.visitors / previousStage.visitors) * 100 : 0;
      const dropOffRate = 100 - conversionRate;
      const dropOffCount = previousStage.visitors - stage.visitors;
      const cumulativeConversion = funnelStages[0].visitors > 0 ? (stage.visitors / funnelStages[0].visitors) * 100 : 0;
      
      return { 
        ...stage, 
        conversionRate, 
        dropOffRate, 
        dropOffCount: Math.max(0, dropOffCount),
        cumulativeConversion
      };
    });
  };

  const funnelData = calculateFunnelMetrics();
  const overallConversion = funnelStages.length > 1 && funnelStages[0].visitors > 0 ? 
    (funnelStages[funnelStages.length - 1].visitors / funnelStages[0].visitors) * 100 : 0;

  const getBiggestDropOff = () => {
    let maxDropOff = 0;
    let maxDropOffStage = '';
    
    funnelData.forEach((stage, index) => {
      if (index > 0 && stage.dropOffRate > maxDropOff) {
        maxDropOff = stage.dropOffRate;
        maxDropOffStage = `${funnelData[index - 1].name} → ${stage.name}`;
      }
    });
    
    return { rate: maxDropOff, stage: maxDropOffStage };
  };

  const biggestDropOff = getBiggestDropOff();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingDown className="w-6 h-6 text-red-600" />
        <h3 className="text-lg font-semibold">Funnel Drop-off Calculator</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-700">Funnel Stages</h4>
          <button
            onClick={addStage}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Stage</span>
          </button>
        </div>

        <div className="space-y-3">
          {funnelStages.map((stage, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                {index + 1}
              </div>
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
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Funnel Performance:</h4>
        <div className="space-y-3">
          {funnelData.map((stage, index) => (
            <div key={index} className="bg-white rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-medium">{stage.name}</h5>
                <span className="text-lg font-bold text-blue-600">
                  {stage.visitors.toLocaleString()}
                </span>
              </div>
              
              {index > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Step Conversion:</span>
                    <span className="ml-2 font-medium text-green-600">
                      {stage.conversionRate.toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Drop-off:</span>
                    <span className="ml-2 font-medium text-red-600">
                      {stage.dropOffRate.toFixed(1)}% ({stage.dropOffCount.toLocaleString()})
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Overall:</span>
                    <span className="ml-2 font-medium text-blue-600">
                      {stage.cumulativeConversion.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}
              
              {index === 0 && (
                <div className="text-sm text-gray-600">
                  Starting point - 100% of traffic
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Funnel Analysis:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Overall Conversion</p>
            <p className="text-2xl font-bold text-blue-600">
              {overallConversion.toFixed(2)}%
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Biggest Drop-off</p>
            <p className="text-2xl font-bold text-red-600">
              {biggestDropOff.rate.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {biggestDropOff.stage}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Optimization Opportunities:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Focus on the stage with the highest drop-off rate</p>
          <p>• A/B test different page layouts and copy</p>
          <p>• Reduce friction in the conversion process</p>
          <p>• Add trust signals and social proof</p>
          <p>• Optimize page loading speed</p>
          <p>• Simplify forms and checkout processes</p>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Industry Benchmarks:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• E-commerce overall conversion: 2-3%</p>
          <p>• SaaS trial to paid: 15-20%</p>
          <p>• Lead generation: 5-15%</p>
          <p>• Email signup: 1-5%</p>
          <p>• Cart abandonment: 60-80% (typical)</p>
        </div>
      </div>
    </div>
  );
};

export default FunnelDropoffCalculator;