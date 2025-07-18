import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

const SalaryConverter = () => {
  const [salary, setSalary] = useState<number>(0);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);

  const hourlyRate = salary / (hoursPerWeek * weeksPerYear);
  const monthlyRate = salary / 12;
  const weeklyRate = salary / weeksPerYear;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Salary to Hourly Converter</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Salary
          </label>
          <input
            type="number"
            value={salary || ''}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter annual salary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hours per Week
          </label>
          <input
            type="number"
            value={hoursPerWeek || ''}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weeks per Year
          </label>
          <input
            type="number"
            value={weeksPerYear || ''}
            onChange={(e) => setWeeksPerYear(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="52"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Conversion Results:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Hourly Rate</p>
            <p className="text-2xl font-bold text-green-600">
              ${hourlyRate.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Monthly Rate</p>
            <p className="text-2xl font-bold text-blue-600">
              ${monthlyRate.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Weekly Rate</p>
            <p className="text-2xl font-bold text-purple-600">
              ${weeklyRate.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Daily Rate</p>
            <p className="text-2xl font-bold text-orange-600">
              ${(weeklyRate / 5).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryConverter;