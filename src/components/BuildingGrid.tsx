import { Building } from "../types/game";
import { useEffect, useState } from "react";

interface BuildingGridProps {
  buildings: Building[];
  onUpgrade: (buildingName: string) => void;
  canAfford: (building: Building) => boolean;
}

export function BuildingGrid({
  buildings,
  onUpgrade,
  canAfford,
}: BuildingGridProps) {
  const [progress, setProgress] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const updateProgress = () => {
      const now = Date.now();
      setProgress((prevProgress) => {
        const newProgress = { ...prevProgress };

        buildings.forEach((building) => {
          if (building.unlocked && building.isBuilt) {
            const elapsed = now - building.lastProduced;
            const percent = (elapsed / building.produces.interval) * 100;
            newProgress[building.name] = Math.min(percent, 100);
          } else {
            newProgress[building.name] = 0;
          }
        });

        return newProgress;
      });
    };

    const intervalId = setInterval(updateProgress, 100);
    updateProgress(); // Initial update

    return () => clearInterval(intervalId);
  }, [buildings]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {buildings.map((building) => (
        <div
          key={building.name}
          className={`p-4 rounded-xl ${
            building.unlocked
              ? "bg-black/30 backdrop-blur-sm"
              : "bg-black/10 backdrop-blur-sm opacity-75"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{building.name}</h3>
            {building.unlocked ? (
              <button
                onClick={() => onUpgrade(building.name)}
                disabled={!canAfford(building)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  canAfford(building)
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                {building.isBuilt ? "Upgrade" : "Build"} (Lvl {building.level})
              </button>
            ) : (
              <div className="text-sm text-gray-400">Locked</div>
            )}
          </div>
          <p className="text-sm text-gray-300 mb-2">{building.description}</p>

          {building.unlocked && (
            <div className="text-xs text-gray-400 mb-2">
              Status: {building.isBuilt ? "Built" : "Not Built"}
            </div>
          )}

          {building.unlocked && building.isBuilt && (
            <div className="mt-2">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${progress[building.name] || 0}%`,
                    transition: "width 100ms linear",
                  }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Produces every {building.produces.interval / 1000}s:
                {building.produces.resources.map((resource) => (
                  <span key={resource.name} className="ml-1">
                    {resource.amount} {resource.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!building.unlocked && (
            <div className="text-sm text-gray-400 mt-2">
              <div>Required to unlock:</div>
              {Object.entries(building.toUnlockCost).map(
                ([resource, amount]) => (
                  <div key={resource}>
                    {resource}: {amount}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
