import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, DollarSign, TrendingUp, Heart, Zap, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  const categories = [
    {
      title: 'Finance Tools',
      icon: DollarSign,
      description: 'Budget calculators, loan estimators, and financial planning tools',
      color: 'bg-green-50 text-green-600',
      count: '15+ tools',
      href: '/categories/finance'
    },
    {
      title: 'Marketing Tools',
      icon: TrendingUp,
      description: 'ROI calculators, conversion tracking, and ad performance tools',
      color: 'bg-blue-50 text-blue-600',
      count: '12+ tools',
      href: '/categories/marketing'
    },
    {
      title: 'Health & Fitness',
      icon: Heart,
      description: 'BMI calculators, calorie trackers, and wellness tools',
      color: 'bg-orange-50 text-orange-600',
      count: '10+ tools',
      href: '/categories/health'
    },
    {
      title: 'Everyday Utilities',
      icon: Zap,
      description: 'Unit converters, date calculators, and daily life tools',
      color: 'bg-purple-50 text-purple-600',
      count: '25+ tools',
      href: '/categories/everyday'
    },
    {
      title: 'Math Tools',
      icon: Calculator,
      description: 'Scientific calculator, percentage, fractions, and algebra tools',
      color: 'bg-indigo-50 text-indigo-600',
      count: '8+ tools',
      href: '/categories/math'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      content: 'The ROI calculator has helped me optimize our ad spend and demonstrate value to stakeholders.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Freelancer',
      content: 'Perfect for calculating project budgets and converting hourly rates. Saves me time every day.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      role: 'Fitness Coach',
      content: 'My clients love the BMI and calorie calculators. Easy to use and very accurate.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Smarter Calculators for
              <span className="text-green-600"> Smarter Living</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A free all-in-one toolkit for budgeting, ads, conversions, health, and more. 
              Over 50 professional calculators designed for real-world use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculators"
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Tools
              </Link>
              <Link
                to="/categories/finance"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all border-2 border-green-500 hover:border-green-600"
              >
                Try Mortgage Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Category
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect calculator for your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.title}
                  to={category.href}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border hover:border-green-200 transform hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 rounded-lg ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">
                      {category.count}
                    </span>
                    <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Most Popular Tools
            </h2>
            <p className="text-lg text-gray-600">
              Get started with our most-used calculators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Budget Calculator', category: 'Finance', users: '25,000+', id: 'budget-calculator' },
              { name: 'ROI Calculator', category: 'Marketing', users: '18,000+', id: 'roi-calculator' },
              { name: 'BMI Calculator', category: 'Health', users: '32,000+', id: 'bmi-calculator' }
            ].map((tool) => (
              <div key={tool.name} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Calculator className="w-8 h-8 text-green-500" />
                  <span className="text-sm text-gray-500">{tool.users} users</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 mb-4">{tool.category} Tool</p>
                <Link
                  to={`/calculator/${tool.id}`}
                  className="text-green-600 font-medium hover:text-green-700 inline-flex items-center"
                >
                  Try now <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Trusted by thousands of professionals and individuals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Calculating?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of users who save time with our smart calculators
          </p>
          <Link
            to="/calculators"
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all inline-flex items-center"
          >
            Browse All Tools <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;