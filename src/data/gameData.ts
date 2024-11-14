import { Resource, Building, Task } from '../types/game';

export const INITIAL_RESOURCES: Resource[] = [
  // Population
  { name: 'citizens', amount: 10, perClick: 0, perSecond: 0, depletionRate: 5, lastDepleted: Date.now(), category: 'population' },
  { name: 'guards', amount: 5, perClick: 0, perSecond: 0, depletionRate: 10, lastDepleted: Date.now(), category: 'population' },
  
  // Raw Resources
  { name: 'wood', amount: 50, perClick: 1, perSecond: 0, depletionRate: 8, lastDepleted: Date.now(), category: 'raw' },
  { name: 'stone', amount: 30, perClick: 1, perSecond: 0, depletionRate: 8, lastDepleted: Date.now(), category: 'raw' },
  { name: 'raw ores', amount: 20, perClick: 1, perSecond: 0, depletionRate: 10, lastDepleted: Date.now(), category: 'raw' },
  { name: 'raw gems', amount: 10, perClick: 0.5, perSecond: 0, depletionRate: 12, lastDepleted: Date.now(), category: 'raw' },
  { name: 'hops', amount: 15, perClick: 1, perSecond: 0, depletionRate: 15, lastDepleted: Date.now(), category: 'raw' },
  { name: 'wool', amount: 15, perClick: 1, perSecond: 0, depletionRate: 10, lastDepleted: Date.now(), category: 'raw' },
  { name: 'meat', amount: 15, perClick: 1, perSecond: 0, depletionRate: 12, lastDepleted: Date.now(), category: 'raw' },
  { name: 'furs', amount: 10, perClick: 1, perSecond: 0, depletionRate: 10, lastDepleted: Date.now(), category: 'raw' },
  
  // Refined Resources
  { name: 'metal', amount: 15, perClick: 0, perSecond: 0, depletionRate: 5, lastDepleted: Date.now(), category: 'refined' },
  { name: 'precious metal', amount: 5, perClick: 0, perSecond: 0, depletionRate: 3, lastDepleted: Date.now(), category: 'refined' },
  { name: 'cloth', amount: 10, perClick: 0, perSecond: 0, depletionRate: 8, lastDepleted: Date.now(), category: 'refined' },
  { name: 'food', amount: 25, perClick: 0, perSecond: 0, depletionRate: 15, lastDepleted: Date.now(), category: 'refined' },
  { name: 'ale', amount: 10, perClick: 0, perSecond: 0, depletionRate: 20, lastDepleted: Date.now(), category: 'refined' },
  
  // Luxury Resources
  { name: 'coins', amount: 100, perClick: 0, perSecond: 0, depletionRate: 5, lastDepleted: Date.now(), category: 'luxury' },
  { name: 'precious gems', amount: 0, perClick: 0, perSecond: 0, depletionRate: 2, lastDepleted: Date.now(), category: 'luxury' },
  { name: 'fine jewelry', amount: 0, perClick: 0, perSecond: 0, depletionRate: 3, lastDepleted: Date.now(), category: 'luxury' },
  { name: 'fine garb', amount: 0, perClick: 0, perSecond: 0, depletionRate: 5, lastDepleted: Date.now(), category: 'luxury' },
  { name: 'exotic spices', amount: 0, perClick: 0, perSecond: 0, depletionRate: 8, lastDepleted: Date.now(), category: 'luxury' },
  { name: 'exotic furs', amount: 0, perClick: 0, perSecond: 0, depletionRate: 5, lastDepleted: Date.now(), category: 'luxury' }
];

