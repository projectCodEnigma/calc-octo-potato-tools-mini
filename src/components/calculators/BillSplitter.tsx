import React, { useState } from 'react';
import { Users, Plus, Minus } from 'lucide-react';

const BillSplitter = () => {
  const [billAmount, setBillAmount] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(2);
  const [people, setPeople] = useState<{ name: string; amount: number }[]>([
    { name: 'Person 1', amount: 0 },
    { name: 'Person 2', amount: 0 }
  ]);
  const [splitType, setSplitType] = useState<string>('equal');

  const tipAmount = (billAmount * tipPercentage) / 100;
  const totalAmount = billAmount + tipAmount;

  const addPerson = () => {
    setPeople([...people, { name: `Person ${people.length + 1}`, amount: 0 }]);
    setNumberOfPeople(people.length + 1);
  };

  const removePerson = (index: number) => {
    if (people.length > 1) {
      setPeople(people.filter((_, i) => i !== index));
      setNumberOfPeople(people.length - 1);
    }
  };

  const updatePerson = (index: number, field: 'name' | 'amount', value: string | number) => {
    const newPeople = [...people];
    newPeople[index][field] = value as any;
    setPeople(newPeople);
  };

  const equalSplit = totalAmount / numberOfPeople;
  const customTotal = people.reduce((sum, person) => sum + person.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Users className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold">Bill Splitter</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bill Amount
          </label>
          <input
            type="number"
            value={billAmount || ''}
            onChange={(e) => setBillAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter bill amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tip Percentage
          </label>
          <input
            type="number"
            value={tipPercentage || ''}
            onChange={(e) => setTipPercentage(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="18"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Split Type
          </label>
          <select
            value={splitType}
            onChange={(e) => setSplitType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="equal">Equal Split</option>
            <option value="custom">Custom Amounts</option>
          </select>
        </div>
      </div>

      {/* Quick Tip Buttons */}
      <div className="flex space-x-2">
        <span className="text-sm text-gray-600">Quick tip:</span>
        {[15, 18, 20, 25].map((tip) => (
          <button
            key={tip}
            onClick={() => setTipPercentage(tip)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              tipPercentage === tip
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tip}%
          </button>
        ))}
      </div>

      {/* People List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            People ({numberOfPeople})
          </label>
          <button
            onClick={addPerson}
            className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Person</span>
          </button>
        </div>

        <div className="space-y-2">
          {people.map((person, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={person.name}
                onChange={(e) => updatePerson(index, 'name', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Person name"
              />
              {splitType === 'custom' && (
                <input
                  type="number"
                  value={person.amount || ''}
                  onChange={(e) => updatePerson(index, 'amount', Number(e.target.value))}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Amount"
                />
              )}
              <button
                onClick={() => removePerson(index)}
                className="text-red-500 hover:text-red-700"
                disabled={people.length === 1}
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Bill Summary:</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${billAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tip ({tipPercentage}%):</span>
            <span>${tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Per Person Breakdown */}
      <div className="bg-purple-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Per Person:</h4>
        {splitType === 'equal' ? (
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Each person pays</p>
            <p className="text-3xl font-bold text-purple-600">
              ${equalSplit.toFixed(2)}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {people.map((person, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="font-medium">{person.name}</span>
                <span className="text-purple-600 font-bold">
                  ${person.amount.toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold">Total Assigned:</span>
              <span className={`font-semibold ${customTotal === totalAmount ? 'text-green-600' : 'text-red-600'}`}>
                ${customTotal.toFixed(2)}
              </span>
            </div>
            {customTotal !== totalAmount && (
              <p className="text-sm text-red-600">
                ⚠️ Total assigned doesn't match bill total
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BillSplitter;