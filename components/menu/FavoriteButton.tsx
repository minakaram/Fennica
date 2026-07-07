"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface FavoriteButtonProps {
  initialCount: number;
  itemName: string;
  variant?: "default" | "overlay";
  className?: string;
}

export function FavoriteButton({
  initialCount,
  itemName,
  variant = "default",
  className,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(initialCount);

  const toggle = () => {
    setIsFavorite((prev) => {
      const next = !prev;
      setCount((current) => current + (next ? 1 : -1));
      return next;
    });
  };

  if (variant === "overlay") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isFavorite}
        aria-label={`${isFavorite ? "Remove" : "Add"} ${itemName} from favorites`}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from/50",
          className,
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 text-text-muted transition-colors",
            isFavorite && "fill-accent-from text-accent-from",
          )}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isFavorite}
      aria-label={`${isFavorite ? "Remove" : "Add"} ${itemName} from favorites`}
      className={cn(
        "group/fav flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1.5 text-xs text-text-muted transition-colors hover:border-border-strong hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from/50",
        className,
      )}
    >
      <Heart
        className={cn(
          "h-3.5 w-3.5 transition-colors",
          isFavorite
            ? "fill-accent-from text-accent-from"
            : "group-hover/fav:text-accent-from",
        )}
      />
      <span>{count}</span>
    </button>
  );
}
