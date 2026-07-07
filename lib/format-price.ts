import type { MenuItem } from "@/lib/types";

export function formatPrice(priceMin: number, priceMax: number | null): string {
  const format = (value: number) =>
    `EGP ${value.toLocaleString("en-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (priceMax === null) {
    return format(priceMin);
  }

  return `${format(priceMin)} – ${format(priceMax)}`;
}

export function formatMenuItemPrice(item: MenuItem): string {
  if (item.price_variants && item.price_variants.length > 0) {
    return item.price_variants
      .map((variant) => {
        const label = variant.label ? `${variant.label}: ` : "";
        return `${label}${variant.price}`;
      })
      .join("  ·  ");
  }

  return formatPrice(item.price_min, item.price_max);
}
