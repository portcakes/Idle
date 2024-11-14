export interface Resource {
  name: string;
  amount: number;
  perClick: number;
  perSecond: number;
  depletionRate: number;
  lastDepleted: number;
  category?: 'raw' | 'refined' | 'luxury' | 'population';
}

export interface Building {
  name: string;
  level: number;
  cost: { [key: string]: number };
  multiplier: number;
  description: string;
  produces?: {
    resources: Array<{
      name: string;
      amount: number;
      consumes?: { resource: string; amount: number };
    }>;
    interval: number;
  };
  lastProduced: number;
  productionProgress: number;
  unlocked: boolean;
}

export interface Task {
  id: string;
  name: string;
  produces: Array<{
    resource: string;
    amount: number;
    chance?: number;
  }>;
  consumes?: Array<{
    resource: string;
    amount: number;
  }>;
  baseOutput: number;
  difficulty: number;
  icon: string;
  unlocked: boolean;
}