import React, { useState } from 'react';
import { Percent } from 'lucide-react';

const PercentageCalculator = () => {
  const [calculationType, setCalculationType] = useState<string>('basic');
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  const calculateBasicPercentage = () => {
    return (value1 * percentage) / 100;
  };

  const calculateWhatPercent = () => {
    if (value2 === 0) return 0;
    return (value1 / value2) * 100;
  };

  const calculatePercentageChange = () => {
    if (value1 === 0) return 0;
    return ((value2 - value1) / value1) * 100;
  };

  const calculatePercentageIncrease = () => {
    return value1 + (value1 * percentage) / 100;
  };

  const calculatePercentageDecrease = () => {
    return value1 - (value1 * percentage) / 100;
  };

  const getResult = () => {
    switch (calculationType) {
      case 'basic':
        return calculateBasicPercentage();
      case 'whatPercent':
        return calculateWhatPercent();
      case 'change':
        return calculatePercentageChange();
      case 'increase':
        return calculatePercentageIncrease();
      case 'decrease':
        return calculatePercentageDecrease();
      default:
        return 0;
    }
  };

  const result = getResult();

  const getResultLabel = () => {
    switch (calculationType) {
      case 'basic':
        return `${percentage}% of ${value1} is`;
      case 'whatPercent':
        return `${value1} is what percent of ${value2}?`;
      case 'change':
        return `Percentage change from ${value1} to ${value2}`;
      case 'increase':
        return `${value1} increased by ${percentage}% is`;
      case 'decrease':
        return `${value1} decreased by ${percentage}% is`;
      default:
        return 'Result';
    }
  };

  const getResultUnit = () => {
    switch (calculationType) {
      case 'basic':
        return '';
      case 'whatPercent':
        return '%';
      case 'change':
        return '%';
      case 'increase':
        return '';
      case 'decrease':
        return '';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Percent className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Percentage Calculator</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calculation Type
        </label>
        <select
          value={calculationType}
          onChange={(e) => setCalculationType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="basic">What is X% of Y?</option>
          <option value="whatPercent">X is what percent of Y?</option>
          <option value="change">Percentage change from X to Y</option>
          <option value="increase">Increase X by Y%</option>
          <option value="decrease">Decrease X by Y%</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {calculationType === 'basic' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Percentage (%)
              </label>
              <input
                type="number"
                value={percentage || ''}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter percentage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value
              </label>
              <input
                type="number"
                value={value1 || ''}
                onChange={(e) => setValue1(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter value"
              />
            </div>
          </>
        )}

        {calculationType === 'whatPercent' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Value
              </label>
              <input
                type="number"
                value={value1 || ''}
                onChange={(e) => setValue1(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter first value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second Value
              </label>
              <input
                type="number"
                value={value2 || ''}
                onChange={(e) => setValue2(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter second value"
              />
            </div>
          </>
        )}

        {calculationType === 'change' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Value
              </label>
              <input
                type="number"
                value={value1 || ''}
                onChange={(e) => setValue1(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter original value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Value
              </label>
              <input
                type="number"
                value={value2 || ''}
                onChange={(e) => setValue2(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter new value"
              />
            </div>
          </>
        )}

        {(calculationType === 'increase' || calculationType === 'decrease') && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Value
              </label>
              <input
                type="number"
                value={value1 || ''}
                onChange={(e) => setValue1(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter original value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Percentage (%)
              </label>
              <input
                type="number"
                value={percentage || ''}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter percentage"
              />
            </div>
          </>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Result:</h4>
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-600 mb-2">{getResultLabel()}</p>
          <p className="text-3xl font-bold text-green-600">
            {isNaN(result) ? '0' : result.toFixed(2)}{getResultUnit()}
          </p>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Common Percentage Calculations:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium mb-2">Tips & Discounts:</h5>
            <div className="space-y-1 text-gray-700">
              <p>• 15% tip: multiply by 0.15</p>
              <p>• 20% tip: multiply by 0.20</p>
              <p>• 25% off: multiply by 0.75</p>
              <p>• 50% off: divide by 2</p>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-2">Quick Mental Math:</h5>
            <div className="space-y-1 text-gray-700">
              <p>• 10%: move decimal one place left</p>
              <p>• 1%: move decimal two places left</p>
              <p>• 25%: divide by 4</p>
              <p>• 75%: multiply by 3, then divide by 4</p>
            </div>
          </div>
        </div>
      </div>

      {calculationType === 'change' && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Percentage Change Interpretation:</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• Positive result = Increase</p>
            <p>• Negative result = Decrease</p>
            <p>• 100% increase = Value doubled</p>
            <p>• 50% decrease = Value halved</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PercentageCalculator;