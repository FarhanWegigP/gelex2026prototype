"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccessibility } from "./useAccessibility";

/**
 * Registers global keyboard shortcuts for accessibility navigation.
 * Call once from a client component in the root layout.
 *
 *   Space     → Replay page greeting from the start
 *   Escape    → Stop narration immediately
 *   Alt + A   → Read all section narrations on the page
 *   Alt + N   → Skip to next [data-section] and read its narration
 *   Alt + H   → Navigate to beranda
 *   Alt + M   → Toggle accessibility mode (mute/unmute)
 */
export function useKeyboardNav() {
  const router = useRouter();
  const { speak, stop, toggleAccessibilityMode, currentGreetingRef } =
    useAccessibility();
  const sectionIndexRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      // Never hijack keypresses inside text inputs
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      // Escape — stop narration
      if (e.key === "Escape") {
        stop();
        return;
      }

      // Space — replay current page greeting
      if (
        e.key === " " &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        // Only intercept if not inside a button/link (they have their own space handler)
        const tag2 = (e.target as HTMLElement).tagName.toLowerCase();
        if (tag2 === "button" || tag2 === "a") return;
        e.preventDefault();
        if (currentGreetingRef.current) speak(currentGreetingRef.current);
        return;
      }

      if (!e.altKey) return;

      switch (e.key.toLowerCase()) {
        case "a": {
          // Alt+A — read all sections top to bottom
          e.preventDefault();
          const texts = Array.from(
            document.querySelectorAll("[data-section]")
          )
            .map((el) => el.getAttribute("data-narration"))
            .filter(Boolean)
            .join(". ");
          if (texts) speak(texts);
          break;
        }
        case "n": {
          // Alt+N — focus next section
          e.preventDefault();
          const sections = Array.from(
            document.querySelectorAll("[data-section]")
          ) as HTMLElement[];
          if (!sections.length) return;
          sectionIndexRef.current =
            (sectionIndexRef.current + 1) % sections.length;
          const next = sections[sectionIndexRef.current];
          next.scrollIntoView({ behavior: "smooth", block: "start" });
          next.focus({ preventScroll: true });
          const narration = next.getAttribute("data-narration");
          if (narration) setTimeout(() => speak(narration), 400);
          break;
        }
        case "h":
          // Alt+H — go to beranda
          e.preventDefault();
          stop();
          router.push("/beranda");
          break;
        case "m":
          // Alt+M — toggle mute
          e.preventDefault();
          toggleAccessibilityMode();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [speak, stop, router, toggleAccessibilityMode, currentGreetingRef]);
}
