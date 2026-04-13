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
        peach: { DEFAULT: "#FADADD", dark: "#F4B8BE" },
        cream: { DEFAULT: "#FDEEC9", dark: "#F9E0A0" },
        coral: { DEFAULT: "#F4A98A", dark: "#E8896A" },
        shelly: { DEFAULT: "#E8896A", dark: "#C96B4E" },
        offwhite: "#FFF8F0",
      },
      animation: {
        bob: "bob 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        cloud: "cloud 22s linear infinite",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "bubble-in": "bubbleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
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
      },
      backgroundImage: {
        "gelex-gradient": "linear-gradient(135deg, #FFF8F0 0%, #FDEEC9 40%, #FADADD 100%)",
        "hero-gradient": "linear-gradient(135deg, #FFF8F0 0%, #FDEEC9 50%, #FADADD 100%)",
        "warm-gradient": "linear-gradient(to right, #F4A98A, #E8896A)",
      },
      boxShadow: {
        warm: "0 4px 24px rgba(248,180,140,0.25)",
        "warm-lg": "0 8px 40px rgba(248,180,140,0.35)",
        card: "0 4px 24px rgba(232,137,106,0.12)",
        glow: "0 0 40px rgba(232,137,106,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
