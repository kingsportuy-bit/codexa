"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: "01",
    title: "Descubrimiento",
    desc: "Inmersión total en tu negocio, entendemos tus objetivos y definimos el alcance del proyecto.",
    guarantee: "✓ Propuesta detallada en 48hs"
  },
  {
    id: "02",
    title: "Estrategia y Diseño",
    desc: "Arquitectura técnica, diseño de interfaces y plan de implementación detallado.",
    guarantee: "✓ Prototipos interactivos antes de programar"
  },
  {
    id: "03",
    title: "Desarrollo",
    desc: "Desarrollo iterativo con entregas frecuentes y feedback continuo de tu equipo.",
    guarantee: "✓ Demos semanales, visibilidad total"
  },
  {
    id: "04",
    title: "Lanzamiento y Escala",
    desc: "Lanzamiento en producción, monitoreo activo y optimización continua.",
    guarantee: "✓ Soporte post-lanzamiento incluido"
  },
];

export function ProcessStorySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Label from right
      gsap.from(".process-label", {
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-label",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Title: clip-path reveal from right
      gsap.from(".process-title-text", {
        opacity: 0,
        x: 120,
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-title-text",
          start: "top 82%",
          toggleActions: "play none none reverse"
        }
      });

      // Subtitle from left
      gsap.from(".process-subtitle", {
        opacity: 0,
        x: -80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-subtitle",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Timeline line grows with scroll
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: ".process-steps-container",
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
        }
      });

      // Steps: alternate slide from left/right with 3D rotation
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(step, {
          opacity: 0,
          x: fromLeft ? -100 : 100,
          rotateY: fromLeft ? 5 : -5,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            toggleActions: "play none none reverse"
          }
        });

        // Number pop-in with scale and rotation
        const number = step.querySelector(".step-number");
        if (number) {
          gsap.from(number, {
            scale: 0,
            rotation: -15,
            opacity: 0,
            duration: 0.7,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: step,
              start: "top 78%",
              toggleActions: "play none none reverse"
            }
          });
        }

        // Guarantee badge slides in
        const badge = step.querySelector(".step-guarantee");
        if (badge) {
          gsap.from(badge, {
            opacity: 0,
            x: fromLeft ? -40 : 40,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="process-label text-accent text-sm uppercase tracking-[0.3em] font-bold mb-4">Metodología</p>
          <h2
            className="process-title-text text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
          >
            NUESTRO PROCESO
          </h2>
          <p className="process-subtitle text-xl text-zinc-400 max-w-2xl mx-auto">
            Un enfoque probado para llevar tu proyecto de la idea a producción
          </p>
        </div>

        {/* Process Steps with Timeline */}
        <div className="process-steps-container relative">
          {/* Vertical timeline line */}
          <div className="timeline-line absolute left-[3.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden md:block" />

          <div className="space-y-16">
            {processSteps.map((step) => (
              <div key={step.id} className="process-step relative flex gap-8 items-start" style={{ perspective: '1000px' }}>
                {/* Number with dot on timeline */}
                <div className="flex-shrink-0 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-accent/60 hidden md:block shadow-[0_0_12px_rgba(0,204,194,0.5)]" />
                  <span className="step-number inline-block text-7xl md:text-8xl font-black bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent leading-none">
                    {step.id}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-4">
                  <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg text-zinc-400 leading-relaxed mb-4">
                    {step.desc}
                  </p>

                  {/* Guarantee */}
                  <div className="step-guarantee inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                    <span className="text-sm font-medium text-accent">{step.guarantee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}