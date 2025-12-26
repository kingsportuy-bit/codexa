import type { Metadata } from "next";
import { Space_Grotesk, Inter } from 'next/font/google';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { BackgroundScene } from "@/components/BackgroundScene";

// Configuración de fuentes de Google
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Codexa - Software a medida",
  description: "Desarrollo de software a medida, productos SaaS, e integración de inteligencia artificial con agentes que atienden por WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-black text-white antialiased`}
      >
        <BackgroundScene />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}