"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Shelly from "@/components/Shelly";
import SectionNarrator from "@/components/SectionNarrator";
import { useAccessibility } from "@/hooks/useAccessibility";
import { ukmList, UKMCategory } from "@/data";

const categories: ("Semua" | UKMCategory)[] = ["Semua", "Seni", "Olahraga", "Rohani", "Khusus"];

const categoryMessages: Record<string, string> = {
  Semua: "Ada banyak UKM keren di UGM! Yuk explore semuanya!",
  Seni: "UKM Seni — tempatnya para seniman berbakat UGM!",
  Olahraga: "UKM Olahraga — sehat, kuat, dan berprestasi!",
  Rohani: "UKM Rohani — tumbuh dalam iman dan kebersamaan!",
  Khusus: "UKM Khusus — inovasi dan kontribusi nyata untuk bangsa!",
};

const PAGE_GREETING =
  "Kamu di halaman Unit Kegiatan Mahasiswa. Tersedia 55 UKM dari 4 sekber: Seni, Olahraga, Rohani, dan Khusus. Ada kotak pencarian dan filter kategori. Tekan Tab untuk mulai menelusuri kartu-kartu UKM.";

export default function UKMPage() {
  const [activeFilter, setActiveFilter] = useState<"Semua" | UKMCategory>("Semua");
  const [search, setSearch] = useState("");
  const { autoGreetOnMount } = useAccessibility();

  useEffect(() => {
    return autoGreetOnMount(PAGE_GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = ukmList.filter((ukm) => {
    const matchCat = activeFilter === "Semua" || ukm.category === activeFilter;
    const matchSearch = ukm.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const narrationText = `Halaman Unit Kegiatan Mahasiswa. Terdiri dari 4 Sekber dan total 55 UKM. ${filtered.map((u) => u.name).join(", ")}.`;

  return (
    <div className="min-h-screen bg-offwhite pb-24">
      {/* Header */}
      <div
        className="bg-gelex-gradient py-16 px-6 relative overflow-hidden"
        data-section="header"
        data-narration={PAGE_GREETING}
        tabIndex={-1}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="section-title">Unit Kegiatan Mahasiswa</h1>
              <p className="section-subtitle">Terdiri dari <strong>4 Sekber</strong> dan total <strong>55 UKM</strong></p>
              <p className="font-body text-shelly/60 max-w-xl mt-3 leading-relaxed">
                UKM adalah organisasi kemahasiswaan di UGM yang berperan sebagai wadah berdinamika bagi mahasiswa dalam pendidikan soft skills melalui kegiatan minat dan bakat.
              </p>
            </div>
            <SectionNarrator text={narrationText} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-shelly/40" aria-hidden="true" />
          <input
            type="search"
            placeholder="Cari Unit Kegiatan Mahasiswa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Cari UKM berdasarkan nama"
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-peach bg-white font-body text-shelly-dark focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 shadow-sm"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter kategori UKM">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
              aria-label={`Filter kategori ${cat}`}
              className={`px-4 py-2 rounded-full text-sm font-body font-semibold transition-all duration-150 ${
                activeFilter === cat
                  ? "bg-shelly text-white"
                  : "bg-white border border-peach text-shelly/70 hover:border-coral hover:text-shelly"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-sm text-shelly/50 font-body mb-5" aria-live="polite">
          {filtered.length} UKM ditemukan
        </p>

        {/* Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          data-section="ukm-grid"
          data-narration={`Daftar UKM yang ditampilkan: ${filtered.map((u) => u.name).join(", ")}.`}
          tabIndex={-1}
        >
          {filtered.map((ukm) => (
            <Link
              key={ukm.id}
              href={`/ukm/${ukm.slug}`}
              className="card-gelex p-4 flex flex-col gap-3"
              aria-label={`Kartu UKM: ${ukm.name}, kategori ${ukm.category}. ${ukm.description ?? ""}. Tekan Enter untuk lihat profil lengkap.`}
              data-narration={`Kartu UKM: ${ukm.name}, kategori ${ukm.category}. ${ukm.description ?? ""}. Tekan Enter untuk profil lengkap.`}
            >
              <div className="flex items-center gap-3">
                <img src={ukm.logo} alt="" aria-hidden="true" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div>
                  <div className="font-body font-bold text-sm text-shelly-dark leading-tight">{ukm.name}</div>
                  <span className="text-xs bg-peach/60 text-shelly px-2 py-0.5 rounded-full mt-1 inline-block">{ukm.category}</span>
                </div>
              </div>
              <p className="text-xs text-shelly/60 font-body leading-relaxed line-clamp-2">{ukm.description}</p>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-peach/30">
                <span className="text-xs text-shelly/40 font-body">Lihat Profil</span>
                <span className="w-7 h-7 rounded-full bg-coral/10 text-coral flex items-center justify-center text-sm" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-body text-shelly/50">UKM tidak ditemukan. Coba kata kunci lain.</p>
          </div>
        )}
      </div>

      <Shelly
        mood={activeFilter === "Semua" ? "waving" : "happy"}
        message={categoryMessages[activeFilter]}
        position="bottom-right"
        size="md"
      />
    </div>
  );
}
