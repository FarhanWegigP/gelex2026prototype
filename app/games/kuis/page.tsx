"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Shelly, { ShellyMood } from "@/components/Shelly";
import { useAccessibility } from "@/hooks/useAccessibility";
import { quizQuestions } from "@/data";

type GameState = "start" | "playing" | "result";

const TIMER_PER_QUESTION = 15;

const PAGE_GREETING =
  "Kamu di halaman Kuis UKM. Ada 10 pertanyaan dengan 15 detik per soal. Masukkan namamu lalu tekan Enter atau tombol Mulai Kuis untuk memulai. Saat kuis berlangsung, tekan angka 1, 2, 3, atau 4 untuk menjawab pertanyaan.";

export default function KuisPage() {
  const [state, setState] = useState<GameState>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timer, setTimer] = useState(TIMER_PER_QUESTION);
  const [shellyMood, setShellyMood] = useState<ShellyMood>("excited");
  const [shellyMsg, setShellyMsg] = useState("Ayo mulai kuis! Siap menguji pengetahuanmu?");
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);
  const [playerName, setPlayerName] = useState("");
  const { autoGreetOnMount, speak } = useAccessibility();

  const question = quizQuestions[currentIndex];
  const isAnswered = selected !== null;
  const handleAnswerRef = useRef<(idx: number) => void>(() => {});

  useEffect(() => {
    return autoGreetOnMount(PAGE_GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load leaderboard
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gelex-quiz-leaderboard");
      if (saved) setLeaderboard(JSON.parse(saved));
    } catch {}
  }, []);

  // Keep ref current
  useEffect(() => { handleAnswerRef.current = handleAnswer; });

  // Timer countdown
  useEffect(() => {
    if (state !== "playing" || isAnswered) return;
    if (timer <= 0) {
      handleAnswerRef.current(-1);
      return;
    }
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, state, isAnswered]);

  // Auto-read question when it changes
  useEffect(() => {
    if (state !== "playing" || !question) return;
    const text = `Pertanyaan ${currentIndex + 1} dari ${quizQuestions.length}. Waktu tersisa ${timer} detik. ${question.question}. Pilihan: ${question.options.map((o, i) => `${i + 1}: ${o}`).join(". ")}. Tekan angka 1 sampai 4 untuk menjawab.`;
    const t = setTimeout(() => speak(text), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, state]);

  const handleAnswer = useCallback(
    (optionIdx: number) => {
      if (isAnswered) return;
      setSelected(optionIdx);
      const correct = optionIdx === question.correctAnswer;
      if (correct) {
        setScore((s) => s + 1);
        setShellyMood("cheering");
        setShellyMsg(question.shellyReaction);
        speak(`Benar! ${question.shellyReaction}`);
      } else {
        setShellyMood("sad");
        const wrongMsg = "Hampir! Jawabannya adalah: " + question.options[question.correctAnswer] + " — tetap semangat!";
        setShellyMsg(wrongMsg);
        speak(`Salah. ${wrongMsg}`);
      }
      setTimeout(() => {
        if (currentIndex + 1 >= quizQuestions.length) {
          setState("result");
        } else {
          setCurrentIndex((i) => i + 1);
          setSelected(null);
          setTimer(TIMER_PER_QUESTION);
          setShellyMood("thinking");
          setShellyMsg("Pertanyaan berikutnya! Kamu bisa!");
        }
      }, 1800);
    },
    [isAnswered, question, currentIndex, speak]
  );

  // Keyboard shortcuts: 1-4 to answer
  useEffect(() => {
    if (state !== "playing") return;
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      const idx = parseInt(e.key) - 1;
      if (idx >= 0 && idx <= 3) {
        e.preventDefault();
        handleAnswerRef.current(idx);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state]);

  const handleStart = () => {
    if (!playerName.trim()) return;
    setState("playing");
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setTimer(TIMER_PER_QUESTION);
    setShellyMood("excited");
    setShellyMsg("Pertanyaan pertama nih! Jangan terburu-buru ya!");
  };

  const handleRestart = () => {
    const newEntry = { name: playerName, score };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setLeaderboard(updated);
    try { localStorage.setItem("gelex-quiz-leaderboard", JSON.stringify(updated)); } catch {}
    setState("start");
    setPlayerName("");
  };

  const finalMsg =
    score >= 8
      ? `${score}/10! Kamu jenius UKM UGM! Shelly bangga!`
      : score >= 5
      ? `${score}/10 — Lumayan! Rajin-rajin kunjungi booth UKM ya!`
      : `${score}/10 — Yuk pelajari lebih lanjut tentang UKM UGM! Shelly sayang kamu!`;

  const finalMood: ShellyMood = score >= 8 ? "cheering" : score >= 5 ? "happy" : "waving";

  return (
    <div className="min-h-screen bg-offwhite pb-24">
      {/* Header */}
      <div
        className="bg-gelex-gradient py-12 px-6"
        data-section="header"
        data-narration={PAGE_GREETING}
        tabIndex={-1}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/games" className="text-shelly/50 hover:text-shelly text-sm font-body mb-2 inline-block" aria-label="Kembali ke halaman Games">
              ← Kembali ke Games
            </Link>
            <h1 className="font-heading font-black text-3xl text-shelly-dark">Kuis UKM</h1>
            <p className="font-body text-shelly/60 mt-1">Uji pengetahuanmu tentang UKM UGM!</p>
          </div>
          {state === "playing" && (
            <div className="text-right" aria-live="polite" aria-label={`Waktu tersisa ${timer} detik, skor ${score}`}>
              <div className="font-heading font-black text-4xl text-coral">{timer}s</div>
              <div className="text-xs text-shelly/50 font-body">tersisa</div>
              <div className="text-sm font-body text-shelly/60 mt-1">
                Skor: {score} / {isAnswered ? currentIndex + 1 : currentIndex} soal
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-8">
        {/* START screen */}
        {state === "start" && (
          <div className="card-gelex p-8 text-center">
            <h2 className="font-heading font-black text-2xl text-shelly-dark mb-2">Siap Bermain?</h2>
            <p className="font-body text-shelly/60 mb-6">
              10 pertanyaan, 15 detik per soal. Seberapa banyak yang kamu tahu tentang UKM UGM?
            </p>
            <input
              type="text"
              placeholder="Masukkan namamu..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              aria-label="Nama pemain"
              className="w-full px-4 py-3 rounded-2xl border border-peach font-body text-shelly-dark focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 mb-4 text-center text-lg"
            />
            <button
              onClick={handleStart}
              disabled={!playerName.trim()}
              className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Mulai kuis UKM"
            >
              Mulai Kuis
            </button>

            {/* Leaderboard */}
            {leaderboard.length > 0 && (
              <div className="mt-8 text-left">
                <h3 className="font-heading font-bold text-lg text-shelly-dark mb-3">Leaderboard Sesi Ini</h3>
                <ol>
                  {leaderboard.slice(0, 5).map((entry, i) => (
                    <li key={i} className="flex items-center justify-between py-2 border-b border-peach/30 last:border-0">
                      <span className="font-body text-sm text-shelly/70">
                        {i + 1}. {entry.name}
                      </span>
                      <span className="font-heading font-bold text-coral">{entry.score}/10</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {/* PLAYING screen */}
        {state === "playing" && (
          <div>
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-shelly/50 font-body mb-2">
                <span>Pertanyaan {currentIndex + 1} dari {quizQuestions.length}</span>
                <span>{Math.round((currentIndex / quizQuestions.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-peach rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentIndex} aria-valuemin={0} aria-valuemax={quizQuestions.length}>
                <div
                  className="h-full bg-coral rounded-full transition-all duration-500"
                  style={{ width: `${(currentIndex / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Timer bar */}
            <div className="h-1.5 bg-peach rounded-full overflow-hidden mb-6" aria-hidden="true">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${timer <= 5 ? "bg-red-400" : "bg-coral"}`}
                style={{ width: `${(timer / TIMER_PER_QUESTION) * 100}%` }}
              />
            </div>

            {/* Question */}
            <div
              className="card-gelex p-6 mb-5"
              role="status"
              aria-live="polite"
              aria-label={`Pertanyaan ${currentIndex + 1}: ${question.question}`}
            >
              <p className="font-heading font-bold text-xl text-shelly-dark leading-relaxed">
                {question.question}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3" role="group" aria-label="Pilihan jawaban. Tekan 1, 2, 3, atau 4 untuk menjawab.">
              {question.options.map((option, idx) => {
                let style = "bg-white border-peach text-shelly/80 hover:border-coral hover:bg-peach/20";
                if (isAnswered) {
                  if (idx === question.correctAnswer) style = "bg-green-50 border-green-400 text-green-700";
                  else if (idx === selected) style = "bg-red-50 border-red-400 text-red-600";
                  else style = "bg-white border-peach/30 text-shelly/40";
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={isAnswered}
                    aria-label={`Pilihan ${idx + 1}: ${option}${isAnswered && idx === question.correctAnswer ? " (jawaban benar)" : ""}${isAnswered && idx === selected && idx !== question.correctAnswer ? " (jawaban kamu, salah)" : ""}`}
                    className={`w-full px-5 py-4 rounded-2xl border-2 font-body font-semibold text-left transition-all ${style} disabled:cursor-default`}
                  >
                    <span className="font-heading font-bold text-shelly/40 mr-3" aria-hidden="true">
                      {idx + 1}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* RESULT screen */}
        {state === "result" && (
          <div className="card-gelex p-8 text-center" role="status" aria-live="polite">
            <h2 className="font-heading font-black text-3xl text-shelly-dark">Kuis Selesai!</h2>
            <p className="font-body text-shelly/60 mt-2 mb-6">{playerName} berhasil menjawab:</p>
            <div className="font-heading font-black text-6xl text-coral mb-2" aria-label={`Skor ${score} dari 10`}>
              {score}<span className="text-3xl text-shelly/40">/10</span>
            </div>
            <p className="font-body text-shelly/70 mt-3 leading-relaxed">{finalMsg}</p>
            <div className="flex gap-3 mt-8">
              <button onClick={handleRestart} className="btn-primary flex-1" aria-label="Main kuis lagi">
                Main Lagi
              </button>
              <Link href="/games" className="btn-secondary flex-1" aria-label="Kembali ke halaman games">
                Kembali
              </Link>
            </div>
          </div>
        )}
      </div>

      <Shelly
        mood={state === "result" ? finalMood : shellyMood}
        message={state === "result" ? finalMsg : shellyMsg}
        position="bottom-right"
        size="md"
      />
    </div>
  );
}
