"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MessageCircle, Zap, BarChart, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const appointments = [
  { time: "10:00", client: "Nicolás R.", service: "Corte + Barba" },
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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      // Phone enters with rotation and scale
      tl.fromTo(phoneRef.current,
        { y: 150, opacity: 0, scale: 0.8, rotationY: -15 },
        { y: 0, opacity: 1, scale: 1, rotationY: 0, duration: 1.2, ease: "power2.out" },
        0
      );

      // Content reveals with slide from right
      tl.fromTo(contentRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        0.3
      );

      // Animate feature cards with enhanced stagger
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

      // Animate appointment cards with cascade
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Column: Phone Mockup */}
          <div className="flex justify-center">
            <div ref={phoneRef} className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-orange-500/20 blur-3xl rounded-full" />

              {/* Phone */}
              <div className="relative w-[320px] h-[640px] bg-gradient-to-b from-zinc-900 to-black border-4 border-orange-500/40 rounded-[3rem] shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />

                {/* Screen Content */}
                <div className="absolute inset-0 p-6 pt-12 flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
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
                    <div className="bg-orange-500 rounded-2xl rounded-tr-sm p-3 ml-8">
                      <p className="text-xs text-black font-medium">¡Sí! Tengo 16:00, 16:30 o 17:00 disponibles</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl rounded-tl-sm p-3">
                      <p className="text-xs text-white/70">16:30 perfecto</p>
                    </div>
                    <div className="bg-orange-500 rounded-2xl rounded-tr-sm p-3 ml-8">
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
                <span className="text-xs uppercase tracking-wider text-orange-400">BarberoX AI</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white leading-tight">
                Tu barbería en <span className="text-orange-400">piloto automático</span>
              </h2>
              <p className="text-white/60 text-lg">
                La IA atiende por WhatsApp, agenda turnos y gestiona tu negocio 24/7
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="feature-card p-4 rounded-xl bg-black/40 border border-orange-500/20 backdrop-blur-sm">
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

              <div className="feature-card p-4 rounded-xl bg-black/40 border border-orange-500/20 backdrop-blur-sm">
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

              <div className="feature-card p-4 rounded-xl bg-black/40 border border-orange-500/20 backdrop-blur-sm">
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

              <div className="feature-card p-4 rounded-xl bg-black/40 border border-orange-500/20 backdrop-blur-sm">
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

          </div>

        </div>
      </div>

    </section>
  );
}