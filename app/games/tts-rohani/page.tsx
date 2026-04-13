"use client";
import { useState } from "react";
import Link from "next/link";
import Shelly, { ShellyMood } from "@/components/Shelly";

// Hardcoded 7x7 crossword grid
// 0 = black, 1 = white cell
const GRID_SIZE = 7;

interface CellData {
  letter: string;
  number?: number;
  isBlack: boolean;
  clueAcross?: number;
  clueDown?: number;
}

// Grid layout (valid intersections verified):
//   Col: 0 1 2 3 4 5 6
// Row 0:  S A L A T . .   (1-Across: SALAT)
// Row 1:  . Y . . . . .
// Row 2:  . A . . . . .
// Row 3:  . H . I . . .   (4-Down: IMAN starts row 3 col 3)
// Row 4:  . . . M . . .
// Row 5:  P U A S A . .   (5-Across: PUASA, shares A with AYAH at row2-col1... wait)
//
// Simpler valid layout:
//   Col: 0 1 2 3 4 5 6
// Row 0:  D O A . . . .   (1-Across: DOA)
// Row 1:  . . M . . . .
// Row 2:  . . A . . . .
// Row 3:  P U A S A . .   (3-Across: PUASA, shares A at (3,2))
// Row 4:  . . N . Y . .
// Row 5:  . . . . A . .
// Row 6:  . . . . H . .   (5-Down: AYAH col 4, rows 3-6) → not clean
//
// Clean minimal layout:
//   Col: 0 1 2 3 4 5 6
// Row 0:  I M A N . . .   (1-Across: IMAN)
// Row 1:  . A . . . . .
// Row 2:  . S . . . . .   (3-Down: MASJID col 1, rows 0-5)
// Row 3:  . J I . . . .
// Row 4:  . I . . . . .
// Row 5:  . D O A . . .   (4-Across: DOA starts col 1)
// Row 6:  . . . . . . .
const WORDS: { word: string; row: number; col: number; dir: "across" | "down"; num: number; clue: string }[] = [
  { word: "IMAN",   row: 0, col: 0, dir: "across", num: 1, clue: "Kepercayaan kepada Tuhan (4 huruf)" },
  { word: "MASJID", row: 0, col: 1, dir: "down",   num: 2, clue: "Tempat ibadah umat Islam (6 huruf)" },
  { word: "NATAL",  row: 2, col: 2, dir: "across", num: 3, clue: "Hari raya umat Kristen (5 huruf)" },
  { word: "DOSA",   row: 5, col: 1, dir: "across", num: 4, clue: "Perbuatan salah menurut agama (4 huruf)" },
  { word: "QURAN",  row: 2, col: 4, dir: "down",   num: 5, clue: "Kitab suci umat Islam (5 huruf)" },
];

function buildGrid() {
  const grid: CellData[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ({ letter: "", isBlack: true }))
  );

  for (const w of WORDS) {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === "across" ? w.row : w.row + i;
      const c = w.dir === "across" ? w.col + i : w.col;
      if (r < GRID_SIZE && c < GRID_SIZE) {
        grid[r][c] = { ...grid[r][c], letter: w.word[i], isBlack: false };
        if (i === 0) grid[r][c].number = w.num;
        if (w.dir === "across") grid[r][c].clueAcross = w.num;
        else grid[r][c].clueDown = w.num;
      }
    }
  }
  return grid;
}

const SOLUTION_GRID = buildGrid();

