"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trophy, Sparkles, Upload, ArrowRight, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import Glexy from "@/components/Glexy";
import GalaxyOrnament from "@/components/GalaxyOrnament";
import SectionNarrator from "@/components/SectionNarrator";
import { useAccessibility } from "@/hooks/useAccessibility";

// ── Types ──────────────────────────────────────────────────────
interface KontenApresiasi {
  id: string;
  judul: string;
  pembuat: string;
  kategori: "Foto" | "Video" | "Desain" | "Tulisan";
  deskripsi: string;
  votes: number;
  tanggalMasuk: string;
  masukLinimasa: boolean;
}

const KATEGORI_COLOR: Record<KontenApresiasi["kategori"], string> = {
  Foto:    "bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30",
  Video:   "bg-[#818CF8]/10 text-[#818CF8] border-[#818CF8]/30",
  Desain:  "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/30",
  Tulisan: "bg-amber-500/10 text-amber-400 border-amber-500/30",
};

const KATEGORI_GLOW: Record<KontenApresiasi["kategori"], string> = {
  Foto:    "rgba(56,189,248,0.08)",
  Video:   "rgba(129,140,248,0.08)",
  Desain:  "rgba(52,211,153,0.08)",
  Tulisan: "rgba(245,158,11,0.08)",
};

// Contoh data konten apresiasi
const KONTEN_DATA: KontenApresiasi[] = [
  {
    id: "1",
    judul: "Cahaya Gelanggang",
    pembuat: "Arya Satria",
    kategori: "Foto",
    deskripsi: "Potret momen paling memukau dari malam pertama GELEX — kilau lampu panggung yang menari di antara kerumunan mahasiswa.",
    votes: 248,
    tanggalMasuk: "1 Agustus 2026",
    masukLinimasa: true,
  },
  {
    id: "2",
    judul: "Irama Galaksi GELEX",
    pembuat: "Sekar Arum",
    kategori: "Video",
    deskripsi: "Video dokumentasi penampilan terbaik GELEX 2026 — rangkaian momen magis dari ketiga hari festival dalam satu video sinematik.",
    votes: 312,
    tanggalMasuk: "2 Agustus 2026",
    masukLinimasa: true,
  },
  {
    id: "3",
    judul: "Poster Semesta UKM",
    pembuat: "Rizky Maulana",
    kategori: "Desain",
    deskripsi: "Desain poster galaksi yang menampilkan 55+ UKM UGM sebagai bintang-bintang di tata surya GELEX 2026.",
    votes: 189,
    tanggalMasuk: "3 Agustus 2026",
    masukLinimasa: true,
  },
  {
    id: "4",
    judul: "Surat untuk Kampus",
    pembuat: "Putri Handayani",
    kategori: "Tulisan",
    deskripsi: "Puisi persembahan untuk UGM — tentang perjalanan mahasiswa menemukan rumah kedua di antara UKM dan komunitas.",
    votes: 156,
    tanggalMasuk: "1 Agustus 2026",
    masukLinimasa: false,
  },
  {
    id: "5",
    judul: "Warna-warni Gelar",
    pembuat: "Bagas Pratama",
    kategori: "Foto",
    deskripsi: "Kolase foto berwarna-warni dari seluruh booth UKM GELEX 2026 — eksplorasi visual yang meriah.",
    votes: 134,
    tanggalMasuk: "2 Agustus 2026",
    masukLinimasa: false,
  },
  {
    id: "6",
    judul: "Jejak Kreativitas",
    pembuat: "Nadya Rahmawati",
    kategori: "Desain",
    deskripsi: "Infografis interaktif perjalanan kreativitas mahasiswa UGM melalui UKM dari tahun ke tahun.",
    votes: 121,
    tanggalMasuk: "3 Agustus 2026",
    masukLinimasa: false,
  },
];

const PAGE_NARRATION =
  "Kamu di halaman Apresiasi Konten GELEX 2026. Di halaman ini kamu bisa melihat wadah apresiasi konten — ruang untuk mengapresiasi karya terbaik dari GELEX. Tiga konten teratas yang paling banyak mendapat apresiasi akan masuk ke lini masa GELEX 2026 sebagai kenangan abadi.";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Medal badge for top 3
function MedalBadge({ rank }: { rank: number }) {
  const medals = [
    { emoji: "🥇", color: "text-yellow-400", glow: "rgba(250,204,21,0.4)", border: "border-yellow-400/40", bg: "bg-yellow-400/10" },
    { emoji: "🥈", color: "text-slate-300",  glow: "rgba(203,213,225,0.4)", border: "border-slate-300/40",  bg: "bg-slate-300/10"  },
    { emoji: "🥉", color: "text-amber-600",  glow: "rgba(217,119,6,0.4)",   border: "border-amber-600/40",  bg: "bg-amber-600/10"  },
  ];
  if (rank > 3) return null;
  const m = medals[rank - 1];
  return (
    <div className={`inline-flex items-center gap-1.5 ${m.bg} border ${m.border} rounded-full px-2.5 py-1`}
      style={{ boxShadow: `0 0 12px ${m.glow}` }}>
      <span className="text-base">{m.emoji}</span>
      <span className={`text-xs font-heading font-bold ${m.color}`}>Top {rank}</span>
    </div>
  );
}

