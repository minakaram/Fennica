/**
 * Fennica Cafe — Digital Menu
 *
 * HOW TO SWAP IN REAL IMAGES
 * --------------------------
 * Set "image": "https://your-cdn.com/photo.jpg" in data/menu.json — no code changes.
 *
 * HOW TO ADD NEW CATEGORIES
 * -------------------------
 * 1. Add a category to "categories[]" in data/menu.json (unique "id" required).
 * 2. Add a matching entry in lib/category-visuals.ts (icon + gradient).
 *
 * THEME
 * -----
 * Default: Cream (warm light). Dev toggle bottom-left.
 */

import { MenuPage } from "@/components/menu/MenuPage";
import { getMenuData } from "@/lib/menu-data";

export default function Home() {
  const menu = getMenuData();

  return <MenuPage menu={menu} />;
}
