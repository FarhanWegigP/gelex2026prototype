"use client";

// Stars data: [x%, y%, size-px, delay-s, duration-s]
const STARS = [
  [5, 12, 2, 0, 2.8], [12, 35, 1.5, 0.5, 3.5], [18, 8, 3, 1.2, 2.2],
  [25, 60, 1, 0.3, 4.1], [32, 22, 2, 1.8, 3.0], [40, 75, 1.5, 0.7, 2.6],
  [48, 15, 2.5, 0.1, 3.8], [55, 45, 1, 1.5, 2.4], [62, 28, 2, 0.9, 3.2],
  [70, 68, 1.5, 0.4, 4.5], [78, 10, 3, 1.1, 2.9], [85, 52, 1, 0.6, 3.6],
  [90, 30, 2, 1.7, 2.3], [95, 72, 1.5, 0.2, 4.0], [8, 85, 1, 1.3, 3.1],
  [22, 92, 2, 0.8, 2.7], [38, 88, 1.5, 1.6, 3.9], [52, 95, 1, 0.0, 2.5],
  [67, 82, 2.5, 1.4, 3.3], [82, 90, 1, 0.3, 4.2], [15, 55, 1, 0.9, 3.7],
  [45, 38, 2, 1.0, 2.1], [72, 42, 1.5, 0.5, 4.3], [88, 65, 1, 1.9, 2.8],
  [35, 5, 2, 0.7, 3.4], [58, 3, 1.5, 1.3, 2.6], [76, 18, 1, 0.2, 3.9],
];

// Shooting stars: [x%, y%, angle-deg, duration-s, delay-s]
const SHOOTING_STARS = [
  { x: "15%", y: "20%", angle: -35, duration: "4s", delay: "0s" },
  { x: "55%", y: "10%", angle: -42, duration: "5s", delay: "2.5s" },
  { x: "80%", y: "35%", angle: -30, duration: "4.5s", delay: "5s" },
];

// Planets: [x%, y%, size-px, color, glow-color, blur]
const PLANETS = [
  { x: "88%", y: "8%",  size: 28, color: "rgba(56,189,248,0.15)", border: "rgba(56,189,248,0.5)",  glow: "rgba(56,189,248,0.3)"  },
  { x: "5%",  y: "65%", size: 18, color: "rgba(129,140,248,0.15)", border: "rgba(129,140,248,0.5)", glow: "rgba(129,140,248,0.3)" },
  { x: "92%", y: "75%", size: 14, color: "rgba(52,211,153,0.15)",  border: "rgba(52,211,153,0.5)",  glow: "rgba(52,211,153,0.3)"  },
];

export default function GalaxyOrnament() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Nebula blobs */}
      <div
        className="absolute rounded-full blur-3xl nebula-blob"
        style={{ width: 400, height: 300, top: "-10%", left: "60%",
          background: "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 70%)" }}
      />
      <div
        className="absolute rounded-full blur-3xl nebula-blob"
        style={{ width: 350, height: 250, top: "50%", left: "-5%", animationDelay: "4s",
          background: "radial-gradient(ellipse, rgba(129,140,248,0.06) 0%, transparent 70%)" }}
      />

      {/* Twinkling stars */}
      {STARS.map(([x, y, size, delay, duration], i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Shooting stars */}
      {SHOOTING_STARS.map((s, i) => (
        <div
          key={i}
          className="shooting-star"
          style={{
            left: s.x,
            top: s.y,
            "--shoot-angle": `${s.angle}deg`,
            "--shoot-duration": s.duration,
            "--shoot-delay": s.delay,
            "--shoot-x": "350px",
            "--shoot-y": "180px",
          } as React.CSSProperties}
        />
      ))}

      {/* Decorative planets */}
      {PLANETS.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
            border: `1.5px solid ${p.border}`,
            boxShadow: `0 0 20px ${p.glow}`,
            animation: `planetGlow ${3 + i}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
