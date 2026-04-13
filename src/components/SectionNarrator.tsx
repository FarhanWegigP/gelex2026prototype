"use client";
import { useSpeech } from "@/hooks/useSpeech";

interface SectionNarratorProps {
  text: string;
  label?: string;
}

export default function SectionNarrator({ text, label = "Dengarkan Shelly" }: SectionNarratorProps) {
  const { speak, stop, isSpeaking, isPaused, resume, isSupported } = useSpeech();

  if (!isSupported) return null;

  const handleClick = () => {
    if (isSpeaking && !isPaused) stop();
    else if (isPaused) resume();
    else speak(text);
  };

  return (
    <button
      onClick={handleClick}
      className="narrator-btn group"
      aria-label={label}
      title={label}
    >
      <span className="text-base">🐢</span>
      <span>{isSpeaking && !isPaused ? "⏸ Pause" : isPaused ? "▶ Lanjut" : label}</span>
      {isSpeaking && (
        <span className="flex gap-0.5 ml-1">
          <span className="w-0.5 h-3 bg-shelly/50 rounded animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-0.5 h-3 bg-shelly/50 rounded animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-0.5 h-3 bg-shelly/50 rounded animate-bounce" style={{ animationDelay: "300ms" }} />
        </span>
      )}
    </button>
  );
}
