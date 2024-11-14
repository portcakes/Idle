import React from "react";
import { Task, Resource } from "../types/game";
import * as Icons from "lucide-react";

interface TaskButtonProps {
  task: Task;
  onClick: () => void;
  resources: Resource[];
}

export const TaskButton: React.FC<TaskButtonProps> = ({
  task,
  onClick,
  resources,
}) => {
  const IconComponent = Icons[
    task.icon as keyof typeof Icons
  ] as React.ElementType;

  const canAfford = React.useMemo(() => {
    if (!task.consumes) return true;
    return task.consumes.every(({ resource, amount }) => {
      const currentResource = resources.find((r) => r.name === resource);
      return currentResource && currentResource.amount >= amount;
    });
  }, [task.consumes, resources]);

  return (
    <button
      onClick={onClick}
      disabled={!canAfford}
      className={`flex items-center gap-3 p-4 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 w-full
        ${
          canAfford
            ? "bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
            : "bg-gradient-to-br from-gray-400 to-gray-500 cursor-not-allowed opacity-75 text-gray-200"
        }`}
    >
      <IconComponent className="w-6 h-6" />
      <div className="text-left flex-1">
        <p className="font-semibold">{task.name}</p>
        <div className="text-xs space-y-1">
          <p>Difficulty: {task.difficulty}</p>
          {task.consumes && (
            <div className="space-x-2">
              {task.consumes.map(({ resource, amount }) => {
                const currentResource = resources.find(
                  (r) => r.name === resource
                );
                const hasEnough =
                  currentResource && currentResource.amount >= amount;
                return (
                  <span
                    key={resource}
                    className={`${
                      hasEnough ? "text-green-300" : "text-red-300"
                    }`}
                  >
                    {resource}: {Math.floor(currentResource?.amount ?? 0)}/
                    {amount}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
