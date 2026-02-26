"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MessageCircle, Zap, BarChart, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const appointments = [
  { time: "09:00", client: "Carlos R.", service: "Corte + Barba" },
  { time: "11:30", client: "Agustina M.", service: "Corte" },
  { time: "14:00", client: "Matías L.", service: "Barba" },
  { time: "16:30", client: "Cliente Nuevo", service: "Corte + Barba" },
];

export function BarberoXScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !phoneRef.current || !contentRef.current) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {

      if (isMobile) {
        // MOBILE: Simple fast fade-in animations, NO pin, NO scrub
        gsap.from(phoneRef.current, {
          opacity: 0, y: 40, scale: 0.95,
          duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: phoneRef.current, start: "top 90%", toggleActions: "play none none none" }
        });

        gsap.from(contentRef.current, {
          opacity: 0, y: 30,
          duration: 0.4, ease: "power2.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 92%", toggleActions: "play none none none" }
        });

        const features = contentRef.current?.querySelectorAll(".feature-card");
        if (features) {
          gsap.utils.toArray<HTMLElement>(features).forEach((card, i) => {
            gsap.from(card, {
              opacity: 0, y: 20, duration: 0.3, delay: i * 0.05, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 95%", toggleActions: "play none none none" }
            });
          });
        }

        const aptCards = contentRef.current?.querySelectorAll(".apt-card");
        if (aptCards) {
          gsap.utils.toArray<HTMLElement>(aptCards).forEach((card, i) => {
            gsap.from(card, {
              opacity: 0, y: 15, duration: 0.3, delay: i * 0.05, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 95%", toggleActions: "play none none none" }
            });
          });
        }

        gsap.from(".barberox-cta", {
          opacity: 0, y: 15, duration: 0.3, ease: "power2.out",
          scrollTrigger: { trigger: ".barberox-cta", start: "top 95%", toggleActions: "play none none none" }
        });

      } else {
        // DESKTOP: Pinned scrollTrigger with scrub timeline (unchanged)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          },
        });

        tl.fromTo(phoneRef.current,
          { y: 150, opacity: 0, scale: 0.8, rotationY: -15 },
          { y: 0, opacity: 1, scale: 1, rotationY: 0, duration: 1.2, ease: "power2.out" },
          0
        );

        tl.fromTo(contentRef.current,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0.3
        );

        const features = contentRef.current?.querySelectorAll(".feature-card");
        if (features) {
          gsap.utils.toArray<HTMLElement>(features).forEach((card, i) => {
            tl.fromTo(card,
              { y: 30, opacity: 0, scale: 0.9 },
              { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" },
              0.6 + (i * 0.12)
            );
          });
        }

        const aptCards = contentRef.current?.querySelectorAll(".apt-card");
        if (aptCards) {
          gsap.utils.toArray<HTMLElement>(aptCards).forEach((card, i) => {
            tl.fromTo(card,
              { x: 30, opacity: 0, scale: 0.95 },
              { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
              1.2 + (i * 0.1)
            );
          });
        }

        tl.fromTo(".barberox-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          1.8
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">

      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-barberox.png"
          alt="BarberoX"
          className="w-[600px] h-auto object-contain"
        />
      </div>

      {/* Subtle orange ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Column: Phone Mockup */}
          <div className="flex justify-center">
            <div ref={phoneRef} className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-6 bg-orange-500/15 blur-[40px] rounded-full animate-pulse" style={{ animationDuration: '4s' }} />

              {/* Phone — smaller on mobile */}
              <div className="relative w-[260px] h-[520px] md:w-[320px] md:h-[640px] bg-gradient-to-b from-zinc-900 to-black border-2 border-orange-500/30 rounded-[3rem] shadow-[0_0_60px_rgba(249,115,22,0.15)] overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />

                {/* Screen Content */}
                <div className="absolute inset-0 p-6 pt-12 flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/30 to-orange-600/20 flex items-center justify-center">
                      <MessageCircle size={20} className="text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">BarberoX IA</p>
                      <p className="text-xs text-orange-400">En línea</p>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 space-y-3 overflow-hidden">
                    <div className="bg-white/5 rounded-2xl rounded-tl-sm p-3">
                      <p className="text-xs text-white/70">¿Tienen turno para mañana?</p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl rounded-tr-sm p-3 ml-8">
                      <p className="text-xs text-black font-medium">¡Sí! Tengo 16:00, 16:30 o 17:00 disponibles</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl rounded-tl-sm p-3">
                      <p className="text-xs text-white/70">16:30 perfecto</p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl rounded-tr-sm p-3 ml-8">
                      <p className="text-xs text-black font-medium">✓ Turno confirmado para mañana 16:30</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <p className="text-xs text-emerald-400 font-mono">
                      &gt; Turno creado automáticamente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Features + Agenda */}
          <div ref={contentRef} className="space-y-8">

            {/* Title */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-orange-400 font-semibold">BarberoX AI</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white leading-tight">
                Tu barbería en <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">piloto automático</span>
              </h2>
              <p className="text-white/60 text-lg">
                La IA atiende por WhatsApp, agenda turnos y gestiona tu negocio 24/7
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="feature-card p-4 rounded-xl bg-black/40 border border-orange-500/20 backdrop-blur-sm hover:border-orange-500/40 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <MessageCircle size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">WhatsApp Nativo</h3>
                    <p className="text-xs text-white/50">Respuestas automáticas inteligentes</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-4 rounded-xl bg-black/40 border border-orange-500/20 backdrop-blur-sm hover:border-orange-500/40 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Zap size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Sync Real-time</h3>
                    <p className="text-xs text-white/50">Sin conflictos de horarios</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-4 rounded-xl bg-black/40 border border-orange-500/20 backdrop-blur-sm hover:border-orange-500/40 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Clock size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Recordatorios</h3>
                    <p className="text-xs text-white/50">Reduce ausencias automáticamente</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-4 rounded-xl bg-black/40 border border-orange-500/20 backdrop-blur-sm hover:border-orange-500/40 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <BarChart size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Métricas</h3>
                    <p className="text-xs text-white/50">Dashboard en tiempo real</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agenda Preview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/60">
                <Clock size={16} />
                <span className="text-sm font-medium">Agenda de hoy</span>
              </div>
              <div className="space-y-2">
                {appointments.map((apt, i) => (
                  <div
                    key={i}
                    className="apt-card flex items-center gap-4 p-3 rounded-xl bg-black/40 border border-orange-500/20 backdrop-blur-sm hover:border-orange-500/40 transition-colors"
                  >
                    <div className="flex-shrink-0 w-14 text-center">
                      <p className="text-sm font-mono text-orange-400">{apt.time}</p>
                    </div>
                    <div className="h-6 w-px bg-orange-500/30" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{apt.client}</p>
                      <p className="text-xs text-white/40">{apt.service}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to /barberox */}
            <div className="barberox-cta pt-4">
              <Link
                href="/barberox"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold text-lg rounded-full hover:from-orange-400 hover:to-orange-500 transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)]"
              >
                <span>Conoce BarberoX</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}