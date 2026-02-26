"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useChatWidget } from "./ChatWidget";

gsap.registerPlugin(ScrollTrigger);

export function FinalCTASection() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { open: openChat } = useChatWidget();

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(".final-cta-title", {
                opacity: 0, x: -120, clipPath: "inset(0% 0% 0% 100%)",
                duration: 1.4, ease: "power3.out",
                scrollTrigger: { trigger: ".final-cta-title", start: "top 82%", toggleActions: "play none none reverse" }
            });

            gsap.from(".final-cta-desc", {
                opacity: 0, x: 80, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: ".final-cta-desc", start: "top 85%", toggleActions: "play none none reverse" }
            });

            gsap.from(".final-cta-button", {
                opacity: 0, scale: 0.85, y: 30, duration: 1, ease: "back.out(1.6)",
                scrollTrigger: { trigger: ".final-cta-button", start: "top 88%", toggleActions: "play none none reverse" }
            });

            gsap.from(".final-guarantee", {
                opacity: 0, y: 20, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: ".final-guarantee", start: "top 90%", toggleActions: "play none none reverse" }
            });

            gsap.to(".final-glow-1", { y: -25, x: 15, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
            gsap.to(".final-glow-2", { y: 20, x: -12, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-32 px-4 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="absolute inset-0 pointer-events-none">
                <div className="final-glow-1 absolute top-1/3 left-1/3 w-[500px] h-[400px] bg-accent/8 rounded-full blur-[120px]" />
                <div className="final-glow-2 absolute bottom-1/3 right-1/3 w-[400px] h-[300px] bg-accent/12 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-4xl mx-auto text-center">
                <h2
                    className="final-cta-title text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.95] uppercase tracking-tight"
                    style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                >
                    ¿LISTO PARA{' '}
                    <span className="text-accent">ESCALAR</span>?
                </h2>

                <p className="final-cta-desc text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                    Contanos sobre tu proyecto y te respondemos en menos de 24 horas. Sin compromiso.
                </p>

                <div className="final-cta-button flex flex-col sm:flex-row gap-4 items-center justify-center mb-10">
                    <button
                        onClick={openChat}
                        className="group flex items-center gap-3 px-10 py-5 bg-accent text-black font-bold text-lg rounded-full hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-[0_0_50px_rgba(0,229,209,0.3)] hover:shadow-[0_0_80px_rgba(0,229,209,0.5)]"
                    >
                        <span>Contanos tu idea</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="final-guarantee flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span>Primera consulta 100% gratis</span>
                    </div>
                    <p className="text-xs text-zinc-600">
                        Respuesta en menos de 24 horas
                    </p>
                </div>
            </div>
        </section>
    );
}
