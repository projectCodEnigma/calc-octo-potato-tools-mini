import React, { useState } from 'react';
import { ChefHat } from 'lucide-react';

const RecipeConverter = () => {
  const [originalServings, setOriginalServings] = useState<number>(4);
  const [desiredServings, setDesiredServings] = useState<number>(6);
  const [ingredients, setIngredients] = useState<Array<{name: string, amount: number, unit: string}>>([
    { name: 'Flour', amount: 2, unit: 'cups' },
    { name: 'Sugar', amount: 1, unit: 'cup' },
    { name: 'Eggs', amount: 3, unit: 'pieces' },
    { name: 'Milk', amount: 1.5, unit: 'cups' }
  ]);

  const conversionRates: { [key: string]: { [key: string]: number } } = {
    // Volume conversions (to cups)
    'cup': { 'cup': 1, 'tablespoon': 16, 'teaspoon': 48, 'fluid ounce': 8, 'pint': 0.5, 'quart': 0.25, 'gallon': 0.0625, 'milliliter': 236.588, 'liter': 0.236588 },
    'tablespoon': { 'cup': 0.0625, 'tablespoon': 1, 'teaspoon': 3, 'fluid ounce': 0.5, 'milliliter': 14.787 },
    'teaspoon': { 'cup': 0.0208, 'tablespoon': 0.333, 'teaspoon': 1, 'milliliter': 4.929 },
    'fluid ounce': { 'cup': 0.125, 'tablespoon': 2, 'teaspoon': 6, 'fluid ounce': 1, 'milliliter': 29.574 },
    'pint': { 'cup': 2, 'pint': 1, 'quart': 0.5, 'gallon': 0.125, 'liter': 0.473 },
    'quart': { 'cup': 4, 'pint': 2, 'quart': 1, 'gallon': 0.25, 'liter': 0.946 },
    'gallon': { 'cup': 16, 'pint': 8, 'quart': 4, 'gallon': 1, 'liter': 3.785 },
    'milliliter': { 'cup': 0.004227, 'tablespoon': 0.0676, 'teaspoon': 0.203, 'fluid ounce': 0.0338, 'milliliter': 1, 'liter': 0.001 },
    'liter': { 'cup': 4.227, 'pint': 2.113, 'quart': 1.057, 'gallon': 0.264, 'milliliter': 1000, 'liter': 1 },
    
    // Weight conversions (to ounces)
    'ounce': { 'ounce': 1, 'pound': 0.0625, 'gram': 28.35, 'kilogram': 0.02835 },
    'pound': { 'ounce': 16, 'pound': 1, 'gram': 453.6, 'kilogram': 0.4536 },
    'gram': { 'ounce': 0.0353, 'pound': 0.0022, 'gram': 1, 'kilogram': 0.001 },
    'kilogram': { 'ounce': 35.27, 'pound': 2.205, 'gram': 1000, 'kilogram': 1 }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: 0, unit: 'cup' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: string, value: string | number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const convertIngredients = () => {
    const multiplier = desiredServings / originalServings;
    return ingredients.map(ingredient => ({
      ...ingredient,
      convertedAmount: ingredient.amount * multiplier
    }));
  };

  const convertUnit = (amount: number, fromUnit: string, toUnit: string): number => {
    if (fromUnit === toUnit) return amount;
    
    const fromRates = conversionRates[fromUnit];
    const toRates = conversionRates[toUnit];
    
    if (!fromRates || !toRates) return amount;
    
    // Find a common unit for conversion
    const commonUnits = Object.keys(fromRates).filter(unit => toRates[unit]);
    if (commonUnits.length === 0) return amount;
    
    const commonUnit = commonUnits[0];
    const toCommon = amount / fromRates[commonUnit];
    const fromCommon = toCommon * toRates[commonUnit];
    
    return fromCommon;
  };

  const formatAmount = (amount: number): string => {
    if (amount < 0.125) return (amount * 16).toFixed(1) + ' tbsp';
    if (amount < 1) {
      const fractions = [
        { decimal: 0.125, fraction: '1/8' },
        { decimal: 0.25, fraction: '1/4' },
        { decimal: 0.333, fraction: '1/3' },
        { decimal: 0.5, fraction: '1/2' },
        { decimal: 0.667, fraction: '2/3' },
        { decimal: 0.75, fraction: '3/4' }
      ];
      
      const closest = fractions.reduce((prev, curr) => 
        Math.abs(curr.decimal - amount) < Math.abs(prev.decimal - amount) ? curr : prev
      );
      
      if (Math.abs(closest.decimal - amount) < 0.05) {
        return closest.fraction;
      }
    }
    
    if (amount % 1 === 0) return amount.toString();
    return amount.toFixed(2);
  };

  const convertedIngredients = convertIngredients();
  const scalingFactor = desiredServings / originalServings;

  const commonUnits = [
    'cup', 'tablespoon', 'teaspoon', 'fluid ounce', 'pint', 'quart', 'gallon',
    'milliliter', 'liter', 'ounce', 'pound', 'gram', 'kilogram', 'pieces'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <ChefHat className="w-6 h-6 text-orange-600" />
        <h3 className="text-lg font-semibold">Recipe Converter</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Servings
          </label>
          <input
            type="number"
            value={originalServings || ''}
            onChange={(e) => setOriginalServings(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Desired Servings
          </label>
          <input
            type="number"
            value={desiredServings || ''}
            onChange={(e) => setDesiredServings(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="6"
          />
        </div>
      </div>

      <div className="bg-orange-50 rounded-lg p-4">
        <div className="text-center mb-2">
          <span className="text-sm text-gray-600">Scaling Factor</span>
          <p className="text-2xl font-bold text-orange-600">
            {scalingFactor.toFixed(2)}x
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-700">Ingredients</h4>
          <button
            onClick={addIngredient}
            className="px-3 py-1 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-lg text-sm"
          >
            Add Ingredient
          </button>
        </div>

        <div className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Ingredient name"
              />
              <input
                type="number"
                step="0.1"
                value={ingredient.amount || ''}
                onChange={(e) => updateIngredient(index, 'amount', Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Amount"
              />
              <select
                value={ingredient.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                {commonUnits.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <div className="px-2 py-1 bg-white rounded text-sm font-medium text-orange-600">
                {formatAmount(convertedIngredients[index]?.convertedAmount || 0)} {ingredient.unit}
              </div>
              <button
                onClick={() => removeIngredient(index)}
                className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Converted Recipe ({desiredServings} servings):</h4>
        <div className="space-y-2">
          {convertedIngredients.map((ingredient, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
              <span className="font-medium">{ingredient.name}</span>
              <span className="text-orange-600 font-medium">
                {formatAmount(ingredient.convertedAmount)} {ingredient.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Cooking Time Adjustments:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Baking times usually don't change much with quantity</p>
          <p>• Stovetop cooking may need slight time adjustments</p>
          <p>• Larger quantities may need bigger pans or multiple batches</p>
          <p>• Check doneness with visual cues and thermometers</p>
          <p>• Seasoning may need to be adjusted to taste</p>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Common Measurement Conversions:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h5 className="font-medium mb-1">Volume:</h5>
            <p>• 1 cup = 16 tablespoons = 48 teaspoons</p>
            <p>• 1 cup = 8 fluid ounces = 237 ml</p>
            <p>• 1 tablespoon = 3 teaspoons = 15 ml</p>
            <p>• 1 pint = 2 cups, 1 quart = 4 cups</p>
          </div>
          <div>
            <h5 className="font-medium mb-1">Weight:</h5>
            <p>• 1 pound = 16 ounces = 454 grams</p>
            <p>• 1 ounce = 28 grams</p>
            <p>• 1 kilogram = 2.2 pounds</p>
            <p>• 1 stick butter = 1/2 cup = 4 oz</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeConverter;