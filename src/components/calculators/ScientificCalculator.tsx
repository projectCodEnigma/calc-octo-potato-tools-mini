import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const ScientificCalculator = () => {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performScientificOperation = (func: string) => {
    const value = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'cube':
        result = value * value * value;
        break;
      case 'factorial':
        result = factorial(value);
        break;
      case 'reciprocal':
        result = 1 / value;
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        result = value;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const Button = ({ onClick, className = '', children }: { onClick: () => void, className?: string, children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg font-medium transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Scientific Calculator</h3>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="bg-black text-white p-4 rounded-lg mb-4 text-right text-2xl font-mono">
          {display}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {/* Row 1 - Scientific functions */}
          <Button onClick={() => performScientificOperation('sin')} className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            sin
          </Button>
          <Button onClick={() => performScientificOperation('cos')} className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            cos
          </Button>
          <Button onClick={() => performScientificOperation('tan')} className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            tan
          </Button>
          <Button onClick={() => performScientificOperation('log')} className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            log
          </Button>
          <Button onClick={() => performScientificOperation('ln')} className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            ln
          </Button>

          {/* Row 2 - More scientific functions */}
          <Button onClick={() => performScientificOperation('sqrt')} className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            √
          </Button>
          <Button onClick={() => performScientificOperation('square')} className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            x²
          </Button>
          <Button onClick={() => performScientificOperation('cube')} className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            x³
          </Button>
          <Button onClick={() => performScientificOperation('factorial')} className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            x!
          </Button>
          <Button onClick={() => performScientificOperation('reciprocal')} className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            1/x
          </Button>

          {/* Row 3 - Constants and clear */}
          <Button onClick={() => performScientificOperation('pi')} className="bg-green-100 hover:bg-green-200 text-green-800">
            π
          </Button>
          <Button onClick={() => performScientificOperation('e')} className="bg-green-100 hover:bg-green-200 text-green-800">
            e
          </Button>
          <Button onClick={clear} className="bg-red-100 hover:bg-red-200 text-red-800 col-span-2">
            Clear
          </Button>
          <Button onClick={() => performOperation('/')} className="bg-orange-100 hover:bg-orange-200 text-orange-800">
            ÷
          </Button>

          {/* Row 4 - Numbers and operations */}
          <Button onClick={() => inputNumber('7')} className="bg-gray-100 hover:bg-gray-200">
            7
          </Button>
          <Button onClick={() => inputNumber('8')} className="bg-gray-100 hover:bg-gray-200">
            8
          </Button>
          <Button onClick={() => inputNumber('9')} className="bg-gray-100 hover:bg-gray-200">
            9
          </Button>
          <Button onClick={() => performOperation('*')} className="bg-orange-100 hover:bg-orange-200 text-orange-800">
            ×
          </Button>
          <Button onClick={() => inputNumber('(')} className="bg-purple-100 hover:bg-purple-200 text-purple-800">
            (
          </Button>

          {/* Row 5 */}
          <Button onClick={() => inputNumber('4')} className="bg-gray-100 hover:bg-gray-200">
            4
          </Button>
          <Button onClick={() => inputNumber('5')} className="bg-gray-100 hover:bg-gray-200">
            5
          </Button>
          <Button onClick={() => inputNumber('6')} className="bg-gray-100 hover:bg-gray-200">
            6
          </Button>
          <Button onClick={() => performOperation('-')} className="bg-orange-100 hover:bg-orange-200 text-orange-800">
            −
          </Button>
          <Button onClick={() => inputNumber(')')} className="bg-purple-100 hover:bg-purple-200 text-purple-800">
            )
          </Button>

          {/* Row 6 */}
          <Button onClick={() => inputNumber('1')} className="bg-gray-100 hover:bg-gray-200">
            1
          </Button>
          <Button onClick={() => inputNumber('2')} className="bg-gray-100 hover:bg-gray-200">
            2
          </Button>
          <Button onClick={() => inputNumber('3')} className="bg-gray-100 hover:bg-gray-200">
            3
          </Button>
          <Button onClick={() => performOperation('+')} className="bg-orange-100 hover:bg-orange-200 text-orange-800">
            +
          </Button>
          <Button onClick={() => performOperation('=')} className="bg-green-100 hover:bg-green-200 text-green-800 row-span-2">
            =
          </Button>

          {/* Row 7 */}
          <Button onClick={() => inputNumber('0')} className="bg-gray-100 hover:bg-gray-200 col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal} className="bg-gray-100 hover:bg-gray-200">
            .
          </Button>
          <Button onClick={() => setDisplay(display.slice(0, -1) || '0')} className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800">
            ⌫
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Function Guide:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Trigonometric functions work with degrees</p>
          <p>• log = base 10 logarithm, ln = natural logarithm</p>
          <p>• x! = factorial (works with positive integers)</p>
          <p>• π ≈ 3.14159, e ≈ 2.71828</p>
          <p>• Use parentheses for complex expressions</p>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;