"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useChatWidget } from "./ChatWidget";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const { open: openChat } = useChatWidget();

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, { opacity: 0, y: 80, scale: 0.85, duration: 1.8, ease: "power3.out", delay: 0.2 });
      gsap.from(".hero-title", { opacity: 0, x: 100, duration: 1.4, ease: "power3.out", delay: 0.6 });
      gsap.from(".hero-subtitle-text", { opacity: 0, x: -80, duration: 1.2, ease: "power3.out", delay: 0.9 });
      gsap.from(".hero-cta", { opacity: 0, y: 40, scale: 0.9, duration: 1, ease: "back.out(1.4)", delay: 1.2 });
      gsap.from(".hero-trust", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", delay: 1.5 });

      gsap.to(".hero-glow-orb-1", { y: -30, x: 10, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".hero-glow-orb-2", { y: 20, x: -15, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".hero-logo-glow", { opacity: 0.5, scale: 1.1, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 overflow-hidden"
    >
      <div className="hero-glow-orb-1 absolute top-1/4 left-[10%] w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="hero-glow-orb-2 absolute bottom-1/4 right-[10%] w-[350px] h-[350px] bg-purple-500/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Logo PNG with glow */}
      <div ref={logoRef} className="relative mb-10">
        <div className="hero-logo-glow absolute inset-0 blur-[40px] bg-accent/20 opacity-30 scale-110 rounded-full" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-codexa.png"
          alt="Codexa"
          className="relative w-[60vw] max-w-[500px] h-auto object-contain drop-shadow-[0_0_60px_rgba(0,229,209,0.35)]"
        />
      </div>

      {/* Headline */}
      <div className="text-center max-w-5xl mb-10">
        <h1
          className="hero-title text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.1] tracking-tight"
          style={{ fontFamily: 'var(--font-outfit), var(--font-space-grotesk), sans-serif' }}
        >
          Convertimos ideas en productos digitales que{' '}
          <span className="text-accent font-black">generan ingresos</span>
        </h1>
        <p className="hero-subtitle-text text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
          De concepto a producción en 4-6 semanas. Desarrollo ágil, IA integrada, resultados medibles.
        </p>
      </div>

      {/* CTAs — open chat widget */}
      <div className="hero-cta flex flex-col sm:flex-row gap-4 items-center justify-center mb-10">
        <button
          onClick={openChat}
          className="group flex items-center gap-3 px-8 py-4 bg-accent text-black font-semibold rounded-full hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(0,229,209,0.25)] hover:shadow-[0_0_60px_rgba(0,229,209,0.45)]"
        >
          <span>Agenda tu llamada gratuita</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={openChat}
          className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-white/15 text-white font-semibold rounded-full hover:border-accent/50 hover:bg-white/5 transition-all duration-300"
        >
          <span>Contáctanos</span>
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="hero-trust flex flex-col items-center gap-3 text-zinc-500 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Primera consulta gratis • Sin compromiso</span>
        </div>
        <p className="text-xs text-zinc-600">Trabajamos con empresas de Uruguay, Argentina y LATAM</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border border-white/15 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}