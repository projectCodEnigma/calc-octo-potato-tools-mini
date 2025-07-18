import React from 'react';
import { Calculator, Users, Target, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Calctools
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make complex calculations simple and accessible for everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-600">Simplifying calculations for everyone</p>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            At Calctools, we believe that everyone deserves access to powerful calculation tools without the complexity. 
            Whether you're a business owner calculating ROI, a fitness enthusiast tracking your progress, or someone 
            managing personal finances, our tools are designed to give you accurate results quickly and easily.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">50+ Calculators</h3>
            <p className="text-gray-600">
              A comprehensive collection of calculators covering finance, marketing, health, and everyday needs.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">100,000+ Users</h3>
            <p className="text-gray-600">
              Trusted by professionals, students, and individuals worldwide for accurate calculations.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Always Free</h3>
            <p className="text-gray-600">
              All our calculators are completely free to use with no registration required.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Story
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Calctools was born out of frustration with scattered, complicated, and often inaccurate online calculators. 
              Our founder, a data analyst and entrepreneur, spent countless hours searching for reliable calculation tools 
              for business planning, personal finance, and daily tasks.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              After experiencing the same pain points repeatedly, we decided to create a centralized platform where 
              users could find professional-grade calculators that are both accurate and easy to use. Every calculator 
              is thoroughly tested and designed with real-world scenarios in mind.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, Calctools serves over 100,000 users monthly, from small business owners to Fortune 500 companies, 
              all relying on our tools to make better decisions through better calculations.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accuracy First</h3>
              <p className="text-gray-600">
                Every calculation is verified and tested to ensure you get reliable results every time.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Friendly Design</h3>
              <p className="text-gray-600">
                We prioritize simplicity and intuitive design so anyone can use our tools effectively.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Always Accessible</h3>
              <p className="text-gray-600">
                Our tools are free, fast, and available 24/7 without any barriers or registration requirements.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Continuous Innovation</h3>
              <p className="text-gray-600">
                We're constantly adding new calculators and improving existing ones based on user feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;