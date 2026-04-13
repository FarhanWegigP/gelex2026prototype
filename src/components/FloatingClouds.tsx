"use client";

function CloudSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50 Q10 30 30 25 Q25 5 50 15 Q55 0 80 10 Q100 0 110 20 Q135 10 140 35 Q160 30 155 50 Q160 65 140 60 Q130 75 100 65 Q80 80 60 65 Q40 75 20 60 Q5 65 20 50Z" fill="#FADADD" fillOpacity="0.7" />
      <path d="M60 48 Q55 35 68 32 Q65 20 80 25 Q85 15 100 22 Q115 15 118 30 Q130 28 128 42 Q133 52 120 50 Q112 58 95 52 Q80 60 65 52 Q55 56 60 48Z" fill="#FADADD" fillOpacity="0.5" />
    </svg>
  );
}

interface FloatingCloudsProps {
  count?: number;
}

export default function FloatingClouds({ count = 3 }: FloatingCloudsProps) {
  const clouds = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${10 + i * 20}%`,
    delay: `${i * 7}s`,
    duration: `${18 + i * 5}s`,
    scale: 0.6 + i * 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute animate-cloud"
          style={{
            top: cloud.top,
            animationDelay: cloud.delay,
            animationDuration: cloud.duration,
            transform: `scale(${cloud.scale})`,
          }}
        >
          <CloudSVG className="w-48 opacity-60" />
        </div>
      ))}
    </div>
  );
}
