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
import { usePathname } from "next/navigation";
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

  const isAccessibilityModeRef = useRef(true);
  const currentGreetingRef = useRef<string>("");
  const lastNarrationRef = useRef<string>("");
  const lastAutoNarrationRef = useRef<string>("");
  const pathname = usePathname();

  useEffect(() => {
    isAccessibilityModeRef.current = isAccessibilityMode;
  }, [isAccessibilityMode]);

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

  const autoGreetOnMount = useCallback(
    (text: string): (() => void) => {
      currentGreetingRef.current = text;
      const t = setTimeout(() => {
        if (!isAccessibilityModeRef.current) return;
        rawSpeak(text);
        if (!isSupported) setAriaLiveText(text);
      }, 800);
      return () => clearTimeout(t);
    },
    [rawSpeak, isSupported]
  );

  // ── Auto-narasi saat scroll (IntersectionObserver) ──────────
  useEffect(() => {
    if (!isAccessibilityMode) return;

    const spokenIds = new Set<string>();
    let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;
    let pendingSectionId = "";
    let pendingNarration = "";

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const activeEntry = visibleEntries[0];
        if (!activeEntry) return;

        const el = activeEntry.target as HTMLElement;
        const sectionId =
          el.getAttribute("data-section") ||
          (el.getAttribute("data-narration") ?? "").slice(0, 40);
        const text = el.getAttribute("data-narration");

        if (!sectionId || !text || spokenIds.has(sectionId)) return;
        pendingSectionId = sectionId;
        pendingNarration = text;
      },
      {
        threshold: [0.3, 0.45, 0.6],
        rootMargin: "0px 0px -12% 0px",
      }
    );

    const sections = document.querySelectorAll("[data-section][data-narration]");
    sections.forEach((el) => observer.observe(el));

    const speakPendingNarration = () => {
      if (!pendingSectionId || !pendingNarration || spokenIds.has(pendingSectionId)) {
        return;
      }
      spokenIds.add(pendingSectionId);
      lastAutoNarrationRef.current = pendingNarration;
      rawSpeak(pendingNarration);
      if (!isSupported) setAriaLiveText(pendingNarration);
    };

    const handleScroll = () => {
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => {
        speakPendingNarration();
      }, 450);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccessibilityMode, pathname, rawSpeak, isSupported]);

  // ── Focus-based narration (tetap ada sebagai fallback) ──────
  useEffect(() => {
    if (!isAccessibilityMode) return;
    const handleFocusin = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const narrationEl = target.closest("[data-narration]") as HTMLElement | null;
      if (!narrationEl) return;
      const text = narrationEl.getAttribute("data-narration") ?? "";
      if (
        !text ||
        text === lastNarrationRef.current ||
        text === lastAutoNarrationRef.current
      ) return;
      lastNarrationRef.current = text;
      rawSpeak(text);
      if (!isSupported) setAriaLiveText(text);
    };
    document.addEventListener("focusin", handleFocusin);
    return () => document.removeEventListener("focusin", handleFocusin);
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