export const INITIAL_BUILDINGS: Building[] = [
  {
    name: 'Houses',
    level: 1,
    cost: { wood: 20, stone: 10 },
    multiplier: 1.1,
    description: 'Provides shelter for citizens',
    produces: {
      resources: [{ name: 'citizens', amount: 1 }],
      interval: 10000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true
  },
  {
    name: 'Lumber Yard',
    level: 1,
    cost: { wood: 15, stone: 10 },
    multiplier: 1.2,
    description: 'Produces wood',
    produces: {
      resources: [{ name: 'wood', amount: 2 }],
      interval: 5000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true
  },
  {
    name: "Hunter's Guild",
    level: 1,
    cost: { wood: 25, stone: 15 },
    multiplier: 1.15,
    description: 'Hunts for meat and furs',
    produces: {
      resources: [
        { name: 'meat', amount: 2 },
        { name: 'furs', amount: 1 }
      ],
      interval: 8000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true
  },
  {
    name: 'Mineshaft',
    level: 1,
    cost: { wood: 30, stone: 20 },
    multiplier: 1.25,
    description: 'Extracts valuable resources',
    produces: {
      resources: [
        { name: 'stone', amount: 2 },
        { name: 'raw gems', amount: 0.5 },
        { name: 'raw ores', amount: 1 }
      ],
      interval: 10000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true
  },
  {
    name: 'Farm',
    level: 1,
    cost: { wood: 20, stone: 15 },
    multiplier: 1.15,
    description: 'Grows crops and raises livestock',
    produces: {
      resources: [
        { name: 'food', amount: 2 },
        { name: 'hops', amount: 1 },
        { name: 'wool', amount: 1 }
      ],
      interval: 7000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true
  },
  {
    name: 'Forge',
    level: 1,
    cost: { wood: 25, stone: 20, raw_ores: 10 },
    multiplier: 1.2,
    description: 'Smelts ore into metal',
    produces: {
      resources: [
        { name: 'metal', amount: 1, consumes: { resource: 'raw ores', amount: 2 } },
        { name: 'precious metal', amount: 0.2, consumes: { resource: 'raw ores', amount: 3 } },
        { name: 'coins', amount: 1, consumes: { resource: 'metal', amount: 1 } }
      ],
      interval: 12000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true
  },
  {
    name: 'Barracks',
    level: 1,
    cost: { wood: 30, stone: 25, metal: 10 },
    multiplier: 1.3,
    description: 'Trains guards to protect the kingdom',
    produces: {
      resources: [{ name: 'guards', amount: 1, consumes: { resource: 'citizens', amount: 1 } }],
      interval: 15000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true
  },
  {
    name: 'Jeweler',
    level: 1,
    cost: { wood: 30, stone: 25, precious_metal: 5 },
    multiplier: 1.2,
    description: 'Crafts fine jewelry and processes gems',
    produces: {
      resources: [
        { name: 'precious gems', amount: 1, consumes: { resource: 'raw gems', amount: 2 } },
        { name: 'fine jewelry', amount: 0.5, consumes: { resource: 'precious metal', amount: 1 } }
      ],
      interval: 12000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true
  },
  {
    name: 'Seamstress',
    level: 1,
    cost: { wood: 20, stone: 15, cloth: 10 },
    multiplier: 1.15,
    description: 'Creates fine garments from cloth',
    produces: {
      resources: [
        { name: 'cloth', amount: 1, consumes: { resource: 'wool', amount: 1 } },
        { name: 'fine garb', amount: 0.5, consumes: { resource: 'cloth', amount: 2 } }
      ],
      interval: 10000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true
  }
];

export const ALL_TASKS: Task[] = [
  {
    id: '1',
    name: 'Chop Wood',
    produces: [{ resource: 'wood', amount: 2 }],
    baseOutput: 2,
    difficulty: 1,
    icon: 'Axe',
    unlocked: true
  },
  {
    id: '2',
    name: 'Mine Stone',
    produces: [{ resource: 'stone', amount: 1.5 }],
    baseOutput: 1.5,
    difficulty: 2,
    icon: 'Pickaxe',
    unlocked: true
  },
  {
    id: '3',
    name: 'Mine Ores',
    produces: [{ resource: 'raw ores', amount: 1 }],
    baseOutput: 1,
    difficulty: 3,
    icon: 'Hammer',
    unlocked: true
  },
  {
    id: '4',
    name: 'Mine Gems',
    produces: [{ resource: 'raw gems', amount: 0.5 }],
    baseOutput: 0.5,
    difficulty: 4,
    icon: 'Diamond',
    unlocked: true
  },
  {
    id: '5',
    name: 'Harvest Crops',
    produces: [
      { resource: 'food', amount: 1.5 },
      { resource: 'hops', amount: 1 }
    ],
    baseOutput: 1.5,
    difficulty: 1,
    icon: 'Wheat',
    unlocked: true
  },
  {
    id: '6',
    name: 'Hunt',
    produces: [
      { resource: 'meat', amount: 1.5 },
      { resource: 'furs', amount: 1 }
    ],
    baseOutput: 1.5,
    difficulty: 2,
    icon: 'Target',
    unlocked: true
  },
  {
    id: '7',
    name: 'Smelt Metal',
    produces: [
      { resource: 'metal', amount: 1 },
      { resource: 'precious_metal', amount: 0.2, chance: 0.1 }
    ],
    consumes: [{ resource: 'raw ores', amount: 2 }],
    baseOutput: 1,
    difficulty: 3,
    icon: 'Flame',
    unlocked: true
  },
  {
    id: '8',
    name: 'Make Coins',
    produces: [{ resource: 'coins', amount: 2 }],
    consumes: [{ resource: 'metal', amount: 1 }],
    baseOutput: 2,
    difficulty: 2,
    icon: 'Coins',
    unlocked: true
  },
  {
    id: '9',
    name: 'Train Guards',
    produces: [{ resource: 'guards', amount: 1 }],
    consumes: [{ resource: 'citizens', amount: 1 }],
    baseOutput: 1,
    difficulty: 3,
    icon: 'Shield',
    unlocked: true
  },
  {
    id: '10',
    name: 'Polish Gems',
    produces: [{ resource: 'precious gems', amount: 1 }],
    consumes: [{ resource: 'raw gems', amount: 2 }],
    baseOutput: 1,
    difficulty: 4,
    icon: 'Gem',
    unlocked: true
  },
  {
    id: '11',
    name: 'Weave Cloth',
    produces: [{ resource: 'cloth', amount: 1 }],
    consumes: [{ resource: 'wool', amount: 1 }],
    baseOutput: 1,
    difficulty: 2,
    icon: 'Scissors',
    unlocked: true
  },
  {
    id: '12',
    name: 'Trade Goods',
    produces: [
      { resource: 'exotic_spices', amount: 1 },
      { resource: 'exotic_furs', amount: 0.5 }
    ],
    consumes: [{ resource: 'coins', amount: 5 }],
    baseOutput: 1,
    difficulty: 3,
    icon: 'ShoppingBag',
    unlocked: true
  },
  {
    id: '13',
    name: 'Shear Sheep',
    produces: [{ resource: 'wool', amount: 1 }],
    baseOutput: 1,
    difficulty: 3,
    icon: 'Scissors',
    unlocked: true
  },
  {
    id: '14',
    name: 'Tax Citizens',
    produces: [{ resource: 'coins', amount: 1 }],
    baseOutput: 1,
    difficulty: 1,
    icon: 'Coins',
    unlocked: true
  }
];
