import { useEffect, useState } from 'react';

interface Production {
  resource: string;
  amount: number;
  interval: number;
}

interface Building {
  isBuilt: boolean;
  produces: Production[];
  constructionTime?: number;
}

export function useResourceGeneration(
  buildings: Building[],
  setResources: React.Dispatch<React.SetStateAction<Record<string, { amount: number }>>>
) {
  useEffect(() => {
    const intervals: number[] = [];

    buildings.forEach(building => {
      if (!building.isBuilt) return; // Skip unbuilt buildings

      building.produces.forEach(production => {
        const interval = setInterval(() => {
          setResources(prev => ({
            ...prev,
            [production.resource]: {
              ...prev[production.resource],
              amount: prev[production.resource].amount + production.amount
            }
          }));
        }, production.interval);

        intervals.push(interval);
      });
    });

    return () => intervals.forEach(clearInterval);
  }, [buildings, setResources]);

  const [progress, setProgress] = useState<Record<number, number>>({});

  useEffect(() => {
    const intervals: number[] = [];

    buildings.forEach((building, index) => {
      if (building.constructionTime && !building.isBuilt) {
        const startTime = Date.now();
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const newProgress = (elapsed / building.constructionTime!) * 100;
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setProgress(prev => ({ ...prev, [index]: 100 }));
          } else {
            setProgress(prev => ({ ...prev, [index]: newProgress }));
          }
        }, 100);

        intervals.push(interval);
      }
    });

    return () => intervals.forEach(clearInterval);
  }, [buildings]);

  return { progress };
} 