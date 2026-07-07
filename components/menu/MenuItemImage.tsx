"use client";

import Image from "next/image";
import { getCategoryVisual } from "@/lib/category-visuals";
import { cn } from "@/lib/cn";

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=";

interface MenuItemImageProps {
  image: string | null;
  categoryId: string;
  nameEn: string;
  nameAr: string;
  categoryTitleAr?: string;
  className?: string;
  priority?: boolean;
  compact?: boolean;
}

export function MenuItemImage({
  image,
  categoryId,
  nameEn,
  nameAr,
  categoryTitleAr,
  className,
  priority = false,
  compact = false,
}: MenuItemImageProps) {
  const visual = getCategoryVisual(categoryId, categoryTitleAr);
  const Icon = visual.icon;
  const displayName = nameAr.trim() || nameEn.trim();
  const watermark = displayName.charAt(0) || "?";

  const aspectClass = compact ? "aspect-square lg:aspect-[4/3]" : "aspect-[4/3]";

  if (image) {
    return (
      <div className={cn("relative overflow-hidden", aspectClass, className)}>
        <Image
          src={image}
          alt={displayName}
          fill
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes={
            compact
              ? "(max-width: 1024px) 120px, 33vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className={cn(
            "object-cover",
            compact
              ? "lg:transition-transform lg:duration-500 lg:group-hover:scale-105"
              : "transition-transform duration-500 group-hover:scale-105",
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent",
            compact && "hidden lg:block",
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", aspectClass, className)}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${visual.gradient[0]} 0%, ${visual.gradient[1]} 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20" />
      <span
        className={cn(
          "font-arabic absolute inset-0 flex items-center justify-center font-bold text-white/10 select-none",
          compact ? "text-4xl lg:text-7xl" : "text-7xl",
        )}
      >
        {watermark}
      </span>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          className={cn(
            "text-white/20",
            compact ? "h-8 w-8 lg:h-12 lg:w-12" : "h-12 w-12",
          )}
          strokeWidth={1.25}
        />
      </div>
    </div>
  );
}
