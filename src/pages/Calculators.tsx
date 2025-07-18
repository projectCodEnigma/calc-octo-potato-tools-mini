import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calculator } from 'lucide-react';
import { calculatorData } from '../data/calculatorData';

const Calculators = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);

  const categories = ['all', 'finance', 'marketing', 'health', 'everyday', 'math'];

  const filteredCalculators = calculatorData.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         calc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCalculatorClick = (calculatorId: string) => {
    setSelectedCalculator(selectedCalculator === calculatorId ? null : calculatorId);
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Calculators
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of professional calculators
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search calculators..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
              <option value="health">Health</option>
              <option value="everyday">Everyday</option>
              <option value="math">Math</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalculators.map((calculator) => (
            <Link
              to={`/calculator/${calculator.id}`}
              key={calculator.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border hover:border-green-200 block group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${calculator.color} flex items-center justify-center`}>
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  calculator.category === 'finance' ? 'bg-green-100 text-green-700' :
                  calculator.category === 'marketing' ? 'bg-blue-100 text-blue-700' :
                  calculator.category === 'health' ? 'bg-orange-100 text-orange-700' :
                  calculator.category === 'math' ? 'bg-indigo-100 text-indigo-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {calculator.category}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {calculator.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {calculator.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {calculator.category === 'finance' ? '💰' :
                   calculator.category === 'marketing' ? '📈' :
                   calculator.category === 'health' ? '❤️' :
                   calculator.category === 'math' ? '🔢' : '⚡'} Popular
                </span>
                <span className="text-green-600 font-medium group-hover:text-green-700">
                  Try Now →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No calculators found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculators;