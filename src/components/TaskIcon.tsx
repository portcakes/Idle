import {
  Axe,
  Pickaxe,
  Hammer,
  Diamond,
  Wheat,
  Target,
  Flame,
  Coins,
  Shield,
  Gem,
  Scissors,
  ShoppingBag,
  Beer,
  Bed,
  Utensils,
} from "lucide-react";

const iconMap = {
  Axe,
  Pickaxe,
  Hammer,
  Diamond,
  Wheat,
  Target,
  Flame,
  Coins,
  Shield,
  Gem,
  Scissors,
  ShoppingBag,
  Beer,
  Bed,
  Utensils,
};

type IconName = keyof typeof iconMap;

export const TaskIcon = ({ name }: { name: IconName }) => {
  const Icon = iconMap[name];
  return Icon ? <Icon /> : null;
};
