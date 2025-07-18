import React, { useState } from 'react';
import { UserMinus } from 'lucide-react';

const CustomerChurnCalculator = () => {
  const [startingCustomers, setStartingCustomers] = useState<number>(0);
  const [endingCustomers, setEndingCustomers] = useState<number>(0);
  const [newCustomers, setNewCustomers] = useState<number>(0);
  const [timePeriod, setTimePeriod] = useState<string>('monthly');
  const [revenue, setRevenue] = useState<number>(0);

  const customersLost = startingCustomers + newCustomers - endingCustomers;
  const churnRate = startingCustomers > 0 ? (customersLost / startingCustomers) * 100 : 0;
  const retentionRate = 100 - churnRate;
  const revenueChurn = startingCustomers > 0 ? (customersLost * (revenue / startingCustomers)) : 0;

  const getChurnStatus = () => {
    if (churnRate <= 5) return { status: 'Excellent', color: 'text-green-600' };
    if (churnRate <= 10) return { status: 'Good', color: 'text-blue-600' };
    if (churnRate <= 20) return { status: 'Average', color: 'text-yellow-600' };
    return { status: 'High Risk', color: 'text-red-600' };
  };

  const churnStatus = getChurnStatus();

  const annualizeRate = (rate: number) => {
    switch (timePeriod) {
      case 'weekly': return rate * 52;
      case 'monthly': return rate * 12;
      case 'quarterly': return rate * 4;
      case 'annual': return rate;
      default: return rate * 12;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <UserMinus className="w-6 h-6 text-red-600" />
        <h3 className="text-lg font-semibold">Customer Churn Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Starting Customers
          </label>
          <input
            type="number"
            value={startingCustomers || ''}
            onChange={(e) => setStartingCustomers(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ending Customers
          </label>
          <input
            type="number"
            value={endingCustomers || ''}
            onChange={(e) => setEndingCustomers(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="950"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Customers Acquired
          </label>
          <input
            type="number"
            value={newCustomers || ''}
            onChange={(e) => setNewCustomers(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Period
          </label>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Revenue for Period ($)
          </label>
          <input
            type="number"
            value={revenue || ''}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="50000"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Churn Analysis:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Customers Lost</p>
            <p className="text-2xl font-bold text-red-600">{Math.max(0, customersLost)}</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Churn Rate</p>
            <p className={`text-2xl font-bold ${churnStatus.color}`}>
              {Math.max(0, churnRate).toFixed(2)}%
            </p>
            <p className={`text-sm font-medium ${churnStatus.color}`}>
              {churnStatus.status}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Retention Rate</p>
            <p className="text-2xl font-bold text-green-600">
              {Math.min(100, retentionRate).toFixed(2)}%
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Revenue Lost</p>
            <p className="text-2xl font-bold text-orange-600">
              ${Math.max(0, revenueChurn).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-red-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Projected Annual Impact:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Annual churn rate: {annualizeRate(churnRate).toFixed(1)}%</p>
          <p>• Annual revenue loss: ${annualizeRate(revenueChurn).toFixed(2)}</p>
          <p>• Customers lost per year: {Math.round(annualizeRate(customersLost))}</p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Churn Reduction Strategies:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Improve onboarding and customer success programs</p>
          <p>• Implement proactive customer support</p>
          <p>• Regular customer satisfaction surveys</p>
          <p>• Loyalty programs and retention incentives</p>
          <p>• Identify at-risk customers early with analytics</p>
          <p>• Personalize customer experiences</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerChurnCalculator;