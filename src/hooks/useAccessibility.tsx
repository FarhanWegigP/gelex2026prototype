"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AccessibilityContextType {
  isAccessibilityMode: boolean;
  toggleAccessibilityMode: () => void;
}


const AccessibilityContext = createContext<AccessibilityContextType>({
  isAccessibilityMode: false,
  toggleAccessibilityMode: () => {},
});

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);
  const toggleAccessibilityMode = () => setIsAccessibilityMode((prev) => !prev);
  return (
    <AccessibilityContext.Provider value={{ isAccessibilityMode, toggleAccessibilityMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
