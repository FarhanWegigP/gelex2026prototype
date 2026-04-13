"use client";
import { useEffect } from "react";
import Shelly from "@/components/Shelly";
import SectionNarrator from "@/components/SectionNarrator";
import { useAccessibility } from "@/hooks/useAccessibility";

const NARRATION =
  "Tentang GELEX 2026. Gelanggang Expo atau GELEX merupakan acara tahunan yang menghadirkan pameran dan penampilan dari berbagai Unit Kegiatan Mahasiswa serta komunitas yang ada di Universitas Gadjah Mada. GELEX menjadi ruang bagi mahasiswa, khususnya mahasiswa baru, untuk mengenal lebih dekat wajah dan dinamika UKM di UGM. Lokasi: Gelanggang Mahasiswa UGM, Jalan Yacaranda Flat A6, Blimbingsari, Caturtunggal, Depok, Sleman, Daerah Istimewa Yogyakarta.";

const PAGE_GREETING =
  "Kamu di halaman Tentang GELEX. Halaman ini berisi informasi tentang Gelanggang Expo 2026, galeri foto kegiatan, dan lokasi acara di Gelanggang Mahasiswa UGM Yogyakarta.";

export default function TentangPage() {
  const { autoGreetOnMount } = useAccessibility();

  useEffect(() => {
    return autoGreetOnMount(PAGE_GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-offwhite pb-24">
      <div
        className="bg-gelex-gradient py-16 px-6"
        data-section="header"
        data-narration={PAGE_GREETING}
        tabIndex={-1}
      >
        <div className="max-w-4xl mx-auto flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="section-title">Tentang GELEX</h1>
            <p className="section-subtitle">Mengenal lebih dekat Gelanggang Expo 2026</p>
          </div>
          <SectionNarrator text={NARRATION} label="Dengarkan tentang GELEX" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-10 space-y-8">
        {/* About card */}
        <div
          className="card-gelex p-6 md:p-8"
          data-section="tentang"
          data-narration={NARRATION}
          tabIndex={-1}
        >
          <h2 className="font-heading font-bold text-xl text-shelly-dark mb-4">Apa itu GELEX?</h2>
          <p className="font-body text-shelly/70 leading-relaxed text-lg">
            Gelanggang Expo atau <strong>GELEX</strong> merupakan acara tahunan yang menghadirkan pameran dan penampilan dari berbagai Unit Kegiatan Mahasiswa (UKM) serta komunitas yang ada di Universitas Gadjah Mada.
          </p>
          <p className="font-body text-shelly/70 leading-relaxed text-lg mt-4">
            GELEX menjadi ruang bagi mahasiswa, khususnya mahasiswa baru, untuk mengenal lebih dekat wajah dan dinamika UKM di UGM. Melalui berbagai booth pameran, penampilan seni, dan demonstrasi kegiatan, pengunjung dapat menemukan UKM yang paling sesuai dengan minat dan passion mereka.
          </p>
        </div>

        {/* Gallery */}
        <div data-section="galeri" data-narration="Galeri foto kegiatan GELEX tahun-tahun sebelumnya." tabIndex={-1}>
          <h2 className="font-heading font-bold text-xl text-shelly-dark mb-4">Galeri GELEX</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-white to-[#FDEEC9] border border-peach/40 p-3">
                <div className="w-full h-full rounded-xl border border-dashed border-[#E8896A]/35 bg-white/80 flex items-center justify-center text-center px-3">
                  <div>
                    <div className="font-heading font-bold text-lg text-[#E8896A] mb-1">
                      Isi gambar
                    </div>
                    <div className="text-xs font-body text-shelly/60">
                      Slot galeri {i + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div
          className="card-gelex p-6"
          data-section="lokasi"
          data-narration="Lokasi GELEX 2026: Gelanggang Mahasiswa UGM, Jalan Yacaranda Flat A6, Blimbingsari, Caturtunggal, Depok, Sleman, DIY."
          tabIndex={-1}
        >
          <h2 className="font-heading font-bold text-xl text-shelly-dark mb-4">Lokasi</h2>
          <p className="font-body text-shelly/70 mb-4">
            Gelanggang Mahasiswa UGM<br />
            Jalan Yacaranda Flat A6, Blimbingsari, Caturtunggal, Depok, Sleman, DIY 55281
          </p>
          <div className="rounded-2xl overflow-hidden h-64 border border-peach">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.7!2d110.3784!3d-7.7695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59b0a3d3c12d%3A0x5e0e4a0e!2sGelanggang+Mahasiswa+UGM!5e0!3m2!1sen!2sid!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta lokasi Gelanggang Mahasiswa UGM"
              aria-label="Peta Google Maps lokasi Gelanggang Mahasiswa UGM, Yogyakarta"
            />
          </div>
        </div>
      </div>

      <Shelly mood="happy" message="GELEX itu seru banget! Shelly udah gak sabar!" position="bottom-right" size="md" />
    </div>
  );
}
