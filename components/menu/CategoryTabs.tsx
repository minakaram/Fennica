"use client";

import { useRef } from "react";
import { CategoryJump } from "@/components/menu/CategoryJump";
import { CategoryTab } from "@/components/menu/CategoryTab";
import { useHorizontalTabScroll } from "@/hooks/useHorizontalTabScroll";
import type { Category } from "@/lib/types";

export const STICKY_OFFSET = 112;

interface CategoryTabsProps {
  categories: Category[];
  activeCategoryId: string;
  onSelect: (categoryId: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategoryId,
  onSelect,
}: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { registerTab } = useHorizontalTabScroll(activeCategoryId, containerRef);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentId: string,
  ) => {
    const ids = categories.map((category) => category.id);
    const currentIndex = ids.indexOf(currentId);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % ids.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + ids.length) % ids.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = ids.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    onSelect(ids[nextIndex]);
  };

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-bg-elevated/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:gap-6 md:px-6">
        <div className="relative min-w-0 flex-1 pr-1">
          <div
            ref={containerRef}
            role="tablist"
            aria-label="Menu categories"
            className="tab-track scrollbar-none flex snap-x snap-mandatory gap-2 overflow-x-auto py-1"
          >
            {categories.map((category) => {
              const isActive = category.id === activeCategoryId;
              return (
                <CategoryTab
                  key={category.id}
                  id={category.id}
                  label={category.name_en}
                  labelAr={category.name_ar}
                  isActive={isActive}
                  onSelect={onSelect}
                  registerTab={registerTab}
                  tabIndex={isActive ? 0 : -1}
                  onKeyDown={handleKeyDown}
                />
              );
            })}
          </div>
        </div>

        <div className="ml-2 shrink-0 border-l border-border pl-4 md:ml-4 md:pl-5">
          <CategoryJump
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelect={onSelect}
          />
        </div>
      </div>
    </div>
  );
}
