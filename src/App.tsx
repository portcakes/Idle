import { ResourceGrid } from "./components/ResourceGrid";
import { TaskButton } from "./components/TaskButton";
import { BuildingGrid } from "./components/BuildingGrid";
import { RaidTimer } from "./components/RaidTimer";
import { useGame } from "./hooks/useGame";
import { Trash2 } from "lucide-react";
import { track } from "@vercel/analytics";
import BuildingsList from "./components/BuildingsList";

function App() {
  const {
    resources,
    buildings,
    availableTasks,
    handleTask,
    upgradeBuilding,
    canAffordUpgrade,
    lastRaid,
    resetGame,
    taskSlots,
    maxTaskSlots,
    getNextSlotCost,
    canAffordNextSlot,
    purchaseTaskSlot,
    updateResources,
  } = useGame();

  const handleResetGame = () => {
    if (
      window.confirm(
        "Are you sure you want to reset your progress? This cannot be undone."
      )
    ) {
      resetGame();
    }
  };

  return (
    <div className="relative">
      <ResourceGrid resources={{ items: resources }} />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white p-8 pb-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Kingdom Builder</h1>
            <button
              onClick={() => {
                handleResetGame();
                track("reset_game");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Reset Progress
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Available Tasks</h2>
                {taskSlots < maxTaskSlots && (
                  <button
                    onClick={() => {
                      purchaseTaskSlot();
                      track("purchase_task_slot");
                    }}
                    disabled={!canAffordNextSlot()}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      canAffordNextSlot()
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                    title={`Cost: ${getNextSlotCost()} coins`}
                  >
                    Upgrade ({taskSlots}/{maxTaskSlots})
                  </button>
                )}
              </div>
              <div className="grid gap-4">
                {availableTasks.map((task) => (
                  <TaskButton
                    key={task.id}
                    task={task}
                    onClick={() => {
                      handleTask(task);
                      track("complete_task", { task: task.name });
                    }}
                    resources={resources}
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

          <div className="w-full">
            <BuildingsList
              buildings={buildings}
              resources={resources}
              onResourcesUpdate={updateResources}
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl"
            />
          </div>
        </div>
        <RaidTimer lastRaid={lastRaid} />
      </div>
    </div>
  );
}

export default App;
