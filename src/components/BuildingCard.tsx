import React from 'react';
import { Building } from '../types/game';

interface BuildingCardProps {
  building: Building;
  onUpgrade: () => void;
  canAfford: boolean;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ building, onUpgrade, canAfford }) => {
  const progressWidth = building.produces 
    ? `${(building.productionProgress * 100).toFixed(1)}%` 
    : '0%';

  return (
    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">{building.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{building.description}</p>
      <p className="text-amber-600 font-semibold">Level {building.level}</p>
      
      {building.produces && (
        <div className="mt-2">
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-200"
              style={{ width: progressWidth }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Produces: {building.produces.amount * building.multiplier} {building.produces.resource}
            every {(building.produces.interval / 1000).toFixed(1)}s
          </p>
        </div>
      )}

      <div className="mt-2">
        <p className="text-sm font-medium text-gray-700">Upgrade Cost:</p>
        {Object.entries(building.cost).map(([resource, amount]) => (
          <p key={resource} className="text-sm text-gray-600">
            {resource}: {Math.floor(amount)}
          </p>
        ))}
      </div>
      
      <button
        onClick={onUpgrade}
        disabled={!canAfford}
        className={`mt-3 w-full py-2 px-4 rounded ${
          canAfford
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Upgrade
      </button>
    </div>
  );
};