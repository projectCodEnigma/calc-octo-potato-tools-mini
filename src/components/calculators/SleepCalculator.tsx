import React, { useState } from 'react';
import { Moon } from 'lucide-react';

const SleepCalculator = () => {
  const [calculationType, setCalculationType] = useState<string>('bedtime');
  const [wakeTime, setWakeTime] = useState<string>('07:00');
  const [bedTime, setBedTime] = useState<string>('23:00');
  const [sleepCycles, setSleepCycles] = useState<number>(5);

  const calculateSleepCycles = (sleepDuration: number) => {
    const cycleLength = 90; // minutes
    return Math.round(sleepDuration / cycleLength);
  };

  const calculateBedtimes = () => {
    const wake = new Date(`2024-01-01T${wakeTime}:00`);
    const cycleLengthMs = 90 * 60 * 1000; // 90 minutes in milliseconds
    const fallAsleepTime = 15 * 60 * 1000; // 15 minutes to fall asleep
    
    const bedtimes = [];
    for (let cycles = 4; cycles <= 6; cycles++) {
      const sleepTime = cycles * cycleLengthMs;
      const bedtime = new Date(wake.getTime() - sleepTime - fallAsleepTime);
      
      // Handle previous day
      if (bedtime.getDate() !== wake.getDate()) {
        bedtime.setDate(bedtime.getDate() + 1);
      }
      
      bedtimes.push({
        cycles,
        time: bedtime.toTimeString().slice(0, 5),
        hours: (cycles * 1.5).toFixed(1)
      });
    }
    
    return bedtimes;
  };

  const calculateWakeTimes = () => {
    const bed = new Date(`2024-01-01T${bedTime}:00`);
    const cycleLengthMs = 90 * 60 * 1000;
    const fallAsleepTime = 15 * 60 * 1000;
    
    const wakeTimes = [];
    for (let cycles = 4; cycles <= 6; cycles++) {
      const sleepTime = cycles * cycleLengthMs;
      const wakeTime = new Date(bed.getTime() + sleepTime + fallAsleepTime);
      
      // Handle next day
      if (wakeTime.getDate() !== bed.getDate()) {
        wakeTime.setDate(wakeTime.getDate() + 1);
      }
      
      wakeTimes.push({
        cycles,
        time: wakeTime.toTimeString().slice(0, 5),
        hours: (cycles * 1.5).toFixed(1)
      });
    }
    
    return wakeTimes;
  };

  const getCurrentSleepData = () => {
    const bed = new Date(`2024-01-01T${bedTime}:00`);
    const wake = new Date(`2024-01-01T${wakeTime}:00`);
    
    // Handle overnight sleep
    if (wake < bed) {
      wake.setDate(wake.getDate() + 1);
    }
    
    const sleepDurationMs = wake.getTime() - bed.getTime();
    const sleepDurationHours = sleepDurationMs / (1000 * 60 * 60);
    const sleepDurationMinutes = sleepDurationMs / (1000 * 60);
    const cycles = calculateSleepCycles(sleepDurationMinutes);
    
    return {
      hours: sleepDurationHours.toFixed(1),
      cycles,
      quality: cycles >= 4 && cycles <= 6 ? 'Good' : cycles > 6 ? 'Too much' : 'Too little'
    };
  };

  const bedtimes = calculateBedtimes();
  const wakeTimes = calculateWakeTimes();
  const currentSleep = getCurrentSleepData();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Moon className="w-6 h-6 text-indigo-600" />
        <h3 className="text-lg font-semibold">Sleep Calculator</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calculation Type
        </label>
        <select
          value={calculationType}
          onChange={(e) => setCalculationType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="bedtime">When should I go to bed?</option>
          <option value="waketime">When should I wake up?</option>
          <option value="analyze">Analyze my sleep schedule</option>
        </select>
      </div>

      {calculationType === 'bedtime' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wake Up Time
          </label>
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      )}

      {calculationType === 'waketime' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedtime
          </label>
          <input
            type="time"
            value={bedTime}
            onChange={(e) => setBedTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      )}

      {calculationType === 'analyze' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedtime
            </label>
            <input
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wake Up Time
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {calculationType === 'bedtime' && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Recommended Bedtimes:</h4>
          <div className="space-y-2">
            {bedtimes.map((bedtime, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                <div>
                  <p className="font-medium">{bedtime.time}</p>
                  <p className="text-sm text-gray-600">{bedtime.cycles} sleep cycles</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{bedtime.hours} hours</p>
                  <p className="text-xs text-gray-500">
                    {bedtime.cycles === 5 ? 'Recommended' : bedtime.cycles === 4 ? 'Minimum' : 'Maximum'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {calculationType === 'waketime' && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Recommended Wake Times:</h4>
          <div className="space-y-2">
            {wakeTimes.map((wakeTime, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                <div>
                  <p className="font-medium">{wakeTime.time}</p>
                  <p className="text-sm text-gray-600">{wakeTime.cycles} sleep cycles</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{wakeTime.hours} hours</p>
                  <p className="text-xs text-gray-500">
                    {wakeTime.cycles === 5 ? 'Recommended' : wakeTime.cycles === 4 ? 'Minimum' : 'Maximum'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {calculationType === 'analyze' && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Sleep Analysis:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Sleep Duration</p>
              <p className="text-2xl font-bold text-indigo-600">
                {currentSleep.hours} hours
              </p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Sleep Cycles</p>
              <p className="text-2xl font-bold text-purple-600">
                {currentSleep.cycles}
              </p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Quality</p>
              <p className={`text-2xl font-bold ${
                currentSleep.quality === 'Good' ? 'text-green-600' : 'text-orange-600'
              }`}>
                {currentSleep.quality}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-indigo-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Sleep Cycle Facts:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Each sleep cycle lasts about 90 minutes</p>
          <p>• Adults need 4-6 complete sleep cycles per night</p>
          <p>• Waking up at the end of a cycle helps you feel refreshed</p>
          <p>• It typically takes 10-20 minutes to fall asleep</p>
          <p>• Consistent sleep schedule improves sleep quality</p>
        </div>
      </div>
    </div>
  );
};

export default SleepCalculator;