import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calculator, ArrowLeft } from 'lucide-react';
import { calculatorData } from '../data/calculatorData';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  // Filter calculators by category
  const categoryCalculators = calculatorData.filter(calc => calc.category === category);
  
  // Get category info
  const getCategoryInfo = () => {
    const categoryMap = {
      finance: {
        title: 'Finance Tools',
        description: 'Budget calculators, loan estimators, and financial planning tools',
        icon: '💰',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      },
      marketing: {
        title: 'Marketing Tools',
        description: 'ROI calculators, conversion tracking, and ad performance tools',
        icon: '📈',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      },
      health: {
        title: 'Health & Fitness',
        description: 'BMI calculators, calorie trackers, and wellness tools',
        icon: '❤️',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      },
      everyday: {
        title: 'Everyday Utilities',
        description: 'Unit converters, date calculators, and daily life tools',
        icon: '⚡',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
      },
      math: {
        title: 'Math Tools',
        description: 'Scientific calculator, percentage, fractions, and algebra tools',
        icon: '🔢',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        borderColor: 'border-indigo-200'
      }
    };
    
    return categoryMap[category as keyof typeof categoryMap] || {
      title: 'Calculators',
      description: 'Professional calculation tools',
      icon: '🧮',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    };
  };

  const categoryInfo = getCategoryInfo();

  if (!category) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link
            to="/calculators"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all"
          >
            Browse All Calculators
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <span>/</span>
          <Link to="/calculators" className="hover:text-green-600">Calculators</Link>
          <span>/</span>
          <span className="text-gray-900 capitalize">{category}</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/calculators"
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to All Calculators</span>
          </Link>
        </div>

        {/* Category Header */}
        <div className={`${categoryInfo.bgColor} ${categoryInfo.borderColor} border rounded-2xl p-8 mb-12`}>
          <div className="text-center">
            <div className="text-6xl mb-4">{categoryInfo.icon}</div>
            <h1 className={`text-4xl font-bold ${categoryInfo.color} mb-4`}>
              {categoryInfo.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {categoryInfo.description}
            </p>
            <div className="mt-6">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${categoryInfo.bgColor} ${categoryInfo.color}`}>
                {categoryCalculators.length} calculator{categoryCalculators.length !== 1 ? 's' : ''} available
              </span>
            </div>
          </div>
        </div>

        {/* Calculators Grid */}
        {categoryCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCalculators.map((calculator) => (
              <Link
                to={`/calculator/${calculator.id}`}
                key={calculator.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border hover:border-green-200 block group transform hover:-translate-y-1"
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
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
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
                  <span className="text-green-600 font-medium group-hover:text-green-700 transition-colors">
                    Try Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No calculators found in this category
            </h3>
            <p className="text-gray-600 mb-6">
              This category is currently being developed. Check back soon!
            </p>
            <Link
              to="/calculators"
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all"
            >
              Browse All Calculators
            </Link>
          </div>
        )}

        {/* Category-specific Tips */}
        {categoryCalculators.length > 0 && (
          <div className={`mt-16 ${categoryInfo.bgColor} rounded-2xl p-8`}>
            <h2 className={`text-2xl font-bold ${categoryInfo.color} mb-4 text-center`}>
              {categoryInfo.title} Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              {category === 'finance' && (
                <>
                  <div>
                    <h3 className="font-semibold mb-2">Budgeting Tips:</h3>
                    <ul className="space-y-1">
                      <li>• Follow the 50/30/20 rule for budgeting</li>
                      <li>• Track expenses for at least one month</li>
                      <li>• Build an emergency fund first</li>
                      <li>• Automate savings and bill payments</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Investment Tips:</h3>
                    <ul className="space-y-1">
                      <li>• Start investing early for compound growth</li>
                      <li>• Diversify your investment portfolio</li>
                      <li>• Consider low-cost index funds</li>
                      <li>• Don't try to time the market</li>
                    </ul>
                  </div>
                </>
              )}
              
              {category === 'marketing' && (
                <>
                  <div>
                    <h3 className="font-semibold mb-2">Campaign Optimization:</h3>
                    <ul className="space-y-1">
                      <li>• Track ROI for all marketing channels</li>
                      <li>• A/B test ad creatives and copy</li>
                      <li>• Focus on customer lifetime value</li>
                      <li>• Use data-driven decision making</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Conversion Tips:</h3>
                    <ul className="space-y-1">
                      <li>• Optimize landing pages for mobile</li>
                      <li>• Use clear call-to-action buttons</li>
                      <li>• Reduce form fields and friction</li>
                      <li>• Add social proof and testimonials</li>
                    </ul>
                  </div>
                </>
              )}
              
              {category === 'health' && (
                <>
                  <div>
                    <h3 className="font-semibold mb-2">Fitness Tips:</h3>
                    <ul className="space-y-1">
                      <li>• Aim for 150 minutes of moderate exercise weekly</li>
                      <li>• Include both cardio and strength training</li>
                      <li>• Stay hydrated throughout the day</li>
                      <li>• Get 7-9 hours of quality sleep</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Nutrition Tips:</h3>
                    <ul className="space-y-1">
                      <li>• Eat a balanced diet with variety</li>
                      <li>• Control portion sizes</li>
                      <li>• Limit processed foods and added sugars</li>
                      <li>• Consult healthcare providers for guidance</li>
                    </ul>
                  </div>
                </>
              )}
              
              {category === 'math' && (
                <>
                  <div>
                    <h3 className="font-semibold mb-2">Problem Solving:</h3>
                    <ul className="space-y-1">
                      <li>• Break complex problems into steps</li>
                      <li>• Check your work and verify results</li>
                      <li>• Use estimation to validate answers</li>
                      <li>• Practice regularly to improve skills</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Calculator Tips:</h3>
                    <ul className="space-y-1">
                      <li>• Double-check input values</li>
                      <li>• Understand the formulas being used</li>
                      <li>• Use appropriate units and precision</li>
                      <li>• Learn the underlying concepts</li>
                    </ul>
                  </div>
                </>
              )}
              
              {category === 'everyday' && (
                <>
                  <div>
                    <h3 className="font-semibold mb-2">Daily Efficiency:</h3>
                    <ul className="space-y-1">
                      <li>• Use calculators to save time</li>
                      <li>• Plan ahead for better results</li>
                      <li>• Keep frequently used tools bookmarked</li>
                      <li>• Double-check important calculations</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Organization Tips:</h3>
                    <ul className="space-y-1">
                      <li>• Create checklists for complex tasks</li>
                      <li>• Use digital tools for tracking</li>
                      <li>• Set reminders for important dates</li>
                      <li>• Keep backup copies of important data</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;