"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useSpeech } from "@/hooks/useSpeech";

const navLinks = [
  { href: "/beranda", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/linimasa", label: "Linimasa" },
  { href: "/ukm", label: "UKM" },
  { href: "/komunitas", label: "Komunitas" },
  { href: "/galeri", label: "Galeri" },
  { href: "/games", label: "🎮 Games" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAccessibilityMode, toggleAccessibilityMode } = useAccessibility();
  const { stop } = useSpeech();

  const handleA11yToggle = () => {
    if (isAccessibilityMode) stop();
    toggleAccessibilityMode();
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-peach/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/beranda" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:animate-bob inline-block">🐢</span>
          <span className="font-heading font-black text-xl text-shelly-dark tracking-tight">
            GELEX <span className="text-coral">2026</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-full text-sm font-body font-600 transition-all ${
                pathname === link.href
                  ? "bg-peach text-shelly-dark font-bold"
                  : "text-shelly/70 hover:text-shelly hover:bg-peach/40"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Accessibility toggle */}
          <button
            onClick={handleA11yToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-body transition-all border ${
              isAccessibilityMode
                ? "bg-coral text-white border-coral shadow-warm"
                : "bg-white text-shelly/60 border-peach hover:border-coral hover:text-shelly"
            }`}
            title={isAccessibilityMode ? "Matikan mode suara" : "Aktifkan mode suara Shelly"}
          >
            <span>{isAccessibilityMode ? "🔊" : "🔇"}</span>
            <span className="hidden sm:inline">{isAccessibilityMode ? "Suara Aktif" : "Mode Suara"}</span>
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-peach/40 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-shelly mb-1 transition-all" />
            <span className="block w-5 h-0.5 bg-shelly mb-1" />
            <span className="block w-5 h-0.5 bg-shelly" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-peach/40 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2.5 text-sm font-body text-shelly/80 hover:text-shelly border-b border-peach/20 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