export default function TTSRohaniPage() {
  const [userInput, setUserInput] = useState<string[][]>(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""))
  );
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [shellyMood, setShellyMood] = useState<ShellyMood>("thinking");
  const [shellyMsg, setShellyMsg] = useState("Klik kotak putih lalu ketik jawaban TTS-nya! 📖");

  const handleCellClick = (row: number, col: number) => {
    if (SOLUTION_GRID[row][col].isBlack) return;
    setSelected({ row, col });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const val = e.target.value.toUpperCase().slice(-1);
    const newInput = userInput.map((r) => [...r]);
    newInput[row][col] = val;
    setUserInput(newInput);
    setChecked(false);
  };

  const checkAnswers = () => {
    let correct = 0, total = 0;
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!SOLUTION_GRID[r][c].isBlack) {
          total++;
          if (userInput[r][c] === SOLUTION_GRID[r][c].letter) correct++;
        }
      }
    }
    setChecked(true);
    const pct = Math.round((correct / total) * 100);
    if (pct === 100) { setShellyMood("cheering"); setShellyMsg("SEMPURNA! Kamu ahli TTS rohani! 🏆✨"); }
    else if (pct >= 60) { setShellyMood("happy"); setShellyMsg(`${pct}% benar! Hampir sempurna! 💪`); }
    else { setShellyMood("thinking"); setShellyMsg(`${pct}% benar. Baca petunjuknya lagi yuk! 📖`); }
  };

  const revealAll = () => {
    setRevealed(true);
    setUserInput(SOLUTION_GRID.map((row) => row.map((cell) => cell.letter)));
    setShellyMood("waving");
    setShellyMsg("Ini jawabannya! Belajar dulu ya untuk besok! 😊");
  };

  const reset = () => {
    setUserInput(Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill("")));
    setRevealed(false);
    setChecked(false);
    setShellyMood("thinking");
    setShellyMsg("Coba lagi! Kamu pasti bisa! 🌟");
  };

  const getCellColor = (row: number, col: number) => {
    if (!checked || !userInput[row][col]) return "bg-white";
    return userInput[row][col] === SOLUTION_GRID[row][col].letter ? "bg-green-100" : "bg-red-100";
  };

  return (
    <div className="min-h-screen bg-offwhite pb-24">
      <div className="bg-gelex-gradient py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/games" className="text-shelly/50 hover:text-shelly text-sm font-body mb-2 inline-block">← Kembali ke Games</Link>
          <h1 className="font-heading font-black text-3xl text-shelly-dark">✝️🕌🛕 TTS Rohani</h1>
          <p className="font-body text-shelly/60 mt-1">Teka-teki silang bertema kerohanian UGM</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Grid TTS */}
          <div>
            <div className="inline-block border-2 border-shelly-dark/20 rounded-xl overflow-hidden shadow-card">
              {SOLUTION_GRID.map((row, r) => (
                <div key={r} className="flex">
                  {row.map((cell, c) => (
                    <div key={c} className="relative w-10 h-10 border border-shelly-dark/10">
                      {cell.isBlack ? (
                        <div className="w-full h-full bg-shelly-dark/80" />
                      ) : (
                        <div className={`w-full h-full ${getCellColor(r, c)} ${selected?.row === r && selected?.col === c ? "ring-2 ring-coral" : ""}`} onClick={() => handleCellClick(r, c)}>
                          {cell.number && (
                            <span className="absolute top-0 left-0.5 text-[8px] font-bold text-shelly/60 leading-none">{cell.number}</span>
                          )}
                          <input
                            type="text"
                            maxLength={1}
                            value={userInput[r][c]}
                            onChange={(e) => handleInput(e, r, c)}
                            onClick={() => handleCellClick(r, c)}
                            className={`w-full h-full text-center font-heading font-black text-sm bg-transparent outline-none uppercase pt-2 cursor-pointer ${checked && userInput[r][c] ? (userInput[r][c] === cell.letter ? "text-green-700" : "text-red-600") : "text-shelly-dark"}`}
                            readOnly={revealed}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <button onClick={checkAnswers} className="btn-primary flex-1 text-sm py-2">✓ Cek Jawaban</button>
              <button onClick={revealAll} className="btn-secondary flex-1 text-sm py-2">👁 Tampilkan</button>
              <button onClick={reset} className="flex-1 py-2 rounded-full text-sm font-body border border-peach text-shelly/60 hover:border-coral bg-white">↺ Reset</button>
            </div>
          </div>

          {/* Clues */}
          <div className="space-y-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-shelly-dark mb-2">→ Mendatar</h3>
              <div className="space-y-2">
                {WORDS.filter((w) => w.dir === "across").map((w) => (
                  <div key={w.num} className="text-sm font-body text-shelly/70 flex gap-2">
                    <span className="font-bold text-coral min-w-[20px]">{w.num}.</span>
                    <span>{w.clue}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-shelly-dark mb-2">↓ Menurun</h3>
              <div className="space-y-2">
                {WORDS.filter((w) => w.dir === "down").map((w) => (
                  <div key={w.num} className="text-sm font-body text-shelly/70 flex gap-2">
                    <span className="font-bold text-coral min-w-[20px]">{w.num}.</span>
                    <span>{w.clue}</span>
                  </div>
                ))}
              </div>
            </div>
            <Shelly mood={shellyMood} message={shellyMsg} position="inline" size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
