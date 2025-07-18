import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const calculateAge = () => {
    if (!birthDate) return null;
    
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    
    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes
    };
  };

  const age = calculateAge();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold">Age Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Date
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Date (optional)
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {age && (
        <>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Exact Age:</h4>
            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-3xl font-bold text-purple-600 mb-2">
                {age.years} years, {age.months} months, {age.days} days
              </p>
              <p className="text-sm text-gray-600">
                As of {new Date(targetDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Age in Different Units:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Total Days</p>
                <p className="text-xl font-bold text-purple-600">
                  {age.totalDays.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Total Weeks</p>
                <p className="text-xl font-bold text-blue-600">
                  {age.totalWeeks.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Total Months</p>
                <p className="text-xl font-bold text-green-600">
                  {age.totalMonths.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-xl font-bold text-orange-600">
                  {age.totalHours.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Fun Facts:</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>• You've been alive for {age.totalMinutes.toLocaleString()} minutes</p>
              <p>• Your next birthday is in {365 - (age.totalDays % 365)} days</p>
              <p>• You've experienced {Math.floor(age.totalDays / 365.25)} leap years</p>
              <p>• If you sleep 8 hours a day, you've slept for {Math.floor(age.totalDays / 3)} days</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AgeCalculator;