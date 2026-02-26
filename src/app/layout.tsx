import type { Metadata } from "next";
import { Space_Grotesk, Inter, Outfit } from 'next/font/google';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { BackgroundScene } from "@/components/BackgroundScene";
import { ShootingStars } from "@/components/ShootingStars";
import { ChatWidgetProvider } from "@/components/ChatWidget";

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

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Codexa - Software a medida",
  description: "Desarrollo de software a medida, productos SaaS, e integración de inteligencia artificial con agentes que atienden por WhatsApp.",
  icons: {
    icon: "/faviconcodexa.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${inter.variable} ${outfit.variable} font-sans bg-black text-white antialiased`}
      >
        <BackgroundScene />
        <ShootingStars />
        <SmoothScroll>
          <ChatWidgetProvider>
            {children}
          </ChatWidgetProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}