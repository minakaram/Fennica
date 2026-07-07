"use client";

import { Palette } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { cn } from "@/lib/cn";
import { THEME_IDS, themes, type ThemeId } from "@/lib/theme";

const labels: Record<ThemeId, string> = {
  cream: "Light",
  navy: "Navy",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="fixed bottom-4 left-4 z-50 flex items-center gap-1 rounded-full border border-border glass-panel p-1 shadow-card"
      aria-label="Theme switcher"
    >
      <Palette className="ml-2 h-3.5 w-3.5 shrink-0 text-text-muted" aria-hidden />
      {THEME_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => setTheme(id)}
          title={themes[id].mode === "light" ? "Light café menu" : "Dark lounge menu"}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            theme === id
              ? "bg-gradient-to-r from-accent-from to-accent-to text-on-accent"
              : "text-text-muted hover:text-text",
          )}
        >
          {labels[id]}
        </button>
      ))}
    </div>
  );
}
