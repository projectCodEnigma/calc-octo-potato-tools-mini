import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/calculators' },
    { name: 'Submit Tool', href: '/submit-tool' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Calculator className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">Calctools</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/calculators"
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105"
            >
              Start Calculating
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/calculators"
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg font-medium text-center hover:from-green-600 hover:to-teal-600 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Calculating
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;