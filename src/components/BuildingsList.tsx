import { useState } from "react";
import { Building, Resource } from "../types/game";
import { canBuildBuilding, buildBuilding } from "../utils/buildingUtils";

interface BuildingsListProps {
  buildings: Building[];
  resources: Resource[];
  onResourcesUpdate: (resources: Resource[]) => void;
  className?: string;
}

function BuildingsList({
  buildings,
  resources,
  onResourcesUpdate,
  className,
}: BuildingsListProps) {
  const [message, setMessage] = useState<string>("");

  const buildableBuildings = buildings.filter(
    (building) => building.unlocked && !building.isBuilt
  );

  const handleBuild = (building: Building) => {
    const result = buildBuilding(building, resources);
    setMessage(result.message || "");

    if (result.success) {
      onResourcesUpdate([...resources]); // Trigger resource update in parent
    }
  };

  return (
    <div className={className}>
      <h2>Available Buildings</h2>
      {message && <div className="message">{message}</div>}
      {buildableBuildings.map((building) => (
        <div key={building.name}>
          <h3>{building.name}</h3>
          <p>{building.description}</p>
          <p>Cost:</p>
          <ul>
            {Object.entries(building.cost).map(([resource, amount]) => (
              <li
                key={resource}
                style={{
                  color:
                    resources.find((r) => r.name === resource)?.amount ??
                    0 >= amount
                      ? "green"
                      : "red",
                }}
              >
                {resource}: {amount}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleBuild(building)}
            disabled={!canBuildBuilding(building, resources)}
          >
            Build
          </button>
        </div>
      ))}
    </div>
  );
}

export default BuildingsList;
