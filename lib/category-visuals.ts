import {
  Coffee,
  CupSoda,
  Flame,
  GlassWater,
  IceCream,
  IceCreamCone,
  Pizza,
  Salad,
  Sandwich,
  Utensils,
  Wine,
  type LucideIcon,
} from "lucide-react";

export interface CategoryVisual {
  icon: LucideIcon;
  gradient: [string, string];
}

export const categoryVisuals: Record<string, CategoryVisual> = {
  "meals-salads": { icon: Salad, gradient: ["#3D2C29", "#5C4033"] },
  "grills-mashawi": { icon: Flame, gradient: ["#3D2420", "#5C3028"] },
  "oriental-food": { icon: Utensils, gradient: ["#332820", "#524030"] },
  "pizza-pasta": { icon: Pizza, gradient: ["#2A2030", "#453550"] },
  sandwiches: { icon: Sandwich, gradient: ["#2C2420", "#4A3F38"] },
  "italian-coffee": { icon: Coffee, gradient: ["#2A1F1A", "#4A3728"] },
  "iced-coffee": { icon: Coffee, gradient: ["#1A2838", "#2D4A5E"] },
  "soda-soft-drinks": { icon: CupSoda, gradient: ["#1A2838", "#2D4A5E"] },
  "fresh-juice-smoothie": { icon: GlassWater, gradient: ["#1F2A24", "#354840"] },
  milkshake: { icon: IceCream, gradient: ["#3D2A3A", "#5C3D52"] },
  "ice-cream-fruit-salad": { icon: IceCreamCone, gradient: ["#3D2A3A", "#5C3D52"] },
  "cocktails-mocktails": { icon: Wine, gradient: ["#2A2030", "#453550"] },
  "hot-beverages": { icon: GlassWater, gradient: ["#2A1F1A", "#4A3728"] },
  desserts: { icon: IceCreamCone, gradient: ["#3D2A3A", "#5C3D52"] },
  "waffles-crepes": { icon: IceCreamCone, gradient: ["#332820", "#524030"] },
};

export const fallbackGradients: [string, string][] = [
  ["#3D2C29", "#5C4033"],
  ["#2A1F1A", "#4A3728"],
  ["#3D2A3A", "#5C3D52"],
  ["#1A2838", "#2D4A5E"],
  ["#332820", "#524030"],
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getCategoryVisual(categoryId: string): CategoryVisual {
  const configured = categoryVisuals[categoryId];
  if (configured) return configured;

  const index = hashString(categoryId) % fallbackGradients.length;
  return {
    icon: Utensils,
    gradient: fallbackGradients[index],
  };
}
