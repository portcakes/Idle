import React from 'react';
import { ResourceGrid } from './components/ResourceGrid';
import { TaskButton } from './components/TaskButton';
import { BuildingGrid } from './components/BuildingGrid';
import { RaidTimer } from './components/RaidTimer';
import { useGame } from './hooks/useGame';
import { Trash2 } from 'lucide-react';

function App() {
  const { 
    resources, 
    buildings, 
    availableTasks, 
    handleTask, 
    upgradeBuilding, 
    canAffordUpgrade, 
    lastRaid 
  } = useGame();

  const handleResetGame = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      localStorage.removeItem('kingdom-builder-save');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white p-8 pb-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Kingdom Builder</h1>
          <button
            onClick={handleResetGame}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Reset Progress
          </button>
        </div>
        
        <ResourceGrid resources={resources} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Available Tasks</h2>
            <div className="grid gap-4">
              {availableTasks.map(task => (
                <TaskButton
                  key={task.id}
                  task={task}
                  onClick={() => handleTask(task)}
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <BuildingGrid
              buildings={buildings}
              onUpgrade={upgradeBuilding}
              canAfford={canAffordUpgrade}
            />
          </div>
        </div>
      </div>
      
      <RaidTimer lastRaid={lastRaid} />
    </div>
  );
}

export default App;