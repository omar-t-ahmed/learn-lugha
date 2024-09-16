import React from 'react';
import { Book, BarChart } from 'lucide-react';

interface UserProgressProps {
  level: number;
  xp: number;
}

const ProgressBar: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

const UserProgress: React.FC<UserProgressProps> = ({ level, xp }) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 text-white">
        <h2 className="text-xl font-semibold mb-4">Omar's Progress</h2>
        <div className="flex justify-between gap-4 items-center mb-4">
          <div className="flex items-center space-x-2">
            <BarChart className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">Lvl. {level}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Book className="h-5 w-5 text-green-500" />
            <span className="font-medium">{xp} XP</span>
          </div>
        </div>
        <ProgressBar value={xp} />
        <p className="text-sm text-gray-400">{(100 - xp)}% to next level</p>
      </section>
    </main>
  );
};

export default UserProgress;