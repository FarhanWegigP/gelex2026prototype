"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSpeech } from "@/hooks/useSpeech";
import { useAccessibility } from "@/hooks/useAccessibility";
import CloudOrnament from "@/components/CloudOrnament";

type Phase = "intro" | "speaking" | "leaving" | "done";

const INTRO_SPEECH =
  "Hi aku Shelly! Yang akan jadi pemandu untuk masuk ke Glora Imaji Gelex!";

const PAGE_GREETING =
  "Halo! Aku Shelly, kura-kura maskot GELEX 2026. Kamu sedang di halaman pembuka website Gelanggang Expo — expo tahunan UKM Universitas Gadjah Mada. Ada satu tombol di tengah halaman bernama Mulai Jelajahi. Tekan Tab lalu Enter untuk masuk. Tekan Spasi kapanpun untuk aku ulangi, Escape untuk berhenti, atau Alt M untuk matikan suara.";

export default function SplashPage() {
  const router = useRouter();
  const { speak, stop, isSpeaking, isSupported } = useSpeech();
  const { autoGreetOnMount } = useAccessibility();
  const [phase, setPhase] = useState<Phase>("intro");
  const speechStartedRef = useRef(false);
  const prevSpeakingRef = useRef(false);

  // Register page greeting for keyboard Space shortcut
  useEffect(() => {
    return autoGreetOnMount(PAGE_GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1 — Start entrance, then speak Shelly's intro
  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("speaking");
      speak(INTRO_SPEECH);
      speechStartedRef.current = true;
    }, 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2 — Detect speech end → leave
  useEffect(() => {
    if (
      prevSpeakingRef.current &&
      !isSpeaking &&
      speechStartedRef.current &&
      phase === "speaking"
    ) {
      const t = setTimeout(() => setPhase("leaving"), 350);
      return () => clearTimeout(t);
    }
    prevSpeakingRef.current = isSpeaking;
  }, [isSpeaking, phase]);

  // 3 — Fallback: if speech unsupported, advance after 3 s
  useEffect(() => {
    if (isSupported) return;
    const t = setTimeout(() => {
      if (phase === "intro" || phase === "speaking") setPhase("leaving");
    }, 3200);
    return () => clearTimeout(t);
  }, [isSupported, phase]);

  const handleSkip = () => {
    stop();
    setPhase("leaving");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-[#FDEEC9] to-[#FADADD]">
      <CloudOrnament />

      {/* ── Center intro overlay ─────────────────────────────── */}
      <AnimatePresence>
        {(phase === "intro" || phase === "speaking") && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.6 } }}
          >
            {/* Big Shelly — animates toward corner on exit */}
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{
                scale: 0.22,
                x: "42vw",
                y: "40vh",
                opacity: 0,
                transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] },
              }}
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/shelly.png"
                  alt="Shelly, maskot kura-kura GELEX 2026"
                  width={210}
                  height={210}
                  priority
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-2xl"
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>

            {/* Speech bubble */}
            <AnimatePresence>
              {phase === "speaking" && (
                <motion.div
                  key="bubble"
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 max-w-sm text-center bg-white/95 backdrop-blur-sm rounded-2xl px-7 py-4 shadow-[0_4px_28px_rgba(232,137,106,0.22)] border border-[#FADADD]"
                  role="status"
                  aria-live="polite"
                >
                  <p className="text-[#3d2c1e] font-body text-lg leading-relaxed">
                    "{INTRO_SPEECH}"
                  </p>
                  {/* Animated sound bars */}
                  {isSpeaking && (
                    <div className="flex gap-1 justify-center mt-3" aria-hidden="true">
                      {[0, 150, 300, 150, 0].map((delay, i) => (
                        <span
                          key={i}
                          className="w-1 h-4 bg-[#E8896A]/60 rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skip */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              onClick={handleSkip}
              className="absolute bottom-10 text-sm font-body text-[#E8896A]/50 hover:text-[#E8896A] transition-colors"
              aria-label="Lewati intro Shelly"
            >
              Lewati →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Corner Shelly (after intro) ──────────────────────── */}
      <AnimatePresence>
        {(phase === "leaving" || phase === "done") && (
          <motion.div
            key="corner-shelly"
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.65, type: "spring", stiffness: 280, damping: 22 }}
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/shelly.png"
                alt=""
                width={84}
                height={84}
                className="drop-shadow-lg"
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main content (after leaving) ─────────────────────── */}
      <AnimatePresence>
        {(phase === "leaving" || phase === "done") && (
          <motion.div
            key="main"
            className="relative z-10 text-center px-6 max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: "easeOut" }}
            data-section="splash"
            data-narration={PAGE_GREETING}
            tabIndex={-1}
          >
            {/* Title */}
            <motion.h1
              className="font-heading font-bold text-8xl md:text-[10rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#E8896A] to-[#F4A98A] mb-3 drop-shadow-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
            >
              GELEX
            </motion.h1>

            <motion.p
              className="text-2xl font-heading text-[#E8896A] mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Gelanggang Expo 2026
            </motion.p>

            <motion.p
              className="text-base font-body text-[#8B7355] mb-8 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              Where Creativity Comes Alive and Talent Shines
            </motion.p>

            {/* Date badge */}
            <motion.div
              className="inline-block mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="bg-white/80 backdrop-blur-sm px-7 py-2.5 rounded-full shadow-[0_2px_16px_rgba(232,137,106,0.18)] border border-[#FADADD]">
                <p className="text-[#E8896A] font-heading font-semibold text-base">
                  1–3 Agustus 2026
                </p>
                <p className="text-[11px] text-[#8B7355] font-body mt-0.5">
                  Gelanggang Mahasiswa, Universitas Gadjah Mada
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <button
                onClick={() => router.push("/beranda")}
                className="btn-primary text-lg px-14 py-4"
                aria-label="Masuk ke halaman beranda GELEX 2026"
              >
                Mulai Jelajahi
              </button>
              <p className="mt-4 text-xs text-[#8B7355]/60 font-body">
                Tekan Spasi untuk mendengar ulang panduan suara
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
