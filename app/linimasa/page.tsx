"use client";
import { useState, useEffect } from "react";
import Glexy from "@/components/Glexy";
import SectionNarrator from "@/components/SectionNarrator";
import { useAccessibility } from "@/hooks/useAccessibility";
import { linimasaEvents, LinimasaEvent } from "@/data";

type Day = 1 | 2 | 3;

const dayInfo = {
  1: { label: "Hari 1", date: "1 Agustus 2026", glexyMsg: "Hari pertama selalu paling seru! Glexy excited banget! 🌌" },
  2: { label: "Hari 2", date: "2 Agustus 2026", glexyMsg: "Hari kedua makin meriah! Jangan sampai kelewatan! ⭐" },
  3: { label: "Hari 3", date: "3 Agustus 2026", glexyMsg: "Hari terakhir! Nikmatin setiap momennya ya! 🎉" },
};

const typeColor: Record<LinimasaEvent["type"], string> = {
  penampilan: "bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20",
  seremonial: "bg-[#818CF8]/10 text-[#818CF8] border border-[#818CF8]/20",
  workshop:   "bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20",
};

const PAGE_GREETING =
  "Kamu di halaman Linimasa. Ada 3 tab hari: Hari 1 tanggal 1 Agustus, Hari 2 tanggal 2 Agustus, Hari 3 tanggal 3 Agustus. Tab aktif saat ini adalah Hari 1. Tekan Tab untuk navigasi antar hari, tekan Enter pada event untuk dengar detailnya.";

export default function LinimasaPage() {
  const [activeDay, setActiveDay] = useState<Day>(1);
  const [selected, setSelected] = useState<LinimasaEvent | null>(null);
  const { autoGreetOnMount } = useAccessibility();

  useEffect(() => {
    return autoGreetOnMount(PAGE_GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dayEvents = linimasaEvents.filter((e) => e.day === activeDay);
  const narration = `Linimasa GELEX 2026 Hari ${activeDay}, ${dayInfo[activeDay].date}. ${dayEvents.map((e) => `Pukul ${e.time}, ${e.title}`).join(". ")}.`;

  return (
    <div className="min-h-screen bg-[#060B18] pb-24">
      {/* Header */}
      <div
        className="bg-gradient-to-br from-[#060B18] via-[#0D1B4B] to-[#120A3B] py-16 px-6 border-b border-[#38BDF8]/10"
        data-section="header"
        data-narration={PAGE_GREETING}
        tabIndex={-1}
      >
        <div className="max-w-4xl mx-auto flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="section-title">Linimasa GELEX 2026</h1>
            <p className="section-subtitle">Tiga hari penuh kreativitas dan semangat</p>
          </div>
          <SectionNarrator text={narration} label="Dengarkan jadwal hari ini" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-8">
        {/* Day tabs */}
        <div
          className="flex gap-3 mb-8"
          role="tablist"
          aria-label="Pilih hari"
          data-section="days"
          data-narration={`Pilihan hari tersedia: Hari 1, Hari 2, Hari 3. Saat ini menampilkan Hari ${activeDay}.`}
          tabIndex={-1}
        >
          {([1, 2, 3] as Day[]).map((day) => (
            <button
              key={day}
              role="tab"
              aria-selected={activeDay === day}
              aria-label={`Hari ${day}, ${day} Agustus 2026`}
              onClick={() => setActiveDay(day)}
              className={`flex-1 py-3 px-4 rounded-2xl font-heading font-bold text-sm transition-all duration-150 ${
                activeDay === day
                  ? "bg-[#38BDF8] text-[#060B18] shadow-[0_0_16px_rgba(56,189,248,0.4)]"
                  : "bg-white/5 border border-[#38BDF8]/15 text-[#94A3B8] hover:border-[#38BDF8]/40 hover:text-[#38BDF8]"
              }`}
            >
              <div>Hari {day}</div>
              <div className={`text-xs font-body font-normal mt-0.5 ${activeDay === day ? "text-[#060B18]/70" : "text-[#94A3B8]/60"}`}>
                {day} Agustus 2026
              </div>
            </button>
          ))}
        </div>

        {/* Events list */}
        <div
          className="space-y-3"
          role="tabpanel"
          aria-label={`Jadwal Hari ${activeDay}`}
          data-section="events"
          data-narration={narration}
          tabIndex={-1}
        >
          {dayEvents.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelected(event)}
              aria-label={`${event.title}, pukul ${event.time}, jenis ${event.type}. Tekan Enter untuk detail.`}
              data-narration={`${event.title}, pukul ${event.time}. ${event.description ?? ""}`}
              className="w-full card-gelex p-4 flex items-center gap-4 text-left hover:border-[#38BDF8]/30 transition-colors"
            >
              <div className="font-heading font-black text-lg text-[#38BDF8] min-w-[60px]">{event.time}</div>
              <div className="flex-1">
                <div className="font-body font-bold text-[#E2E8F0]">{event.title}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block font-body ${typeColor[event.type]}`}>
                  {event.type}
                </span>
              </div>
              <span className="text-[#38BDF8]/30 text-lg" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-[#060B18]/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Detail acara: ${selected.title}`}
        >
          <div
            className="bg-[#0D1B4B] border border-[#38BDF8]/20 rounded-3xl shadow-[0_0_60px_rgba(56,189,248,0.15)] p-8 max-w-md w-full animate-slide-up backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#38BDF8] to-[#818CF8]" />
            <div className="font-heading font-black text-2xl text-[#E2E8F0]">{selected.title}</div>
            <div className="text-[#38BDF8] font-heading font-bold mt-1">
              Pukul {selected.time} · {dayInfo[selected.day].date}
            </div>
            <p className="font-body text-[#94A3B8] mt-4 leading-relaxed">{selected.description}</p>
            <button
              onClick={() => setSelected(null)}
              className="btn-primary mt-6 w-full"
              aria-label="Tutup detail acara"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <Glexy mood="excited" message={dayInfo[activeDay].glexyMsg} position="bottom-right" size="md" />
    </div>
  );
}
