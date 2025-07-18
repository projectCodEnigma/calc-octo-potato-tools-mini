import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { calculatorData } from '../data/calculatorData';

const CalculatorPage = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  const calculator = calculatorData.find(calc => calc.id === calculatorId);

  if (!calculator) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculator Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The calculator you're looking for doesn't exist or has been moved.
          </p>
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

  const CalculatorComponent = calculator.component;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'finance': return 'text-green-600 bg-green-50';
      case 'marketing': return 'text-blue-600 bg-blue-50';
      case 'health': return 'text-orange-600 bg-orange-50';
      case 'math': return 'text-indigo-600 bg-indigo-50';
      case 'everyday': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const shareCalculator = () => {
    if (navigator.share) {
      navigator.share({
        title: calculator.name,
        text: calculator.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const relatedCalculators = calculatorData
    .filter(calc => calc.category === calculator.category && calc.id !== calculator.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <span>/</span>
          <Link to="/calculators" className="hover:text-green-600">Calculators</Link>
          <span>/</span>
          <Link to={`/categories/${calculator.category}`} className="hover:text-green-600 capitalize">
            {calculator.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{calculator.name}</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <Link
              to="/calculators"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Calculators</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={shareCalculator}
                className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                <Bookmark className="w-4 h-4" />
                <span className="text-sm">Save</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(calculator.category)}`}>
              {calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1)}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">{calculator.name}</h1>
          <p className="text-lg text-gray-600">{calculator.description}</p>
        </div>

        {/* Calculator Component */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <CalculatorComponent />
        </div>

        {/* Related Calculators */}
        {relatedCalculators.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related {calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1)} Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCalculators.map((relatedCalc) => (
                <Link
                  key={relatedCalc.id}
                  to={`/calculator/${relatedCalc.id}`}
                  className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600">
                    {relatedCalc.name}
                  </h3>
                  <p className="text-sm text-gray-600">{relatedCalc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;