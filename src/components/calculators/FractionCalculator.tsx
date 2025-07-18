import React, { useState } from 'react';
import { Divide } from 'lucide-react';

const FractionCalculator = () => {
  const [num1, setNum1] = useState<number>(1);
  const [den1, setDen1] = useState<number>(2);
  const [num2, setNum2] = useState<number>(1);
  const [den2, setDen2] = useState<number>(3);
  const [operation, setOperation] = useState<string>('+');

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyFraction = (numerator: number, denominator: number) => {
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    };
  };

  const addFractions = () => {
    const num = num1 * den2 + num2 * den1;
    const den = den1 * den2;
    return simplifyFraction(num, den);
  };

  const subtractFractions = () => {
    const num = num1 * den2 - num2 * den1;
    const den = den1 * den2;
    return simplifyFraction(num, den);
  };

  const multiplyFractions = () => {
    const num = num1 * num2;
    const den = den1 * den2;
    return simplifyFraction(num, den);
  };

  const divideFractions = () => {
    const num = num1 * den2;
    const den = den1 * num2;
    return simplifyFraction(num, den);
  };

  const calculateResult = () => {
    switch (operation) {
      case '+':
        return addFractions();
      case '-':
        return subtractFractions();
      case '*':
        return multiplyFractions();
      case '/':
        return divideFractions();
      default:
        return { numerator: 0, denominator: 1 };
    }
  };

  const result = calculateResult();
  const decimal = result.numerator / result.denominator;
  const percentage = decimal * 100;

  const toMixedNumber = (num: number, den: number) => {
    if (Math.abs(num) < Math.abs(den)) {
      return { whole: 0, numerator: num, denominator: den };
    }
    const whole = Math.floor(Math.abs(num) / Math.abs(den)) * (num < 0 ? -1 : 1);
    const remainder = Math.abs(num) % Math.abs(den);
    return { whole, numerator: remainder, denominator: Math.abs(den) };
  };

  const mixedResult = toMixedNumber(result.numerator, result.denominator);

  const FractionInput = ({ 
    numerator, 
    denominator, 
    onNumeratorChange, 
    onDenominatorChange, 
    label 
  }: {
    numerator: number;
    denominator: number;
    onNumeratorChange: (value: number) => void;
    onDenominatorChange: (value: number) => void;
    label: string;
  }) => (
    <div className="text-center">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex flex-col items-center space-y-2">
        <input
          type="number"
          value={numerator || ''}
          onChange={(e) => onNumeratorChange(Number(e.target.value))}
          className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="w-16 h-px bg-gray-400"></div>
        <input
          type="number"
          value={denominator || ''}
          onChange={(e) => onDenominatorChange(Number(e.target.value))}
          className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Divide className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Fraction Calculator</h3>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <FractionInput
          numerator={num1}
          denominator={den1}
          onNumeratorChange={setNum1}
          onDenominatorChange={setDen1}
          label="First Fraction"
        />

        <div className="text-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="+">+ (Add)</option>
            <option value="-">- (Subtract)</option>
            <option value="*">× (Multiply)</option>
            <option value="/">÷ (Divide)</option>
          </select>
        </div>

        <FractionInput
          numerator={num2}
          denominator={den2}
          onNumeratorChange={setNum2}
          onDenominatorChange={setDen2}
          label="Second Fraction"
        />

        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">=</div>
        </div>

        <div className="text-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">{result.numerator}</div>
            <div className="w-16 h-px bg-blue-400"></div>
            <div className="text-2xl font-bold text-blue-600">{result.denominator}</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Result in Different Forms:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Simplified Fraction</p>
            <p className="text-xl font-bold text-blue-600">
              {result.numerator}/{result.denominator}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Decimal</p>
            <p className="text-xl font-bold text-green-600">
              {isNaN(decimal) ? '0' : decimal.toFixed(4)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Percentage</p>
            <p className="text-xl font-bold text-purple-600">
              {isNaN(percentage) ? '0' : percentage.toFixed(2)}%
            </p>
          </div>
        </div>

        {mixedResult.whole !== 0 && (
          <div className="mt-4 text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Mixed Number</p>
            <p className="text-xl font-bold text-orange-600">
              {mixedResult.whole} {mixedResult.numerator > 0 ? `${mixedResult.numerator}/${mixedResult.denominator}` : ''}
            </p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Step-by-Step Solution:</h4>
        <div className="text-sm text-gray-700 space-y-2">
          {operation === '+' && (
            <div>
              <p>1. Find common denominator: {den1} × {den2} = {den1 * den2}</p>
              <p>2. Convert fractions: {num1}/{den1} = {num1 * den2}/{den1 * den2}, {num2}/{den2} = {num2 * den1}/{den1 * den2}</p>
              <p>3. Add numerators: {num1 * den2} + {num2 * den1} = {num1 * den2 + num2 * den1}</p>
              <p>4. Simplify: {num1 * den2 + num2 * den1}/{den1 * den2} = {result.numerator}/{result.denominator}</p>
            </div>
          )}
          {operation === '-' && (
            <div>
              <p>1. Find common denominator: {den1} × {den2} = {den1 * den2}</p>
              <p>2. Convert fractions: {num1}/{den1} = {num1 * den2}/{den1 * den2}, {num2}/{den2} = {num2 * den1}/{den1 * den2}</p>
              <p>3. Subtract numerators: {num1 * den2} - {num2 * den1} = {num1 * den2 - num2 * den1}</p>
              <p>4. Simplify: {num1 * den2 - num2 * den1}/{den1 * den2} = {result.numerator}/{result.denominator}</p>
            </div>
          )}
          {operation === '*' && (
            <div>
              <p>1. Multiply numerators: {num1} × {num2} = {num1 * num2}</p>
              <p>2. Multiply denominators: {den1} × {den2} = {den1 * den2}</p>
              <p>3. Simplify: {num1 * num2}/{den1 * den2} = {result.numerator}/{result.denominator}</p>
            </div>
          )}
          {operation === '/' && (
            <div>
              <p>1. Flip the second fraction: {num2}/{den2} becomes {den2}/{num2}</p>
              <p>2. Multiply: {num1}/{den1} × {den2}/{num2}</p>
              <p>3. Multiply numerators and denominators: {num1 * den2}/{den1 * num2}</p>
              <p>4. Simplify: {num1 * den2}/{den1 * num2} = {result.numerator}/{result.denominator}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Fraction Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Always simplify fractions to their lowest terms</p>
          <p>• To add/subtract: find common denominator first</p>
          <p>• To multiply: multiply straight across</p>
          <p>• To divide: multiply by the reciprocal (flip the second fraction)</p>
          <p>• Mixed numbers can be converted to improper fractions for easier calculation</p>
        </div>
      </div>
    </div>
  );
};

export default FractionCalculator;