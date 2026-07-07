export const THEME_IDS = ["cream", "navy"] as const;

export type ThemeId = (typeof THEME_IDS)[number];

/** Warm light default — best for daytime café / restaurant menus */
export const DEFAULT_THEME: ThemeId = "cream";

export const themes = {
  cream: {
    bg: "#F8F5F0",
    bgElevated: "#FFFFFF",
    text: "#2C221C",
    textMuted: "#7D7168",
    accentFrom: "#C45C3E",
    accentTo: "#D4A054",
    mode: "light" as const,
  },
  navy: {
    bg: "#0B0B18",
    bgElevated: "#151228",
    text: "#EDEAF5",
    textMuted: "#9B94B0",
    accentFrom: "#EC4899",
    accentTo: "#F59E0B",
    mode: "dark" as const,
  },
} as const;

export const THEME_STORAGE_KEY = "menu-theme";

export function isThemeId(value: string | null | undefined): value is ThemeId {
  if (value === "charcoal") return false;
  return THEME_IDS.includes(value as ThemeId);
}

export function resolveThemeId(value: string | null | undefined): ThemeId {
  if (isThemeId(value)) return value;
  return DEFAULT_THEME;
}

export function readThemeFromDocument(): ThemeId {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const attr = document.documentElement.getAttribute("data-theme");
  if (isThemeId(attr)) return attr;
  return resolveThemeId(
    typeof window !== "undefined" ? localStorage.getItem(THEME_STORAGE_KEY) : null,
  );
}
