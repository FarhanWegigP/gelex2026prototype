"use client";
import { useEffect } from "react";
import Link from "next/link";
import Shelly from "@/components/Shelly";
import { useAccessibility } from "@/hooks/useAccessibility";

const games = [
  {
    href: "/games/tts-rohani",
    title: "TTS Rohani",
    desc: "Teka-teki silang bertema kerohanian. Uji pengetahuanmu tentang agama-agama di UGM!",
    color: "bg-peach/50 border-peach",
  },
  {
    href: "/games/olahraga",
    title: "Game Olahraga",
    desc: "Tendang penalti dan lempar basket! Tunjukkan kemampuan atletismu bersama Shelly.",
    color: "bg-cream/70 border-cream",
  },
  {
    href: "/games/gambar",
    title: "Game Seni",
    desc: "Gambar bebas di kanvas digital dan ciptakan melodi unikmu di Garage Band Lite!",
    color: "bg-coral/20 border-coral/30",
  },
  {
    href: "/games/kuis",
    title: "Kuis UKM",
    desc: "Seberapa jauh kamu tahu tentang UKM dan kampus UGM? Ayo buktikan!",
    color: "bg-peach/30 border-peach",
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
    <div className="min-h-screen bg-hero-gradient pb-24">
      {/* Header */}
      <div
        className="py-16 px-6"
        data-section="header"
        data-narration={PAGE_GREETING}
        tabIndex={-1}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-black text-5xl text-shelly-dark">Geleverse</h1>
          <p className="font-heading font-bold text-xl text-coral mt-1">Dunia Interaktif GELEX 2026</p>
          <p className="font-body text-shelly/60 mt-4 text-base max-w-2xl mx-auto leading-relaxed">
            Geleverse adalah dunia interaktif dalam website GELEX yang dirancang untuk memberikan pengalaman eksplorasi UKM UGM secara menyenangkan dan penuh warna.
          </p>
        </div>
      </div>

      {/* Game cards */}
      <div
        className="max-w-4xl mx-auto px-6"
        data-section="games-list"
        data-narration="Daftar mini games yang tersedia: TTS Rohani, Game Olahraga, Game Seni, dan Kuis UKM."
        tabIndex={-1}
      >
        <div className="grid md:grid-cols-2 gap-5">
          {games.map((game) => (
            <div
              key={game.href}
              className={`card-gelex p-6 border ${game.color} flex flex-col gap-4`}
            >
              <div>
                <h2 className="font-heading font-black text-2xl text-shelly-dark">{game.title}</h2>
                <p className="font-body text-shelly/60 mt-2 leading-relaxed">{game.desc}</p>
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

      <Shelly
        mood="excited"
        message="Hore! Saatnya main! Shelly paling suka Kuis UKM, tapi semua seru kok!"
        position="bottom-right"
        size="lg"
      />
    </div>
  );
}
