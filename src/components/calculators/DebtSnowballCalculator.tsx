import React, { useState } from 'react';
import { Snowflake, Plus, Minus } from 'lucide-react';

const DebtSnowballCalculator = () => {
  const [debts, setDebts] = useState<Array<{name: string, balance: number, minPayment: number, interestRate: number}>>([
    { name: 'Credit Card 1', balance: 5000, minPayment: 150, interestRate: 18.99 },
    { name: 'Credit Card 2', balance: 2500, minPayment: 75, interestRate: 22.99 },
    { name: 'Car Loan', balance: 15000, minPayment: 350, interestRate: 6.5 }
  ]);
  const [extraPayment, setExtraPayment] = useState<number>(200);
  const [strategy, setStrategy] = useState<string>('snowball');

  const addDebt = () => {
    setDebts([...debts, { name: '', balance: 0, minPayment: 0, interestRate: 0 }]);
  };

  const removeDebt = (index: number) => {
    setDebts(debts.filter((_, i) => i !== index));
  };

  const updateDebt = (index: number, field: string, value: string | number) => {
    const newDebts = [...debts];
    newDebts[index] = { ...newDebts[index], [field]: value };
    setDebts(newDebts);
  };

  const calculatePayoffPlan = () => {
    let sortedDebts = [...debts];
    
    if (strategy === 'snowball') {
      // Sort by balance (smallest first)
      sortedDebts.sort((a, b) => a.balance - b.balance);
    } else {
      // Sort by interest rate (highest first)
      sortedDebts.sort((a, b) => b.interestRate - a.interestRate);
    }

    const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
    const totalAvailable = totalMinPayments + extraPayment;
    
    let payoffOrder = [];
    let remainingDebts = [...sortedDebts];
    let currentExtraPayment = extraPayment;
    let totalInterest = 0;
    let totalTime = 0;

    while (remainingDebts.length > 0) {
      const targetDebt = remainingDebts[0];
      const monthlyPayment = targetDebt.minPayment + currentExtraPayment;
      const monthlyInterestRate = targetDebt.interestRate / 100 / 12;
      
      let months = 0;
      let balance = targetDebt.balance;
      let interestPaid = 0;

      while (balance > 0 && months < 600) { // Cap at 50 years
        const interestCharge = balance * monthlyInterestRate;
        const principalPayment = Math.min(monthlyPayment - interestCharge, balance);
        
        balance -= principalPayment;
        interestPaid += interestCharge;
        months++;
      }

      payoffOrder.push({
        ...targetDebt,
        months,
        interestPaid,
        monthlyPayment
      });

      totalInterest += interestPaid;
      totalTime = Math.max(totalTime, months);
      currentExtraPayment += targetDebt.minPayment;
      remainingDebts.shift();
    }

    return { payoffOrder, totalInterest, totalTime };
  };

  const { payoffOrder, totalInterest, totalTime } = calculatePayoffPlan();
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Snowflake className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Debt Snowball Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Extra Monthly Payment ($)
          </label>
          <input
            type="number"
            value={extraPayment || ''}
            onChange={(e) => setExtraPayment(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payoff Strategy
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="snowball">Debt Snowball (Smallest Balance First)</option>
            <option value="avalanche">Debt Avalanche (Highest Interest First)</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-700">Your Debts</h4>
          <button
            onClick={addDebt}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Debt</span>
          </button>
        </div>

        <div className="space-y-3">
          {debts.map((debt, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={debt.name}
                onChange={(e) => updateDebt(index, 'name', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Debt name"
              />
              <input
                type="number"
                value={debt.balance || ''}
                onChange={(e) => updateDebt(index, 'balance', Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Balance"
              />
              <input
                type="number"
                value={debt.minPayment || ''}
                onChange={(e) => updateDebt(index, 'minPayment', Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Min payment"
              />
              <input
                type="number"
                step="0.01"
                value={debt.interestRate || ''}
                onChange={(e) => updateDebt(index, 'interestRate', Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Interest %"
              />
              <button
                onClick={() => removeDebt(index)}
                className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded text-sm"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Payoff Summary:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Total Debt</p>
            <p className="text-2xl font-bold text-red-600">${totalDebt.toFixed(2)}</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Total Interest</p>
            <p className="text-2xl font-bold text-orange-600">${totalInterest.toFixed(2)}</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Time to Payoff</p>
            <p className="text-2xl font-bold text-blue-600">{Math.ceil(totalTime)} months</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Payoff Order ({strategy === 'snowball' ? 'Snowball' : 'Avalanche'}):</h4>
        <div className="space-y-2">
          {payoffOrder.map((debt, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium">{index + 1}. {debt.name}</p>
                <p className="text-sm text-gray-600">
                  ${debt.monthlyPayment.toFixed(2)}/month for {debt.months} months
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">${debt.balance.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Interest: ${debt.interestPaid.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DebtSnowballCalculator;