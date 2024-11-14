import { useState, useEffect, useCallback } from 'react';
import { Resource, Building, Task } from '../types/game';
import { INITIAL_RESOURCES, INITIAL_BUILDINGS, ALL_TASKS } from '../data/gameData';

const STORAGE_KEY = 'kingdom-builder-save';
const DEPLETION_INTERVAL = 15000; // 15 seconds
const RAID_INTERVAL = 60000; // 60 seconds
const TASK_REFRESH_INTERVAL = 15000; // 15 seconds

export const useGame = () => {
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [buildings, setBuildings] = useState<Building[]>(INITIAL_BUILDINGS);
  const [lastRaid, setLastRaid] = useState<number>(Date.now());
  const [unlockedTasks] = useState<string[]>(ALL_TASKS.filter(t => t.unlocked).map(t => t.id));
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [lastTaskRefresh, setLastTaskRefresh] = useState<number>(Date.now());

  // Load saved game state
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setResources(parsed.resources.map((r: Resource) => ({
        ...r,
        lastDepleted: Date.now(),
      })));
      setBuildings(parsed.buildings.map((b: Building) => ({
        ...b,
        lastProduced: Date.now(),
        productionProgress: 0,
      })));
      setLastRaid(parsed.lastRaid);
    }
  }, []);

  // Save game state
  useEffect(() => {
    const gameState = {
      resources,
      buildings,
      lastRaid,
      unlockedTasks,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [resources, buildings, lastRaid, unlockedTasks]);

  // Randomize tasks
  useEffect(() => {
    const refreshTasks = () => {
      const now = Date.now();
      if (now - lastTaskRefresh >= TASK_REFRESH_INTERVAL) {
        const unlockedTasksList = ALL_TASKS.filter(t => unlockedTasks.includes(t.id));
        const shuffled = [...unlockedTasksList].sort(() => Math.random() - 0.5);
        setAvailableTasks(shuffled.slice(0, 3));
        setLastTaskRefresh(now);
      }
    };

    refreshTasks(); // Initial task set
    const interval = setInterval(refreshTasks, 1000); // Check every second

    return () => clearInterval(interval);
  }, [unlockedTasks, lastTaskRefresh]);

  const getResource = useCallback((name: string) => {
    return resources.find(r => r.name === name);
  }, [resources]);

  const updateResource = useCallback((name: string, amount: number) => {
    setResources(prev => 
      prev.map(r => r.name === name ? { ...r, amount: Math.max(0, r.amount + amount) } : r)
    );
  }, []);

  const handleTask = useCallback((task: Task) => {
    if (task.consumes) {
      const canAfford = task.consumes.every(({ resource, amount }) => {
        const currentResource = getResource(resource);
        return currentResource && currentResource.amount >= amount;
      });

      if (!canAfford) return;

      task.consumes.forEach(({ resource, amount }) => {
        updateResource(resource, -amount);
      });
    }

    task.produces.forEach(({ resource, amount, chance }) => {
      if (chance && Math.random() > chance) return;
      updateResource(resource, amount);
    });
  }, [getResource, updateResource]);

  const canAffordUpgrade = useCallback((building: Building) => {
    return Object.entries(building.cost).every(([resource, cost]) => {
      const currentResource = getResource(resource);
      return currentResource && currentResource.amount >= cost;
    });
  }, [getResource]);

  const upgradeBuilding = useCallback((buildingName: string) => {
    const building = buildings.find(b => b.name === buildingName);
    if (!building || !canAffordUpgrade(building)) return;

    Object.entries(building.cost).forEach(([resource, cost]) => {
      updateResource(resource, -cost);
    });

    setBuildings(prev => 
      prev.map(b => b.name === buildingName ? {
        ...b,
        level: b.level + 1,
        cost: Object.fromEntries(
          Object.entries(b.cost).map(([r, c]) => [r, Math.ceil(c * 1.5)])
        ),
      } : b)
    );
  }, [buildings, canAffordUpgrade, updateResource]);

  // Building production
  useEffect(() => {
    const interval = setInterval(() => {
      setBuildings(prev => prev.map(building => {
        if (!building.produces || !building.unlocked) return building;

        const now = Date.now();
        const timeSinceProduction = now - building.lastProduced;
        const cycleProgress = timeSinceProduction / building.produces.interval;

        if (cycleProgress >= 1) {
          building.produces.resources.forEach(({ name, amount, consumes }) => {
            if (consumes) {
              const resource = getResource(consumes.resource);
              if (!resource || resource.amount < consumes.amount) return;
              updateResource(consumes.resource, -consumes.amount);
            }
            const outputAmount = amount * building.multiplier;
            updateResource(name, outputAmount);
          });

          return {
            ...building,
            lastProduced: now,
            productionProgress: 0,
          };
        }

        return {
          ...building,
          productionProgress: cycleProgress,
        };
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [getResource, updateResource]);

  // Resource depletion
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setResources(prev => prev.map(resource => {
        const timeSinceDepleted = now - resource.lastDepleted;
        if (timeSinceDepleted >= DEPLETION_INTERVAL) {
          return {
            ...resource,
            amount: Math.max(0, resource.amount - (resource.amount * (resource.depletionRate / 100))),
            lastDepleted: now,
          };
        }
        return resource;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Raids
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastRaid > RAID_INTERVAL) {
        const barracks = buildings.find(b => b.name === 'Barracks');
        const guards = getResource('guards');
        
        if (barracks && guards) {
          const protection = (barracks.level - 1) * 0.1 + (guards.amount * 0.05);
          const lossMultiplier = Math.max(0.1, 1 - protection);

          const guardsLost = Math.ceil(guards.amount * 0.2);
          updateResource('guards', -guardsLost);

          resources.forEach(resource => {
            if (resource.name !== 'guards') {
              const loss = resource.amount * 0.2 * lossMultiplier;
              updateResource(resource.name, -loss);
            }
          });

          setLastRaid(now);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [buildings, lastRaid, resources, getResource, updateResource]);

  return {
    resources,
    buildings,
    availableTasks,
    handleTask,
    upgradeBuilding,
    canAffordUpgrade,
    lastRaid,
  };
};