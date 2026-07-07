"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Category } from "@/lib/types";

interface CategorySectionProps {
  category: Category;
  registerSection: (id: string, element: HTMLElement | null) => void;
  children: React.ReactNode;
}

export function CategorySection({
  category,
  registerSection,
  children,
}: CategorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const hasEnglishName = category.name_en.trim().length > 0;

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    registerSection(category.id, element);
    return () => registerSection(category.id, null);
  }, [category.id, registerSection]);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [category.id]);

  return (
    <motion.section
      id={category.id}
      ref={sectionRef}
      className="scroll-mt-36 min-h-[120px] space-y-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-2 border-b border-border pb-4">
        {category.group_title && (
          <p
            className="font-arabic text-right text-xs font-medium tracking-wide text-accent-from uppercase"
            dir="rtl"
            lang="ar"
          >
            {category.group_title}
          </p>
        )}

        {hasEnglishName ? (
          <>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-text md:text-3xl">
              {category.name_en}
            </h2>
            <p
              className="font-arabic text-right text-base text-text-muted md:text-lg"
              dir="rtl"
              lang="ar"
            >
              {category.name_ar}
            </p>
          </>
        ) : (
          <h2
            className="font-arabic text-right text-2xl font-semibold tracking-tight text-text md:text-3xl"
            dir="rtl"
            lang="ar"
          >
            {category.name_ar}
          </h2>
        )}

        {category.price_columns && category.price_columns.length > 0 && (
          <p
            className="font-arabic text-right text-xs text-text-muted"
            dir="rtl"
            lang="ar"
          >
            {category.price_columns.join(" · ")}
          </p>
        )}

        {category.note && (
          <p
            className="font-arabic text-right text-sm text-accent-from/90"
            dir="rtl"
            lang="ar"
          >
            {category.note}
          </p>
        )}
      </div>

      {shouldRender ? (
        children
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {category.items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="h-28 animate-pulse rounded-2xl border border-border bg-surface sm:h-32 lg:h-64"
              aria-hidden
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}
