import Link from "next/link";
import { ukmList } from "@/data";
import { notFound } from "next/navigation";
import Shelly from "@/components/Shelly";

export function generateStaticParams() {
  return ukmList.map((ukm) => ({ slug: ukm.slug }));
}

export default function UKMDetailPage({ params }: { params: { slug: string } }) {
  const ukm = ukmList.find((u) => u.slug === params.slug);
  if (!ukm) notFound();

  return (
    <div className="min-h-screen bg-offwhite pb-24">
      <div className="bg-gelex-gradient py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/ukm" className="text-shelly/50 hover:text-shelly text-sm font-body mb-6 inline-block">← Kembali ke UKM</Link>
          <div className="flex items-center gap-5">
            <img src={ukm.logo} alt={ukm.name} className="w-20 h-20 rounded-2xl shadow-warm" />
            <div>
              <span className="text-xs bg-peach/60 text-shelly px-2 py-0.5 rounded-full font-body">{ukm.category}</span>
              <h1 className="font-heading font-black text-3xl text-shelly-dark mt-1">{ukm.name}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 mt-8">
        <div className="card-gelex p-6">
          <h2 className="font-heading font-bold text-lg text-shelly-dark mb-3">Tentang {ukm.name}</h2>
          <p className="font-body text-shelly/70 leading-relaxed">{ukm.description}</p>
        </div>
      </div>
      <Shelly mood="happy" message={ukm.shellyMessage} position="bottom-right" size="md" />
    </div>
  );
}
