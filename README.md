# Fennica Cafe — Digital Menu

A premium, animated digital restaurant menu built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

All menu content lives in [`data/menu.json`](data/menu.json). Edit this file to update restaurant info, categories, and items.

### Swap in real images

Set the `image` field on any item:

```json
"image": "https://your-cdn.com/photo.jpg"
```

Leave as `null` to use the generated gradient placeholder.

### Add a new category

1. Add a category object to `categories[]` in `data/menu.json` (unique `id` required).
2. Add a matching entry in [`lib/category-visuals.ts`](lib/category-visuals.ts) with a Lucide icon and gradient pair.

## Themes

Three palettes are available:

| Theme | Feel | Best for |
|-------|------|----------|
| **Cream** (default) | Warm light ivory with terracotta-gold accents | Cafés, restaurants, daytime menus |
| **Navy** | Deep plum lounge | Evening / bar (optional) |

In **development**, use the toggle at the bottom-left to switch themes. The choice persists in `localStorage`. Default theme is set in [`lib/theme.ts`](lib/theme.ts).

## Features

- Scroll-synced category tabs (IntersectionObserver)
- Animated tab indicator with horizontal auto-scroll on mobile
- Bilingual EN/AR labels (RTL-aware Arabic text blocks)
- Real-time search across all items
- Placeholder image system for items without photos
- 3D tilt-on-hover cards (disabled with `prefers-reduced-motion`)
- Responsive grid: 3 → 2 → 1 columns

## Project Structure

```
app/              Layout, page, global styles
components/menu/  Menu feature components
components/ui/    Shared UI primitives
hooks/            Scroll spy, tab scroll
lib/              Types, theme, data loading, utilities
data/             menu.json content file
```
