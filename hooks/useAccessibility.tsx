"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { useSpeech } from "./useSpeech";

interface AccessibilityContextType {
  isAccessibilityMode: boolean;
  toggleAccessibilityMode: () => void;
  autoGreetOnMount: (text: string) => () => void;
  currentGreetingRef: React.MutableRefObject<string>;
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
  ariaLiveText: string;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  isAccessibilityMode: true,
  toggleAccessibilityMode: () => {},
  autoGreetOnMount: () => () => {},
  currentGreetingRef: { current: "" },
  speak: () => {},
  stop: () => {},
  isSpeaking: false,
  isSupported: false,
  ariaLiveText: "",
});

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(true);
  const [ariaLiveText, setAriaLiveText] = useState("");
  const { speak: rawSpeak, stop, isSpeaking, isSupported } = useSpeech();

  // Refs to avoid stale closures
  const isAccessibilityModeRef = useRef(true);
  const currentGreetingRef = useRef<string>("");
  const lastNarrationRef = useRef<string>("");

  useEffect(() => {
    isAccessibilityModeRef.current = isAccessibilityMode;
  }, [isAccessibilityMode]);

  // speak() is gated by accessibility mode
  const speak = useCallback(
    (text: string) => {
      if (!isAccessibilityModeRef.current) return;
      rawSpeak(text);
      if (!isSupported) setAriaLiveText(text);
    },
    [rawSpeak, isSupported]
  );

  const toggleAccessibilityMode = useCallback(() => {
    setIsAccessibilityMode((prev) => {
      if (prev) {
        stop();
        setAriaLiveText("");
      }
      return !prev;
    });
  }, [stop]);

  // Call once on mount per page. Returns cleanup (clears the timeout).
  const autoGreetOnMount = useCallback(
    (text: string): (() => void) => {
      currentGreetingRef.current = text;
      const t = setTimeout(() => {
        if (!isAccessibilityModeRef.current) return;
        rawSpeak(text);
        if (!isSupported) setAriaLiveText(text);
      }, 1000);
      return () => clearTimeout(t);
    },
    [rawSpeak, isSupported]
  );

  // Focus-based narration: when focus enters a new [data-narration] element, Shelly reads it
  useEffect(() => {
    if (!isAccessibilityMode) return;

    const handleFocusin = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const narrationEl = target.closest("[data-narration]") as HTMLElement | null;
      if (!narrationEl) return;
      const text = narrationEl.getAttribute("data-narration") ?? "";
      if (!text || text === lastNarrationRef.current) return;
      lastNarrationRef.current = text;
      rawSpeak(text);
      if (!isSupported) setAriaLiveText(text);
    };

    // Reset last narration on page change so sections re-read after navigation
    const resetOnNav = () => { lastNarrationRef.current = ""; };
    window.addEventListener("popstate", resetOnNav);
    document.addEventListener("focusin", handleFocusin);
    return () => {
      document.removeEventListener("focusin", handleFocusin);
      window.removeEventListener("popstate", resetOnNav);
    };
  }, [isAccessibilityMode, rawSpeak, isSupported]);

  return (
    <AccessibilityContext.Provider
      value={{
        isAccessibilityMode,
        toggleAccessibilityMode,
        autoGreetOnMount,
        currentGreetingRef,
        speak,
        stop,
        isSpeaking,
        isSupported,
        ariaLiveText,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
