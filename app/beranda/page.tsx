"use client";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Gamepad2, MapPin } from "lucide-react";
import Shelly from "@/components/Shelly";
import CloudOrnament from "@/components/CloudOrnament";
import SectionNarrator from "@/components/SectionNarrator";
import { useAccessibility } from "@/hooks/useAccessibility";
import { ukmList, komunitasList, linimasaEvents } from "@/data";

// ── Narration texts ────────────────────────────────────────────
const N = {
  hero: "Kamu sekarang di halaman Beranda GELEX 2026. Acara berlangsung 1 hingga 3 Agustus 2026 di Gelanggang Mahasiswa UGM. Di halaman ini ada: info tentang GELEX, linimasa 3 hari acara, daftar UKM, daftar komunitas, dan promo mini games. Tekan Tab untuk navigasi, Alt N untuk skip ke section berikutnya.",
  tentang:
    "Tentang GELEX. Gelanggang Expo adalah festival tahunan terbesar di Universitas Gadjah Mada yang menghadirkan pameran dan penampilan dari lebih dari 55 Unit Kegiatan Mahasiswa dan berbagai komunitas mahasiswa.",
  linimasa:
    "Linimasa GELEX 2026. Festival berlangsung selama 3 hari, dari 1 hingga 3 Agustus 2026, penuh dengan pertunjukan seni, seremonial, dan kegiatan yang menakjubkan!",
  ukm: "Jelajahi UKM. Temukan lebih dari 55 Unit Kegiatan Mahasiswa UGM yang terbagi dalam 4 Sekber: Seni, Olahraga, Rohani, dan Khusus. Temukan UKM yang sesuai minat dan bakatmu!",
  komunitas:
    "Komunitas GELEX 2026. Selain UKM, kamu juga bisa mengenal 12 komunitas mahasiswa yang aktif berkarya di berbagai bidang, dari kedirgantaraan hingga kepemimpinan!",
  games:
    "Geleverse — Dunia Interaktif! Main game seru, ikuti kuis, dan ekspresikan kreativitasmu bersama Shelly si maskot kura-kura lucu GELEX 2026!",
};

const PAGE_GREETING = N.hero;

