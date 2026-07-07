"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface GradientBlobProps {
  className?: string;
  color?: string;
  size?: number;
  delay?: number;
}

export function GradientBlob({
  className,
  color = "var(--theme-accent-from)",
  size = 320,
  delay = 0,
}: GradientBlobProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      style={{
        width: size,
        height: size,
        opacity: "var(--theme-blob-opacity)",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={
        reducedMotion
          ? undefined
          : {
              x: [0, 30, -20, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.08, 0.95, 1],
            }
      }
      transition={
        reducedMotion
          ? undefined
          : {
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }
      }
    />
  );
}
