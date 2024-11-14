import React from "react";
import { Building } from "../types/game";
import { useGameState } from "../hooks/useGameState"; // Using hooks instead of context

interface BuildingDisplayProps {
  building: Building;
}

export const BuildingDisplay: React.FC<BuildingDisplayProps> = ({
  building,
}) => {
  const { resources, updateResources } = useGameState();

  const canAfford =
    Array.isArray(building.cost) &&
    building.cost.every(
      (cost) => resources[cost.resource]?.amount >= cost.amount
    );

  const handlePurchase = () => {
    if (!canAfford || building.isBuilt || !Array.isArray(building.cost)) return;

    const updatedResources = { ...resources };
    building.cost?.forEach((cost: { resource: string; amount: number }) => {
      if (cost && cost.resource && resources[cost.resource]) {
        updatedResources[cost.resource] = {
          ...resources[cost.resource],
          amount: resources[cost.resource].amount - cost.amount,
        };
      }
    });

    updateResources(updatedResources);
    building.isBuilt = true;
  };

  return (
    <div className="p-4 border rounded-lg bg-black/20">
      <h3 className="font-semibold">{building.name}</h3>

      {!building.isBuilt ? (
        <>
          <div className="text-sm mt-2">
            Cost:
            {Array.isArray(building.cost) &&
              building.cost.map(
                (cost: { resource: string; amount: number }) => (
                  <div
                    key={cost.resource}
                    className={
                      resources[cost.resource]?.amount >= cost.amount
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {cost.amount} {cost.resource}
                  </div>
                )
              )}
          </div>
          <button
            onClick={handlePurchase}
            disabled={!canAfford}
            className={`mt-2 px-3 py-1 rounded ${
              canAfford
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Build
          </button>
        </>
      ) : (
        <div className="text-sm mt-2">
          Produces:
          {building.produces?.resources?.map((prod) => (
            <div key={prod.name}>
              {prod.amount} {prod.name} every{" "}
              {building.produces?.interval ?? 1000}s
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
