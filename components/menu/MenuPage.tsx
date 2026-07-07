"use client";

import { useMemo, useState } from "react";
import { CategorySection } from "@/components/menu/CategorySection";
import { CategoryTabs, STICKY_OFFSET } from "@/components/menu/CategoryTabs";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { MenuHero } from "@/components/menu/MenuHero";
import { SearchBar } from "@/components/menu/SearchBar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { MenuData } from "@/lib/types";

interface MenuPageProps {
  menu: MenuData;
}

function matchesSearch(
  query: string,
  fields: {
    name_en: string;
    name_ar: string;
    description_en: string | null;
    description_ar?: string | null;
  },
) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return (
    fields.name_en.toLowerCase().includes(normalized) ||
    fields.name_ar.includes(query.trim()) ||
    (fields.description_en?.toLowerCase().includes(normalized) ?? false) ||
    (fields.description_ar?.includes(query.trim()) ?? false)
  );
}

export function MenuPage({ menu }: MenuPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return menu.categories;

    return menu.categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => matchesSearch(searchQuery, item)),
      }))
      .filter((category) => category.items.length > 0);
  }, [menu.categories, searchQuery]);

  const categoryIds = filteredCategories.map((category) => category.id);

  const { activeCategoryId, registerSection, scrollToCategory } = useScrollSpy({
    sectionIds: categoryIds,
    defaultActiveId: categoryIds[0],
    rootMargin: `-${STICKY_OFFSET}px 0px -55% 0px`,
  });

  const resolvedActiveId = categoryIds.includes(activeCategoryId)
    ? activeCategoryId
    : categoryIds[0] ?? "";

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="sticky top-0 z-50 border-b border-border bg-bg-elevated/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3.5 md:px-6">
          <div className="flex min-w-0 shrink-0 items-center gap-2.5">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-from to-accent-to text-xs font-bold text-on-accent"
              aria-hidden
            >
              F
            </span>
            <p className="font-display truncate text-lg font-semibold tracking-tight md:text-xl">
              {menu.restaurant.name}
            </p>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            className="max-w-md flex-1"
          />
        </div>
      </header>

      <MenuHero restaurant={menu.restaurant} />

      {filteredCategories.length > 0 ? (
        <>
          <CategoryTabs
            categories={filteredCategories}
            activeCategoryId={resolvedActiveId}
            onSelect={(categoryId) => scrollToCategory(categoryId, STICKY_OFFSET)}
          />

          <main className="mx-auto max-w-6xl space-y-16 px-4 py-10 md:px-6 md:py-14">
            {filteredCategories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                registerSection={registerSection}
              >
                <MenuGrid
                  items={category.items}
                  categoryId={category.id}
                  categoryTitleAr={category.name_ar}
                />
              </CategorySection>
            ))}
          </main>
        </>
      ) : (
        <div className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6">
          <p className="text-lg text-text-muted">
            No items match &ldquo;{searchQuery}&rdquo;. Try another search.
          </p>
        </div>
      )}

      <ThemeToggle />
      <ScrollToTop />
    </div>
  );
}
