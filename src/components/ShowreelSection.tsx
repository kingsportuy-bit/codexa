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
      // Animate section title
      gsap.from(".services-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-title",
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate cards with stagger and scale
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.15, // Stagger delay
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="services-title text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Por qué elegirnos
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
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
                className="service-card group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/40 hover:bg-white/10 hover:scale-105 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,229,209,0.2)]"
              >
                {/* Icon */}
                <div className="mb-6 w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-4">
                  {benefit.description}
                </p>

                {/* Result Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30">
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