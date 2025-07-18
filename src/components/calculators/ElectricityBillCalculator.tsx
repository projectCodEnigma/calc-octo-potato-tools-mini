import React, { useState } from 'react';
import { Zap } from 'lucide-react';

const ElectricityBillCalculator = () => {
  const [calculationType, setCalculationType] = useState<string>('usage');
  const [currentReading, setCurrentReading] = useState<number>(0);
  const [previousReading, setPreviousReading] = useState<number>(0);
  const [unitsConsumed, setUnitsConsumed] = useState<number>(0);
  const [ratePerUnit, setRatePerUnit] = useState<number>(0.12);
  const [fixedCharges, setFixedCharges] = useState<number>(0);
  const [taxes, setTaxes] = useState<number>(0);
  const [appliances, setAppliances] = useState<Array<{name: string, watts: number, hours: number, days: number}>>([
    { name: 'LED Bulb', watts: 10, hours: 6, days: 30 },
    { name: 'Refrigerator', watts: 150, hours: 24, days: 30 },
    { name: 'Air Conditioner', watts: 1500, hours: 8, days: 30 }
  ]);

  const calculateUnitsFromReadings = () => {
    return Math.max(0, currentReading - previousReading);
  };

  const calculateBill = (units: number) => {
    const energyCharges = units * ratePerUnit;
    const totalBeforeTax = energyCharges + fixedCharges;
    const taxAmount = (totalBeforeTax * taxes) / 100;
    const totalBill = totalBeforeTax + taxAmount;
    
    return {
      units,
      energyCharges,
      fixedCharges,
      taxAmount,
      totalBill
    };
  };

  const calculateApplianceConsumption = () => {
    return appliances.map(appliance => {
      const dailyConsumption = (appliance.watts * appliance.hours) / 1000; // kWh per day
      const monthlyConsumption = dailyConsumption * appliance.days;
      const monthlyCost = monthlyConsumption * ratePerUnit;
      
      return {
        ...appliance,
        dailyConsumption,
        monthlyConsumption,
        monthlyCost
      };
    });
  };

  const addAppliance = () => {
    setAppliances([...appliances, { name: '', watts: 0, hours: 0, days: 30 }]);
  };

  const removeAppliance = (index: number) => {
    setAppliances(appliances.filter((_, i) => i !== index));
  };

  const updateAppliance = (index: number, field: string, value: string | number) => {
    const newAppliances = [...appliances];
    newAppliances[index] = { ...newAppliances[index], [field]: value };
    setAppliances(newAppliances);
  };

  const units = calculationType === 'usage' ? calculateUnitsFromReadings() : unitsConsumed;
  const bill = calculateBill(units);
  const applianceData = calculateApplianceConsumption();
  const totalApplianceConsumption = applianceData.reduce((sum, app) => sum + app.monthlyConsumption, 0);
  const totalApplianceCost = applianceData.reduce((sum, app) => sum + app.monthlyCost, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-6 h-6 text-yellow-600" />
        <h3 className="text-lg font-semibold">Electricity Bill Calculator</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calculation Method
        </label>
        <select
          value={calculationType}
          onChange={(e) => setCalculationType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        >
          <option value="usage">From Meter Readings</option>
          <option value="units">From Units Consumed</option>
          <option value="appliances">From Appliance Usage</option>
        </select>
      </div>

      {calculationType === 'usage' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Reading (kWh)
            </label>
            <input
              type="number"
              value={previousReading || ''}
              onChange={(e) => setPreviousReading(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter previous reading"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Reading (kWh)
            </label>
            <input
              type="number"
              value={currentReading || ''}
              onChange={(e) => setCurrentReading(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter current reading"
            />
          </div>
        </div>
      )}

      {calculationType === 'units' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Units Consumed (kWh)
          </label>
          <input
            type="number"
            value={unitsConsumed || ''}
            onChange={(e) => setUnitsConsumed(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Enter units consumed"
          />
        </div>
      )}

      {calculationType === 'appliances' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-700">Appliances</h4>
            <button
              onClick={addAppliance}
              className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg text-sm"
            >
              Add Appliance
            </button>
          </div>
          
          <div className="space-y-3">
            {appliances.map((appliance, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  value={appliance.name}
                  onChange={(e) => updateAppliance(index, 'name', e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Appliance name"
                />
                <input
                  type="number"
                  value={appliance.watts || ''}
                  onChange={(e) => updateAppliance(index, 'watts', Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Watts"
                />
                <input
                  type="number"
                  value={appliance.hours || ''}
                  onChange={(e) => updateAppliance(index, 'hours', Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Hours/day"
                />
                <input
                  type="number"
                  value={appliance.days || ''}
                  onChange={(e) => updateAppliance(index, 'days', Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Days/month"
                />
                <button
                  onClick={() => removeAppliance(index)}
                  className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate per Unit ($/kWh)
          </label>
          <input
            type="number"
            step="0.01"
            value={ratePerUnit || ''}
            onChange={(e) => setRatePerUnit(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="0.12"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fixed Charges ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={fixedCharges || ''}
            onChange={(e) => setFixedCharges(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taxes (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={taxes || ''}
            onChange={(e) => setTaxes(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Bill Breakdown:</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Units Consumed:</span>
            <span className="font-medium">{calculationType === 'appliances' ? totalApplianceConsumption.toFixed(2) : units.toFixed(2)} kWh</span>
          </div>
          <div className="flex justify-between">
            <span>Energy Charges:</span>
            <span className="font-medium">${(calculationType === 'appliances' ? totalApplianceCost : bill.energyCharges).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Fixed Charges:</span>
            <span className="font-medium">${fixedCharges.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes ({taxes}%):</span>
            <span className="font-medium">${(calculationType === 'appliances' ? (totalApplianceCost + fixedCharges) * taxes / 100 : bill.taxAmount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Total Bill:</span>
            <span className="font-semibold text-yellow-600">
              ${(calculationType === 'appliances' ? 
                totalApplianceCost + fixedCharges + (totalApplianceCost + fixedCharges) * taxes / 100 : 
                bill.totalBill).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {calculationType === 'appliances' && (
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Appliance Breakdown:</h4>
          <div className="space-y-2">
            {applianceData.map((appliance, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
                <div>
                  <span className="font-medium">{appliance.name}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({appliance.watts}W × {appliance.hours}h × {appliance.days}d)
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-medium">${appliance.monthlyCost.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">{appliance.monthlyConsumption.toFixed(2)} kWh</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Energy Saving Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Replace incandescent bulbs with LED bulbs</p>
          <p>• Unplug electronics when not in use</p>
          <p>• Use programmable thermostats</p>
          <p>• Seal air leaks around windows and doors</p>
          <p>• Use energy-efficient appliances</p>
          <p>• Wash clothes in cold water when possible</p>
        </div>
      </div>
    </div>
  );
};

export default ElectricityBillCalculator;