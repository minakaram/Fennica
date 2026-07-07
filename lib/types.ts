export interface Restaurant {
  name: string;
  tagline: string;
  note: string;
}

export interface PriceVariant {
  label: string;
  price: string;
}

export interface MenuItem {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  price_min: number;
  price_max: number | null;
  price_variants?: PriceVariant[];
  image: string | null;
  rating: number | null;
  review_count: number;
  favorites_count: number;
}

export interface Category {
  id: string;
  name_en: string;
  name_ar: string;
  group_title?: string | null;
  note?: string | null;
  price_columns?: string[];
  items: MenuItem[];
}

export interface MenuData {
  restaurant: Restaurant;
  categories: Category[];
}
