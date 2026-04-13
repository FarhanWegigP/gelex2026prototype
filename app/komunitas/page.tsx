"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Shelly from "@/components/Shelly";
import SectionNarrator from "@/components/SectionNarrator";
import { useAccessibility } from "@/hooks/useAccessibility";
import { komunitasList } from "@/data";

const PAGE_GREETING =
  "Kamu di halaman Komunitas. Komunitas adalah perkumpulan mahasiswa yang memiliki kesamaan dalam minat atau bakat. Ada kotak pencarian untuk menemukan komunitas. Tekan Tab untuk mulai menelusuri kartu komunitas.";

export default function KomunitasPage() {
  const [search, setSearch] = useState("");
  const { autoGreetOnMount } = useAccessibility();

  useEffect(() => {
    return autoGreetOnMount(PAGE_GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = komunitasList.filter((k) =>
    k.name.toLowerCase().includes(search.toLowerCase())
  );
  const narrationText = `Halaman Komunitas. Komunitas adalah perkumpulan mahasiswa yang memiliki kesamaan dalam minat atau bakat. Komunitas yang tersedia: ${filtered.map((k) => k.name).join(", ")}.`;

  return (
    <div className="min-h-screen bg-offwhite pb-24">
      <div
        className="bg-gelex-gradient py-16 px-6 relative overflow-hidden"
        data-section="header"
        data-narration={PAGE_GREETING}
        tabIndex={-1}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="section-title">Komunitas</h1>
              <p className="font-body text-shelly/60 max-w-xl mt-3 leading-relaxed">
                Komunitas adalah perkumpulan mahasiswa yang memiliki kesamaan dalam minat atau bakat. Komunitas di UGM terdiri dari dua macam: komunitas resmi yang diakui Universitas, dan komunitas yang dijalankan langsung oleh mahasiswa.
              </p>
            </div>
            <SectionNarrator text={narrationText} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-shelly/40" aria-hidden="true" />
          <input
            type="search"
            placeholder="Cari Komunitas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Cari komunitas berdasarkan nama"
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-peach bg-white font-body text-shelly-dark focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 shadow-sm"
          />
        </div>

        <p className="text-sm text-shelly/50 font-body mb-5" aria-live="polite">
          {filtered.length} komunitas ditemukan
        </p>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          data-section="komunitas-grid"
          data-narration={narrationText}
          tabIndex={-1}
        >
          {filtered.map((kom) => (
            <div
              key={kom.id}
              className="card-gelex p-4 flex flex-col gap-3"
              data-narration={`Komunitas ${kom.name}. ${kom.description}`}
              tabIndex={0}
              role="article"
              aria-label={`Komunitas ${kom.name}. ${kom.description}`}
            >
              <div className="flex items-center gap-3">
                <img src={kom.logo} alt="" aria-hidden="true" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="font-body font-bold text-sm text-shelly-dark leading-tight">{kom.name}</div>
              </div>
              <p className="text-xs text-shelly/60 font-body leading-relaxed">{kom.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Shelly mood="happy" message="Komunitas yang seru-seru semua! Shelly mau ikut semuanya!" position="bottom-right" size="md" />
    </div>
  );
}