// ── Reusable scroll-reveal wrapper ────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function BerandaPage() {
  const { autoGreetOnMount } = useAccessibility();

  useEffect(() => {
    return autoGreetOnMount(PAGE_GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featuredUkm = ukmList.slice(0, 8);
  const featuredKomunitas = komunitasList.slice(0, 6);
  const day1Events = linimasaEvents.filter((e) => e.day === 1).slice(0, 3);
  const day2Events = linimasaEvents.filter((e) => e.day === 2).slice(0, 3);
  const day3Events = linimasaEvents.filter((e) => e.day === 3).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section
        data-section="hero"
        data-narration={N.hero}
        tabIndex={-1}
        className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-[#FFF8F0] via-[#FDEEC9] to-[#FADADD] overflow-hidden"
      >
        <CloudOrnament />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-10 items-center py-24">
          {/* Text */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <SectionNarrator text={N.hero} label="Dengarkan panduan Shelly" />
            </div>

            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-[#E8896A] text-sm font-body font-semibold px-4 py-1.5 rounded-full border border-[#FADADD] mb-4">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              1–3 Agustus 2026 · Gelanggang Mahasiswa UGM
            </div>

            <h1 className="font-heading font-bold text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#E8896A] to-[#F4A98A] leading-tight mb-4">
              Gelanggang<br />
              <span>Expo 2026</span>
            </h1>

            <p className="font-body text-xl text-[#8B7355] mb-8 leading-relaxed max-w-lg">
              Where Creativity Comes Alive and Talent Shines. Festival tahunan terbesar UGM yang menghadirkan 55+ UKM dan komunitas mahasiswa.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-0 mb-8" aria-label="Statistik GELEX 2026">
              {[
                { value: "55+", label: "UKM" },
                { value: "4", label: "Sekber" },
                { value: "3", label: "Hari" },
                { value: "12", label: "Komunitas" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`pr-6 ${i > 0 ? "pl-6 border-l border-[#E8896A]/20" : ""}`}
                >
                  <div className="font-heading font-bold text-2xl text-[#E8896A] leading-none">{s.value}</div>
                  <div className="text-[11px] text-[#8B7355] font-body mt-0.5 tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/ukm" className="btn-primary" aria-label="Jelajahi semua UKM GELEX 2026">
                Jelajahi UKM <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/komunitas" className="btn-secondary" aria-label="Lihat daftar komunitas GELEX 2026">
                Komunitas <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* Hero Shelly */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden md:flex justify-center"
          >
            <Shelly
              mood="excited"
              message="Selamat datang di GELEX 2026! Aku Shelly, siap menemanimu menjelajahi dunia UKM dan komunitas UGM!"
              position="inline"
              size="xl"
              autoShow
            />
          </motion.div>
        </div>
      </section>

      {/* ══ TENTANG GELEX ═════════════════════════════════════ */}
      <section
        data-section="tentang"
        data-narration={N.tentang}
        tabIndex={-1}
        className="py-20 px-6 bg-white relative"
      >
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex items-start justify-between flex-wrap gap-4 mb-14">
            <div>
              <p className="text-[#E8896A]/60 font-body font-semibold text-sm tracking-widest uppercase mb-2">
                Tentang Acara
              </p>
              <h2 className="section-title">Tentang GELEX</h2>
              <p className="section-subtitle max-w-xl">
                Pameran tahunan UKM dan komunitas terbesar di Universitas Gadjah Mada
              </p>
            </div>
            <SectionNarrator text={N.tentang} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal delay={0.1}>
              <p className="font-body text-[#4A4A4A] leading-relaxed text-lg mb-5">
                <strong className="text-[#E8896A]">GELEX</strong> (Gelanggang Expo) adalah festival tahunan UKM terbesar di UGM. Ajang ini menghadirkan pameran, penampilan seni, demonstrasi olahraga, dan expo rohani dari lebih dari 55 Unit Kegiatan Mahasiswa dalam satu kawasan yang meriah.
              </p>
              <p className="font-body text-[#4A4A4A] leading-relaxed text-lg mb-8">
                GELEX menjadi ruang terbaik bagi mahasiswa baru untuk mengenal UKM dan menemukan passion mereka sejak hari pertama di kampus.
              </p>

              {/* Category cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Penampilan Seni", color: "bg-[#FADADD]/40" },
                  { label: "Pameran Olahraga", color: "bg-[#FDEEC9]/50" },
                  { label: "Expo Rohani", color: "bg-[#FADADD]/30" },
                  { label: "UKM Khusus", color: "bg-[#FDEEC9]/35" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -3 }}
                    className={`card-gelex p-4 text-center ${item.color}`}
                  >
                    <div className="font-body font-semibold text-sm text-[#3d2c1e]/75">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            {/* Photo grid */}
            <Reveal delay={0.2}>
              <div className="grid grid-cols-3 gap-2" aria-label="Galeri foto kegiatan GELEX">
                {Array.from({ length: 6 }, (_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.18 }}
                    className="aspect-square rounded-2xl overflow-hidden shadow-card border-2 border-white"
                  >
                    <img
                      src={`https://picsum.photos/300/300?random=${i + 10}`}
                      alt={`Foto kegiatan GELEX ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ LINIMASA ══════════════════════════════════════════ */}
      <section
        data-section="linimasa"
        data-narration={N.linimasa}
        tabIndex={-1}
        className="py-20 px-6 bg-gradient-to-br from-[#FFF8F0] via-[#FDEEC9] to-[#FADADD] relative overflow-hidden"
      >
        <CloudOrnament />
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-14">
            <p className="text-[#E8896A]/60 font-body font-semibold text-sm tracking-widest uppercase mb-2">Jadwal Acara</p>
            <h2 className="section-title justify-center flex">Linimasa</h2>
            <p className="section-subtitle">3 hari penuh kreativitas dan semangat</p>
            <div className="mt-4 flex justify-center">
              <SectionNarrator text={N.linimasa} />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { day: 1, date: "1 Agustus", events: day1Events, accent: "from-[#FADADD] to-[#F4A98A]/30" },
              { day: 2, date: "2 Agustus", events: day2Events, accent: "from-[#FDEEC9] to-[#F4A98A]/20" },
              { day: 3, date: "3 Agustus", events: day3Events, accent: "from-[#F4A98A]/30 to-[#FADADD]" },
            ].map(({ day, date, events, accent }, i) => (
              <Reveal key={day} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`bg-gradient-to-br ${accent} rounded-3xl p-7 border-2 border-white shadow-card h-full`}
                  aria-label={`Hari ${day}, ${date} 2026`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-warm">
                      <Calendar className="w-5 h-5 text-[#E8896A]" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-lg text-[#E8896A]">Hari {day}</div>
                      <div className="text-xs text-[#8B7355] font-body">{date} 2026</div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {events.map((ev) => (
                      <div key={ev.id} className="flex items-start gap-2 text-sm">
                        <span className="font-heading font-semibold text-[#E8896A] min-w-[44px] text-xs mt-0.5">{ev.time}</span>
                        <span className="font-body text-[#3d2c1e]/80 leading-snug">{ev.title}</span>
                      </div>
                    ))}
                    <div className="text-xs text-[#E8896A] font-body font-semibold pt-1">
                      + {linimasaEvents.filter((e) => e.day === day).length - events.length} lainnya
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center">
            <Link href="/linimasa" className="btn-primary" aria-label="Lihat jadwal lengkap GELEX 2026">
              Lihat Jadwal Lengkap <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ UKM ═══════════════════════════════════════════════ */}
      <section
        data-section="ukm"
        data-narration={N.ukm}
        tabIndex={-1}
        className="py-24 px-6 bg-white border-t border-[#FADADD]/40"
      >
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex items-start justify-between flex-wrap gap-4 mb-14">
            <div>
              <p className="text-[#E8896A]/60 font-body font-semibold text-sm tracking-widest uppercase mb-2">Unit Kegiatan</p>
              <h2 className="section-title">Jelajah UKM</h2>
              <p className="section-subtitle">Temukan UKM yang sesuai minat dan bakatmu</p>
            </div>
            <div className="flex items-center gap-3">
              <SectionNarrator text={N.ukm} />
              <Link href="/ukm" className="btn-secondary text-sm" aria-label="Lihat semua UKM GELEX 2026">
                Lihat Semua <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {featuredUkm.map((ukm, i) => (
              <Reveal key={ukm.id} delay={i * 0.06}>
                <Link
                  href={`/ukm/${ukm.slug}`}
                  aria-label={`Kartu UKM: ${ukm.name}, kategori ${ukm.category}. Tekan Enter untuk lihat profil lengkap.`}
                  data-narration={`Kartu UKM: ${ukm.name}, kategori ${ukm.category}. ${ukm.description ?? ""}. Tekan Enter untuk profil lengkap.`}
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="card-gelex p-4 flex items-center gap-3 h-full"
                  >
                    <img
                      src={ukm.logo}
                      alt=""
                      aria-hidden="true"
                      className="w-11 h-11 rounded-xl object-cover flex-shrink-0 border border-[#FADADD]"
                    />
                    <div>
                      <div className="font-body font-bold text-sm text-[#3d2c1e] leading-tight">{ukm.name}</div>
                      <span className="text-[10px] bg-[#FADADD]/80 text-[#E8896A] px-2 py-0.5 rounded-full mt-1 inline-block font-body">
                        {ukm.category}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Category overview */}
          <Reveal delay={0.2} className="mt-8 grid sm:grid-cols-4 gap-3">
            {[
              { label: "Seni", count: ukmList.filter((u) => u.category === "Seni").length },
              { label: "Olahraga", count: ukmList.filter((u) => u.category === "Olahraga").length },
              { label: "Rohani", count: ukmList.filter((u) => u.category === "Rohani").length },
              { label: "Khusus", count: ukmList.filter((u) => u.category === "Khusus").length },
            ].map((cat) => (
              <Link
                key={cat.label}
                href="/ukm"
                aria-label={`Filter UKM kategori ${cat.label}, ${cat.count} UKM tersedia`}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-[#FFF8F0] border border-[#FADADD] p-4 text-center cursor-pointer hover:border-[#E8896A]/30 transition-colors"
                >
                  <div className="font-heading font-bold text-[#E8896A] text-lg">{cat.count}</div>
                  <div className="text-xs text-[#8B7355] font-body">{cat.label}</div>
                </motion.div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ KOMUNITAS ══════════════════════════════════════════ */}
      <section
        data-section="komunitas"
        data-narration={N.komunitas}
        tabIndex={-1}
        className="py-20 px-6 bg-[#FFF8F0] border-t border-[#FADADD]/40"
      >
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex items-start justify-between flex-wrap gap-4 mb-14">
            <div>
              <p className="text-[#E8896A]/60 font-body font-semibold text-sm tracking-widest uppercase mb-2">Komunitas Mahasiswa</p>
              <h2 className="section-title">Jelajah Komunitas</h2>
              <p className="section-subtitle">Bergabung dengan komunitas sesuai passion-mu</p>
            </div>
            <div className="flex items-center gap-3">
              <SectionNarrator text={N.komunitas} />
              <Link href="/komunitas" className="btn-secondary text-sm" aria-label="Lihat semua komunitas GELEX 2026">
                Lihat Semua <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featuredKomunitas.map((kom, i) => (
              <Reveal key={kom.id} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="card-gelex p-5 flex items-center gap-4"
                  data-narration={`Komunitas ${kom.name}. ${kom.description}`}
                  tabIndex={0}
                  role="article"
                  aria-label={`Komunitas ${kom.name}. ${kom.description}`}
                >
                  <img
                    src={kom.logo}
                    alt=""
                    aria-hidden="true"
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-[#FADADD]"
                  />
                  <div>
                    <div className="font-body font-bold text-sm text-[#3d2c1e] leading-tight">{kom.name}</div>
                    <div className="text-xs text-[#8B7355] font-body mt-0.5 line-clamp-2">{kom.description}</div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GAMES PROMO ══════════════════════════════════════ */}
      <section
        data-section="games"
        data-narration={N.games}
        tabIndex={-1}
        className="py-20 px-6 bg-[#E8896A] relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5" aria-hidden="true">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-heading font-bold text-[2.75rem] text-white mb-3">
              Geleverse
            </h2>
            <p className="font-body text-white/85 text-base mb-3 leading-relaxed max-w-lg mx-auto">
              Dunia interaktif GELEX 2026. Main game seru, ikuti kuis UKM, gambar bareng Shelly, dan ekspresikan kreativitasmu!
            </p>
            <div className="flex justify-center mb-7">
              <SectionNarrator text={N.games} />
            </div>

            {/* Game preview chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-9" aria-label="Daftar mini games yang tersedia">
              {["Kuis UKM", "TTS Rohani", "Game Olahraga", "Game Seni"].map((g) => (
                <span
                  key={g}
                  className="bg-white/20 text-white font-body text-sm px-4 py-1.5 rounded-full border border-white/30"
                >
                  {g}
                </span>
              ))}
            </div>

            <Link
              href="/games"
              className="inline-flex items-center gap-2 bg-white text-[#E8896A] font-heading font-bold text-base px-10 py-3.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:bg-[#FFF5F0] active:scale-[0.97] transition-all duration-150 cursor-pointer"
              aria-label="Buka halaman Geleverse dan mulai bermain"
            >
              <Gamepad2 className="w-4 h-4" aria-hidden="true" />
              Main Sekarang!
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER CTA ════════════════════════════════════════ */}
      <section className="py-14 px-6 bg-white border-t border-[#FADADD]/50">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-[#E8896A] font-body font-semibold text-xs tracking-widest uppercase mb-3">
              Gelanggang Mahasiswa UGM
            </p>
            <h2 className="font-heading font-bold text-[2rem] text-[#3d2c1e] mb-1.5">
              Sampai Jumpa di GELEX 2026!
            </h2>
            <p className="font-body text-[#8B7355] text-base mb-7">
              1–3 Agustus 2026 · Yogyakarta
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/tentang" className="btn-primary text-sm px-6 py-3" aria-label="Baca tentang GELEX 2026">
                Tentang GELEX <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <Link href="/linimasa" className="btn-secondary text-sm px-6 py-3" aria-label="Lihat jadwal lengkap GELEX 2026">
                Lihat Jadwal <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Fixed Shelly ──────────────────────────────────────── */}
      <Shelly
        mood="waving"
        message="Hai! Aku Shelly! Tekan Alt N untuk loncat ke section berikutnya, atau Spasi untuk dengar ulang panduan halaman ini."
        position="bottom-right"
        size="md"
        autoShow
      />
    </div>
  );
}
