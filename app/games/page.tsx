"use client";
import { useEffect } from "react";
import Link from "next/link";
import Glexy from "@/components/Glexy";
import { useAccessibility } from "@/hooks/useAccessibility";

const games = [
  {
    href: "/games/tts-rohani",
    title: "TTS Rohani",
    desc: "Teka-teki silang bertema kerohanian. Uji pengetahuanmu tentang agama-agama di UGM!",
    color: "border-[#818CF8]/30",
    glow: "rgba(129,140,248,0.08)",
    accent: "#818CF8",
  },
  {
    href: "/games/olahraga",
    title: "Game Olahraga",
    desc: "Tendang penalti dan lempar basket! Tunjukkan kemampuan atletismu bersama Glexy.",
    color: "border-[#34D399]/30",
    glow: "rgba(52,211,153,0.08)",
    accent: "#34D399",
  },
  {
    href: "/games/gambar",
    title: "Game Seni",
    desc: "Gambar bebas di kanvas digital dan ciptakan melodi unikmu di Garage Band Lite!",
    color: "border-[#38BDF8]/30",
    glow: "rgba(56,189,248,0.08)",
    accent: "#38BDF8",
  },
  {
    href: "/games/kuis",
    title: "Kuis UKM",
    desc: "Seberapa jauh kamu tahu tentang UKM dan kampus UGM? Ayo buktikan!",
    color: "border-[#38BDF8]/30",
    glow: "rgba(56,189,248,0.08)",
    accent: "#38BDF8",
  },
];

const PAGE_GREETING =
  "Kamu di halaman Geleverse, dunia interaktif GELEX 2026. Tersedia 4 mini games: TTS Rohani, Game Olahraga, Game Seni, dan Kuis UKM. Tekan Tab untuk memilih game, Enter untuk mulai bermain.";

export default function GamesPage() {
  const { autoGreetOnMount } = useAccessibility();

  useEffect(() => {
    return autoGreetOnMount(PAGE_GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#060B18] pb-24">
      {/* Header */}
      <div
        className="py-16 px-6 bg-gradient-to-br from-[#060B18] via-[#0D1B4B] to-[#120A3B] border-b border-[#38BDF8]/10"
        data-section="header"
        data-narration={PAGE_GREETING}
        tabIndex={-1}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-black text-5xl text-[#E2E8F0]">Geleverse</h1>
          <p className="font-heading font-bold text-xl text-[#38BDF8] mt-1">Dunia Interaktif GELEX 2026</p>
          <p className="font-body text-[#94A3B8] mt-4 text-base max-w-2xl mx-auto leading-relaxed">
            Geleverse adalah dunia interaktif dalam website GELEX yang dirancang untuk memberikan pengalaman eksplorasi UKM UGM secara menyenangkan dan penuh warna.
          </p>
        </div>
      </div>

      {/* Game cards */}
      <div
        className="max-w-4xl mx-auto px-6 mt-10"
        data-section="games-list"
        data-narration="Daftar mini games yang tersedia: TTS Rohani, Game Olahraga, Game Seni, dan Kuis UKM."
        tabIndex={-1}
      >
        <div className="grid md:grid-cols-2 gap-5">
          {games.map((game) => (
            <div
              key={game.href}
              className={`card-gelex p-6 border ${game.color} flex flex-col gap-4`}
              style={{ background: `radial-gradient(ellipse at top left, ${game.glow}, transparent 60%)` }}
            >
              <div>
                <h2 className="font-heading font-black text-2xl text-[#E2E8F0]" style={{ textShadow: `0 0 20px ${game.accent}40` }}>
                  {game.title}
                </h2>
                <p className="font-body text-[#94A3B8] mt-2 leading-relaxed">{game.desc}</p>
              </div>
              <Link
                href={game.href}
                className="btn-primary text-center mt-auto"
                aria-label={`Main ${game.title}: ${game.desc}`}
              >
                Main Sekarang
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Glexy
        mood="excited"
        message="Hore! Saatnya main! Glexy paling suka Kuis UKM, tapi semua seru kok! 🌌"
        position="bottom-right"
        size="lg"
      />
    </div>
  );
}
