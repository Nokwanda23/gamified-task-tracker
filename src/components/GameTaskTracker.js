import React, { useState, useEffect } from 'react';
import { XSquare, CheckSquare, Trophy } from 'lucide-react';

const tasks = [
  { id: 1, name: "Email that dude about references", xp: 10 },
  { id: 2, name: "Create the documents for the grad school app", xp: 20 },
  { id: 3, name: "Study JavaScript", xp: 15 },
  { id: 4, name: "Start assignment prep", xp: 10 },
  { id: 5, name: "Cap project coding figuring out", xp: 25 },
  { id: 6, name: "Study Chinese", xp: 15 },
  { id: 7, name: "Do JavaScript activities", xp: 20 },
  { id: 8, name: "Read book", xp: 10 },
  { id: 9, name: "Read lectures", xp: 15 },
  { id: 10, name: "Prepare notes", xp: 10 }
];

const ranks = [
  "Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"
];

const GameTaskTracker = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState(0);

  useEffect(() => {
    const newRank = Math.floor(xp / 100);
    if (newRank !== rank && newRank < ranks.length) {
      setRank(newRank);
    }
  }, [xp]);

  const toggleTask = (taskId) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter(id => id !== taskId));
      setXp(xp - tasks.find(task => task.id === taskId).xp);
    } else {
      setCompletedTasks([...completedTasks, taskId]);
      setXp(xp + tasks.find(task => task.id === taskId).xp);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">Daily XP Grind</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 border-purple-500 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-center text-purple-400 mb-4">Tasks</h2>
          <div>
            {tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between mb-4">
                <span className="flex-1">{task.name}</span>
                <span className="text-yellow-400 mr-4">+{task.xp} XP</span>
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`p-2 rounded ${completedTasks.includes(task.id) ? "bg-green-500" : "bg-red-500"}`}
                >
                  {completedTasks.includes(task.id) ? (
                    <CheckSquare className="h-4 w-4" />
                  ) : (
                    <XSquare className="h-4 w-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 border-purple-500 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-center text-purple-400 mb-4">Stats</h2>
          <div>
            <div className="flex items-center justify-between mb-4">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold">{ranks[rank]}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${(xp % 100)}%` }}></div>
            </div>
            <p className="text-center">
              {xp} XP / {(Math.floor(xp / 100) + 1) * 100} XP
            </p>
            <p className="text-center mt-4">
              {completedTasks.length} / {tasks.length} tasks completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameTaskTracker;