"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Glexy from "@/components/Glexy";
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
    <div className="min-h-screen bg-[#060B18] pb-24">
      <div
        className="bg-gradient-to-br from-[#060B18] via-[#0D1B4B] to-[#120A3B] py-16 px-6 relative overflow-hidden border-b border-[#38BDF8]/10"
        data-section="header"
        data-narration={PAGE_GREETING}
        tabIndex={-1}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="section-title">Komunitas</h1>
              <p className="font-body text-[#94A3B8] max-w-xl mt-3 leading-relaxed">
                Komunitas adalah perkumpulan mahasiswa yang memiliki kesamaan dalam minat atau bakat. Komunitas di UGM terdiri dari dua macam: komunitas resmi yang diakui Universitas, dan komunitas yang dijalankan langsung oleh mahasiswa.
              </p>
            </div>
            <SectionNarrator text={narrationText} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" aria-hidden="true" />
          <input
            type="search"
            placeholder="Cari Komunitas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Cari komunitas berdasarkan nama"
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#38BDF8]/15 bg-[#0D1B4B]/50 font-body text-[#E2E8F0] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10 shadow-sm backdrop-blur-sm"
          />
        </div>

        <p className="text-sm text-[#94A3B8] font-body mb-5" aria-live="polite">
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
              className="card-gelex p-4 flex flex-col gap-3 hover:border-[#818CF8]/30 transition-all"
              data-narration={`Komunitas ${kom.name}. ${kom.description}`}
              tabIndex={0}
              role="article"
              aria-label={`Komunitas ${kom.name}. ${kom.description}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 bg-[#818CF8]/5 border border-[#818CF8]/15 flex items-center justify-center text-center px-1">
                  <span className="text-[9px] font-body font-semibold leading-tight text-[#818CF8]">
                    Isi gambar
                  </span>
                </div>
                <div className="font-body font-bold text-sm text-[#E2E8F0] leading-tight">{kom.name}</div>
              </div>
              <p className="text-xs text-[#94A3B8] font-body leading-relaxed">{kom.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Glexy mood="happy" message="Komunitas yang seru-seru semua! Glexy mau ikut semuanya! ⭐" position="bottom-right" size="md" />
    </div>
  );
}
