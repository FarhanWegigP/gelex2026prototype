"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Glexy, { GlexyMood } from "@/components/Glexy";
import { useAccessibility } from "@/hooks/useAccessibility";

// ── PENALTY KICK ────────────────────────────────────────────
type KickZone = "kiri-atas" | "kiri-bawah" | "tengah-atas" | "tengah-bawah" | "kanan-atas" | "kanan-bawah";

function PenaltyGame() {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState<"goal" | "saved" | null>(null);
  const [keeperPos, setKeeperPos] = useState<KickZone | null>(null);
  const [shellyMood, setGlexyMood] = useState<GlexyMood>("excited");
  const [shellyMsg, setGlexyMsg] = useState("Tendang bolanya! Pilih sudut yang tepat!");
  const { speak } = useAccessibility();

  const zones: { id: KickZone; label: string; ariaLabel: string }[] = [
    { id: "kiri-atas", label: "↖", ariaLabel: "Kiri atas" },
    { id: "tengah-atas", label: "↑", ariaLabel: "Tengah atas" },
    { id: "kanan-atas", label: "↗", ariaLabel: "Kanan atas" },
    { id: "kiri-bawah", label: "←", ariaLabel: "Kiri bawah" },
    { id: "tengah-bawah", label: "⬇", ariaLabel: "Tengah bawah" },
    { id: "kanan-bawah", label: "→", ariaLabel: "Kanan bawah" },
  ];

  const kick = (zone: KickZone) => {
    if (result !== null) return;
    const allZones: KickZone[] = ["kiri-atas", "kiri-bawah", "tengah-atas", "tengah-bawah", "kanan-atas", "kanan-bawah"];
    const keeper = allZones[Math.floor(Math.random() * allZones.length)];
    setKeeperPos(keeper);
    const isGoal = keeper !== zone;
    setResult(isGoal ? "goal" : "saved");
    setAttempts((a) => a + 1);
    if (isGoal) {
      setScore((s) => s + 1);
      setGlexyMood("cheering");
      setGlexyMsg("Gol! Kamu tendang dengan sempurna!");
      speak("Gol! Tendangan sempurna!");
    } else {
      setGlexyMood("sad");
      setGlexyMsg("Kiper menangkap bolanya! Coba lagi!");
      speak("Kiper menangkap bolanya! Coba lagi.");
    }
    setTimeout(() => { setResult(null); setKeeperPos(null); setGlexyMood("excited"); setGlexyMsg("Tendang lagi! Bisa kok!"); }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="font-heading font-black text-2xl text-[#E2E8F0]">Penalti</div>
        <div className="text-sm font-body text-[#94A3B8]" aria-live="polite">
          Gol: <span className="font-bold text-[#38BDF8]">{score}</span> / {attempts} tendangan
        </div>
      </div>

      {/* Goal visualization */}
      <div
        className="relative bg-green-100 rounded-2xl overflow-hidden h-40 border-2 border-green-300"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 w-full h-1/3 bg-green-200" />
        <div className="absolute top-4 left-8 right-8 bottom-1/3 border-4 border-white rounded-t-lg bg-white/10" />
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl transition-all duration-500 ${result === "goal" ? "-translate-y-20 opacity-0" : ""}`}>⚽</div>
        {keeperPos && (
          <div
            className={`absolute text-2xl transition-all duration-300 ${
              keeperPos.includes("kiri") ? "left-12" : keeperPos.includes("kanan") ? "right-12" : "left-1/2 -translate-x-1/2"
            } ${keeperPos.includes("atas") ? "top-6" : "bottom-10"}`}
          >
            🧤
          </div>
        )}
        {result && (
          <div className={`absolute inset-0 flex items-center justify-center text-3xl font-heading font-black ${result === "goal" ? "text-green-600" : "text-red-500"}`}>
            {result === "goal" ? "GOL!" : "SAVED!"}
          </div>
        )}
      </div>

      {/* Kick zones */}
      <div>
        <p className="text-sm font-body text-[#94A3B8] mb-3 text-center" id="kick-instructions">
          Pilih arah tendangan:
        </p>
        <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="kick-instructions">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => kick(zone.id)}
              disabled={result !== null}
              aria-label={`Tendang ke ${zone.ariaLabel}`}
              className="bg-[#0D1B4B] border-2 border-[#38BDF8]/20 rounded-xl py-4 text-2xl font-heading font-black text-[#38BDF8] hover:border-[#38BDF8]/50 hover:bg-[#38BDF8]/10 transition-all active:scale-95 disabled:opacity-40"
            >
              <span aria-hidden="true">{zone.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Glexy mood={shellyMood} message={shellyMsg} position="inline" size="sm" />
    </div>
  );
}

// ── BASKETBALL ──────────────────────────────────────────────
function BasketGame() {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [power, setPower] = useState(50);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<"masuk" | "meleset" | null>(null);
  const [shellyMood, setGlexyMood] = useState<GlexyMood>("excited");
  const [shellyMsg, setGlexyMsg] = useState("Stop power bar di tengah untuk peluang terbaik!");
  const { speak } = useAccessibility();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dirRef = useRef(1);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startStop = () => {
    if (!running) {
      setRunning(true);
      setResult(null);
      intervalRef.current = setInterval(() => {
        setPower((p) => {
          const next = p + dirRef.current * 3;
          if (next >= 100 || next <= 0) dirRef.current *= -1;
          return Math.max(0, Math.min(100, next));
        });
      }, 30);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setRunning(false);
      setAttempts((a) => a + 1);
      const center = Math.abs(power - 50);
      const isIn = center < 18;
      setResult(isIn ? "masuk" : "meleset");
      if (isIn) {
        setScore((s) => s + 1);
        setGlexyMood("cheering");
        setGlexyMsg("Masuk! Tembakan sempurna!");
        speak("Masuk! Tembakan sempurna!");
      } else {
        setGlexyMood("sad");
        setGlexyMsg("Meleset! Stop lebih dekat ke tengah ya!");
        speak("Meleset. Stop lebih dekat ke tengah.");
      }
      setTimeout(() => { setResult(null); setGlexyMood("excited"); setGlexyMsg("Coba lagi! Kamu bisa!"); setPower(50); }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="font-heading font-black text-2xl text-[#E2E8F0]">Lempar Basket</div>
        <div className="text-sm font-body text-[#94A3B8]" aria-live="polite">
          Masuk: <span className="font-bold text-[#38BDF8]">{score}</span> / {attempts} lemparan
        </div>
      </div>

      {/* Hoop visual */}
      <div className="relative bg-orange-50 rounded-2xl h-32 flex items-center justify-center border-2 border-orange-200 overflow-hidden" aria-hidden="true">
        <div className="text-5xl">🏀</div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl">🏀</div>
        {result && (
          <div className={`absolute inset-0 flex items-center justify-center text-3xl font-heading font-black ${result === "masuk" ? "text-green-600" : "text-red-500"}`}>
            {result === "masuk" ? "MASUK!" : "MELESET!"}
          </div>
        )}
      </div>

      {/* Power bar */}
      <div>
        <p className="text-sm font-body text-[#94A3B8] mb-2 text-center" id="power-instructions">
          Power Bar — Stop di zona hijau!
        </p>
        <div
          className="relative h-8 bg-[#38BDF8]/10 rounded-full overflow-hidden border border-[#38BDF8]/15"
          role="meter"
          aria-label={`Power bar: ${power}%. Zona tepat antara 32% dan 68%.`}
          aria-valuenow={power}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="absolute top-0 bottom-0 bg-green-200/60 rounded-full" style={{ left: "32%", width: "36%" }} aria-hidden="true" />
          <div
            className="absolute top-1 bottom-1 w-5 bg-coral rounded-full shadow-sm transition-none"
            style={{ left: `calc(${power}% - 10px)` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-body text-[#94A3B8] pointer-events-none" aria-hidden="true">
            {power < 32 ? "Terlalu lemah" : power > 68 ? "Terlalu kuat" : "Zona tepat!"}
          </div>
        </div>
      </div>

      <button
        onClick={startStop}
        disabled={result !== null}
        aria-label={running ? "Stop power bar dan lempar bola" : "Mulai power bar"}
        className={`w-full py-4 rounded-2xl font-heading font-black text-lg transition-all duration-150 ${running ? "bg-coral text-white" : "btn-primary"} disabled:opacity-40`}
      >
        {running ? "STOP!" : result ? "Menghitung..." : "LEMPAR!"}
      </button>

      <Glexy mood={shellyMood} message={shellyMsg} position="inline" size="sm" />
    </div>
  );
}

// ── MAIN PAGE ───────────────────────────────────────────────
const PAGE_GREETING =
  "Kamu sedang di halaman Game Olahraga. Ada dua pilihan game: Penalti dan Lempar Basket. Pada game Penalti, pilih arah tendangan menggunakan tombol Tab dan Enter. Pada game Basket, tekan tombol Lempar untuk memulai power bar, lalu tekan lagi untuk menghentikannya di zona hijau.";

export default function OlahragaPage() {
  const [activeGame, setActiveGame] = useState<"penalti" | "basket">("penalti");
  const { autoGreetOnMount } = useAccessibility();

  useEffect(() => {
    return autoGreetOnMount(PAGE_GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#060B18] pb-24">
      <div
        className="bg-gradient-to-br from-[#060B18] via-[#0D1B4B] to-[#120A3B] py-12 px-6 border-b border-[#38BDF8]/10"
        data-section="header"
        data-narration={PAGE_GREETING}
        tabIndex={-1}
      >
        <div className="max-w-2xl mx-auto">
          <Link href="/games" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-body mb-2 inline-block" aria-label="Kembali ke halaman Games">
            ← Kembali ke Games
          </Link>
          <h1 className="font-heading font-black text-3xl text-[#E2E8F0]">Game Olahraga</h1>
          <p className="font-body text-[#94A3B8] mt-1">Tunjukkan kemampuan atletismu!</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-8">
        {/* Tab switcher */}
        <div className="flex gap-3 mb-8" role="tablist" aria-label="Pilih game olahraga">
          <button
            role="tab"
            aria-selected={activeGame === "penalti"}
            onClick={() => setActiveGame("penalti")}
            className={`flex-1 py-3 rounded-2xl font-heading font-bold transition-all duration-150 ${activeGame === "penalti" ? "bg-[#38BDF8] text-[#060B18]" : "bg-white/5 border border-[#38BDF8]/15 text-[#94A3B8]"}`}
          >
            Penalti
          </button>
          <button
            role="tab"
            aria-selected={activeGame === "basket"}
            onClick={() => setActiveGame("basket")}
            className={`flex-1 py-3 rounded-2xl font-heading font-bold transition-all duration-150 ${activeGame === "basket" ? "bg-[#38BDF8] text-[#060B18]" : "bg-white/5 border border-[#38BDF8]/15 text-[#94A3B8]"}`}
          >
            Basket
          </button>
        </div>

        <div className="card-gelex p-6">
          {activeGame === "penalti" ? <PenaltyGame /> : <BasketGame />}
        </div>
      </div>
    </div>
  );
}
