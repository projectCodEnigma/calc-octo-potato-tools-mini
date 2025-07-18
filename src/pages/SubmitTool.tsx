import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const SubmitTool = () => {
  const [formData, setFormData] = useState({
    toolName: '',
    category: '',
    description: '',
    useCase: '',
    email: '',
    priority: 'medium'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        toolName: '',
        category: '',
        description: '',
        useCase: '',
        email: '',
        priority: 'medium'
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600">
              Your calculator suggestion has been submitted successfully. 
              We'll review it and get back to you if we need more information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Submit a Calculator Idea
          </h1>
          <p className="text-lg text-gray-600">
            Help us build the calculator you need. We value your input and will consider all suggestions.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tool Name */}
            <div>
              <label htmlFor="toolName" className="block text-sm font-medium text-gray-700 mb-2">
                Calculator Name *
              </label>
              <input
                type="text"
                id="toolName"
                name="toolName"
                required
                value={formData.toolName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Investment Return Calculator"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="finance">Finance</option>
                <option value="marketing">Marketing</option>
                <option value="health">Health & Fitness</option>
                <option value="everyday">Everyday Utilities</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe what this calculator should do and what inputs/outputs it should have..."
              />
            </div>

            {/* Use Case */}
            <div>
              <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-2">
                Use Case
              </label>
              <textarea
                id="useCase"
                name="useCase"
                value={formData.useCase}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="When would someone use this calculator? What problem does it solve?"
              />
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="low">Low - Nice to have</option>
                <option value="medium">Medium - Would be useful</option>
                <option value="high">High - Really need this</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your@email.com - We'll notify you when it's ready"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Submit Calculator Idea</span>
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What happens next?
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>We review all submissions within 48 hours</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Popular and feasible calculators get prioritized</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>We'll notify you (if email provided) when your calculator is live</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>All calculators remain free for everyone</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitTool;