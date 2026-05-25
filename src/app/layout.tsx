import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "CoinVision AI — Plataforma Numismática Inteligente",
  description: "Identifique, avalie e catalogue moedas raras com inteligência artificial avançada. OCR, visão computacional e análise de mercado em tempo real.",
  keywords: "numismática, moedas raras, IA, identificação de moedas, catálogo numismático, avaliação de moedas",
  openGraph: {
    title: "CoinVision AI",
    description: "Plataforma SaaS de análise numismática com IA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1A2332",
              color: "#F0F4FF",
              border: "1px solid #2A3A55",
              borderRadius: "0.75rem",
            },
            success: { iconTheme: { primary: "#D4AF37", secondary: "#0D1117" } },
          }}
        />
      </body>
    </html>
  );

}
