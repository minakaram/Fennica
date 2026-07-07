import { z } from "zod";
import menuJson from "@/data/menu.json";
import type { MenuData } from "@/lib/types";

const priceVariantSchema = z.object({
  label: z.string(),
  price: z.string(),
});

const menuItemSchema = z.object({
  id: z.string(),
  name_en: z.string(),
  name_ar: z.string(),
  description_en: z.string().nullable(),
  description_ar: z.string().nullable(),
  price_min: z.number(),
  price_max: z.number().nullable(),
  price_variants: z.array(priceVariantSchema).optional(),
  image: z.string().nullable(),
  rating: z.number().nullable(),
  review_count: z.number(),
  favorites_count: z.number(),
});

const categorySchema = z.object({
  id: z.string(),
  name_en: z.string(),
  name_ar: z.string(),
  group_title: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  price_columns: z.array(z.string()).optional(),
  items: z.array(menuItemSchema),
});

const menuDataSchema = z.object({
  restaurant: z.object({
    name: z.string(),
    tagline: z.string(),
    note: z.string(),
  }),
  categories: z.array(categorySchema),
});

export function getMenuData(): MenuData {
  const result = menuDataSchema.safeParse(menuJson);

  if (!result.success) {
    throw new Error(
      `Invalid menu.json: ${result.error.issues.map((issue) => issue.message).join(", ")}`,
    );
  }

  return result.data;
}
