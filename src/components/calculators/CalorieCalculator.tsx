import React, { useState } from 'react';
import { Flame } from 'lucide-react';

const CalorieCalculator = () => {
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>('male');
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [activity, setActivity] = useState<string>('sedentary');
  const [goal, setGoal] = useState<string>('maintain');

  const calculateBMR = () => {
    if (weight <= 0 || height <= 0 || age <= 0) return 0;
    
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  };

  const getActivityMultiplier = () => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    return multipliers[activity as keyof typeof multipliers] || 1.2;
  };

  const bmr = calculateBMR();
  const tdee = bmr * getActivityMultiplier();
  
  const getCalorieGoal = () => {
    switch (goal) {
      case 'lose': return tdee - 500;
      case 'gain': return tdee + 500;
      default: return tdee;
    }
  };

  const calorieGoal = getCalorieGoal();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Flame className="w-6 h-6 text-orange-600" />
        <h3 className="text-lg font-semibold">Calorie Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            Activity Level
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
            Goal
          </label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Your Calorie Needs:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">BMR</p>
            <p className="text-2xl font-bold text-blue-600">
              {bmr.toFixed(0)} cal
            </p>
            <p className="text-xs text-gray-500">Base metabolic rate</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">TDEE</p>
            <p className="text-2xl font-bold text-green-600">
              {tdee.toFixed(0)} cal
            </p>
            <p className="text-xs text-gray-500">Total daily energy expenditure</p>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Daily Calorie Goal:</h4>
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-4xl font-bold text-orange-600 mb-2">
            {calorieGoal.toFixed(0)} cal
          </p>
          <p className="text-sm text-gray-600">
            {goal === 'lose' && 'For weight loss (1 lb per week)'}
            {goal === 'maintain' && 'For weight maintenance'}
            {goal === 'gain' && 'For weight gain (1 lb per week)'}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Macronutrient Suggestions:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <div className="flex justify-between">
            <span>Protein (25-30%):</span>
            <span className="font-medium">{Math.round(calorieGoal * 0.275 / 4)}g</span>
          </div>
          <div className="flex justify-between">
            <span>Carbohydrates (45-50%):</span>
            <span className="font-medium">{Math.round(calorieGoal * 0.475 / 4)}g</span>
          </div>
          <div className="flex justify-between">
            <span>Fats (20-25%):</span>
            <span className="font-medium">{Math.round(calorieGoal * 0.225 / 9)}g</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;