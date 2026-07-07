"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { themes } from "@/lib/theme";
import type { Restaurant } from "@/lib/types";

interface MenuHeroProps {
  restaurant: Restaurant;
}

export function MenuHero({ restaurant }: MenuHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = themes[theme].mode === "light";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 60]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 0.4]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border px-4 pt-12 pb-14 md:px-6 md:pt-20 md:pb-20"
    >
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />

      {!isLight && (
        <>
          <GradientBlob className="-top-20 -left-20" color="var(--theme-accent-from)" delay={0} />
          <GradientBlob
            className="-right-16 top-10"
            color="var(--theme-accent-to)"
            size={280}
            delay={4}
          />
        </>
      )}

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-6xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-4 py-1.5 shadow-card">
          <span
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent-from to-accent-to"
            aria-hidden
          />
          <span className="text-xs font-medium tracking-wide text-text-muted uppercase">
            {restaurant.note}
          </span>
        </div>

        <h1 className="font-display max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight text-text md:text-6xl lg:text-7xl">
          {restaurant.name}
        </h1>

        <div className="mt-5 flex items-center gap-4">
          <span
            className="hidden h-px w-10 bg-gradient-to-r from-accent-from to-accent-to md:block"
            aria-hidden
          />
          <p className="font-display max-w-xl text-lg text-text-muted italic md:text-2xl">
            {restaurant.tagline}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
