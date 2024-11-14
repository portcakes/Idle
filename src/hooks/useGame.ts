import { useState, useEffect, useCallback } from 'react';
import { Resource, Building, Task } from '../types/game';
import { INITIAL_RESOURCES, INITIAL_BUILDINGS, ALL_TASKS } from '../data/gameData';

const STORAGE_KEY = 'kingdom-builder-save';
const DEPLETION_INTERVAL = 15000; // 15 seconds
const RAID_INTERVAL = 60000; // 60 seconds
const TASK_REFRESH_INTERVAL = 15000; // 15 seconds
const RESET_KEY = 'kingdom-builder-reset';
const BASE_TASK_SLOTS = 3;
const MAX_TASK_SLOTS = 10;
const TASK_SLOT_COST = 100; // Base cost in coins

const resetGameState = () => {
  // Clear ALL storage
  localStorage.clear();
  sessionStorage.clear();
  // Set reset flag
  sessionStorage.setItem(RESET_KEY, 'true');
  window.location.reload();
};

export const useGame = () => {
  const [resources, setResources] = useState<Resource[]>(() => {
    if (sessionStorage.getItem(RESET_KEY)) {
      return INITIAL_RESOURCES.map(resource => ({
        ...resource,
        lastDepleted: Date.now()
      }));
    }

    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return parsed.resources.map((r: Resource) => ({
        ...r,
        lastDepleted: Date.now(),
      }));
    }
    return INITIAL_RESOURCES.map(resource => ({
      ...resource,
      lastDepleted: Date.now()
    }));
  });

  const [buildings, setBuildings] = useState<Building[]>(() => {
    if (sessionStorage.getItem(RESET_KEY)) {
      return INITIAL_BUILDINGS.map(building => ({
        ...building,
        lastProduced: Date.now(),
        productionProgress: 0
      }));
    }

    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return parsed.buildings.map((b: Building) => ({
        ...b,
        lastProduced: Date.now(),
        productionProgress: 0,
      }));
    }
    return INITIAL_BUILDINGS.map(building => ({
      ...building,
      lastProduced: Date.now(),
      productionProgress: 0
    }));
  });

  const [lastRaid, setLastRaid] = useState<number>(() => {
    if (sessionStorage.getItem(RESET_KEY)) {
      return Date.now();
    }

    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return parsed.lastRaid;
    }
    return Date.now();
  });

  const [unlockedTasks] = useState<string[]>(ALL_TASKS.filter(t => t.unlocked).map(t => t.id));
  const [taskSlots, setTaskSlots] = useState<number>(() => {
    if (sessionStorage.getItem(RESET_KEY)) {
      return BASE_TASK_SLOTS;
    }
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return parsed.taskSlots || BASE_TASK_SLOTS;
    }
    return BASE_TASK_SLOTS;
  });
  const [availableTasks, setAvailableTasks] = useState<Task[]>(() => {
    const unlockedTasksList = ALL_TASKS.filter(t => t.unlocked);
    const shuffled = [...unlockedTasksList].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, taskSlots);
  });
  const [lastTaskRefresh, setLastTaskRefresh] = useState<number>(Date.now());

  // Save game state
  useEffect(() => {
    const gameState = {
      resources,
      buildings,
      lastRaid,
      unlockedTasks,
      taskSlots,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [resources, buildings, lastRaid, unlockedTasks, taskSlots]);

  // Randomize tasks
  useEffect(() => {
    const refreshTasks = () => {
      const now = Date.now();
      if (now - lastTaskRefresh >= TASK_REFRESH_INTERVAL) {
        const unlockedTasksList = ALL_TASKS.filter(t => unlockedTasks.includes(t.id));
        const shuffled = [...unlockedTasksList].sort(() => Math.random() - 0.5);
        setAvailableTasks(shuffled.slice(0, taskSlots));
        setLastTaskRefresh(now);
      }
    };

    const interval = setInterval(refreshTasks, 1000); // Check every second
    return () => clearInterval(interval);
  }, [unlockedTasks, lastTaskRefresh, taskSlots]);

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

  const upgradeBuilding = (buildingName: string) => {
    setBuildings((prevBuildings) => {
      return prevBuildings.map((building) => {
        if (building.name === buildingName) {
          // If the building isn't built yet, this is initial construction
          if (!building.isBuilt) {
            return {
              ...building,
              isBuilt: true,
              level: 1,
              lastProduced: Date.now()
            };
          }
          // If it's already built, this is an upgrade
          return {
            ...building,
            level: building.level + 1,
            lastProduced: Date.now()
          };
        }
        return building;
      });
    });

    // Deduct resources for the building cost
    setResources((prevResources) => {
      const building = buildings.find((b) => b.name === buildingName);
      if (!building) return prevResources;

      const cost = building.cost;
      return prevResources.map((resource) => {
        const costAmount = cost[resource.name as keyof typeof cost];
        if (costAmount) {
          return {
            ...resource,
            amount: resource.amount - costAmount * Math.pow(building.multiplier, building.level - 1)
          };
        }
        return resource;
      });
    });
  };

  // Building production
  useEffect(() => {
    const interval = setInterval(() => {
      setBuildings((prevBuildings) =>
        prevBuildings.map((building) => {
          if (building.unlocked && building.isBuilt) {
            const now = Date.now();
            const timeSinceLastProduction = now - building.lastProduced;
            
            if (timeSinceLastProduction >= building.produces.interval) {
              // Produce resources here
              building.produces.resources.forEach(({ name, amount }) => {
                updateResource(name, amount * building.level);
              });
              
              return {
                ...building,
                lastProduced: now
              };
            }
          }
          return building;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [updateResource]);

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
              const loss = resource.amount * 1 * lossMultiplier;
              updateResource(resource.name, -loss);
            }
          });

          setLastRaid(now);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [buildings, lastRaid, resources, getResource, updateResource]);

  // Clear reset flag after initialization
  useEffect(() => {
    if (sessionStorage.getItem(RESET_KEY)) {
      sessionStorage.removeItem(RESET_KEY);
    }
  }, []);

  const getNextSlotCost = useCallback(() => {
    if (taskSlots >= MAX_TASK_SLOTS) return Infinity;
    return Math.floor(TASK_SLOT_COST * Math.pow(1.5, taskSlots - BASE_TASK_SLOTS));
  }, [taskSlots]);

  const canAffordNextSlot = useCallback(() => {
    const coins = getResource('coins');
    return coins && coins.amount >= getNextSlotCost();
  }, [getResource, getNextSlotCost]);

  const purchaseTaskSlot = useCallback(() => {
    if (taskSlots >= MAX_TASK_SLOTS || !canAffordNextSlot()) return;
    
    const cost = getNextSlotCost();
    updateResource('coins', -cost);
    setTaskSlots(prev => prev + 1);
  }, [taskSlots, canAffordNextSlot, getNextSlotCost, updateResource]);

  const updateResources = (newResources: Resource[]) => {
    setResources(newResources);
  };

  return {
    resources,
    buildings,
    availableTasks,
    handleTask,
    upgradeBuilding,
    canAffordUpgrade,
    lastRaid,
    resetGame: resetGameState,
    taskSlots,
    maxTaskSlots: MAX_TASK_SLOTS,
    getNextSlotCost,
    canAffordNextSlot,
    purchaseTaskSlot,
    updateResources,
  };
};