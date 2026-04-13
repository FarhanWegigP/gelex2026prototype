"use client";
import { motion } from "framer-motion";
import { useSpeech } from "@/hooks/useSpeech";

interface SectionNarratorProps {
  text: string;
  label?: string;
}

export default function SectionNarrator({
  text,
  label = "Dengarkan Shelly",
}: SectionNarratorProps) {
  const { speak, stop, isSpeaking, isPaused, resume, isSupported } = useSpeech();

  if (!isSupported) return null;

  const handleClick = () => {
    if (isSpeaking && !isPaused) stop();
    else if (isPaused) resume();
    else speak(text);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="narrator-btn group"
      aria-label={label}
      title={label}
    >
      <span className="text-sm">🐢</span>
      <span className="text-xs">
        {isSpeaking && !isPaused ? "⏸ Pause" : isPaused ? "▶ Lanjut" : label}
      </span>
      {isSpeaking && (
        <span className="flex gap-0.5 items-end ml-0.5">
          {[0, 150, 300].map((d) => (
            <span
              key={d}
              className="w-0.5 h-3 bg-[#E8896A]/50 rounded animate-bounce"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </span>
      )}
    </motion.button>
  );
}
