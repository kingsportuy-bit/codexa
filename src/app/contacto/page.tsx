"use client";

import { useEffect } from "react";
import { useChatWidget } from "../../components/ChatWidget";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export default function ContactoPage() {
    const { open } = useChatWidget();

    // Auto-open the chat widget when visiting /contacto
    useEffect(() => {
        const timer = setTimeout(() => open(), 500);
        return () => clearTimeout(timer);
    }, [open]);

    return (
        <main className="relative min-h-screen flex flex-col">
            <Navbar />
            <section className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-20 text-center">
                <p className="text-accent text-sm uppercase tracking-[0.3em] font-bold mb-4">Contacto</p>
                <h1
                    className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight"
                    style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                >
                    HABLEMOS
                </h1>
                <p className="text-xl text-zinc-400 max-w-xl mx-auto mb-10">
                    Usá el chat en la esquina inferior derecha para contarnos sobre tu proyecto o agendar una llamada.
                </p>
                <button
                    onClick={open}
                    className="group flex items-center gap-3 px-8 py-4 bg-accent text-black font-semibold rounded-full hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(0,229,209,0.25)]"
                >
                    <span>Abrir chat</span>
                </button>
            </section>
            <Footer />
        </main>
    );
}
