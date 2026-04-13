"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSpeech } from "@/hooks/useSpeech";
import { useAccessibility } from "@/hooks/useAccessibility";
import GalaxyOrnament from "@/components/GalaxyOrnament";

type Phase = "intro" | "speaking" | "leaving" | "done";

const INTRO_SPEECH =
  "Hi aku Glexy! Yang akan jadi pemandu untuk masuk ke Glora Imaji Gelex!";

const PAGE_GREETING =
  "Halo! Aku Glexy, maskot bintang GELEX 2026. Kamu sedang di halaman pembuka website Gelanggang Expo — expo tahunan UKM Universitas Gadjah Mada. Ada satu tombol di tengah halaman bernama Mulai Jelajahi. Tekan Tab lalu Enter untuk masuk. Tekan Spasi kapanpun untuk aku ulangi, Escape untuk berhenti, atau Alt M untuk matikan suara.";

// Galaxy-themed celebration particles
const CELEBRATION_RINGS = [
  { size: 300, color: "rgba(56,189,248,0.15)", x: "-26%", y: "-22%" },
  { size: 220, color: "rgba(129,140,248,0.2)", x: "84%", y: "2%" },
  { size: 180, color: "rgba(52,211,153,0.12)", x: "72%", y: "68%" },
];

const CELEBRATION_STARS = [
  { left: "9%",  top: "18%", color: "#38BDF8", delay: 0.05 },
  { left: "21%", top: "10%", color: "#818CF8", delay: 0.18 },
  { left: "78%", top: "14%", color: "#34D399", delay: 0.12 },
  { left: "88%", top: "24%", color: "#38BDF8", delay: 0.25 },
  { left: "15%", top: "72%", color: "#818CF8", delay: 0.3  },
  { left: "84%", top: "76%", color: "#38BDF8", delay: 0.38 },
];

