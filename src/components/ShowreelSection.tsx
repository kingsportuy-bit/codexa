"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Palette, Code, Brain } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    id: "design",
    icon: Palette,
    title: "Interfaces que tus usuarios aman",
    description: "Diseño UX/UI basado en datos que aumenta conversión y reduce fricción. Tus clientes encuentran lo que buscan en segundos.",
    result: "↑ 40% conversión promedio"
  },
  {
    id: "development",
    icon: Code,
    title: "Código que escala sin dolores de cabeza",
    description: "Arquitectura robusta que crece con tu negocio. Sin refactorizaciones costosas, sin deuda técnica.",
    result: "100% uptime garantizado"
  },
  {
    id: "ai",
    icon: Brain,
    title: "Automatización que ahorra 20+ horas semanales",
    description: "IA que trabaja 24/7: atiende clientes, procesa datos, toma decisiones. Tu equipo se enfoca en lo importante.",
    result: "ROI en 3-6 meses"
  }
];

export function ShowreelSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Label slides from left
      gsap.from(".services-label", {
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-label",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Title: clip-path reveal + slide from right
      gsap.from(".services-title-text", {
        opacity: 0,
        x: 120,
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-title-text",
          start: "top 82%",
          toggleActions: "play none none reverse"
        }
      });

      // Subtitle slides from left
      gsap.from(".services-subtitle", {
        opacity: 0,
        x: -80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-subtitle",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Cards: snap in fast
      const isMobile = window.innerWidth < 768;
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(card, {
          opacity: 0,
          x: isMobile ? 0 : (fromLeft ? -40 : 40),
          y: 20,
          scale: 0.97,
          duration: 0.35,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Horizontal scroll line that reveals on scroll
      gsap.from(".services-line", {
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: ".services-line",
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 px-4 overflow-hidden">
      {/* Animated horizontal line */}
      <div className="services-line absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="services-label text-accent text-sm uppercase tracking-[0.3em] font-bold mb-4">Nuestras fortalezas</p>
          <h2
            className="services-title-text text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
          >
            POR QUÉ<br className="md:hidden" /> ELEGIRNOS
          </h2>
          <p className="services-subtitle text-xl text-zinc-400 max-w-2xl mx-auto">
            Resultados medibles, entregas rápidas, comunicación transparente
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="service-card group relative p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-accent/40 hover:bg-white/[0.06] transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,229,209,0.12)] overflow-hidden"
                style={{ perspective: '1000px' }}
              >
                {/* Gradient accent line on top */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative mb-6 w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-5">
                  {benefit.description}
                </p>

                {/* Result Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                  <span className="text-xs font-semibold text-accent">{benefit.result}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}