"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    const ctx = gsap.context(() => {
      // Simple entrance animation
      gsap.from(logoRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
      });

      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
      });

      gsap.from(".hero-trust", {
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 overflow-hidden"
    >
      {/* Logo */}
      <div ref={logoRef} className="relative mb-8">
        <div className="absolute inset-0 blur-3xl bg-accent/20 opacity-60" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-codexa.png"
          alt="Codexa"
          className="relative w-[70vw] max-w-[600px] h-auto object-contain drop-shadow-[0_0_60px_rgba(0,229,209,0.5)]"
        />
      </div>

      {/* Headline & Subheadline */}
      <div className="hero-subtitle text-center max-w-4xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          Convertimos ideas en productos digitales que <span className="text-accent">generan ingresos</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light">
          De concepto a producción en 8-12 semanas. Desarrollo ágil, IA integrada, resultados medibles.
        </p>
      </div>

      {/* CTAs */}
      <div className="hero-cta flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
        <button className="group flex items-center gap-3 px-8 py-4 bg-accent text-black font-semibold rounded-full hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(0,229,209,0.3)] hover:shadow-[0_0_60px_rgba(0,229,209,0.5)]">
          <span>Agenda tu llamada gratuita</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button className="group flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white/20 text-white font-semibold rounded-full hover:border-accent/60 hover:bg-white/5 transition-all duration-300">
          <span>Ver casos de éxito</span>
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="hero-trust flex flex-col items-center gap-3 text-zinc-500 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Primera consulta gratis • Sin compromiso</span>
        </div>
        <p className="text-xs">Trabajamos con empresas de Uruguay, Argentina y LATAM</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}