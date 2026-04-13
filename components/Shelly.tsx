"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSpeech } from "@/hooks/useSpeech";

export type ShellyMood = "happy" | "excited" | "thinking" | "waving" | "sad" | "cheering";
export type ShellyPosition = "bottom-right" | "bottom-left" | "inline";
export type ShellySize = "sm" | "md" | "lg" | "xl";

interface ShellyProps {
  mood?: ShellyMood;
  message?: string;
  position?: ShellyPosition;
  size?: ShellySize;
  autoShow?: boolean;
  onNarrate?: () => void;
}

const sizeMap: Record<ShellySize, number> = { sm: 64, md: 88, lg: 120, xl: 180 };

const moodEmoji: Record<ShellyMood, string> = {
  happy: "😊",
  excited: "🤩",
  thinking: "🤔",
  waving: "👋",
  sad: "😢",
  cheering: "🎉",
};

export default function Shelly({
  mood = "happy",
  message,
  position = "inline",
  size = "md",
  autoShow = false,
  onNarrate,
}: ShellyProps) {
  const [showBubble, setShowBubble] = useState(false);
  const { speak, stop, isSpeaking } = useSpeech();
  const px = sizeMap[size];

  useEffect(() => {
    if (message && autoShow) {
      const t = setTimeout(() => setShowBubble(true), 900);
      return () => clearTimeout(t);
    }
  }, [message, autoShow]);

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else if (message) {
      speak(message);
      setShowBubble(true);
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
        {showBubble && message && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-full mb-3 left-[-125px] -translate-x-1/2 w-[180px] z-10"
          >
            <div
              className="bg-white rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(232,137,106,0.28)] border-2 border-[#FADADD] cursor-pointer relative"
              onClick={() => setShowBubble(false)}
            >
              <span className="mr-1 text-sm">{moodEmoji[mood]}</span>
              <span className="text-xs align-justify text-[#3d2c1e] font-body leading-relaxed">{message}</span>
              <p className="text-[10px] text-[#E8896A]/40 mt-1.5 font-body">Klik untuk tutup</p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#FADADD] rotate-45" />
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
        aria-label={`Shelly maskot – ${message || "klik untuk interaksi"}`}
        title={message}
      >
        <Image
          src="/shelly.png"
          alt="Shelly"
          width={px}
          height={px}
          className={`drop-shadow-xl ${isSpeaking ? "animate-pulse" : ""}`}
          priority={size === "xl" || size === "lg"}
          style={{ width: px, height: px, objectFit: "contain" }}
        />

        {/* Speaking ring */}
        {isSpeaking && (
          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-[#E8896A]/60 pointer-events-none"
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Speaking label – only for fixed positions */}
      {isSpeaking && position !== "inline" && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 bg-white/90 border border-[#FADADD] rounded-full px-2.5 py-0.5 text-[10px] text-[#E8896A] font-body whitespace-nowrap shadow-warm"
        >
          🔊 Berbicara…
        </motion.div>
      )}
    </div>
  );
}
