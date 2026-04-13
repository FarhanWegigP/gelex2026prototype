"use client";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { useAccessibility } from "@/hooks/useAccessibility";

/**
 * Renders nothing visible.
 * Wires up global keyboard shortcuts and provides the aria-live
 * region for screen readers that can't use Web Speech API.
 */
export default function ClientInit() {
  useKeyboardNav();
  const { ariaLiveText } = useAccessibility();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {ariaLiveText}
    </div>
  );
}
