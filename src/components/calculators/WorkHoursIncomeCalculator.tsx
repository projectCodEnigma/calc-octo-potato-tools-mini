import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const WorkHoursIncomeCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);
  const [overtimeRate, setOvertimeRate] = useState<number>(1.5);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(22);
  const [benefits, setBenefits] = useState<{
    health: number;
    retirement: number;
    vacation: number;
    other: number;
  }>({
    health: 200,
    retirement: 150,
    vacation: 100,
    other: 50
  });

  const regularHoursPerWeek = hoursPerDay * daysPerWeek;
  const totalHoursPerWeek = regularHoursPerWeek + overtimeHours;
  const regularPay = hourlyRate * regularHoursPerWeek;
  const overtimePay = hourlyRate * overtimeRate * overtimeHours;
  const weeklyGrossPay = regularPay + overtimePay;
  const monthlyGrossPay = weeklyGrossPay * 4.33;
  const annualGrossPay = weeklyGrossPay * weeksPerYear;

  const totalBenefits = Object.values(benefits).reduce((sum, benefit) => sum + benefit, 0);
  const monthlyBenefits = totalBenefits;
  const annualBenefits = totalBenefits * 12;

  const weeklyTaxes = weeklyGrossPay * (taxRate / 100);
  const weeklyNetPay = weeklyGrossPay - weeklyTaxes;
  const monthlyNetPay = weeklyNetPay * 4.33;
  const annualNetPay = weeklyNetPay * weeksPerYear;

  const totalCompensation = annualGrossPay + annualBenefits;

  const updateBenefit = (key: string, value: number) => {
    setBenefits(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Work Hours to Income Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hourly Rate ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={hourlyRate || ''}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="25.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hours per Day
          </label>
          <input
            type="number"
            value={hoursPerDay || ''}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="8"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days per Week
          </label>
          <input
            type="number"
            value={daysPerWeek || ''}
            onChange={(e) => setDaysPerWeek(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="5"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="52"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overtime Hours per Week
          </label>
          <input
            type="number"
            value={overtimeHours || ''}
            onChange={(e) => setOvertimeHours(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overtime Rate Multiplier
          </label>
          <input
            type="number"
            step="0.1"
            value={overtimeRate || ''}
            onChange={(e) => setOvertimeRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1.5"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Rate (%)
          </label>
          <input
            type="number"
            value={taxRate || ''}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="22"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Monthly Benefits Value</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health Insurance ($)
            </label>
            <input
              type="number"
              value={benefits.health || ''}
              onChange={(e) => updateBenefit('health', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retirement Match ($)
            </label>
            <input
              type="number"
              value={benefits.retirement || ''}
              onChange={(e) => updateBenefit('retirement', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paid Time Off Value ($)
            </label>
            <input
              type="number"
              value={benefits.vacation || ''}
              onChange={(e) => updateBenefit('vacation', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Benefits ($)
            </label>
            <input
              type="number"
              value={benefits.other || ''}
              onChange={(e) => updateBenefit('other', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="50"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Income Breakdown:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Weekly</p>
            <p className="text-xl font-bold text-green-600">${weeklyGrossPay.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Gross</p>
            <p className="text-lg font-medium text-blue-600">${weeklyNetPay.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Net</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Monthly</p>
            <p className="text-xl font-bold text-green-600">${monthlyGrossPay.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Gross</p>
            <p className="text-lg font-medium text-blue-600">${monthlyNetPay.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Net</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Annual</p>
            <p className="text-xl font-bold text-green-600">${annualGrossPay.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Gross</p>
            <p className="text-lg font-medium text-blue-600">${annualNetPay.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Net</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Total Compensation:</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Annual Gross Salary:</span>
            <span className="font-medium">${annualGrossPay.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Annual Benefits Value:</span>
            <span className="font-medium">${annualBenefits.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Total Compensation:</span>
            <span className="font-semibold text-blue-600">${totalCompensation.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Work Schedule Summary:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Regular hours: {regularHoursPerWeek} hours/week</p>
          <p>• Overtime hours: {overtimeHours} hours/week</p>
          <p>• Total hours: {totalHoursPerWeek} hours/week</p>
          <p>• Annual hours: {(totalHoursPerWeek * weeksPerYear).toLocaleString()} hours</p>
          <p>• Effective hourly rate: ${(annualGrossPay / (totalHoursPerWeek * weeksPerYear)).toFixed(2)}/hour</p>
        </div>
      </div>
    </div>
  );
};

export default WorkHoursIncomeCalculator;