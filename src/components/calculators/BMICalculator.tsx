import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const BMICalculator = () => {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [unit, setUnit] = useState<string>('metric');

  const calculateBMI = () => {
    if (weight <= 0 || height <= 0) return 0;
    
    if (unit === 'metric') {
      return weight / Math.pow(height / 100, 2);
    } else {
      return (weight / Math.pow(height, 2)) * 703;
    }
  };

  const bmi = calculateBMI();
  
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Heart className="w-6 h-6 text-orange-600" />
        <h3 className="text-lg font-semibold">BMI Calculator</h3>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Unit System
        </label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="metric">Metric (kg, cm)</option>
          <option value="imperial">Imperial (lbs, inches)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input
            type="number"
            value={weight || ''}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input
            type="number"
            value={height || ''}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">BMI Results:</h4>
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Your BMI</p>
          <p className="text-4xl font-bold text-orange-600 mb-2">
            {bmi.toFixed(1)}
          </p>
          <p className={`text-lg font-semibold ${bmiCategory.color}`}>
            {bmiCategory.category}
          </p>
        </div>
      </div>

      <div className="bg-orange-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">BMI Categories:</h4>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Underweight:</span>
            <span className="text-blue-600">Below 18.5</span>
          </div>
          <div className="flex justify-between">
            <span>Normal weight:</span>
            <span className="text-green-600">18.5 - 24.9</span>
          </div>
          <div className="flex justify-between">
            <span>Overweight:</span>
            <span className="text-yellow-600">25 - 29.9</span>
          </div>
          <div className="flex justify-between">
            <span>Obese:</span>
            <span className="text-red-600">30 and above</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Important Note:</h4>
        <p className="text-sm text-gray-700">
          BMI is a screening tool and doesn't diagnose body fatness or health. 
          It doesn't account for muscle mass, bone density, or distribution of fat. 
          Consult with a healthcare provider for a complete health assessment.
        </p>
      </div>
    </div>
  );
};

export default BMICalculator;