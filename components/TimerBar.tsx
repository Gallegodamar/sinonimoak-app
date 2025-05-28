import React from 'react';

interface TimerBarProps {
  remainingTime: number;
  maxTime: number;
}

const TimerBar: React.FC<TimerBarProps> = ({ remainingTime, maxTime }) => {
  const percentage = maxTime > 0 ? Math.max(0, (remainingTime / maxTime) * 100) : 0;
  
  let barColor = 'bg-green-500'; // Default green
  if (percentage <= 25) {
    barColor = 'bg-red-500'; // Red for last 25%
  } else if (percentage <= 50) {
    barColor = 'bg-yellow-500'; // Yellow for 26%-50%
  }

  return (
    <div className="w-full h-4 bg-slate-300 rounded-full overflow-hidden my-4 shadow">
      <div
        className={`h-full rounded-full transition-width duration-1000 ease-linear ${barColor}`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={remainingTime}
        aria-valuemin={0}
        aria-valuemax={maxTime}
        aria-label="Geratzen den denbora"
      ></div>
    </div>
  );
};

export default TimerBar;