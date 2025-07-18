import React, { useState } from 'react';
import { Home } from 'lucide-react';

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [propertyTax, setPropertyTax] = useState<number>(0);
  const [insurance, setInsurance] = useState<number>(0);
  const [pmi, setPmi] = useState<number>(0);

  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  
  const monthlyPayment = monthlyRate > 0 ? 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
    (Math.pow(1 + monthlyRate, numPayments) - 1) : 
    loanAmount / numPayments;

  const monthlyTax = propertyTax / 12;
  const monthlyInsurance = insurance / 12;
  const monthlyPMI = pmi / 12;
  const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance + monthlyPMI;

  const totalInterest = (monthlyPayment * numPayments) - loanAmount;
  const totalCost = homePrice + totalInterest + (propertyTax * loanTerm) + (insurance * loanTerm) + (pmi * loanTerm);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Home className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Mortgage Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Home Price
          </label>
          <input
            type="number"
            value={homePrice || ''}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter home price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Down Payment
          </label>
          <input
            type="number"
            value={downPayment || ''}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter down payment"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Term (years)
          </label>
          <input
            type="number"
            value={loanTerm || ''}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={interestRate || ''}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="6.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Property Tax
          </label>
          <input
            type="number"
            value={propertyTax || ''}
            onChange={(e) => setPropertyTax(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter annual property tax"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Home Insurance
          </label>
          <input
            type="number"
            value={insurance || ''}
            onChange={(e) => setInsurance(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter annual insurance"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Monthly Payment Breakdown:</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Principal & Interest:</span>
            <span className="font-medium">${isNaN(monthlyPayment) ? '0.00' : monthlyPayment.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Property Tax:</span>
            <span className="font-medium">${monthlyTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Home Insurance:</span>
            <span className="font-medium">${monthlyInsurance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>PMI:</span>
            <span className="font-medium">${monthlyPMI.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Total Monthly Payment:</span>
            <span className="font-semibold text-green-600">
              ${isNaN(totalMonthlyPayment) ? '0.00' : totalMonthlyPayment.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Loan Summary:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Loan Amount</p>
            <p className="text-xl font-bold text-green-600">${loanAmount.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Interest</p>
            <p className="text-xl font-bold text-blue-600">${isNaN(totalInterest) ? '0.00' : totalInterest.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Cost</p>
            <p className="text-xl font-bold text-purple-600">${isNaN(totalCost) ? '0.00' : totalCost.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;