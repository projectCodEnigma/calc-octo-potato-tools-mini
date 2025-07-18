import React, { useState } from 'react';
import { Droplets } from 'lucide-react';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState<number>(0);
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [climate, setClimate] = useState<string>('temperate');
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>('male');
  const [pregnant, setPregnant] = useState<boolean>(false);
  const [breastfeeding, setBreastfeeding] = useState<boolean>(false);

  const calculateWaterIntake = () => {
    if (weight <= 0) return 0;

    // Base calculation: 35ml per kg of body weight
    let baseIntake = weight * 35;

    // Activity level adjustments
    const activityMultipliers = {
      sedentary: 1.0,
      light: 1.1,
      moderate: 1.2,
      active: 1.4,
      very_active: 1.6
    };

    baseIntake *= activityMultipliers[activityLevel as keyof typeof activityMultipliers];

    // Climate adjustments
    const climateMultipliers = {
      cold: 0.9,
      temperate: 1.0,
      hot: 1.2,
      very_hot: 1.4
    };

    baseIntake *= climateMultipliers[climate as keyof typeof climateMultipliers];

    // Age adjustments
    if (age > 65) {
      baseIntake *= 1.1; // Older adults need more water
    } else if (age < 18) {
      baseIntake *= 0.9; // Children need less per kg
    }

    // Gender adjustments (men typically need more)
    if (gender === 'male') {
      baseIntake *= 1.05;
    }

    // Pregnancy and breastfeeding
    if (pregnant) {
      baseIntake += 300; // Additional 300ml for pregnancy
    }
    if (breastfeeding) {
      baseIntake += 700; // Additional 700ml for breastfeeding
    }

    return Math.round(baseIntake);
  };

  const dailyIntake = calculateWaterIntake();
  const cupsPerDay = Math.round(dailyIntake / 240); // 240ml per cup
  const bottlesPerDay = Math.round(dailyIntake / 500); // 500ml bottles
  const glassesPerDay = Math.round(dailyIntake / 200); // 200ml glasses

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Droplets className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Water Intake Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight || ''}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your weight"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            value={age || ''}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Level
          </label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="light">Light (1-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
            <option value="very_active">Very Active (2x/day or intense)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Climate
          </label>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="cold">Cold</option>
            <option value="temperate">Temperate</option>
            <option value="hot">Hot</option>
            <option value="very_hot">Very Hot/Humid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Conditions
          </label>
          <div className="space-y-2">
            {gender === 'female' && (
              <>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={pregnant}
                    onChange={(e) => setPregnant(e.target.checked)}
                    className="mr-2"
                  />
                  Pregnant
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={breastfeeding}
                    onChange={(e) => setBreastfeeding(e.target.checked)}
                    className="mr-2"
                  />
                  Breastfeeding
                </label>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Daily Water Intake Recommendation:</h4>
        <div className="text-center p-4 bg-white rounded-lg mb-4">
          <p className="text-4xl font-bold text-blue-600 mb-2">
            {dailyIntake} ml
          </p>
          <p className="text-sm text-gray-600">per day</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Cups (240ml)</p>
            <p className="text-xl font-bold text-green-600">{cupsPerDay}</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Bottles (500ml)</p>
            <p className="text-xl font-bold text-purple-600">{bottlesPerDay}</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Glasses (200ml)</p>
            <p className="text-xl font-bold text-orange-600">{glassesPerDay}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Hydration Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Start your day with a glass of water</p>
          <p>• Drink water before, during, and after exercise</p>
          <p>• Keep a water bottle with you throughout the day</p>
          <p>• Eat water-rich foods like fruits and vegetables</p>
          <p>• Monitor your urine color - pale yellow indicates good hydration</p>
          <p>• Increase intake during illness, hot weather, or high altitude</p>
        </div>
      </div>
    </div>
  );
};

export default WaterIntakeCalculator;