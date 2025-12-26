"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "BarberoX",
    badge: "IA + WhatsApp",
    description: "La plataforma todo-en-uno para barberías modernas.",
    points: [
      "Gestión de turnos inteligente",
      "App para clientes y barberos",
      "Recordatorios automáticos",
      "IA que responde 24/7 por WhatsApp",
    ],
  },
  {
    name: "Próximo producto",
    badge: "SaaS",
    description: "Placeholder para próximas soluciones.",
    points: ["Multi-tenant", "Dashboards en tiempo real", "Integración con IA"],
  },
  // agrega más si quieres
];

export function PinnedProductsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll(".product-panel");

    sections.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onEnter: () => toggleActive(index),
        onEnterBack: () => toggleActive(index),
      });
    });

    function toggleActive(activeIndex: number) {
      sections.forEach((panel, i) => {
        gsap.to(panel, {
          opacity: i === activeIndex ? 1 : 0.25,
          y: i === activeIndex ? 0 : 40,
          scale: i === activeIndex ? 1 : 0.97,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section data-bg-section className="relative py-32 border-t border-white/5">
      <div ref={containerRef} className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">
            Nuestros productos
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-space-grotesk">
            Soluciones que ya están{" "}
            <span className="text-accent">en producción</span>.
          </h2>
        </div>

        <div className="relative space-y-6">
          {products.map((product, index) => (
            <article
              key={product.name}
              className={`product-panel relative p-px rounded-3xl bg-gradient-to-br from-white/15 via-white/5 to-transparent ${
                index === 0 ? "opacity-100" : "opacity-40"
              }`}
            >
              <div className="rounded-[1.4rem] bg-black/80 backdrop-blur-xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-xs uppercase tracking-[0.2em] text-accent">
                    <span>{product.badge}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-space-grotesk">
                    {product.name}
                  </h3>
                  <p className="text-white/70">{product.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {product.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={
                      product.name === "BarberoX"
                        ? "/barberox"
                        : "/contacto"
                    }
                    className="inline-flex items-center gap-2 mt-6 text-sm text-accent"
                  >
                    Ver más →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}