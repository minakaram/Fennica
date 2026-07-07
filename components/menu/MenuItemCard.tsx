"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent } from "react";
import { FavoriteButton } from "@/components/menu/FavoriteButton";
import { MenuItemImage } from "@/components/menu/MenuItemImage";
import { RatingBadge } from "@/components/menu/RatingBadge";
import { formatMenuItemPrice } from "@/lib/format-price";
import { cn } from "@/lib/cn";
import type { MenuItem } from "@/lib/types";

interface MenuItemCardProps {
  item: MenuItem;
  categoryId: string;
  categoryTitleAr?: string;
  index?: number;
}

export function MenuItemCard({
  item,
  categoryId,
  categoryTitleAr,
  index = 0,
}: MenuItemCardProps) {
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 260, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 260, damping: 22 });
  const shadowOffset = useTransform(springRotateY, [-8, 8], [8, 20]);
  const dynamicShadow = useTransform(
    shadowOffset,
    (value) =>
      `0 ${value}px ${value * 2.5}px color-mix(in srgb, var(--theme-text) 14%, transparent)`,
  );

  const displayName = item.name_ar || item.name_en;
  const hasEnglishName = item.name_en.trim().length > 0;
  const description =
    item.description_ar?.trim() || item.description_en?.trim() || null;
  const hasDescription = description !== null;
  const hasLongDescription =
    (item.description_en?.trim().length ?? 0) > 0 ||
    (item.description_ar?.trim().length ?? 0) > 0;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateX.set(((y - centerY) / centerY) * -6);
    rotateY.set(((x - centerX) / centerX) * 6);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const priceClassName = cn(
    "font-semibold text-accent-from",
    item.price_variants && item.price_variants.length > 1
      ? "font-arabic text-right text-xs leading-relaxed lg:text-sm"
      : "text-sm lg:text-base",
  );

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.04 }}
      style={
        reducedMotion
          ? undefined
          : {
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 900,
              boxShadow: dynamicShadow,
            }
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className={cn(
        "group relative flex flex-row overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-card lg:flex-col",
        !reducedMotion &&
          "lg:transition-transform lg:hover:scale-[1.02] lg:hover:shadow-[var(--theme-card-shadow-hover)]",
      )}
    >
      <div className="order-1 flex min-w-0 flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4 lg:order-2 lg:space-y-3">
        {item.rating !== null && (
          <RatingBadge
            rating={item.rating}
            reviewCount={item.review_count}
            variant="compact"
            className="w-fit lg:hidden"
          />
        )}

        <div className="flex items-start justify-between gap-2 lg:gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            {hasEnglishName ? (
              <>
                <h3 className="font-display text-sm leading-snug font-semibold text-text sm:text-[15px] lg:hidden">
                  {item.name_en}
                  <span className="text-text-muted"> — </span>
                  <span className="font-arabic" dir="rtl" lang="ar">
                    {item.name_ar}
                  </span>
                </h3>
                <h3 className="font-display hidden text-lg leading-tight font-semibold text-text lg:block">
                  {item.name_en}
                </h3>
                <p
                  className="font-arabic hidden text-right text-sm leading-snug text-text-muted lg:block"
                  dir="rtl"
                  lang="ar"
                >
                  {item.name_ar}
                </p>
              </>
            ) : (
              <h3
                className="font-arabic text-right text-sm leading-snug font-semibold text-text sm:text-[15px] lg:text-lg lg:leading-tight"
                dir="rtl"
                lang="ar"
              >
                {item.name_ar}
              </h3>
            )}
          </div>
          {item.rating !== null && (
            <RatingBadge
              rating={item.rating}
              reviewCount={item.review_count}
              className="hidden shrink-0 lg:inline-flex"
            />
          )}
        </div>

        {hasDescription && (
          <div className="space-y-1">
            <p
              className={cn(
                "line-clamp-2 text-xs leading-relaxed text-text-muted sm:text-[13px] lg:hidden",
                item.description_ar?.trim() && "font-arabic text-right",
              )}
              dir={item.description_ar?.trim() ? "rtl" : undefined}
              lang={item.description_ar?.trim() ? "ar" : undefined}
            >
              {description}
            </p>

            {hasLongDescription && (
              <div className="hidden space-y-1 lg:block">
                {item.description_en?.trim() && (
                  <p className="text-sm leading-relaxed text-text-muted">
                    {item.description_en}
                  </p>
                )}
                {item.description_ar?.trim() && (
                  <p
                    className="font-arabic text-right text-xs leading-relaxed text-text-muted/80"
                    dir="rtl"
                    lang="ar"
                  >
                    {item.description_ar}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-1 lg:gap-3">
          <p
            className={priceClassName}
            dir={item.price_variants ? "rtl" : undefined}
          >
            {formatMenuItemPrice(item)}
          </p>
          <FavoriteButton
            initialCount={item.favorites_count}
            itemName={displayName}
            className="hidden lg:flex"
          />
        </div>
      </div>

      <div className="relative order-2 shrink-0 self-center p-2 pl-0 sm:p-2.5 sm:pl-0 lg:order-1 lg:w-full lg:self-auto lg:p-0">
        <div className="relative w-[88px] overflow-hidden rounded-xl sm:w-[96px] lg:w-full lg:rounded-none">
          <MenuItemImage
            image={item.image}
            categoryId={categoryId}
            nameEn={item.name_en}
            nameAr={item.name_ar}
            categoryTitleAr={categoryTitleAr}
            compact
          />
          <div className="absolute right-1.5 bottom-1.5 lg:hidden">
            <FavoriteButton
              variant="overlay"
              initialCount={item.favorites_count}
              itemName={displayName}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
