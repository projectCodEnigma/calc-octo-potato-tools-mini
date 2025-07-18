import React, { useState } from 'react';
import { Plus, Minus, PiggyBank } from 'lucide-react';

const BudgetCalculator = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<{ name: string; amount: number }[]>([
    { name: 'Rent/Mortgage', amount: 0 },
    { name: 'Food', amount: 0 },
    { name: 'Transportation', amount: 0 },
    { name: 'Utilities', amount: 0 }
  ]);

  const addExpense = () => {
    setExpenses([...expenses, { name: '', amount: 0 }]);
  };

  const removeExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const updateExpense = (index: number, field: 'name' | 'amount', value: string | number) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value as any;
    setExpenses(newExpenses);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = income - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <PiggyBank className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Budget Calculator</h3>
      </div>

      {/* Income */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Income
        </label>
        <input
          type="number"
          value={income || ''}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter your monthly income"
        />
      </div>

      {/* Expenses */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Monthly Expenses
          </label>
          <button
            onClick={addExpense}
            className="flex items-center space-x-1 text-green-600 hover:text-green-700"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Expense</span>
          </button>
        </div>
        
        <div className="space-y-2">
          {expenses.map((expense, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={expense.name}
                onChange={(e) => updateExpense(index, 'name', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Expense name"
              />
              <input
                type="number"
                value={expense.amount || ''}
                onChange={(e) => updateExpense(index, 'amount', Number(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Amount"
              />
              <button
                onClick={() => removeExpense(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Total Income:</span>
            <span className="text-green-600">${income.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Expenses:</span>
            <span className="text-red-600">${totalExpenses.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Remaining:</span>
            <span className={`font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${remaining.toFixed(2)}
            </span>
          </div>
        </div>
        
        {remaining < 0 && (
          <div className="mt-3 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-700">
              ⚠️ You're spending more than you earn. Consider reducing expenses or increasing income.
            </p>
          </div>
        )}
        
        {remaining > 0 && (
          <div className="mt-3 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              ✅ Great! You have ${remaining.toFixed(2)} left for savings or additional expenses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCalculator;