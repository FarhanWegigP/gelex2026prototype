"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Glexy from "@/components/Glexy";
import { useAccessibility } from "@/hooks/useAccessibility";

// ── DRAWING CANVAS ──────────────────────────────────────────
function DrawingGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#E8896A");
  const [brushSize, setBrushSize] = useState(6);
  const [isEraser, setIsEraser] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDrawing(true);
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current!.x, lastPos.current!.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isEraser ? "#FFF8F0" : color;
    ctx.lineWidth = isEraser ? brushSize * 3 : brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDraw = () => { setDrawing(false); lastPos.current = null; };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#FFF8F0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "karya-gelex.png";
    a.href = canvas.toDataURL();
    a.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#FFF8F0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const colors = ["#E8896A", "#F4A98A", "#FADADD", "#FDC84A", "#3d2c1e", "#4A90D9", "#7ED321", "#FF6B6B", "#9B59B6", "#FFFFFF"];

  return (
    <div className="space-y-4">
      <div className="font-heading font-black text-2xl text-[#E2E8F0]">Kanvas Gambar</div>

      <canvas
        ref={canvasRef}
        width={600}
        height={350}
        className="w-full rounded-2xl border-2 border-[#38BDF8]/20 cursor-crosshair bg-[#0D1B4B] touch-none"
        style={{ background: "#FFF8F0" }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
        aria-label="Kanvas gambar. Klik dan seret untuk menggambar."
        role="img"
      />

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1.5 flex-wrap" role="group" aria-label="Pilih warna kuas">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => { setColor(c); setIsEraser(false); }}
              className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${color === c && !isEraser ? "border-shelly-dark scale-110" : "border-transparent"}`}
              style={{ background: c }}
              aria-label={`Pilih warna ${c}`}
              aria-pressed={color === c && !isEraser}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="brush-size" className="text-xs text-[#94A3B8] font-body">Ukuran kuas:</label>
          <input
            id="brush-size"
            type="range"
            min={2}
            max={20}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20"
            aria-label={`Ukuran kuas: ${brushSize}`}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsEraser(!isEraser)}
          aria-pressed={isEraser}
          className={`flex-1 py-2 rounded-xl text-sm font-body font-semibold border-2 transition-all ${isEraser ? "bg-[#38BDF8]/10 border-[#38BDF8] text-[#38BDF8]" : "bg-white border-[#38BDF8]/15 text-[#38BDF8]/70"}`}
        >
          {isEraser ? "Eraser Aktif" : "Eraser"}
        </button>
        <button
          onClick={clearCanvas}
          className="flex-1 py-2 rounded-xl text-sm font-body font-semibold bg-white/5 border-2 border-[#38BDF8]/15 text-[#38BDF8]/70 hover:border-coral"
          aria-label="Hapus semua gambar di kanvas"
        >
          Hapus Semua
        </button>
        <button
          onClick={download}
          className="flex-1 py-2 rounded-xl text-sm font-body font-semibold bg-[#E8896A] text-white hover:bg-[#D0775A] transition-colors"
          aria-label="Unduh gambar sebagai file PNG"
        >
          Simpan
        </button>
      </div>

      <Glexy mood="happy" message="Wah kamu berbakat! Gambar Glexy juga dong!" position="inline" size="sm" />
    </div>
  );
}

// ── GARAGE BAND ─────────────────────────────────────────────
const NOTES = [
  { label: "Do",  freq: 261.63, color: "#FADADD" },
  { label: "Re",  freq: 293.66, color: "#FDEEC9" },
  { label: "Mi",  freq: 329.63, color: "#F4A98A" },
  { label: "Fa",  freq: 349.23, color: "#FADADD" },
  { label: "Sol", freq: 392.0,  color: "#FDEEC9" },
  { label: "La",  freq: 440.0,  color: "#F4A98A" },
  { label: "Si",  freq: 493.88, color: "#FADADD" },
  { label: "Do'", freq: 523.25, color: "#FDEEC9" },
];

function GarageBandGame() {
  const [active, setActive] = useState<number | null>(null);
  const [recording, setRecording] = useState(false);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    return audioCtxRef.current;
  };

  const playNote = (freq: number, noteIdx: number, duration = 0.4) => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setActive(noteIdx);
    setTimeout(() => setActive(null), duration * 1000);
  };

  const handlePress = (idx: number) => {
    playNote(NOTES[idx].freq, idx);
    if (recording) setSequence((s) => [...s, idx]);
  };

  const playSequence = async () => {
    if (playing || sequence.length === 0) return;
    setPlaying(true);
    for (let i = 0; i < sequence.length; i++) {
      playNote(NOTES[sequence[i]].freq, sequence[i]);
      await new Promise((r) => setTimeout(r, 500));
    }
    setPlaying(false);
  };

  return (
    <div className="space-y-5">
      <div className="font-heading font-black text-2xl text-[#E2E8F0]">Garage Band Lite</div>
      <p className="text-sm font-body text-[#94A3B8]">Tekan tombol-tombol nada untuk bermain musik!</p>

      {/* Piano keys */}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8" role="group" aria-label="Tombol nada musik">
        {NOTES.map((note, idx) => (
          <button
            key={idx}
            onMouseDown={() => handlePress(idx)}
            onTouchStart={(e) => { e.preventDefault(); handlePress(idx); }}
            aria-label={`Nada ${note.label}`}
            className={`py-8 rounded-2xl font-heading font-black text-sm border-2 border-shelly/10 transition-all active:scale-95 select-none ${active === idx ? "scale-95 shadow-none brightness-90" : "shadow-warm hover:scale-105"}`}
            style={{ background: note.color }}
          >
            <div className="text-[#E2E8F0]">{note.label}</div>
          </button>
        ))}
      </div>

      {/* Record controls */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => { setRecording(!recording); if (!recording) setSequence([]); }}
          aria-pressed={recording}
          aria-label={recording ? "Stop rekam melodi" : "Mulai rekam melodi"}
          className={`flex-1 py-3 rounded-2xl font-heading font-bold text-sm transition-all ${recording ? "bg-red-400 text-white animate-pulse" : "bg-white/5 border-2 border-[#38BDF8]/15 text-[#38BDF8]/70"}`}
        >
          {recording ? "Stop Rekam" : "Rekam Melodi"}
        </button>
        <button
          onClick={playSequence}
          disabled={playing || sequence.length === 0}
          aria-label={`Putar melodi yang direkam, ${sequence.length} nada`}
          className="flex-1 py-3 rounded-2xl font-heading font-bold text-sm bg-[#E8896A] text-white disabled:opacity-40 hover:bg-[#D0775A] transition-colors"
        >
          {playing ? "Memutar..." : `Putar (${sequence.length} nada)`}
        </button>
        <button
          onClick={() => setSequence([])}
          aria-label="Hapus rekaman"
          className="px-4 py-3 rounded-2xl font-body text-sm bg-white/5 border border-[#38BDF8]/15 text-[#94A3B8] hover:border-coral"
        >
          Hapus
        </button>
      </div>

      {sequence.length > 0 && (
        <div className="flex flex-wrap gap-1" aria-label={`Melodi terekam: ${sequence.map((i) => NOTES[i].label).join(", ")}`}>
          {sequence.map((idx, i) => (
            <span key={i} className="text-xs bg-[#38BDF8]/10 text-[#38BDF8] px-2 py-0.5 rounded-full font-body">{NOTES[idx].label}</span>
          ))}
        </div>
      )}

      <Glexy mood="excited" message="Musiknya keren! Glexy mau joget!" position="inline" size="sm" />
    </div>
  );
}

// ── MAIN PAGE ───────────────────────────────────────────────
const PAGE_GREETING =
  "Kamu di halaman Game Seni. Ada dua pilihan: Kanvas Gambar untuk menggambar bebas, dan Garage Band Lite untuk membuat melodi. Pilih tab di bawah untuk berganti game.";

export default function GambarPage() {
  const [activeGame, setActiveGame] = useState<"gambar" | "musik">("gambar");
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
        <div className="max-w-3xl mx-auto">
          <Link href="/games" className="text-[#94A3B8] hover:text-[#38BDF8] transition-colors text-sm font-body mb-2 inline-block" aria-label="Kembali ke halaman Games">
            ← Kembali ke Games
          </Link>
          <h1 className="font-heading font-black text-3xl text-[#E2E8F0]">Game Seni</h1>
          <p className="font-body text-[#94A3B8] mt-1">Ekspresikan kreativitasmu!</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-8">
        <div className="flex gap-3 mb-8" role="tablist" aria-label="Pilih jenis game seni">
          <button
            role="tab"
            aria-selected={activeGame === "gambar"}
            onClick={() => setActiveGame("gambar")}
            className={`flex-1 py-3 rounded-2xl font-heading font-bold transition-all duration-150 ${activeGame === "gambar" ? "bg-[#38BDF8] text-[#060B18]" : "bg-white border border-[#38BDF8]/15 text-[#38BDF8]/70"}`}
          >
            Kanvas
          </button>
          <button
            role="tab"
            aria-selected={activeGame === "musik"}
            onClick={() => setActiveGame("musik")}
            className={`flex-1 py-3 rounded-2xl font-heading font-bold transition-all duration-150 ${activeGame === "musik" ? "bg-[#38BDF8] text-[#060B18]" : "bg-white border border-[#38BDF8]/15 text-[#38BDF8]/70"}`}
          >
            Musik
          </button>
        </div>
        <div className="card-gelex p-6">
          {activeGame === "gambar" ? <DrawingGame /> : <GarageBandGame />}
        </div>
      </div>
    </div>
  );
}
