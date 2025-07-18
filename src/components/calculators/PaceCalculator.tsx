import React, { useState } from 'react';
import { Timer } from 'lucide-react';

const PaceCalculator = () => {
  const [calculationType, setCalculationType] = useState<string>('pace');
  const [distance, setDistance] = useState<number>(0);
  const [distanceUnit, setDistanceUnit] = useState<string>('km');
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [paceMinutes, setPaceMinutes] = useState<number>(0);
  const [paceSeconds, setPaceSeconds] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);

  const convertToSeconds = (h: number, m: number, s: number) => {
    return h * 3600 + m * 60 + s;
  };

  const convertToTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return { hours, minutes, seconds };
  };

  const calculatePace = () => {
    if (distance <= 0) return { minutes: 0, seconds: 0 };
    const totalSeconds = convertToSeconds(hours, minutes, seconds);
    const paceInSeconds = totalSeconds / distance;
    const paceMinutes = Math.floor(paceInSeconds / 60);
    const paceSecondsRemainder = Math.floor(paceInSeconds % 60);
    return { minutes: paceMinutes, seconds: paceSecondsRemainder };
  };

  const calculateTime = () => {
    if (distance <= 0 || (paceMinutes <= 0 && paceSeconds <= 0)) return { hours: 0, minutes: 0, seconds: 0 };
    const paceInSeconds = paceMinutes * 60 + paceSeconds;
    const totalSeconds = paceInSeconds * distance;
    return convertToTime(totalSeconds);
  };

  const calculateDistance = () => {
    if (speed <= 0 || (hours <= 0 && minutes <= 0 && seconds <= 0)) return 0;
    const totalHours = hours + minutes / 60 + seconds / 3600;
    return speed * totalHours;
  };

  const calculateSpeed = () => {
    if (distance <= 0 || (hours <= 0 && minutes <= 0 && seconds <= 0)) return 0;
    const totalHours = hours + minutes / 60 + seconds / 3600;
    return distance / totalHours;
  };

  const pace = calculatePace();
  const time = calculateTime();
  const calculatedDistance = calculateDistance();
  const calculatedSpeed = calculateSpeed();

  // Convert pace to different units
  const pacePerMile = distanceUnit === 'km' ? 
    { minutes: Math.floor(pace.minutes * 1.609344), seconds: Math.floor((pace.minutes * 1.609344 % 1) * 60 + pace.seconds * 1.609344) } :
    { minutes: Math.floor(pace.minutes / 1.609344), seconds: Math.floor((pace.minutes / 1.609344 % 1) * 60 + pace.seconds / 1.609344) };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Timer className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Pace Calculator</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What do you want to calculate?
        </label>
        <select
          value={calculationType}
          onChange={(e) => setCalculationType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="pace">Calculate Pace</option>
          <option value="time">Calculate Time</option>
          <option value="distance">Calculate Distance</option>
          <option value="speed">Calculate Speed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(calculationType === 'pace' || calculationType === 'time') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distance
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                step="0.1"
                value={distance || ''}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter distance"
              />
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="km">km</option>
                <option value="miles">miles</option>
              </select>
            </div>
          </div>
        )}

        {(calculationType === 'pace' || calculationType === 'distance' || calculationType === 'speed') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                value={hours || ''}
                onChange={(e) => setHours(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Hours"
              />
              <input
                type="number"
                value={minutes || ''}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Minutes"
              />
              <input
                type="number"
                value={seconds || ''}
                onChange={(e) => setSeconds(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Seconds"
              />
            </div>
          </div>
        )}

        {calculationType === 'time' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pace (per {distanceUnit === 'km' ? 'km' : 'mile'})
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={paceMinutes || ''}
                onChange={(e) => setPaceMinutes(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Minutes"
              />
              <input
                type="number"
                value={paceSeconds || ''}
                onChange={(e) => setPaceSeconds(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Seconds"
              />
            </div>
          </div>
        )}

        {(calculationType === 'distance' || calculationType === 'speed') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speed ({distanceUnit}/h)
            </label>
            <input
              type="number"
              step="0.1"
              value={speed || ''}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter speed"
            />
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Results:</h4>
        
        {calculationType === 'pace' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Pace per {distanceUnit === 'km' ? 'km' : 'mile'}</p>
              <p className="text-2xl font-bold text-blue-600">
                {pace.minutes}:{pace.seconds.toString().padStart(2, '0')}
              </p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Speed</p>
              <p className="text-2xl font-bold text-green-600">
                {calculatedSpeed.toFixed(1)} {distanceUnit}/h
              </p>
            </div>
          </div>
        )}

        {calculationType === 'time' && (
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Total Time</p>
            <p className="text-2xl font-bold text-blue-600">
              {time.hours}:{time.minutes.toString().padStart(2, '0')}:{time.seconds.toString().padStart(2, '0')}
            </p>
          </div>
        )}

        {calculationType === 'distance' && (
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Distance Covered</p>
            <p className="text-2xl font-bold text-blue-600">
              {calculatedDistance.toFixed(2)} {distanceUnit}
            </p>
          </div>
        )}

        {calculationType === 'speed' && (
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Average Speed</p>
            <p className="text-2xl font-bold text-blue-600">
              {calculatedSpeed.toFixed(1)} {distanceUnit}/h
            </p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Common Running Paces:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Easy run: 7:00-9:00 per km (11:15-14:30 per mile)</p>
          <p>• Marathon pace: 4:15-6:00 per km (6:50-9:40 per mile)</p>
          <p>• Half marathon pace: 4:00-5:30 per km (6:25-8:50 per mile)</p>
          <p>• 10K pace: 3:30-5:00 per km (5:35-8:00 per mile)</p>
          <p>• 5K pace: 3:00-4:30 per km (4:50-7:15 per mile)</p>
        </div>
      </div>
    </div>
  );
};

export default PaceCalculator;