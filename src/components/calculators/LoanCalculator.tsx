import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [years, setYears] = useState<number>(0);

  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  
  const monthlyPayment = monthlyRate > 0 ? 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
    (Math.pow(1 + monthlyRate, numPayments) - 1) : 
    principal / numPayments;

  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calculator className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Loan Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount
          </label>
          <input
            type="number"
            value={principal || ''}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter loan amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={rate || ''}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="5.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Term (years)
          </label>
          <input
            type="number"
            value={years || ''}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="30"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Loan Summary:</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Monthly Payment:</span>
            <span className="text-green-600 font-bold">
              ${isNaN(monthlyPayment) ? '0.00' : monthlyPayment.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Payment:</span>
            <span className="text-blue-600">
              ${isNaN(totalPayment) ? '0.00' : totalPayment.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Interest:</span>
            <span className="text-red-600">
              ${isNaN(totalInterest) ? '0.00' : totalInterest.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {principal > 0 && rate > 0 && years > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Payment Breakdown:</h4>
          <div className="text-sm text-gray-700">
            <p>• You'll pay ${monthlyPayment.toFixed(2)} per month for {years} years</p>
            <p>• Total of {numPayments} payments</p>
            <p>• Interest represents {((totalInterest / totalPayment) * 100).toFixed(1)}% of total payments</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;