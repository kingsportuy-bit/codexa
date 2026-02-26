import type { Metadata } from "next";
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Generador de Reels - Barberox",
    description: "Crea contenido animado para Instagram con mensajes de chat y notificaciones.",
};

export default function ReelRenderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={outfit.className}>
            {children}
        </div>
    );
}
