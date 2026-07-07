"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseScrollSpyOptions {
  sectionIds: string[];
  rootMargin?: string;
  defaultActiveId?: string;
}

export function useScrollSpy({
  sectionIds,
  rootMargin = "0px",
  defaultActiveId,
}: UseScrollSpyOptions) {
  const [activeCategoryId, setActiveCategoryId] = useState(
    defaultActiveId ?? sectionIds[0] ?? "",
  );
  const ratiosRef = useRef<Map<string, number>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    const observer = observerRef.current;

    if (element) {
      const existing = elementsRef.current.get(id);
      if (existing && existing !== element && observer) {
        observer.unobserve(existing);
      }
      elementsRef.current.set(id, element);
      observer?.observe(element);
      return;
    }

    const existing = elementsRef.current.get(id);
    if (existing && observer) {
      observer.unobserve(existing);
    }
    elementsRef.current.delete(id);
    ratiosRef.current.delete(id);
  }, []);

  const updateActiveFromRatios = useCallback(() => {
    if (isScrollingRef.current) return;

    let bestId = activeCategoryId;
    let bestRatio = 0;

    ratiosRef.current.forEach((ratio, id) => {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    });

    if (bestRatio > 0 && bestId !== activeCategoryId) {
      setActiveCategoryId(bestId);
    }
  }, [activeCategoryId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratiosRef.current.set(entry.target.id, entry.intersectionRatio);
        });
        updateActiveFromRatios();
      },
      {
        rootMargin,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    observerRef.current = observer;
    elementsRef.current.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [rootMargin, updateActiveFromRatios]);

  const scrollToCategory = useCallback(
    (categoryId: string, offset: number) => {
      const element = elementsRef.current.get(categoryId) ?? document.getElementById(categoryId);
      if (!element) return;

      isScrollingRef.current = true;
      setActiveCategoryId(categoryId);

      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    },
    [],
  );

  useEffect(
    () => () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    },
    [],
  );

  return {
    activeCategoryId,
    registerSection,
    scrollToCategory,
    setActiveCategoryId,
  };
}
