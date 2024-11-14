import React from 'react';
import { Task } from '../types/game';
import * as Icons from 'lucide-react';

interface TaskButtonProps {
  task: Task;
  onClick: () => void;
}

export const TaskButton: React.FC<TaskButtonProps> = ({ task, onClick }) => {
  const IconComponent = Icons[task.icon as keyof typeof Icons];

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white p-4 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
    >
      <IconComponent className="w-6 h-6" />
      <div className="text-left">
        <p className="font-semibold">{task.name}</p>
        <p className="text-xs opacity-80">Difficulty: {task.difficulty}</p>
      </div>
    </button>
  );
};