import React, { useState, useEffect } from 'react';
import { getCustomDate } from './lib/calendar';
import { Clock } from 'lucide-react';

function App() {
  const [currentDate, setCurrentDate] = useState(getCustomDate());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(getCustomDate(now));
      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <div className="text-center space-y-2">
          <div className="text-2xl text-gray-700">
            {currentDate.weekday}, {currentDate.season} {currentDate.dayInSeason}, Year {currentDate.year}
          </div>
          <div className="text-6xl font-bold text-indigo-600">
            {new Date(currentTime.getTime()).toLocaleTimeString('en-US', { 
              hour12: false,
              timeZone: 'UTC',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div className="text-2xl text-gray-700">
            {currentDate.weekdayIndex}/{currentDate.season}/{currentDate.dayInSeason}/{currentDate.year}
          </div>

          {currentDate.isLeapDay && (
            <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg text-center mt-4">
              Today is ζDay!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;