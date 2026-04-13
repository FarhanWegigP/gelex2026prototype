"use client";
import { useState, useEffect } from "react";
import { useSpeech } from "@/hooks/useSpeech";

export type ShellyMood = "happy" | "excited" | "thinking" | "waving" | "sad" | "cheering";
export type ShellyPosition = "bottom-right" | "bottom-left" | "inline";
export type ShellySize = "sm" | "md" | "lg";

interface ShellyProps {
  mood?: ShellyMood;
  message?: string;
  position?: ShellyPosition;
  onNarrate?: () => void;
  size?: ShellySize;
  autoShow?: boolean;
}

const sizeMap = { sm: 60, md: 90, lg: 120 };

const moodEmoji: Record<ShellyMood, string> = {
  happy: "😊", excited: "🤩", thinking: "🤔", waving: "👋", sad: "😢", cheering: "🎉",
};

// SVG Shelly turtle
function ShellyArt({ size, mood }: { size: number; mood: ShellyMood }) {
  const s = size;
  const isExcited = mood === "excited" || mood === "cheering";
  return (
    <svg width={s} height={s} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="50" cy="105" rx="22" ry="4" fill="#E8896A" fillOpacity="0.2" />
      {/* Body / shell */}
      <ellipse cx="50" cy="65" rx="28" ry="26" fill="#F4A98A" />
      <ellipse cx="50" cy="65" rx="22" ry="20" fill="#FDC84A" />
      {/* Shell pattern */}
      <path d="M50 47 L50 65 M38 54 L50 65 L62 54" stroke="#E8896A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 65 L50 65 L66 65" stroke="#E8896A" strokeWidth="1.5" strokeLinecap="round" />
      {/* Flippers */}
      <ellipse cx="24" cy="62" rx="10" ry="6" fill="#F4A98A" transform={isExcited ? "rotate(-20 24 62)" : "rotate(-10 24 62)"} />
      <ellipse cx="76" cy="62" rx="10" ry="6" fill="#F4A98A" transform={isExcited ? "rotate(20 76 62)" : "rotate(10 76 62)"} />
      {/* Front legs */}
      <ellipse cx="30" cy="82" rx="7" ry="5" fill="#F4A98A" />
      <ellipse cx="70" cy="82" rx="7" ry="5" fill="#F4A98A" />
      {/* Head */}
      <ellipse cx="50" cy="36" rx="18" ry="16" fill="#F4A98A" />
      {/* Hair bow */}
      <path d="M40 22 Q44 18 48 22 Q44 26 40 22Z" fill="#FADADD" />
      <path d="M48 22 Q52 18 56 22 Q52 26 48 22Z" fill="#FADADD" />
      <circle cx="48" cy="22" r="2.5" fill="#E8896A" />
      {/* Eyes */}
      {mood === "waving" || mood === "happy" ? (
        <>
          <path d="M41 35 Q43 32 45 35" stroke="#E8896A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="55" cy="34" r="4" fill="white" />
          <circle cx="56" cy="34" r="2" fill="#3d2c1e" />
        </>
      ) : mood === "sad" ? (
        <>
          <path d="M41 36 Q43 39 45 36" stroke="#E8896A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="55" cy="35" r="4" fill="white" />
          <circle cx="55" cy="36" r="2" fill="#3d2c1e" />
        </>
      ) : (
        <>
          <path d="M40 34 Q42 31 44 34" stroke="#E8896A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="55" cy="34" r="4" fill="white" />
          <circle cx="56" cy="33" r="2" fill="#3d2c1e" />
        </>
      )}
      {/* Mouth */}
      <path d="M44 42 Q50 47 56 42" stroke="#E8896A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="40" cy="40" r="4" fill="#FADADD" fillOpacity="0.6" />
      <circle cx="60" cy="40" r="4" fill="#FADADD" fillOpacity="0.6" />
    </svg>
  );
}

export default function Shelly({
  mood = "waving",
  message,
  position = "bottom-right",
  onNarrate,
  size = "md",
  autoShow = true,
}: ShellyProps) {
  const [showBubble, setShowBubble] = useState(!!message && autoShow);
  const [isAnimating, setIsAnimating] = useState(false);
  const { speak, isSpeaking, stop } = useSpeech();
  const px = sizeMap[size];

  useEffect(() => {
    if (message && autoShow) setShowBubble(true);
  }, [message, autoShow]);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
    if (message && !isSpeaking) {
      speak(message);
    } else if (isSpeaking) {
      stop();
    }
    onNarrate?.();
    setShowBubble((v) => !v);
  };

  const posClass =
    position === "bottom-right"
      ? "fixed bottom-6 right-6 z-50"
      : position === "bottom-left"
      ? "fixed bottom-6 left-6 z-50"
      : "relative inline-flex";

  return (
    <div className={`${posClass} flex flex-col items-end gap-2`}>
      {/* Speech bubble */}
      {showBubble && message && (
        <div
          className="animate-bubble-in max-w-[220px] bg-white border-2 border-peach rounded-2xl rounded-br-none px-4 py-3 shadow-warm text-sm font-body text-shelly-dark leading-relaxed cursor-pointer"
          onClick={() => setShowBubble(false)}
        >
          <span className="text-xs text-shelly/50 mr-1">{moodEmoji[mood]}</span>
          {message}
          <div className="text-xs text-shelly/40 mt-1">Klik untuk tutup</div>
        </div>
      )}
      {/* Shelly character */}
      <button
        onClick={handleClick}
        className={`
          animate-bob cursor-pointer transition-transform hover:scale-110 active:scale-95
          ${isAnimating ? "scale-125" : ""}
          ${isSpeaking ? "animate-pulse" : ""}
          drop-shadow-lg
        `}
        aria-label={`Shelly maskot - ${message || "klik untuk berinteraksi"}`}
        title={message}
      >
        <ShellyArt size={px} mood={mood} />
      </button>
      {/* Speaking indicator */}
      {isSpeaking && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border border-peach rounded-full px-3 py-1 text-xs text-shelly font-body whitespace-nowrap shadow-warm">
          🔊 Sedang berbicara...
        </div>
      )}
    </div>
  );
}
