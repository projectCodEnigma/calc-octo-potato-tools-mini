import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const DateCalculator = () => {
  const [calculationType, setCalculationType] = useState<string>('difference');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [baseDate, setBaseDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [operation, setOperation] = useState<string>('add');

  const calculateDateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const weeksDiff = Math.floor(daysDiff / 7);
    const monthsDiff = Math.abs(end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear())));
    const yearsDiff = Math.abs(end.getFullYear() - start.getFullYear());
    
    // Calculate exact difference
    let exactYears = end.getFullYear() - start.getFullYear();
    let exactMonths = end.getMonth() - start.getMonth();
    let exactDays = end.getDate() - start.getDate();
    
    if (exactDays < 0) {
      exactMonths--;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      exactDays += lastMonth.getDate();
    }
    
    if (exactMonths < 0) {
      exactYears--;
      exactMonths += 12;
    }
    
    return {
      days: daysDiff,
      weeks: weeksDiff,
      months: monthsDiff,
      years: yearsDiff,
      exactYears: Math.abs(exactYears),
      exactMonths: Math.abs(exactMonths),
      exactDays: Math.abs(exactDays),
      hours: daysDiff * 24,
      minutes: daysDiff * 24 * 60,
      seconds: daysDiff * 24 * 60 * 60
    };
  };

  const addSubtractDate = () => {
    const base = new Date(baseDate);
    const result = new Date(base);
    
    if (operation === 'add') {
      result.setFullYear(result.getFullYear() + years);
      result.setMonth(result.getMonth() + months);
      result.setDate(result.getDate() + days);
    } else {
      result.setFullYear(result.getFullYear() - years);
      result.setMonth(result.getMonth() - months);
      result.setDate(result.getDate() - days);
    }
    
    return result;
  };

  const getWeekday = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getDayOfYear = (dateString: string) => {
    const date = new Date(dateString);
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getWeekNumber = (dateString: string) => {
    const date = new Date(dateString);
    const start = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + start.getDay() + 1) / 7);
  };

  const difference = calculateDateDifference();
  const calculatedDate = addSubtractDate();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold">Date Calculator</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calculation Type
        </label>
        <select
          value={calculationType}
          onChange={(e) => setCalculationType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="difference">Date Difference</option>
          <option value="addSubtract">Add/Subtract Time</option>
          <option value="info">Date Information</option>
        </select>
      </div>

      {calculationType === 'difference' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {calculationType === 'addSubtract' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Date
            </label>
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="add">Add Time</option>
              <option value="subtract">Subtract Time</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years
              </label>
              <input
                type="number"
                value={years || ''}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Months
              </label>
              <input
                type="number"
                value={months || ''}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days
              </label>
              <input
                type="number"
                value={days || ''}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      )}

      {calculationType === 'info' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={baseDate}
            onChange={(e) => setBaseDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Results:</h4>
        
        {calculationType === 'difference' && (
          <div className="space-y-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Exact Difference</p>
              <p className="text-2xl font-bold text-purple-600">
                {difference.exactYears} years, {difference.exactMonths} months, {difference.exactDays} days
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Total Days</p>
                <p className="text-xl font-bold text-blue-600">{difference.days}</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Total Weeks</p>
                <p className="text-xl font-bold text-green-600">{difference.weeks}</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-xl font-bold text-orange-600">{difference.hours.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Total Minutes</p>
                <p className="text-xl font-bold text-red-600">{difference.minutes.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {calculationType === 'addSubtract' && (
          <div className="text-center p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Result Date</p>
            <p className="text-2xl font-bold text-purple-600">
              {calculatedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {calculatedDate.toISOString().split('T')[0]}
            </p>
          </div>
        )}

        {calculationType === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Day of Week</p>
              <p className="text-xl font-bold text-purple-600">{getWeekday(baseDate)}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Day of Year</p>
              <p className="text-xl font-bold text-blue-600">{getDayOfYear(baseDate)}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Week Number</p>
              <p className="text-xl font-bold text-green-600">{getWeekNumber(baseDate)}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Days Until New Year</p>
              <p className="text-xl font-bold text-orange-600">
                {Math.ceil((new Date(new Date(baseDate).getFullYear() + 1, 0, 1).getTime() - new Date(baseDate).getTime()) / (1000 * 60 * 60 * 24))}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-purple-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Date Facts:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Leap years occur every 4 years (except century years not divisible by 400)</p>
          <p>• February has 28 days (29 in leap years)</p>
          <p>• There are 365 days in a regular year, 366 in a leap year</p>
          <p>• The Gregorian calendar is used in most of the world</p>
          <p>• Week numbers start from the first week containing January 4th</p>
        </div>
      </div>
    </div>
  );
};

export default DateCalculator;