export default function SplashPage() {
  const router = useRouter();
  const { speak, stop, isSpeaking, isSupported } = useSpeech();
  const { autoGreetOnMount } = useAccessibility();
  const [phase, setPhase] = useState<Phase>("intro");
  const speechStartedRef = useRef(false);
  const prevSpeakingRef = useRef(false);
  const isNavigatingRef = useRef(false);

  const goToBeranda = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    stop();
    router.push("/beranda");
  }, [router, stop]);

  useEffect(() => {
    return autoGreetOnMount(PAGE_GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("speaking");
      speak(INTRO_SPEECH);
      speechStartedRef.current = true;
    }, 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prevSpeakingRef.current && !isSpeaking && speechStartedRef.current && phase === "speaking") {
      const t = setTimeout(() => setPhase("leaving"), 350);
      return () => clearTimeout(t);
    }
    prevSpeakingRef.current = isSpeaking;
  }, [isSpeaking, phase]);

  useEffect(() => {
    if (isSupported) return;
    const t = setTimeout(() => {
      if (phase === "intro" || phase === "speaking") setPhase("leaving");
    }, 3200);
    return () => clearTimeout(t);
  }, [isSupported, phase]);

  useEffect(() => {
    const handleWheel = () => goToBeranda();
    const handleTouchMove = () => goToBeranda();
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("button,a,input,textarea,select")) return;
      goToBeranda();
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [goToBeranda]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#060B18] via-[#0D1B4B] to-[#120A3B]">
      <GalaxyOrnament />

      {/* Nebula glow centers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] bg-[#38BDF8]/5" />
        <div className="absolute top-2/3 left-1/4 w-[400px] h-[300px] rounded-full blur-[80px] bg-[#818CF8]/6" />
      </div>

      {/* Celebration particles on leaving */}
      {(phase === "leaving" || phase === "done") && (
        <>
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {CELEBRATION_RINGS.map((ring) => (
              <motion.div
                key={`${ring.x}-${ring.y}`}
                className="absolute rounded-full blur-2xl"
                style={{ width: ring.size, height: ring.size, background: ring.color, left: ring.x, top: ring.y }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            ))}
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {CELEBRATION_STARS.map((piece, index) => (
              <motion.span
                key={`${piece.left}-${piece.top}`}
                className="absolute"
                style={{
                  left: piece.left, top: piece.top,
                  fontSize: index % 2 === 0 ? "20px" : "14px",
                }}
                initial={{ opacity: 0, scale: 0, rotate: -40 }}
                animate={{ opacity: [0, 1, 1], scale: [0, 1.2, 1], y: [0, -20, 0], rotate: [0, 30, 0] }}
                transition={{ duration: 1.2, delay: piece.delay, ease: "easeOut" }}
              >
                ⭐
              </motion.span>
            ))}
          </div>
        </>
      )}

      {/* ── Intro overlay ─────────────────────────────── */}
      <AnimatePresence>
        {(phase === "intro" || phase === "speaking") && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.6 } }}
          >
            {/* Big Glexy */}
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.22, x: "42vw", y: "40vh", opacity: 0, transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] } }}
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative">
                  <Image
                    src="/shelly.png"
                    alt="Glexy, maskot GELEX 2026"
                    width={210}
                    height={210}
                    priority
                    style={{ objectFit: "contain", filter: "drop-shadow(0 0 30px rgba(56,189,248,0.5))" }}
                    className="drop-shadow-2xl"
                    aria-hidden="true"
                  />
                  {/* Orbit stars */}
                  {[0, 120, 240].map((deg, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                      style={{
                        background: i === 0 ? "#38BDF8" : i === 1 ? "#818CF8" : "#34D399",
                        boxShadow: `0 0 8px ${i === 0 ? "#38BDF8" : i === 1 ? "#818CF8" : "#34D399"}`,
                        marginTop: -6, marginLeft: -6,
                      }}
                      animate={{ rotate: [deg, deg + 360] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
                      transformTemplate={({ rotate }) => `rotate(${rotate}) translateX(120px)`}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Speech bubble */}
            <AnimatePresence>
              {phase === "speaking" && (
                <motion.div
                  key="bubble"
                  initial={{ opacity: 0, y: 24, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative mt-7 w-[min(88vw,30rem)]"
                  role="status"
                  aria-live="polite"
                >
                  <div className="absolute inset-0 rounded-[2rem] bg-[#0D1B4B]/80 shadow-[0_20px_60px_rgba(56,189,248,0.2)]" />
                  <div className="absolute -inset-[1px] rounded-[2rem] border border-[#38BDF8]/30" />

                  <div className="relative overflow-hidden rounded-[2rem] border border-[#38BDF8]/20 bg-[#0D1B4B]/90 backdrop-blur-md px-7 py-5 text-center">
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#34D399]" />
                    <div className="mb-3 flex items-center justify-center gap-2">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 overflow-hidden p-1">
                        <Image
                          src="/logo-icon.svg"
                          alt="Logo GELEX"
                          width={28}
                          height={28}
                          className="h-7 w-7 object-contain"
                        />
                      </span>
                      <div className="text-left">
                        <p className="font-heading text-sm font-bold uppercase tracking-[0.24em] text-[#38BDF8]">
                          Glexy Lagi Cerita
                        </p>
                        <p className="text-[11px] font-body text-[#94A3B8]">
                          Intro pembuka GELEX 2026
                        </p>
                      </div>
                    </div>

                    <p className="text-[#E2E8F0] font-body text-lg leading-relaxed md:text-[1.15rem]">
                      {INTRO_SPEECH}
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-3">
                      <div className="h-px w-10 bg-[#38BDF8]/20" />
                      {isSpeaking ? (
                        <div className="flex gap-1.5 justify-center" aria-hidden="true">
                          {[0, 150, 300, 150, 0].map((delay, i) => (
                            <span
                              key={i}
                              className="w-1.5 h-4 bg-[#38BDF8]/70 rounded-full animate-bounce"
                              style={{ animationDelay: `${delay}ms` }}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-3 py-1 text-[11px] font-body text-[#38BDF8]">
                          Siap masuk GELEX
                        </span>
                      )}
                      <div className="h-px w-10 bg-[#38BDF8]/20" />
                    </div>

                    <div className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 border-r border-b border-[#38BDF8]/20 bg-[#0D1B4B]/90" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skip */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              onClick={() => goToBeranda()}
              className="absolute bottom-10 text-sm font-body text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
              aria-label="Lewati intro Glexy"
            >
              Lewati →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Corner Glexy (after intro) ──────────────────────── */}
      <AnimatePresence>
        {(phase === "leaving" || phase === "done") && (
          <motion.div
            key="corner-glexy"
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
                style={{ objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(56,189,248,0.5))" }}
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
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            data-section="splash"
            data-narration={PAGE_GREETING}
            tabIndex={-1}
          >
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#38BDF8]/20 bg-[#38BDF8]/10 px-4 py-2 text-[11px] font-body uppercase tracking-[0.28em] text-[#38BDF8] shadow-[0_12px_30px_rgba(56,189,248,0.1)] backdrop-blur-sm"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55 }}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#34D399] animate-pulse" />
              Panggung GELEX Sudah Siap
            </motion.div>

            <motion.h1
              className="font-heading font-bold text-8xl md:text-[10rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#34D399] mb-3 drop-shadow-sm"
              initial={{ scale: 0.7, opacity: 0, rotateX: 24 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.34, duration: 0.9, type: "spring", bounce: 0.3 }}
            >
              GELEX
            </motion.h1>

            <motion.p
              className="text-2xl font-heading text-[#38BDF8] mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Gelanggang Expo 2026
            </motion.p>

            <motion.p
              className="text-base font-body text-[#94A3B8] mb-8 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              Where Creativity Comes Alive and Talent Shines
            </motion.p>

            <motion.div
              className="mx-auto mb-8 flex max-w-md items-center justify-center gap-3"
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.82, duration: 0.55 }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-[#38BDF8]/70" />
              <span className="rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-4 py-1 text-xs font-body text-[#94A3B8] shadow-sm backdrop-blur-sm">
                Festival UKM terbesar UGM
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#38BDF8]/30 to-[#38BDF8]/70" />
            </motion.div>

            {/* Date badge */}
            <motion.div
              className="inline-block mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="bg-[#0D1B4B]/80 backdrop-blur-sm px-7 py-2.5 rounded-full shadow-[0_2px_16px_rgba(56,189,248,0.15)] border border-[#38BDF8]/20">
                <p className="text-[#38BDF8] font-heading font-semibold text-base">
                  1–3 Agustus 2026
                </p>
                <p className="text-[11px] text-[#94A3B8] font-body mt-0.5">
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
                onClick={goToBeranda}
                className="btn-primary text-lg px-14 py-4"
                aria-label="Masuk ke halaman beranda GELEX 2026"
              >
                Mulai Jelajahi
              </button>
              <p className="mt-4 text-xs text-[#94A3B8]/60 font-body">
                Klik atau scroll untuk langsung masuk ke beranda
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
