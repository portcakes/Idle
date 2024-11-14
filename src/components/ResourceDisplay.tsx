import React from 'react';
import { Resource } from '../types/game';

interface ResourceDisplayProps {
  resource: Resource;
}

export const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resource }) => {
  const timeSinceDepletion = Date.now() - resource.lastDepleted;
  const depletionProgress = Math.min(timeSinceDepletion / 15000, 1); // 15 seconds depletion cycle
  const progressWidth = `${(100 - depletionProgress * 100)}%`;

  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 capitalize">{resource.name}</h3>
      <p className="text-2xl font-bold text-amber-600">{Math.floor(resource.amount)}</p>
      <div className="text-sm text-gray-600">
        <p>Per Click: +{resource.perClick.toFixed(1)}</p>
        <p>Per Second: +{resource.perSecond.toFixed(1)}</p>
      </div>
      
      <div className="mt-2">
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-200"
            style={{ width: progressWidth }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Depletes: {resource.depletionRate}% every 15s
        </p>
      </div>
    </div>
  );
};