export default function ApresiasiPage() {
  const { autoGreetOnMount } = useAccessibility();
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const [konten, setKonten] = useState(KONTEN_DATA);
  const [filterKat, setFilterKat] = useState<"Semua" | KontenApresiasi["kategori"]>("Semua");
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ judul: "", pembuat: "", kategori: "Foto" as KontenApresiasi["kategori"], deskripsi: "" });

  useEffect(() => {
    return autoGreetOnMount(PAGE_NARRATION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sort by votes descending
  const sorted = [...konten].sort((a, b) => b.votes - a.votes);
  const top3 = sorted.slice(0, 3);
  const filtered = sorted.filter(k => filterKat === "Semua" || k.kategori === filterKat);

  const handleVote = (id: string) => {
    if (voted.has(id)) return;
    setVoted(prev => new Set(prev).add(id));
    setKonten(prev => prev.map(k => k.id === id ? { ...k, votes: k.votes + 1 } : k));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.judul.trim() || !form.pembuat.trim()) return;
    const newKonten: KontenApresiasi = {
      id: String(Date.now()),
      judul: form.judul,
      pembuat: form.pembuat,
      kategori: form.kategori,
      deskripsi: form.deskripsi,
      votes: 0,
      tanggalMasuk: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      masukLinimasa: false,
    };
    setKonten(prev => [...prev, newKonten]);
    setSubmitted(true);
    setTimeout(() => {
      setShowSubmit(false);
      setSubmitted(false);
      setForm({ judul: "", pembuat: "", kategori: "Foto", deskripsi: "" });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#060B18] pb-24">
      {/* ══ HEADER ═══════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#060B18] via-[#0D1B4B] to-[#120A3B] py-20 px-6 overflow-hidden border-b border-[#38BDF8]/10">
        <GalaxyOrnament />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-xs font-body font-semibold px-3 py-1 rounded-full mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Kolaborasi & Kreativitas GELEX 2026
                </div>
                <h1 className="section-title mb-2">
                  Wadah Apresiasi<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#818CF8]">
                    Konten GELEX
                  </span>
                </h1>
                <p className="section-subtitle max-w-xl">
                  Ruang untuk mengapresiasi karya terbaik dari seluruh rangkaian GELEX 2026. Tiga konten teratas akan masuk ke <strong className="text-[#38BDF8]">Lini Masa GELEX</strong> sebagai kenangan abadi.
                </p>
              </div>
              <SectionNarrator text={PAGE_NARRATION} label="Dengarkan tentang Apresiasi" />
            </div>
          </Reveal>

          {/* Info banner */}
          <Reveal delay={0.15} className="mt-8">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Trophy, label: "3 Konten Terbaik", desc: "Masuk ke Lini Masa GELEX 2026", color: "text-yellow-400", border: "border-yellow-400/20", bg: "bg-yellow-400/5" },
                { icon: Star,   label: "Sistem Apresiasi",  desc: "Vote untuk karya favoritmu",      color: "text-[#38BDF8]",  border: "border-[#38BDF8]/20",  bg: "bg-[#38BDF8]/5"  },
                { icon: Upload, label: "Kirim Karyamu",     desc: "Bagikan karyamu ke komunitas",     color: "text-[#818CF8]",  border: "border-[#818CF8]/20",  bg: "bg-[#818CF8]/5"  },
              ].map((item) => (
                <div key={item.label} className={`rounded-2xl border ${item.border} ${item.bg} p-4 flex items-center gap-3`}>
                  <div className={`w-10 h-10 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <div className={`font-heading font-bold text-sm ${item.color}`}>{item.label}</div>
                    <div className="text-xs text-[#94A3B8] font-body">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ TOP 3 — MASUK LINIMASA ═══════════════════════════ */}
      <section className="py-16 px-6 bg-[#060B18]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/25 text-yellow-400 text-xs font-body font-semibold px-4 py-1.5 rounded-full mb-3">
              <Trophy className="w-3.5 h-3.5" />
              3 Konten Terbaik — Masuk Lini Masa GELEX
            </div>
            <h2 className="section-title">Bintang Galaksi GELEX</h2>
            <p className="section-subtitle">Karya-karya ini akan diabadikan dalam lini masa Gelanggang Expo 2026</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {top3.map((k, i) => (
              <Reveal key={k.id} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative rounded-3xl border border-yellow-400/20 overflow-hidden"
                  style={{
                    background: "radial-gradient(ellipse at top, rgba(250,204,21,0.07), transparent 70%), #0D1B4B",
                    boxShadow: "0 0 40px rgba(250,204,21,0.08)",
                  }}
                >
                  {/* Gold top bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0" />

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <MedalBadge rank={i + 1} />
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-body ${KATEGORI_COLOR[k.kategori]}`}>
                        {k.kategori}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-[#E2E8F0] mb-1 leading-tight">{k.judul}</h3>
                    <p className="text-xs text-[#38BDF8] font-body font-semibold mb-2">oleh {k.pembuat}</p>
                    <p className="text-xs text-[#94A3B8] font-body leading-relaxed line-clamp-3 mb-4">{k.deskripsi}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-heading font-bold text-yellow-400 text-sm">{k.votes} apresiasi</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-[#34D399] font-body font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Lini Masa
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SEMUA KONTEN ════════════════════════════════════ */}
      <section className="py-10 px-6 bg-[#0D1B4B]/50 border-t border-[#38BDF8]/10">
        <div className="max-w-5xl mx-auto">
          <Reveal className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="font-heading font-bold text-2xl text-[#E2E8F0]">Semua Konten Apresiasi</h2>
              <p className="text-sm text-[#94A3B8] font-body mt-1">Vote untuk konten favoritmu — 3 teratas masuk linimasa!</p>
            </div>
            <button
              onClick={() => setShowSubmit(true)}
              className="btn-secondary text-sm"
            >
              <Upload className="w-4 h-4" />
              Kirim Karyamu
            </button>
          </Reveal>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(["Semua", "Foto", "Video", "Desain", "Tulisan"] as const).map((kat) => (
              <button
                key={kat}
                onClick={() => setFilterKat(kat)}
                className={`px-4 py-1.5 rounded-full text-sm font-body font-semibold transition-all ${
                  filterKat === kat
                    ? "bg-[#38BDF8] text-[#060B18] shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    : "bg-white/5 border border-[#38BDF8]/15 text-[#94A3B8] hover:border-[#38BDF8]/40 hover:text-[#38BDF8]"
                }`}
              >
                {kat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((k, i) => {
              const rank = sorted.findIndex(s => s.id === k.id) + 1;
              const hasVoted = voted.has(k.id);
              return (
                <Reveal key={k.id} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="card-gelex p-5 flex flex-col gap-3 h-full"
                    style={{ background: `radial-gradient(ellipse at top left, ${KATEGORI_GLOW[k.kategori]}, transparent 60%)` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {rank <= 3 && <MedalBadge rank={rank} />}
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-body ${KATEGORI_COLOR[k.kategori]}`}>
                          {k.kategori}
                        </span>
                      </div>
                      {k.masukLinimasa && (
                        <span className="text-[10px] text-[#34D399] font-body font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Linimasa
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-heading font-bold text-base text-[#E2E8F0] leading-tight">{k.judul}</h3>
                      <p className="text-xs text-[#38BDF8] font-body mt-0.5">oleh {k.pembuat}</p>
                    </div>

                    <p className="text-xs text-[#94A3B8] font-body leading-relaxed line-clamp-3 flex-1">{k.deskripsi}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#38BDF8]/10">
                      <div className="flex items-center gap-1 text-xs text-[#94A3B8] font-body">
                        <Clock className="w-3 h-3" />
                        {k.tanggalMasuk}
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleVote(k.id)}
                        disabled={hasVoted}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
                          hasVoted
                            ? "bg-[#38BDF8] text-[#060B18] cursor-default"
                            : "bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/25 hover:bg-[#38BDF8]/20"
                        }`}
                        aria-label={hasVoted ? "Sudah mengapresiasi" : `Apresiasi karya ${k.judul}`}
                      >
                        <Star className={`w-3.5 h-3.5 ${hasVoted ? "fill-current" : ""}`} />
                        {k.votes} {hasVoted ? "✓" : ""}
                      </motion.button>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ SUBMIT MODAL ═══════════════════════════════════ */}
      <AnimatePresence>
        {showSubmit && (
          <motion.div
            className="fixed inset-0 bg-[#060B18]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !submitted && setShowSubmit(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0D1B4B] border border-[#38BDF8]/20 rounded-3xl shadow-[0_0_60px_rgba(56,189,248,0.15)] p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient top bar */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#38BDF8] to-[#818CF8]" />

              {submitted ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="text-6xl mb-4"
                  >
                    ⭐
                  </motion.div>
                  <h3 className="font-heading font-bold text-2xl text-[#E2E8F0] mb-2">Karya Terkirim!</h3>
                  <p className="text-[#94A3B8] font-body">Karyamu sudah masuk dalam wadah apresiasi. Terima kasih telah berkontribusi untuk GELEX 2026!</p>
                </div>
              ) : (
                <>
                  <h3 className="font-heading font-bold text-xl text-[#E2E8F0] mb-1">Kirim Karyamu</h3>
                  <p className="text-sm text-[#94A3B8] font-body mb-6">Bagikan karya terbaikmu untuk mendapat apresiasi dari seluruh GELEX!</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-[#94A3B8] font-body font-semibold uppercase tracking-wide mb-1.5 block">
                        Judul Karya *
                      </label>
                      <input
                        type="text"
                        value={form.judul}
                        onChange={(e) => setForm(f => ({ ...f, judul: e.target.value }))}
                        placeholder="Nama karyamu..."
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#38BDF8]/20 bg-white/5 text-[#E2E8F0] placeholder:text-[#94A3B8] font-body focus:outline-none focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#94A3B8] font-body font-semibold uppercase tracking-wide mb-1.5 block">
                        Nama Pembuatmu *
                      </label>
                      <input
                        type="text"
                        value={form.pembuat}
                        onChange={(e) => setForm(f => ({ ...f, pembuat: e.target.value }))}
                        placeholder="Nama kamu..."
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#38BDF8]/20 bg-white/5 text-[#E2E8F0] placeholder:text-[#94A3B8] font-body focus:outline-none focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#94A3B8] font-body font-semibold uppercase tracking-wide mb-1.5 block">
                        Kategori
                      </label>
                      <select
                        value={form.kategori}
                        onChange={(e) => setForm(f => ({ ...f, kategori: e.target.value as KontenApresiasi["kategori"] }))}
                        className="w-full px-4 py-3 rounded-xl border border-[#38BDF8]/20 bg-[#0D1B4B] text-[#E2E8F0] font-body focus:outline-none focus:border-[#38BDF8]/50"
                      >
                        {["Foto", "Video", "Desain", "Tulisan"].map(k => (
                          <option key={k} value={k}>{k}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-[#94A3B8] font-body font-semibold uppercase tracking-wide mb-1.5 block">
                        Deskripsi Singkat
                      </label>
                      <textarea
                        value={form.deskripsi}
                        onChange={(e) => setForm(f => ({ ...f, deskripsi: e.target.value }))}
                        placeholder="Ceritakan karyamu..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-[#38BDF8]/20 bg-white/5 text-[#E2E8F0] placeholder:text-[#94A3B8] font-body focus:outline-none focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10 resize-none backdrop-blur-sm"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowSubmit(false)}
                        className="btn-secondary flex-1"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="btn-primary flex-1"
                        disabled={!form.judul.trim() || !form.pembuat.trim()}
                      >
                        Kirim Karya <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ INFO LINIMASA ═══════════════════════════════════ */}
      <section className="py-14 px-6 bg-[#060B18] border-t border-[#38BDF8]/10">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-8">
            <h2 className="font-heading font-bold text-2xl text-[#E2E8F0] mb-2">Strategi Pemasaran Konten GELEX</h2>
            <p className="text-sm text-[#94A3B8] font-body max-w-2xl mx-auto leading-relaxed">
              Konten-konten terbaik yang masuk melalui wadah apresiasi ini menjadi bagian dari strategi pemasaran GELEX 2026 — menyebarkan semangat kreativitas ke seluruh mahasiswa UGM dan komunitas di luar kampus.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Komunitas Mengapresiasi",
                desc: "Seluruh warga GELEX memberikan apresiasi (vote) kepada konten yang paling berkesan.",
                color: "text-[#38BDF8]",
                border: "border-[#38BDF8]/20",
              },
              {
                step: "02",
                title: "3 Terbaik Terpilih",
                desc: "Tiga konten dengan apresiasi terbanyak otomatis terpilih sebagai wakil galaksi GELEX.",
                color: "text-[#818CF8]",
                border: "border-[#818CF8]/20",
              },
              {
                step: "03",
                title: "Masuk Lini Masa",
                desc: "Konten terpilih diabadikan dalam lini masa GELEX 2026 — kenangan yang tak terlupakan.",
                color: "text-[#34D399]",
                border: "border-[#34D399]/20",
              },
            ].map((item) => (
              <Reveal key={item.step} className={`card-glass p-6 border ${item.border} text-center`}>
                <div className={`font-heading font-black text-4xl ${item.color} mb-3`}>{item.step}</div>
                <h3 className={`font-heading font-bold text-base ${item.color} mb-2`}>{item.title}</h3>
                <p className="text-xs text-[#94A3B8] font-body leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-10">
            <Link href="/linimasa" className="btn-secondary text-sm">
              Lihat Lini Masa GELEX <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Fixed Glexy */}
      <Glexy
        mood="cheering"
        message="Wah keren! Apresiasi karya teman-temanmu ya! 3 terbaik masuk lini masa GELEX! ⭐"
        position="bottom-right"
        size="md"
        autoShow
      />
    </div>
  );
}
