"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: "01",
    title: "Discovery",
    desc: "Inmersión total en tu negocio, entendemos tus objetivos y definimos el alcance del proyecto.",
    guarantee: "✓ Propuesta detallada en 48hs"
  },
  {
    id: "02",
    title: "Strategy & Design",
    desc: "Arquitectura técnica, diseño de interfaces y plan de implementación detallado.",
    guarantee: "✓ Prototipos interactivos antes de programar"
  },
  {
    id: "03",
    title: "Build",
    desc: "Desarrollo iterativo con entregas frecuentes y feedback continuo de tu equipo.",
    guarantee: "✓ Demos semanales, visibilidad total"
  },
  {
    id: "04",
    title: "Deploy & Scale",
    desc: "Lanzamiento en producción, monitoreo activo y optimización continua.",
    guarantee: "✓ Soporte post-launch incluido"
  },
];

export function ProcessStorySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".process-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-title",
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate steps with enhanced effects
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");

      steps.forEach((step, i) => {
        // Animate the entire step
        gsap.from(step, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        });

        // Animate the number with scale
        const number = step.querySelector(".step-number");
        if (number) {
          gsap.from(number, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.4)",
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
    <section ref={containerRef} className="relative py-32 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="process-title text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Nuestro proceso
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Un enfoque probado para llevar tu proyecto de la idea a producción
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          {processSteps.map((step) => (
            <div key={step.id} className="process-step flex gap-8 items-start">
              {/* Number */}
              <div className="flex-shrink-0">
                <span className="step-number text-8xl font-bold text-zinc-900 leading-none">
                  {step.id}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-4">
                <h3 className="text-3xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-lg text-zinc-400 leading-relaxed mb-4">
                  {step.desc}
                </p>

                {/* Guarantee */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
                  <span className="text-sm font-medium text-accent">{step.guarantee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}