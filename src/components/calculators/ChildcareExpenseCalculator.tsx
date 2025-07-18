import React, { useState } from 'react';
import { Baby } from 'lucide-react';

const ChildcareExpenseCalculator = () => {
  const [childAge, setChildAge] = useState<string>('infant');
  const [careType, setCareType] = useState<string>('daycare');
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [location, setLocation] = useState<string>('suburban');
  const [additionalCosts, setAdditionalCosts] = useState<{
    meals: number;
    supplies: number;
    activities: number;
    transportation: number;
  }>({
    meals: 50,
    supplies: 30,
    activities: 25,
    transportation: 0
  });

  const getBaseCost = () => {
    const rates = {
      infant: {
        daycare: { urban: 18, suburban: 15, rural: 12 },
        nanny: { urban: 25, suburban: 20, rural: 16 },
        family: { urban: 12, suburban: 10, rural: 8 },
        babysitter: { urban: 15, suburban: 12, rural: 10 }
      },
      toddler: {
        daycare: { urban: 16, suburban: 13, rural: 10 },
        nanny: { urban: 22, suburban: 18, rural: 14 },
        family: { urban: 10, suburban: 8, rural: 6 },
        babysitter: { urban: 13, suburban: 10, rural: 8 }
      },
      preschool: {
        daycare: { urban: 14, suburban: 11, rural: 8 },
        nanny: { urban: 20, suburban: 16, rural: 12 },
        family: { urban: 8, suburban: 6, rural: 5 },
        babysitter: { urban: 12, suburban: 9, rural: 7 }
      },
      schoolAge: {
        daycare: { urban: 12, suburban: 9, rural: 6 },
        nanny: { urban: 18, suburban: 14, rural: 10 },
        family: { urban: 6, suburban: 5, rural: 4 },
        babysitter: { urban: 10, suburban: 8, rural: 6 }
      }
    };

    return rates[childAge as keyof typeof rates][careType as keyof typeof rates.infant][location as keyof typeof rates.infant.daycare];
  };

  const hourlyRate = getBaseCost();
  const dailyCost = hourlyRate * hoursPerDay;
  const weeklyCost = dailyCost * daysPerWeek;
  const monthlyCost = weeklyCost * 4.33; // Average weeks per month
  const annualCost = monthlyCost * 12;

  const totalAdditionalCosts = Object.values(additionalCosts).reduce((sum, cost) => sum + cost, 0);
  const totalMonthlyCost = monthlyCost + totalAdditionalCosts;
  const totalAnnualCost = totalMonthlyCost * 12;

  const updateAdditionalCost = (key: string, value: number) => {
    setAdditionalCosts(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Baby className="w-6 h-6 text-pink-600" />
        <h3 className="text-lg font-semibold">Childcare Expense Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Child Age Group
          </label>
          <select
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="infant">Infant (0-12 months)</option>
            <option value="toddler">Toddler (1-3 years)</option>
            <option value="preschool">Preschool (3-5 years)</option>
            <option value="schoolAge">School Age (5+ years)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Care
          </label>
          <select
            value={careType}
            onChange={(e) => setCareType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="daycare">Daycare Center</option>
            <option value="nanny">Nanny/Au Pair</option>
            <option value="family">Family Daycare</option>
            <option value="babysitter">Babysitter</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hours per Day
          </label>
          <input
            type="number"
            value={hoursPerDay || ''}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="8"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days per Week
          </label>
          <input
            type="number"
            value={daysPerWeek || ''}
            onChange={(e) => setDaysPerWeek(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="5"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="urban">Urban Area</option>
            <option value="suburban">Suburban Area</option>
            <option value="rural">Rural Area</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Additional Monthly Costs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meals & Snacks ($)
            </label>
            <input
              type="number"
              value={additionalCosts.meals || ''}
              onChange={(e) => updateAdditionalCost('meals', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplies & Diapers ($)
            </label>
            <input
              type="number"
              value={additionalCosts.supplies || ''}
              onChange={(e) => updateAdditionalCost('supplies', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activities & Field Trips ($)
            </label>
            <input
              type="number"
              value={additionalCosts.activities || ''}
              onChange={(e) => updateAdditionalCost('activities', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="25"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transportation ($)
            </label>
            <input
              type="number"
              value={additionalCosts.transportation || ''}
              onChange={(e) => updateAdditionalCost('transportation', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Childcare Cost Breakdown:</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Hourly Rate:</span>
            <span className="font-medium">${hourlyRate.toFixed(2)}/hour</span>
          </div>
          <div className="flex justify-between">
            <span>Daily Cost:</span>
            <span className="font-medium">${dailyCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Weekly Cost:</span>
            <span className="font-medium">${weeklyCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Base Monthly Cost:</span>
            <span className="font-medium">${monthlyCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Additional Costs:</span>
            <span className="font-medium">${totalAdditionalCosts.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Total Monthly Cost:</span>
            <span className="font-semibold text-pink-600">${totalMonthlyCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total Annual Cost:</span>
            <span className="font-semibold text-purple-600">${totalAnnualCost.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-pink-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Childcare Cost-Saving Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Look into employer-sponsored childcare benefits or FSA accounts</p>
          <p>• Consider family daycare for lower costs than centers</p>
          <p>• Share a nanny with another family to split costs</p>
          <p>• Check for sliding scale fees based on income</p>
          <p>• Look into local childcare assistance programs</p>
          <p>• Consider part-time care combined with family help</p>
        </div>
      </div>
    </div>
  );
};

export default ChildcareExpenseCalculator;