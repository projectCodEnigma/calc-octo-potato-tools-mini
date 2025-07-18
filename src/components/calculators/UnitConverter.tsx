import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

const UnitConverter = () => {
  const [value, setValue] = useState<number>(0);
  const [category, setCategory] = useState<string>('length');
  const [fromUnit, setFromUnit] = useState<string>('meters');
  const [toUnit, setToUnit] = useState<string>('feet');

  const conversions = {
    length: {
      meters: 1,
      feet: 3.28084,
      inches: 39.3701,
      centimeters: 100,
      kilometers: 0.001,
      miles: 0.000621371,
      yards: 1.09361
    },
    weight: {
      kilograms: 1,
      pounds: 2.20462,
      grams: 1000,
      ounces: 35.274,
      stones: 0.157473,
      tons: 0.001
    },
    temperature: {
      celsius: (c: number) => c,
      fahrenheit: (c: number) => (c * 9/5) + 32,
      kelvin: (c: number) => c + 273.15
    },
    volume: {
      liters: 1,
      gallons: 0.264172,
      quarts: 1.05669,
      pints: 2.11338,
      cups: 4.22675,
      milliliters: 1000,
      fluid_ounces: 33.814
    }
  };

  const unitOptions = {
    length: ['meters', 'feet', 'inches', 'centimeters', 'kilometers', 'miles', 'yards'],
    weight: ['kilograms', 'pounds', 'grams', 'ounces', 'stones', 'tons'],
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
    volume: ['liters', 'gallons', 'quarts', 'pints', 'cups', 'milliliters', 'fluid_ounces']
  };

  const convertValue = () => {
    if (category === 'temperature') {
      const temp = conversions.temperature as any;
      if (fromUnit === 'celsius') {
        return temp[toUnit](value);
      } else if (fromUnit === 'fahrenheit') {
        const celsius = (value - 32) * 5/9;
        return temp[toUnit](celsius);
      } else if (fromUnit === 'kelvin') {
        const celsius = value - 273.15;
        return temp[toUnit](celsius);
      }
      return value;
    } else {
      const categoryConversions = conversions[category as keyof typeof conversions] as any;
      const baseValue = value / categoryConversions[fromUnit];
      return baseValue * categoryConversions[toUnit];
    }
  };

  const result = convertValue();

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const options = unitOptions[newCategory as keyof typeof unitOptions];
    setFromUnit(options[0]);
    setToUnit(options[1]);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <ArrowLeftRight className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold">Unit Converter</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
          <option value="volume">Volume</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Value to Convert
        </label>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter value"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {unitOptions[category as keyof typeof unitOptions].map(unit => (
              <option key={unit} value={unit}>
                {unit.replace('_', ' ').charAt(0).toUpperCase() + unit.replace('_', ' ').slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="p-2 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <ArrowLeftRight className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {unitOptions[category as keyof typeof unitOptions].map(unit => (
              <option key={unit} value={unit}>
                {unit.replace('_', ' ').charAt(0).toUpperCase() + unit.replace('_', ' ').slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Result:</h4>
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            {value} {fromUnit.replace('_', ' ')} equals
          </p>
          <p className="text-3xl font-bold text-purple-600">
            {result.toFixed(4)} {toUnit.replace('_', ' ')}
          </p>
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Common Conversions:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          {category === 'length' && (
            <>
              <p>• 1 meter = 3.28 feet = 39.37 inches</p>
              <p>• 1 mile = 1.609 kilometers = 5,280 feet</p>
              <p>• 1 yard = 3 feet = 0.914 meters</p>
            </>
          )}
          {category === 'weight' && (
            <>
              <p>• 1 kilogram = 2.20 pounds = 1,000 grams</p>
              <p>• 1 pound = 16 ounces = 453.6 grams</p>
              <p>• 1 stone = 14 pounds = 6.35 kilograms</p>
            </>
          )}
          {category === 'temperature' && (
            <>
              <p>• Water freezes at 0°C = 32°F = 273.15K</p>
              <p>• Water boils at 100°C = 212°F = 373.15K</p>
              <p>• Room temperature ≈ 20°C = 68°F = 293K</p>
            </>
          )}
          {category === 'volume' && (
            <>
              <p>• 1 liter = 0.264 gallons = 33.81 fl oz</p>
              <p>• 1 gallon = 4 quarts = 8 pints = 16 cups</p>
              <p>• 1 cup = 8 fl oz = 236.6 milliliters</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;