"use client";
import { useEffect, useRef, useCallback } from "react";
import { useSpeech } from "./useSpeech";

type SectionRef = { current: HTMLElement | null };

/**
 * Registers sections to be automatically narrated when they enter the viewport.
 * Debounces rapid scroll events and prevents repeated reads of the same section.
 *
 * Usage:
 *   const { register } = useScrollNarrator();
 *   useEffect(() => { register("hero", HERO_TEXT, heroRef); }, [register]);
 */
export function useScrollNarrator() {
  const { speak, stop } = useSpeech();
  const lastSpokenId = useRef<string | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerList = useRef<IntersectionObserver[]>([]);

  // Global cleanup on unmount
  useEffect(() => {
    return () => {
      observerList.current.forEach((o) => o.disconnect());
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const register = useCallback(
    (id: string, text: string, ref: SectionRef) => {
      // Slight delay to ensure the DOM ref is populated after render
      const setupTimer = setTimeout(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting || lastSpokenId.current === id) return;

            // Debounce: cancel previous pending speak, wait before starting new one
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
              // Re-verify element is still in viewport before speaking
              const rect = el.getBoundingClientRect();
              const stillVisible =
                rect.top < window.innerHeight * 0.75 &&
                rect.bottom > window.innerHeight * 0.25;
              if (!stillVisible) return;

              stop();
              speak(text);
              lastSpokenId.current = id;
            }, 600);
          },
          { threshold: 0.38 }
        );

        observer.observe(el);
        observerList.current.push(observer);
      }, 120);

      return () => clearTimeout(setupTimer);
    },
    [speak, stop]
  );

  return { register };
}
