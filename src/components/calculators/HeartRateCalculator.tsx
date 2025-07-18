import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const HeartRateCalculator = () => {
  const [age, setAge] = useState<number>(0);
  const [restingHR, setRestingHR] = useState<number>(0);
  const [targetZone, setTargetZone] = useState<string>('moderate');

  const calculateMaxHR = () => {
    return 220 - age;
  };

  const calculateTargetZones = () => {
    const maxHR = calculateMaxHR();
    const hrReserve = maxHR - restingHR;

    return {
      warmUp: {
        lower: Math.round(maxHR * 0.5),
        upper: Math.round(maxHR * 0.6)
      },
      fatBurn: {
        lower: Math.round(maxHR * 0.6),
        upper: Math.round(maxHR * 0.7)
      },
      aerobic: {
        lower: Math.round(maxHR * 0.7),
        upper: Math.round(maxHR * 0.8)
      },
      anaerobic: {
        lower: Math.round(maxHR * 0.8),
        upper: Math.round(maxHR * 0.9)
      },
      redLine: {
        lower: Math.round(maxHR * 0.9),
        upper: maxHR
      },
      // Karvonen method (using heart rate reserve)
      karvonenModerate: {
        lower: Math.round((hrReserve * 0.5) + restingHR),
        upper: Math.round((hrReserve * 0.7) + restingHR)
      },
      karvonenVigorous: {
        lower: Math.round((hrReserve * 0.7) + restingHR),
        upper: Math.round((hrReserve * 0.85) + restingHR)
      }
    };
  };

  const maxHR = calculateMaxHR();
  const zones = calculateTargetZones();

  const getZoneDescription = (zone: string) => {
    const descriptions = {
      warmUp: 'Light activity, warm-up and cool-down',
      fatBurn: 'Light to moderate exercise, fat burning',
      aerobic: 'Moderate to vigorous exercise, cardiovascular fitness',
      anaerobic: 'Vigorous exercise, performance training',
      redLine: 'Maximum effort, short bursts only'
    };
    return descriptions[zone as keyof typeof descriptions];
  };

  const getZoneColor = (zone: string) => {
    const colors = {
      warmUp: 'text-blue-600',
      fatBurn: 'text-green-600',
      aerobic: 'text-yellow-600',
      anaerobic: 'text-orange-600',
      redLine: 'text-red-600'
    };
    return colors[zone as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Heart className="w-6 h-6 text-red-600" />
        <h3 className="text-lg font-semibold">Heart Rate Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            value={age || ''}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resting Heart Rate (optional)
          </label>
          <input
            type="number"
            value={restingHR || ''}
            onChange={(e) => setRestingHR(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Measure when at rest"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Maximum Heart Rate:</h4>
        <div className="text-center p-3 bg-white rounded-lg">
          <p className="text-3xl font-bold text-red-600">
            {maxHR} bpm
          </p>
          <p className="text-sm text-gray-600">220 - {age} years</p>
        </div>
      </div>

      <div className="bg-red-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Heart Rate Training Zones:</h4>
        <div className="space-y-3">
          {Object.entries(zones).slice(0, 5).map(([zone, range]) => (
            <div key={zone} className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div>
                <p className={`font-medium ${getZoneColor(zone)}`}>
                  {zone.charAt(0).toUpperCase() + zone.slice(1).replace(/([A-Z])/g, ' $1')} Zone
                </p>
                <p className="text-sm text-gray-600">
                  {getZoneDescription(zone)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">{range.lower} - {range.upper} bpm</p>
                <p className="text-sm text-gray-500">
                  {Math.round((range.lower/maxHR)*100)} - {Math.round((range.upper/maxHR)*100)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {restingHR > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Karvonen Method (Heart Rate Reserve):</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium text-green-600">Moderate Intensity</p>
                <p className="text-sm text-gray-600">50-70% of heart rate reserve</p>
              </div>
              <p className="font-bold">{zones.karvonenModerate.lower} - {zones.karvonenModerate.upper} bpm</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium text-orange-600">Vigorous Intensity</p>
                <p className="text-sm text-gray-600">70-85% of heart rate reserve</p>
              </div>
              <p className="font-bold">{zones.karvonenVigorous.lower} - {zones.karvonenVigorous.upper} bpm</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-100 rounded-lg p-4">
        <h4 className="font-semibold mb-2">How to Measure Resting Heart Rate:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Measure first thing in the morning before getting out of bed</p>
          <p>• Place two fingers on your wrist or neck pulse</p>
          <p>• Count beats for 15 seconds and multiply by 4</p>
          <p>• Take measurements for several days and average them</p>
          <p>• Normal resting HR: 60-100 bpm (lower is generally better)</p>
        </div>
      </div>
    </div>
  );
};

export default HeartRateCalculator;