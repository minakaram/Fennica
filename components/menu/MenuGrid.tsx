import { MenuItemCard } from "@/components/menu/MenuItemCard";
import type { MenuItem } from "@/lib/types";

interface MenuGridProps {
  items: MenuItem[];
  categoryId: string;
  categoryTitleAr?: string;
}

export function MenuGrid({ items, categoryId, categoryTitleAr }: MenuGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
      {items.map((item, index) => (
        <MenuItemCard
          key={item.id}
          item={item}
          categoryId={categoryId}
          categoryTitleAr={categoryTitleAr}
          index={index}
        />
      ))}
    </div>
  );
}
