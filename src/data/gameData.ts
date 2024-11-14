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
  { name: 'coal', amount: 10, perClick: 0, perSecond: 0, depletionRate: 10, lastDepleted: Date.now(), category: 'raw' },
  // Refined Resources
  { name: 'metal', amount: 15, perClick: 0, perSecond: 0, depletionRate: 5, lastDepleted: Date.now(), category: 'refined' },
  { name: 'precious metal', amount: 5, perClick: 0, perSecond: 0, depletionRate: 3, lastDepleted: Date.now(), category: 'refined' },
  { name: 'cloth', amount: 10, perClick: 0, perSecond: 0, depletionRate: 8, lastDepleted: Date.now(), category: 'refined' },
  { name: 'food', amount: 25, perClick: 0, perSecond: 0, depletionRate: 15, lastDepleted: Date.now(), category: 'refined' },
  { name: 'ale', amount: 10, perClick: 0, perSecond: 0, depletionRate: 20, lastDepleted: Date.now(), category: 'refined' },
  { name: 'glass', amount: 10, perClick: 0, perSecond: 0, depletionRate: 10, lastDepleted: Date.now(), category: 'refined' },
  
  // Luxury Resources
  { name: 'coins', amount: 100, perClick: 0, perSecond: 0, depletionRate: 5, lastDepleted: Date.now(), category: 'luxury' },
  { name: 'precious gems', amount: 0, perClick: 0, perSecond: 0, depletionRate: 2, lastDepleted: Date.now(), category: 'luxury' },
  { name: 'fine jewelry', amount: 0, perClick: 0, perSecond: 0, depletionRate: 3, lastDepleted: Date.now(), category: 'luxury' },
  { name: 'fine garb', amount: 0, perClick: 0, perSecond: 0, depletionRate: 5, lastDepleted: Date.now(), category: 'luxury' },
  { name: 'exotic spices', amount: 0, perClick: 0, perSecond: 0, depletionRate: 8, lastDepleted: Date.now(), category: 'luxury' },
  { name: 'exotic furs', amount: 0, perClick: 0, perSecond: 0, depletionRate: 5, lastDepleted: Date.now(), category: 'luxury' },
  { name: 'stardust', amount: 0, perClick: 0, perSecond: 0, depletionRate: 0, lastDepleted: Date.now(), category: 'luxury' }
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
    unlocked: true,
    toUnlockCost: {},
    isBuilt: true
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
    unlocked: true,
    toUnlockCost: {},
    isBuilt: false
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
    unlocked: true,
    toUnlockCost: {},
    isBuilt: false
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
        { name: 'raw ores', amount: 1 },
        { name: 'coal', amount: 1 }
      ],
      interval: 10000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true,
    toUnlockCost: {},
    isBuilt: false
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
    unlocked: true,
    toUnlockCost: {},
    isBuilt: false
  },
  {
    name: 'Forge',
    level: 1,
    cost: { wood: 25, stone: 20, 'raw ores': 10 },
    multiplier: 1.2,
    description: 'Smelts ore into metal',
    produces: {
      resources: [
        { name: 'metal', amount: 1, consumes: { resource: 'raw ores', amount: 2 } },
        { name: 'precious metal', amount: 1, consumes: { resource: 'raw ores', amount: 3 } },
        { name: 'coins', amount: 1, consumes: { resource: 'metal', amount: 1 } }
      ],
      interval: 12000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true,
    toUnlockCost: {},
    isBuilt: false
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
    unlocked: true,
    toUnlockCost: {},
    isBuilt: false
  },
  {
    name: 'Jeweler',
    level: 1,
    cost: { wood: 30, stone: 25, 'precious metal': 5 },
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
    unlocked: true,
    toUnlockCost: {},
    isBuilt: false
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
    unlocked: true,
    toUnlockCost: {},
    isBuilt: false
  },
  {
    name: 'Marketplace',
    level: 1,
    cost: { wood: 30, stone: 25, cloth: 10, coins: 10 },
    multiplier: 1.2,
    description: 'Trades goods with other kingdoms',
    produces: {
      resources: [{ name: 'exotic spices', amount: 1 }, { name: 'exotic furs', amount: 1 }, { name: 'meat', amount: 1 }, { name: 'coins', amount: 1 }],
      interval: 15000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true,
    toUnlockCost: {},
    isBuilt: false
  },
  {
    name: 'Tavern',
    level: 1,
    cost: { wood: 20, stone: 15, food: 10 },
    multiplier: 1.15,
    description: 'Serves ale and food to the citizens',
    produces: {
      resources: [{ name: 'ale', amount: 1 }, { name: 'food', amount: 1 }],
      interval: 10000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true,
    toUnlockCost: {},
    isBuilt: false
  },
  {
    name: 'Docks',
    level: 1,
    cost: { wood: 30, stone: 25, cloth: 10, coins: 10 },
    multiplier: 1.2,
    description: 'Trades goods with other kingdoms',
    produces: {
      resources: [{ name: 'coins', amount: 1 }, { name: 'exotic furs', amount: 1 }, { name: 'exotic spices', amount: 1 }, { name: 'meat', amount: 1 }],
      interval: 15000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: true,
    toUnlockCost: {},
    isBuilt: false
  },
  {
    name: 'Castle',
    level: 1,
    cost: { wood: 30, stone: 25, metal: 10, coins: 10 },
    multiplier: 1.2,
    description: 'Protects the kingdom from invaders',
    produces: {
      resources: [{ name: 'coins', amount: 10 }],
      interval: 15000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: false,
    toUnlockCost: { coins: 100, metal: 100, stone: 100, wood: 50 },
    isBuilt: false
  },
  {
    name: 'Airship',
    level: 1,
    cost: { wood: 100, stone: 100, metal: 100, coins: 100 },
    multiplier: 1.2,
    description: 'Fly to other kingdoms and beyond',
    produces: {
      resources: [{ name: 'coins', amount: 100, }, {name: 'stardust', amount: 1}],
      interval: 15000
    },
    consumes: [{ name: 'coal', amount: 1 }],
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: false,
    toUnlockCost: { coins: 1000, metal: 100, stone: 100, wood: 50 },
    isBuilt: false
  },
  {
    name: 'Cathedral',
    level: 1,
    cost: { wood: 100, stone: 100, metal: 100, coins: 100 },
    multiplier: 1.2,
    description: 'A place of worship for the citizens',
    produces: {
      resources: [{ name: 'coins', amount: 100 }],
      interval: 15000
    },
    lastProduced: Date.now(),
    productionProgress: 0,
    unlocked: false,
    toUnlockCost: { coins: 1000, metal: 100, stone: 100, wood: 50, glass: 10 },
    isBuilt: false
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
      { resource: 'exotic spices', amount: 1 },
      { resource: 'exotic furs', amount: 1 }
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
    produces: [{ 
      resource: 'coins', 
      amount: getResourceAmount('citizens')
    }],
    baseOutput: 1,
    difficulty: 1,
    icon: 'Coins',
    unlocked: true
  },
  {
    id: '15',
    name: 'Brew Ale',
    produces: [{ resource: 'ale', amount: 1 }],
    consumes: [{ resource: 'hops', amount: 1 }],
    baseOutput: 1,
    difficulty: 2,
    icon: 'Beer',
    unlocked: true
  },
  {
    id: '16',
    name: 'Bake Bread',
    produces: [{ resource: 'food', amount: 1 }],
    baseOutput: 1,
    difficulty: 2,
    icon: 'Croissant',
    unlocked: true
  },
  {
    id: '17',
    name: 'Cook Meat',
    produces: [{ resource: 'food', amount: 1 }, { resource: 'coins', amount: 1 }],
    consumes: [{ resource: 'meat', amount: 1 }],
    baseOutput: 1,
    difficulty: 2,
    icon: 'Beef',
    unlocked: true
  },
  {
    id: '18',
    name: 'Feed Citizens',
    produces: [{ resource: 'citizens', amount: 1 }, { resource: 'coins', amount: 2 }],
    consumes: [{ resource: 'food', amount: 1 }],
    baseOutput: 1,
    difficulty: 1,
    icon: 'Croissant',
    unlocked: true
  },
  {
    id: '19',
    name: 'Hire Guards',
    produces: [{ resource: 'guards', amount: 1 }],
    consumes: [{ resource: 'coins', amount: 5 }],
    baseOutput: 1,
    difficulty: 2,
    icon: 'Shield',
    unlocked: true
  },
  {
    id: '20',
    name: '"Hire" Citizens',
    produces: [{ resource: 'citizens', amount: 1 }],
    consumes: [{ resource: 'coins', amount: 5 }],
    baseOutput: 1,
    difficulty: 2,
    icon: 'Coins',
    unlocked: true
  },
  {
    id: '21',
    name: 'Make Glass',
    produces: [{ resource: 'glass', amount: 1 }],
    baseOutput: 1,
    difficulty: 2,
    icon: 'Square-Dashed',
    unlocked: true
  },
  {
    id: '22',
    name: 'Mine Coal',
    produces: [{ resource: 'coal', amount: 1 }],
    baseOutput: 1,
    difficulty: 2,
    icon: 'Mountain',
    unlocked: true
  }
];

function getResourceAmount(resourceName: string): number {
  const resource = INITIAL_RESOURCES.find(r => r.name === resourceName);
  return resource ? resource.amount : 0;
}

