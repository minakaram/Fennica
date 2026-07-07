"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface CategoryTabProps {
  id: string;
  label: string;
  labelAr: string;
  isActive: boolean;
  onSelect: (id: string) => void;
  registerTab: (id: string, element: HTMLButtonElement | null) => void;
  tabIndex: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>, id: string) => void;
}

export function CategoryTab({
  id,
  label,
  labelAr,
  isActive,
  onSelect,
  registerTab,
  tabIndex,
  onKeyDown,
}: CategoryTabProps) {
  return (
    <button
      ref={(element) => registerTab(id, element)}
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={isActive}
      aria-controls={id}
      tabIndex={tabIndex}
      onClick={() => onSelect(id)}
      onKeyDown={(event) => onKeyDown(event, id)}
      className={cn(
        "relative shrink-0 snap-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from/40",
        !isActive && "tab-inactive-hover",
        !label && "font-arabic",
        isActive ? "text-tab-active-text" : "text-text-muted hover:text-text",
      )}
      dir={!label ? "rtl" : undefined}
      lang={!label ? "ar" : undefined}
    >
      {isActive && (
        <motion.span
          layoutId="activeTab"
          className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-from to-accent-to"
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        />
      )}
      <span className="relative flex flex-col items-center gap-0.5">
        <span className={cn(isActive && "font-semibold")}>
          {label || labelAr}
        </span>
        {label && labelAr && label !== labelAr && (
          <span
            className={cn(
              "font-arabic text-[11px] leading-none",
              isActive ? "text-tab-active-text/85" : "opacity-80",
            )}
            dir="rtl"
            lang="ar"
          >
            {labelAr}
          </span>
        )}
      </span>
    </button>
  );
}
