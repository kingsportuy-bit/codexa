"use client";

import { ArrowRight, Calendar } from "lucide-react";

export function FinalCTASection() {
    return (
        <section className="relative py-32 px-4 bg-gradient-to-b from-black via-zinc-950 to-black">
            <div className="max-w-4xl mx-auto text-center">

                {/* Headline */}
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    ¿Listo para <span className="text-accent">escalar tu negocio</span>?
                </h2>

                <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                    Agenda una llamada de 30 minutos. Sin compromiso, sin costo. Hablemos de tu proyecto.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
                    <button className="group flex items-center gap-3 px-10 py-5 bg-accent text-black font-bold text-lg rounded-full hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-[0_0_50px_rgba(0,229,209,0.4)] hover:shadow-[0_0_70px_rgba(0,229,209,0.6)]">
                        <Calendar className="w-6 h-6" />
                        <span>Agenda tu llamada gratuita</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Guarantee */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span>Primera consulta 100% gratis</span>
                    </div>
                    <p className="text-xs text-zinc-600">
                        Respuesta en menos de 24 horas
                    </p>
                </div>

                {/* Divider */}
                <div className="mt-16 pt-16 border-t border-white/10">
                    <p className="text-zinc-500 text-sm">
                        También puedes escribirnos a{" "}
                        <a href="mailto:hola@codexa.uy" className="text-accent hover:underline">
                            hola@codexa.uy
                        </a>
                    </p>
                </div>

            </div>
        </section>
    );
}
