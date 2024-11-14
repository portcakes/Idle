import React from 'react';
import { Building } from '../types/game';
import { BuildingCard } from './BuildingCard';

interface BuildingGridProps {
  buildings: Building[];
  onUpgrade: (name: string) => void;
  canAfford: (building: Building) => boolean;
}

export const BuildingGrid: React.FC<BuildingGridProps> = ({ buildings, onUpgrade, canAfford }) => {
  const unlockedBuildings = buildings.filter(b => b.unlocked);
  
  return (
    <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Buildings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {unlockedBuildings.map(building => (
          <BuildingCard
            key={building.name}
            building={building}
            onUpgrade={() => onUpgrade(building.name)}
            canAfford={canAfford(building)}
          />
        ))}
      </div>
    </div>
  );
};