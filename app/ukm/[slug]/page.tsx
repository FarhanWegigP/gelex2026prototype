import Link from "next/link";
import { ukmList } from "@/data";
import { notFound } from "next/navigation";
import Glexy from "@/components/Glexy";

export function generateStaticParams() {
  return ukmList.map((ukm) => ({ slug: ukm.slug }));
}

export default function UKMDetailPage({ params }: { params: { slug: string } }) {
  const ukm = ukmList.find((u) => u.slug === params.slug);
  if (!ukm) notFound();

  return (
    <div className="min-h-screen bg-[#060B18] pb-24">
      <div className="bg-gradient-to-br from-[#060B18] via-[#0D1B4B] to-[#120A3B] py-16 px-6 border-b border-[#38BDF8]/10">
        <div className="max-w-3xl mx-auto">
          <Link href="/ukm" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-body mb-6 inline-block transition-colors">← Kembali ke UKM</Link>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl shadow-warm bg-[#38BDF8]/5 border border-[#38BDF8]/15 flex items-center justify-center text-center px-2">
              <span className="text-xs font-body font-semibold leading-tight text-[#38BDF8]">
                Isi gambar
              </span>
            </div>
            <div>
              <span className="text-xs bg-[#38BDF8]/10 text-[#38BDF8] px-2 py-0.5 rounded-full font-body">{ukm.category}</span>
              <h1 className="font-heading font-black text-3xl text-[#E2E8F0] mt-1">{ukm.name}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 mt-8">
        <div className="card-gelex p-6">
          <h2 className="font-heading font-bold text-lg text-[#38BDF8] mb-3">Tentang {ukm.name}</h2>
          <p className="font-body text-[#CBD5E1] leading-relaxed">{ukm.description}</p>
        </div>
      </div>
      <Glexy mood="happy" message={ukm.glexyMessage} position="bottom-right" size="md" />
    </div>
  );
}
