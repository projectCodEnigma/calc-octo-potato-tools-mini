import React from 'react';
import { Calculator, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold">Calctools</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Smart calculators for smarter living. Free tools for budgeting, marketing, health, and everyday calculations.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/categories/finance" className="hover:text-green-400">Finance Tools</a></li>
              <li><a href="/categories/marketing" className="hover:text-green-400">Marketing Tools</a></li>
              <li><a href="/categories/health" className="hover:text-green-400">Health & Fitness</a></li>
              <li><a href="/categories/everyday" className="hover:text-green-400">Everyday Utilities</a></li>
              <li><a href="/categories/math" className="hover:text-green-400">Math Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/calculators" className="hover:text-green-400">All Calculators</a></li>
              <li><a href="/submit-tool" className="hover:text-green-400">Submit Tool</a></li>
              <li><a href="/about" className="hover:text-green-400">About</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for better calculations</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;