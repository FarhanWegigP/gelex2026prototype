import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientInit from "@/components/ClientInit";
import { AccessibilityProvider } from "@/hooks/useAccessibility";

export const metadata: Metadata = {
  title: "GELEX 2026 — Where Creativity Comes Alive and Talent Shines",
  description:
    "Gelanggang Expo 2026 — Pameran tahunan UKM dan komunitas Universitas Gadjah Mada. 1–3 Agustus 2026.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐢</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AccessibilityProvider>
          {/* Keyboard shortcuts + aria-live region for screen reader fallback */}
          <ClientInit />
          <Navbar />
          <main>{children}</main>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
