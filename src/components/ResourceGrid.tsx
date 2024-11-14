import React from 'react';
import { Resource } from '../types/game';
import { ResourceDisplay } from './ResourceDisplay';

interface ResourceGridProps {
  resources: Resource[];
}

export const ResourceGrid: React.FC<ResourceGridProps> = ({ resources }) => {
  const categories = {
    population: resources.filter(r => r.category === 'population'),
    raw: resources.filter(r => r.category === 'raw'),
    refined: resources.filter(r => r.category === 'refined'),
    luxury: resources.filter(r => r.category === 'luxury')
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {Object.entries(categories).map(([category, categoryResources]) => (
        categoryResources.length > 0 && (
          <div key={category} className="bg-black/30 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 capitalize">{category.replace('_', ' ')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {categoryResources.map(resource => (
                <ResourceDisplay key={resource.name} resource={resource} />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};