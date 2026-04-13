"use client";

interface CloudProps {
  top: string;
  delay: string;
  duration: string;
  scale: number;
  opacity: number;
}

function CloudShape({ scale, opacity }: { scale: number; opacity: number }) {
  return (
    <svg
      viewBox="0 0 240 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: `${200 * scale}px`, opacity }}
    >
      <path
        d="M30 58 Q16 36 38 30 Q32 6 60 18 Q66 0 96 12 Q120 0 132 24 Q162 12 168 42 Q192 36 186 60 Q192 78 168 72 Q156 90 120 78 Q96 96 72 78 Q48 90 24 72 Q6 78 30 58Z"
        fill="#FADADD"
      />
      <path
        d="M80 52 Q74 38 90 34 Q86 22 104 28 Q110 18 128 26 Q146 18 150 34 Q164 32 162 48 Q166 58 150 54 Q140 64 116 56 Q98 66 82 56 Q70 60 80 52Z"
        fill="#F4A98A"
        fillOpacity="0.35"
      />
    </svg>
  );
}

const CLOUDS: CloudProps[] = [
  { top: "6%",  delay: "0s",  duration: "22s", scale: 1,    opacity: 0.45 },
  { top: "22%", delay: "7s",  duration: "28s", scale: 0.7,  opacity: 0.3  },
  { top: "50%", delay: "14s", duration: "25s", scale: 0.85, opacity: 0.35 },
  { top: "74%", delay: "3s",  duration: "32s", scale: 0.6,  opacity: 0.25 },
];

export default function CloudOrnament() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {CLOUDS.map((cloud, i) => (
        /* Outer wrapper: CSS handles the horizontal scroll (avoids framer-motion transform conflict) */
        <div
          key={i}
          className="absolute animate-cloud"
          style={{
            top: cloud.top,
            animationDuration: cloud.duration,
            animationDelay: cloud.delay,
          }}
        >
          <CloudShape scale={cloud.scale} opacity={cloud.opacity} />
        </div>
      ))}
    </div>
  );
}
