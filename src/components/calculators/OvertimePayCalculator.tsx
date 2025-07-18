import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const OvertimePayCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [regularHours, setRegularHours] = useState<number>(40);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<number>(1.5);
  const [doubleTimeHours, setDoubleTimeHours] = useState<number>(0);
  const [doubleTimeMultiplier, setDoubleTimeMultiplier] = useState<number>(2.0);

  const regularPay = hourlyRate * regularHours;
  const overtimePay = hourlyRate * overtimeMultiplier * overtimeHours;
  const doubleTimePay = hourlyRate * doubleTimeMultiplier * doubleTimeHours;
  const totalPay = regularPay + overtimePay + doubleTimePay;
  const totalHours = regularHours + overtimeHours + doubleTimeHours;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Overtime Pay Calculator</h3>
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
            Regular Hours
          </label>
          <input
            type="number"
            value={regularHours || ''}
            onChange={(e) => setRegularHours(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overtime Hours
          </label>
          <input
            type="number"
            value={overtimeHours || ''}
            onChange={(e) => setOvertimeHours(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overtime Multiplier
          </label>
          <select
            value={overtimeMultiplier}
            onChange={(e) => setOvertimeMultiplier(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={1.5}>1.5x (Time and a half)</option>
            <option value={2.0}>2.0x (Double time)</option>
            <option value={1.25}>1.25x (Quarter time)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Double Time Hours
          </label>
          <input
            type="number"
            value={doubleTimeHours || ''}
            onChange={(e) => setDoubleTimeHours(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Double Time Multiplier
          </label>
          <input
            type="number"
            step="0.1"
            value={doubleTimeMultiplier || ''}
            onChange={(e) => setDoubleTimeMultiplier(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2.0"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Pay Breakdown:</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Regular Pay ({regularHours} hrs @ ${hourlyRate}/hr):</span>
            <span className="font-medium">${regularPay.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Overtime Pay ({overtimeHours} hrs @ ${(hourlyRate * overtimeMultiplier).toFixed(2)}/hr):</span>
            <span className="font-medium">${overtimePay.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Double Time Pay ({doubleTimeHours} hrs @ ${(hourlyRate * doubleTimeMultiplier).toFixed(2)}/hr):</span>
            <span className="font-medium">${doubleTimePay.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Total Pay ({totalHours} hrs):</span>
            <span className="font-semibold text-blue-600">${totalPay.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Overtime Laws:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Federal law requires 1.5x pay for hours over 40 per week</p>
          <p>• Some states have daily overtime rules (e.g., over 8 hours/day)</p>
          <p>• Double time may apply for holidays or excessive hours</p>
          <p>• Check your local labor laws for specific requirements</p>
        </div>
      </div>
    </div>
  );
};

export default OvertimePayCalculator;