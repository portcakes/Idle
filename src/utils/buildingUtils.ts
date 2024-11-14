import { Building, Resource } from '../types/game';

export function canBuildBuilding(building: Building, resources: Resource[]): boolean {
  return Object.entries(building.cost).every(([resourceName, costAmount]) => {
    const resource = resources.find(r => r.name === resourceName);
    return resource && resource.amount >= costAmount;
  });
}

export function buildBuilding(building: Building, resources: Resource[]): { success: boolean; message?: string } {
  if (!canBuildBuilding(building, resources)) {
    return { success: false, message: 'Not enough resources' };
  }

  // Deduct resources
  Object.entries(building.cost).forEach(([resourceName, costAmount]) => {
    const resource = resources.find(r => r.name === resourceName);
    if (resource) {
      resource.amount -= costAmount;
    }
  });

  // Mark building as built
  building.isBuilt = true;
  
  return { success: true, message: `${building.name} built successfully!` };
} 