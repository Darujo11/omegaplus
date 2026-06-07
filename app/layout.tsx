import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// IBM Plex — superfamília criada pela IBM para uma empresa de tecnologia/engenharia.
// Sans para títulos + corpo; Mono (mesma família) para labels técnicos, specs e números.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Omega CSA Engenharia — Campos dos Goytacazes, RJ",
    template: "%s | Omega CSA Engenharia",
  },
  description:
    "Empresa de engenharia civil, recursos hídricos, saneamento e gestão de obras em Campos dos Goytacazes, RJ. Soluções técnicas com excelência e responsabilidade.",
  keywords: [
    "engenharia civil",
    "recursos hídricos",
    "saneamento básico",
    "gestão de obras",
    "laudos técnicos",
    "Campos dos Goytacazes",
    "Norte Fluminense",
    "CREA-RJ",
  ],
  authors: [{ name: "Omega CSA Engenharia" }],
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Omega CSA Engenharia",
    title: "Omega CSA Engenharia",
    description: "Engenharia civil, recursos hídricos e saneamento no Norte Fluminense.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
