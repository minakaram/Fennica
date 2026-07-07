"use client";

import { List } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Category } from "@/lib/types";

interface CategoryJumpProps {
  categories: Category[];
  activeCategoryId: string;
  onSelect: (categoryId: string) => void;
}

export function CategoryJump({
  categories,
  activeCategoryId,
  onSelect,
}: CategoryJumpProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (categoryId: string) => {
    onSelect(categoryId);
    setOpen(false);
  };

  return (
    <div ref={panelRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Jump to category"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from/40"
      >
        <List className="h-4 w-4" aria-hidden />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="All categories"
          className="absolute top-full right-0 z-50 mt-2 max-h-72 w-64 overflow-y-auto rounded-2xl border border-border bg-bg-elevated p-2 shadow-card"
        >
          {categories.map((category) => {
            const isActive = category.id === activeCategoryId;
            return (
              <button
                key={category.id}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(category.id)}
                className={cn(
                  "font-arabic w-full rounded-xl px-3 py-2.5 text-right text-sm transition-colors",
                  isActive
                    ? "bg-gradient-to-r from-accent-from to-accent-to text-on-accent"
                    : "text-text hover:bg-surface",
                )}
                dir="rtl"
                lang="ar"
              >
                <span className="block font-medium">{category.name_ar}</span>
                {category.name_en && (
                  <span
                    className={cn(
                      "mt-0.5 block text-left text-xs",
                      isActive ? "text-on-accent/80" : "text-text-muted",
                    )}
                  >
                    {category.name_en}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
