"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useSpeech } from "@/hooks/useSpeech";

const NAV_LINKS = [
  { href: "/beranda",    label: "Beranda" },
  { href: "/tentang",    label: "Tentang" },
  { href: "/linimasa",   label: "Linimasa" },
  { href: "/ukm",        label: "UKM" },
  { href: "/komunitas",  label: "Komunitas" },
  { href: "/games",      label: "Games" },
  { href: "/apresiasi",  label: "Apresiasi" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAccessibilityMode, toggleAccessibilityMode } = useAccessibility();
  const { stop, isSpeaking } = useSpeech();

  const handleA11y = () => {
    if (isAccessibilityMode) stop();
    toggleAccessibilityMode();
  };

  const isActive = isAccessibilityMode || isSpeaking;
  const buttonLabel = isActive ? "Matikan Suara" : "Aktifkan Suara";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 bg-[#060B18]/80 backdrop-blur-md border-b border-[#38BDF8]/10 shadow-[0_1px_20px_rgba(56,189,248,0.06)]"
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/beranda" className="flex items-center gap-2.5 group" aria-label="GELEX 2026 — kembali ke beranda">
          <motion.div
            whileHover={{ rotate: 8 }}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#818CF8] flex items-center justify-center overflow-hidden p-1 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
          >
            <Image
              src="/logo-icon.svg"
              alt="Logo GELEX"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
          </motion.div>
          <div className="leading-tight">
            <div className="font-heading font-bold text-[#38BDF8] text-base tracking-wide">GELEX</div>
            <div className="text-[10px] text-[#94A3B8] font-body -mt-0.5">2026</div>
          </div>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="relative px-3 py-2" aria-current={active ? "page" : undefined}>
                <span
                  className={`text-sm font-body font-semibold transition-colors ${
                    active ? "text-[#38BDF8]" : "text-[#94A3B8] hover:text-[#38BDF8]"
                  }`}
                >
                  {link.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#38BDF8] to-[#818CF8] rounded-full shadow-[0_0_6px_rgba(56,189,248,0.6)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleA11y}
            title={buttonLabel}
            aria-label={buttonLabel}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-body transition-all duration-150 border ${
              isActive
                ? "bg-[#38BDF8] text-[#060B18] border-transparent shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                : "bg-white/5 text-[#94A3B8] border-[#38BDF8]/20 hover:border-[#38BDF8]/50 hover:text-[#38BDF8]"
            }`}
          >
            {isActive ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            <span className="hidden sm:inline text-xs">{buttonLabel}</span>
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-xl hover:bg-[#38BDF8]/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-[#38BDF8]" />
            ) : (
              <Menu className="w-5 h-5 text-[#38BDF8]" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#0D1B4B]/90 border-t border-[#38BDF8]/10 backdrop-blur-md"
          >
            <nav aria-label="Navigasi mobile" className="px-4 py-3 flex flex-wrap gap-2">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`px-4 py-1.5 rounded-full text-sm font-body font-semibold transition-all duration-150 ${
                      active
                        ? "bg-[#38BDF8] text-[#060B18]"
                        : "bg-white/5 text-[#94A3B8] border border-[#38BDF8]/15 hover:border-[#38BDF8]/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
