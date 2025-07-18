import React, { useState } from 'react';
import { Activity } from 'lucide-react';

const BodyFatCalculator = () => {
  const [method, setMethod] = useState<string>('navy');
  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [neck, setNeck] = useState<number>(0);
  const [waist, setWaist] = useState<number>(0);
  const [hip, setHip] = useState<number>(0);

  const calculateNavyBodyFat = () => {
    if (gender === 'male') {
      return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
  };

  const calculateBMIBodyFat = () => {
    const bmi = weight / Math.pow(height / 100, 2);
    if (gender === 'male') {
      return (1.20 * bmi) + (0.23 * age) - 16.2;
    } else {
      return (1.20 * bmi) + (0.23 * age) - 5.4;
    }
  };

  const bodyFat = method === 'navy' ? calculateNavyBodyFat() : calculateBMIBodyFat();

  const getBodyFatCategory = (bf: number, gender: string) => {
    if (gender === 'male') {
      if (bf < 6) return { category: 'Essential Fat', color: 'text-red-600' };
      if (bf < 14) return { category: 'Athletes', color: 'text-green-600' };
      if (bf < 18) return { category: 'Fitness', color: 'text-blue-600' };
      if (bf < 25) return { category: 'Average', color: 'text-yellow-600' };
      return { category: 'Obese', color: 'text-red-600' };
    } else {
      if (bf < 14) return { category: 'Essential Fat', color: 'text-red-600' };
      if (bf < 21) return { category: 'Athletes', color: 'text-green-600' };
      if (bf < 25) return { category: 'Fitness', color: 'text-blue-600' };
      if (bf < 32) return { category: 'Average', color: 'text-yellow-600' };
      return { category: 'Obese', color: 'text-red-600' };
    }
  };

  const category = getBodyFatCategory(bodyFat, gender);
  const leanBodyMass = weight * (1 - bodyFat / 100);
  const fatMass = weight - leanBodyMass;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="w-6 h-6 text-orange-600" />
        <h3 className="text-lg font-semibold">Body Fat Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Method
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="navy">US Navy Method</option>
            <option value="bmi">BMI-based Method</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            value={age || ''}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            value={height || ''}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter height in cm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight || ''}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter weight in kg"
          />
        </div>

        {method === 'navy' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Neck Circumference (cm)
              </label>
              <input
                type="number"
                value={neck || ''}
                onChange={(e) => setNeck(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Measure at narrowest point"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waist Circumference (cm)
              </label>
              <input
                type="number"
                value={waist || ''}
                onChange={(e) => setWaist(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Measure at navel level"
              />
            </div>

            {gender === 'female' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hip Circumference (cm)
                </label>
                <input
                  type="number"
                  value={hip || ''}
                  onChange={(e) => setHip(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Measure at widest point"
                />
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Body Fat Results:</h4>
        <div className="text-center p-4 bg-white rounded-lg mb-4">
          <p className="text-4xl font-bold text-orange-600 mb-2">
            {isNaN(bodyFat) ? '0.0' : bodyFat.toFixed(1)}%
          </p>
          <p className={`text-lg font-semibold ${category.color}`}>
            {category.category}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Lean Body Mass</p>
            <p className="text-xl font-bold text-green-600">
              {isNaN(leanBodyMass) ? '0.0' : leanBodyMass.toFixed(1)} kg
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Fat Mass</p>
            <p className="text-xl font-bold text-red-600">
              {isNaN(fatMass) ? '0.0' : fatMass.toFixed(1)} kg
            </p>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Body Fat Categories ({gender}):</h4>
        <div className="text-sm space-y-1">
          {gender === 'male' ? (
            <>
              <div className="flex justify-between">
                <span>Essential Fat:</span>
                <span className="text-red-600">2-5%</span>
              </div>
              <div className="flex justify-between">
                <span>Athletes:</span>
                <span className="text-green-600">6-13%</span>
              </div>
              <div className="flex justify-between">
                <span>Fitness:</span>
                <span className="text-blue-600">14-17%</span>
              </div>
              <div className="flex justify-between">
                <span>Average:</span>
                <span className="text-yellow-600">18-24%</span>
              </div>
              <div className="flex justify-between">
                <span>Obese:</span>
                <span className="text-red-600">25%+</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span>Essential Fat:</span>
                <span className="text-red-600">10-13%</span>
              </div>
              <div className="flex justify-between">
                <span>Athletes:</span>
                <span className="text-green-600">14-20%</span>
              </div>
              <div className="flex justify-between">
                <span>Fitness:</span>
                <span className="text-blue-600">21-24%</span>
              </div>
              <div className="flex justify-between">
                <span>Average:</span>
                <span className="text-yellow-600">25-31%</span>
              </div>
              <div className="flex justify-between">
                <span>Obese:</span>
                <span className="text-red-600">32%+</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Important Notes:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• US Navy method is more accurate but requires measurements</p>
          <p>• BMI-based method is an estimation and less precise</p>
          <p>• Results may vary based on muscle mass and body composition</p>
          <p>• Consult healthcare professionals for comprehensive assessment</p>
        </div>
      </div>
    </div>
  );
};

export default BodyFatCalculator;