// components/ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  progress: number; // Progress in percentage
  completed: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, completed }) => {
  return (
    <div className="relative w-full bg-gray-700 rounded-full h-4">
      <div
        className={`absolute top-0 left-0 h-full rounded-full ${completed ? 'bg-green-500' : 'bg-blue-500'}`}
        style={{ width: `${progress}%` }}
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-xs font-semibold">
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
