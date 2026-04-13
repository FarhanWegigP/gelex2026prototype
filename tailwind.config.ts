import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-fredoka)", "sans-serif"],
        body: ["var(--font-nunito)", "sans-serif"],
      },
      colors: {
        // Galaxy theme palette
        galaxy: {
          DEFAULT: "#060B18",
          navy: "#0D1B4B",
          purple: "#120A3B",
          deep: "#030610",
        },
        nebula: {
          DEFAULT: "#38BDF8",   // sky blue — primary accent
          dark: "#0EA5E9",
          violet: "#818CF8",    // indigo/violet accent
          teal: "#34D399",      // teal glow
        },
        stardust: {
          DEFAULT: "#E2E8F0",   // star white / primary text
          muted: "#94A3B8",     // muted text
          soft: "#CBD5E1",      // soft text
        },
        // Legacy aliases kept for backward compat (mapped to galaxy)
        peach: { DEFAULT: "rgba(56,189,248,0.12)", dark: "rgba(56,189,248,0.2)" },
        cream: { DEFAULT: "rgba(129,140,248,0.12)", dark: "rgba(129,140,248,0.2)" },
        coral: { DEFAULT: "#60A5FA", dark: "#38BDF8" },
        shelly: { DEFAULT: "#38BDF8", dark: "#0EA5E9" },
        offwhite: "#060B18",
      },
      animation: {
        bob: "bob 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        cloud: "cloud 22s linear infinite",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "bubble-in": "bubbleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
        // Galaxy animations
        twinkle: "twinkle 3s ease-in-out infinite",
        "twinkle-slow": "twinkle 5s ease-in-out infinite",
        "twinkle-fast": "twinkle 1.8s ease-in-out infinite",
        "shooting-star": "shootingStar 4s linear infinite",
        "orbit": "orbit 20s linear infinite",
        "orbit-slow": "orbit 35s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "nebula-drift": "nebulaDrift 12s ease-in-out infinite",
      },
      keyframes: {
        bob: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px) rotate(-1deg)" },
          "50%": { transform: "translateY(-14px) rotate(1deg)" },
        },
        cloud: {
          "0%": { transform: "translateX(-220px)" },
          "100%": { transform: "translateX(calc(100vw + 220px))" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        bubbleIn: {
          from: { opacity: "0", transform: "scale(0.5) translateY(10px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        twinkle: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.2", transform: "scale(0.6)" },
        },
        shootingStar: {
          "0%": { transform: "translateX(0) translateY(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "translateX(300px) translateY(150px)", opacity: "0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(60px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(60px) rotate(-360deg)" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 20px rgba(56,189,248,0.3)" },
          "50%": { boxShadow: "0 0 50px rgba(56,189,248,0.7), 0 0 100px rgba(56,189,248,0.3)" },
        },
        nebulaDrift: {
          "0%,100%": { transform: "translateY(0px) scale(1)", opacity: "0.6" },
          "50%": { transform: "translateY(-20px) scale(1.05)", opacity: "0.8" },
        },
      },
      backgroundImage: {
        "gelex-gradient": "linear-gradient(135deg, #060B18 0%, #0D1B4B 50%, #120A3B 100%)",
        "hero-gradient": "linear-gradient(135deg, #060B18 0%, #0D1B4B 50%, #120A3B 100%)",
        "galaxy-gradient": "radial-gradient(ellipse at center, #0D1B4B 0%, #060B18 100%)",
        "nebula-gradient": "linear-gradient(to right, #38BDF8, #818CF8)",
        "warm-gradient": "linear-gradient(to right, #38BDF8, #818CF8)",
        "star-gradient": "radial-gradient(circle, #E2E8F0 0%, transparent 70%)",
      },
      boxShadow: {
        warm: "0 4px 24px rgba(56,189,248,0.2)",
        "warm-lg": "0 8px 40px rgba(56,189,248,0.3)",
        card: "0 4px 24px rgba(56,189,248,0.1)",
        glow: "0 0 40px rgba(56,189,248,0.4)",
        "glow-violet": "0 0 40px rgba(129,140,248,0.4)",
        "planet": "0 0 30px rgba(56,189,248,0.5), inset 0 0 20px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
