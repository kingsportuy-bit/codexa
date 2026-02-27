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
    <section
      ref={containerRef}
      className="bg-black relative min-h-screen flex items-center justify-center py-20 overflow-hidden text-[#F5F0EB]"
      style={{ fontFamily: "'Rasputin', 'Georgia', serif" }}
    >

      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-barberox.png"
          alt="Barberox"
          className="w-[600px] h-auto object-contain"
        />
      </div>

      {/* Subtle gold ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C5A059]/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#C5A059]/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Column: Phone Mockup */}
          <div className="flex justify-center">
            <div ref={phoneRef} className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-6 bg-[#C5A059]/10 blur-[40px] rounded-full animate-pulse" style={{ animationDuration: '4s' }} />

              {/* Phone — smaller on mobile */}
              <div className="relative w-[260px] h-[520px] md:w-[280px] md:h-[540px] bg-[#0A0A0A] border-2 border-[#2A2A2A] rounded-[36px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20" />

                {/* Screen Content */}
                <div className="absolute inset-0 flex flex-col pt-8 bg-[#0A0A0A]">
                  {/* Header */}
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-[#2A2A2A] bg-[#0E0E0E]">
                    <div className="w-10 h-10 rounded-full bg-[#1C1C1C] flex items-center justify-center text-[#C5A059] font-medium text-lg">
                      B
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-[#F5F0EB]">Barberox</p>
                      <p className="text-[13px] text-[#25D366]">en línea</p>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-5 space-y-4 overflow-hidden bg-[url('/whatsapp-bg-dark.png')] bg-cover bg-center">
                    <div className="bg-[#1C1C1C] text-[#F5F0EB] p-2.5 px-3.5 rounded-xl rounded-tl-sm text-sm self-start inline-block shadow-sm max-w-[85%]">
                      ¿Tienen turno para mañana?
                    </div>
                    <div className="flex justify-end w-full">
                      <div className="bg-[#C5A059] text-black font-medium p-2.5 px-3.5 rounded-xl rounded-tr-sm text-sm inline-block shadow-sm max-w-[85%]">
                        ¡Sí! Tengo 16:00, 16:30 o 17:00 disponibles
                      </div>
                    </div>
                    <div className="bg-[#1C1C1C] text-[#F5F0EB] p-2.5 px-3.5 rounded-xl rounded-tl-sm text-sm self-start inline-block shadow-sm max-w-[85%]">
                      16:30 perfecto
                    </div>
                    <div className="flex justify-end w-full">
                      <div className="bg-[#C5A059] text-black font-medium p-2.5 px-3.5 rounded-xl rounded-tr-sm text-sm inline-block shadow-sm max-w-[85%]">
                        ✓ Turno confirmado para mañana 16:30
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Features + Agenda */}
          <div ref={contentRef} className="space-y-8">

            {/* Title */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30">
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-[#C5A059] font-semibold">Barberox IA</span>
              </div>
              <h2 className="text-4xl md:text-5xl uppercase text-white leading-[1.1]" style={{ fontFamily: "'Rasputin', serif" }}>
                Tu barbería en <span className="text-[#C5A059] block">piloto automático</span>
              </h2>
              <p className="text-[#8A8A8A] text-lg" style={{ fontWeight: 300 }}>
                La IA atiende por WhatsApp, agenda turnos y gestiona tu negocio 24/7.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="feature-card p-5 rounded-none bg-[#0E0E0E] border border-[#2A2A2A] hover:border-[#C5A059]/50 transition-colors duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1C1C1C] text-[#C5A059]">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-[#F5F0EB] mb-1">WhatsApp Nativo</h3>
                    <p className="text-xs text-[#8A8A8A]" style={{ fontWeight: 300 }}>Respuestas automáticas inteligentes</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-5 rounded-none bg-[#0E0E0E] border border-[#2A2A2A] hover:border-[#C5A059]/50 transition-colors duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1C1C1C] text-[#C5A059]">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-[#F5F0EB] mb-1">Sync Real-time</h3>
                    <p className="text-xs text-[#8A8A8A]" style={{ fontWeight: 300 }}>Sin conflictos de horarios</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-5 rounded-none bg-[#0E0E0E] border border-[#2A2A2A] hover:border-[#C5A059]/50 transition-colors duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1C1C1C] text-[#C5A059]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-[#F5F0EB] mb-1">Recordatorios</h3>
                    <p className="text-xs text-[#8A8A8A]" style={{ fontWeight: 300 }}>Reduce ausencias automáticamente</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-5 rounded-none bg-[#0E0E0E] border border-[#2A2A2A] hover:border-[#C5A059]/50 transition-colors duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1C1C1C] text-[#C5A059]">
                    <BarChart size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-[#F5F0EB] mb-1">Métricas</h3>
                    <p className="text-xs text-[#8A8A8A]" style={{ fontWeight: 300 }}>Dashboard de control web</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agenda Preview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#8A8A8A] uppercase tracking-widest text-xs">
                <Clock size={14} />
                <span>Agenda de hoy</span>
              </div>
              <div className="space-y-2">
                {appointments.map((apt, i) => (
                  <div
                    key={i}
                    className="apt-card flex items-center gap-4 p-3 bg-[#0A0A0A] border-l-2 border-[#C5A059] border-y border-r border-y-[#2A2A2A] border-r-[#2A2A2A] hover:bg-[#0E0E0E] transition-colors"
                  >
                    <div className="flex-shrink-0 w-14 text-center">
                      <p className="text-sm font-mono text-[#C5A059]">{apt.time}</p>
                    </div>
                    <div className="h-6 w-px bg-[#2A2A2A]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-medium text-[#F5F0EB] truncate">{apt.client}</p>
                      <p className="text-xs text-[#8A8A8A]" style={{ fontWeight: 300 }}>{apt.service}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to /barberox11 */}
            <div className="barberox-cta pt-4">
              <Link
                href="/barberox11"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C5A059] text-black uppercase tracking-widest font-semibold text-sm hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(197,160,89,0.2)]"
                style={{ fontFamily: "'Rasputin', serif" }}
              >
                <span>Conoce Barberox</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}