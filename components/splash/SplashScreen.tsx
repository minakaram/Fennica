"use client";

import { Coffee, Sparkles, UtensilsCrossed } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { cn } from "@/lib/cn";

const MIN_VISIBLE_MS = 2600;
const EXIT_MS = 650;

interface SplashScreenProps {
  restaurantName: string;
  tagline: string;
  onComplete: () => void;
}

export function SplashScreen({
  restaurantName,
  tagline,
  onComplete,
}: SplashScreenProps) {
  const reducedMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const duration = reducedMotion ? 900 : MIN_VISIBLE_MS;
    const timer = window.setTimeout(() => setIsExiting(true), duration);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (!isExiting) return;

    const timer = window.setTimeout(() => {
      onCompleteRef.current();
    }, reducedMotion ? 0 : EXIT_MS);

    return () => window.clearTimeout(timer);
  }, [isExiting, reducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={
        isExiting
          ? { opacity: 0, scale: 1.04 }
          : { opacity: 1, scale: 1 }
      }
      transition={{
        duration: reducedMotion ? 0 : EXIT_MS / 1000,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-bg px-6"
      aria-live="polite"
      aria-busy={!isExiting}
      aria-label="Loading menu"
    >
      <GradientBlob
        className="-top-24 -left-24"
        color="var(--theme-accent-from)"
        size={360}
      />
      <GradientBlob
        className="-right-20 bottom-0"
        color="var(--theme-accent-to)"
        size={300}
        delay={2}
      />

      <div className="splash-scene relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
        <div
          className={cn(
            "splash-orbit splash-orbit-outer absolute inset-0 rounded-full border border-accent-from/25",
            reducedMotion && "splash-orbit-static",
          )}
          aria-hidden
        />
        <div
          className={cn(
            "splash-orbit splash-orbit-inner absolute inset-6 rounded-full border border-dashed border-accent-to/35",
            reducedMotion && "splash-orbit-static",
          )}
          aria-hidden
        />

        <div
          className={cn(
            "splash-cube-stage relative h-20 w-20 sm:h-24 sm:w-24",
            reducedMotion && "splash-cube-static",
          )}
          aria-hidden
        >
          <div className="splash-cube absolute inset-0">
            <div className="splash-cube-face splash-cube-face-front">
              <span className="font-display text-2xl font-bold text-on-accent sm:text-3xl">
                F
              </span>
            </div>
            <div className="splash-cube-face splash-cube-face-back">
              <Coffee className="h-7 w-7 text-on-accent sm:h-8 sm:w-8" strokeWidth={1.5} />
            </div>
            <div className="splash-cube-face splash-cube-face-right">
              <UtensilsCrossed
                className="h-7 w-7 text-on-accent sm:h-8 sm:w-8"
                strokeWidth={1.5}
              />
            </div>
            <div className="splash-cube-face splash-cube-face-left">
              <Sparkles className="h-7 w-7 text-on-accent sm:h-8 sm:w-8" strokeWidth={1.5} />
            </div>
            <div className="splash-cube-face splash-cube-face-top" />
            <div className="splash-cube-face splash-cube-face-bottom" />
          </div>
        </div>

        <div className="splash-floor-shadow absolute bottom-8 h-3 w-24 rounded-full bg-text/10 blur-md sm:bottom-10 sm:w-28" />
      </div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.55 }}
        className="relative mt-10 text-center"
      >
        <p className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          {restaurantName}
        </p>
        <p className="mt-2 text-sm text-text-muted sm:text-base">{tagline}</p>
      </motion.div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="relative mt-8 w-44"
        aria-hidden
      >
        <div className="h-1 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent-from to-accent-to"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: reducedMotion ? 0.6 : MIN_VISIBLE_MS / 1000 - 0.35,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
