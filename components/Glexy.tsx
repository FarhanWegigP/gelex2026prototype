"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSpeech } from "@/hooks/useSpeech";

export type GlexyMood = "happy" | "excited" | "thinking" | "waving" | "sad" | "cheering";
export type GlexyPosition = "bottom-right" | "bottom-left" | "inline";
export type GlexySize = "sm" | "md" | "lg" | "xl" | "2xl";

interface GlexyProps {
  mood?: GlexyMood;
  message?: string;
  position?: GlexyPosition;
  size?: GlexySize;
  autoShow?: boolean;
  bubble?: boolean;
  onNarrate?: () => void;
}

// sm=64 md=88 lg=120 xl=180 2xl=300
const sizeMap: Record<GlexySize, number> = {
  sm: 64,
  md: 88,
  lg: 120,
  xl: 180,
  "2xl": 300,
};

const moodEmoji: Record<GlexyMood, string> = {
  happy: "😊",
  excited: "🤩",
  thinking: "🤔",
  waving: "👋",
  sad: "😢",
  cheering: "🎉",
};

export default function Glexy({
  mood = "happy",
  message,
  position = "inline",
  size = "md",
  autoShow = false,
  bubble = true,
  onNarrate,
}: GlexyProps) {
  const [showBubble, setShowBubble] = useState(false);
  const { speak, stop, isSpeaking } = useSpeech();
  const px = sizeMap[size];

  useEffect(() => {
    if (message && autoShow && bubble) {
      const t = setTimeout(() => setShowBubble(true), 900);
      return () => clearTimeout(t);
    }
  }, [message, autoShow, bubble]);

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else if (message) {
      speak(message);
      if (bubble) setShowBubble(true);
    }
    onNarrate?.();
  };

  const posClass =
    position === "bottom-right"
      ? "fixed bottom-6 right-6 z-50"
      : position === "bottom-left"
      ? "fixed bottom-6 left-6 z-50"
      : "relative inline-flex flex-col items-center";

  return (
    <div className={posClass}>
      <AnimatePresence>
        {bubble && showBubble && message && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-full mb-3 left-[-125px] -translate-x-1/2 w-[200px] z-10"
          >
            <div
              className="bg-[#0D1B4B] rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(56,189,248,0.3)] border border-[#38BDF8]/30 cursor-pointer relative backdrop-blur-md"
              onClick={() => setShowBubble(false)}
            >
              {/* Glow line top */}
              <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[#38BDF8] to-[#818CF8]" />
              <span className="mr-1 text-sm">{moodEmoji[mood]}</span>
              <span className="text-xs align-justify text-[#E2E8F0] font-body leading-relaxed">{message}</span>
              <p className="text-[10px] text-[#38BDF8]/50 mt-1.5 font-body">Klik untuk tutup</p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0D1B4B] border-b border-r border-[#38BDF8]/30 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="cursor-pointer focus:outline-none relative"
        aria-label={`Glexy maskot – ${message || "klik untuk interaksi"}`}
        title={message}
      >
        <Image
          src="/shelly.png"
          alt="Glexy"
          width={px}
          height={px}
          className={`drop-shadow-xl ${isSpeaking ? "animate-pulse" : ""}`}
          style={{
            width: px,
            height: px,
            objectFit: "contain",
            filter: isSpeaking ? "drop-shadow(0 0 12px rgba(56,189,248,0.8))" : "drop-shadow(0 0 6px rgba(56,189,248,0.3))",
          }}
          priority={size === "2xl" || size === "xl" || size === "lg"}
        />

        {isSpeaking && (
          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-[#38BDF8]/60 pointer-events-none"
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        )}

        {/* Star sparkle orbit */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#38BDF8]"
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          style={{ boxShadow: "0 0 8px rgba(56,189,248,0.8)" }}
        />
      </motion.button>

      {isSpeaking && position !== "inline" && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 bg-[#0D1B4B]/90 border border-[#38BDF8]/30 rounded-full px-2.5 py-0.5 text-[10px] text-[#38BDF8] font-body whitespace-nowrap shadow-warm backdrop-blur-sm"
        >
          🔊 Berbicara…
        </motion.div>
      )}
    </div>
  );
}

// Legacy type aliases for backward compatibility
export type { GlexyMood as ShellyMood, GlexyPosition as ShellyPosition, GlexySize as ShellySize };
