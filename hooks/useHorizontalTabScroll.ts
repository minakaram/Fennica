"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function useHorizontalTabScroll(
  activeCategoryId: string,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const reducedMotion = useReducedMotion();

  const registerTab = (id: string, element: HTMLButtonElement | null) => {
    if (element) {
      tabRefs.current.set(id, element);
      return;
    }
    tabRefs.current.delete(id);
  };

  useEffect(() => {
    const tab = tabRefs.current.get(activeCategoryId);
    const container = containerRef.current;
    if (!tab || !container) return;

    const tabLeft = tab.offsetLeft;
    const tabWidth = tab.offsetWidth;
    const containerWidth = container.offsetWidth;
    const scrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [activeCategoryId, containerRef, reducedMotion]);

  return { registerTab };
}
